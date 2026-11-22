"use client";

import React from "react";
import { formatDate } from "@/lib/utils";
import { PrescriptionVerificationBadge } from "./qr-code";
import { MedicineFormIcon } from "./medicine-form-icon";
import { MedicineBottle } from "./medicine-bottle";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "./template-presets";
import {
  AlertCircle,
  ShieldAlert,
  User,
  Calendar,
  Phone,
  Clock,
  CheckCircle2,
  TrendingUp,
  ClipboardList,
  FlaskConical,
  Sparkles,
  Stethoscope,
  Leaf,
  Check,
} from "lucide-react";

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

  // Editable Clinic Theme configuration object
  const clinicTheme = {
    clinicName: tenant.clinicName || tenant.name || "FAZAL E NOOR HOMEOPATHIC CLINIC",
    tagline: tenant.tagline || "Gentle. Natural. Effective.",
    doctorName: doctor.name || tenant.doctorName || "Dr. Noor ul Qamar",
    credentials: doctor.qualification || tenant.credentials || "DHMS, RHMP",
    regNo: doctor.registrationNumber || tenant.regNo || "HOM-REG-2026-8942",
    phone: tenant.phone || "0300-1234567",
    email: tenant.email || "clinic@homeorx.health",
    address: tenant.address || "Main Medical Boulevard, Health City",
    logoUrl: tenant.logo || "",
    doctorPhoto: tenant.doctorPhoto || doctor.photoUrl || "",
    digitalSignature: tenant.digitalSignature || "",
    accentColor: tenant.accentColor || "#059669",
    footerQuote:
      tenant.prescriptionFooter ||
      "Gentle • Permanent • Holistic Homeopathic Cure",
    headerTitle: tenant.prescriptionHeader || "FAZAL E NOOR HOMEOPATHIC CLINIC",
    timings: tenant.timings || "Mon - Sat: 10:00 AM - 9:00 PM",
  };

  // Primary remedy (first item or fallback)
  const primaryItem = rx.items?.[0] || {
    medicineName: "KALMIA LATIFOLIA",
    potency: "200C",
    form: "Globules",
    dose: "Single dose orally • 5 drops",
    frequency: "Morning & Night (BD)",
    duration: "7-10 days",
    instructions: "Observe for 7-10 days. Do not repeat unless advised.",
  };

  const primaryDose = parseBilingual(primaryItem.dose || "Single dose orally • 5 drops");
  const primaryFreq = parseBilingual(primaryItem.frequency || "Morning & Night (BD)");

  // Format complaints
  const complaintLines = rx.chiefComplaint
    ? rx.chiefComplaint.split("\n").filter((l: string) => l.trim().length > 0)
    : [
        "Pain in left shoulder radiating down the arm.",
        "Maximum intensity of pain in the left biceps area.",
        "Pain extends down the arm with localized stiffness.",
        "Numbness in thumb and first (index) finger of left hand.",
        "Pain aggravated while riding motorcycle or exertion.",
        "Pain increases on lying down at night.",
        "Associated: Occasional constipation, bloating after meals, general weakness.",
      ];

  // Diagnosis title and lines
  const diagnosisTitle = rx.clinicalNotes
    ? rx.clinicalNotes.split("\n")[0]
    : "Possible Cervical Radiculopathy (Likely C6 Nerve Root Involvement)";

  const diagnosisList = rx.clinicalNotes && rx.clinicalNotes.split("\n").length > 1
    ? rx.clinicalNotes.split("\n").slice(1).filter((l: string) => l.trim().length > 0)
    : [
        "Cervical Radiculopathy (C5–C6 / C6)",
        "Cervical Spondylosis with Nerve Root Compression",
        "Less likely: Shoulder Joint Pathology",
      ];

  // Advice lines
  const rawAdvice = rx.generalInstructions
    ? rx.generalInstructions.split("\n").filter((l: string) => l.trim().length > 0)
    : [
        "Avoid prolonged motorcycle riding or intense vibration.",
        "Avoid prolonged neck flexion or awkward posture.",
        "Use proper neck support / ergonomic pillow while sleeping.",
        "Gentle neck exercises (as tolerated).",
        "Maintain good posture & stay well hydrated.",
      ];

  return (
    <div
      className="w-full max-w-[950px] mx-auto bg-white p-4 sm:p-5 md:p-6 shadow-2xl print:shadow-none print:p-0 print:m-0 print:w-full flex flex-col justify-between border-2 border-slate-300 rounded-2xl print:rounded-none print:border-0 text-slate-900 a4-print-sheet transition-all relative overflow-hidden font-sans"
      style={{ minHeight: "272mm", maxHeight: "284mm" }}
    >
      {/* ================= DEMO ACCOUNT WATERMARK ================= */}
      {isDemo && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-[0.06] print:opacity-[0.10] select-none rotate-[-26deg]">
          <div className="text-center space-y-1">
            <span className="text-4xl sm:text-6xl font-black tracking-widest text-slate-900 uppercase border-4 border-slate-900 px-8 py-2 rounded-3xl block">
              DEMO TRIAL LETTERHEAD
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase block">
              FAZAL E NOOR HOMEOPATHIC CLINIC • EVALUATION COPY
            </span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="space-y-3 flex-1 flex flex-col justify-between relative z-20">
        {/* ================= 1. LUXURY CLINICAL HEADER ================= */}
        <div className="border-b-2 border-slate-800 pb-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mortar & Pestle Emerald Logo + Clinic Title */}
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              {clinicTheme.logoUrl ? (
                <img
                  src={clinicTheme.logoUrl}
                  alt="Clinic Logo"
                  className="h-16 w-16 object-contain shrink-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center shrink-0">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 p-0.5 shadow-md flex items-center justify-center border-2 border-emerald-900">
                    <div className="h-full w-full rounded-full bg-white flex flex-col items-center justify-center p-1 text-center">
                      <div className="relative">
                        <Leaf className="h-5 w-5 text-emerald-600 -top-1" />
                        <div className="h-3 w-7 bg-emerald-900 rounded-b-full mx-auto -mt-1" />
                      </div>
                      <span className="text-[8px] font-black text-emerald-950 tracking-wider font-serif">
                        FNH
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-0.5 min-w-0">
                <h1 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight font-serif uppercase leading-none">
                  {clinicTheme.clinicName}
                </h1>
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="h-px bg-emerald-700 flex-1 max-w-[80px]" />
                  <span className="text-emerald-800 text-[10px] select-none font-serif">❧ • ❧</span>
                  <div className="h-px bg-emerald-700 flex-1 max-w-[80px]" />
                </div>
                <p className="text-[11px] text-slate-700 font-bold tracking-wide italic">
                  {clinicTheme.tagline}
                </p>
              </div>
            </div>

            {/* Right: Doctor Avatar Photo & Credentials */}
            <div className="flex items-center gap-3 shrink-0 text-right">
              <div className="space-y-0.5 text-right">
                <h2 className="text-base sm:text-lg font-black text-slate-900 font-serif leading-tight">
                  {clinicTheme.doctorName}
                </h2>
                <div className="flex items-center justify-end gap-1.5">
                  <div className="h-px bg-slate-400 w-12" />
                  <span className="text-slate-500 text-[8px]">❧</span>
                  <div className="h-px bg-slate-400 w-12" />
                </div>
                <p className="text-[10px] font-black text-slate-800 uppercase tracking-wider">
                  {clinicTheme.credentials}
                </p>
                <p className="text-[9px] text-slate-500 font-medium">
                  Reg. No: <strong className="text-slate-700 font-mono">{clinicTheme.regNo}</strong>
                </p>
              </div>

              {/* Circular Doctor Avatar Photo */}
              <div className="h-14 w-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-emerald-600 to-teal-800 shadow-md shrink-0 overflow-hidden border border-slate-300">
                {clinicTheme.doctorPhoto ? (
                  <img
                    src={clinicTheme.doctorPhoto}
                    alt={clinicTheme.doctorName}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                    <User className="h-7 w-7 text-emerald-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. ROW 1: PATIENT INFORMATION & CHIEF COMPLAINTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* Left: Patient Information Card (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl border-2 border-slate-300 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#0f2d59] text-white px-3.5 py-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-b-xl mx-2 shadow-xs">
              PATIENT INFORMATION
            </div>
            <div className="p-3 space-y-2 text-xs flex-1 flex flex-col justify-center">
              <div className="flex items-center text-[11px]">
                <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#0f2d59]" />
                  Patient Name
                </span>
                <span className="text-slate-400 font-bold mr-1">:</span>
                <strong className="text-slate-900 font-bold text-xs truncate flex-1">
                  {patient.name || "Jamil yahya"}
                </strong>
              </div>

              <div className="flex items-center text-[11px]">
                <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#0f2d59]" />
                  Age / Gender
                </span>
                <span className="text-slate-400 font-bold mr-1">:</span>
                <span className="text-slate-800 font-bold text-xs">
                  {patient.age ? `${patient.age} Years` : "48 Years"} / {patient.gender || "Male"}
                </span>
              </div>

              <div className="flex items-center text-[11px]">
                <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#0f2d59]" />
                  Date
                </span>
                <span className="text-slate-400 font-bold mr-1">:</span>
                <span className="text-slate-800 font-bold text-xs">
                  {formatDate(rx.prescriptionDate)}
                </span>
              </div>

              <div className="flex items-center text-[11px]">
                <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#0f2d59]" />
                  Mobile / MR
                </span>
                <span className="text-slate-400 font-bold mr-1">:</span>
                <span className="text-slate-900 font-mono font-bold text-xs">
                  {patient.phone || patient.patientNumber || "0300-1234567"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Chief Complaints Card (7 Cols) */}
          <div className="md:col-span-7 rounded-2xl border-2 border-slate-300 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#0f2d59] text-white px-3.5 py-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-b-xl mx-2 shadow-xs">
              CHIEF COMPLAINTS
            </div>
            <div className="p-3 text-[11px] text-slate-800 flex-1 flex flex-col justify-center space-y-1">
              <ul className="space-y-0.5 list-disc list-inside leading-snug">
                {complaintLines.map((line: string, i: number) => (
                  <li key={i} className="text-slate-800">
                    <span className="text-slate-800 font-medium">
                      {line.replace(/thumb and first \(index\) finger/gi, "**thumb and first (index) finger**").includes("**") ? (
                        <>
                          {line.split(/(thumb and first \(index\) finger)/gi).map((part, pIdx) =>
                            part.toLowerCase() === "thumb and first (index) finger" ? (
                              <strong key={pIdx} className="text-rose-700 font-bold">
                                {part}
                              </strong>
                            ) : (
                              part
                            )
                          )}
                        </>
                      ) : (
                        line
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= 3. ROW 2: PROVISIONAL IMPRESSION & DERMATOME PATTERN ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* Left: Provisional Clinical Impression (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl border-2 border-slate-300 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#0f2d59] text-white px-3.5 py-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-b-xl mx-2 shadow-xs">
              PROVISIONAL CLINICAL IMPRESSION
            </div>
            <div className="p-3 space-y-2 text-xs flex-1 flex flex-col justify-center">
              <div className="text-center py-1">
                <h3 className="text-rose-700 font-black text-xs sm:text-sm leading-snug">
                  {diagnosisTitle}
                </h3>
              </div>

              <div className="border-t border-dotted border-slate-300 pt-2 space-y-1">
                <span className="text-[10px] font-black text-[#0f2d59] uppercase tracking-wider block">
                  POSSIBLE DIAGNOSIS
                </span>
                <div className="space-y-1 text-[11px] text-slate-800">
                  {diagnosisList.map((d: string, dIdx: number) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-900 font-black">✓</span>
                      <span className="font-medium text-slate-800">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Pain & Numbness Pattern Diagram (7 Cols) */}
          <div className="md:col-span-7 rounded-2xl border-2 border-slate-300 bg-white shadow-xs overflow-hidden flex flex-col">
            <div className="bg-[#0f2d59] text-white px-3.5 py-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-b-xl mx-2 shadow-xs">
              PAIN &amp; NUMBNESS PATTERN (CLINICAL TOTALITY)
            </div>
            <div className="p-2.5 flex items-center justify-around gap-2 text-center flex-1 bg-slate-50/50">
              {/* Back / Spine Illustration */}
              <div className="flex flex-col items-center space-y-1">
                <div className="h-20 w-16 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 140" className="h-full w-full" fill="none">
                    <circle cx="50" cy="18" r="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
                    <path d="M50 32 L50 120" stroke="#b45309" strokeWidth="4" strokeDasharray="2,3" />
                    <path d="M25 45 C35 35 65 35 75 45 L70 95 C65 110 35 110 30 95 Z" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
                    {/* Left red radiating highlight */}
                    <path d="M25 45 Q20 70 12 110" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="25" cy="45" r="4" fill="#dc2626" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-slate-700">
                  Pain Origin &amp; Modality
                </span>
              </div>

              {/* Hand & Dermatome Representation */}
              <div className="flex flex-col items-center space-y-1">
                <div className="h-20 w-14 relative flex items-center justify-center">
                  <svg viewBox="0 0 80 140" className="h-full w-full" fill="none">
                    {/* Palm */}
                    <rect x="20" y="55" width="40" height="50" rx="10" fill="#fed7aa" stroke="#d97706" strokeWidth="2" />
                    {/* Thumb (Blue highlighted) */}
                    <path d="M20 75 Q8 70 8 55 Q8 45 18 52 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                    {/* Index (Blue highlighted) */}
                    <rect x="22" y="15" width="9" height="42" rx="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                    {/* Middle Finger */}
                    <rect x="33" y="10" width="9" height="47" rx="4" fill="#fed7aa" stroke="#d97706" strokeWidth="2" />
                    {/* Ring Finger */}
                    <rect x="44" y="14" width="9" height="43" rx="4" fill="#fed7aa" stroke="#d97706" strokeWidth="2" />
                    {/* Little Finger */}
                    <rect x="55" y="24" width="8" height="33" rx="4" fill="#fed7aa" stroke="#d97706" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-[9px] font-bold text-sky-800">
                  Numbness in Thumb &amp; Index
                </span>
              </div>

              {/* Nerve Root Chart */}
              <div className="flex flex-col items-center space-y-0.5 text-left text-[9px] font-mono border-l border-slate-200 pl-2">
                <span className="text-slate-500 font-bold font-sans text-[8px] uppercase">
                  Nerve Root
                </span>
                <div className="space-y-0.5">
                  <span className="block text-slate-600">C4 — Neck</span>
                  <span className="block text-slate-600">C5 — Biceps</span>
                  <span className="block text-rose-700 font-bold bg-rose-50 px-1 rounded border border-rose-200">
                    C6 ⭢ Thumb (Primary)
                  </span>
                  <span className="block text-slate-600">C7 — Triceps</span>
                  <span className="block text-slate-600">C8 — Fingers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. ROW 3: MODALITIES & ℞ PRESCRIPTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* Left: Aggravating & Relieving Factors (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl border-2 border-slate-300 bg-white p-3 shadow-xs flex flex-col justify-between space-y-2">
            {/* Aggravations */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-rose-800 font-black text-xs uppercase tracking-wide">
                <div className="h-4 w-4 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <span>AGGRAVATING FACTORS</span>
              </div>
              <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-0.5 font-medium pl-1">
                <li>Riding motorcycle / travel vibration</li>
                <li>Lying down (especially at night)</li>
                <li>Prolonged awkward neck position</li>
              </ul>
            </div>

            {/* Ameliorations */}
            <div className="space-y-1 border-t border-slate-200 pt-1.5">
              <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wide">
                <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <span>RELIEVING FACTORS</span>
              </div>
              <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-0.5 font-medium pl-1">
                <li>Walking in fresh open air</li>
                <li>Routine light daily activities</li>
                <li>Gentle heat &amp; movement</li>
              </ul>
            </div>
          </div>

          {/* Right: ℞ PRESCRIPTION Highlighted Luxury Card (7 Cols) */}
          <div className="md:col-span-7 rounded-2xl border-2 border-[#0f2d59] bg-white shadow-md overflow-hidden flex flex-col">
            <div className="bg-[#0f2d59] text-white px-4 py-1.5 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-lg text-amber-300 leading-none">℞</span>
                <span>PRESCRIPTION</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-sans normal-case">
                Single Remedy Totality
              </span>
            </div>

            <div className="p-3 flex items-center justify-between gap-3 flex-1">
              {/* Medicine & Dosage Details */}
              <div className="space-y-2 flex-1">
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                    MEDICINE &amp; POTENCY:
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#0f2d59] font-serif tracking-tight leading-tight">
                    {primaryItem.medicineName} {primaryItem.potency}
                  </h3>
                </div>

                <div className="space-y-1 text-xs">
                  <div>
                    <strong className="text-slate-900 text-[11px]">DOSE: </strong>
                    <span className="text-slate-700">{primaryDose.en}</span>
                  </div>

                  <div>
                    <strong className="text-slate-900 text-[11px]">FREQUENCY: </strong>
                    <span className="text-slate-700">{primaryFreq.en}</span>
                  </div>

                  <div className="pt-0.5">
                    <strong className="text-slate-900 text-[11px]">FOLLOW-UP: </strong>
                    <span className="text-slate-700 italic text-[11px]">
                      {primaryItem.instructions || "Observe for 7–10 days. Do not repeat unless advised."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Authentic Homeopathic Amber Remedy Glass Dropper Bottle with Dynamic Medicine Name */}
              <div className="shrink-0 flex flex-col items-center">
                <MedicineBottle
                  medicineName={primaryItem.medicineName}
                  potency={primaryItem.potency}
                  variant="reckeweg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5. ROW 4: ADVICE & SUGGESTED INVESTIGATIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          {/* Left: Advice (6 Cols) */}
          <div className="md:col-span-6 rounded-2xl border-2 border-slate-300 bg-white p-3 shadow-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#0f2d59] font-black text-xs uppercase tracking-wider">
              <ClipboardList className="h-4 w-4 text-emerald-700" />
              <span>CLINICAL ADVICE &amp; INSTRUCTIONS</span>
            </div>
            <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-0.5 font-medium leading-snug">
              {rawAdvice.slice(0, 5).map((a: string, aIdx: number) => (
                <li key={aIdx}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Right: Suggested Investigations (6 Cols) */}
          <div className="md:col-span-6 rounded-2xl border-2 border-slate-300 bg-white p-3 shadow-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#0f2d59] font-black text-xs uppercase tracking-wider">
              <FlaskConical className="h-4 w-4 text-blue-700" />
              <span>SUGGESTED INVESTIGATIONS (IF NEEDED)</span>
            </div>
            <ul className="text-[11px] text-slate-800 list-disc list-inside space-y-0.5 font-medium leading-snug">
              <li>X-Ray Cervical Spine / Lumbosacral (AP &amp; Lateral View)</li>
              <li>MRI Cervical Spine (if symptoms persist or worsen)</li>
              <li>Vitamin B12, Vitamin D3, Serum Calcium &amp; Magnesium</li>
              <li>Blood Sugar (Fasting / HbA1c) &amp; Uric Acid Profile</li>
            </ul>
          </div>
        </div>

        {/* ================= 6. FOOTER, WAVES, DISCLAIMER & SIGNATURE ================= */}
        <div className="pt-2 border-t-2 border-slate-800 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3">
            {/* Left: Disclaimer Note */}
            <div className="text-[9px] text-slate-600 max-w-sm space-y-0.5 leading-snug">
              <p>
                <strong>Note: </strong>This is a specialized classical homeopathic prescription based on the totality of symptoms. Not a substitute for acute emergency care.
              </p>
              <p className="text-[9px] text-slate-600 font-medium">
                Store homeopathic remedies away from direct sunlight, camphor, and strong aromas. Take with a clean spoon or dropper cap.
              </p>
            </div>

            {/* Center: Decorative Herbal Ornament */}
            <div className="flex items-center gap-1 text-emerald-800 shrink-0">
              <Leaf className="h-5 w-5 fill-emerald-700 text-emerald-900 rotate-[-15deg]" />
              <Leaf className="h-4 w-4 fill-emerald-600 text-emerald-800 rotate-[15deg] -ml-2" />
            </div>

            {/* Right: Authentic Doctor Signature */}
            <div className="text-right space-y-0.5 shrink-0 min-w-[180px]">
              {clinicTheme.digitalSignature ? (
                <div className="h-9 max-w-[150px] ml-auto flex items-center justify-end">
                  <img
                    src={clinicTheme.digitalSignature}
                    alt="Doctor Digital Signature"
                    className="max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="font-serif italic text-xl font-bold text-emerald-950 font-signature tracking-wider pr-2 select-none">
                  Dr. Noor ul Qamar
                </div>
              )}
              <div className="h-0.5 bg-slate-800 w-40 ml-auto" />
              <p className="text-xs font-black text-slate-900 font-serif leading-tight pt-0.5">
                {clinicTheme.doctorName}
              </p>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-wider">
                {clinicTheme.credentials}
              </p>
            </div>
          </div>

          {/* Bottom Dual-Color Wave Accent Bar */}
          <div className="h-2 w-full mt-2 rounded-full overflow-hidden flex shadow-xs">
            <div className="h-full w-1/3 bg-emerald-800" />
            <div className="h-full w-1/3 bg-[#0f2d59]" />
            <div className="h-full w-1/3 bg-teal-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
