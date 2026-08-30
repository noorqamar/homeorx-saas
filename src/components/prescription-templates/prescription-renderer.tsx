"use client";

import React from "react";
import { formatDate } from "@/lib/utils";
import { PrescriptionVerificationBadge } from "./qr-code";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "./template-presets";
import { AlertCircle } from "lucide-react";

// Helper to cleanly parse bilingual data into Line 1 (English) and Line 2 (Urdu)
function parseBilingual(text?: string | null): { en: string; ur: string } {
  if (!text) return { en: "—", ur: "" };

  const clean = text.trim();

  // Case 1: Separated by bullet "•"
  if (clean.includes("•")) {
    const parts = clean.split("•").map((s) => s.trim());
    return { en: parts[0] || "—", ur: parts[1] || "" };
  }

  // Case 2: Separated by slash " / "
  if (clean.includes(" / ")) {
    const parts = clean.split(" / ").map((s) => s.trim());
    return { en: parts[0] || "—", ur: parts[1] || "" };
  }

  // Case 3: Duration auto-conversion (e.g. "7 days" -> "7 دن")
  const numMatch = clean.toLowerCase().match(/^(\d+)\s*(days?|weeks?|months?)$/);
  if (numMatch) {
    const num = numMatch[1];
    const unit = numMatch[2];
    const urUnit = unit.startsWith("day") ? "دن" : unit.startsWith("week") ? "ہفتے" : "ماہ";
    return { en: clean, ur: `${num} ${urUnit}` };
  }

  // Check if string contains Urdu characters
  const hasUrdu = /[\u0600-\u06FF]/.test(clean);
  const hasEnglish = /[a-zA-Z]/.test(clean);

  if (hasUrdu && !hasEnglish) {
    return { en: "", ur: clean };
  }

  return { en: clean, ur: "" };
}

