"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { TREATMENTS, TREATMENT_CATEGORIES, TreatmentCategory } from "@/data/treatments";
import { CLINIC_INFO } from "@/data/clinic-info";

const CATEGORY_TABS: ("All" | TreatmentCategory)[] = [
  "All",
  "Women's Health",
  "Skin & Hair",
  "Digestive Health",
  "Respiratory Health",
  "Joint & Pain Care",
  "Men's Health",
  "Child Health",
  "General Wellness",
];

export function TreatmentsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTreatments = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TREATMENTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q) ||
        item.commonConcerns.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Filter Controls Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-sage-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search by condition, symptom (e.g. PCOS, acne, cough, sciatica)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-sage-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-[#fcfbf7]"
            />
            <Search className="w-4 h-4 text-sage-400 absolute left-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-xs text-sage-500 hover:text-forest-900 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results Count Badge */}
          <div className="text-xs text-sage-700 shrink-0 font-medium self-end sm:self-center">
            Showing <strong className="text-forest-950 font-bold">{filteredTreatments.length}</strong> of {TREATMENTS.length} conditions
          </div>
        </div>

        {/* Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-sage-100">
          {CATEGORY_TABS.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  isSelected
                    ? "bg-forest-900 text-white shadow-sm"
                    : "bg-sage-50 text-forest-900/80 hover:bg-sage-100 border border-sage-200/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Treatments Grid */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.slug}
              className="wellness-card p-6 bg-white flex flex-col justify-between group hover:border-gold-400/60 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-forest-800 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100">
                    {treatment.category}
                  </span>
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    aria-label={`View detailed care guide for ${treatment.title}`}
                    className="p-1 rounded-full text-sage-400 group-hover:text-forest-900 group-hover:bg-forest-50 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <h3 className="font-heading text-xl font-bold text-forest-950 group-hover:text-forest-800 transition-colors">
                  <Link href={`/treatments/${treatment.slug}`}>{treatment.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-sage-700 leading-relaxed line-clamp-3">
                  {treatment.shortDescription}
                </p>

                {/* Common Concerns Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-forest-900 block mb-1">
                    Key symptoms evaluated:
                  </span>
                  <ul className="space-y-1 text-xs text-sage-600">
                    {treatment.commonConcerns.slice(0, 2).map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 truncate">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span className="truncate">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div className="mt-6 pt-4 border-t border-sage-100 flex items-center justify-between gap-2">
                <Link
                  href={`/treatments/${treatment.slug}`}
                  className="text-xs font-bold text-forest-900 group-hover:text-gold-600 flex items-center gap-1 transition-colors"
                >
                  <span>Detailed Guide & FAQs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(treatment.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors shrink-0"
                  title={`WhatsApp enquiry for ${treatment.title}`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white border border-sage-200 space-y-3">
          <p className="text-forest-950 font-heading text-lg font-bold">
            No matching conditions found for &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-sage-600 max-w-md mx-auto">
            Try adjusting your search query, selecting another category, or contact Dr. Noor ul
            Qamar directly on WhatsApp to discuss your unique condition.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-forest-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
