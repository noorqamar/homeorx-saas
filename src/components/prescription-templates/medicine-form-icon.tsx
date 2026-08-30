import React from "react";
import { Pill, Droplets, Sparkles, FlaskConical, CircleDot, ShieldAlert } from "lucide-react";

export function MedicineFormIcon({ form }: { form?: string | null }) {
  const formLower = (form || "").toLowerCase();

  if (formLower.includes("drop") || formLower.includes("dilution") || formLower.includes("قطرے") || formLower.includes("liquid")) {
    return <Droplets className="h-3.5 w-3.5 text-blue-500 shrink-0 inline-block mr-1" />;
  }

  if (formLower.includes("tablet") || formLower.includes("ٹیبلٹس")) {
    return <Pill className="h-3.5 w-3.5 text-indigo-500 shrink-0 inline-block mr-1" />;
  }

  if (formLower.includes("mother") || formLower.includes("tincture") || formLower.includes("مدر")) {
    return <FlaskConical className="h-3.5 w-3.5 text-emerald-600 shrink-0 inline-block mr-1" />;
  }

  if (formLower.includes("biochemic") || formLower.includes("powder") || formLower.includes("سفوف")) {
    return <CircleDot className="h-3.5 w-3.5 text-amber-500 shrink-0 inline-block mr-1" />;
  }

  // Default globules / pills / sweet discs
  return <Sparkles className="h-3.5 w-3.5 text-teal-600 shrink-0 inline-block mr-1" />;
}
