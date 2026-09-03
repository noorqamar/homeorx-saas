"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";

export async function getDashboardStats() {
  const { tenantId, doctorRole } = await getTenantContext();

  const whereTenant: any = {};
  if (doctorRole !== "SUPER_ADMIN") {
    whereTenant.tenantId = tenantId;
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalPatients,
    newPatientsThisMonth,
    totalPrescriptions,
    todayVisits,
    recentPatients,
    recentPrescriptions,
  ] = await Promise.all([
    db.patient.count({ where: whereTenant }),
    db.patient.count({
      where: {
        ...whereTenant,
        createdAt: { gte: startOfMonth },
      },
    }),
    db.prescription.count({ where: whereTenant }),
    db.visit.count({
      where: {
        ...whereTenant,
        visitDate: { gte: startOfDay },
      },
    }),
    db.patient.findMany({
      where: whereTenant,
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        _count: {
          select: {
            prescriptions: true,
            visits: true,
          },
        },
      },
    }),
    db.prescription.findMany({
      where: whereTenant,
      orderBy: { prescriptionDate: "desc" },
      take: 6,
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
        items: {
          orderBy: { sortOrder: "asc" },
        },
      },
    }),
  ]);

  return {
    totalPatients,
    newPatientsThisMonth,
    totalPrescriptions,
    todayVisits,
    recentPatients,
    recentPrescriptions,
  };
}
