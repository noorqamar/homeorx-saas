"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  UserPlus,
  LogOut,
  ShieldCheck,
  Menu,
  Zap,
  Sparkles,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutDoctor, getCurrentDoctor } from "@/app/actions/auth";
import { UpgradeModal } from "@/components/upgrade-modal";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    async function loadDoctor() {
      try {
        const doc = await getCurrentDoctor();
        if (doc) setDoctorInfo(doc);
      } catch (err) {
        console.error("Failed to load doctor in topbar:", err);
      }
    }
    loadDoctor();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/patients?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out of HomeoRx?")) {
      await logoutDoctor();
    }
  };

  const accountStatus = doctorInfo?.accountStatus || "demo";
  const isSuperAdmin = doctorInfo?.role === "SUPER_ADMIN";

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 no-print gap-2">
        {/* Left: Mobile Hamburger Toggle + Search */}
        <div className="flex items-center gap-2 flex-1 max-w-lg">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Global Patient Search Bar */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Patients (Name, ID, Phone)..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all focus:outline-none"
              />
            </div>
          </form>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Status Badge */}
          {isSuperAdmin ? (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              <span>Super Admin Authority</span>
            </div>
          ) : accountStatus === "demo" ? (
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-bold border border-amber-300 transition-all shadow-xs"
            >
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              <span className="hidden sm:inline">Demo Trial (5 Rx/day)</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-black ml-0.5">
                ⚡ Upgrade
              </span>
            </button>
          ) : accountStatus === "pending_approval" ? (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              <Clock className="h-3.5 w-3.5 text-indigo-600 animate-spin" />
              <span className="hidden sm:inline">Approval Pending</span>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Active Clinic</span>
            </div>
          )}

          <Link href="/patients/new" className="hidden sm:inline-block">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-1.5 text-slate-500" />
              <span>New Patient</span>
            </Button>
          </Link>

          <Link href="/prescriptions/new">
            <Button variant="primary" size="sm" className="h-9 px-2.5 sm:px-3 text-xs sm:text-sm font-bold">
              <Plus className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">+ New Rx (نیا نسخہ)</span>
              <span className="sm:hidden">Rx</span>
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

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
