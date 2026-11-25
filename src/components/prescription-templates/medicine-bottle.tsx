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
  fontScale: number,
  options?: { isSchwabe?: boolean; isUppercase?: boolean }
): TypographyResult {
  const isSchwabe = options?.isSchwabe ?? false;
  const isUppercase = options?.isUppercase ?? false;

  const words = cleanName.trim().split(/\s+/);
  const maxWordLen = Math.max(...words.map((w) => w.length), 0);
  const totalLen = cleanName.length;

  // Comfortable available width inside label with generous breathing margins
  const availableWidth = isSchwabe ? 26 : 30;
  const charFactor = isUppercase ? 0.65 : 0.52;

  // Precise sizing calculation
  let ideal = availableWidth / (Math.max(maxWordLen, 1) * charFactor);

  if (totalLen > 20) {
    ideal = Math.min(ideal, (availableWidth * 1.6) / (totalLen * charFactor));
  }

  // Refined upper bound so labels don't get crowded and have an authentic pharmaceutical feel
  const maxFont = 5.8;
  const minFont = 3.3;
  const nameSize = Math.max(minFont, Math.min(maxFont, ideal)) * fontScale;

  // Balanced potency font size
  const potBase = isSchwabe ? 5.6 : 5.4;
  const potencySize = Math.max(4.2, potBase * fontScale);

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
}: MedicineBottleProps) {
  const initialVariant = variant || getDefaultBottleVariant(potency, form, index);
  const [activeVariant, setActiveVariant] = useState<BottleVariant>(initialVariant);

  // Clean remedy name for label
  const cleanName = (medicineName || "REMEDY").trim();
  const cleanPotency = (potency || "200C").trim();

  // Parse remedy name if it has multiple words
  const words = cleanName.split(/\s+/);
  const isMultiWord = words.length > 1;

  // Pixel-accurate sizes to ensure high readability and authentic look
  const sizeClasses =
    size === "xs"
      ? "w-[44px] sm:w-[48px] h-[68px] sm:h-[76px]"
      : size === "sm"
      ? "w-[52px] sm:w-[58px] h-[80px] sm:h-[90px]"
      : size === "lg"
      ? "w-[76px] sm:w-[84px] h-[118px] sm:h-[130px]"
      : "w-[60px] sm:w-[68px] h-[94px] sm:h-[106px]";

  const fontScale =
    size === "xs" ? 0.8 : size === "sm" ? 0.9 : size === "lg" ? 1.2 : 1.0;

  // Compute typography for active bottle variant
  const isSchwabe = activeVariant === "schwabe";
  const isUppercase = activeVariant.startsWith("masood");
  const typo = getLabelTypography(cleanName, fontScale, { isSchwabe, isUppercase });

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
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "68.5%",
                left: "50%",
                width: "64%",
                maxWidth: "64%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-extrabold text-[#0a0a0a] tracking-tight leading-[1.05] font-sans"
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
                className="font-black text-[#1e3a8a] tracking-wider leading-none mt-0.5 block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
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
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "66.5%",
                left: "70.0%",
                width: "48%",
                maxWidth: "48%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-black tracking-tight leading-[1.05] font-sans"
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
                className="font-black text-[#b91c1c] tracking-wider leading-none mt-0.5 block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
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
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "65.5%",
                left: "50%",
                width: "64%",
                maxWidth: "64%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-[#0f172a] tracking-tight leading-[1.05] font-sans uppercase"
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
                className="font-black text-[#0f766e] tracking-wider leading-none mt-0.5 block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
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
              className="absolute flex flex-col items-center justify-center text-center px-0.5 pointer-events-none overflow-hidden select-none"
              style={{
                top: "70.0%",
                left: "50%",
                width: "66%",
                maxWidth: "66%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-[#0f172a] tracking-tight leading-[1.05] font-sans uppercase"
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
                className="font-black text-[#15803d] tracking-wider leading-none mt-0.5 block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
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
                className="w-full max-w-full overflow-hidden flex flex-col items-center justify-center font-black text-[#0f172a] tracking-tight leading-[1.05] font-sans uppercase"
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
                className="font-black text-[#b45309] tracking-wider leading-none mt-0.5 block font-sans truncate max-w-full w-full"
                style={{ fontSize: `${typo.potencySize}px` }}
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
