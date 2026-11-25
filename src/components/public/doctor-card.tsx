import { ShieldCheck, Award, HeartHandshake, Star } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";

interface DoctorPortraitProps {
  className?: string;
  showDetails?: boolean;
}

export function DoctorPortrait({ className = "", showDetails = true }: DoctorPortraitProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Decorative Warm Halo */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-forest-800/10 via-gold-500/15 to-sage-400/20 rounded-3xl blur-xl -z-10" />

      {/* Main Frame */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] p-1 border border-gold-500/30 shadow-2xl">
        <div className="relative rounded-[22px] overflow-hidden bg-forest-950 bg-gradient-to-b from-forest-800 to-forest-950 aspect-4/5 flex flex-col items-center justify-between p-6 sm:p-8 text-center">
          {/* Top Trust Ribbon */}
          <div className="w-full flex items-center justify-between text-xs text-gold-300">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-900/80 border border-gold-500/30 font-medium">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>10 Years Experience</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-sage-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>R.H.M.P</span>
            </span>
          </div>

          {/* Elegant Doctor Illustration & Emblem Placeholder */}
          <div className="relative my-auto flex flex-col items-center">
            {/* Soft backdrop glow */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-gold-500/20 to-transparent p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-forest-900/90 border-2 border-gold-400/50 flex items-center justify-center shadow-inner overflow-hidden relative">
                {/* Refined Medical Silhouette / Botanical Crest */}
                <svg
                  className="w-24 h-24 sm:w-28 sm:h-28 text-sage-200/90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Doctor Head & Shoulders with Stethoscope */}
                  <circle cx="12" cy="7" r="4" stroke="currentColor" fill="rgba(197, 160, 89, 0.15)" />
                  <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                  <path d="M8 14v2a4 4 0 0 0 8 0v-2" stroke="#d4af37" strokeWidth="1.5" />
                  <circle cx="16" cy="18" r="1.5" fill="#d4af37" />
                </svg>
              </div>
            </div>

            {/* Verification Chip */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/90 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 shadow-lg -mt-3 z-10 backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Homeopath</span>
            </div>
          </div>

          {/* Bottom Identity Card */}
          {showDetails && (
            <div className="w-full bg-forest-900/70 border border-forest-700/60 rounded-2xl p-3.5 backdrop-blur-xs space-y-1">
              <h4 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide">
                {CLINIC_INFO.doctorName}
              </h4>
              <p className="text-xs text-gold-300 font-medium">
                {CLINIC_INFO.qualifications}
              </p>
              <p className="text-[11px] text-sage-300">
                Lahore Clinic & Worldwide Online Consultations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
