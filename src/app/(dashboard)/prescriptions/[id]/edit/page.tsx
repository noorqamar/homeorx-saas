import { notFound } from "next/navigation";
import { getPrescriptionById } from "@/app/actions/prescriptions";
import { getPrescriptionOptions } from "@/app/actions/medicines";
import { PrescriptionFormClient } from "@/app/(dashboard)/prescriptions/new/prescription-form-client";

export const dynamic = "force-dynamic";

export default async function EditPrescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [rx, options] = await Promise.all([
    getPrescriptionById(id),
    getPrescriptionOptions(),
  ]);

  if (!rx) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Edit Prescription
        </h1>
        <p className="text-xs text-slate-500">
          Update prescribed remedies, potencies, dosages, frequencies, or dietary advice for #{rx.prescriptionNumber}.
        </p>
      </div>

      <PrescriptionFormClient
        preloadedOptions={options}
        initialData={rx}
        isEditMode={true}
      />
    </div>
  );
}
