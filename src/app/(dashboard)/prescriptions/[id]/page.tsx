import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrescriptionById } from "@/app/actions/prescriptions";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Printer,
  Copy,
  Edit3,
} from "lucide-react";
import { DeletePrescriptionButton } from "./delete-prescription-button";
import { PrescriptionRenderer } from "@/components/prescription-templates/prescription-renderer";
import { type TemplatePresetId } from "@/components/prescription-templates/template-presets";

export const dynamic = "force-dynamic";

export default async function PrescriptionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rx = await getPrescriptionById(id);

  if (!rx) {
    notFound();
  }

  const preset = (rx.tenant?.templatePreset as TemplatePresetId) || "sage";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/prescriptions"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Prescriptions
        </Link>

        {/* Action Buttons: Edit, Print, Duplicate, Delete */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Edit Prescription Button */}
          <Link href={`/prescriptions/${rx.id}/edit`}>
            <Button
              variant="primary"
              size="sm"
              className="font-bold shadow-xs bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
            >
              <Edit3 className="h-3.5 w-3.5 mr-1.5" />
              Edit Prescription
            </Button>
          </Link>

          {/* Print A4 Letterhead Button */}
          <Link href={`/prescriptions/${rx.id}/print`}>
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print / Presets (A4)
            </Button>
          </Link>

          {/* Copy / Duplicate Button */}
          <Link href={`/prescriptions/new?duplicateFrom=${rx.id}`}>
            <Button variant="secondary" size="sm" className="text-xs">
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Repeat / Duplicate
            </Button>
          </Link>

          {/* Delete Button */}
          <DeletePrescriptionButton prescriptionId={rx.id} />
        </div>
      </div>

      {/* Redesigned Prescription Document Renderer */}
      <div className="shadow-md rounded-xl overflow-hidden bg-slate-100 p-1 sm:p-6 border border-slate-200">
        <PrescriptionRenderer
          rx={rx}
          preset={preset}
          showVerification={rx.tenant?.showQrCode ?? true}
        />
      </div>
    </div>
  );
}
