import { db } from "@/lib/db";

export type AccountStatus = "demo" | "pending_approval" | "active" | "rejected" | "suspended";

// Valid State Transitions Map
export const ALLOWED_TRANSITIONS: Record<AccountStatus, AccountStatus[]> = {
  demo: ["pending_approval"],
  pending_approval: ["active", "rejected"],
  active: ["suspended"],
  rejected: ["pending_approval"],
  suspended: ["active"],
};

/**
 * Validates whether transitioning from currentStatus to newStatus is permissible
 */
export function isValidTransition(current: AccountStatus, target: AccountStatus): boolean {
  if (current === target) return true;
  const allowed = ALLOWED_TRANSITIONS[current] || [];
  return allowed.includes(target);
}

/**
 * Doctor submits an upgrade request with payment reference & optional note
 */
export async function requestTenantUpgrade(tenantId: string, paymentReference?: string, note?: string) {
  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const currentStatus = (tenant.accountStatus || "demo") as AccountStatus;
  if (!isValidTransition(currentStatus, "pending_approval")) {
    throw new Error(`Cannot request upgrade from status "${currentStatus}". Current status must be demo or rejected.`);
  }

  const now = new Date();

  // Update Tenant & all associated Doctors atomically
  const [updatedTenant] = await db.$transaction([
    db.tenant.update({
      where: { id: tenantId },
      data: {
        accountStatus: "pending_approval",
        accountStatusUpdatedAt: now,
        upgradeRequestedAt: now,
        paymentReference: paymentReference?.trim() || null,
        rejectionReason: null,
      },
    }),
    db.doctor.updateMany({
      where: { tenantId },
      data: {
        accountStatus: "pending_approval",
        accountStatusUpdatedAt: now,
        upgradeRequestedAt: now,
        paymentReference: paymentReference?.trim() || null,
        rejectionReason: null,
      },
    }),
  ]);

  return updatedTenant;
}

/**
 * Super Admin approves a tenant upgrade, confirms payment reference, and flips status to 'active'
 */
export async function approveTenantUpgrade(tenantId: string, adminDoctorId: string, paymentReference: string) {
  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const currentStatus = (tenant.accountStatus || "demo") as AccountStatus;
  if (!isValidTransition(currentStatus, "active")) {
    throw new Error(`Cannot approve upgrade from status "${currentStatus}". Must be in "pending_approval" or "suspended".`);
  }

  if (!paymentReference?.trim()) {
    throw new Error("Payment reference (transaction ID / invoice) is required to approve account.");
  }

  const now = new Date();

  const [updatedTenant] = await db.$transaction([
    db.tenant.update({
      where: { id: tenantId },
      data: {
        accountStatus: "active",
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        paymentReference: paymentReference.trim(),
        rejectionReason: null,
      },
    }),
    db.doctor.updateMany({
      where: { tenantId },
      data: {
        accountStatus: "active",
        status: "APPROVED",
        active: true,
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        paymentReference: paymentReference.trim(),
        rejectionReason: null,
      },
    }),
  ]);

  return updatedTenant;
}

/**
 * Super Admin rejects a tenant upgrade request with a mandatory rejection reason
 */
export async function rejectTenantUpgrade(tenantId: string, adminDoctorId: string, rejectionReason: string) {
  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const currentStatus = (tenant.accountStatus || "demo") as AccountStatus;
  if (!isValidTransition(currentStatus, "rejected")) {
    throw new Error(`Cannot reject account from status "${currentStatus}". Current status must be "pending_approval".`);
  }

  if (!rejectionReason?.trim()) {
    throw new Error("Rejection reason is required.");
  }

  const now = new Date();

  const [updatedTenant] = await db.$transaction([
    db.tenant.update({
      where: { id: tenantId },
      data: {
        accountStatus: "rejected",
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        rejectionReason: rejectionReason.trim(),
      },
    }),
    db.doctor.updateMany({
      where: { tenantId },
      data: {
        accountStatus: "rejected",
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        rejectionReason: rejectionReason.trim(),
      },
    }),
  ]);

  return updatedTenant;
}

/**
 * Super Admin suspends an active account
 */
export async function suspendTenantAccount(tenantId: string, adminDoctorId: string, reason?: string) {
  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
  });

  if (!tenant) {
    throw new Error("Tenant not found.");
  }

  const currentStatus = (tenant.accountStatus || "demo") as AccountStatus;
  if (!isValidTransition(currentStatus, "suspended")) {
    throw new Error(`Cannot suspend account from status "${currentStatus}". Current status must be "active".`);
  }

  const now = new Date();

  const [updatedTenant] = await db.$transaction([
    db.tenant.update({
      where: { id: tenantId },
      data: {
        accountStatus: "suspended",
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        rejectionReason: reason?.trim() || null,
      },
    }),
    db.doctor.updateMany({
      where: { tenantId },
      data: {
        accountStatus: "suspended",
        status: "SUSPENDED",
        active: false,
        accountStatusUpdatedAt: now,
        accountStatusUpdatedBy: adminDoctorId,
        rejectionReason: reason?.trim() || null,
      },
    }),
  ]);

  return updatedTenant;
}
