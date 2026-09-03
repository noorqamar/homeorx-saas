"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { generatePrescriptionNumber } from "@/lib/utils";
import { prescriptionSchema, type PrescriptionFormData } from "@/lib/validations";
import { verifyPrescriptionCreationQuota } from "@/lib/feature-gate";
import { revalidatePath } from "next/cache";

export async function getPrescriptionQuotaStatus() {
  const { tenantId } = await getTenantContext();
  return await verifyPrescriptionCreationQuota(tenantId);
}

export async function getNextPrescriptionNumber(): Promise<string> {
  const { tenantId } = await getTenantContext();
  const currentYear = new Date().getFullYear();

  // Find latest prescription for current year in this tenant
  const count = await db.prescription.count({
    where: {
      tenantId,
    },
  });

  return generatePrescriptionNumber(count + 1, currentYear);
}

export async function getPrescriptions(filters?: {
  patientId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) {
  const { tenantId, doctorRole } = await getTenantContext();

  const whereClause: any = {};
  if (doctorRole !== "SUPER_ADMIN") {
    whereClause.tenantId = tenantId;
  }

  if (filters?.patientId) {
    whereClause.patientId = filters.patientId;
  }

  if (filters?.search && filters.search.trim().length > 0) {
    const term = filters.search.trim();
    whereClause.OR = [
      { prescriptionNumber: { contains: term } },
      { patient: { name: { contains: term } } },
      { patient: { patientNumber: { contains: term } } },
      { items: { some: { medicineName: { contains: term } } } },
    ];
  }

  if (filters?.startDate || filters?.endDate) {
    whereClause.prescriptionDate = {};
    if (filters.startDate) {
      whereClause.prescriptionDate.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      whereClause.prescriptionDate.lte = end;
    }
  }

  const prescriptions = await db.prescription.findMany({
    where: whereClause,
    orderBy: { prescriptionDate: "desc" },
    include: {
      patient: {
        select: {
          id: true,
          name: true,
          patientNumber: true,
          gender: true,
          age: true,
          phone: true,
        },
      },
      doctor: {
        select: {
          name: true,
          qualification: true,
          registrationNumber: true,
        },
      },
      items: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  return prescriptions;
}

export async function getPrescriptionById(id: string) {
  const { tenantId, doctorRole } = await getTenantContext();

  const whereClause: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    whereClause.tenantId = tenantId;
  }

  const prescription = await db.prescription.findFirst({
    where: whereClause,
    include: {
      patient: true,
      doctor: true,
      tenant: true,
      items: {
        orderBy: { sortOrder: "asc" },
      },
      visit: true,
    },
  });

  return prescription;
}

export async function createPrescription(rawData: PrescriptionFormData) {
  const { tenantId, doctorId } = await getTenantContext();

  // Enforce demo account limits and feature gating
  const quota = await verifyPrescriptionCreationQuota(tenantId);
  if (!quota.allowed) {
    throw new Error(quota.error || "ڈیمو اکاؤنٹ کی یومیہ حد مکمل ہو چکی ہے۔");
  }

  const validated = prescriptionSchema.parse(rawData);

  // Validate patient belongs to tenant
  const patient = await db.patient.findFirst({
    where: { id: validated.patientId, tenantId },
  });

  if (!patient) {
    throw new Error("Patient not found in active clinic workspace.");
  }

  // Calculate prescription number
  const nextPrescriptionNumber = await getNextPrescriptionNumber();

  // Create a visit record to track this consultation
  const totalVisits = await db.visit.count({
    where: { tenantId, patientId: patient.id },
  });

  const visit = await db.visit.create({
    data: {
      tenantId,
      patientId: patient.id,
      doctorId,
      visitNumber: totalVisits + 1,
      visitDate: new Date(validated.prescriptionDate),
      chiefComplaint: validated.chiefComplaint || patient.chiefComplaint || null,
      symptoms: validated.symptoms || null,
      diagnosis: validated.clinicalNotes || null,
    },
  });

  // Calculate follow up date if days provided
  let followUpDate: Date | null = null;
  if (validated.followUpDays && validated.followUpDays > 0) {
    followUpDate = new Date(validated.prescriptionDate);
    followUpDate.setDate(followUpDate.getDate() + validated.followUpDays);
  }

  // Create prescription
  const prescription = await db.prescription.create({
    data: {
      tenantId,
      patientId: patient.id,
      doctorId,
      visitId: visit.id,
      prescriptionNumber: nextPrescriptionNumber,
      prescriptionDate: new Date(validated.prescriptionDate),
      chiefComplaint: validated.chiefComplaint || null,
      symptoms: validated.symptoms || null,
      clinicalNotes: validated.clinicalNotes || null,
      generalInstructions: validated.generalInstructions || null,
      followUpDays: validated.followUpDays || null,
      followUpDate,
      items: {
        create: validated.items.map((item, index) => ({
          medicineName: item.medicineName,
          medicineId: item.medicineId || null,
          potency: item.potency,
          form: item.form || null,
          dose: item.dose || null,
          frequency: item.frequency || null,
          duration: item.duration || null,
          instructions: item.instructions || null,
          notes: item.notes || null,
          sortOrder: index + 1,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  revalidatePath("/prescriptions");
  revalidatePath(`/patients/${patient.id}`);
  revalidatePath("/");

  return prescription;
}

export async function updatePrescription(
  id: string,
  rawData: PrescriptionFormData
) {
  const { tenantId } = await getTenantContext();
  const validated = prescriptionSchema.parse(rawData);

  // Ensure prescription exists in this tenant
  const existing = await db.prescription.findFirst({
    where: { id, tenantId },
    include: { items: true },
  });

  if (!existing) {
    throw new Error("Prescription not found or unauthorized.");
  }

  // Calculate follow up date
  let followUpDate: Date | null = null;
  if (validated.followUpDays && validated.followUpDays > 0) {
    followUpDate = new Date(validated.prescriptionDate);
    followUpDate.setDate(followUpDate.getDate() + validated.followUpDays);
  }

  // Atomically update prescription metadata and replace items
  const updated = await db.$transaction(async (tx) => {
    // 1. Delete existing items
    await tx.prescriptionItem.deleteMany({
      where: { prescriptionId: id },
    });

    // 2. Update prescription header details
    const rx = await tx.prescription.update({
      where: { id },
      data: {
        prescriptionDate: new Date(validated.prescriptionDate),
        chiefComplaint: validated.chiefComplaint || null,
        symptoms: validated.symptoms || null,
        clinicalNotes: validated.clinicalNotes || null,
        generalInstructions: validated.generalInstructions || null,
        followUpDays: validated.followUpDays || null,
        followUpDate,
        items: {
          create: validated.items.map((item, index) => ({
            medicineName: item.medicineName,
            medicineId: item.medicineId || null,
            potency: item.potency,
            form: item.form || null,
            dose: item.dose || null,
            frequency: item.frequency || null,
            duration: item.duration || null,
            instructions: item.instructions || null,
            notes: item.notes || null,
            sortOrder: index + 1,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // 3. Update visit record if linked
    if (existing.visitId) {
      await tx.visit.update({
        where: { id: existing.visitId },
        data: {
          visitDate: new Date(validated.prescriptionDate),
          chiefComplaint: validated.chiefComplaint || null,
          symptoms: validated.symptoms || null,
          diagnosis: validated.clinicalNotes || null,
        },
      }).catch(() => {});
    }

    return rx;
  });

  revalidatePath("/prescriptions");
  revalidatePath(`/prescriptions/${id}`);
  revalidatePath(`/prescriptions/${id}/print`);
  revalidatePath(`/patients/${existing.patientId}`);
  revalidatePath("/");

  return updated;
}

export async function duplicatePrescription(sourcePrescriptionId: string) {
  const { tenantId } = await getTenantContext();

  const source = await db.prescription.findFirst({
    where: { id: sourcePrescriptionId, tenantId },
    include: { items: true },
  });

  if (!source) {
    throw new Error("Source prescription not found");
  }

  // Returns pre-filled data structure for the prescription form
  return {
    patientId: source.patientId,
    chiefComplaint: source.chiefComplaint,
    symptoms: source.symptoms,
    clinicalNotes: source.clinicalNotes,
    generalInstructions: source.generalInstructions,
    followUpDays: source.followUpDays,
    items: source.items.map((it) => ({
      medicineName: it.medicineName,
      medicineId: it.medicineId,
      potency: it.potency,
      form: it.form,
      dose: it.dose,
      frequency: it.frequency,
      duration: it.duration,
      instructions: it.instructions,
      notes: it.notes,
      sortOrder: it.sortOrder,
    })),
  };
}

export async function deletePrescription(id: string) {
  const { tenantId } = await getTenantContext();

  const existing = await db.prescription.findFirst({
    where: { id, tenantId },
  });

  if (!existing) {
    throw new Error("Prescription not found or unauthorized");
  }

  await db.prescription.delete({
    where: { id },
  });

  revalidatePath("/prescriptions");
  revalidatePath("/");
  return { success: true };
}
