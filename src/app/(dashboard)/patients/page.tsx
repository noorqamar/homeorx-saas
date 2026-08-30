import Link from "next/link";
import { getPatients } from "@/app/actions/patients";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  UserPlus,
  Phone,
  FileText,
  Calendar,
  Eye,
  PlusCircle,
  Users,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const patients = await getPatients(query);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-emerald-600" />
            Patient Directory
          </h1>
          <p className="text-sm text-slate-500">
            Search, manage, and view complete homeopathic clinical histories
          </p>
        </div>

        <Link href="/patients/new">
          <Button variant="primary">
            <UserPlus className="h-4 w-4 mr-2" />
            + New Patient
          </Button>
        </Link>
      </div>

      {/* Instant Search Bar */}
      <Card>
        <CardContent className="p-4">
          <form method="GET" className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by Patient Name, ID (PAT-2026-0001), Phone, WhatsApp, City..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>
            <Button type="submit" variant="secondary" size="md">
              Search
            </Button>
            {query && (
              <Link href="/patients">
                <Button variant="ghost" size="md">
                  Clear
                </Button>
              </Link>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Patient Count & Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
          <span>{patients.length} Patients Found</span>
          {query && <span>Filtered by &quot;{query}&quot;</span>}
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Name & Demographics</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Chief Complaint</th>
                  <th className="py-3 px-4 text-center">Prescriptions</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      <Users className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                      <p className="font-semibold text-base">No patients found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Try searching with a different name or create a new patient profile.
                      </p>
                      <Link href="/patients/new" className="inline-block mt-3">
                        <Button size="sm" variant="primary">
                          <UserPlus className="h-4 w-4 mr-1.5" />
                          Add New Patient
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono font-semibold text-xs text-slate-900">
                        {p.patientNumber}
                      </td>

                      <td className="py-3.5 px-4">
                        <Link
                          href={`/patients/${p.id}`}
                          className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                        >
                          {p.name}
                        </Link>
                        <div className="text-xs text-slate-500 mt-0.5">
                          <span>{p.gender}</span>
                          {p.age && <span> • {p.age} years</span>}
                          {p.city && <span> • {p.city}</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-xs space-y-0.5">
                        {p.phone ? (
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Phone className="h-3 w-3 text-slate-400" />
                            <span>{p.phone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                        {p.whatsapp && p.whatsapp !== p.phone && (
                          <div className="text-[11px] text-emerald-600">
                            WA: {p.whatsapp}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">
                        {p.chiefComplaint || <span className="text-slate-400">—</span>}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge variant={p._count?.prescriptions ? "primary" : "default"}>
                          <FileText className="h-3 w-3 mr-1" />
                          {p._count?.prescriptions || 0}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(p.createdAt)}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/prescriptions/new?patientId=${p.id}`}>
                            <Button size="sm" variant="outline" className="text-xs">
                              <PlusCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                              + Rx
                            </Button>
                          </Link>
                          <Link href={`/patients/${p.id}`}>
                            <Button size="sm" variant="ghost" className="text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Profile
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
