import { getClinicProfile } from "@/app/actions/clinic";
import { ClinicProfileClient } from "./clinic-profile-client";

export const dynamic = "force-dynamic";

export default async function ClinicProfilePage() {
  const profile = await getClinicProfile();
  return <ClinicProfileClient initialData={profile} />;
}
