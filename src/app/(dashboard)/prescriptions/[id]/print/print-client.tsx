"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, Palette, Check, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrescriptionRenderer } from "@/components/prescription-templates/prescription-renderer";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "@/components/prescription-templates/template-presets";
import { UpgradeModal } from "@/components/upgrade-modal";

export function PrintPrescriptionClient({ rx }: { rx: any }) {
  const isDemo =
    rx.tenant?.accountStatus === "demo" ||
    rx.tenant?.accountStatus === "pending_approval" ||
    rx.doctor?.accountStatus === "demo" ||
    rx.doctor?.accountStatus === "pending_approval";

  const initialPreset = (rx.tenant?.templatePreset as TemplatePresetId) || "sage";
  const [activePreset, setActivePreset] = useState<TemplatePresetId>(isDemo ? "sage" : initialPreset);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handlePresetSelect = (presetId: TemplatePresetId) => {
    if (isDemo && presetId !== "sage") {
      setShowUpgradeModal(true);
      return;
    }
    setActivePreset(presetId);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-3 sm:py-6 px-2 sm:px-4 print:bg-white print:p-0 print:m-0 print:min-h-0">
      {/* Top Action Bar (Hidden on Print) */}
      <div className="max-w-[1000px] mx-auto mb-3 sm:mb-5 no-print space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <Link
            href={`/prescriptions/${rx.id}`}
            className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-[44px] sm:min-h-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Prescription Viewer
          </Link>

          {/* Template Preset Selector Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Palette className="h-3.5 w-3.5 text-emerald-600" />
              Template:
            </span>
            {(Object.keys(TEMPLATE_PRESETS) as TemplatePresetId[]).map((presetId) => {
              const p = TEMPLATE_PRESETS[presetId];
              const isSelected = activePreset === presetId;
              const isLocked = isDemo && presetId !== "sage";

              return (
                <button
                  key={presetId}
                  type="button"
                  onClick={() => handlePresetSelect(presetId)}
                  className={`px-3 py-2 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 min-h-[44px] sm:min-h-0 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : isLocked
                      ? "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 text-emerald-400" />}
                  {isLocked && <Lock className="h-3 w-3 text-amber-500" />}
                  <span>{p.name.split(" ")[0]}</span>
                </button>
              );
            })}

            {isDemo && (
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 flex items-center gap-1 min-h-[44px] sm:min-h-0"
              >
                <Zap className="h-3 w-3 text-amber-600" />
                <span>Unlock All</span>
              </button>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handlePrint}
            className="font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 text-xs min-h-[44px] sm:min-h-0"
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

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentStatus={rx.tenant?.accountStatus || "demo"}
      />
    </div>
  );
}
