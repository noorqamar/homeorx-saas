export type TemplatePresetId = "sage" | "clinical" | "floral" | "minimal";

export interface TemplatePresetConfig {
  id: TemplatePresetId;
  name: string;
  subtitle: string;
  tag: string;
  colors: {
    primary: string; // e.g. text-emerald-800
    primaryBg: string; // e.g. bg-emerald-600
    headerBorder: string; // e.g. border-emerald-800
    badgeBg: string; // e.g. bg-emerald-50
    badgeText: string; // e.g. text-emerald-800
    badgeBorder: string; // e.g. border-emerald-200
    cardBg: string; // e.g. bg-slate-50
    cardBorder: string; // e.g. border-slate-200
    tableHeaderBg: string; // e.g. bg-emerald-900 or bg-slate-800
    tableHeaderText: string; // text-white
    rxSymbol: string; // text-emerald-800
    bulletColor: string; // text-emerald-600
    containerBorder: string; // border-emerald-800 or border-slate-200
  };
}

export const TEMPLATE_PRESETS: Record<TemplatePresetId, TemplatePresetConfig> = {
  sage: {
    id: "sage",
    name: "Sage / Nature (قدرتی سبز)",
    subtitle: "Emerald green botanical styling with natural herbal accents",
    tag: "A: Nature & Wellness",
    colors: {
      primary: "text-emerald-900",
      primaryBg: "bg-emerald-700 text-white",
      headerBorder: "border-emerald-700",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-900",
      badgeBorder: "border-emerald-200",
      cardBg: "bg-emerald-50/40",
      cardBorder: "border-emerald-200/80",
      tableHeaderBg: "bg-emerald-800",
      tableHeaderText: "text-emerald-50",
      rxSymbol: "text-emerald-800",
      bulletColor: "text-emerald-600",
      containerBorder: "border-emerald-800/80",
    },
  },
  clinical: {
    id: "clinical",
    name: "Trust / Clinical (طبی نیلا)",
    subtitle: "Deep medical blue & cyan with clinical structural frames",
    tag: "B: Hospital & Diagnostic",
    colors: {
      primary: "text-blue-900",
      primaryBg: "bg-blue-700 text-white",
      headerBorder: "border-blue-700",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-900",
      badgeBorder: "border-blue-200",
      cardBg: "bg-blue-50/40",
      cardBorder: "border-blue-200/80",
      tableHeaderBg: "bg-blue-900",
      tableHeaderText: "text-blue-50",
      rxSymbol: "text-blue-800",
      bulletColor: "text-blue-600",
      containerBorder: "border-blue-800/80",
    },
  },
  floral: {
    id: "floral",
    name: "Floral / Warm (کلاسیکل برگنڈی)",
    subtitle: "Warm rose, maroon & burgundy with heritage clinic elegance",
    tag: "C: Classical Heritage",
    colors: {
      primary: "text-rose-950",
      primaryBg: "bg-rose-900 text-white",
      headerBorder: "border-rose-800",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-950",
      badgeBorder: "border-rose-200",
      cardBg: "bg-rose-50/40",
      cardBorder: "border-rose-200/80",
      tableHeaderBg: "bg-rose-950",
      tableHeaderText: "text-rose-50",
      rxSymbol: "text-rose-900",
      bulletColor: "text-rose-700",
      containerBorder: "border-rose-900/80",
    },
  },
  minimal: {
    id: "minimal",
    name: "Minimal / Monochrome (سادہ بلیک اینڈ وائٹ)",
    subtitle: "Crisp black & white typography, ink-efficient for clinic printers",
    tag: "D: Low-Ink Clean",
    colors: {
      primary: "text-slate-950",
      primaryBg: "bg-slate-900 text-white",
      headerBorder: "border-slate-900",
      badgeBg: "bg-slate-100",
      badgeText: "text-slate-900",
      badgeBorder: "border-slate-300",
      cardBg: "bg-slate-50",
      cardBorder: "border-slate-300",
      tableHeaderBg: "bg-slate-900",
      tableHeaderText: "text-white",
      rxSymbol: "text-slate-950",
      bulletColor: "text-slate-900",
      containerBorder: "border-slate-900",
    },
  },
};
