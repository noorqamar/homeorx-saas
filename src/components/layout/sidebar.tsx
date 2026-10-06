"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  PlusCircle,
  Database,
  BookOpen,
  Building2,
  Sliders,
  HeartPulse,
  LogOut,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  X,
  AlertCircle,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutDoctor, getCurrentDoctor } from "@/app/actions/auth";
import { signOutFirebaseUser } from "@/lib/firebase";
import { UpgradeModal } from "@/components/upgrade-modal";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "New Patient", href: "/patients/new", icon: UserPlus },
  { name: "Prescriptions", href: "/prescriptions", icon: FileText },
  { name: "New Prescription", href: "/prescriptions/new", icon: PlusCircle, highlight: true },
  { name: "Medicine Database", href: "/medicines", icon: Database },
  { name: "Repertory", href: "/repertory", icon: BookOpen },
  { name: "Super Admin Portal", href: "/admin", icon: ShieldCheck, highlight: true },
  { name: "Clinic Profile", href: "/clinic", icon: Building2 },
  { name: "Settings", href: "/settings", icon: Sliders },
];

export function Sidebar({
  className,
  isOpen,
  onClose,
}: {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    async function loadDoctor() {
      try {
        const doc = await getCurrentDoctor();
        if (doc) setDoctorInfo(doc);
      } catch (err) {
        console.error("Failed to load doctor in sidebar:", err);
      }
    }
    loadDoctor();
  }, [pathname]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out of HomeoRx?")) {
      await signOutFirebaseUser();
      await logoutDoctor();
      router.push("/login");
      router.refresh();
    }
  };

  const accountStatus = doctorInfo?.accountStatus || "demo";
  const isSuperAdmin = doctorInfo?.role === "SUPER_ADMIN";

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={cn(
          "flex flex-col w-64 border-r border-slate-200 bg-white text-slate-800 shrink-0 h-screen sticky top-0 z-40 transition-transform duration-300 no-print",
          // Mobile responsive drawer positioning
          "max-md:fixed max-md:left-0 max-md:top-0 max-md:bottom-0 max-md:z-50 max-md:shadow-2xl",
          !isOpen && "max-md:-translate-x-full",
          className
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs ring-2 ring-emerald-500/20 shrink-0">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
                Homeo<span className="text-emerald-600">Rx</span>
              </span>
              <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider truncate">
                SaaS Prescription Suite
              </p>
            </div>
          </div>

          {/* Close drawer button on mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Account Status Badge / Upgrade Banner */}
        <div className="px-3 pt-3">
          {isSuperAdmin ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-xs font-bold shadow-xs">
              <Crown className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Super Administrator</span>
            </div>
          ) : accountStatus === "demo" ? (
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-amber-950 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" />
                  Demo Trial
                </span>
                <span className="text-[10px] text-amber-800 font-bold">5 Rx / Day</span>
              </div>
              <p className="text-[11px] text-amber-900 leading-snug">
                واٹر مارک ہٹانے اور لامحدود نسخوں کے لیے فل اکاؤنٹ حاصل کریں۔
              </p>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-xs transition-all"
              >
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                <span>Request Upgrade</span>
              </button>
            </div>
          ) : accountStatus === "pending_approval" ? (
            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-1 text-xs shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                <Clock className="h-3.5 w-3.5 text-indigo-600 animate-spin" />
                <span>Approval Pending</span>
              </div>
              <p className="text-[11px] text-indigo-800/80 leading-snug urdu-text">
                آپ کی اپ گریڈ درخواست ایڈمن کے پاس تصدیق کے عمل میں ہے۔
              </p>
            </div>
          ) : accountStatus === "rejected" ? (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1.5 text-xs shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
                <span>Upgrade Rejected</span>
              </div>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="text-[11px] font-bold text-rose-700 hover:underline block"
              >
                تفصیل دیکھیں اور دوبارہ اپلائی کریں →
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Full Active Clinic Plan</span>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Menu
          </div>
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group min-h-[44px]",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  item.highlight && !isActive && "text-emerald-600 font-semibold"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors shrink-0",
                    isActive
                      ? "text-emerald-600"
                      : "text-slate-400 group-hover:text-slate-600",
                    item.highlight && !isActive && "text-emerald-600"
                  )}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Doctor Card & Logout Button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/80 space-y-2 shrink-0">
          <Link
            href="/clinic"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 min-h-[44px]"
          >
            <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-emerald-200">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {doctorInfo?.doctorName || "Doctor Workspace"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {doctorInfo?.clinicName || "View Clinic Profile"}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 hover:text-rose-800 transition-colors border border-rose-200/60 min-h-[40px]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out (لاگ آؤٹ)</span>
          </button>
        </div>
      </aside>

      {/* Upgrade Request Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentStatus={accountStatus}
        rejectionReason={doctorInfo?.rejectionReason}
        onSuccess={async () => {
          const doc = await getCurrentDoctor();
          if (doc) setDoctorInfo(doc);
        }}
      />
    </>
  );
}
