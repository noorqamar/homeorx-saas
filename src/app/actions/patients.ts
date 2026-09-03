"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { generatePatientNumber } from "@/lib/utils";
import { patientSchema, type PatientFormData } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getPatients(query?: string) {
  const { tenantId, doctorRole } = await getTenantContext();

  const whereClause: any = {};
  if (doctorRole !== "SUPER_ADMIN") {
    whereClause.tenantId = tenantId;
  }

  if (query && query.trim().length > 0) {
    const term = query.trim();
    whereClause.OR = [
      { name: { contains: term } },
      { patientNumber: { contains: term } },
      { phone: { contains: term } },
      { whatsapp: { contains: term } },
      { city: { contains: term } },
    ];
  }

  const patients = await db.patient.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          prescriptions: true,
          visits: true,
        },
      },
    },
  });

  return patients;
}

export async function searchPatients(term: string) {
  const { tenantId, doctorRole } = await getTenantContext();
  if (!term || term.trim().length === 0) return [];

  const clean = term.trim();
  const whereClause: any = {
    OR: [
      { name: { contains: clean } },
      { patientNumber: { contains: clean } },
      { phone: { contains: clean } },
      { whatsapp: { contains: clean } },
    ],
  };

  if (doctorRole !== "SUPER_ADMIN") {
    whereClause.tenantId = tenantId;
  }

  return db.patient.findMany({
    where: whereClause,
    take: 10,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      patientNumber: true,
      gender: true,
      age: true,
      phone: true,
      whatsapp: true,
      chiefComplaint: true,
    },
  });
}

export async function getPatientById(id: string) {
  const { tenantId, doctorRole } = await getTenantContext();

  const whereClause: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    whereClause.tenantId = tenantId;
  }

  const patient = await db.patient.findFirst({
    where: whereClause,
    include: {
      prescriptions: {
        orderBy: { prescriptionDate: "desc" },
        include: {
          items: {
            orderBy: { sortOrder: "asc" },
          },
          doctor: {
            select: {
              name: true,
              qualification: true,
              registrationNumber: true,
            },
          },
        },
      },
      visits: {
        orderBy: { visitDate: "desc" },
      },
    },
  });

  return patient;
}

export async function createPatient(rawData: PatientFormData) {
  const { tenantId, doctorRole } = await getTenantContext();
  const validated = patientSchema.parse(rawData);

  // Auto-generate next patient sequence
  const count = await db.patient.count({
    where: doctorRole === "SUPER_ADMIN" ? {} : { tenantId },
  });
  const patientNumber = generatePatientNumber(count + 1);

  const patient = await db.patient.create({
    data: {
      tenantId,
      patientNumber,
      name: validated.name,
      fatherName: validated.fatherName || null,
      gender: validated.gender,
      dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : null,
      age: validated.age || null,
      phone: validated.phone || null,
      whatsapp: validated.whatsapp || null,
      email: validated.email || null,
      address: validated.address || null,
      city: validated.city || null,
      occupation: validated.occupation || null,
      chiefComplaint: validated.chiefComplaint || null,
      medicalHistory: validated.medicalHistory || null,
      familyHistory: validated.familyHistory || null,
      allergies: validated.allergies || null,
      currentMedicines: validated.currentMedicines || null,
      previousTreatment: validated.previousTreatment || null,
      notes: validated.notes || null,
    },
  });

  revalidatePath("/patients");
  revalidatePath("/dashboard");
  revalidatePath("/");
  return patient;
}

export async function updatePatient(id: string, rawData: PatientFormData) {
  const { tenantId, doctorRole } = await getTenantContext();
  const validated = patientSchema.parse(rawData);

  const existingWhere: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    existingWhere.tenantId = tenantId;
  }

  const existing = await db.patient.findFirst({
    where: existingWhere,
  });

  if (!existing) {
    throw new Error("Patient record not found or unauthorized.");
  }

  const updated = await db.patient.update({
    where: { id },
    data: {
      name: validated.name,
      fatherName: validated.fatherName || null,
      gender: validated.gender,
      dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : null,
      age: validated.age || null,
      phone: validated.phone || null,
      whatsapp: validated.whatsapp || null,
      email: validated.email || null,
      address: validated.address || null,
      city: validated.city || null,
      occupation: validated.occupation || null,
      chiefComplaint: validated.chiefComplaint || null,
      medicalHistory: validated.medicalHistory || null,
      familyHistory: validated.familyHistory || null,
      allergies: validated.allergies || null,
      currentMedicines: validated.currentMedicines || null,
      previousTreatment: validated.previousTreatment || null,
      notes: validated.notes || null,
    },
  });

  revalidatePath(`/patients/${id}`);
  revalidatePath("/patients");
  revalidatePath("/");
  return updated;
}

export async function deletePatient(id: string) {
  const { tenantId, doctorRole } = await getTenantContext();

  const existingWhere: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    existingWhere.tenantId = tenantId;
  }

  const existing = await db.patient.findFirst({
    where: existingWhere,
  });

  if (!existing) {
    throw new Error("Patient not found or unauthorized");
  }

  await db.patient.delete({
    where: { id },
  });

  revalidatePath("/patients");
  revalidatePath("/dashboard");
  revalidatePath("/");
  return { success: true };
}
