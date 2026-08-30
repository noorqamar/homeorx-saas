import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generatePrescriptionNumber(sequenceNumber: number, year?: number): string {
  const currentYear = year || new Date().getFullYear();
  const padded = String(sequenceNumber).padStart(6, "0");
  return `RX-${currentYear}-${padded}`;
}

export function generatePatientNumber(sequenceNumber: number, year?: number): string {
  const currentYear = year || new Date().getFullYear();
  const padded = String(sequenceNumber).padStart(4, "0");
  return `PAT-${currentYear}-${padded}`;
}
