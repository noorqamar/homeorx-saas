"use server";

import { db } from "@/lib/db";
import { hashPassword, verifyPassword, createSession, destroySession, getVerifiedSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginDoctor(data: { email: string; password?: string }) {
  const email = data.email.trim().toLowerCase();

  const doctor = await db.doctor.findUnique({
    where: { email },
    include: { tenant: true },
  });

  if (!doctor || !doctor.active) {
    throw new Error("Invalid email or password. Please try again.");
  }

  // If passwordHash is set, verify password. If empty (demo doctor), allow initial access and set password
  if (doctor.passwordHash && data.password) {
    const isValid = verifyPassword(data.password, doctor.passwordHash);
    if (!isValid) {
      throw new Error("Invalid email or password. Please try again.");
    }
  } else if (!doctor.passwordHash && data.password) {
    // Set password hash on initial login for demo doctor
    await db.doctor.update({
      where: { id: doctor.id },
      data: { passwordHash: hashPassword(data.password) },
    });
  }

  await createSession(doctor.id, doctor.tenantId);

  revalidatePath("/");
  return { success: true, doctorId: doctor.id, tenantId: doctor.tenantId };
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
  const email = data.email.trim().toLowerCase();

  const existingDoctor = await db.doctor.findUnique({
    where: { email },
  });

  if (existingDoctor) {
    throw new Error("An account with this email address already exists.");
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
