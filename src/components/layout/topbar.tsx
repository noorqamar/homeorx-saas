"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Plus, UserPlus, FileText, Sparkles, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutDoctor } from "@/app/actions/auth";

export function Topbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-10 no-print">
      {/* Global Patient Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Fast Search Patients (Name, ID, Phone, City)..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all focus:outline-none"
          />
        </div>
      </form>

      {/* Right Quick Actions */}
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Active Clinic Workspace</span>
        </div>

        <Link href="/patients/new">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            <UserPlus className="h-4 w-4 mr-1.5 text-slate-500" />
            <span>New Patient</span>
          </Button>
        </Link>

        <Link href="/prescriptions/new">
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            <span>+ New Rx (نیا نسخہ)</span>
          </Button>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          title="Sign Out"
          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
