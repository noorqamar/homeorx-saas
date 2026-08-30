"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";
import { clinicProfileSchema, type ClinicProfileFormData } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function getClinicProfile() {
  const { tenantId, doctorId } = await getTenantContext();

  const tenant = await db.tenant.findUnique({
    where: { id: tenantId },
    include: {
      doctors: {
        where: { id: doctorId },
      },
    },
  });

  if (!tenant) throw new Error("Clinic profile not found");

  const doctor = tenant.doctors[0];

  return {
    clinicId: tenant.id,
    clinicName: tenant.clinicName || tenant.name,
    tagline: tenant.tagline,
    address: tenant.address,
    phone: tenant.phone,
    whatsapp: tenant.whatsapp,
    email: tenant.email,
    website: tenant.website,
    timings: tenant.timings,
    logo: tenant.logo,
    digitalSignature: tenant.digitalSignature,
    accentColor: tenant.accentColor || "#059669",
    templatePreset: tenant.templatePreset || "sage",
    showQrCode: tenant.showQrCode ?? true,
    prescriptionHeader: tenant.prescriptionHeader,
    prescriptionFooter: tenant.prescriptionFooter,
    doctorId: doctor?.id,
    doctorName: doctor?.name,
    qualification: doctor?.qualification,
    registrationNumber: doctor?.registrationNumber,
  };
}

export async function updateClinicProfile(data: ClinicProfileFormData) {
  const { tenantId, doctorId } = await getTenantContext();
  const validated = clinicProfileSchema.parse(data);

  // Update Tenant / Clinic information
  await db.tenant.update({
    where: { id: tenantId },
    data: {
      name: validated.clinicName,
      clinicName: validated.clinicName,
      tagline: validated.tagline || null,
      address: validated.address || null,
      phone: validated.phone || null,
      whatsapp: validated.whatsapp || null,
      email: validated.email || null,
      website: validated.website || null,
      timings: validated.timings || null,
      prescriptionHeader: validated.prescriptionHeader || null,
      prescriptionFooter: validated.prescriptionFooter || null,
      logo: validated.logo || null,
      digitalSignature: validated.digitalSignature || null,
      accentColor: validated.accentColor || "#059669",
      templatePreset: validated.templatePreset || "sage",
      showQrCode: validated.showQrCode ?? true,
    },
  });

  // Update Doctor information
  if (doctorId) {
    await db.doctor.update({
      where: { id: doctorId },
      data: {
        name: validated.name,
        qualification: validated.qualification || null,
        registrationNumber: validated.registrationNumber || null,
        phone: validated.phone || null,
      },
    });
  }

  revalidatePath("/clinic");
  revalidatePath("/prescriptions");
  return { success: true };
}
