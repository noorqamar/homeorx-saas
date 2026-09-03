"use server";

import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getVerifiedSession } from "@/lib/auth";
import { requestTenantUpgrade, AccountStatus } from "@/lib/account-lifecycle";
import { revalidatePath } from "next/cache";

/**
 * Standard Doctor / Admin Email & Password Login
 */
export async function loginDoctor(data: { email: string; password?: string }) {
  try {
    const email = data.email?.trim().toLowerCase();
    const password = data.password?.trim();

    if (!email) {
      return { success: false, error: "براہ کرم اپنا ای میل درج کریں۔ (Please enter your email address.)" };
    }
    if (!password) {
      return { success: false, error: "براہ کرم پاس ورڈ درج کریں۔ (Please enter your password.)" };
    }

    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    // Auto-seed admin or demo doctor if missing on fresh database initialization
    if (!doctor) {
      if (email === "admin@homeorx.health") {
        const tenant = await db.tenant.upsert({
          where: { id: "tenant-superadmin" },
          update: { accountStatus: "active" },
          create: {
            id: "tenant-superadmin",
            name: "HomeoRx SaaS Central Administration",
            clinicName: "HomeoRx Central Administration",
            email: "admin@homeorx.health",
            phone: "+92 300 1234567",
            currency: "PKR",
            accountStatus: "active",
          },
        });

        doctor = await db.doctor.upsert({
          where: { email: "admin@homeorx.health" },
          update: {
            status: "APPROVED",
            active: true,
            role: "SUPER_ADMIN",
            accountStatus: "active",
            passwordHash: hashPassword("admin123456"),
          },
          create: {
            id: "doc-superadmin-001",
            tenantId: tenant.id,
            name: "Dr. Qamar (Super Admin / سسٹم ایڈمن)",
            qualification: "Chief Medical Officer & Platform Admin",
            registrationNumber: "HOM-ADMIN-001",
            email: "admin@homeorx.health",
            passwordHash: hashPassword("admin123456"),
            role: "SUPER_ADMIN",
            status: "APPROVED",
            accountStatus: "active",
            active: true,
          },
          include: { tenant: true },
        });
      } else if (email === "dr.demo@homeorx.health") {
        const tenant = await db.tenant.upsert({
          where: { id: "tenant-demo-001" },
          update: { accountStatus: "demo" },
          create: {
            id: "tenant-demo-001",
            name: "Dr. Demo Homeopathic Clinic & Research Centre",
            clinicName: "HomeoRx Wellness & Cure Clinic",
            address: "Suite 402, Medical Arts Building, Health Avenue",
            phone: "+92 300 1234567",
            email: "clinic@homeorx.health",
            currency: "PKR",
            accountStatus: "demo",
          },
        });

        doctor = await db.doctor.upsert({
          where: { email: "dr.demo@homeorx.health" },
          update: {
            status: "APPROVED",
            active: true,
            accountStatus: "demo",
            passwordHash: hashPassword("demo12345"),
          },
          create: {
            id: "doc-demo-001",
            tenantId: tenant.id,
            name: "Dr. Demo Hahnemann, MD (Hom)",
            qualification: "MD (Homeopathy), BHMS, Gold Medalist",
            registrationNumber: "HOM-REG-2026-8942",
            email: "dr.demo@homeorx.health",
            passwordHash: hashPassword("demo12345"),
            role: "DOCTOR",
            status: "APPROVED",
            accountStatus: "demo",
            active: true,
          },
          include: { tenant: true },
        });
      }
    }

    if (!doctor) {
      return {
        success: false,
        error: `ای میل "${email}" سسٹم میں موجود نہیں ہے۔ اگر آپ نئے ڈاکٹر ہیں تو براہ کرم نیچے دیے گئے لنک سے رجسٹریشن کریں۔`,
      };
    }

    // Check Approval Status for Doctors (Super Admin always has access)
    if (doctor.role !== "SUPER_ADMIN") {
      if (doctor.status === "PENDING" || !doctor.active || doctor.accountStatus === "pending_approval") {
        return {
          success: false,
          error: "آپ کا اکاؤنٹ کامیابی سے رجسٹرڈ ہے، لیکن ابھی سپر ایڈمن کی منظوری (Approval) کے انتظار میں ہے۔ ایڈمن کی جانب سے منظوری کے بعد آپ لاگ ان کر سکیں گے۔ (Your account is pending Admin approval.)",
        };
      }

      if (doctor.status === "SUSPENDED" || doctor.accountStatus === "suspended") {
        return {
          success: false,
          error: "یہ اکاؤنٹ معطل (Suspended) کر دیا گیا ہے۔ براہ کرم سپر ایڈمن سے رابطہ کریں۔",
        };
      }
    }

    // Verify Password
    if (doctor.passwordHash) {
      const isValid = verifyPassword(password, doctor.passwordHash);
      if (!isValid) {
        return {
          success: false,
          error: "درج کردہ پاس ورڈ درست نہیں ہے۔ (Incorrect password. Please try again.)",
        };
      }
    } else {
      // First time setting password on legacy accounts
      await db.doctor.update({
        where: { id: doctor.id },
        data: { passwordHash: hashPassword(password) },
      });
    }

    await createSession(doctor.id, doctor.tenantId);

    revalidatePath("/");
    revalidatePath("/admin");
    return {
      success: true,
      doctorId: doctor.id,
      tenantId: doctor.tenantId,
      role: doctor.role,
      isSuperAdmin: doctor.role === "SUPER_ADMIN",
      accountStatus: doctor.accountStatus || doctor.tenant.accountStatus || "active",
    };
  } catch (err: any) {
    console.error("Login Server Action error:", err);
    return {
      success: false,
      error: `لاگ ان کے دوران خرابی پیش آئی: ${err?.message || "سرور کا مسئلہ"}`,
    };
  }
}

