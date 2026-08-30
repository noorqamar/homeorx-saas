import { getAllDoctorsAndClinics, getAdminMetrics } from "@/app/actions/admin";
import { AdminPortalClient } from "./admin-portal-client";
import { redirect } from "next/navigation";
import { getCurrentDoctor } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

export default async function SuperAdminPage() {
  const current = await getCurrentDoctor();

  if (!current || current.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const [doctors, metrics] = await Promise.all([
    getAllDoctorsAndClinics(),
    getAdminMetrics(),
  ]);

  return <AdminPortalClient initialDoctors={doctors} metrics={metrics} />;
}
