"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Save,
  Search,
  User,
  ArrowLeft,
  Sparkles,
  FileText,
  Clock,
  Printer,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ChevronDown,
  Languages,
  X,
  Stethoscope,
  Pill,
  Edit3,
  Check,
  ListPlus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { searchPatients, getPatientById } from "@/app/actions/patients";
import { searchMedicines } from "@/app/actions/medicines";
import {
  createPrescription,
  updatePrescription,
  duplicatePrescription,
} from "@/app/actions/prescriptions";

interface MedicineRow {
  id: string;
  medicineName: string;
  medicineId?: string | null;
  potency: string;
  form: string;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
}

// Pre-defined Standard Urdu Homeopathic Advice with Emojis (Exact Single Line Format)
const QUICK_ADVICE_OPTIONS = [
  {
    id: "scents",
    label: "🌿 تیز خوشبو سے پرہیز",
    text: "🌿 تیز خوشبو سے پرہیز (الائچی، پودینہ، کچا پیاز، لہسن، کافی)",
  },
  {
    id: "bare_hands",
    label: "👅 گولیاں ننگے ہاتھ نہ لگائیں",
    text: "👅 گولیاں ننگے ہاتھ نہ لگائیں (ڈھکن کے ذریعے منہ میں ڈالیں)",
  },
  {
    id: "tongue",
    label: "🍬 زبان پر چوسیں",
    text: "🍬 زبان پر چوسیں (آہستہ آہستہ چوس کر کھائیں)",
  },
  {
    id: "sour",
    label: "🍋 کھٹی اشیاء سے پرہیز",
    text: "🍋 کھٹی اشیاء سے پرہیز (اچار، لیموں، املی، سرکہ)",
  },
  {
    id: "before_meals",
    label: "🍽️ کھانے سے قبل لیں",
    text: "🍽️ کھانے سے قبل لیں (کھانے سے 15 تا 30 منٹ پہلے)",
  },
  {
    id: "lukewarm_water",
    label: "💧 نیم گرم پانی میں لیں",
    text: "💧 نیم گرم پانی میں لیں (آدھا کپ نیم گرم پانی)",
  },
  {
    id: "cold_drinks",
    label: "❄️ ٹھنڈے پانی سے پرہیز",
    text: "❄️ ٹھنڈے پانی سے پرہیز (کولڈ ڈرنکس اور برف سے پرہیز)",
  },
  {
    id: "oily_spicy",
    label: "🌶️ تلی ہوئی چیزوں سے پرہیز",
    text: "🌶️ تلی ہوئی اور تیز مصالحے والی چیزوں سے پرہیز",
  },
  {
    id: "tea_coffee",
    label: "☕ چائے اور کافی سے وقفہ",
    text: "☕ چائے اور کافی سے 30 منٹ کا وقفہ",
  },
  {
    id: "water_intake",
    label: "🥤 وافر پانی پیئیں",
    text: "🥤 وافر مقدار میں صاف پانی پیئیں",
  },
  {
    id: "walk",
    label: "🏃 ہلکی چہل قدمی",
    text: "🏃 روزانہ 30 منٹ ہلکی چہل قدمی کریں",
  },
];

const DEFAULT_INITIAL_ADVICE = `🌿 تیز خوشبو سے پرہیز (الائچی، پودینہ، کچا پیاز، لہسن، کافی)
👅 گولیاں ننگے ہاتھ نہ لگائیں (ڈھکن کے ذریعے منہ میں ڈالیں)
🍬 زبان پر چوسیں (آہستہ آہستہ چوس کر کھائیں)`;

