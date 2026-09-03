"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import {
  approveTenantUpgrade,
  rejectTenantUpgrade,
  suspendTenantAccount,
  AccountStatus,
} from "@/lib/account-lifecycle";
import { revalidatePath } from "next/cache";

/**
 * Super Admin authorization check
 */
async function ensureSuperAdmin() {
  const { doctorId } = await getTenantContext();
  const currentDoctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!currentDoctor || currentDoctor.role !== "SUPER_ADMIN") {
    throw new Error("غیر مجاز: صرف سپر ایڈمن کو رسائی کی اجازت ہے۔ (Unauthorized: Super Admin access required.)");
  }

  return currentDoctor;
}

export async function getAllDoctorsAndClinics() {
  await ensureSuperAdmin();

  const doctors = await db.doctor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      tenant: {
        include: {
          _count: {
            select: {
              patients: true,
              prescriptions: true,
              visits: true,
            },
          },
        },
      },
    },
  });

  return doctors.map((doc) => ({
    id: doc.id,
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    qualification: doc.qualification,
    registrationNumber: doc.registrationNumber,
    role: doc.role,
    status: doc.status || "APPROVED",
    accountStatus: (doc.accountStatus || doc.tenant.accountStatus || "demo") as AccountStatus,
    demoStartedAt: doc.demoStartedAt || doc.tenant.demoStartedAt,
    demoExpiresAt: doc.demoExpiresAt || doc.tenant.demoExpiresAt,
    upgradeRequestedAt: doc.upgradeRequestedAt || doc.tenant.upgradeRequestedAt,
    paymentReference: doc.paymentReference || doc.tenant.paymentReference,
    rejectionReason: doc.rejectionReason || doc.tenant.rejectionReason,
    active: doc.active,
    createdAt: doc.createdAt,
    clinicId: doc.tenant.id,
    clinicName: doc.tenant.clinicName || doc.tenant.name,
    clinicAddress: doc.tenant.address,
    totalPatients: doc.tenant._count.patients,
    totalPrescriptions: doc.tenant._count.prescriptions,
  }));
}

export async function getPendingUpgradeRequests() {
  await ensureSuperAdmin();

  const pendingDoctors = await db.doctor.findMany({
    where: {
      OR: [
        { accountStatus: "pending_approval" },
        { tenant: { accountStatus: "pending_approval" } },
      ],
    },
    orderBy: { upgradeRequestedAt: "desc" },
    include: {
      tenant: {
        include: {
          _count: {
            select: {
              patients: true,
              prescriptions: true,
            },
          },
        },
      },
    },
  });

  return pendingDoctors.map((doc) => ({
    id: doc.id,
    doctorId: doc.id,
    tenantId: doc.tenant.id,
    doctorName: doc.name,
    doctorEmail: doc.email,
    phone: doc.phone || doc.tenant.phone,
    qualification: doc.qualification,
    clinicName: doc.tenant.clinicName || doc.tenant.name,
    upgradeRequestedAt: doc.upgradeRequestedAt || doc.tenant.upgradeRequestedAt || doc.updatedAt,
    paymentReference: doc.paymentReference || doc.tenant.paymentReference,
    totalPatients: doc.tenant._count.patients,
    totalPrescriptions: doc.tenant._count.prescriptions,
  }));
}

export async function approveDoctorUpgrade(doctorId: string, paymentReference: string) {
  const admin = await ensureSuperAdmin();

  const doctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) throw new Error("Doctor record not found.");

  await approveTenantUpgrade(doctor.tenantId, admin.id, paymentReference);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: `Account for ${doctor.name} approved and activated successfully!` };
}

export async function rejectDoctorUpgrade(doctorId: string, rejectionReason: string) {
  const admin = await ensureSuperAdmin();

  const doctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) throw new Error("Doctor record not found.");

  await rejectTenantUpgrade(doctor.tenantId, admin.id, rejectionReason);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: `Account for ${doctor.name} marked as rejected.` };
}

export async function suspendDoctorAccount(doctorId: string, reason?: string) {
  const admin = await ensureSuperAdmin();

  const doctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) throw new Error("Doctor record not found.");
  if (doctor.role === "SUPER_ADMIN") throw new Error("Cannot suspend Super Admin.");

  await suspendTenantAccount(doctor.tenantId, admin.id, reason);

  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true, message: `Account for ${doctor.name} has been suspended.` };
}

export async function updateDoctorStatus(doctorId: string, status: "APPROVED" | "PENDING" | "SUSPENDED") {
  await ensureSuperAdmin();

  const doctor = await db.doctor.update({
    where: { id: doctorId },
    data: {
      status,
      active: status === "APPROVED",
    },
  });

  revalidatePath("/admin");
  revalidatePath("/clinic");
  return { success: true, doctor };
}

export async function deleteDoctorAccount(doctorId: string) {
  await ensureSuperAdmin();

  const doctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!doctor) throw new Error("Doctor not found");
  if (doctor.role === "SUPER_ADMIN") {
    throw new Error("Cannot delete primary Super Admin account.");
  }

  // Delete Tenant cascade
  await db.tenant.delete({
    where: { id: doctor.tenantId },
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getAdminMetrics() {
  await ensureSuperAdmin();

  const [
    totalDoctors,
    pendingUpgrades,
    demoDoctors,
    activeDoctors,
    totalClinics,
    totalPrescriptions,
    totalPatients,
  ] = await Promise.all([
    db.doctor.count(),
    db.doctor.count({ where: { accountStatus: "pending_approval" } }),
    db.doctor.count({ where: { accountStatus: "demo" } }),
    db.doctor.count({ where: { accountStatus: "active" } }),
    db.tenant.count(),
    db.prescription.count(),
    db.patient.count(),
  ]);

  return {
    totalDoctors,
    pendingUpgrades,
    demoDoctors,
    activeDoctors,
    totalClinics,
    totalPrescriptions,
    totalPatients,
  };
}
