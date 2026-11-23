"use client";

import React, { useState } from "react";

export type BottleVariant =
  | "reckeweg"
  | "schwabe"
  | "masood-tincture"
  | "masood-dilution"
  | "masood-biochemic";

const ALL_VARIANTS: BottleVariant[] = [
  "reckeweg",
  "schwabe",
  "masood-tincture",
  "masood-dilution",
  "masood-biochemic",
];

export function getDefaultBottleVariant(
  potency?: string | null,
  form?: string | null,
  index?: number
): BottleVariant {
  const pot = (potency || "").toLowerCase();
  const f = (form || "").toLowerCase();

  // 1. Mother Tincture / Q / MT / Ø
  if (
    pot.includes("q") ||
    pot.includes("ø") ||
    pot.includes("mt") ||
    pot.includes("mother") ||
    f.includes("tincture")
  ) {
    return "masood-tincture";
  }

  // 2. Biochemic / 6X / 12X / Tablets
  if (
    pot.includes("x") ||
    pot.includes("bio") ||
    f.includes("tab") ||
    f.includes("powder") ||
    f.includes("biochemic")
  ) {
    return "masood-biochemic";
  }

  // 3. Masood Green-Cap Dilution
  if (f.includes("masood") || f.includes("local") || f.includes("green")) {
    return "masood-dilution";
  }

  // 4. Explicit German Brand preferences
  if (f.includes("schwabe")) {
    return "schwabe";
  }
  if (f.includes("reckeweg")) {
    return "reckeweg";
  }

  // 5. Alternate aesthetically across all 5 styles if index is provided
  if (typeof index === "number") {
    const cycle: BottleVariant[] = [
      "reckeweg",
      "schwabe",
      "masood-dilution",
      "masood-tincture",
      "masood-biochemic",
    ];
    return cycle[index % cycle.length];
  }

  // 6. Standard German Dilutions fallback
  return "reckeweg";
}

interface MedicineBottleProps {
  medicineName: string;
  potency: string;
  variant?: BottleVariant;
  form?: string;
  index?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export function MedicineBottle({
  medicineName,
  potency,
  variant,
  form,
  index,
  size = "sm",
  className = "",
}: MedicineBottleProps) {
  const initialVariant = variant || getDefaultBottleVariant(potency, form, index);
  const [activeVariant, setActiveVariant] = useState<BottleVariant>(initialVariant);

  // Clean remedy name for label
  const cleanName = (medicineName || "REMEDY").trim();
  const cleanPotency = (potency || "200C").trim();

  // Parse remedy name if it has multiple words
  const words = cleanName.split(/\s+/);
  const isMultiWord = words.length > 1;

  // Ultra-compact pixel-accurate sizes to fit up to 5 medicines on single A4 sheet
  const sizeClasses =
    size === "xs"
      ? "w-[36px] sm:w-[40px] h-[56px] sm:h-[62px]"
      : size === "sm"
      ? "w-[44px] sm:w-[48px] h-[66px] sm:h-[72px]"
      : size === "lg"
      ? "w-[68px] sm:w-[76px] h-[104px] sm:h-[114px]"
      : "w-[50px] sm:w-[56px] h-[78px] sm:h-[86px]";

  const fontScale =
    size === "xs" ? 0.70 : size === "sm" ? 0.85 : size === "lg" ? 1.25 : 1.0;

  const handleNextVariant = () => {
    const curIdx = ALL_VARIANTS.indexOf(activeVariant);
    const nextIdx = (curIdx + 1) % ALL_VARIANTS.length;
    setActiveVariant(ALL_VARIANTS[nextIdx]);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center group cursor-pointer select-none ${className}`}
      title="Click to cycle bottle styles (Reckeweg • Schwabe • Masood Tincture • Masood Dilution • Masood Biochemic)"
      onClick={handleNextVariant}
    >
      {/* Bottle Container with Crisp Drop-Shadow */}
      <div
        className={`relative ${sizeClasses} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
      >
        {/* 1. GERMAN: Dr. Reckeweg Amber Dropper Bottle */}
        {activeVariant === "reckeweg" && (
          <>
            <img
              src="/images/homeo-bottle-reckeweg-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Homeopathic Medicine Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center px-0.5 pointer-events-none"
              style={{
                top: "67.5%",
                width: "82%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.0] block font-sans"
                style={{
                  fontSize: `${(cleanName.length > 14 ? 5.5 : cleanName.length > 9 ? 6.5 : 7.6) * fontScale}px`,
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
                style={{ fontSize: `${7.0 * fontScale}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 2. GERMAN: Dr. Willmar Schwabe Amber Dilution Bottle */}
        {activeVariant === "schwabe" && (
          <>
            <img
              src="/images/homeo-bottle-schwabe-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Homeopathic Medicine Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
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
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.0] block font-sans"
                style={{
                  fontSize: `${(cleanName.length > 14 ? 5.0 : cleanName.length > 9 ? 6.0 : 7.0) * fontScale}px`,
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
                style={{ fontSize: `${6.5 * fontScale}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 3. LOCAL: Dr. Masood Mother Tincture 30ml (White Ribbed Cap) */}
        {activeVariant === "masood-tincture" && (
          <>
            <img
              src="/images/homeo-bottle-masood-tincture-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Mother Tincture Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center px-0.5 pointer-events-none"
              style={{
                top: "63.0%",
                width: "74%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0f172a] tracking-tight leading-[1.0] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 14 ? 5.2 : cleanName.length > 9 ? 6.2 : 7.4) * fontScale}px`,
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
                className="font-black text-[#0f766e] tracking-wider leading-none mt-0.5 block font-sans"
                style={{ fontSize: `${7.0 * fontScale}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 4. LOCAL: Dr. Masood Dilution (Green Cap) */}
        {activeVariant === "masood-dilution" && (
          <>
            <img
              src="/images/homeo-bottle-masood-dilution-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Dilution Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center px-0.5 pointer-events-none"
              style={{
                top: "70.0%",
                width: "78%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0f172a] tracking-tight leading-[1.0] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 14 ? 5.2 : cleanName.length > 9 ? 6.2 : 7.4) * fontScale}px`,
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
                className="font-black text-[#15803d] tracking-wider leading-none mt-0.5 block font-sans"
                style={{ fontSize: `${7.0 * fontScale}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 5. LOCAL: Dr. Masood Biochemic / Tablets 20gm (Yellow Cap) */}
        {activeVariant === "masood-biochemic" && (
          <>
            <img
              src="/images/homeo-bottle-masood-biochemic-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Biochemic Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-center px-0.5 pointer-events-none"
              style={{
                top: "71.0%",
                width: "70%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-black text-[#0f172a] tracking-tight leading-[1.0] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 14 ? 5.2 : cleanName.length > 9 ? 6.2 : 7.5) * fontScale}px`,
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
                className="font-black text-[#b45309] tracking-wider leading-none mt-0.5 block font-sans"
                style={{ fontSize: `${7.0 * fontScale}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}
      </div>
      {/* Note: Bottom brand text has been removed as requested */}
    </div>
  );
}
