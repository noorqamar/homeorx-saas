import Link from "next/link";
import { getPrescriptions } from "@/app/actions/prescriptions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  PlusCircle,
  Clock,
  Printer,
  Copy,
  Eye,
  Edit3,
  Calendar,
  Filter,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PrescriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; start?: string; end?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.q || "";
  const startDate = resolvedParams.start || "";
  const endDate = resolvedParams.end || "";

  const prescriptions = await getPrescriptions({
    search,
    startDate,
    endDate,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-600" />
            Prescription Records (نسخہ جات کا ریکارڈ)
          </h1>
          <p className="text-sm text-slate-500">
            Search, edit, view, print, or repeat issued homeopathic prescriptions
          </p>
        </div>

        <Link href="/prescriptions/new">
          <Button variant="primary" className="font-bold shadow-xs">
            <PlusCircle className="h-4 w-4 mr-2" />
            + New Prescription (نیا نسخہ)
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <form method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                name="q"
                defaultValue={search}
                placeholder="Search RX number, patient name, patient ID, or remedy name..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <input
                type="date"
                name="start"
                defaultValue={startDate}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <input
                type="date"
                name="end"
                defaultValue={endDate}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2">
              <Button type="submit" variant="secondary" size="md" className="flex-1">
                Filter
              </Button>
              {(search || startDate || endDate) && (
                <Link href="/prescriptions">
                  <Button variant="ghost" size="md">
                    Clear
                  </Button>
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Prescriptions List Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
          <span>{prescriptions.length} Prescriptions Found</span>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">RX Number</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Patient Details</th>
                  <th className="py-3 px-4">Prescribed Medicines</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {prescriptions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <FileText className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                      <p className="font-semibold text-base">No prescriptions found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Try adjusting your search criteria or create a new prescription.
                      </p>
                      <Link href="/prescriptions/new" className="inline-block mt-3">
                        <Button size="sm" variant="primary">
                          <PlusCircle className="h-4 w-4 mr-1.5" />
                          + New Prescription
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  prescriptions.map((rx) => (
                    <tr
                      key={rx.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-slate-900 whitespace-nowrap">
                        <Link
                          href={`/prescriptions/${rx.id}`}
                          className="hover:text-emerald-600 transition-colors"
                        >
                          {rx.prescriptionNumber}
                        </Link>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {formatDate(rx.prescriptionDate)}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Link
                          href={`/patients/${rx.patient?.id}`}
                          className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                        >
                          {rx.patient?.name}
                        </Link>
                        <div className="text-xs text-slate-500 mt-0.5">
                          <span className="font-mono">{rx.patient?.patientNumber}</span>
                          <span> • {rx.patient?.gender}</span>
                          {rx.patient?.age && <span> • {rx.patient?.age} yrs</span>}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-md">
                          {rx.items.map((item, idx) => (
                            <Badge key={idx} variant="potency">
                              {item.medicineName} {item.potency}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Button */}
                          <Link href={`/prescriptions/${rx.id}/edit`}>
                            <Button size="sm" variant="outline" className="text-xs font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50">
                              <Edit3 className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                          </Link>

                          {/* Print Button */}
                          <Link href={`/prescriptions/${rx.id}/print`}>
                            <Button size="sm" variant="secondary" className="text-xs">
                              <Printer className="h-3.5 w-3.5 mr-1" />
                              Print
                            </Button>
                          </Link>

                          {/* View Button */}
                          <Link href={`/prescriptions/${rx.id}`}>
                            <Button size="sm" variant="ghost" className="text-xs">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
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
