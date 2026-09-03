"use client";

import React from "react";
import { formatDate } from "@/lib/utils";
import { PrescriptionVerificationBadge } from "./qr-code";
import { MedicineFormIcon } from "./medicine-form-icon";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "./template-presets";
import { AlertCircle, ShieldAlert } from "lucide-react";

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
  const tenant = rx.tenant || {};
  const doctor = rx.doctor || {};
  const patient = rx.patient || {};

  const isDemo =
    tenant.accountStatus === "demo" ||
    tenant.accountStatus === "pending_approval" ||
    doctor.accountStatus === "demo" ||
    doctor.accountStatus === "pending_approval";

  // Demo accounts are locked to default "sage" preset
  const activePreset = isDemo ? "sage" : (preset || "sage");
  const theme = TEMPLATE_PRESETS[activePreset] || TEMPLATE_PRESETS.sage;

  // Editable Clinic Theme configuration object
  const clinicTheme = {
    clinicName: tenant.clinicName || tenant.name || "HomeoRx Wellness & Cure Clinic",
    tagline: tenant.tagline || "Holistic Homeopathic Health Care & Research",
    doctorName: doctor.name || tenant.doctorName || "Dr. Demo Hahnemann",
    credentials: doctor.qualification || tenant.credentials || "MD (Homeopathy), BHMS",
    regNo: doctor.registrationNumber || tenant.regNo || "HOM-REG-2026-8942",
    phone: tenant.phone || "+1 (555) 234-5678",
    email: tenant.email || "clinic@homeorx.health",
    address: tenant.address || "Suite 402, Medical Arts Building, Health Avenue",
    logoUrl: tenant.logo || "",
    digitalSignature: tenant.digitalSignature || "",
    accentColor: tenant.accentColor || "#059669",
    footerQuote:
      tenant.prescriptionFooter ||
      "Similia Similibus Curentur • قدرتی، محفوظ اور مستقل ہومیوپیتھک علاج",
    headerTitle: tenant.prescriptionHeader || "HOLISTIC HOMEOPATHIC CARE & CURE",
    timings: tenant.timings || "Mon - Sat: 9:00 AM - 6:00 PM",
  };

  // Split general instructions into clean array of lines
  const rawInstructions = rx.generalInstructions
    ? rx.generalInstructions
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0)
    : [];

  return (
    <div
      className={`w-full max-w-[1000px] mx-auto bg-white p-3 sm:p-6 md:p-7 shadow-lg print:shadow-none print:p-0 print:m-0 print:w-full flex flex-col justify-between border ${theme.colors.containerBorder} rounded-xl print:rounded-none print:border-0 text-slate-800 a4-print-sheet transition-all relative overflow-hidden`}
      style={{ minHeight: "272mm", maxHeight: "284mm" }}
    >
      {/* ================= DEMO ACCOUNT WATERMARK ================= */}
      {isDemo && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-[0.07] print:opacity-[0.12] select-none rotate-[-28deg]">
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-slate-900 uppercase whitespace-nowrap border-4 border-slate-900 px-6 py-2 rounded-2xl block">
              DEMO TRIAL ACCOUNT
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase block">
              FOR CLINICAL EVALUATION ONLY • NOT FOR COMMERCIAL SALE
            </span>
          </div>
        </div>
      )}

      {/* ================= TOP / MIDDLE MAIN CONTENT ================= */}
      <div className="space-y-2 sm:space-y-2.5 flex-1 min-w-0 relative z-20">
        {/* 1. CLINIC & DOCTOR HEADER */}
        <div className={`border-b-2 ${theme.colors.headerBorder} pb-2 sm:pb-2.5`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5 sm:gap-3">
            {/* Left: Logo / Clinic Name & Doctor Details */}
            <div className="space-y-0.5 flex-1 min-w-0">
              {clinicTheme.logoUrl ? (
                <img
                  src={clinicTheme.logoUrl}
                  alt="Clinic Logo"
                  className="h-9 sm:h-11 max-w-[140px] object-contain mb-1"
                />
              ) : (
                <div
                  className={`inline-block px-2.5 py-0.5 rounded ${theme.colors.badgeBg} ${theme.colors.badgeText} font-bold text-[9px] uppercase tracking-wider border ${theme.colors.badgeBorder} mb-0.5`}
                >
                  {clinicTheme.headerTitle}
                </div>
              )}

              <h1 className={`text-base sm:text-xl font-black ${theme.colors.primary} tracking-tight leading-tight`}>
                {clinicTheme.clinicName}
              </h1>

              {clinicTheme.tagline && (
                <p className="text-[10px] text-slate-500 font-medium italic truncate">
                  {clinicTheme.tagline}
                </p>
              )}

              <div className="pt-0.5">
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {clinicTheme.doctorName}
                  <span className="font-normal text-slate-600 ml-1">
                    ({clinicTheme.credentials})
                  </span>
                </p>
                <p className="text-[10px] text-slate-500">
                  Reg. No: <strong className="text-slate-700">{clinicTheme.regNo}</strong>
                </p>
              </div>
            </div>

            {/* Right: Contact Details & Verification QR (Hidden on demo) */}
            <div className="text-left sm:text-right text-[10px] text-slate-600 space-y-0.5 shrink-0 max-w-[220px] flex flex-col items-start sm:items-end w-full sm:w-auto">
              {showVerification && !isDemo && (
                <PrescriptionVerificationBadge
                  rxNumber={rx.prescriptionNumber}
                  prescriptionId={rx.id}
                />
              )}
              {isDemo && (
                <div className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-bold flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3 text-amber-600" />
                  <span>Trial Account</span>
                </div>
              )}

              <div className="space-y-0.5 pt-0.5 text-[10px] text-slate-600">
                {clinicTheme.address && <p className="truncate">{clinicTheme.address}</p>}
                {clinicTheme.phone && (
                  <p>
                    <strong>Ph: </strong>
                    {clinicTheme.phone}
                  </p>
                )}
                {clinicTheme.email && <p className="truncate">{clinicTheme.email}</p>}
                {clinicTheme.timings && <p className="text-slate-500">{clinicTheme.timings}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* 2. PATIENT DEMOGRAPHICS & RX META STRIP */}
        <div
          className={`px-3 py-2 rounded-lg border ${theme.colors.cardBorder} ${theme.colors.cardBg} text-xs grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 items-center`}
        >
          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Patient Name (<span className="urdu-inline text-[10px]">مریض</span>)
            </span>
            <strong className="text-xs font-bold text-slate-900 block truncate">
              {patient.name}
            </strong>
          </div>

          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Age / Gender (<span className="urdu-inline text-[10px]">عمر/جنس</span>)
            </span>
            <span className="font-semibold text-slate-800 text-xs truncate block">
              {patient.age ? `${patient.age} yrs` : "—"} / {patient.gender}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Patient ID
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs block truncate">
              {patient.patientNumber}
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">
              Rx No & Date
            </span>
            <span className={`font-mono font-bold ${theme.colors.primary} text-xs block truncate`}>
              {rx.prescriptionNumber}
            </span>
            <span className="block text-slate-600 text-[10px] font-medium">
              {formatDate(rx.prescriptionDate)}
            </span>
          </div>
        </div>

        {/* 3. PATIENT ALLERGIES / WARNING */}
        {patient.allergies && (
          <div className="px-3 py-1.5 rounded-md border border-rose-200 bg-rose-50/90 text-rose-900 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
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
                  Chief Complaint (<span className="urdu-inline text-[10px]">علامات / تکلیف</span>):{" "}
                </strong>
                <span className="text-slate-700">{rx.chiefComplaint}</span>
              </p>
            )}
            {rx.clinicalNotes && (
              <p className="leading-tight text-[11px]">
                <strong className="text-slate-900">
                  Diagnosis / Notes (<span className="urdu-inline text-[10px]">تشخیص و نوٹس</span>):{" "}
                </strong>
                <span className="text-slate-700">{rx.clinicalNotes}</span>
              </p>
            )}
          </div>
        )}

        {/* 5. RX SYMBOL & PRESCRIBED MEDICINES TABLE */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`font-serif font-black text-xl leading-none ${theme.colors.rxSymbol}`}>
              ℞
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
              Prescribed Medicines (<span className="urdu-inline text-[10px]">ادویات اور طریقہ استعمال</span>)
            </span>
          </div>

          {/* Desktop & Print Table View */}
          <div className="overflow-x-auto rounded-lg border border-slate-300">
            <table className="w-full text-left text-xs border-collapse min-w-[580px] sm:min-w-0 sm:table-fixed">
              <colgroup className="table-column-group">
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
                        <div className="flex items-center">
                          <MedicineFormIcon form={item.form} />
                          <strong className="font-bold text-slate-950 text-xs leading-tight">
                            {item.medicineName}
                          </strong>
                        </div>
                      </td>

                      {/* POTENCY */}
                      <td className="py-1.5 px-1 text-center align-top">
                        <span className="inline-block px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                          {item.potency}
                        </span>
                      </td>

                      {/* FORM */}
                      <td className="py-1.5 px-2 align-top text-[11px] leading-tight text-slate-700">
                        <div className="font-medium">{formObj.en}</div>
                        {formObj.ur && (
                          <div className="urdu-inline text-[10px] text-emerald-800">
                            {formObj.ur}
                          </div>
                        )}
                      </td>

                      {/* DOSE */}
                      <td className="py-1.5 px-2 align-top text-[11px] leading-tight text-slate-800">
                        <div className="font-medium">{doseObj.en}</div>
                        {doseObj.ur && (
                          <div className="urdu-inline text-[10px] text-emerald-800 font-medium">
                            {doseObj.ur}
                          </div>
                        )}
                      </td>

                      {/* FREQUENCY */}
                      <td className="py-1.5 px-2 align-top text-[11px] leading-tight text-slate-800">
                        <div className="font-medium">{freqObj.en}</div>
                        {freqObj.ur && (
                          <div className="urdu-inline text-[10px] text-teal-800 font-semibold">
                            {freqObj.ur}
                          </div>
                        )}
                      </td>

                      {/* DURATION */}
                      <td className="py-1.5 px-1.5 text-center align-top text-[11px] leading-tight text-slate-700 font-medium">
                        <div>{durObj.en}</div>
                        {durObj.ur && (
                          <div className="urdu-inline text-[10px] text-slate-500">
                            {durObj.ur}
                          </div>
                        )}
                      </td>

                      {/* INSTRUCTIONS */}
                      <td className="py-1.5 px-2 align-top text-[11px] leading-tight text-slate-700">
                        {instObj.en && instObj.en !== "—" && (
                          <div className="italic text-slate-600">{instObj.en}</div>
                        )}
                        {instObj.ur && (
                          <div className="urdu-inline text-[10px] text-slate-700 font-medium">
                            {instObj.ur}
                          </div>
                        )}
                        {!instObj.en && !instObj.ur && <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  );
                })}

                {(!rx.items || rx.items.length === 0) && (
                  <tr>
                    <td colSpan={8} className="py-6 text-center text-slate-400 italic">
                      No medicines prescribed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. GENERAL PRECAUTIONS & DIETARY RESTRICTIONS */}
        {rawInstructions.length > 0 && (
          <div
            className={`p-2 sm:p-2.5 rounded-lg border ${theme.colors.cardBorder} ${theme.colors.cardBg} space-y-1 mt-auto`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.colors.primary}`}>
                General Dietary Precautions & Advice
              </span>
              <span className="urdu-inline font-bold text-xs text-slate-900">
                عمومی پرہیز و ضروری ہدایات
              </span>
            </div>

            {/* 2-Column Responsive Grid (1-col on mobile, 2-col on sm/print) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-slate-900 text-xs" dir="rtl">
              {rawInstructions.map((line: string, i: number) => {
                const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}]+)\s*(.*)/u);
                const icon = emojiMatch ? emojiMatch[1] : null;
                const text = emojiMatch ? emojiMatch[2] : line;

                return (
                  <div key={i} className="flex items-start gap-1.5 py-0.5 min-w-0">
                    {icon ? (
                      <span className="text-sm shrink-0 select-none leading-none pt-0.5">{icon}</span>
                    ) : (
                      <span className={`${theme.colors.bulletColor} text-sm font-bold shrink-0 select-none leading-none pt-0.5`}>
                        •
                      </span>
                    )}
                    <span className="urdu-text text-[11px] font-medium flex-1 leading-snug break-words">
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. NEXT FOLLOW-UP VISIT BADGE */}
        {rx.followUpDays && (
          <div
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg ${theme.colors.badgeBg} border ${theme.colors.badgeBorder} text-xs ${theme.colors.badgeText}`}
          >
            <span className="text-[11px]">
              <strong>Next Follow-up Visit: </strong>
              After {rx.followUpDays} days
            </span>
            <span className="urdu-inline font-bold text-xs">
              اگلی ملاقات: {rx.followUpDays} دن بعد
            </span>
          </div>
        )}

        {/* 8. FOOTER & DOCTOR SIGNATURE / STAMP */}
        <div className={`pt-2 border-t ${theme.colors.headerBorder}`}>
          <div className="flex justify-between items-end gap-3 sm:gap-4">
            {/* Left: Clinic Quote / Motto */}
            <div className="text-[9px] text-slate-500 max-w-sm space-y-0.5">
              <p className="font-semibold text-slate-700 urdu-text text-[10px]">
                {clinicTheme.footerQuote}
              </p>
              <p className="text-slate-400 urdu-text text-[9px]">
                * دوائی کو بوتل کے ڈھکن کے ذریعے منہ میں ڈالیں اور زبان پر چوسیں۔
              </p>
            </div>

            {/* Right: Doctor Stamp / Digital Signature */}
            <div className="text-right space-y-0.5 min-w-[150px] sm:min-w-[170px] shrink-0">
              {clinicTheme.digitalSignature ? (
                <div className="h-8 sm:h-9 max-w-[140px] ml-auto flex items-center justify-end">
                  <img
                    src={clinicTheme.digitalSignature}
                    alt="Doctor Digital Signature"
                    className="max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-7 border-b border-slate-400 w-32 sm:w-36 ml-auto"></div>
              )}
              <p className="text-[11px] font-bold text-slate-900 leading-tight">
                {clinicTheme.doctorName}
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
