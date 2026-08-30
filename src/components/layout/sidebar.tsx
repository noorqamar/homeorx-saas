"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutDoctor } from "@/app/actions/auth";

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

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out of HomeoRx?")) {
      await logoutDoctor();
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-64 border-r border-slate-200 bg-white text-slate-800 shrink-0 h-screen sticky top-0 no-print",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-100 bg-slate-50/50">
        <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
            Homeo<span className="text-emerald-600">Rx</span>
          </span>
          <p className="text-[10px] uppercase font-semibold text-slate-600 tracking-wider">
            SaaS Prescription Suite
          </p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-600">
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
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-semibold shadow-xs"
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

      {/* Doctor Card & Server Logout Button */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/80 space-y-2">
        <Link
          href="/clinic"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-slate-200"
        >
          <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-emerald-200">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">
              Doctor Workspace
            </p>
            <p className="text-[11px] text-slate-600 truncate">
              View Clinic Profile
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 hover:text-rose-800 transition-colors border border-rose-200/60"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Log Out (لاگ آؤٹ)</span>
        </button>
      </div>
    </aside>
  );
}
