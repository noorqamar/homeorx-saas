"use client";

import React, { useState } from "react";

interface MedicineBottleProps {
  medicineName: string;
  potency: string;
  variant?: "reckeweg" | "schwabe";
  className?: string;
}

export function MedicineBottle({
  medicineName,
  potency,
  variant = "reckeweg",
  className = "",
}: MedicineBottleProps) {
  const [activeVariant, setActiveVariant] = useState<"reckeweg" | "schwabe">(variant);

  // Clean remedy name for label
  const cleanName = (medicineName || "REMEDY").trim();
  const cleanPotency = (potency || "200C").trim();

  // Parse remedy name if it has multiple words
  const words = cleanName.split(/\s+/);
  const isMultiWord = words.length > 1;

  return (
    <div
      className={`relative inline-flex flex-col items-center group cursor-pointer select-none ${className}`}
      title={`Click to switch bottle style: ${activeVariant === "reckeweg" ? "Dr. Reckeweg (Germany)" : "Dr. Willmar Schwabe (Germany)"}`}
      onClick={() => setActiveVariant(activeVariant === "reckeweg" ? "schwabe" : "reckeweg")}
    >
      {/* Bottle Container with Crisp Drop-Shadow */}
      <div className="relative w-16 sm:w-20 h-28 sm:h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {activeVariant === "reckeweg" ? (
          <>
            <img
              src="/images/homeo-bottle-reckeweg-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Homeopathic Medicine Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
            />
            {/* Dynamic Medicine Label Overlay (Centered over Reckeweg authentic label) */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center px-1 pointer-events-none"
              style={{
                top: "67.5%",
                width: "82%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.05] block font-sans"
                style={{
                  fontSize: cleanName.length > 14 ? "6.5px" : cleanName.length > 9 ? "7.5px" : "9px",
                }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block truncate">{words[0]}</span>
                    <span className="block truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  cleanName
                )}
              </span>
              <span
                className="font-black text-[#1e3a8a] tracking-wider leading-none mt-0.5 block font-sans"
                style={{ fontSize: "8px" }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        ) : (
          <>
            <img
              src="/images/homeo-bottle-schwabe-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Homeopathic Medicine Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
            />
            {/* Dynamic Medicine Label Overlay (Aligned over Schwabe label) */}
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none"
              style={{
                top: "66.5%",
                left: "70.5%",
                width: "48%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.05] block font-sans"
                style={{
                  fontSize: cleanName.length > 14 ? "5.5px" : cleanName.length > 9 ? "6.5px" : "8px",
                }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block truncate">{words[0]}</span>
                    <span className="block truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  cleanName
                )}
              </span>
              <span
                className="font-black text-[#b91c1c] tracking-wider leading-none mt-0.5 block font-sans"
                style={{ fontSize: "7px" }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Authenticity Subtext (Hidden in Print) */}
      <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 no-print">
        {activeVariant === "reckeweg" ? "Dr. Reckeweg" : "Dr. Schwabe"}
      </span>
    </div>
  );
}
