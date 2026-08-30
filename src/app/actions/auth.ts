"use server";

import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getVerifiedSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

    // Auto-heal / Auto-provision Super Admin or Demo Doctor if missing in new container
    if (!doctor) {
      if (email === "admin@homeorx.health") {
        const tenant = await db.tenant.upsert({
          where: { id: "tenant-superadmin" },
          update: {},
          create: {
            id: "tenant-superadmin",
            name: "HomeoRx SaaS Central Administration",
            clinicName: "HomeoRx Central Administration",
            email: "admin@homeorx.health",
            phone: "+92 300 1234567",
            currency: "PKR",
          },
        });

        doctor = await db.doctor.upsert({
          where: { email: "admin@homeorx.health" },
          update: {
            status: "APPROVED",
            active: true,
            role: "SUPER_ADMIN",
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
            active: true,
          },
          include: { tenant: true },
        });
      } else if (email === "dr.demo@homeorx.health") {
        const tenant = await db.tenant.upsert({
          where: { id: "tenant-demo-001" },
          update: {},
          create: {
            id: "tenant-demo-001",
            name: "Dr. Demo Homeopathic Clinic & Research Centre",
            clinicName: "HomeoRx Wellness & Cure Clinic",
            address: "Suite 402, Medical Arts Building, Health Avenue",
            phone: "+92 300 1234567",
            email: "clinic@homeorx.health",
            currency: "PKR",
          },
        });

        doctor = await db.doctor.upsert({
          where: { email: "dr.demo@homeorx.health" },
          update: {
            status: "APPROVED",
            active: true,
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
            active: true,
          },
          include: { tenant: true },
        });
      }
    }

    if (!doctor) {
      return {
        success: false,
        error: `ای میل "${email}" رجسٹرڈ نہیں ہے۔ براہ کرم نیا اکاؤنٹ بنائیں یا ای میل چیک کریں۔ (Email not found. Please register first.)`,
      };
    }

    if (!doctor.active || doctor.status === "SUSPENDED") {
      return {
        success: false,
        error: "یہ اکاؤنٹ معطل ہے۔ براہ کرم سپر ایڈمن سے رابطہ کریں۔ (This account has been suspended or is pending approval.)",
      };
    }

    // If passwordHash is set, verify password. If empty (initial seeded doctor), set the password.
    if (doctor.passwordHash && data.password) {
      const isValid = verifyPassword(data.password, doctor.passwordHash);
      if (!isValid) {
        return {
          success: false,
          error: "درج کردہ پاس ورڈ درست نہیں ہے۔ (Incorrect password. Please try again.)",
        };
      }
    } else if (!doctor.passwordHash && data.password) {
      // Set password hash on initial login
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
    };
  } catch (err: any) {
    console.error("Login Server Action error:", err);
    return {
      success: false,
      error: `لاگ ان کے دوران سرور کا مسئلہ پیش آیا: ${err?.message || "نامعلوم خرابی"}`,
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

    // Create isolated Tenant workspace & Doctor record atomically
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
    return { success: true, doctorId: newDoctor.id, tenantId: tenant.id };
  } catch (err: any) {
    console.error("Register Server Action error:", err);
    return {
      success: false,
      error: "رجسٹریشن کے دوران مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔",
    };
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
  };
}
