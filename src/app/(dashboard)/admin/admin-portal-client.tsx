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
  CreditCard,
  Zap,
  Check,
  X,
  RefreshCw,
  Crown,
  AlertCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import {
  approveDoctorUpgrade,
  rejectDoctorUpgrade,
  suspendDoctorAccount,
  deleteDoctorAccount,
  updateDoctorStatus,
} from "@/app/actions/admin";

export function AdminPortalClient({
  initialDoctors,
  metrics,
}: {
  initialDoctors: any[];
  metrics: {
    totalDoctors: number;
    pendingUpgrades?: number;
    demoDoctors?: number;
    activeDoctors?: number;
    totalClinics: number;
    totalPrescriptions: number;
    totalPatients: number;
  };
}) {
  const [doctors, setDoctors] = useState<any[]>(initialDoctors);
  const [activeTab, setActiveTab] = useState<"PENDING_UPGRADES" | "ALL_DOCTORS">("PENDING_UPGRADES");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [paymentRefs, setPaymentRefs] = useState<Record<string, string>>({});
  const [rejectModalData, setRejectModalData] = useState<{ doctorId: string; doctorName: string } | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filter for Pending Upgrades / Registrations tab
  const pendingUpgrades = doctors.filter(
    (doc) =>
      doc.role !== "SUPER_ADMIN" &&
      (doc.accountStatus === "pending_approval" || doc.status === "PENDING" || !doc.active)
  );

  // Filter for All Doctors tab
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.clinicName && doc.clinicName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (doc.registrationNumber && doc.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" ||
      doc.accountStatus === statusFilter ||
      (statusFilter === "demo" && (!doc.accountStatus || doc.accountStatus === "demo"));

    return matchesSearch && matchesStatus;
  });

  const handleApproveUpgrade = async (doctorId: string, doctorName: string) => {
    const pRef = (paymentRefs[doctorId] || "").trim() || "Approved by Super Admin";

    setLoadingId(doctorId);
    setMessage(null);
    try {
      const res = await approveDoctorUpgrade(doctorId, pRef);
      if (res.success) {
        setDoctors((prev) =>
          prev.map((d) =>
            d.id === doctorId
              ? { ...d, accountStatus: "active", status: "APPROVED", active: true, paymentReference: pRef }
              : d
          )
        );
        setMessage({
          type: "success",
          text: `ڈاکٹر ${doctorName} کا اکاؤنٹ کامیابی سے منظور اور فعال (Activated) کر دیا گیا ہے۔`,
        });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "اپروول میں خرابی پیش آئی۔" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalData) return;

    if (!rejectionReasonInput.trim()) {
      alert("براہ کرم مسترد کرنے کی وجہ درج کریں۔");
      return;
    }

    setLoadingId(rejectModalData.doctorId);
    setMessage(null);
    try {
      const res = await rejectDoctorUpgrade(rejectModalData.doctorId, rejectionReasonInput.trim());
      if (res.success) {
        setDoctors((prev) =>
          prev.map((d) =>
            d.id === rejectModalData.doctorId
              ? { ...d, accountStatus: "rejected", rejectionReason: rejectionReasonInput.trim() }
              : d
          )
        );
        setMessage({
          type: "success",
          text: `ڈاکٹر ${rejectModalData.doctorName} کی درخواست مسترد کر دی گئی۔`,
        });
        setRejectModalData(null);
        setRejectionReasonInput("");
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "مسترد کرنے میں خرابی۔" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleSuspend = async (doctorId: string, doctorName: string) => {
    if (!confirm(`کیا آپ واقعی ${doctorName} کا اکاؤنٹ معطل (Suspend) کرنا چاہتے ہیں؟`)) return;

    setLoadingId(doctorId);
    setMessage(null);
    try {
      await suspendDoctorAccount(doctorId, "Admin Action");
      setDoctors((prev) =>
        prev.map((d) => (d.id === doctorId ? { ...d, accountStatus: "suspended", active: false } : d))
      );
      setMessage({ type: "success", text: `${doctorName} کا اکاؤنٹ معطل کر دیا گیا۔` });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "معطلی میں خرابی۔" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (doctorId: string, doctorName: string) => {
    if (!confirm(`کیا آپ واقعی "${doctorName}" اور اس کے تمام کلینک ڈیٹا کو مستقل ڈیلیٹ کرنا چاہتے ہیں؟`)) return;

    setLoadingId(doctorId);
    setMessage(null);
    try {
      await deleteDoctorAccount(doctorId);
      setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
      setMessage({ type: "success", text: `اکاؤنٹ "${doctorName}" ڈیلیٹ ہو گیا۔` });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "ڈیلیٹ میں خرابی۔" });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Crown className="h-6 w-6 text-amber-500 shrink-0" />
            Super Admin Control Center (<span className="urdu-text text-base">سپر ایڈمن پورٹل</span>)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Doctor Demo Approvals, Payment Verification & Multi-Tenant Access Gates
          </p>
        </div>

        <Badge variant="warning" className="px-3 py-1.5 text-xs font-bold shadow-xs self-start sm:self-auto">
          👑 Super Administrator
        </Badge>
      </div>

      {/* Alert Notifications */}
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 border shadow-xs animate-in fade-in duration-200 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
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

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Pending Upgrades */}
        <div
          onClick={() => setActiveTab("PENDING_UPGRADES")}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
            activeTab === "PENDING_UPGRADES"
              ? "bg-amber-50 border-amber-300 ring-2 ring-amber-400/40"
              : "bg-amber-50/40 border-amber-200 hover:bg-amber-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Pending Upgrades</span>
            <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
          </div>
          <strong className="text-2xl font-black text-amber-900 mt-1 block">
            {pendingUpgrades.length}
          </strong>
          <span className="text-[10px] text-amber-700 block mt-0.5">منظوری کے منتظر کلینکس</span>
        </div>

        {/* Active Full Accounts */}
        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Active Paid</span>
          <strong className="text-2xl font-black text-emerald-900 mt-1 block">
            {doctors.filter((d) => d.accountStatus === "active").length}
          </strong>
          <span className="text-[10px] text-emerald-700 block mt-0.5">مکمل فعال اکاؤنٹس</span>
        </div>

        {/* Demo Trial Users */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Demo Accounts</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">
            {doctors.filter((d) => d.accountStatus === "demo" || !d.accountStatus).length}
          </strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">ٹرائل ڈاکٹرز (5 Rx/day)</span>
        </div>

        {/* Total Clinics */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Clinics</span>
          <strong className="text-2xl font-black text-slate-900 mt-1 block">
            {metrics.totalClinics}
          </strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">رجسٹرڈ ہومیوپیتھک کلینکس</span>
        </div>

        {/* Prescriptions Issued */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Prescriptions</span>
          <strong className="text-2xl font-black text-emerald-700 mt-1 block">
            {metrics.totalPrescriptions}
          </strong>
          <span className="text-[10px] text-slate-500 block mt-0.5">کل جاری کردہ نسخہ جات</span>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("PENDING_UPGRADES")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
            activeTab === "PENDING_UPGRADES"
              ? "bg-amber-500 text-slate-950 shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Pending Upgrade Requests ({pendingUpgrades.length})</span>
          {pendingUpgrades.length > 0 && (
            <span className="px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-black">
              {pendingUpgrades.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ALL_DOCTORS")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
            activeTab === "ALL_DOCTORS"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>All Registered Doctors ({doctors.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: PENDING UPGRADES & PAYMENT GATE ================= */}
      {activeTab === "PENDING_UPGRADES" && (
        <Card className="border-slate-200 shadow-xs overflow-hidden">
          <CardHeader className="py-3.5 px-4 sm:px-5 border-b border-slate-100 bg-amber-50/50">
            <CardTitle className="text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Pending Demo-to-Paid Upgrade Requests ({pendingUpgrades.length})
            </CardTitle>
            <CardDescription className="text-xs text-amber-800/80">
              Verify payment transaction ID and approve account to unlock unlimited prescriptions, clean A4 print, and live QR verification.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-3 sm:p-4 space-y-3">
            {pendingUpgrades.map((doc) => {
              const isLoading = loadingId === doc.id;
              const currentPRef = paymentRefs[doc.id] !== undefined ? paymentRefs[doc.id] : doc.paymentReference || "";

              return (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-amber-200/80 bg-white hover:border-amber-300 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center shrink-0">
                        {doc.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="text-sm font-bold text-slate-900 block">{doc.name}</strong>
                        <p className="text-xs text-slate-500">
                          {doc.clinicName} • {doc.qualification || "Homeopathic Physician"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                        Pending Approval
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {doc.upgradeRequestedAt ? formatDate(doc.upgradeRequestedAt) : "Just now"}
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Email & Phone</span>
                      <p className="font-medium truncate">{doc.email}</p>
                      <p className="text-slate-500">{doc.phone || "No phone"}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Activity Record</span>
                      <p className="font-medium">{doc.totalPatients} Patients Registered</p>
                      <p className="text-slate-500">{doc.totalPrescriptions} Prescriptions Issued</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Submitted Payment Ref</span>
                      <p className="font-mono font-bold text-emerald-700 truncate">
                        {doc.paymentReference || "Entered manually below"}
                      </p>
                    </div>
                  </div>

                  {/* Payment Reference Input & Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                    <div className="flex-1 flex items-center gap-2 max-w-md">
                      <CreditCard className="h-4 w-4 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        value={currentPRef}
                        onChange={(e) => setPaymentRefs({ ...paymentRefs, [doc.id]: e.target.value })}
                        placeholder="Enter confirmed Txn ID / Bank Reference..."
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => handleApproveUpgrade(doc.id, doc.name)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold min-h-[38px] px-3.5"
                      >
                        <UserCheck className="h-3.5 w-3.5 mr-1" />
                        Approve & Activate (منظور کریں)
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => setRejectModalData({ doctorId: doc.id, doctorName: doc.name })}
                        className="text-rose-700 hover:bg-rose-50 border-rose-200 text-xs font-bold min-h-[38px]"
                      >
                        <UserX className="h-3.5 w-3.5 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {pendingUpgrades.length === 0 && (
              <div className="py-12 text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">کوئی درخواست زیر التواء نہیں ہے</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  تمام ڈاکٹرز کے اکاؤنٹس تصدیق شدہ ہیں یا کوئی نئی اپ گریڈ درخواست موصول نہیں ہوئی۔
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ================= TAB 2: ALL DOCTORS & CLINIC DIRECTORY ================= */}
      {activeTab === "ALL_DOCTORS" && (
        <Card className="border-slate-200 shadow-xs overflow-hidden">
          <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-600" />
                Registered Doctors & Clinics ({filteredDoctors.length})
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Full platform directory and subscription lifecycle control
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
                  placeholder="Search doctor, email, clinic..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500 w-44 shadow-2xs"
                />
              </div>

              {/* Status Filter */}
              <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
                {[
                  { key: "ALL", label: "All" },
                  { key: "active", label: "Active" },
                  { key: "demo", label: "Demo" },
                  { key: "pending_approval", label: "Pending" },
                  { key: "suspended", label: "Suspended" },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setStatusFilter(st.key)}
                    className={`px-2 py-1 rounded-md font-semibold text-[11px] transition-colors ${
                      statusFilter === st.key
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Doctor & Credentials</th>
                    <th className="py-2.5 px-3">Clinic</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Plan Status</th>
                    <th className="py-2.5 px-3">Activity</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredDoctors.map((doc) => {
                    const isLoading = loadingId === doc.id;
                    const isSuperAdmin = doc.role === "SUPER_ADMIN";

                    return (
                      <tr key={doc.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSuperAdmin ? "bg-amber-500 text-white" : "bg-emerald-600 text-white"
                              }`}
                            >
                              {doc.name.charAt(0)}
                            </div>
                            <div>
                              <strong className="font-bold text-slate-900 block text-xs">{doc.name}</strong>
                              <span className="text-[11px] text-slate-500 block">
                                {doc.qualification || "Homeopathic Physician"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-900 block truncate max-w-[140px]">
                            {doc.clinicName}
                          </span>
                        </td>

                        <td className="py-3 px-3 space-y-0.5">
                          <p className="text-[11px] text-slate-700 truncate max-w-[130px]">{doc.email}</p>
                          {doc.phone && <p className="text-[10px] text-slate-400">{doc.phone}</p>}
                        </td>

                        <td className="py-3 px-3">
                          {isSuperAdmin ? (
                            <Badge variant="warning" className="text-[10px]">Super Admin</Badge>
                          ) : doc.accountStatus === "active" ? (
                            <Badge variant="success" className="text-[10px]">Active Full Plan</Badge>
                          ) : doc.accountStatus === "pending_approval" ? (
                            <Badge variant="warning" className="text-[10px]">Pending Approval</Badge>
                          ) : doc.accountStatus === "rejected" ? (
                            <Badge variant="danger" className="text-[10px]">Rejected</Badge>
                          ) : doc.accountStatus === "suspended" ? (
                            <Badge variant="secondary" className="text-[10px]">Suspended</Badge>
                          ) : (
                            <Badge variant="warning" className="text-[10px]">
                              Demo Trial
                            </Badge>
                          )}
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap text-[11px] text-slate-600">
                          <span>{doc.totalPatients} Patients</span>
                          <span className="block text-slate-400">{doc.totalPrescriptions} Rx</span>
                        </td>

                        <td className="py-3 px-3 text-right">
                          {isSuperAdmin ? (
                            <span className="text-[11px] text-slate-400 italic">Primary Admin</span>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              {doc.accountStatus === "suspended" ? (
                                <Button
                                  variant="primary"
                                  size="sm"
                                  disabled={isLoading}
                                  onClick={() => handleApproveUpgrade(doc.id, doc.name)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] py-1 px-2 font-bold"
                                >
                                  Reinstate
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  disabled={isLoading}
                                  onClick={() => handleSuspend(doc.id, doc.name)}
                                  className="text-amber-700 hover:bg-amber-50 text-[11px] py-1 px-2"
                                >
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
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Card List View */}
            <div className="md:hidden divide-y divide-slate-100 p-3 space-y-3">
              {filteredDoctors.map((doc) => {
                const isSuperAdmin = doc.role === "SUPER_ADMIN";

                return (
                  <div key={doc.id} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-slate-900">{doc.name}</strong>
                      {isSuperAdmin ? (
                        <Badge variant="warning" className="text-[9px]">Super Admin</Badge>
                      ) : doc.accountStatus === "active" ? (
                        <Badge variant="success" className="text-[9px]">Active Plan</Badge>
                      ) : (
                        <Badge variant="warning" className="text-[9px]">
                          {doc.accountStatus || "Demo"}
                        </Badge>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-0.5">
                      <p><strong>Clinic: </strong>{doc.clinicName}</p>
                      <p><strong>Email: </strong>{doc.email}</p>
                      <p><strong>Activity: </strong>{doc.totalPatients} Patients • {doc.totalPrescriptions} Prescriptions</p>
                    </div>

                    {!isSuperAdmin && (
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspend(doc.id, doc.name)}
                          className="text-[11px] py-1 px-2.5 text-amber-700 min-h-[38px]"
                        >
                          Suspend
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(doc.id, doc.name)}
                          className="text-[11px] py-1 px-2.5 text-rose-700 min-h-[38px]"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rejection Reason Modal */}
      {rejectModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                Reject Upgrade Request
              </h3>
              <button
                type="button"
                onClick={() => setRejectModalData(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRejectUpgrade} className="space-y-3">
              <p className="text-xs text-slate-600">
                براہ کرم ڈاکٹر <strong>{rejectModalData.doctorName}</strong> کی درخواست مسترد کرنے کی وجہ درج فرمائیں تاکہ ڈاکٹر کو رہنمائی مل سکے۔
              </p>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Rejection Reason (<span className="urdu-text text-[11px]">مسترد کرنے کی وجہ</span>) *
                </label>
                <textarea
                  rows={3}
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  placeholder="e.g. Transaction ID was invalid or payment not received in bank account."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setRejectModalData(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="danger" size="sm" className="font-bold">
                  Confirm Rejection (مسترد کریں)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
