import { notFound } from "next/navigation";
import Link from "next/link";
import { getPrescriptionById } from "@/app/actions/prescriptions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Printer,
  Copy,
  Edit3,
  Trash2,
  User,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DeletePrescriptionButton } from "./delete-prescription-button";

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

  // Split general instructions into clean array of lines
  const instructionLines = rx.generalInstructions
    ? rx.generalInstructions
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0)
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
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
              Edit Prescription (ترمیم کریں)
            </Button>
          </Link>

          {/* Print A4 Letterhead Button */}
          <Link href={`/prescriptions/${rx.id}/print`}>
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Print / Presets (پرنٹ و ٹیمپلیٹس)
            </Button>
          </Link>

          {/* Copy / Duplicate Button */}
          <Link href={`/prescriptions/new?duplicateFrom=${rx.id}`}>
            <Button variant="secondary" size="sm" className="text-xs">
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Repeat / Duplicate (دوبارہ نسخہ)
            </Button>
          </Link>

          {/* Delete Button */}
          <DeletePrescriptionButton prescriptionId={rx.id} />
        </div>
      </div>

      {/* Main Prescription Record Card */}
      <Card className="overflow-hidden border-slate-200 shadow-sm">
        {/* Clinic & Doctor Top Header */}
        <div className="bg-slate-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-emerald-400">
              {rx.tenant?.clinicName || rx.tenant?.name}
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              {rx.doctor?.name} • {rx.doctor?.qualification}
            </p>
            <p className="text-[11px] text-slate-400">
              Reg. No: {rx.doctor?.registrationNumber || "HOM-REG-2026-8942"}
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {rx.prescriptionNumber}
            </span>
            <p className="text-xs text-slate-300 pt-1">
              Date: {formatDate(rx.prescriptionDate)}
            </p>
          </div>
        </div>

        {/* Patient Demographic Bar */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
              {rx.patient?.name.charAt(0)}
            </div>
            <div>
              <Link
                href={`/patients/${rx.patient?.id}`}
                className="font-bold text-slate-900 hover:text-emerald-600 text-sm"
              >
                {rx.patient?.name}
              </Link>
              <p className="text-slate-500">
                {rx.patient?.patientNumber} • {rx.patient?.gender} • {rx.patient?.age || "—"} yrs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            {rx.patient?.phone && <span>Phone: {rx.patient.phone}</span>}
            {rx.followUpDays && (
              <Badge variant="warning">
                Follow-up in {rx.followUpDays} days
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Patient Allergies Warning (If present) */}
          {rx.patient?.allergies && (
            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-900 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <span>
                <strong>Patient Allergy Alert: </strong> {rx.patient.allergies}
              </span>
            </div>
          )}

          {/* Clinical Findings */}
          {(rx.chiefComplaint || rx.symptoms || rx.clinicalNotes) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {rx.chiefComplaint && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">
                    Chief Complaint (<span className="urdu-text text-xs">علامات / تکلیف</span>):
                  </span>
                  <p className="text-slate-700">{rx.chiefComplaint}</p>
                </div>
              )}

              {rx.clinicalNotes && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-1">
                    Diagnosis / Clinical Notes (<span className="urdu-text text-xs">تشخیص و نوٹس</span>):
                  </span>
                  <p className="text-slate-700">{rx.clinicalNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Prescribed Remedies Table (Pure English Headers + Clean 2-Line Rows) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Prescribed Remedies & Dosage (تجویز کردہ ادویات)
              </h3>

              <Link
                href={`/prescriptions/${rx.id}/edit`}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Edit Remedies
              </Link>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-800 table-fixed">
                <colgroup>
                  <col style={{ width: "4%" }} />
                  <col style={{ width: "23%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "13%" }} />
                  <col style={{ width: "11%" }} />
                  <col style={{ width: "18%" }} />
                  <col style={{ width: "8%" }} />
                  <col style={{ width: "15%" }} />
                </colgroup>
                <thead className="bg-slate-900 text-white font-bold uppercase border-b border-slate-200 text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-1 text-center">#</th>
                    <th className="py-2.5 px-2">MEDICINE</th>
                    <th className="py-2.5 px-1 text-center">POTENCY</th>
                    <th className="py-2.5 px-2">FORM</th>
                    <th className="py-2.5 px-2">DOSE</th>
                    <th className="py-2.5 px-2">FREQUENCY</th>
                    <th className="py-2.5 px-1.5 text-center">DURATION</th>
                    <th className="py-2.5 px-2">INSTRUCTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rx.items?.map((item: any, idx: number) => {
                    const formObj = parseBilingual(item.form || "Globules / میٹھی گولیاں");
                    const doseObj = parseBilingual(item.dose || "4 pills • 4 گولیاں");
                    const freqObj = parseBilingual(item.frequency || "TDS • دن میں 3 بار");
                    const durObj = parseBilingual(item.duration || "7 days");
                    const instObj = parseBilingual(item.instructions || "");

                    return (
                      <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/40" : ""}>
                        <td className="py-2.5 px-1 font-mono text-slate-400 text-center align-top text-xs">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-2 align-top">
                          <strong className="font-bold text-slate-950 text-xs block leading-tight">
                            {item.medicineName}
                          </strong>
                        </td>
                        <td className="py-2.5 px-1 text-center align-top">
                          <span className="font-bold text-indigo-900 text-xs px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100 inline-block">
                            {item.potency}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 align-top">
                          {formObj.en && (
                            <span className="font-semibold text-slate-900 text-xs block leading-tight">
                              {formObj.en}
                            </span>
                          )}
                          {formObj.ur && (
                            <span className="urdu-text text-[11px] text-slate-600 block leading-tight mt-0.5">
                              {formObj.ur}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 align-top">
                          {doseObj.en && (
                            <span className="font-semibold text-slate-900 text-xs block leading-tight">
                              {doseObj.en}
                            </span>
                          )}
                          {doseObj.ur && (
                            <span className="urdu-text text-[11px] text-slate-600 block leading-tight mt-0.5">
                              {doseObj.ur}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 align-top">
                          {freqObj.en && (
                            <span className="font-semibold text-slate-900 text-xs block leading-tight">
                              {freqObj.en}
                            </span>
                          )}
                          {freqObj.ur && (
                            <span className="urdu-text text-[11px] text-slate-700 block leading-tight mt-0.5">
                              {freqObj.ur}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-1.5 text-center align-top">
                          <span className="font-semibold text-slate-900 text-xs block leading-tight">
                            {durObj.en}
                          </span>
                          {durObj.ur && (
                            <span className="urdu-text text-[11px] text-slate-600 block leading-tight mt-0.5">
                              {durObj.ur}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 align-top">
                          {instObj.en && (
                            <span className="font-semibold text-slate-900 text-xs block leading-tight">
                              {instObj.en}
                            </span>
                          )}
                          {instObj.ur && (
                            <span className="urdu-text text-[11px] text-slate-600 block leading-tight mt-0.5">
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

          {/* General Advice & Precautionary Instructions (2-Column Grid in Noori Nastaleeq) */}
          {instructionLines.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2.5">
              <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                <span className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                  Doctor&apos;s Advice & General Instructions:
                </span>
                <span className="urdu-text font-bold text-emerald-900 text-sm">
                  عمومی پرہیز و ہدایات
                </span>
              </div>

              {/* 2-Column Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-slate-900 urdu-text text-xs leading-loose" dir="rtl">
                {instructionLines.map((line: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 text-base select-none leading-none pt-0.5 shrink-0">
                      •
                    </span>
                    <span className="flex-1 font-medium">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <p className="text-[11px] text-slate-400 max-w-sm urdu-text">
              {rx.tenant?.prescriptionFooter ||
                "* Similia Similibus Curentur • ہومیوپیتھک علاج: قدرتی، محفوظ اور مستقل"}
            </p>

            <div className="text-right space-y-1">
              {rx.tenant?.digitalSignature ? (
                <div className="h-12 max-w-[160px] ml-auto flex items-center justify-end">
                  <img
                    src={rx.tenant?.digitalSignature}
                    alt="Doctor Digital Signature"
                    className="max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-10 border-b border-slate-300 w-48 ml-auto"></div>
              )}
              <p className="text-xs font-bold text-slate-900">
                {rx.doctor?.name}
              </p>
              <p className="text-[11px] text-slate-500">
                {rx.doctor?.qualification}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
