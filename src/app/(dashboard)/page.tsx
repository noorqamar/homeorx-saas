import { getDashboardStats } from "@/app/actions/dashboard";
import { BehanceDashboardView } from "@/components/dashboard/behance-dashboard-view";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return <BehanceDashboardView stats={stats} />;
}
