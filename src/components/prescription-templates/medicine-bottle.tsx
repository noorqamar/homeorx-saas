"use client";

import React, { useState } from "react";

export type BottleVariant =
  | "reckeweg"
  | "schwabe"
  | "schwabe-tincture"
  | "schwabe-biochemic"
  | "masood-dilution"
  | "masood-tincture"
  | "masood-biochemic";

const ALL_VARIANTS: BottleVariant[] = [
  "schwabe",
  "masood-dilution",
  "schwabe-tincture",
  "masood-tincture",
  "schwabe-biochemic",
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
    if (f.includes("masood") || f.includes("local")) {
      return "masood-tincture";
    }
    return "schwabe-tincture";
  }

  // 2. Biochemic / 6X / 12X / Tablets
  if (
    pot.includes("x") ||
    pot.includes("bio") ||
    f.includes("tab") ||
    f.includes("powder") ||
    f.includes("biochemic")
  ) {
    if (f.includes("masood") || f.includes("local")) {
      return "masood-biochemic";
    }
    return "schwabe-biochemic";
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

  // 5. Alternate aesthetically across imported German and local styles if index is provided
  if (typeof index === "number") {
    const cycle: BottleVariant[] = [
      "schwabe",
      "masood-dilution",
      "schwabe-tincture",
      "masood-tincture",
      "schwabe-biochemic",
      "masood-biochemic",
    ];
    return cycle[index % cycle.length];
  }

  // 6. Standard German Dilutions fallback
  return "schwabe";
}

export function getBrandDisplayName(variant: BottleVariant): string {
  switch (variant) {
    case "reckeweg":
    case "schwabe":
    case "schwabe-tincture":
    case "schwabe-biochemic":
      return "Dr. Schwabe";
    case "masood-tincture":
    case "masood-dilution":
    case "masood-biochemic":
      return "Dr. Masood";
    default:
      return "Dr. Schwabe";
  }
}

interface MedicineBottleProps {
  medicineName: string;
  potency: string;
  variant?: BottleVariant;
  form?: string;
  index?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  showBrand?: boolean;
}

interface TypographyResult {
  nameSize: number;
  potencySize: number;
}

/**
 * Dynamically computes pixel-accurate typography for bottle labels to guarantee
 * that remedy names and potencies fit strictly within the bottle's white label area
 * without horizontal overflow or awkward wrapping.
 */
function getLabelTypography(
  cleanName: string,
  fontScale: number
): TypographyResult {
  const words = cleanName.trim().split(/\s+/);
  const maxWordLen = Math.max(...words.map((w) => w.length), 0);
  const totalLen = cleanName.length;

  // Comfortable available width inside label with generous breathing margins
  const availableWidth = 32;
  const charFactor = 0.52;

  // Precise sizing calculation
  let ideal = availableWidth / (Math.max(maxWordLen, 1) * charFactor);

  if (totalLen > 20) {
    ideal = Math.min(ideal, (availableWidth * 1.6) / (totalLen * charFactor));
  }

  // Refined upper and lower bounds so labels are consistently bold and crisp across all brands
  const maxFont = 5.4;
  const minFont = 3.6;
  const nameSize = Math.max(minFont, Math.min(maxFont, ideal)) * fontScale;

  // Balanced potency font size
  const potBase = 4.8;
  const potencySize = Math.max(3.8, potBase * fontScale);

  return {
    nameSize: Number(nameSize.toFixed(1)),
    potencySize: Number(potencySize.toFixed(1)),
  };
}

