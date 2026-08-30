import { notFound } from "next/navigation";
import { getPrescriptionById } from "@/app/actions/prescriptions";
import { PrintPrescriptionClient } from "./print-client";

export const dynamic = "force-dynamic";

export default async function PrintPrescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rx = await getPrescriptionById(id);

  if (!rx) {
    notFound();
  }

  return <PrintPrescriptionClient rx={rx} />;
}
