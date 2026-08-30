import { getPrescriptionOptions } from "@/app/actions/medicines";
import { getNextPrescriptionNumber } from "@/app/actions/prescriptions";
import { PrescriptionFormClient } from "./prescription-form-client";

export const dynamic = "force-dynamic";

export default async function NewPrescriptionPage() {
  const [options, nextRxNumber] = await Promise.all([
    getPrescriptionOptions(),
    getNextPrescriptionNumber(),
  ]);

  return (
    <PrescriptionFormClient
      preloadedOptions={options}
      initialRxNumber={nextRxNumber}
    />
  );
}
