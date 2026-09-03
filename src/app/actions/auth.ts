"use server";

import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getVerifiedSession } from "@/lib/auth";
import { requestTenantUpgrade, AccountStatus } from "@/lib/account-lifecycle";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Standard Doctor / Admin Email & Password Login
 */
export async function loginDoctor(data: { email: string; password?: string }) {
  try {
    const email = data.email?.trim().toLowerCase();

    if (!email) {
      return { success: false, error: "براہ کرم اپنا ای میل درج کریں۔ (Please enter your email address.)" };
    }

    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    // Auto-heal / Auto-provision Super Admin or Demo Doctor if missing
    if (!doctor) {
      if (email === "admin@homeorx.health") {
        const tenant = await db.tenant.upsert({
          where: { id: "tenant-superadmin" },
          update: {
            accountStatus: "active",
          },
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
          update: {
            accountStatus: "demo",
          },
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
        error: `ای میل "${email}" رجسٹرڈ نہیں ہے۔ آپ گوگل سے یا نیا اکاؤنٹ بنا کر فوری لاگ ان کر سکتے ہیں۔`,
      };
    }

    if (!doctor.active || doctor.status === "SUSPENDED" || doctor.accountStatus === "suspended") {
      return {
        success: false,
        error: "یہ اکاؤنٹ معطل ہے۔ براہ کرم سپر ایڈمن سے رابطہ کریں۔ (Account suspended.)",
      };
    }

    // Verify password
    if (doctor.passwordHash && data.password) {
      const isValid = verifyPassword(data.password, doctor.passwordHash);
      if (!isValid) {
        return {
          success: false,
          error: "درج کردہ پاس ورڈ درست نہیں ہے۔ (Incorrect password. Please try again.)",
        };
      }
    } else if (!doctor.passwordHash && data.password) {
      await db.doctor.update({
        where: { id: doctor.id },
        data: { passwordHash: hashPassword(data.password) },
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
      accountStatus: doctor.accountStatus || doctor.tenant.accountStatus || "demo",
    };
  } catch (err: any) {
    console.error("Login Server Action error:", err);
    return {
      success: false,
      error: `لاگ ان کے دوران سرور کا مسئلہ پیش آیا: ${err?.message || "نامعلوم خرابی"}`,
    };
  }
}

/**
 * Google Authentication Sign-In / Demo Account Provisioning
 */
export async function loginWithGoogle(data: { email: string; name?: string; googleId?: string }) {
  try {
    const email = data.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return { success: false, error: "درست گوگل ای میل ایڈریس درج کریں۔ (Invalid Google email.)" };
    }

    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    // If new Google user, auto-create Demo Tenant workspace & Doctor profile instantly!
    if (!doctor) {
      const userName = data.name?.trim() || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const doctorDisplayName = userName.startsWith("Dr.") ? userName : `Dr. ${userName}`;
      const clinicName = `${doctorDisplayName}'s Homeopathic Clinic`;

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days demo trial

      const tenant = await db.tenant.create({
        data: {
          name: clinicName,
          clinicName: clinicName,
          email,
          currency: "PKR",
          prescriptionHeader: "HOLISTIC HOMEOPATHIC HEALTHCARE CLINIC",
          prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل",
          accountStatus: "demo",
          demoStartedAt: now,
          demoExpiresAt: expiresAt,
          doctors: {
            create: {
              name: doctorDisplayName,
              qualification: "BHMS, Homeopathic Physician",
              email,
              role: "DOCTOR",
              status: "APPROVED",
              accountStatus: "demo",
              demoStartedAt: now,
              demoExpiresAt: expiresAt,
              active: true,
            },
          },
        },
        include: {
          doctors: true,
        },
      });

      doctor = await db.doctor.findUnique({
        where: { id: tenant.doctors[0].id },
        include: { tenant: true },
      });
    }

    if (!doctor) {
      return { success: false, error: "ڈاکٹر پروفائل بنانے میں ناکامی۔" };
    }

    if (!doctor.active || doctor.status === "SUSPENDED" || doctor.accountStatus === "suspended") {
      return {
        success: false,
        error: "یہ گوگل اکاؤنٹ معطل ہے۔ براہ کرم ایڈمن سے رابطہ کریں۔",
      };
    }

    await createSession(doctor.id, doctor.tenantId);
    revalidatePath("/");
    return {
      success: true,
      doctorId: doctor.id,
      tenantId: doctor.tenantId,
      role: doctor.role,
      accountStatus: doctor.accountStatus || doctor.tenant.accountStatus || "demo",
    };
  } catch (err: any) {
    console.error("Google login error:", err);
    return {
      success: false,
      error: `گوگل اتھنٹیکیشن میں مسئلہ: ${err?.message || "سرور ایرر"}`,
    };
  }
}

/**
 * Personal Email Authentication (Direct Demo/Active Access with any Email)
 */
export async function loginWithPersonalEmail(data: { email: string; name?: string; password?: string }) {
  try {
    const email = data.email?.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      return { success: false, error: "درست پرسنل ای میل درج کریں۔ (Invalid personal email address.)" };
    }

    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    // If new personal email, provision Demo Account immediately
    if (!doctor) {
      const fallbackName = data.name?.trim() || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const doctorDisplayName = fallbackName.startsWith("Dr.") ? fallbackName : `Dr. ${fallbackName}`;
      const clinicName = `${doctorDisplayName}'s Homeopathic Clinic`;
      const passHash = data.password ? hashPassword(data.password) : null;

      const now = new Date();
      const expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

      const tenant = await db.tenant.create({
        data: {
          name: clinicName,
          clinicName: clinicName,
          email,
          currency: "PKR",
          prescriptionHeader: "HOLISTIC HOMEOPATHIC HEALTHCARE CLINIC",
          prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل",
          accountStatus: "demo",
          demoStartedAt: now,
          demoExpiresAt: expiresAt,
          doctors: {
            create: {
              name: doctorDisplayName,
              qualification: "BHMS, Homeopathic Physician",
              email,
              passwordHash: passHash,
              role: "DOCTOR",
              status: "APPROVED",
              accountStatus: "demo",
              demoStartedAt: now,
              demoExpiresAt: expiresAt,
              active: true,
            },
          },
        },
        include: {
          doctors: true,
        },
      });

      doctor = await db.doctor.findUnique({
        where: { id: tenant.doctors[0].id },
        include: { tenant: true },
      });
    } else if (doctor && doctor.passwordHash && data.password) {
      const isValid = verifyPassword(data.password, doctor.passwordHash);
      if (!isValid) {
        return {
          success: false,
          error: "درج کردہ پاس ورڈ درست نہیں ہے۔ (Incorrect password.)",
        };
      }
    }

    if (!doctor) {
      return { success: false, error: "ڈاکٹر پروفائل بنانے میں ناکامی۔" };
    }

    if (!doctor.active || doctor.status === "SUSPENDED" || doctor.accountStatus === "suspended") {
      return {
        success: false,
        error: "یہ اکاؤنٹ معطل ہے۔ براہ کرم ایڈمن سے رابطہ کریں۔",
      };
    }

    await createSession(doctor.id, doctor.tenantId);
    revalidatePath("/");
    return {
      success: true,
      doctorId: doctor.id,
      tenantId: doctor.tenantId,
      role: doctor.role,
      accountStatus: doctor.accountStatus || doctor.tenant.accountStatus || "demo",
    };
  } catch (err: any) {
    console.error("Personal email login error:", err);
    return {
      success: false,
      error: `پرسنل ای میل اتھنٹیکیشن میں مسئلہ: ${err?.message || "سرور ایرر"}`,
    };
  }
}

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

    if (!email || !data.name || !data.clinicName) {
      return {
        success: false,
        error: "براہ کرم تمام لازمی فیلڈز مکمل کریں۔ (Please fill all required fields.)",
      };
    }

    const existingDoctor = await db.doctor.findUnique({
      where: { email },
    });

    if (existingDoctor) {
      return {
        success: false,
        error: "یہ ای میل پہلے سے رجسٹرڈ ہے۔ براہ کرم لاگ ان کریں۔ (An account with this email already exists.)",
      };
    }

    const passwordHash = data.password ? hashPassword(data.password) : null;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

    const tenant = await db.tenant.create({
      data: {
        name: data.clinicName || `${data.name}'s Homeopathic Clinic`,
        clinicName: data.clinicName || `${data.name}'s Homeopathic Clinic`,
        phone: data.phone || null,
        whatsapp: data.phone || null,
        email,
        currency: "PKR",
        prescriptionHeader: "HOLISTIC HOMEOPATHIC HEALTHCARE & CLINICAL SUITE",
        prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل",
        accountStatus: "demo",
        demoStartedAt: now,
        demoExpiresAt: expiresAt,
        doctors: {
          create: {
            name: data.name,
            qualification: data.qualification || "MD (Homeopathy), BHMS",
            registrationNumber: data.registrationNumber || null,
            email,
            passwordHash,
            phone: data.phone || null,
            role: "DOCTOR",
            status: "APPROVED",
            accountStatus: "demo",
            demoStartedAt: now,
            demoExpiresAt: expiresAt,
            active: true,
          },
        },
      },
      include: {
        doctors: true,
      },
    });

    const newDoctor = tenant.doctors[0];
    await createSession(newDoctor.id, tenant.id);

    revalidatePath("/");
    return { success: true, doctorId: newDoctor.id, tenantId: tenant.id, accountStatus: "demo" };
  } catch (err: any) {
    console.error("Register Server Action error:", err);
    return {
      success: false,
      error: "رجسٹریشن کے دوران مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔",
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
    console.error("Upgrade request error:", err);
    return { success: false, error: err?.message || "اپ گریڈ کی درخواست جمع کرنے میں خرابی۔" };
  }
}

export async function logoutDoctor() {
  await destroySession();
  revalidatePath("/");
  redirect("/login");
}

export async function getCurrentDoctor() {
  const session = await getVerifiedSession();
  if (!session) return null;

  return {
    doctorId: session.doctor.id,
    doctorName: session.doctor.name,
    doctorEmail: session.doctor.email,
    qualification: session.doctor.qualification,
    registrationNumber: session.doctor.registrationNumber,
    role: session.doctor.role,
    tenantId: session.doctor.tenant.id,
    clinicName: session.doctor.tenant.clinicName || session.doctor.tenant.name,
    accountStatus: (session.doctor.accountStatus || session.doctor.tenant.accountStatus || "demo") as AccountStatus,
    demoStartedAt: session.doctor.demoStartedAt || session.doctor.tenant.demoStartedAt,
    demoExpiresAt: session.doctor.demoExpiresAt || session.doctor.tenant.demoExpiresAt,
    upgradeRequestedAt: session.doctor.upgradeRequestedAt || session.doctor.tenant.upgradeRequestedAt,
    paymentReference: session.doctor.paymentReference || session.doctor.tenant.paymentReference,
    rejectionReason: session.doctor.rejectionReason || session.doctor.tenant.rejectionReason,
  };
}