export function PrescriptionFormClient({
  preloadedOptions,
  initialRxNumber,
  initialData,
  isEditMode = false,
}: {
  preloadedOptions: {
    potencies: string[];
    forms: string[];
    doses: string[];
    frequencies: string[];
    instructions: string[];
  };
  initialRxNumber?: string;
  initialData?: any;
  isEditMode?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId");
  const duplicateFromId = searchParams.get("duplicateFrom");

  // Suggestion list container refs for auto-scrolling
  const suggestionsListRef = useRef<HTMLDivElement>(null);

  // Defaults
  const defaultFrequency =
    preloadedOptions.frequencies[0] || "Three times daily (TDS) • دن میں 3 بار (صبح، دوپہر، شام)";
  const defaultDose = preloadedOptions.doses[0] || "4 pills • 4 گولیاں";
  const defaultForm = preloadedOptions.forms[0] || "Globules / میٹھی گولیاں (ڈسکس)";
  const defaultInstruction =
    preloadedOptions.instructions[1] || "Dissolve slowly on tongue • دوائی زبان پر رکھ کر چوسیں (ہاتھ مت لگائیں)";

  // Selected Patient State
  const [selectedPatient, setSelectedPatient] = useState<any>(
    initialData?.patient || null
  );
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [patientSuggestions, setPatientSuggestions] = useState<any[]>([]);
  const [isSearchingPatient, setIsSearchingPatient] = useState(false);

  // Form Fields
  const [prescriptionDate, setPrescriptionDate] = useState(
    initialData?.prescriptionDate
      ? new Date(initialData.prescriptionDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [chiefComplaint, setChiefComplaint] = useState(
    initialData?.chiefComplaint || ""
  );
  const [clinicalNotes, setClinicalNotes] = useState(
    initialData?.clinicalNotes || ""
  );
  const [generalInstructions, setGeneralInstructions] = useState(
    initialData?.generalInstructions || DEFAULT_INITIAL_ADVICE
  );
  const [followUpDays, setFollowUpDays] = useState<number | "">(
    initialData?.followUpDays ?? 14
  );

  // Initialize medicine rows
  const [medicines, setMedicines] = useState<MedicineRow[]>(
    initialData?.items && initialData.items.length > 0
      ? initialData.items.map((it: any, i: number) => ({
          id: `edit-row-${i}`,
          medicineName: it.medicineName,
          medicineId: it.medicineId,
          potency: it.potency || "30C",
          form: it.form || defaultForm,
          dose: it.dose || defaultDose,
          frequency: it.frequency || defaultFrequency,
          duration: it.duration || "7 days",
          instructions: it.instructions || defaultInstruction,
        }))
      : [
          {
            id: "row-1",
            medicineName: "",
            potency: "30C",
            form: defaultForm,
            dose: defaultDose,
            frequency: defaultFrequency,
            duration: "7 days",
            instructions: defaultInstruction,
          },
        ]
  );

  // Autocomplete Suggestions State
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  const [medicineSuggestions, setMedicineSuggestions] = useState<any[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Submission & Success state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedPrescription, setSavedPrescription] = useState<any>(null);

  // Auto-scroll dropdown suggestion into view
  useEffect(() => {
    if (activeRowIndex !== null && suggestionsListRef.current) {
      const activeEl = suggestionsListRef.current.children[
        highlightedIndex + 1
      ] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [highlightedIndex, activeRowIndex]);

  // Handle URL params for new prescriptions
  useEffect(() => {
    async function init() {
      if (isEditMode) return;

      if (preselectedPatientId && !selectedPatient) {
        try {
          const pat = await getPatientById(preselectedPatientId);
          if (pat) {
            setSelectedPatient(pat);
            if (pat.chiefComplaint && !chiefComplaint) {
              setChiefComplaint(pat.chiefComplaint);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }

      if (duplicateFromId) {
        try {
          const dup = await duplicatePrescription(duplicateFromId);
          if (dup) {
            if (dup.patientId) {
              const pat = await getPatientById(dup.patientId);
              if (pat) setSelectedPatient(pat);
            }
            if (dup.chiefComplaint) setChiefComplaint(dup.chiefComplaint);
            if (dup.clinicalNotes) setClinicalNotes(dup.clinicalNotes);
            if (dup.generalInstructions) setGeneralInstructions(dup.generalInstructions);
            if (dup.followUpDays) setFollowUpDays(dup.followUpDays);
            if (dup.items && dup.items.length > 0) {
              setMedicines(
                dup.items.map((it: any, i: number) => ({
                  id: `dup-row-${i}`,
                  medicineName: it.medicineName,
                  medicineId: it.medicineId,
                  potency: it.potency || "30C",
                  form: it.form || defaultForm,
                  dose: it.dose || defaultDose,
                  frequency: it.frequency || defaultFrequency,
                  duration: it.duration || "7 days",
                  instructions: it.instructions || defaultInstruction,
                }))
              );
            }
          }
        } catch (e) {
          console.error("Duplicate load error:", e);
        }
      }
    }
    init();
  }, [preselectedPatientId, duplicateFromId, isEditMode]);

  // Patient search handler
  const handlePatientSearch = async (term: string) => {
    setPatientSearchTerm(term);
    if (!term || term.trim().length < 1) {
      setPatientSuggestions([]);
      return;
    }
    setIsSearchingPatient(true);
    try {
      const results = await searchPatients(term);
      setPatientSuggestions(results);
    } finally {
      setIsSearchingPatient(false);
    }
  };

  // Instant 1-character Remedy Autocomplete handler
  const handleMedicineSearch = async (term: string, rowIndex: number) => {
    updateMedicineRow(rowIndex, "medicineName", term);
    setActiveRowIndex(rowIndex);
    setHighlightedIndex(0);

    if (!term || term.trim().length === 0) {
      const topResults = await searchMedicines("");
      setMedicineSuggestions(topResults);
      return;
    }

    const results = await searchMedicines(term);
    setMedicineSuggestions(results);
  };

  // Keyboard navigation inside remedy input (WITH LIVE INPUT PREVIEW)
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number
  ) => {
    if (activeRowIndex !== rowIndex || medicineSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx =
        highlightedIndex < medicineSuggestions.length - 1
          ? highlightedIndex + 1
          : 0;
      setHighlightedIndex(nextIdx);

      // LIVE PREVIEW IN INPUT
      if (medicineSuggestions[nextIdx]) {
        updateMedicineRow(
          rowIndex,
          "medicineName",
          medicineSuggestions[nextIdx].name
        );
        updateMedicineRow(
          rowIndex,
          "medicineId",
          medicineSuggestions[nextIdx].id
        );
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx =
        highlightedIndex > 0
          ? highlightedIndex - 1
          : medicineSuggestions.length - 1;
      setHighlightedIndex(prevIdx);

      // LIVE PREVIEW IN INPUT
      if (medicineSuggestions[prevIdx]) {
        updateMedicineRow(
          rowIndex,
          "medicineName",
          medicineSuggestions[prevIdx].name
        );
        updateMedicineRow(
          rowIndex,
          "medicineId",
          medicineSuggestions[prevIdx].id
        );
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (medicineSuggestions[highlightedIndex]) {
        selectMedicineSuggestion(medicineSuggestions[highlightedIndex], rowIndex);
      }
    } else if (e.key === "Escape") {
      setActiveRowIndex(null);
      setMedicineSuggestions([]);
    }
  };

  const selectMedicineSuggestion = (suggestion: any, rowIndex: number) => {
    updateMedicineRow(rowIndex, "medicineName", suggestion.name);
    updateMedicineRow(rowIndex, "medicineId", suggestion.id);
    setActiveRowIndex(null);
    setMedicineSuggestions([]);
  };

  const updateMedicineRow = (
    index: number,
    field: keyof MedicineRow,
    value: string
  ) => {
    setMedicines((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        medicineName: "",
        potency: "30C",
        form: defaultForm,
        dose: defaultDose,
        frequency: defaultFrequency,
        duration: "7 days",
        instructions: defaultInstruction,
      },
    ]);
  };

  const removeMedicineRow = (index: number) => {
    if (medicines.length === 1) {
      updateMedicineRow(0, "medicineName", "");
      return;
    }
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle quick predefined dietary advice in Section 3
  const toggleQuickAdvice = (adviceText: string) => {
    setGeneralInstructions((prev: string) => {
      const lines = (prev || "")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const exists = lines.some(
        (l) => l === adviceText || l === `• ${adviceText}` || adviceText.includes(l)
      );

      if (exists) {
        // Remove line
        return lines
          .filter(
            (l) => l !== adviceText && l !== `• ${adviceText}` && !adviceText.includes(l)
          )
          .join("\n");
      } else {
        // Add line
        return [...lines, adviceText].join("\n");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedPatient) {
      setError("Please search and select a patient for this prescription.");
      return;
    }

    const validItems = medicines.filter(
      (m) => m.medicineName && m.medicineName.trim().length > 0
    );

    if (validItems.length === 0) {
      setError("Please add at least one medicine with a remedy name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        patientId: selectedPatient.id,
        prescriptionDate: prescriptionDate,
        chiefComplaint: chiefComplaint || null,
        symptoms: null,
        clinicalNotes: clinicalNotes || null,
        generalInstructions: generalInstructions || null,
        followUpDays: followUpDays ? Number(followUpDays) : null,
        items: validItems.map((item, idx) => ({
          medicineName: item.medicineName.trim(),
          medicineId: item.medicineId || null,
          potency: item.potency.trim(),
          form: item.form || null,
          dose: item.dose || null,
          frequency: item.frequency || null,
          duration: item.duration || null,
          instructions: item.instructions || null,
          sortOrder: idx + 1,
        })),
      };

      if (isEditMode && initialData?.id) {
        const updated = await updatePrescription(initialData.id, payload);
        router.push(`/prescriptions/${initialData.id}`);
        router.refresh();
      } else {
        const result = await createPrescription(payload);
        setSavedPrescription(result);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while saving prescription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Saved Success Screen
  if (savedPrescription) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center ring-8 ring-emerald-50 shadow-sm">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Prescription Saved Successfully!
          </h1>
          <p className="text-sm text-slate-600 font-mono font-bold">
            Prescription #{savedPrescription.prescriptionNumber}
          </p>
          <p className="text-xs text-slate-500">
            Issued to <strong className="text-slate-800">{selectedPatient?.name}</strong> on {prescriptionDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href={`/prescriptions/${savedPrescription.id}/print`}>
            <Button variant="primary" size="lg" className="font-bold shadow-md">
              <Printer className="h-4 w-4 mr-2" />
              Print Bilingual Letterhead (A4)
            </Button>
          </Link>

          <Link href={`/prescriptions/${savedPrescription.id}`}>
            <Button variant="outline" size="lg">
              <FileText className="h-4 w-4 mr-2" />
              View Full Prescription
            </Button>
          </Link>

          <Link href={`/prescriptions/${savedPrescription.id}/edit`}>
            <Button variant="secondary" size="lg">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Prescription (ترمیم کریں)
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              setSavedPrescription(null);
              setSelectedPatient(null);
              setMedicines([
                {
                  id: "new-row-1",
                  medicineName: "",
                  potency: "30C",
                  form: defaultForm,
                  dose: defaultDose,
                  frequency: defaultFrequency,
                  duration: "7 days",
                  instructions: defaultInstruction,
                },
              ]);
            }}
          >
            + Create Another Prescription
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-12">
      {/* Top Breadcrumb & Auto RX Number */}
      <div className="flex items-center justify-between">
        <Link
          href={isEditMode ? `/prescriptions/${initialData?.id}` : "/prescriptions"}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {isEditMode ? "Back to Prescription View" : "Back to Prescriptions List"}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">
            {isEditMode ? "Editing RX:" : "Prescription ID:"}
          </span>
          <span className="font-mono font-bold text-xs px-3 py-1 rounded-md bg-slate-900 text-emerald-400 shadow-xs">
            {initialData?.prescriptionNumber || initialRxNumber}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. COMPACT PATIENT & CONSULTATION BAR */}
        <Card className="border-slate-200 shadow-xs">
          <CardContent className="p-4 space-y-3">
            {/* Top row: Patient selector + Date */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-8 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  1. Patient Details (مریض کی تفصیلات) <span className="text-rose-500">*</span>
                </label>

                {selectedPatient ? (
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <span className="font-bold text-slate-900 mr-2">
                          {selectedPatient.name}
                        </span>
                        <span className="text-slate-500">
                          {selectedPatient.patientNumber} • {selectedPatient.gender} (
                          {selectedPatient.age || "—"} yrs) • {selectedPatient.phone || "No phone"}
                        </span>
                      </div>
                    </div>
                    {!isEditMode && (
                      <button
                        type="button"
                        onClick={() => setSelectedPatient(null)}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800 px-2 py-0.5 rounded hover:bg-rose-50 transition-colors ml-2 shrink-0"
                      >
                        Change
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={patientSearchTerm}
                        onChange={(e) => handlePatientSearch(e.target.value)}
                        placeholder="Type patient name, phone, or PAT number to search..."
                        className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-2xs"
                      />
                    </div>

                    {/* Suggestions Dropdown */}
                    {patientSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 max-h-56 overflow-y-auto divide-y divide-slate-100">
                        {patientSuggestions.map((pat) => (
                          <div
                            key={pat.id}
                            onClick={() => {
                              setSelectedPatient(pat);
                              setPatientSuggestions([]);
                              setPatientSearchTerm("");
                              if (pat.chiefComplaint && !chiefComplaint) {
                                setChiefComplaint(pat.chiefComplaint);
                              }
                            }}
                            className="p-2.5 hover:bg-emerald-50/90 cursor-pointer flex items-center justify-between transition-colors text-xs"
                          >
                            <div>
                              <p className="font-bold text-slate-900">
                                {pat.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {pat.patientNumber} • {pat.gender}, {pat.age || "—"} yrs • {pat.phone || "No phone"}
                              </p>
                            </div>
                            <Badge variant="default" className="text-[10px]">Select</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Prescription Date (تاریخ نسخہ)
                </label>
                <input
                  type="date"
                  value={prescriptionDate}
                  onChange={(e) => setPrescriptionDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  required
                />
              </div>
            </div>

            {/* Bottom row: Compact Chief Complaint & Clinical Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="Chief Complaint / Presenting Condition (تکلیف / علامات)..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Clinical Diagnosis / Notes (تشخیص و طبی نوٹس)..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. HIGH-PRODUCTIVITY PRESCRIBED MEDICINES SECTION */}
        <Card className="border-slate-200 shadow-xs overflow-visible">
          <CardHeader className="py-3 px-4 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/60">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                2. Prescribed Homeopathic Medicines ({medicines.length} {medicines.length === 1 ? "Remedy" : "Remedies"})
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 pt-0.5">
                Use <strong>↑ / ↓ Arrow keys</strong> to preview remedy names live. Press <strong>Enter</strong> to select.
              </CardDescription>
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={addMedicineRow}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              + Add Medicine (مزید دوائی)
            </Button>
          </CardHeader>

          <CardContent className="p-4 space-y-3 overflow-visible">
            {medicines.map((row, idx) => {
              const isActive = activeRowIndex === idx;

              return (
                <div
                  key={row.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? "border-emerald-400 bg-emerald-50/20 shadow-sm relative z-30"
                      : "border-slate-200 bg-white hover:border-slate-300 relative z-10"
                  }`}
                  style={{ zIndex: isActive ? 40 : medicines.length - idx }}
                >
                  {/* Row Top: Medicine Name (Live Arrow Preview Autocomplete) + Potency + Form + Dose + Delete */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                    {/* Index & Medicine Search */}
                    <div className="sm:col-span-5 relative">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200">
                          #{idx + 1}
                        </span>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={row.medicineName}
                            onChange={(e) => handleMedicineSearch(e.target.value, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            onFocus={() => handleMedicineSearch(row.medicineName, idx)}
                            placeholder="Type 1 letter e.g. S, N, A, Puls, Nux..."
                            className="w-full px-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg placeholder:text-slate-400 placeholder:font-normal focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
                            required
                          />

                          {row.medicineName && (
                            <button
                              type="button"
                              onClick={() => {
                                updateMedicineRow(idx, "medicineName", "");
                                updateMedicineRow(idx, "medicineId", "");
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Floating Instant Autocomplete Dropdown */}
                      {isActive && medicineSuggestions.length > 0 && (
                        <div
                          ref={suggestionsListRef}
                          className="absolute left-8 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200 shadow-2xl z-50 max-h-72 overflow-y-auto divide-y divide-slate-100 ring-1 ring-slate-900/10"
                        >
                          <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between sticky top-0 border-b border-slate-100 z-10">
                            <span>Matches ({medicineSuggestions.length})</span>
                            <span className="text-emerald-700 font-normal">Use ↑↓ keys to preview & Enter</span>
                          </div>

                          {medicineSuggestions.map((sug, sIdx) => {
                            const isHighlighted = sIdx === highlightedIndex;
                            return (
                              <div
                                key={sug.id}
                                onClick={() => selectMedicineSuggestion(sug, idx)}
                                onMouseEnter={() => {
                                  setHighlightedIndex(sIdx);
                                  updateMedicineRow(idx, "medicineName", sug.name);
                                  updateMedicineRow(idx, "medicineId", sug.id);
                                }}
                                className={`p-2.5 cursor-pointer flex items-center justify-between text-xs transition-colors ${
                                  isHighlighted
                                    ? "bg-emerald-600 text-white font-medium"
                                    : "hover:bg-slate-50 text-slate-800"
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-bold ${isHighlighted ? "text-white" : "text-slate-900"}`}>
                                      {sug.name}
                                    </span>
                                    {sug.abbreviation && (
                                      <span
                                        className={`font-mono text-[11px] font-semibold px-1.5 py-0.2 rounded ${
                                          isHighlighted
                                            ? "bg-emerald-700 text-emerald-100"
                                            : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                        }`}
                                      >
                                        [{sug.abbreviation}]
                                      </span>
                                    )}
                                  </div>

                                  {(sug.commonName || sug.latinName) && (
                                    <p
                                      className={`text-[10px] truncate mt-0.5 ${
                                        isHighlighted ? "text-emerald-100" : "text-slate-500"
                                      }`}
                                    >
                                      {sug.commonName || sug.latinName}
                                    </p>
                                  )}
                                </div>

                                <Badge
                                  variant={
                                    isHighlighted
                                      ? "default"
                                      : sug.category === "Plant"
                                      ? "success"
                                      : sug.category === "Mineral"
                                      ? "secondary"
                                      : "default"
                                  }
                                  className={`text-[10px] shrink-0 ml-2 ${
                                    isHighlighted ? "bg-white/20 text-white border-transparent" : ""
                                  }`}
                                >
                                  {sug.category || "Homeopathic"}
                                </Badge>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Potency */}
                    <div className="sm:col-span-2">
                      <select
                        value={row.potency}
                        onChange={(e) => updateMedicineRow(idx, "potency", e.target.value)}
                        className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-indigo-900 focus:border-emerald-500 focus:outline-none"
                      >
                        {preloadedOptions.potencies.map((pot) => (
                          <option key={pot} value={pot}>
                            {pot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Form */}
                    <div className="sm:col-span-2">
                      <select
                        value={row.form}
                        onChange={(e) => updateMedicineRow(idx, "form", e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                      >
                        {preloadedOptions.forms.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dose */}
                    <div className="sm:col-span-2">
                      <select
                        value={row.dose}
                        onChange={(e) => updateMedicineRow(idx, "dose", e.target.value)}
                        className="w-full px-2 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:border-emerald-500 focus:outline-none"
                      >
                        {preloadedOptions.doses.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Row Button */}
                    <div className="sm:col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => removeMedicineRow(idx)}
                        disabled={medicines.length === 1 && !row.medicineName}
                        title="Remove Remedy"
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-20 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Row Bottom: Frequency (Urdu + Eng) + Duration + Instructions (Urdu + Eng) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-2 border-t border-slate-100 mt-2 text-xs">
                    {/* Frequency */}
                    <div className="sm:col-span-5 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase text-slate-600 shrink-0 w-16">
                        Frequency:
                      </span>
                      <select
                        value={row.frequency}
                        onChange={(e) => updateMedicineRow(idx, "frequency", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none urdu-font"
                      >
                        {preloadedOptions.frequencies.map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Duration */}
                    <div className="sm:col-span-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase text-slate-600 shrink-0 w-14">
                        Duration:
                      </span>
                      <input
                        type="text"
                        value={row.duration}
                        onChange={(e) => updateMedicineRow(idx, "duration", e.target.value)}
                        placeholder="e.g. 7 days"
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Instructions */}
                    <div className="sm:col-span-4 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase text-slate-600 shrink-0 w-14">
                        Advice:
                      </span>
                      <select
                        value={row.instructions}
                        onChange={(e) => updateMedicineRow(idx, "instructions", e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none truncate urdu-font"
                      >
                        {preloadedOptions.instructions.map((inst) => (
                          <option key={inst} value={inst}>
                            {inst}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quick Add Button Bar */}
            <div className="pt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMedicineRow}
                className="text-emerald-700 border-emerald-300 hover:bg-emerald-50 font-bold text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                + Add Another Medicine (مزید دوائی شامل کریں)
              </Button>

              <span className="text-[11px] text-slate-400 font-medium">
                Total Remedies: <strong>{medicines.filter((m) => m.medicineName.trim().length > 0).length}</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 3. MULTIPLE GENERAL INSTRUCTIONS & DIETARY ADVICE (ملٹیپل پرہیز و ہدایات مع ایموجیز اور نوری نستعلیق) */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50/60 flex flex-row items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ListPlus className="h-4 w-4 text-emerald-600" />
                3. General Patient Advice & Dietary Precautions (عمومی پرہیز و ہدایات)
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Click any of the pre-set advice tags below to toggle them on their own line with emojis in authentic Noori Nastaleeq font.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            {/* Quick-Select Advice Chips (Clickable Badges with Emojis) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quick Select Advice Tags (فوری ہدایات منتخب کریں):
              </label>
              <div className="flex flex-wrap gap-2">
                {QUICK_ADVICE_OPTIONS.map((opt) => {
                  const isSelected = generalInstructions.includes(opt.text);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleQuickAdvice(opt.text)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all urdu-font ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-500/30"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80"
                      }`}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              {/* Editable Multi-line Text Area for Instructions (Nastaliq Typography) */}
              <div className="md:col-span-9 space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Detailed Advice & Precautions (ہر ہدایت الگ سطر پر مع ایموجی):
                </label>
                <textarea
                  value={generalInstructions}
                  onChange={(e) => setGeneralInstructions(e.target.value)}
                  rows={6}
                  dir="rtl"
                  placeholder="🌿 تیز خوشبو سے پرہیز..."
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none urdu-font leading-loose shadow-2xs"
                />
              </div>

              {/* Follow-up Days */}
              <div className="md:col-span-3 space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Follow-up In (Days)
                </label>
                <input
                  type="number"
                  min={0}
                  max={365}
                  value={followUpDays}
                  onChange={(e) =>
                    setFollowUpDays(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="e.g. 14"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:border-emerald-500 focus:outline-none font-bold"
                />
                <span className="text-xs text-emerald-800 font-semibold block pt-2 urdu-font">
                  اگلی ملاقات: {followUpDays ? `${followUpDays} دن بعد` : "ضرورت پڑنے پر"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          <Link href={isEditMode ? `/prescriptions/${initialData?.id}` : "/prescriptions"}>
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="px-8 font-bold shadow-lg text-sm bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {isEditMode ? "UPDATE PRESCRIPTION (تبدیلی محفوظ کریں)" : "SAVE PRESCRIPTION (نسخہ محفوظ کریں)"}
          </Button>
        </div>
      </form>
    </div>
  );
}
