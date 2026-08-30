"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, Palette, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrescriptionRenderer } from "@/components/prescription-templates/prescription-renderer";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "@/components/prescription-templates/template-presets";

export function PrintPrescriptionClient({ rx }: { rx: any }) {
  const initialPreset = (rx.tenant?.templatePreset as TemplatePresetId) || "sage";
  const [activePreset, setActivePreset] = useState<TemplatePresetId>(initialPreset);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 print:bg-white print:p-0">
      {/* Top Floating Action Bar & Template Preset Switcher (Hidden on Print) */}
      <div className="max-w-[210mm] mx-auto mb-5 no-print space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <Link
            href={`/prescriptions/${rx.id}`}
            className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Prescription Viewer
          </Link>

          {/* Template Preset Selector Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Palette className="h-3.5 w-3.5 text-emerald-600" />
              Template:
            </span>
            {(Object.keys(TEMPLATE_PRESETS) as TemplatePresetId[]).map((presetId) => {
              const p = TEMPLATE_PRESETS[presetId];
              const isSelected = activePreset === presetId;

              return (
                <button
                  key={presetId}
                  type="button"
                  onClick={() => setActivePreset(presetId)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 text-emerald-400" />}
                  <span>{p.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handlePrint}
            className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 text-xs"
          >
            <Printer className="h-4 w-4 mr-1.5" />
            Print / Save as PDF (A4)
          </Button>
        </div>
      </div>

      {/* Prescription Document Renderer */}
      <PrescriptionRenderer
        rx={rx}
        preset={activePreset}
        showVerification={rx.tenant?.showQrCode ?? true}
      />
    </div>
  );
}
