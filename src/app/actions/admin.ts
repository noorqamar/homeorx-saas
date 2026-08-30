"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { revalidatePath } from "next/cache";

/**
 * Super Admin check helper
 */
async function ensureSuperAdmin() {
  const { doctorId } = await getTenantContext();
  const currentDoctor = await db.doctor.findUnique({
    where: { id: doctorId },
  });

  if (!currentDoctor || currentDoctor.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized: Super Admin access required.");
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
    active: doc.active,
    createdAt: doc.createdAt,
    clinicId: doc.tenant.id,
    clinicName: doc.tenant.clinicName || doc.tenant.name,
    clinicAddress: doc.tenant.address,
    totalPatients: doc.tenant._count.patients,
    totalPrescriptions: doc.tenant._count.prescriptions,
  }));
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

  const [totalDoctors, pendingDoctors, totalClinics, totalPrescriptions, totalPatients] =
    await Promise.all([
      db.doctor.count(),
      db.doctor.count({ where: { status: "PENDING" } }),
      db.tenant.count(),
      db.prescription.count(),
      db.patient.count(),
    ]);

  return {
    totalDoctors,
    pendingDoctors,
    totalClinics,
    totalPrescriptions,
    totalPatients,
  };
}
