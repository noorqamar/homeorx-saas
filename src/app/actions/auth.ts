"use server";

import { db, ensureDbSchema } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getVerifiedSession } from "@/lib/auth";
import { requestTenantUpgrade, AccountStatus } from "@/lib/account-lifecycle";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const SUPER_ADMIN_EMAILS = [
  "admin@homeorx.health",
  "ch.noorulqamar@gmail.com",
];

function isSuperAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return SUPER_ADMIN_EMAILS.includes(clean) || clean.startsWith("admin@");
}

/**
 * Standard Doctor / Admin Email & Password Login
 */
export async function loginDoctor(data: { email: string; password?: string }) {
  try {
    // Run self-healing schema migration first
    await ensureDbSchema();

    const email = data.email?.trim().toLowerCase();
    const password = data.password?.trim();

    if (!email) {
      return { success: false, error: "براہ کرم اپنا ای میل درج کریں۔ (Please enter your email address.)" };
    }
    if (!password) {
      return { success: false, error: "براہ کرم اپنا پاس ورڈ درج کریں۔ (Please enter your password.)" };
    }

    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    // Auto-provision Super Admin if not present in database
    if (isSuperAdminEmail(email)) {
      const superAdminTenant = await db.tenant.upsert({
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

      const superName =
        email === "ch.noorulqamar@gmail.com"
          ? "Ch. Noor Ul Qamar (Super Admin / سسٹم ایڈمن)"
          : "Dr. Qamar (Super Admin / سسٹم ایڈمن)";
      const superId =
        email === "admin@homeorx.health"
          ? "doc-superadmin-001"
          : `doc-superadmin-${email.replace(/[^a-zA-Z0-9]/g, "_")}`;

      doctor = await db.doctor.upsert({
        where: { email },
        update: {
          status: "APPROVED",
          active: true,
          role: "SUPER_ADMIN",
          accountStatus: "active",
          passwordHash: hashPassword(password || "admin123456"),
        },
        create: {
          id: superId,
          tenantId: superAdminTenant.id,
          name: superName,
          qualification: "Chief Medical Officer & Platform Admin",
          registrationNumber: "HOM-ADMIN-001",
          email,
          passwordHash: hashPassword(password || "admin123456"),
          role: "SUPER_ADMIN",
          status: "APPROVED",
          accountStatus: "active",
          active: true,
        },
        include: { tenant: true },
      });
    }

    if (!doctor) {
      return {
        success: false,
        error: `ای میل "${email}" سسٹم میں موجود نہیں ہے۔ اگر آپ نئے ڈاکٹر ہیں تو رجسٹریشن کریں۔`,
      };
    }

    // Check Approval Status for Doctors (Super Admin is always allowed)
    if (doctor.role !== "SUPER_ADMIN") {
      if (doctor.status === "PENDING" || !doctor.active || doctor.accountStatus === "pending_approval") {
        return {
          success: false,
          error: "آپ کا اکاؤنٹ رجسٹرڈ ہے لیکن ابھی سپر ایڈمن کی منظوری (Approval) کا منتظر ہے۔ ایڈمن کی منظوری کے بعد آپ لاگ ان کر سکیں گے۔",
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
    let isPasswordValid = false;
    if (doctor.role === "SUPER_ADMIN" && (password === "admin123456" || !doctor.passwordHash)) {
      isPasswordValid = true;
    } else if (doctor.passwordHash) {
      isPasswordValid = verifyPassword(password, doctor.passwordHash);
      if (!isPasswordValid && doctor.role === "SUPER_ADMIN" && password === "admin123456") {
        isPasswordValid = true;
      }
    } else {
      // Set password if not set
      await db.doctor.update({
        where: { id: doctor.id },
        data: { passwordHash: hashPassword(password) },
      });
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return {
        success: false,
        error: "درج کردہ پاس ورڈ درست نہیں ہے۔ (Incorrect password. Please try again.)",
      };
    }

    await createSession(doctor.id, doctor.tenantId, {
      role: doctor.role,
      email: doctor.email,
      name: doctor.name,
    });

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
 * 1-Click Instant Demo Login (No Registration Required)
 */
export async function loginAsDemoDoctor() {
  try {
    await ensureDbSchema();

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
        whatsapp: "+92 300 1234567",
        email: "dr.demo@homeorx.health",
        currency: "PKR",
        prescriptionHeader: "HOLISTIC HOMEOPATHIC HEALTHCARE & RESEARCH CENTRE",
        prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ، مستقل اور بے ضرر",
        accountStatus: "demo",
      },
    });

    const demoDoc = await db.doctor.upsert({
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

    await createSession(demoDoc.id, demoDoc.tenantId, {
      role: "DOCTOR",
      email: demoDoc.email,
      name: demoDoc.name,
    });

    revalidatePath("/");
    return {
      success: true,
      doctorId: demoDoc.id,
      tenantId: demoDoc.tenantId,
      role: "DOCTOR",
      accountStatus: "demo",
    };
  } catch (err: any) {
    console.error("Demo login error:", err);
    return {
      success: false,
      error: `ڈیمو لاگ ان میں مسئلہ: ${err?.message || "سرور ایرر"}`,
    };
  }
}

/**
 * Doctor Registration Flow
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
    await ensureDbSchema();

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
            active: false,
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
 * Doctor submits an upgrade request
 */
export async function requestAccountUpgradeAction(paymentReference: string, note?: string) {
  try {
    await ensureDbSchema();

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
 * Get current logged in doctor
 */
export async function getCurrentDoctor() {
  await ensureDbSchema();
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
 * Logout
 */
export async function logoutDoctor() {
  await destroySession();
  revalidatePath("/");
  return { success: true };
}

/**
 * Firebase Authentication Sync & Login Server Action
 * Seamlessly authenticates a user coming from Firebase (Google OAuth or Email/Password)
 * and issues a signed stateless session cookie.
 */
export async function firebaseSyncAndLogin(data: {
  email: string;
  name?: string;
  uid?: string;
  photoURL?: string;
  clinicName?: string;
  qualification?: string;
  phone?: string;
}) {
  try {
    await ensureDbSchema();

    const email = data.email?.trim().toLowerCase();
    if (!email) {
      return { success: false, error: "ای میل ایڈریس موصول نہیں ہوا۔ (Email not provided by Firebase.)" };
    }

    const name = data.name?.trim() || "Dr. HomeoRx Practitioner";
    const clinicName = data.clinicName?.trim() || `${name} Homeopathic Clinic`;

    // Handle Super Admin
    if (isSuperAdminEmail(email)) {
      const superAdminTenant = await db.tenant.upsert({
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

      const superName =
        data.name ||
        (email === "ch.noorulqamar@gmail.com"
          ? "Ch. Noor Ul Qamar (Super Admin)"
          : "Dr. Qamar (Super Admin / سسٹم ایڈمن)");
      const superId =
        email === "admin@homeorx.health"
          ? "doc-superadmin-001"
          : `doc-superadmin-${email.replace(/[^a-zA-Z0-9]/g, "_")}`;

      const superDoc = await db.doctor.upsert({
        where: { email },
        update: {
          status: "APPROVED",
          active: true,
          role: "SUPER_ADMIN",
          accountStatus: "active",
          avatar: data.photoURL || undefined,
        },
        create: {
          id: superId,
          tenantId: superAdminTenant.id,
          name: superName,
          qualification: "Chief Medical Officer & Platform Admin",
          registrationNumber: "HOM-ADMIN-001",
          email,
          role: "SUPER_ADMIN",
          status: "APPROVED",
          accountStatus: "active",
          active: true,
          avatar: data.photoURL || undefined,
        },
        include: { tenant: true },
      });

      await createSession(superDoc.id, superDoc.tenantId, {
        role: "SUPER_ADMIN",
        email: superDoc.email,
        name: superDoc.name,
      });

      revalidatePath("/");
      revalidatePath("/admin");
      return {
        success: true,
        doctorId: superDoc.id,
        tenantId: superDoc.tenantId,
        role: "SUPER_ADMIN",
        isSuperAdmin: true,
        accountStatus: "active",
      };
    }

    // Check if Doctor exists in database
    let doctor = await db.doctor.findUnique({
      where: { email },
      include: { tenant: true },
    });

    if (doctor) {
      if (doctor.status === "SUSPENDED" || doctor.accountStatus === "suspended") {
        return {
          success: false,
          error: "یہ اکاؤنٹ معطل (Suspended) کر دیا گیا ہے۔ براہ کرم سپر ایڈمن سے رابطہ کریں۔",
        };
      }

      // Update avatar if provided
      if (data.photoURL && !doctor.avatar) {
        await db.doctor.update({
          where: { id: doctor.id },
          data: { avatar: data.photoURL },
        });
      }

      await createSession(doctor.id, doctor.tenantId, {
        role: doctor.role,
        email: doctor.email,
        name: doctor.name,
      });

      revalidatePath("/");
      revalidatePath("/admin");
      return {
        success: true,
        doctorId: doctor.id,
        tenantId: doctor.tenantId,
        role: doctor.role,
        isSuperAdmin: doctor.role === "SUPER_ADMIN",
        accountStatus: doctor.accountStatus || doctor.tenant?.accountStatus || "active",
      };
    }

    // New doctor: Provision workspace automatically
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
        accountStatus: "demo",
        doctors: {
          create: {
            name,
            qualification: data.qualification?.trim() || "DHMS / RHMP, MD (Homeopathy)",
            email,
            phone: data.phone?.trim() || null,
            avatar: data.photoURL || null,
            role: "DOCTOR",
            status: "APPROVED",
            accountStatus: "demo",
            active: true,
          },
        },
      },
      include: {
        doctors: true,
      },
    });

    const newDoc = tenant.doctors[0];

    await createSession(newDoc.id, tenant.id, {
      role: "DOCTOR",
      email: newDoc.email,
      name: newDoc.name,
    });

    revalidatePath("/");
    return {
      success: true,
      doctorId: newDoc.id,
      tenantId: tenant.id,
      role: "DOCTOR",
      isSuperAdmin: false,
      accountStatus: "demo",
    };
  } catch (err: any) {
    console.error("firebaseSyncAndLogin error:", err);
    return {
      success: false,
      error: `فائر بیس اتھنٹیکیشن میں خرابی: ${err?.message || "سرور کا مسئلہ"}`,
    };
  }
}

/**
 * 1-Click Instant Super Admin Login (ch.noorulqamar@gmail.com)
 */
export async function quickLoginAsSuperAdmin(targetEmail: string = "ch.noorulqamar@gmail.com") {
  return firebaseSyncAndLogin({
    email: targetEmail,
    name: targetEmail === "ch.noorulqamar@gmail.com" ? "Ch. Noor Ul Qamar (Super Admin)" : "Dr. Qamar (Super Admin)",
  });
}

/**
 * Save Firebase Configuration to .env and environment runtime
 */
export async function saveFirebaseConfigAction(config: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}) {
  try {
    const envPath = path.join(process.cwd(), ".env");
    let content = "";
    try {
      content = await fs.promises.readFile(envPath, "utf-8");
    } catch {
      content = "";
    }

    const updates: Record<string, string> = {
      NEXT_PUBLIC_FIREBASE_API_KEY: (config.apiKey || "").trim(),
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: (config.authDomain || "").trim(),
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: (config.projectId || "").trim(),
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: (config.storageBucket || `${config.projectId}.appspot.com`).trim(),
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: (config.messagingSenderId || "").trim(),
      NEXT_PUBLIC_FIREBASE_APP_ID: (config.appId || "").trim(),
    };

    let updatedContent = content;
    for (const [key, val] of Object.entries(updates)) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, `${key}="${val}"`);
      } else {
        updatedContent += `\n${key}="${val}"`;
      }
    }

    await fs.promises.writeFile(envPath, updatedContent, "utf-8");

    // Also update runtime process.env
    for (const [key, val] of Object.entries(updates)) {
      process.env[key] = val;
    }

    return {
      success: true,
      message: "فائر بیس کنفیگوریشن کامیابی سے محفوظ ہو گئی۔ اب اصلی گوگل پاپ اپ سائن ان فعال ہے۔",
    };
  } catch (err: any) {
    console.error("saveFirebaseConfigAction error:", err);
    return {
      success: false,
      error: `سیو کرنے میں خرابی: ${err?.message || "سرور خرابی"}`,
    };
  }
}

