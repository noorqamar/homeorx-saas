"use client";

import React from "react";
import { formatDate } from "@/lib/utils";
import { PrescriptionVerificationBadge } from "./qr-code";
import { MedicineBottle } from "./medicine-bottle";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "./template-presets";
import {
  User,
  Calendar,
  Phone,
  Clock,
  CheckCircle2,
  TrendingUp,
  ClipboardList,
  FlaskConical,
  Leaf,
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

  // Check if string contains Urdu characters
  const hasUrdu = /[\u0600-\u06FF]/.test(clean);
  const hasEnglish = /[a-zA-Z]/.test(clean);

  if (hasUrdu && !hasEnglish) {
    return { en: "As directed", ur: clean };
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

  // All prescribed remedies (from database items or fallback)
  const allItems: any[] =
    rx.items && rx.items.length > 0
      ? rx.items
      : [
          {
            medicineName: "Rhus Toxicodendron",
            potency: "200C",
            form: "Liquid Dilution",
            dose: "4 pills",
            frequency: "Twice daily (BD)",
            duration: "7-10 days",
            instructions: "Dissolve slowly on clean tongue. Take 15 mins before meals.",
          },
        ];

  // Dynamic pagination: Page 1 holds up to 5 items comfortably; subsequent pages hold up to 6 items
  const PAGE_1_CAPACITY = 5;
  const PAGE_N_CAPACITY = 6;

  const pages: any[][] = [];
  if (allItems.length <= PAGE_1_CAPACITY) {
    pages.push(allItems);
  } else {
    pages.push(allItems.slice(0, PAGE_1_CAPACITY));
    let remaining = allItems.slice(PAGE_1_CAPACITY);
    while (remaining.length > 0) {
      pages.push(remaining.slice(0, PAGE_N_CAPACITY));
      remaining = remaining.slice(PAGE_N_CAPACITY);
    }
  }

  // Format complaints
  const complaintLines = rx.chiefComplaint
    ? rx.chiefComplaint.split("\n").filter((l: string) => l.trim().length > 0)
    : [
        "Right knee pain, backache worse after rest.",
        "Stiffness on initial motion, relieved by continuous walking.",
        "Pain aggravated in cold damp weather.",
      ];

  // Advice lines
  const rawAdvice = rx.generalInstructions
    ? rx.generalInstructions.split("\n").filter((l: string) => l.trim().length > 0)
    : [
        "Warm compresses allowed. Avoid exposure to cold wet rain.",
        "Gentle mobility exercises as tolerated.",
        "Maintain good posture and stay well hydrated.",
      ];

  // Reusable Clinic Header Component
  const renderClinicHeader = (pageNumber: number, totalPages: number) => (
    <div className="border-b-2 border-slate-800 pb-2.5 sm:pb-3">
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2.5 sm:gap-4 print:flex-row print:items-center print:justify-between">
        {/* Left: Clinic Emblem & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto sm:flex-1 min-w-0 justify-center sm:justify-start text-center sm:text-left print:justify-start print:text-left">
          {clinicTheme.logoUrl ? (
            <img
              src={clinicTheme.logoUrl}
              alt="Clinic Logo"
              className="h-11 w-11 sm:h-16 sm:w-16 object-contain shrink-0 print:h-16 print:w-16"
            />
          ) : (
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-full bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-600 p-0.5 shadow-md flex items-center justify-center border-2 border-emerald-900 print:h-14 print:w-14">
                <div className="h-full w-full rounded-full bg-white flex flex-col items-center justify-center p-1 text-center">
                  <div className="relative">
                    <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 -top-1" />
                    <div className="h-2.5 w-6 sm:h-3 sm:w-7 bg-emerald-900 rounded-b-full mx-auto -mt-1" />
                  </div>
                  <span className="text-[7px] sm:text-[8px] font-black text-emerald-950 tracking-wider font-serif">
                    FNH
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-0.5 min-w-0">
            <h1 className="text-sm sm:text-2xl font-black text-emerald-950 tracking-tight font-serif uppercase leading-tight print:text-2xl">
              {clinicTheme.clinicName}
            </h1>
            <div className="hidden sm:flex items-center gap-2 pt-0.5 print:flex">
              <div className="h-px bg-emerald-700 flex-1 max-w-[80px]" />
              <span className="text-emerald-800 text-[10px] select-none font-serif">❧ • ❧</span>
              <div className="h-px bg-emerald-700 flex-1 max-w-[80px]" />
            </div>
            <p className="text-[9.5px] sm:text-[11px] text-slate-700 font-bold tracking-wide italic print:text-[11px]">
              {clinicTheme.tagline}
            </p>
          </div>
        </div>

        {/* Right: Doctor Avatar Photo & Credentials */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0 justify-center sm:justify-end text-center sm:text-right border-t sm:border-t-0 border-slate-200 pt-2 sm:pt-0 print:border-t-0 print:pt-0 print:justify-end print:text-right">
          <div className="space-y-0.5 text-center sm:text-right print:text-right">
            <div className="flex items-center justify-center sm:justify-end gap-2 print:justify-end">
              <h2 className="text-xs sm:text-lg font-black text-slate-900 font-serif leading-tight print:text-lg">
                {clinicTheme.doctorName}
              </h2>
              {totalPages > 1 && (
                <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-300">
                  Page {pageNumber} of {totalPages}
                </span>
              )}
            </div>
            <div className="hidden sm:flex items-center justify-end gap-1.5 print:flex">
              <div className="h-px bg-slate-400 w-12" />
              <span className="text-slate-500 text-[8px]">❧</span>
              <div className="h-px bg-slate-400 w-12" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-black text-slate-800 uppercase tracking-wider print:text-[10px]">
              {clinicTheme.credentials}
            </p>
            <p className="text-[8.5px] sm:text-[9px] text-slate-500 font-medium">
              Reg. No: <strong className="text-slate-700 font-mono">{clinicTheme.regNo}</strong>
            </p>
          </div>

          {/* Circular Doctor Avatar Photo */}
          <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-600 via-emerald-600 to-teal-800 shadow-md shrink-0 overflow-hidden border border-slate-300 print:h-14 print:w-14">
            {clinicTheme.doctorPhoto ? (
              <img
                src={clinicTheme.doctorPhoto}
                alt={clinicTheme.doctorName}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <User className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-800 print:h-7 print:w-7" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Reusable Prescription Footer Component
  const renderFooter = () => (
    <div className="pt-2 border-t-2 border-slate-800 relative mt-auto">
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
              {clinicTheme.doctorName}
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
  );

  return (
    <div className="space-y-6 print:space-y-0">
      {pages.map((pageItems, pageIdx) => {
        const isFirstPage = pageIdx === 0;

        return (
          <div
            key={pageIdx}
            className="w-full max-w-[950px] mx-auto bg-white p-3 sm:p-5 md:p-6 shadow-2xl print:shadow-none print:p-0 print:m-0 print:w-full flex flex-col justify-between border-2 border-slate-300 rounded-2xl print:rounded-none print:border-0 text-slate-900 a4-print-sheet a4-page transition-all relative overflow-hidden font-sans min-h-0 sm:min-h-[260mm] print:min-h-[275mm]"
          >
            {/* Watermark for Demo Trial */}
            {isDemo && (
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden opacity-[0.06] print:opacity-[0.10] select-none rotate-[-26deg]">
                <div className="text-center space-y-1">
                  <span className="text-4xl sm:text-6xl font-black tracking-widest text-slate-900 uppercase border-4 border-slate-900 px-8 py-2 rounded-3xl block">
                    DEMO TRIAL LETTERHEAD
                  </span>
                  <span className="text-xs sm:text-sm font-bold tracking-widest text-slate-900 uppercase block">
                    {clinicTheme.clinicName} • EVALUATION COPY
                  </span>
                </div>
              </div>
            )}

            {/* Page Inner Container */}
            <div className="space-y-3 flex-1 flex flex-col justify-between relative z-20">
              {/* Header (Identical on every page) */}
              {renderClinicHeader(pageIdx + 1, pages.length)}

              {isFirstPage ? (
                <>
                  {/* ================= 1. PATIENT INFORMATION & CHIEF COMPLAINTS ================= */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                    {/* Left: Patient Information Card (5 Cols) */}
                    <div className="md:col-span-5 rounded-2xl border-2 border-slate-300 bg-white shadow-xs overflow-hidden flex flex-col">
                      <div className="bg-[#0f2d59] text-white px-3.5 py-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-b-xl mx-2 shadow-xs">
                        PATIENT INFORMATION
                      </div>
                      <div className="p-3 space-y-1.5 text-xs flex-1 flex flex-col justify-center">
                        <div className="flex items-center text-[11px]">
                          <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-[#0f2d59]" />
                            Patient Name
                          </span>
                          <span className="text-slate-400 font-bold mr-1">:</span>
                          <strong className="text-slate-900 font-bold text-xs truncate flex-1">
                            {patient.name || "Ahmad Khan"}
                          </strong>
                        </div>

                        <div className="flex items-center text-[11px]">
                          <span className="w-28 text-slate-600 font-bold flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#0f2d59]" />
                            Age / Gender
                          </span>
                          <span className="text-slate-400 font-bold mr-1">:</span>
                          <span className="text-slate-800 font-bold text-xs">
                            {patient.age ? `${patient.age} Years` : "29 Years"} / {patient.gender || "Male"}
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
                        <ul className="space-y-1 list-disc list-inside leading-snug">
                          {complaintLines.map((line: string, i: number) => (
                            <li key={i} className="text-slate-800 font-medium">
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* ================= 2. MAIN SECTION: ℞ PRESCRIPTION (LEFT) & MODALITIES / ADVICE (RIGHT) ================= */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch flex-1">
                    {/* LEFT COLUMN: ℞ PRESCRIPTION (Contains ALL Prescribed Remedies with Dynamic Bottles) */}
                    <div className="md:col-span-7 rounded-2xl border-2 border-[#0f2d59] bg-white shadow-md overflow-hidden flex flex-col">
                      <div className="bg-[#0f2d59] text-white px-3.5 py-1 flex items-center justify-between font-bold text-[11px] uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-black text-base text-amber-300 leading-none">℞</span>
                          <span>PRESCRIPTION</span>
                        </div>
                        <span className="text-[9.5px] text-emerald-300 font-sans normal-case">
                          {allItems.length} {allItems.length === 1 ? "Remedy Prescribed" : "Remedies Prescribed"}
                        </span>
                      </div>

                      {/* Medicine Items List (Starts immediately from top, tightly spaced) */}
                      <div className="p-3 space-y-2.5 divide-y divide-slate-100 flex-1 flex flex-col justify-start">
                        {pageItems.map((item: any, idx: number) => {
                          const itemDose = parseBilingual(item.dose || "Single dose orally • 5 drops");
                          const itemFreq = parseBilingual(item.frequency || "Twice daily (BD)");
                          const globalIdx = idx + 1;

                          return (
                            <div key={idx} className={`flex items-center justify-between gap-2.5 ${idx > 0 ? "pt-2.5" : ""}`}>
                              {/* Left: Remedy Details */}
                              <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex items-start gap-2">
                                  <span className="inline-flex items-center justify-center h-4.5 w-4.5 rounded-full bg-blue-100 text-[#0f2d59] text-[9.5px] font-black shrink-0 mt-0.5">
                                    {globalIdx}
                                  </span>
                                  <div className="min-w-0">
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">
                                      MEDICINE &amp; POTENCY
                                    </span>
                                    <h3 className="text-sm sm:text-base font-black text-[#0f2d59] font-serif tracking-tight leading-tight truncate">
                                      {item.medicineName} <span className="text-blue-700 font-bold">{item.potency}</span>
                                    </h3>
                                  </div>
                                </div>

                                <div className="space-y-0.5 text-xs pl-6.5">
                                  <div className="flex items-center gap-1.5 leading-tight">
                                    <strong className="text-slate-900 text-[10px] font-bold">DOSE:</strong>
                                    <span className="text-slate-700 text-[10.5px] font-medium truncate">{itemDose.en}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 leading-tight">
                                    <strong className="text-slate-900 text-[10px] font-bold">FREQ:</strong>
                                    <span className="text-slate-700 text-[10.5px] font-medium truncate">{itemFreq.en}</span>
                                  </div>
                                  {item.instructions && (
                                    <div className="leading-tight pt-0.5">
                                      <strong className="text-slate-900 text-[9.5px] font-bold">INSTR: </strong>
                                      <span className="text-slate-600 italic text-[9.5px] line-clamp-1">
                                        {item.instructions}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right: Authentic Dropper Bottle Artwork with Dynamic Name */}
                              <div className="shrink-0 flex flex-col items-center pl-2">
                                <MedicineBottle
                                  medicineName={item.medicineName}
                                  potency={item.potency}
                                  form={item.form}
                                  index={idx}
                                  size={pageItems.length >= 4 ? "xs" : pageItems.length === 3 ? "sm" : "md"}
                                  variant={item.variant || item.bottleVariant}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Aggravating, Relieving, Advice & Investigations (5 Cols) */}
                    <div className="md:col-span-5 space-y-1.5 flex flex-col justify-between">
                      {/* Aggravating Factors */}
                      <div className="rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-rose-800 font-black text-[11px] uppercase tracking-wide">
                          <div className="h-3.5 w-3.5 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                            <TrendingUp className="h-2.5 w-2.5" />
                          </div>
                          <span>AGGRAVATING FACTORS</span>
                        </div>
                        <ul className="text-[9.5px] text-slate-800 list-disc list-inside space-y-0.5 font-medium pl-1 leading-snug">
                          <li>Riding motorcycle / travel vibration</li>
                          <li>Lying down (especially at night)</li>
                          <li>Prolonged awkward neck position</li>
                        </ul>
                      </div>

                      {/* Relieving Factors */}
                      <div className="rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-black text-[11px] uppercase tracking-wide">
                          <div className="h-3.5 w-3.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                          </div>
                          <span>RELIEVING FACTORS</span>
                        </div>
                        <ul className="text-[9.5px] text-slate-800 list-disc list-inside space-y-0.5 font-medium pl-1 leading-snug">
                          <li>Walking in fresh open air</li>
                          <li>Routine light daily activities</li>
                          <li>Gentle heat &amp; movement</li>
                        </ul>
                      </div>

                      {/* Clinical Advice & Instructions */}
                      <div className="rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[#0f2d59] font-black text-[11px] uppercase tracking-wider">
                          <ClipboardList className="h-3.5 w-3.5 text-emerald-700" />
                          <span>CLINICAL ADVICE &amp; INSTRUCTIONS</span>
                        </div>
                        <ul className="text-[9.5px] text-slate-800 list-disc list-inside space-y-0.5 font-medium pl-1 leading-snug">
                          {rawAdvice.slice(0, 3).map((a: string, aIdx: number) => (
                            <li key={aIdx}>{a}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Suggested Investigations */}
                      <div className="rounded-2xl border-2 border-slate-300 bg-white p-1.5 shadow-xs space-y-0.5">
                        <div className="flex items-center gap-1.5 text-[#0f2d59] font-black text-[10px] uppercase tracking-wider">
                          <FlaskConical className="h-3 w-3 text-blue-700" />
                          <span>SUGGESTED INVESTIGATIONS (IF NEEDED)</span>
                        </div>
                        <ul className="text-[9px] text-slate-700 list-disc list-inside space-y-0.5 font-medium pl-1 leading-snug">
                          <li>X-Ray Cervical Spine / Lumbosacral (AP &amp; Lateral View)</li>
                          <li>Vitamin B12, Vitamin D3, Serum Calcium &amp; Magnesium</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* ================= SUBSEQUENT PAGE: CONTINUATION ================= */
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Continuation Patient Banner */}
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs">
                    <span className="text-[#0f2d59] font-bold">
                      Patient: <strong className="text-slate-900">{patient.name || "Ahmad Khan"}</strong> ({patient.age || 29} Y / {patient.gender || "Male"})
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      Date: {formatDate(rx.prescriptionDate)}
                    </span>
                    <span className="text-emerald-700 font-black text-[11px] uppercase tracking-wider">
                      Prescription Continuation (Page {pageIdx + 1} of {pages.length})
                    </span>
                  </div>

                  {/* Medicines Card for Continued Page */}
                  <div className="rounded-2xl border-2 border-[#0f2d59] bg-white shadow-md overflow-hidden flex-1 flex flex-col">
                    <div className="bg-[#0f2d59] text-white px-4 py-1.5 flex items-center justify-between font-bold text-xs uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-black text-lg text-amber-300 leading-none">℞</span>
                        <span>CONTINUED REMEDIES</span>
                      </div>
                      <span className="text-[10px] text-emerald-300 font-sans normal-case">
                        Remedies {pageIdx * PAGE_1_CAPACITY + 1} to {pageIdx * PAGE_1_CAPACITY + pageItems.length}
                      </span>
                    </div>

                    <div className="p-3 space-y-2.5 divide-y divide-slate-100 flex-1">
                      {pageItems.map((item: any, idx: number) => {
                        const itemDose = parseBilingual(item.dose || "Single dose orally • 5 drops");
                        const itemFreq = parseBilingual(item.frequency || "Twice daily (BD)");
                        const globalIdx = pageIdx * PAGE_1_CAPACITY + idx + 1;

                        return (
                          <div key={idx} className={`flex items-center justify-between gap-2.5 ${idx > 0 ? "pt-2.5" : ""}`}>
                            <div className="space-y-1 flex-1 min-w-0">
                              <div className="flex items-start gap-1.5">
                                <span className="inline-flex items-center justify-center h-4.5 w-4.5 rounded-full bg-blue-100 text-[#0f2d59] text-[9.5px] font-black shrink-0 mt-0.5">
                                  {globalIdx}
                                </span>
                                <div>
                                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                                    MEDICINE &amp; POTENCY
                                  </span>
                                  <h3 className="text-xs sm:text-sm font-black text-[#0f2d59] font-serif tracking-tight leading-tight">
                                    {item.medicineName} <span className="text-blue-700 font-bold">{item.potency}</span>
                                  </h3>
                                </div>
                              </div>

                              <div className="space-y-0.5 text-[9.5px] pl-6">
                                <div>
                                  <strong className="text-slate-900 text-[9.5px]">DOSE: </strong>
                                  <span className="text-slate-700 text-[10px] font-medium">{itemDose.en}</span>
                                </div>
                                <div>
                                  <strong className="text-slate-900 text-[9.5px]">FREQUENCY: </strong>
                                  <span className="text-slate-700 text-[10px] font-medium">{itemFreq.en}</span>
                                </div>
                                {item.instructions && (
                                  <div className="pt-0.5">
                                    <strong className="text-slate-900 text-[9px]">INSTRUCTIONS: </strong>
                                    <span className="text-slate-600 italic text-[9px]">
                                      {item.instructions}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="shrink-0 flex flex-col items-center pl-1">
                              <MedicineBottle
                                medicineName={item.medicineName}
                                potency={item.potency}
                                form={item.form}
                                index={pageIdx * PAGE_1_CAPACITY + idx}
                                size="sm"
                                variant={item.variant || item.bottleVariant}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer with Doctor Signature */}
              {renderFooter()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
