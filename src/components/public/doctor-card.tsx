import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";

interface DoctorPortraitProps {
  className?: string;
  showDetails?: boolean;
  priority?: boolean;
  compact?: boolean;
  heroSideBadge?: boolean;
}

export function DoctorPortrait({
  className = "",
  showDetails = true,
  priority = false,
  compact = false,
  heroSideBadge = false,
}: DoctorPortraitProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-forest-800/10 via-gold-500/15 to-sage-400/20 rounded-3xl blur-xl -z-10 pointer-events-none" />

      {/* Floating Verification Badge (Positioned outside portrait to preserve full hair/head space) */}
      <div className="hidden sm:inline-flex absolute -top-3 -right-2 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-forest-950 text-white border border-gold-500/30 text-xs font-semibold text-emerald-300 shadow-xl z-20">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-sans">Verified Homeopath</span>
      </div>

      {/* Floating Credential Card Beside the Image (Homepage Hero: positioned cleanly beside the portrait without overlapping the footer card) */}
      {heroSideBadge && (
        <div className="hidden lg:flex absolute -left-12 xl:-left-16 top-[35%] -translate-y-1/2 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sage-200/90 shadow-2xl items-center gap-3 min-w-[215px]">
          <div className="w-10 h-10 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-5 h-5 text-gold-400" />
          </div>
          <div className="space-y-0.5 leading-tight">
            <span className="block font-heading text-sm text-forest-950 font-normal">
              Dr. Noor ul Qamar
            </span>
            <span className="block font-sans text-xs text-forest-800 font-semibold tracking-wide">
              D.H.M.S, R.H.M.P
            </span>
            <span className="block font-sans text-[11px] text-gold-700 font-bold uppercase tracking-wider">
              10 Years of Experience
            </span>
          </div>
        </div>
      )}

      {/* Main Card Frame */}
      <div className="relative rounded-3xl overflow-hidden bg-white p-2.5 sm:p-3 border border-sage-200/90 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-gold-500/40">
        {/* Real Portrait Image Container (Uncropped, full aspect ratio, preserving head, face, coat, and hands) */}
        <div className="relative rounded-2xl overflow-hidden bg-[#f7f9f5] aspect-[926/1024] w-full">
          <Image
            src="/images/dr-noorul-qamar.jpg"
            alt="Dr. Noor ul Qamar, D.H.M.S, R.H.M.P — Homeopathy Doctor in Lahore"
            width={926}
            height={1024}
            priority={priority}
            className="w-full h-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-[1.01]"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 480px"
          />
        </div>

        {/* Identity Details Box */}
        {showDetails && (
          <div className="mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-forest-950 text-white border border-forest-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-normal text-white tracking-wide">
                  Dr. Noor ul Qamar
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gold-300 font-semibold tracking-wide">
                  D.H.M.S, R.H.M.P
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-forest-900/90 border border-forest-700/60 text-xs font-semibold text-sage-200 shrink-0 self-start sm:self-auto font-sans">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>10 Years of Experience</span>
              </div>
            </div>

            <p className="text-[11px] text-sage-300 mt-2 pt-2 border-t border-forest-800/80 font-sans">
              Consultant Homeopath • Noor Street, LDA Avenue 1, Lahore & Worldwide Online
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