export function MedicineBottle({
  medicineName,
  potency,
  variant,
  form,
  index,
  size = "sm",
  className = "",
  showBrand = true,
}: MedicineBottleProps) {
  const initialVariant = variant || getDefaultBottleVariant(potency, form, index);
  const [activeVariant, setActiveVariant] = useState<BottleVariant>(initialVariant);

  // Clean remedy name for label
  const cleanName = (medicineName || "REMEDY").trim();
  const cleanPotency = (potency || "200C").trim();

  // Parse remedy name if it has multiple words
  const words = cleanName.split(/\s+/);
  const isMultiWord = words.length > 1;

  // Compact, proportional sizes to maximize vertical space for multiple prescribed remedies
  const sizeClasses =
    size === "xs"
      ? "w-[30px] sm:w-[34px] h-[48px] sm:h-[54px]"
      : size === "sm"
      ? "w-[36px] sm:w-[40px] h-[56px] sm:h-[62px]"
      : size === "lg"
      ? "w-[54px] sm:w-[60px] h-[84px] sm:h-[92px]"
      : "w-[42px] sm:w-[46px] h-[64px] sm:h-[70px]";

  const fontScale =
    size === "xs" ? 0.70 : size === "sm" ? 0.78 : size === "lg" ? 1.05 : 0.86;

  // Uniform typography across all brands for consistent bold contrast
  const typo = getLabelTypography(cleanName, fontScale);

  const handleNextVariant = () => {
    const curIdx = ALL_VARIANTS.indexOf(activeVariant);
    const nextIdx = (curIdx + 1) % ALL_VARIANTS.length;
    setActiveVariant(ALL_VARIANTS[nextIdx]);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center group cursor-pointer select-none ${className}`}
      title="Click to cycle bottle styles (Schwabe Dilution • Masood Dilution • Schwabe Tincture • Masood Tincture • Schwabe Tablets • Masood Tablets)"
      onClick={handleNextVariant}
    >
      {/* Bottle Container with Crisp Drop-Shadow */}
      <div
        className={`relative ${sizeClasses} flex items-center justify-center transition-transform duration-200 group-hover:scale-105`}
      >
        {/* 1. GERMAN: Dr. Reckeweg Amber Dropper Bottle (Fallback) */}
        {activeVariant === "reckeweg" && (
          <>
            <img
              src="/images/homeo-bottle-reckeweg-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Homeopathic Medicine Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "69.0%",
                left: "50%",
                width: "70%",
                maxWidth: "70%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#1e3a8a] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 2. GERMAN: Dr. Willmar Schwabe 10ml Dilution (Front-Facing) */}
        {activeVariant === "schwabe" && (
          <>
            <img
              src="/images/homeo-bottle-schwabe-dilution-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Dr. Willmar Schwabe Dilution Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "69.0%",
                left: "50%",
                width: "74%",
                maxWidth: "74%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#b91c1c] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 3. GERMAN: Dr. Willmar Schwabe 20ml Mother Tincture (Front-Facing) */}
        {activeVariant === "schwabe-tincture" && (
          <>
            <img
              src="/images/homeo-bottle-schwabe-tincture-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Dr. Willmar Schwabe Mother Tincture Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "63.0%",
                left: "50%",
                width: "72%",
                maxWidth: "72%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#b91c1c] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 4. GERMAN: Dr. Willmar Schwabe 20g Biochemic Tablets (Front-Facing) */}
        {activeVariant === "schwabe-biochemic" && (
          <>
            <img
              src="/images/homeo-bottle-schwabe-biochemic-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Dr. Willmar Schwabe Biochemic Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "67.0%",
                left: "50%",
                width: "74%",
                maxWidth: "74%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#0284c7] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 5. LOCAL: Dr. Masood Mother Tincture 30ml (White Ribbed Cap) */}
        {activeVariant === "masood-tincture" && (
          <>
            <img
              src="/images/homeo-bottle-masood-tincture-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Mother Tincture Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "67.0%",
                left: "50%",
                width: "66%",
                maxWidth: "66%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#0f766e] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 6. LOCAL: Dr. Masood Dilution (Green Cap) */}
        {activeVariant === "masood-dilution" && (
          <>
            <img
              src="/images/homeo-bottle-masood-dilution-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Dilution Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "64.0%",
                left: "50%",
                width: "66%",
                maxWidth: "66%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#15803d] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}

        {/* 7. LOCAL: Dr. Masood Biochemic / Tablets 20gm (Yellow Cap) */}
        {activeVariant === "masood-biochemic" && (
          <>
            <img
              src="/images/homeo-bottle-masood-biochemic-transparent.webp"
              alt={`${cleanName} ${cleanPotency} Masood Biochemic Bottle`}
              className="w-full h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
            />
            <div
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "67.5%",
                left: "50%",
                width: "65%",
                maxWidth: "65%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-slate-950 tracking-tight leading-[0.98] font-sans"
                style={{ fontSize: `${typo.nameSize}px` }}
              >
                {isMultiWord ? (
                  <>
                    <span className="block w-full max-w-full truncate">{words[0]}</span>
                    <span className="block w-full max-w-full truncate">{words.slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="block w-full max-w-full truncate">{cleanName}</span>
                )}
              </div>
              <span
                className="font-black text-[#b45309] tracking-wider leading-none mt-[1px] block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
              >
                {cleanPotency}
              </span>
            </div>
          </>
        )}
      </div>
      {showBrand && (
        <span
          className={`inline-flex items-center justify-center font-bold tracking-tight text-center mt-0.5 px-1 py-[1px] rounded bg-slate-50 border border-slate-200/70 text-slate-600 print:text-slate-900 print:bg-transparent print:border-none font-sans shrink-0 shadow-2xs ${
            size === "xs"
              ? "text-[5.5px] sm:text-[6px] leading-none"
              : size === "sm"
              ? "text-[6px] sm:text-[6.5px] leading-none"
              : size === "lg"
              ? "text-[7.5px] sm:text-[8px] leading-none"
              : "text-[6.5px] sm:text-[7px] leading-none"
          }`}
        >
          {getBrandDisplayName(activeVariant)}
        </span>
      )}
    </div>
  );
}
