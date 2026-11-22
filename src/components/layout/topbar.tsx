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
  Clock,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutDoctor, getCurrentDoctor } from "@/app/actions/auth";
import { signOutFirebaseUser } from "@/lib/firebase";
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
      await signOutFirebaseUser();
      await logoutDoctor();
      router.push("/login");
      router.refresh();
    }
  };

  const accountStatus = doctorInfo?.accountStatus || "demo";
  const isSuperAdmin = doctorInfo?.role === "SUPER_ADMIN";

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <header className="h-20 border-b border-[#E6ECF5] bg-white/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 no-print gap-3">
        {/* Left: Mobile Hamburger Toggle + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          {/* Global Patient Search Bar */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Patients (Name, ID, Phone)..."
                className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-[#F4F7FC] border border-transparent hover:border-slate-200 focus:border-[#1E50DE] focus:bg-white rounded-2xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </form>
        </div>

        {/* Right Area: Date + Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Calendar Date Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F4F7FC] text-slate-600 text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5 text-[#1E50DE]" />
            <span>{todayFormatted}</span>
          </div>

          {/* Status Badge */}
          {isSuperAdmin ? (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              <span>Super Admin</span>
            </div>
          ) : accountStatus === "demo" ? (
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-900 hover:bg-amber-100 text-xs font-bold border border-amber-200/80 transition-all shadow-xs"
            >
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              <span>Demo Trial</span>
              <span className="text-[10px] text-white bg-amber-600 px-1.5 py-0.5 rounded-lg font-black ml-0.5">
                Upgrade
              </span>
            </button>
          ) : null}

          <Link href="/patients/new" className="hidden sm:inline-block">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-3.5 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs shadow-xs"
            >
              <UserPlus className="h-4 w-4 mr-1.5 text-slate-500" />
              <span>+ New Patient</span>
            </Button>
          </Link>

          <Link href="/prescriptions/new">
            <Button
              size="sm"
              className="h-10 px-4 rounded-2xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">+ New Prescription</span>
              <span className="sm:hidden">Rx</span>
            </Button>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-2.5 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
