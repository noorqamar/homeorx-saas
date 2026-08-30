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
    <div className="space-y-8">
      {/* Welcome & Quick Action Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-8 md:p-10 text-white shadow-xl border border-emerald-800/30">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-12 h-48 w-48 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Classical Homeopathic Clinical Suite • اردو اور انگلش سپورٹ</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome, Dr. Demo Hahnemann
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Formulate bilingual homeopathic prescriptions with <strong>780+ remedies</strong>, search patients with sub-millisecond speed, and generate printable A4 letterheads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/patients/new">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 font-semibold backdrop-blur-sm"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                New Patient
              </Button>
            </Link>
            <Link href="/prescriptions/new">
              <Button
                variant="primary"
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg ring-2 ring-emerald-400/40 text-base"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                + New Prescription (نیا نسخہ)
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="hover:border-emerald-300 hover:shadow-md transition-all border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Patients
              </p>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalPatients}
              </p>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                Active clinical records
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-100">
              <Users className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-300 hover:shadow-md transition-all border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                New Patients
              </p>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.newPatientsThisMonth}
              </p>
              <p className="text-xs text-blue-700 font-semibold">
                Registered this month
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center ring-1 ring-blue-100">
              <UserPlus className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-teal-300 hover:shadow-md transition-all border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Prescriptions Issued
              </p>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {stats.totalPrescriptions}
              </p>
              <p className="text-xs text-teal-700 font-semibold">
                Unique medical records
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center ring-1 ring-teal-100">
              <FileText className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-indigo-300 hover:shadow-md transition-all border-slate-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Master Remedies
              </p>
              <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                780+
              </p>
              <p className="text-xs text-indigo-700 font-semibold">
                Instant autocomplete
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-100">
              <Sparkles className="h-7 w-7" />
            </div>
          </CardContent>
        </Card>
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
              <Card>
                <CardContent className="p-8 text-center text-slate-500 space-y-2">
                  <FileText className="h-8 w-8 mx-auto text-slate-300" />
                  <p className="font-medium text-sm">No prescriptions issued yet.</p>
                  <Link href="/prescriptions/new">
                    <Button size="sm" variant="primary" className="mt-2">
                      Create First Prescription
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              stats.recentPrescriptions.map((rx) => (
                <Card
                  key={rx.id}
                  className="hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-900 border border-slate-200">
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
                        <Button size="sm" variant="secondary" className="text-xs">
                          <Printer className="h-3.5 w-3.5 mr-1" />
                          Print A4
                        </Button>
                      </Link>
                      <Link href={`/prescriptions/${rx.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
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

            <Card>
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
                      <div className="min-w-0">
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
                        <Button size="sm" variant="outline" className="text-xs shrink-0 font-semibold">
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
          <Card className="bg-slate-950 text-white border-slate-800 shadow-lg">
            <CardHeader className="pb-3 border-slate-800">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Quick Clinical Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              <Link
                href="/medicines"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 transition-colors border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    780
                  </div>
                  <div>
                    <span className="font-bold text-white block">Browse 780+ Homeopathic Remedies</span>
                    <span className="text-[10px] text-slate-400">Polychrests, Nosodes, Sarcodes & Mother Tinctures</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/repertory"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 transition-colors border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Repertory Rubrics Browser</span>
                    <span className="text-[10px] text-slate-400">Repertorization chapters & remedy gradings</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/clinic"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 transition-colors border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Printer className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Clinic Letterhead & Logo</span>
                    <span className="text-[10px] text-slate-400">Doctor qualifications & prescription header</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
