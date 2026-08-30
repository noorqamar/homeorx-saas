import Link from "next/link";
import {
  Users,
  UserPlus,
  FileText,
  CalendarCheck,
  PlusCircle,
  Search,
  ArrowUpRight,
  Clock,
  Sparkles,
  BookOpen,
  Activity,
  HeartPulse,
  Printer,
  ShieldCheck,
  Languages,
  Stethoscope,
  Building2,
  Sliders,
} from "lucide-react";
import { getDashboardStats } from "@/app/actions/dashboard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Hero Banner with Rich Colors */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-emerald-500/20">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 -mb-12 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 backdrop-blur-md shadow-xs">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>Classical Homeopathic Clinical Suite • ہومیوپیتھک کلینیکل پورٹل</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Homeo<span className="text-emerald-400">Rx</span> Doctor Dashboard
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Formulate bilingual homeopathic prescriptions with <strong>780+ remedies</strong>, search patients with instant speed, and generate printable single-page A4 letterheads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/patients/new">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold backdrop-blur-md shadow-sm text-xs sm:text-sm"
              >
                <UserPlus className="h-4 w-4 mr-2 text-teal-300" />
                + New Patient (نیا مریض)
              </Button>
            </Link>
            <Link href="/prescriptions/new">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black shadow-xl ring-2 ring-emerald-400/40 text-xs sm:text-sm"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                + New Prescription (نیا نسخہ)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 4 Vibrant Gradient Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Patients (Emerald Gradient) */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-950/10 flex items-center justify-between border border-emerald-400/30">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100/90 block">
              Total Patients (کل مریض)
            </span>
            <strong className="text-3xl font-black text-white tracking-tight block">
              {stats.totalPatients}
            </strong>
            <span className="text-[11px] text-emerald-200 font-medium block">
              Active registered records
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shrink-0">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 2: Prescriptions Issued (Indigo Gradient) */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-600 to-blue-800 text-white shadow-lg shadow-indigo-950/10 flex items-center justify-between border border-indigo-400/30">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-100/90 block">
              Prescriptions (جاری نسخے)
            </span>
            <strong className="text-3xl font-black text-white tracking-tight block">
              {stats.totalPrescriptions}
            </strong>
            <span className="text-[11px] text-indigo-200 font-medium block">
              Single-page A4 letterheads
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shrink-0">
            <FileText className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 3: Master Remedies (Violet Gradient) */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-violet-800 text-white shadow-lg shadow-purple-950/10 flex items-center justify-between border border-purple-400/30">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-100/90 block">
              Master Remedies (ادویات)
            </span>
            <strong className="text-3xl font-black text-white tracking-tight block">
              780+
            </strong>
            <span className="text-[11px] text-purple-200 font-medium block">
              Live arrow-key autocomplete
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shrink-0">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        {/* Metric 4: Monthly New Patients (Amber Gradient) */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-950/10 flex items-center justify-between border border-amber-300/30">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100/90 block">
              This Month (ماہانہ اندراج)
            </span>
            <strong className="text-3xl font-black text-white tracking-tight block">
              {stats.newPatientsThisMonth}
            </strong>
            <span className="text-[11px] text-amber-100 font-medium block">
              New patient consultations
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shrink-0">
            <UserPlus className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Prescriptions & Patient Fast Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Prescriptions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Recent Prescriptions (جاری کردہ نسخہ جات)
              </h2>
              <p className="text-xs text-slate-500">
                Issued prescriptions with remedies, potencies, and patient details
              </p>
            </div>
            <Link href="/prescriptions">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
                View All
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentPrescriptions.length === 0 ? (
              <Card className="border-slate-200 shadow-xs">
                <CardContent className="p-8 text-center text-slate-500 space-y-2">
                  <FileText className="h-8 w-8 mx-auto text-slate-300" />
                  <p className="font-medium text-sm">No prescriptions issued yet.</p>
                  <Link href="/prescriptions/new">
                    <Button size="sm" variant="primary" className="mt-2 font-bold">
                      Create First Prescription
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              stats.recentPrescriptions.map((rx) => (
                <Card
                  key={rx.id}
                  className="hover:border-emerald-300 hover:shadow-md transition-all border-slate-200 overflow-hidden"
                >
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {rx.prescriptionNumber}
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {formatDate(rx.prescriptionDate)}
                        </span>
                      </div>

                      <div>
                        <Link
                          href={`/patients/${rx.patient?.id}`}
                          className="font-bold text-slate-900 hover:text-emerald-600 transition-colors text-sm"
                        >
                          {rx.patient?.name}
                        </Link>
                        <span className="text-xs text-slate-500 ml-2">
                          ({rx.patient?.gender}, {rx.patient?.age || "—"} yrs)
                        </span>
                      </div>

                      {/* Prescribed Remedies Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {rx.items.map((item, idx) => (
                          <Badge key={idx} variant="potency">
                            {item.medicineName} {item.potency}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Link href={`/prescriptions/${rx.id}/print`}>
                        <Button size="sm" variant="secondary" className="text-xs font-semibold">
                          <Printer className="h-3.5 w-3.5 mr-1" />
                          Print A4
                        </Button>
                      </Link>
                      <Link href={`/prescriptions/${rx.id}`}>
                        <Button size="sm" variant="outline" className="text-xs font-semibold">
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Right: Recent Patients & Fast Tool Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  Recent Patients (مریضوں کی فہرست)
                </h2>
                <p className="text-xs text-slate-500">
                  Quick patient profiles & fast prescription triggers
                </p>
              </div>
              <Link href="/patients">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-emerald-700 hover:bg-emerald-50">
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <Card className="border-slate-200 shadow-xs">
              <CardContent className="p-0 divide-y divide-slate-100">
                {stats.recentPatients.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-sm">
                    No patients registered yet.
                  </div>
                ) : (
                  stats.recentPatients.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/patients/${p.id}`}
                          className="font-bold text-sm text-slate-900 hover:text-emerald-600 transition-colors block truncate"
                        >
                          {p.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="font-mono">{p.patientNumber}</span>
                          <span>•</span>
                          <span>{p.phone || "No phone"}</span>
                        </div>
                        {p.chiefComplaint && (
                          <p className="text-xs text-slate-500 truncate mt-1 max-w-xs">
                            {p.chiefComplaint}
                          </p>
                        )}
                      </div>

                      <Link href={`/prescriptions/new?patientId=${p.id}`}>
                        <Button size="sm" variant="outline" className="text-xs shrink-0 font-bold text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                          + Rx
                        </Button>
                      </Link>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Clinical Tool Shortcuts */}
          <Card className="bg-slate-950 text-white border-slate-800 shadow-xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-800/80 bg-slate-900/50">
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Quick Clinical Tools (کلینیکل ٹولز)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              <Link
                href="/medicines"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-200 transition-all border border-slate-800 hover:border-emerald-500/40 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    780
                  </div>
                  <div>
                    <span className="font-bold text-white block group-hover:text-emerald-300">Browse 780+ Master Remedies</span>
                    <span className="text-[10px] text-slate-400">Polychrests, Nosodes, Sarcodes & Mother Tinctures</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </Link>

              <Link
                href="/repertory"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-200 transition-all border border-slate-800 hover:border-teal-500/40 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block group-hover:text-teal-300">Repertory Rubrics Browser</span>
                    <span className="text-[10px] text-slate-400">Kent & Boenninghausen rubrics & remedy gradings</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
              </Link>

              <Link
                href="/clinic"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-200 transition-all border border-slate-800 hover:border-blue-500/40 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Printer className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block group-hover:text-blue-300">Clinic Letterhead & Theme Presets</span>
                    <span className="text-[10px] text-slate-400">Branding, digital signatures & QR verification</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
