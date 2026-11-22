import { getAllDoctorsAndClinics, getAdminMetrics } from "@/app/actions/admin";
import { AdminPortalClient } from "./admin-portal-client";
import { redirect } from "next/navigation";
import { getCurrentDoctor } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

export default async function SuperAdminPage() {
  const current = await getCurrentDoctor();

  if (!current || current.role !== "SUPER_ADMIN") {
    redirect("/login");
  }

  let doctors: any[] = [];
  let metrics: any = {
    totalDoctors: 0,
    pendingUpgrades: 0,
    demoDoctors: 0,
    activeDoctors: 0,
    totalClinics: 0,
    totalPrescriptions: 0,
    totalPatients: 0,
  };

  try {
    const [d, m] = await Promise.all([
      getAllDoctorsAndClinics(),
      getAdminMetrics(),
    ]);
    doctors = d;
    metrics = m;
  } catch (err: any) {
    console.warn("SuperAdminPage data fetch note:", err?.message || err);
    redirect("/login");
  }

  return <AdminPortalClient initialDoctors={doctors} metrics={metrics} />;
}
