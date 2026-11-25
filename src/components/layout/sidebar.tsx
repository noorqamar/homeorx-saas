"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  CalendarDays,
  FileText,
  PlusCircle,
  Database,
  BookOpen,
  CreditCard,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  X,
  AlertCircle,
  Crown,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutDoctor, getCurrentDoctor } from "@/app/actions/auth";
import { signOutFirebaseUser } from "@/lib/firebase";
import { UpgradeModal } from "@/components/upgrade-modal";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { name: "Public Website", href: "/", icon: Sparkles },
  { name: "Appointment", href: "/patients", icon: CalendarDays },
  { name: "Appointment Page", href: "/prescriptions", icon: FileText },
  { name: "New Prescription", href: "/prescriptions/new", icon: PlusCircle, highlight: true },
  { name: "Medicine Database", href: "/medicines", icon: Database },
  { name: "Repertory", href: "/repertory", icon: BookOpen },
  { name: "Payment", href: "/clinic", icon: CreditCard },
  { name: "Profile", href: "/clinic", icon: User },
  { name: "Super Admin Portal", href: "/admin", icon: ShieldCheck, adminOnly: true },
  { name: "Settings", href: "/settings", icon: Settings },
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
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={cn(
          "bg-white text-slate-700 select-none no-print border-r border-[#E6ECF5] transition-transform duration-300 ease-in-out flex flex-col shrink-0",
          // Mobile: Off-canvas fixed drawer
          "fixed inset-y-0 left-0 z-50 w-[270px] h-full shadow-2xl",
          // Desktop: Permanent static sidebar
          "md:static md:inset-auto md:z-auto md:w-[260px] md:h-screen md:sticky md:top-0 md:shadow-[2px_0_12px_rgba(30,80,222,0.03)]",
          // Open/Close toggle state on mobile, always visible on desktop
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-[#F0F4FA] shrink-0">
          <Link href="/" className="flex items-center gap-3 min-w-0 group">
            <div className="h-10 w-10 rounded-2xl bg-[#1E50DE] flex items-center justify-center text-white shadow-md shadow-blue-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xl tracking-tight text-[#2B3674] flex items-center">
                Homeo<span className="text-[#1E50DE]">Rx</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                Clinical Suite
              </p>
            </div>
          </Link>

          {/* Close drawer button on mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Account Status Badge / Upgrade Banner */}
        <div className="px-4 pt-3">
          {isSuperAdmin ? (
            <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center gap-2 text-xs font-bold shadow-xs">
              <Crown className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="truncate">Super Admin Authority</span>
            </div>
          ) : accountStatus === "demo" ? (
            <div className="p-3 rounded-2xl bg-[#EEF4FF] border border-blue-100 text-slate-900 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-[#1E50DE] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" />
                  Trial Mode
                </span>
                <span className="text-[10px] text-slate-600 font-bold">5 Rx / Day</span>
              </div>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#1E50DE] hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                <span>Request Upgrade</span>
              </button>
            </div>
          ) : accountStatus === "pending_approval" ? (
            <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-1 text-xs shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                <Clock className="h-3.5 w-3.5 text-indigo-600 animate-spin" />
                <span>Approval Pending</span>
              </div>
            </div>
          ) : accountStatus === "rejected" ? (
            <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs shadow-xs">
              <span className="font-bold text-rose-800">Upgrade Rejected</span>
            </div>
          ) : (
            <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2 text-xs font-bold shadow-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="truncate">Active Clinic Plan</span>
            </div>
          )}
        </div>

        {/* Navigation List matching Behance Clean Layout */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 scrollbar-thin">
          {navigationItems
            .filter((item) => !item.adminOnly || isSuperAdmin)
            .map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13.5px] font-semibold transition-all group min-h-[44px]",
                    isActive
                      ? "bg-[#EEF4FF] text-[#1E50DE] font-bold shadow-xs"
                      : "text-slate-500 hover:text-[#2B3674] hover:bg-slate-50",
                    item.highlight && !isActive && "text-[#1E50DE]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 transition-colors shrink-0",
                      isActive
                        ? "text-[#1E50DE]"
                        : "text-slate-400 group-hover:text-[#1E50DE]",
                      item.highlight && !isActive && "text-[#1E50DE]"
                    )}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}

          {/* Logout Action in Menu */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13.5px] font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50/60 transition-all group min-h-[44px]"
          >
            <LogOut className="h-4.5 w-4.5 text-slate-400 group-hover:text-rose-600 transition-colors shrink-0" />
            <span className="truncate">Logout</span>
          </button>
        </nav>

        {/* Doctor Profile Footer Card */}
        <div className="p-4 border-t border-[#F0F4FA] bg-slate-50/70 shrink-0">
          <Link
            href="/clinic"
            onClick={onClose}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-200 min-h-[44px]"
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#1E50DE] to-blue-400 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
              DR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#2B3674] truncate">
                {doctorInfo?.doctorName || "Dr. Homeopath"}
              </p>
              <p className="text-[11px] text-slate-400 truncate font-medium">
                {doctorInfo?.clinicName || "HomeoRx Clinic"}
              </p>
            </div>
          </Link>
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
