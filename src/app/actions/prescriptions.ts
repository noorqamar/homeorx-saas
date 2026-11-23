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

export async function getNextPrescriptionNumber(overrideTenantId?: string): Promise<string> {
  const { tenantId, doctorRole } = await getTenantContext();
  const activeTenantId = overrideTenantId || tenantId;
  const currentYear = new Date().getFullYear();

  const whereClause: any = doctorRole === "SUPER_ADMIN" && !overrideTenantId ? {} : { tenantId: activeTenantId };

  // 1. Query current total count
  const count = await db.prescription.count({ where: whereClause });

  // 2. Query latest prescription number to determine highest sequence
  const latestRx = await db.prescription.findFirst({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: { prescriptionNumber: true },
  });

  let seq = count + 1;
  if (latestRx?.prescriptionNumber) {
    const match = latestRx.prescriptionNumber.match(/RX-\d{4}-(\d+)/);
    if (match) {
      const lastSeq = parseInt(match[1], 10);
      if (!isNaN(lastSeq) && lastSeq >= seq) {
        seq = lastSeq + 1;
      }
    }
  }

  // 3. Guarantee absolute uniqueness across database
  let candidate = generatePrescriptionNumber(seq, currentYear);
  let exists = await db.prescription.findFirst({
    where: { tenantId: activeTenantId, prescriptionNumber: candidate },
  });

  while (exists) {
    seq++;
    candidate = generatePrescriptionNumber(seq, currentYear);
    exists = await db.prescription.findFirst({
      where: { tenantId: activeTenantId, prescriptionNumber: candidate },
    });
  }

  return candidate;
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
  const { tenantId, doctorId, doctorRole, doctorName, doctorEmail } = await getTenantContext();

  // Enforce demo account limits for non-superadmin
  if (doctorRole !== "SUPER_ADMIN") {
    const quota = await verifyPrescriptionCreationQuota(tenantId);
    if (!quota.allowed) {
      throw new Error(quota.error || "ڈیمو اکاؤنٹ کی یومیہ حد مکمل ہو چکی ہے۔");
    }
  }

  const validated = prescriptionSchema.parse(rawData);

  // Validate patient
  const patientWhere: any = { id: validated.patientId };
  if (doctorRole !== "SUPER_ADMIN") {
    patientWhere.tenantId = tenantId;
  }
  const patient = await db.patient.findFirst({
    where: patientWhere,
  });

  if (!patient) {
    throw new Error("Patient not found in active clinic workspace.");
  }

  const targetTenantId = patient.tenantId || tenantId;

  // 1. Guarantee valid doctor exists in SQLite database
  let safeDoctorId = doctorId;
  const docInDb = await db.doctor.findUnique({ where: { id: doctorId } });
  if (!docInDb) {
    const fallbackDoc = await db.doctor.findFirst({ where: { tenantId: targetTenantId } });
    if (fallbackDoc) {
      safeDoctorId = fallbackDoc.id;
    } else {
      const anyDoc = await db.doctor.findFirst();
      if (anyDoc) {
        safeDoctorId = anyDoc.id;
      } else {
        const newDoc = await db.doctor.create({
          data: {
            id: doctorId,
            tenantId: targetTenantId,
            name: doctorName || "HomeoRx Doctor",
            email: doctorEmail || "doctor@clinic.com",
            role: doctorRole || "DOCTOR",
            status: "APPROVED",
            active: true,
          },
        });
        safeDoctorId = newDoc.id;
      }
    }
  }

  // 2. Guarantee valid tenant exists in SQLite database
  let safeTenantId = targetTenantId;
  const tenantInDb = await db.tenant.findUnique({ where: { id: targetTenantId } });
  if (!tenantInDb) {
    const anyTenant = await db.tenant.findFirst();
    if (anyTenant) {
      safeTenantId = anyTenant.id;
    }
  }

  // 3. Guarantee strictly unique prescription sequence number
  const nextPrescriptionNumber = await getNextPrescriptionNumber(safeTenantId);

  // 4. Create a visit record to track this consultation
  const totalVisits = await db.visit.count({
    where: { patientId: patient.id },
  });

  const visit = await db.visit.create({
    data: {
      tenantId: safeTenantId,
      patientId: patient.id,
      doctorId: safeDoctorId,
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

  // 5. Sanitize item medicines against foreign key
  const sanitizedItems = await Promise.all(
    validated.items.map(async (item, index) => {
      let safeMedId: string | null = null;
      if (item.medicineId) {
        const medExists = await db.medicine.findUnique({ where: { id: item.medicineId } });
        if (medExists) safeMedId = item.medicineId;
      }
      return {
        medicineName: item.medicineName,
        medicineId: safeMedId,
        potency: item.potency,
        form: item.form || null,
        dose: item.dose || null,
        frequency: item.frequency || null,
        duration: item.duration || null,
        instructions: item.instructions || null,
        notes: item.notes || null,
        sortOrder: index + 1,
      };
    })
  );

  // 6. Create prescription
  const prescription = await db.prescription.create({
    data: {
      tenantId: safeTenantId,
      patientId: patient.id,
      doctorId: safeDoctorId,
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
        create: sanitizedItems,
      },
    },
    include: {
      items: true,
    },
  });

  try {
    revalidatePath("/prescriptions");
    revalidatePath(`/patients/${patient.id}`);
    revalidatePath("/");
  } catch (err) {
    console.error("Revalidation note:", err);
  }

  return prescription;
}

export async function updatePrescription(
  id: string,
  rawData: PrescriptionFormData
) {
  const { tenantId, doctorRole } = await getTenantContext();
  const validated = prescriptionSchema.parse(rawData);

  // Ensure prescription exists in this tenant (or all if super admin)
  const existingWhere: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    existingWhere.tenantId = tenantId;
  }

  const existing = await db.prescription.findFirst({
    where: existingWhere,
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

  // Sanitize item medicines against foreign key
  const sanitizedItems = await Promise.all(
    validated.items.map(async (item, index) => {
      let safeMedId: string | null = null;
      if (item.medicineId) {
        const medExists = await db.medicine.findUnique({ where: { id: item.medicineId } });
        if (medExists) safeMedId = item.medicineId;
      }
      return {
        medicineName: item.medicineName,
        medicineId: safeMedId,
        potency: item.potency,
        form: item.form || null,
        dose: item.dose || null,
        frequency: item.frequency || null,
        duration: item.duration || null,
        instructions: item.instructions || null,
        notes: item.notes || null,
        sortOrder: index + 1,
      };
    })
  );

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
          create: sanitizedItems,
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

  try {
    revalidatePath("/prescriptions");
    revalidatePath(`/prescriptions/${id}`);
    revalidatePath(`/prescriptions/${id}/print`);
    revalidatePath(`/patients/${existing.patientId}`);
    revalidatePath("/");
  } catch (err) {
    console.error("Revalidation note:", err);
  }

  return updated;
}

export async function duplicatePrescription(sourcePrescriptionId: string) {
  const { tenantId, doctorRole } = await getTenantContext();

  const sourceWhere: any = { id: sourcePrescriptionId };
  if (doctorRole !== "SUPER_ADMIN") {
    sourceWhere.tenantId = tenantId;
  }

  const source = await db.prescription.findFirst({
    where: sourceWhere,
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
  const { tenantId, doctorRole } = await getTenantContext();

  const existingWhere: any = { id };
  if (doctorRole !== "SUPER_ADMIN") {
    existingWhere.tenantId = tenantId;
  }

  const existing = await db.prescription.findFirst({
    where: existingWhere,
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
