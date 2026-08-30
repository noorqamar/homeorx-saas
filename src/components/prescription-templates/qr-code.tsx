import React from "react";
import { QrCode as QrIcon, ShieldCheck } from "lucide-react";

export function PrescriptionVerificationBadge({
  rxNumber,
  prescriptionId,
}: {
  rxNumber: string;
  prescriptionId: string;
}) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs text-[10px] text-slate-700 shrink-0">
      <div className="h-8 w-8 rounded bg-slate-900 text-white flex items-center justify-center shrink-0">
        <QrIcon className="h-5 w-5 text-emerald-400" />
      </div>
      <div className="leading-tight text-left">
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          <span>Verified EMR Rx</span>
        </div>
        <span className="font-mono text-[9px] text-slate-500 block truncate max-w-[90px]">
          {rxNumber}
        </span>
      </div>
    </div>
  );
}