/**
 * Doctor Registration Flow:
 * Registers new clinic & doctor in "PENDING" state awaiting Super Admin Approval.
 */
export async function registerDoctor(data: {
  name: string;
  qualification?: string;
  registrationNumber?: string;
  clinicName: string;
  email: string;
  password?: string;
  phone?: string;
}) {
  try {
    const email = data.email?.trim().toLowerCase();
    const name = data.name?.trim();
    const clinicName = data.clinicName?.trim();
    const password = data.password?.trim();

    if (!email || !name || !clinicName || !password) {
      return {
        success: false,
        error: "تمام لازمی فیلڈز (نام، کلینک، ای میل، پاس ورڈ) درج کریں۔ (All required fields must be filled.)",
      };
    }

    const existingDoctor = await db.doctor.findUnique({
      where: { email },
    });

    if (existingDoctor) {
      return {
        success: false,
        error: "یہ ای میل پہلے سے سسٹم میں رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔ (An account with this email already exists.)",
      };
    }

    const passwordHash = hashPassword(password);
    const now = new Date();

    const tenant = await db.tenant.create({
      data: {
        name: clinicName,
        clinicName: clinicName,
        phone: data.phone?.trim() || null,
        whatsapp: data.phone?.trim() || null,
        email,
        currency: "PKR",
        prescriptionHeader: `${clinicName.toUpperCase()} — HOMEOPATHIC HEALTHCARE`,
        prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل",
        accountStatus: "pending_approval",
        doctors: {
          create: {
            name,
            qualification: data.qualification?.trim() || "MD (Homeopathy), BHMS",
            registrationNumber: data.registrationNumber?.trim() || null,
            email,
            passwordHash,
            phone: data.phone?.trim() || null,
            role: "DOCTOR",
            status: "PENDING",
            accountStatus: "pending_approval",
            active: false, // Awaiting Super Admin manual approval
          },
        },
      },
      include: {
        doctors: true,
      },
    });

    const newDoctor = tenant.doctors[0];

    revalidatePath("/admin");
    return {
      success: true,
      pendingApproval: true,
      doctorId: newDoctor.id,
      tenantId: tenant.id,
      message: "آپ کا اکاؤنٹ کامیابی سے رجسٹر ہو گیا ہے۔ سپر ایڈمن کی منظوری کے بعد آپ لاگ ان کر سکیں گے۔",
    };
  } catch (err: any) {
    console.error("Register Server Action error:", err);
    return {
      success: false,
      error: `رجسٹریشن کے دوران مسئلہ پیش آیا: ${err?.message || "سرور خرابی"}`,
    };
  }
}

/**
 * Doctor submits an upgrade request from demo to full account with payment reference
 */
export async function requestAccountUpgradeAction(paymentReference: string, note?: string) {
  try {
    const session = await getVerifiedSession();
    if (!session) {
      return { success: false, error: "سیشن ختم ہو چکا ہے۔ براہ کرم دوبارہ لاگ ان کریں۔" };
    }

    const updatedTenant = await requestTenantUpgrade(session.doctor.tenantId, paymentReference, note);

    revalidatePath("/");
    revalidatePath("/clinic");
    return {
      success: true,
      accountStatus: updatedTenant.accountStatus,
      message: "آپ کی اپ گریڈ کی درخواست کامیابی سے جمع ہو چکی ہے۔ ایڈمن کی تصدیق کے بعد اکاؤنٹ ایکٹو ہو جائے گا۔",
    };
  } catch (err: any) {
    console.error("requestAccountUpgradeAction error:", err);
    return {
      success: false,
      error: err?.message || "درخواست جمع کرانے میں خرابی پیش آئی۔",
    };
  }
}

/**
 * Get the currently authenticated doctor profile
 */
export async function getCurrentDoctor() {
  const session = await getVerifiedSession();
  if (!session || !session.doctor) return null;
  return {
    id: session.doctor.id,
    name: session.doctor.name,
    email: session.doctor.email,
    role: session.doctor.role,
    qualification: session.doctor.qualification,
    clinicName: session.doctor.tenant?.name || session.doctor.tenant?.clinicName,
    tenantId: session.doctor.tenantId,
    accountStatus: session.doctor.accountStatus || session.doctor.tenant?.accountStatus || "active",
  };
}

/**
 * Current user logout
 */
export async function logoutDoctor() {
  await destroySession();
  revalidatePath("/");
  return { success: true };
}
