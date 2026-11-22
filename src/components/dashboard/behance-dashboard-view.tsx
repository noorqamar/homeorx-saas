"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  FileText,
  PlusCircle,
  Clock,
  Sparkles,
  BookOpen,
  Printer,
  ShieldCheck,
  Check,
  X,
  MessageSquare,
  Phone,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Stethoscope,
  Activity,
  CalendarDays,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface BehanceDashboardViewProps {
  stats: {
    totalPatients: number;
    newPatientsThisMonth: number;
    oldPatients: number;
    newPercent: number;
    oldPercent: number;
    currentMonthYear: string;
    totalPrescriptions: number;
    todayVisits: number;
    nextPatient: any;
    todayAppointments: any[];
    appointmentRequests: any[];
    patientsReview: any;
    recentPatients: any[];
    recentPrescriptions: any[];
  };
}

export function BehanceDashboardView({ stats }: { stats: BehanceDashboardViewProps["stats"] }) {
  const router = useRouter();

  // Interactive selected patient for "Next Patient Details" card
  const [selectedPatient, setSelectedPatient] = useState<any>(stats.nextPatient);
  const [requests, setRequests] = useState(stats.appointmentRequests);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);

  // Quick action on requests
  const handleApproveRequest = (id: string, patientId?: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (patientId) {
      router.push(`/prescriptions/new?patientId=${patientId}`);
    }
  };

  const handleDismissRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Calendar calculations
  const today = new Date();
  const currentMonthDate = new Date(today.getFullYear(), today.getMonth() + calendarMonthOffset, 1);
  const monthName = currentMonthDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentMonthDate.getFullYear();

  // Days in month
  const firstDayIndex = (currentMonthDate.getDay() + 1) % 7; // Saturday as 0 to match Behance: Sa Su Mo Tu We Th Fr
  const daysInMonth = new Date(year, currentMonthDate.getMonth() + 1, 0).getDate();
  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  const isToday = (day: number) => {
    return (
      calendarMonthOffset === 0 &&
      day === today.getDate() &&
      currentMonthDate.getMonth() === today.getMonth()
    );
  };

  return (
    <div className="space-y-7 pb-16 font-sans">
      {/* Top Welcome & Quick Clinical Metric Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-[26px] p-6 sm:p-7 border border-[#E6ECF5] shadow-[0_4px_20px_rgba(20,40,90,0.03)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1E50DE] text-xs font-bold border border-blue-100 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#1E50DE]" />
            <span>Classical Homeopathy Healthcare Suite • ہومیو کلینیکل پورٹل</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Doctor Clinical <span className="text-[#1E50DE]">Workspace</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Formulate single-page A4 prescriptions with 780+ remedies, manage patient appointments, and track clinical analytics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href="/patients/new">
            <Button
              variant="outline"
              className="h-11 px-5 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm shadow-xs"
            >
              <UserPlus className="h-4 w-4 mr-2 text-slate-500" />
              + New Patient
            </Button>
          </Link>
          <Link href="/prescriptions/new">
            <Button
              className="h-11 px-6 rounded-2xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              + New Prescription
            </Button>
          </Link>
        </div>
      </div>

      {/* ================= PRIMARY BEHANCE 6-CARD GRID ================= */}
      {/* Top Row: Patients Summary Donut, Today Appointment, Next Patient Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
        {/* CARD 1: Patients Summary Donut (4 Cols) */}
        <div className="xl:col-span-4 bg-white rounded-[26px] p-6 sm:p-7 border border-[#E6ECF5] shadow-[0_4px_20px_rgba(20,40,90,0.03)] flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Patients Summary {stats.currentMonthYear}
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">مریضوں کا ماہانہ خلاصہ</p>
          </div>

          {/* Clean Donut Chart (SVG) */}
          <div className="my-6 flex items-center justify-center relative">
            <svg className="w-52 h-52 -rotate-90" viewBox="0 0 100 100">
              {/* Background circle track */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="15"
              />
              {/* Segment 1: Total Patients (Royal Blue #1E50DE) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#1E50DE"
                strokeWidth="15"
                strokeDasharray="226"
                strokeDashoffset="90"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              {/* Segment 2: Old Patients (Warm Amber/Gold #F5B938) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#F5B938"
                strokeWidth="15"
                strokeDasharray="226"
                strokeDashoffset="145"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              {/* Segment 3: New Patients (Soft Sky Blue #B4CFFF) */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#B4CFFF"
                strokeWidth="15"
                strokeDasharray="226"
                strokeDashoffset="185"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                {stats.totalPatients}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Total Patients
              </span>
            </div>
          </div>

          {/* Legend Matching Behance Design */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2.5 text-slate-700">
                <span className="h-3 w-3 rounded-xs bg-[#B4CFFF] shrink-0" />
                <span>New Patients</span>
              </div>
              <span className="text-slate-900 font-bold">{stats.newPatientsThisMonth} ({stats.newPercent}%)</span>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2.5 text-slate-700">
                <span className="h-3 w-3 rounded-xs bg-[#F5B938] shrink-0" />
                <span>Old Patients</span>
              </div>
              <span className="text-slate-900 font-bold">{stats.oldPatients} ({stats.oldPercent}%)</span>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2.5 text-slate-700">
                <span className="h-3 w-3 rounded-xs bg-[#1E50DE] shrink-0" />
                <span>Total Patients</span>
              </div>
              <span className="text-slate-900 font-bold">{stats.totalPatients} (100%)</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Today Appointment (Soft Tinted Blue Card #EEF4FF - 4 Cols) */}
        <div className="xl:col-span-4 bg-[#EDF2FE] rounded-[26px] p-6 sm:p-7 border border-[#DCE6FC] shadow-[0_4px_20px_rgba(20,40,90,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today Appointment</h2>
                <p className="text-[11px] text-slate-500">آج کے معائنے اور فالو اپ</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1E50DE] text-[10px] font-bold">
                {stats.todayAppointments.length} Active
              </span>
            </div>

            {/* Table Column Headers */}
            <div className="grid grid-cols-12 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-blue-200/50">
              <span className="col-span-3">Patient</span>
              <span className="col-span-6">Name / Diagnosis</span>
              <span className="col-span-3 text-right">Time</span>
            </div>

            {/* Appointment Rows */}
            <div className="divide-y divide-blue-200/40">
              {stats.todayAppointments.map((apt, idx) => {
                const isSelected = selectedPatient?.name === apt.name;
                return (
                  <div
                    key={apt.id || idx}
                    onClick={() => {
                      const matched = stats.recentPatients.find((p) => p.name === apt.name);
                      if (matched) {
                        setSelectedPatient({
                          ...matched,
                          diagnosis: apt.diagnosis,
                          patientNumber: matched.patientNumber,
                          dob: matched.age ? `${matched.age} Years Old` : "15 January 1989",
                          sex: matched.gender || "Male",
                          weight: "59 Kg",
                          lastAppointment: "15 Dec - 2026",
                          height: "172 cm",
                          regDate: "10 Dec 2026",
                          phone: matched.phone || "(308) 555-0102",
                          historyTags: ["Asthma", "Hypertension", "Allergies"],
                        });
                      }
                    }}
                    className={`grid grid-cols-12 items-center py-3.5 cursor-pointer transition-all rounded-xl px-1 hover:bg-white/60 ${
                      isSelected ? "bg-white/80 ring-1 ring-[#1E50DE]/20" : ""
                    }`}
                  >
                    {/* Patient Avatar */}
                    <div className="col-span-3 flex items-center">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {apt.name.charAt(0)}
                      </div>
                    </div>

                    {/* Name / Diagnosis */}
                    <div className="col-span-6 min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-900 truncate">{apt.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{apt.diagnosis}</p>
                    </div>

                    {/* Time Badge */}
                    <div className="col-span-3 text-right">
                      {apt.isOngoing ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#1E50DE] text-[10px] font-bold shadow-xs">
                          On Going
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-600">
                          {apt.time}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-blue-200/40 text-center">
            <Link
              href="/patients"
              className="text-xs font-bold text-[#1E50DE] hover:underline inline-flex items-center gap-1"
            >
              See All Appointments →
            </Link>
          </div>
        </div>

        {/* CARD 3: Next Patient Details (Deep Clinical Inspection - 4 Cols) */}
        <div className="xl:col-span-4 bg-[#EDF2FE] rounded-[26px] p-6 sm:p-7 border border-[#DCE6FC] shadow-[0_4px_20px_rgba(20,40,90,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Next Patient Details</h2>
              <span className="text-[10px] font-bold text-slate-500">اگلا مریض</span>
            </div>

            {/* Header: Avatar, Name, Condition & Patient ID */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-blue-200/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#1E50DE] to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-md ring-2 ring-white shrink-0">
                  {selectedPatient?.name?.charAt(0) || "S"}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 truncate">
                    {selectedPatient?.name || "Sanath Deo"}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {selectedPatient?.diagnosis || "Health Checkup"}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient ID</span>
                <span className="font-mono text-xs font-bold text-slate-900">
                  {selectedPatient?.patientNumber || "0220092020005"}
                </span>
              </div>
            </div>

            {/* Demographics 6-Grid */}
            <div className="grid grid-cols-3 gap-y-3 gap-x-2 py-4 border-b border-blue-200/50 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">D. O. B</span>
                <span className="font-bold text-slate-800">{selectedPatient?.dob || "15 January 1989"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">Sex</span>
                <span className="font-bold text-slate-800">{selectedPatient?.sex || "Male"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">Weight</span>
                <span className="font-bold text-slate-800">{selectedPatient?.weight || "59 Kg"}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">Last Appointment</span>
                <span className="font-bold text-slate-800">{selectedPatient?.lastAppointment || "15 Dec - 2026"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">Height</span>
                <span className="font-bold text-slate-800">{selectedPatient?.height || "172 cm"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold">Reg. Date</span>
                <span className="font-bold text-slate-800">{selectedPatient?.regDate || "10 Dec 2026"}</span>
              </div>
            </div>

            {/* Patient History Pills */}
            <div className="py-3.5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Patient History (طبی تاریخ)
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#FEF3C7] text-[#B45309] text-xs font-bold">
                  Asthma
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold">
                  Hypertension
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#FEE2E2] text-[#DC2626] text-xs font-bold">
                  Fever
                </span>
              </div>
            </div>

            {/* Action Buttons: Phone, Document, Chat */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <a
                href={`tel:${selectedPatient?.phone || "3085550102"}`}
                className="col-span-1 bg-[#1E50DE] hover:bg-blue-700 text-white rounded-xl py-2 px-2 text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors truncate"
              >
                <Phone className="h-3 w-3 shrink-0" />
                <span className="truncate">{selectedPatient?.phone?.replace(/[^0-9]/g, "").slice(0, 10) || "Call"}</span>
              </a>

              <Link
                href={selectedPatient?.id ? `/patients/${selectedPatient.id}` : "/patients"}
                className="col-span-1 bg-white hover:bg-blue-50 text-[#1E50DE] border border-blue-200/80 rounded-xl py-2 px-2 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span>Document</span>
              </Link>

              <Link
                href={`/prescriptions/new?patientId=${selectedPatient?.id || ""}`}
                className="col-span-1 bg-white hover:bg-blue-50 text-[#1E50DE] border border-blue-200/80 rounded-xl py-2 px-2 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span>Prescribe</span>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-200/40 text-center">
            <Link
              href={selectedPatient?.latestPrescriptionId ? `/prescriptions/${selectedPatient.latestPrescriptionId}` : "/prescriptions"}
              className="text-xs font-bold text-[#1E50DE] hover:underline"
            >
              Last Prescriptions →
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SECOND ROW: Patients Review, Appointment Request, Calendar ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6">
        {/* CARD 4: Patients Review (4 Cols) */}
        <div className="xl:col-span-4 bg-white rounded-[26px] p-6 sm:p-7 border border-[#E6ECF5] shadow-[0_4px_20px_rgba(20,40,90,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-slate-900">Patients Review</h2>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ★ 4.9 Score
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-6">مریضوں کا تاثر اور اطمینان</p>

            {/* Horizontal Review Progress Bars matching Behance screenshot */}
            <div className="space-y-4">
              {/* Excellent - Blue */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs font-semibold text-slate-600">Excellent</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#1E50DE] w-[85%]" />
                </div>
              </div>

              {/* Great - Green */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs font-semibold text-slate-600">Great</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#10B981] w-[65%]" />
                </div>
              </div>

              {/* Good - Orange */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs font-semibold text-slate-600">Good</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#F59E0B] w-[42%]" />
                </div>
              </div>

              {/* Average - Cyan */}
              <div className="flex items-center gap-3">
                <span className="w-16 text-xs font-semibold text-slate-600">Average</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#06B6D4] w-[20%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Overall Clinical Satisfaction</span>
            <span className="font-extrabold text-[#1E50DE]">{stats.patientsReview.positiveRate}</span>
          </div>
        </div>

        {/* CARD 5: Appointment Request (Soft Tinted Blue Card #EEF4FF - 4 Cols) */}
        <div className="xl:col-span-4 bg-[#EDF2FE] rounded-[26px] p-6 sm:p-7 border border-[#DCE6FC] shadow-[0_4px_20px_rgba(20,40,90,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Appointment Request</h2>
                <p className="text-[11px] text-slate-500">نئی درخواستیں اور کلینیکل ٹوکن</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1E50DE] text-[10px] font-bold">
                {requests.length} Pending
              </span>
            </div>

            {/* Request Rows with 3 Actions */}
            <div className="divide-y divide-blue-200/40">
              {requests.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No pending requests right now.
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {req.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{req.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{req.condition}</p>
                      </div>
                    </div>

                    {/* 3 Action Buttons: Green Checkmark, Red X, Blue Chat */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleApproveRequest(req.id, req.patientId)}
                        title="Accept & Start Consultation"
                        className="h-8 w-8 rounded-xl bg-[#D1FAE5] text-[#059669] hover:bg-[#A7F3D0] flex items-center justify-center transition-colors shadow-xs"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDismissRequest(req.id)}
                        title="Dismiss"
                        className="h-8 w-8 rounded-xl bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA] flex items-center justify-center transition-colors shadow-xs"
                      >
                        <X className="h-4 w-4 stroke-[3]" />
                      </button>

                      <Link
                        href={`/prescriptions/new?patientId=${req.patientId || ""}`}
                        title="Quick Prescription"
                        className="h-8 w-8 rounded-xl bg-[#DBEAFE] text-[#1E50DE] hover:bg-[#BFDBFE] flex items-center justify-center transition-colors shadow-xs"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-blue-200/40 text-center">
            <Link
              href="/patients"
              className="text-xs font-bold text-[#1E50DE] hover:underline inline-flex items-center gap-1"
            >
              See All →
            </Link>
          </div>
        </div>

        {/* CARD 6: Interactive Calendar (4 Cols) */}
        <div className="xl:col-span-4 bg-white rounded-[26px] p-6 sm:p-7 border border-[#E6ECF5] shadow-[0_4px_20px_rgba(20,40,90,0.03)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Calendar</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setCalendarMonthOffset((prev) => prev - 1)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-bold text-slate-700 min-w-[100px] text-center">
                  {monthName} - {year}
                </span>
                <button
                  type="button"
                  onClick={() => setCalendarMonthOffset((prev) => prev + 1)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Days of week header matching Behance: Sa Su Mo Tu We Th Fr */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
              <span>Sa</span>
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
            </div>

            {/* Calendar Cells Grid */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold">
              {calendarCells.map((day, idx) => {
                if (!day) {
                  return <span key={`empty-${idx}`} className="h-8" />;
                }
                const active = isToday(day);
                return (
                  <div key={day} className="flex items-center justify-center">
                    <span
                      className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${
                        active
                          ? "bg-[#1E50DE] text-white font-bold shadow-md shadow-blue-500/30"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Clinical Appointments Marked</span>
            <span className="text-[#1E50DE] font-bold">5 Dates</span>
          </div>
        </div>
      </div>

      {/* ================= HOMERX CLINICAL POWER FEATURES (USER'S EXPLICIT REQUIREMENT) ================= */}
      {/* 4 Clinical Fast Launchpad Cards */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-[#1E50DE]" />
              Homeopathic Clinical Engine & Tools (ہومیوپیتھک ٹولز)
            </h2>
            <p className="text-xs text-slate-500">
              Access the 780+ remedies encyclopedia, Boenninghausen & Kent repertory, and clinic letterhead system.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tool 1: 780+ Master Remedies */}
          <Link
            href="/medicines"
            className="group bg-white rounded-2xl p-5 border border-[#E6ECF5] shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 text-[#1E50DE] flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                <Pill className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-[#1E50DE] bg-blue-50 px-2 py-0.5 rounded-full">
                780+ Remedies
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#1E50DE] transition-colors">
                Master Remedies Database
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Polychrests, Nosodes, Sarcodes & Mother Tinctures with real-time arrow search.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#1E50DE] mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore Remedies →
            </span>
          </Link>

          {/* Tool 2: Repertory Rubrics */}
          <Link
            href="/repertory"
            className="group bg-white rounded-2xl p-5 border border-[#E6ECF5] shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Repertory
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">
                Repertory Rubrics Navigator
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Boenninghausen & Kent repertorial grading for precise homeopathic similimum matching.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Search Rubrics →
            </span>
          </Link>

          {/* Tool 3: Single-Page A4 Letterhead Engine */}
          <Link
            href="/clinic"
            className="group bg-white rounded-2xl p-5 border border-[#E6ECF5] shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-11 w-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                <Printer className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Strict A4 Sheet
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                A4 Letterhead & Presets
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Customize clinic header, digital signature, QR code validation & print presets.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-600 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Manage Letterhead →
            </span>
          </Link>

          {/* Tool 4: Super Admin & Patient Directory */}
          <Link
            href="/patients"
            className="group bg-white rounded-2xl p-5 border border-[#E6ECF5] shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-11 w-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Fast Search
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
                Patient Medical Directory
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                Instant patient lookup, historical visits, clinical notes & WhatsApp contact.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-600 mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Directory →
            </span>
          </Link>
        </div>
      </div>

      {/* ================= RECENT PRESCRIPTIONS WITH REMEDY BADGES & 1-CLICK A4 PRINT ================= */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#1E50DE]" />
              Recent Prescriptions & Clinical Formulations (جاری کردہ نسخہ جات)
            </h2>
            <p className="text-xs text-slate-500">
              Direct single-page A4 PDF printing, potencies, dosages, and patient details.
            </p>
          </div>
          <Link href="/prescriptions">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-[#1E50DE] hover:bg-blue-50 rounded-xl">
              View All Prescriptions
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-[26px] border border-[#E6ECF5] shadow-[0_4px_20px_rgba(20,40,90,0.03)] overflow-hidden">
          {stats.recentPrescriptions.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <FileText className="h-10 w-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No prescriptions issued yet.</p>
              <Link href="/prescriptions/new">
                <Button className="bg-[#1E50DE] hover:bg-blue-700 text-white rounded-xl text-xs font-bold">
                  + Create First Prescription
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recentPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="p-5 sm:p-6 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-extrabold text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-[#1E50DE] border border-blue-100">
                        {rx.prescriptionNumber}
                      </span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {formatDate(rx.prescriptionDate)}
                      </span>
                    </div>

                    <div>
                      <Link
                        href={`/patients/${rx.patient?.id}`}
                        className="font-extrabold text-slate-900 hover:text-[#1E50DE] transition-colors text-sm inline-block"
                      >
                        {rx.patient?.name}
                      </Link>
                      <span className="text-xs text-slate-500 ml-2">
                        ({rx.patient?.gender}, {rx.patient?.age || "—"} yrs)
                      </span>
                    </div>

                    {/* Prescribed Remedies with Potencies Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {rx.items.map((item: any, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
                        >
                          {item.medicineName} <strong className="text-[#1E50DE] font-black">{item.potency}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <Link href={`/prescriptions/${rx.id}/print`}>
                      <Button
                        size="sm"
                        className="rounded-xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 h-9 px-3.5"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span>Print A4</span>
                      </Button>
                    </Link>
                    <Link href={`/prescriptions/${rx.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs h-9 px-3.5"
                      >
                        <span>View Details</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
