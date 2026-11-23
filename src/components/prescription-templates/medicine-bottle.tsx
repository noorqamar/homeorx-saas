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
    size === "xs" ? 0.85 : size === "sm" ? 1.0 : size === "lg" ? 1.35 : 1.15;

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
                top: "64.0%",
                width: "80%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.05] block font-sans"
                style={{
                  fontSize: `${(cleanName.length > 15 ? 6.2 : cleanName.length > 10 ? 7.2 : 8.5) * fontScale}px`,
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
                style={{ fontSize: `${8.5 * fontScale}px` }}
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
                top: "64.5%",
                left: "69.0%",
                width: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-extrabold text-[#0a0a0a] tracking-tight leading-[1.05] block font-sans"
                style={{
                  fontSize: `${(cleanName.length > 15 ? 5.8 : cleanName.length > 10 ? 6.8 : 8.0) * fontScale}px`,
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
                style={{ fontSize: `${8.0 * fontScale}px` }}
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
                top: "61.5%",
                width: "74%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-black text-[#0f172a] tracking-tight leading-[1.05] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 15 ? 5.8 : cleanName.length > 10 ? 6.8 : 8.2) * fontScale}px`,
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
                style={{ fontSize: `${8.5 * fontScale}px` }}
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
                top: "67.5%",
                width: "78%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-black text-[#0f172a] tracking-tight leading-[1.05] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 15 ? 5.8 : cleanName.length > 10 ? 6.8 : 8.2) * fontScale}px`,
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
                style={{ fontSize: `${8.5 * fontScale}px` }}
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
                top: "68.0%",
                width: "72%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span
                className="font-black text-[#0f172a] tracking-tight leading-[1.05] block font-sans uppercase"
                style={{
                  fontSize: `${(cleanName.length > 15 ? 5.8 : cleanName.length > 10 ? 6.8 : 8.2) * fontScale}px`,
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
                style={{ fontSize: `${8.5 * fontScale}px` }}
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
