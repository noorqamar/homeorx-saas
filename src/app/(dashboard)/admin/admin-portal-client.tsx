"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Trash2,
  Building2,
  Users,
  FileText,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Sparkles,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { updateDoctorStatus, deleteDoctorAccount } from "@/app/actions/admin";

export function AdminPortalClient({
  initialDoctors,
  metrics,
}: {
  initialDoctors: any[];
  metrics: {
    totalDoctors: number;
    pendingDoctors: number;
    totalClinics: number;
    totalPrescriptions: number;
    totalPatients: number;
  };
}) {
  const [doctors, setDoctors] = useState<any[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED" | "SUSPENDED">("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleStatusChange = async (doctorId: string, newStatus: "APPROVED" | "PENDING" | "SUSPENDED") => {
    setLoadingId(doctorId);
    setMessage(null);
    try {
      await updateDoctorStatus(doctorId, newStatus);
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctorId ? { ...d, status: newStatus, active: newStatus === "APPROVED" } : d))
      );
      setMessage({
        type: "success",
        text: `Doctor account status updated to ${newStatus} successfully.`,
      });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update doctor status." });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (doctorId: string, doctorName: string) => {
    if (!confirm(`Are you sure you want to permanently delete doctor account "${doctorName}" and all clinic data?`)) {
      return;
    }

    setLoadingId(doctorId);
    setMessage(null);
    try {
      await deleteDoctorAccount(doctorId);
      setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
      setMessage({
        type: "success",
        text: `Doctor account "${doctorName}" has been deleted.`,
      });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete doctor account." });
    } finally {
      setLoadingId(null);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.clinicName && doc.clinicName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.registrationNumber && doc.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = filterStatus === "ALL" || doc.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-amber-500" />
            Super Admin Portal (مرکزی ایڈمن پینل)
          </h1>
          <p className="text-xs text-slate-500">
            Platform-wide Doctor Approval, Clinic Management & SaaS Access Control
          </p>
        </div>

        <Badge variant="warning" className="px-3 py-1 text-xs font-bold shadow-xs">
          👑 Super Administrator Authority
        </Badge>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 border ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Doctors</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">{metrics.totalDoctors}</strong>
        </div>

        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">Pending Approval</span>
          <strong className="text-2xl font-black text-amber-800 mt-1 block">{metrics.pendingDoctors}</strong>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Active Clinics</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">{metrics.totalClinics}</strong>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Patients</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">{metrics.totalPatients}</strong>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Prescriptions Issued</span>
          <strong className="text-2xl font-black text-emerald-700 mt-1 block">{metrics.totalPrescriptions}</strong>
        </div>
      </div>

      {/* Doctor Approval & Clinic Directory */}
      <Card className="border-slate-200 shadow-xs overflow-hidden">
        <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-600" />
              Registered Doctors & Clinics ({filteredDoctors.length})
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Review new doctor registrations and grant or revoke platform access
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search doctor or clinic..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 w-48 shadow-2xs"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
              {(["ALL", "PENDING", "APPROVED", "SUSPENDED"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-md font-semibold text-[11px] transition-colors ${
                    filterStatus === st
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {st === "ALL" ? "All" : st === "PENDING" ? "Pending" : st === "APPROVED" ? "Approved" : "Suspended"}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Doctor & Credentials</th>
                  <th className="py-2.5 px-3">Clinic / Workspace</th>
                  <th className="py-2.5 px-3">Contact Details</th>
                  <th className="py-2.5 px-3">Registered</th>
                  <th className="py-2.5 px-3">Activity</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredDoctors.map((doc) => {
                  const isLoading = loadingId === doc.id;
                  const isSuperAdmin = doc.role === "SUPER_ADMIN";

                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/60">
                      {/* Doctor Name & Role */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSuperAdmin
                                ? "bg-amber-500 text-white"
                                : "bg-emerald-600 text-white"
                            }`}
                          >
                            {doc.name.charAt(0)}
                          </div>
                          <div>
                            <strong className="font-bold text-slate-900 block text-xs">
                              {doc.name}
                            </strong>
                            <span className="text-[11px] text-slate-500 block">
                              {doc.qualification || "Homeopathic Doctor"} • {doc.registrationNumber || "No Reg"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Clinic */}
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900 block truncate max-w-[160px]">
                          {doc.clinicName}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">
                          {doc.clinicAddress || "Primary Location"}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-3 space-y-0.5">
                        <div className="flex items-center gap-1 text-[11px] text-slate-700">
                          <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{doc.email}</span>
                        </div>
                        {doc.phone && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{doc.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Registered Date */}
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap text-[11px]">
                        {formatDate(doc.createdAt)}
                      </td>

                      {/* Activity Metrics */}
                      <td className="py-3 px-3 whitespace-nowrap text-[11px] text-slate-600">
                        <span>{doc.totalPatients} Patients</span>
                        <span className="block text-slate-400">{doc.totalPrescriptions} Rx</span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        {isSuperAdmin ? (
                          <Badge variant="warning" className="text-[10px]">Super Admin</Badge>
                        ) : doc.status === "APPROVED" ? (
                          <Badge variant="success" className="text-[10px]">Approved (منظور)</Badge>
                        ) : doc.status === "PENDING" ? (
                          <Badge variant="warning" className="text-[10px]">Pending Approval</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">Suspended</Badge>
                        )}
                      </td>

                      {/* Admin Actions */}
                      <td className="py-3 px-3 text-right">
                        {isSuperAdmin ? (
                          <span className="text-[11px] text-slate-400 italic">Primary Account</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5">
                            {doc.status !== "APPROVED" && (
                              <Button
                                variant="primary"
                                size="sm"
                                disabled={isLoading}
                                onClick={() => handleStatusChange(doc.id, "APPROVED")}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] py-1 px-2.5 font-bold"
                              >
                                <UserCheck className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                            )}

                            {doc.status === "APPROVED" && (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={isLoading}
                                onClick={() => handleStatusChange(doc.id, "SUSPENDED")}
                                className="text-amber-700 hover:bg-amber-50 text-[11px] py-1 px-2"
                              >
                                <UserX className="h-3 w-3 mr-1" />
                                Suspend
                              </Button>
                            )}

                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleDelete(doc.id, doc.name)}
                              title="Delete Doctor"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredDoctors.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No doctor accounts found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
