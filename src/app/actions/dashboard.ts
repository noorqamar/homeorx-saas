"use server";

import { db } from "@/lib/db";
import { getTenantContext } from "@/lib/tenant";

export async function getDashboardStats() {
  const { tenantId } = await getTenantContext();

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
    db.patient.count({ where: { tenantId } }),
    db.patient.count({
      where: {
        tenantId,
        createdAt: { gte: startOfMonth },
      },
    }),
    db.prescription.count({ where: { tenantId } }),
    db.visit.count({
      where: {
        tenantId,
        visitDate: { gte: startOfDay },
      },
    }),
    db.patient.findMany({
      where: { tenantId },
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
      where: { tenantId },
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