export function PrescriptionRenderer({
  rx,
  preset = "sage",
  showVerification = true,
}: {
  rx: any;
  preset?: TemplatePresetId;
  showVerification?: boolean;
}) {
  const theme = TEMPLATE_PRESETS[preset] || TEMPLATE_PRESETS.sage;

  // Split general instructions into clean array of lines
  const rawInstructions = rx.generalInstructions
    ? rx.generalInstructions
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0)
    : [];

  const tenant = rx.tenant || {};
  const doctor = rx.doctor || {};
  const patient = rx.patient || {};

  return (
    <div
      className={`w-full max-w-[210mm] mx-auto bg-white p-6 sm:p-7 shadow-lg print:shadow-none print:p-0 print:m-0 print:w-full flex flex-col justify-between border ${theme.colors.containerBorder} rounded-xl print:rounded-none print:border-0 text-slate-800 a4-print-sheet`}
      style={{ minHeight: "272mm", maxHeight: "282mm" }}
    >
      {/* ================= TOP / MIDDLE MAIN CONTENT ================= */}
      <div className="space-y-2.5 flex-1 min-w-0">
        {/* 1. CLINIC & DOCTOR HEADER */}
        <div className={`border-b-2 ${theme.colors.headerBorder} pb-2.5`}>
          <div className="flex justify-between items-start gap-4">
            {/* Left: Logo / Clinic Name & Doctor Details */}
            <div className="space-y-0.5 flex-1 min-w-0">
              {tenant.logo ? (
                <img
                  src={tenant.logo}
                  alt="Clinic Logo"
                  className="h-11 max-w-[120px] object-contain mb-1"
                />
              ) : (
                <div
                  className={`inline-block px-2 py-0.5 rounded ${theme.colors.badgeBg} ${theme.colors.badgeText} font-bold text-[9px] uppercase tracking-wider border ${theme.colors.badgeBorder} mb-0.5`}
                >
                  {tenant.prescriptionHeader || "Homeopathic Clinical Care & Research"}
                </div>
              )}

              <h1 className={`text-lg sm:text-xl font-black ${theme.colors.primary} tracking-tight leading-tight`}>
                {tenant.clinicName || tenant.name || "HomeoRx Clinic"}
              </h1>

              {tenant.tagline && (
                <p className="text-[10px] text-slate-500 font-medium italic truncate">
                  {tenant.tagline}
                </p>
              )}

              <div className="pt-0.5">
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {doctor.name || "Dr. Demo Hahnemann"}
                  <span className="font-normal text-slate-600 ml-1">
                    ({doctor.qualification || "MD (Homeopathy), BHMS"})
                  </span>
                </p>
                <p className="text-[10px] text-slate-500">
                  Reg. No: <strong className="text-slate-700">{doctor.registrationNumber || "HOM-REG-2026-8942"}</strong>
                </p>
              </div>
            </div>

            {/* Right: Contact Details & Verification */}
            <div className="text-right text-[10px] text-slate-600 space-y-0.5 shrink-0 max-w-[220px] flex flex-col items-end">
              {showVerification && (
                <PrescriptionVerificationBadge
                  rxNumber={rx.prescriptionNumber}
                  prescriptionId={rx.id}
                />
              )}

              <div className="space-y-0.5 pt-0.5 text-[10px] text-slate-600">
                {tenant.address && <p className="truncate">{tenant.address}</p>}
                {tenant.phone && (
                  <p>
                    <strong>Ph: </strong>
                    {tenant.phone}
                  </p>
                )}
                {tenant.email && <p className="truncate">{tenant.email}</p>}
                {tenant.timings && <p className="text-slate-500">{tenant.timings}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* 2. PATIENT DEMOGRAPHICS & RX META STRIP */}
        <div
          className={`px-3 py-1.5 rounded-lg border ${theme.colors.cardBorder} ${theme.colors.cardBg} text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 items-center`}
        >
          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Patient Name (<span className="urdu-text text-[10px]">مریض کا نام</span>)
            </span>
            <strong className="text-xs font-bold text-slate-900 block truncate">
              {patient.name}
            </strong>
          </div>

          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Age / Gender (<span className="urdu-text text-[10px]">عمر / جنس</span>)
            </span>
            <span className="font-semibold text-slate-800 text-xs">
              {patient.age ? `${patient.age} yrs` : "—"} / {patient.gender}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Patient ID
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {patient.patientNumber}
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Rx No & Date
            </span>
            <span className={`font-mono font-bold ${theme.colors.primary} text-xs`}>
              {rx.prescriptionNumber}
            </span>
            <span className="block text-slate-600 text-[10px] font-medium">
              {formatDate(rx.prescriptionDate)}
            </span>
          </div>
        </div>

        {/* 3. PATIENT ALLERGIES / WARNING (If Present) */}
        {patient.allergies && (
          <div className="px-3 py-1 rounded-md border border-rose-200 bg-rose-50/90 text-rose-900 text-xs flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
            <span className="text-[11px]">
              <strong>Allergy Alert: </strong>
              {patient.allergies}
            </span>
          </div>
        )}

        {/* 4. CHIEF COMPLAINT & CLINICAL DIAGNOSIS */}
        {(rx.chiefComplaint || rx.clinicalNotes) && (
          <div className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs space-y-0.5">
            {rx.chiefComplaint && (
              <p className="leading-tight text-[11px]">
                <strong className="text-slate-900">
                  Chief Complaint (<span className="urdu-text text-[10px]">علامات / تکلیف</span>):{" "}
                </strong>
                <span className="text-slate-700">{rx.chiefComplaint}</span>
              </p>
            )}
            {rx.clinicalNotes && (
              <p className="leading-tight text-[11px]">
                <strong className="text-slate-900">
                  Diagnosis / Notes (<span className="urdu-text text-[10px]">تشخیص و نوٹس</span>):{" "}
                </strong>
                <span className="text-slate-700">{rx.clinicalNotes}</span>
              </p>
            )}
          </div>
        )}

        {/* 5. RX SYMBOL & PRESCRIBED MEDICINES TABLE */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`font-serif font-black text-lg leading-none ${theme.colors.rxSymbol}`}>
              ℞
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Prescribed Medicines (<span className="urdu-text text-[10px]">ادویات اور طریقہ استعمال</span>)
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border border-slate-300">
            <table className="w-full text-left text-xs border-collapse table-fixed">
              <colgroup>
                <col style={{ width: "4%" }} />   {/* # */}
                <col style={{ width: "23%" }} />  {/* MEDICINE */}
                <col style={{ width: "8%" }} />   {/* POTENCY */}
                <col style={{ width: "13%" }} />  {/* FORM */}
                <col style={{ width: "11%" }} />  {/* DOSE */}
                <col style={{ width: "18%" }} />  {/* FREQUENCY */}
                <col style={{ width: "9%" }} />   {/* DURATION */}
                <col style={{ width: "14%" }} />  {/* INSTRUCTIONS */}
              </colgroup>
              <thead>
                <tr className={`${theme.colors.tableHeaderBg} ${theme.colors.tableHeaderText} uppercase text-[9px] font-bold tracking-wider`}>
                  <th className="py-1.5 px-1 text-center">#</th>
                  <th className="py-1.5 px-2">MEDICINE</th>
                  <th className="py-1.5 px-1 text-center">POTENCY</th>
                  <th className="py-1.5 px-2">FORM</th>
                  <th className="py-1.5 px-2">DOSE</th>
                  <th className="py-1.5 px-2">FREQUENCY</th>
                  <th className="py-1.5 px-1.5 text-center">DURATION</th>
                  <th className="py-1.5 px-2">INSTRUCTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rx.items?.map((item: any, idx: number) => {
                  const formObj = parseBilingual(item.form || "Globules / میٹھی گولیاں");
                  const doseObj = parseBilingual(item.dose || "4 pills • 4 گولیاں");
                  const freqObj = parseBilingual(item.frequency || "TDS • دن میں 3 بار");
                  const durObj = parseBilingual(item.duration || "7 days");
                  const instObj = parseBilingual(item.instructions || "");

                  return (
                    <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/40" : ""}>
                      {/* # */}
                      <td className="py-1.5 px-1 text-center font-mono text-slate-400 text-xs align-top">
                        {idx + 1}
                      </td>

                      {/* MEDICINE */}
                      <td className="py-1.5 px-2 align-top">
                        <strong className="font-bold text-slate-950 text-xs block leading-tight">
                          {item.medicineName}
                        </strong>
                      </td>

                      {/* POTENCY */}
                      <td className="py-1.5 px-1 text-center align-top">
                        <span className="font-bold text-indigo-900 text-xs px-1.5 py-0.2 rounded bg-indigo-50 border border-indigo-100 inline-block">
                          {item.potency}
                        </span>
                      </td>

                      {/* FORM */}
                      <td className="py-1.5 px-2 align-top">
                        {formObj.en && (
                          <span className="font-semibold text-slate-900 text-[11px] block leading-tight">
                            {formObj.en}
                          </span>
                        )}
                        {formObj.ur && (
                          <span className="urdu-text text-[10px] text-slate-600 block leading-tight mt-0.5">
                            {formObj.ur}
                          </span>
                        )}
                      </td>

                      {/* DOSE */}
                      <td className="py-1.5 px-2 align-top">
                        {doseObj.en && (
                          <span className="font-semibold text-slate-900 text-[11px] block leading-tight">
                            {doseObj.en}
                          </span>
                        )}
                        {doseObj.ur && (
                          <span className="urdu-text text-[10px] text-slate-600 block leading-tight mt-0.5">
                            {doseObj.ur}
                          </span>
                        )}
                      </td>

                      {/* FREQUENCY */}
                      <td className="py-1.5 px-2 align-top">
                        {freqObj.en && (
                          <span className="font-semibold text-slate-900 text-[11px] block leading-tight">
                            {freqObj.en}
                          </span>
                        )}
                        {freqObj.ur && (
                          <span className="urdu-text text-[10px] text-slate-700 block leading-tight mt-0.5">
                            {freqObj.ur}
                          </span>
                        )}
                      </td>

                      {/* DURATION */}
                      <td className="py-1.5 px-1.5 text-center align-top">
                        <span className="font-semibold text-slate-900 text-[11px] block leading-tight">
                          {durObj.en}
                        </span>
                        {durObj.ur && (
                          <span className="urdu-text text-[10px] text-slate-600 block leading-tight mt-0.5">
                            {durObj.ur}
                          </span>
                        )}
                      </td>

                      {/* INSTRUCTIONS */}
                      <td className="py-1.5 px-2 align-top">
                        {instObj.en && (
                          <span className="font-semibold text-slate-900 text-[11px] block leading-tight">
                            {instObj.en}
                          </span>
                        )}
                        {instObj.ur && (
                          <span className="urdu-text text-[10px] text-slate-600 block leading-tight mt-0.5">
                            {instObj.ur}
                          </span>
                        )}
                        {!instObj.en && !instObj.ur && (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ANCHORED SECTION (GENERAL INSTRUCTIONS + FOLLOW-UP + FOOTER) ================= */}
      <div className="mt-auto pt-3 space-y-2.5 shrink-0">
        {/* 6. DOCTOR'S ADVICE & GENERAL INSTRUCTIONS (2-COLUMN GRID WITH EMOJIS IN NOORI NASTALEEQ) */}
        {rawInstructions.length > 0 && (
          <div className={`px-3 py-2 rounded-lg border ${theme.colors.cardBorder} ${theme.colors.cardBg} space-y-1`}>
            <div className="flex items-center justify-between border-b border-slate-200/70 pb-0.5">
              <span className="font-bold text-slate-900 text-[9px] uppercase tracking-wider">
                Doctor&apos;s Advice & General Instructions:
              </span>
              <span className={`urdu-text font-bold text-[11px] ${theme.colors.primary}`}>
                عمومی پرہیز و ہدایات
              </span>
            </div>

            {/* 2-Column Responsive Grid with Emojis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-slate-900 urdu-text text-[11px] leading-snug" dir="rtl">
              {rawInstructions.map((line: string, i: number) => (
                <div key={i} className="flex items-start gap-1 py-0.2">
                  <span className={`${theme.colors.bulletColor} text-xs select-none leading-none pt-0.5 shrink-0`}>
                    •
                  </span>
                  <span className="font-medium flex-1">{line}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. NEXT FOLLOW-UP VISIT BADGE */}
        {rx.followUpDays && (
          <div
            className={`flex items-center justify-between px-3 py-1 rounded-lg ${theme.colors.badgeBg} border ${theme.colors.badgeBorder} text-xs ${theme.colors.badgeText}`}
          >
            <span className="text-[11px]">
              <strong>Next Follow-up Visit: </strong>
              After {rx.followUpDays} days
            </span>
            <span className="urdu-text font-bold text-[11px]">
              اگلی ملاقات: {rx.followUpDays} دن بعد
            </span>
          </div>
        )}

        {/* 8. FOOTER & DOCTOR SIGNATURE / STAMP */}
        <div className={`pt-2 border-t ${theme.colors.headerBorder}`}>
          <div className="flex justify-between items-end">
            {/* Left: Clinic Quote / Motto */}
            <div className="text-[9px] text-slate-500 max-w-sm space-y-0.5">
              <p className="font-semibold text-slate-700 urdu-text text-[10px]">
                {tenant.prescriptionFooter ||
                  "Similia Similibus Curentur • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل"}
              </p>
              <p className="text-slate-400 urdu-text text-[9px]">
                * دوائی کو بوتل کے ڈھکن کے ذریعے منہ میں ڈالیں اور زبان پر چوسیں۔
              </p>
            </div>

            {/* Right: Doctor Stamp / Digital Signature */}
            <div className="text-right space-y-0.5 min-w-[170px]">
              {tenant.digitalSignature ? (
                <div className="h-9 max-w-[130px] ml-auto flex items-center justify-end">
                  <img
                    src={tenant.digitalSignature}
                    alt="Doctor Digital Signature"
                    className="max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-7 border-b border-slate-400 w-36 ml-auto"></div>
              )}
              <p className="text-[11px] font-bold text-slate-900 leading-tight">
                {doctor.name || "Dr. Demo Hahnemann"}
              </p>
              <p className="text-[9px] text-slate-600">
                Authorized Practitioner Stamp / Signature
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
