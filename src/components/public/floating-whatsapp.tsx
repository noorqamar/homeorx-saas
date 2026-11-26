"use client";

import { MessageCircle } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip on desktop */}
      <span className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full bg-forest-900/95 text-white text-xs font-medium shadow-lg backdrop-blur-xs border border-forest-700/60 transition-all duration-300 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none">
        Chat with Dr. Noor ul Qamar
      </span>

      {/* Floating Button */}
      <a
        href={CLINIC_INFO.whatsappDefaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Noor ul Qamar on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 min-w-[48px] min-h-[48px] rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-hidden focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping -z-10" />

        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-300 border-2 border-white rounded-full" />
      </a>
    </aside>
  );
}
