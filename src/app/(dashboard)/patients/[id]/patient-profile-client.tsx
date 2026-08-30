"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  Clock,
  PlusCircle,
  Printer,
  Copy,
  AlertCircle,
  Activity,
  History,
  Pill,
  Trash2,
  Edit,
  Edit3,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { deletePatient } from "@/app/actions/patients";

export function PatientProfileClient({ patient }: { patient: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "prescriptions" | "medicines" | "visits" | "notes"
  >("overview");
  const [isDeleting, setIsDeleting] = useState(false);

  // Flatten all prescribed medicines chronologically across all prescriptions
  const medicineHistory = (patient.prescriptions || []).flatMap((rx: any) =>
    (rx.items || []).map((it: any) => ({
      rxId: rx.id,
      rxNumber: rx.prescriptionNumber,
      date: rx.prescriptionDate,
      medicineName: it.medicineName,
      potency: it.potency,
      form: it.form || "Globules",
      dose: it.dose || "4 pills",
      frequency: it.frequency || "TDS",
      duration: it.duration || "7 days",
      instructions: it.instructions || "—",
    }))
  );

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete patient "${patient.name}" (${patient.patientNumber})? This will permanently delete all associated visits and prescriptions.`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePatient(patient.id);
      router.push("/patients");
    } catch (err: any) {
      alert(err.message || "Failed to delete patient");
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Patient Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xl flex items-center justify-center shrink-0 ring-2 ring-emerald-200">
              {patient.name.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900">
                  {patient.name}
                </h1>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {patient.patientNumber}
                </span>
                <Badge variant={patient.gender === "Male" ? "secondary" : "primary"}>
                  {patient.gender}
                </Badge>
                {patient.age && (
                  <Badge variant="default">{patient.age} years old</Badge>
                )}
              </div>

              {patient.fatherName && (
                <p className="text-xs text-slate-500">
                  S/O, D/O, W/O: <span className="font-medium text-slate-700">{patient.fatherName}</span>
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                {patient.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {patient.phone}
                  </span>
                )}
                {patient.whatsapp && patient.whatsapp !== patient.phone && (
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    WA: {patient.whatsapp}
                  </span>
                )}
                {patient.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {patient.city}
                  </span>
                )}
                {patient.occupation && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    {patient.occupation}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-center">
            <Link href={`/prescriptions/new?patientId=${patient.id}`}>
              <Button variant="primary" size="md" className="font-semibold shadow-sm">
                <PlusCircle className="h-4 w-4 mr-1.5" />
                + New Prescription
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              className="text-rose-600 hover:bg-rose-50 border-rose-200"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-t border-slate-100 mt-6 pt-3 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: User },
            {
              id: "prescriptions",
              label: `Prescriptions (${patient.prescriptions?.length || 0})`,
              icon: FileText,
            },
            {
              id: "medicines",
              label: `Medicine History (${medicineHistory.length})`,
              icon: Pill,
            },
            {
              id: "visits",
              label: `Visits (${patient.visits?.length || 0})`,
              icon: History,
            },
            { id: "notes", label: "Medical Notes", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-600" />
                  Primary Chief Complaint
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 leading-relaxed">
                {patient.chiefComplaint || (
                  <span className="text-slate-400 italic">No chief complaint recorded.</span>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  Latest Prescription Summary
                </CardTitle>
                {patient.prescriptions?.[0] && (
                  <Link href={`/prescriptions/${patient.prescriptions[0].id}`}>
                    <Button variant="ghost" size="sm" className="text-xs text-emerald-600">
                      View Full Rx
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                {patient.prescriptions?.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                      <span className="font-mono font-semibold text-slate-800">
                        {patient.prescriptions[0].prescriptionNumber}
                      </span>
                      <span>{formatDate(patient.prescriptions[0].prescriptionDate)}</span>
                    </div>

                    <div className="space-y-2">
                      {patient.prescriptions[0].items?.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">
                              {item.medicineName}
                            </span>
                            <Badge variant="potency">{item.potency}</Badge>
                            <span className="text-slate-500">({item.form || "Globules"})</span>
                          </div>
                          <div className="text-slate-600 font-medium">
                            {item.dose} • {item.frequency} • {item.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No prescriptions recorded yet.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Patient Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Prescriptions</span>
                  <span className="font-bold text-slate-800">
                    {patient.prescriptions?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Total Visits</span>
                  <span className="font-bold text-slate-800">
                    {patient.visits?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Registered On</span>
                  <span className="font-medium text-slate-800">
                    {formatDate(patient.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Known Allergies</span>
                  <span className="font-semibold text-rose-600">
                    {patient.allergies || "None reported"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Address</span>
                  <span className="font-medium text-slate-800 text-right">
                    {patient.address || "—"} {patient.city ? `(${patient.city})` : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Chronological Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Prescription History
            </h2>
            <Link href={`/prescriptions/new?patientId=${patient.id}`}>
              <Button size="sm" variant="primary">
                <PlusCircle className="h-4 w-4 mr-1" />
                + New Prescription
              </Button>
            </Link>
          </div>

          {patient.prescriptions?.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-slate-500 text-xs">
                No previous prescriptions for this patient.
              </CardContent>
            </Card>
          ) : (
            patient.prescriptions.map((rx: any) => (
              <Card key={rx.id} className="overflow-hidden">
                <CardHeader className="bg-slate-50/70 py-3 px-5 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-900">
                      {rx.prescriptionNumber}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(rx.prescriptionDate)}
                    </span>
                    {rx.followUpDays && (
                      <Badge variant="warning">
                        Follow-up: {rx.followUpDays} days
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/prescriptions/${rx.id}/edit`}>
                      <Button size="sm" variant="outline" className="text-xs font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50">
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/prescriptions/new?duplicateFrom=${rx.id}`}>
                      <Button size="sm" variant="ghost" className="text-xs">
                        <Copy className="h-3 w-3 mr-1" />
                        Copy / Reuse
                      </Button>
                    </Link>
                    <Link href={`/prescriptions/${rx.id}/print`}>
                      <Button size="sm" variant="secondary" className="text-xs">
                        <Printer className="h-3 w-3 mr-1" />
                        Print
                      </Button>
                    </Link>
                    <Link href={`/prescriptions/${rx.id}`}>
                      <Button size="sm" variant="primary" className="text-xs">
                        View
                      </Button>
                    </Link>
                  </div>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  {rx.chiefComplaint && (
                    <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                      <span className="font-semibold text-slate-900">Chief Complaint: </span>
                      {rx.chiefComplaint}
                    </div>
                  )}

                  {/* Medicines Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/70 text-slate-600 font-semibold uppercase">
                        <tr>
                          <th className="py-2 px-3">#</th>
                          <th className="py-2 px-3">Medicine</th>
                          <th className="py-2 px-3">Potency</th>
                          <th className="py-2 px-3">Form</th>
                          <th className="py-2 px-3">Dose</th>
                          <th className="py-2 px-3">Frequency</th>
                          <th className="py-2 px-3">Duration</th>
                          <th className="py-2 px-3">Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rx.items?.map((item: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-3 text-slate-400 font-mono">
                              {idx + 1}
                            </td>
                            <td className="py-2.5 px-3 font-bold text-slate-900">
                              {item.medicineName}
                            </td>
                            <td className="py-2.5 px-3">
                              <Badge variant="potency">{item.potency}</Badge>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {item.form || "Globules"}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {item.dose || "4 pills"}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 font-medium">
                              {item.frequency || "TDS"}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {item.duration || "7 days"}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {item.instructions || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {rx.generalInstructions && (
                    <p className="text-xs text-slate-500 italic pt-1">
                      <span className="font-semibold text-slate-700">Instructions: </span>
                      {rx.generalInstructions}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Prescribed Medicine History (Aggregated) */}
      {activeTab === "medicines" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Pill className="h-4 w-4 text-emerald-600" />
              Chronological Homeopathic Remedies Prescribed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 font-semibold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Prescription No.</th>
                    <th className="py-3 px-4">Medicine</th>
                    <th className="py-3 px-4">Potency</th>
                    <th className="py-3 px-4">Form</th>
                    <th className="py-3 px-4">Dose</th>
                    <th className="py-3 px-4">Frequency</th>
                    <th className="py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicineHistory.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-slate-400">
                        No medicines have been prescribed yet.
                      </td>
                    </tr>
                  ) : (
                    medicineHistory.map((m: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                          {formatDate(m.date)}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                          <Link
                            href={`/prescriptions/${m.rxId}`}
                            className="hover:text-emerald-600"
                          >
                            {m.rxNumber}
                          </Link>
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {m.medicineName}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="potency">{m.potency}</Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{m.form}</td>
                        <td className="py-3 px-4 text-slate-600">{m.dose}</td>
                        <td className="py-3 px-4 text-slate-700 font-medium">
                          {m.frequency}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{m.duration}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Visits */}
      {activeTab === "visits" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <History className="h-4 w-4 text-emerald-600" />
              Patient Visit Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patient.visits?.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">
                No recorded visits.
              </p>
            ) : (
              patient.visits.map((v: any) => (
                <div
                  key={v.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>Visit #{v.visitNumber}</span>
                    <span className="text-slate-500 font-normal">
                      {formatDate(v.visitDate)}
                    </span>
                  </div>
                  {v.chiefComplaint && (
                    <p className="text-slate-700">
                      <strong className="text-slate-900">Complaint: </strong>
                      {v.chiefComplaint}
                    </p>
                  )}
                  {v.symptoms && (
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Symptoms: </strong>
                      {v.symptoms}
                    </p>
                  )}
                  {v.diagnosis && (
                    <p className="text-slate-600">
                      <strong className="text-slate-800">Diagnosis/Notes: </strong>
                      {v.diagnosis}
                    </p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {/* Tab 5: Medical Notes & Case Record */}
      {activeTab === "notes" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Medical & Family Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Medical & Surgical History:
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  {patient.medicalHistory || "None recorded"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Family History:
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  {patient.familyHistory || "None recorded"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Known Allergies:
                </span>
                <p className="text-rose-700 bg-rose-50 p-2.5 rounded-lg font-medium">
                  {patient.allergies || "None reported"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Therapeutic Background & Constitutional Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Current Conventional Medicines:
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  {patient.currentMedicines || "None recorded"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Previous Homeopathic Treatment:
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  {patient.previousTreatment || "None recorded"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Physician&apos;s Constitutional Notes:
                </span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  {patient.notes || "No additional notes recorded"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
