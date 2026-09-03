import { db } from "./db";
import { getVerifiedSession } from "./auth";

export interface TenantContext {
  tenantId: string;
  tenantName: string;
  clinicName: string | null;
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  doctorRole: string;
}

/**
 * Resolves the active Tenant and Doctor context securely on the server.
 * When logged in, it derives context from the verified session in the database.
 * If not logged in, it falls back to the default demo tenant for development ease.
 */
export async function getTenantContext(): Promise<TenantContext> {
  const session = await getVerifiedSession();

  if (session && session.doctor) {
    return {
      tenantId: session.doctor.tenantId,
      tenantName: session.doctor.tenant?.name || session.doctor.tenant?.clinicName || "HomeoRx Clinic",
      clinicName: session.doctor.tenant?.clinicName || session.doctor.tenant?.name || "HomeoRx Clinic",
      doctorId: session.doctor.id,
      doctorName: session.doctor.name,
      doctorEmail: session.doctor.email,
      doctorRole: session.doctor.role,
    };
  }

  // Fallback for initial demo workspace if no session is set
  let tenant = await db.tenant.findFirst({
    include: {
      doctors: {
        where: { active: true },
        take: 1,
      },
    },
  });

  if (!tenant) {
    tenant = await db.tenant.create({
      data: {
        name: "Dr. Demo Homeopathic Clinic",
        clinicName: "HomeoRx Wellness & Cure Clinic",
        address: "Suite 402, Medical Arts Building, Health Avenue",
        phone: "+92 300 1234567 / +1 (555) 234-5678",
        whatsapp: "+92 300 1234567",
        email: "clinic@homeorx.health",
        website: "https://homeorx.health",
        timings: "Mon - Sat: 9:00 AM - 8:00 PM",
        currency: "PKR",
        prescriptionHeader: "HOLISTIC HOMEOPATHIC HEALTHCARE & RESEARCH CENTRE",
        prescriptionFooter: "Classical Homeopathy • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل",
        doctors: {
          create: {
            name: "Dr. Demo Hahnemann, MD (Hom)",
            qualification: "MD (Homeopathy), BHMS, Gold Medalist",
            registrationNumber: "HOM-REG-2026-8942",
            email: "dr.demo@homeorx.health",
            phone: "+92 300 1234567",
            role: "DOCTOR",
          },
        },
      },
      include: {
        doctors: true,
      },
    });
  }

  const doctor = tenant.doctors[0];

  return {
    tenantId: tenant.id,
    tenantName: tenant.name,
    clinicName: tenant.clinicName,
    doctorId: doctor?.id ?? "",
    doctorName: doctor?.name ?? "Dr. Demo",
    doctorEmail: doctor?.email ?? "dr.demo@homeorx.health",
    doctorRole: doctor?.role ?? "DOCTOR",
  };
}
