import { notFound } from "next/navigation";
import { getPatientById } from "@/app/actions/patients";
import { PatientProfileClient } from "./patient-profile-client";

export const dynamic = "force-dynamic";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatientById(id);

  if (!patient) {
    notFound();
  }

  return <PatientProfileClient patient={patient} />;
}
