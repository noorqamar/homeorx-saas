import { redirect } from "next/navigation";
import { getVerifiedSession } from "@/lib/auth";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getVerifiedSession();

  if (!session) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
