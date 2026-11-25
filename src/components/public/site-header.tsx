"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { TREATMENT_CATEGORIES } from "@/data/treatments";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsTreatmentsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Women’s Health", href: "/womens-health" },
    {
      name: "Treatments",
      href: "/treatments",
      isDropdown: true,
    },
    { name: "Disease Kits", href: "/disease-kits" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner with Micro-Info */}
      <div className="bg-forest-950 text-sage-100 text-[12px] sm:text-[13px] border-b border-forest-800/60 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-sage-200">
              <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Clinic: {CLINIC_INFO.clinicTimings} (Mon - Sat)</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sage-200">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>LDA Avenue 1, Lahore & Worldwide Online</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-sage-100 hover:text-gold-300 font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-forest-700 hidden sm:inline">•</span>
            <Link
              href="/login"
              className="text-sage-300 hover:text-white transition-colors text-xs font-semibold px-2 py-0.5 rounded-sm bg-forest-900/80 hover:bg-forest-800 border border-forest-700/50"
            >
              Doctor Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        aria-label="Main Navigation"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-sage-200/60 py-3"
            : "bg-[#fcfbf7] border-b border-sage-200/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-hidden focus:ring-2 focus:ring-forest-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest-900 flex items-center justify-center text-gold-400 shadow-md group-hover:bg-forest-800 transition-colors shrink-0 border border-gold-500/30">
              {/* Botanical Caduceus / Leaf Crest */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                <path d="M12 6c3 0 6 2 6 6s-3 6-6 6" />
                <circle cx="12" cy="3" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base sm:text-lg font-bold text-forest-950 tracking-tight leading-snug group-hover:text-forest-800 transition-colors whitespace-nowrap">
                Dr. Noor ul Qamar
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-sage-600 tracking-wide uppercase whitespace-nowrap">
                Homeopathy Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink-0">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsTreatmentsOpen(true)}
                    onMouseLeave={() => setIsTreatmentsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${
                        pathname.startsWith("/treatments")
                          ? "text-forest-900 bg-forest-50/80 font-bold"
                          : "text-forest-900/80 hover:text-forest-950 hover:bg-sage-100/60"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isTreatmentsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Dropdown Menu */}
                    {isTreatmentsOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50">
                        <div className="bg-white rounded-2xl shadow-xl border border-sage-200/80 p-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="px-3 py-2 border-b border-sage-100 mb-2">
                            <span className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                              Treatment Categories (60+ Conditions)
                            </span>
                          </div>
                          <div className="space-y-1">
                            {TREATMENT_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/treatments?category=${encodeURIComponent(cat.name)}`}
                                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-forest-900 hover:bg-forest-50 hover:text-forest-950 transition-colors group"
                              >
                                <span>{cat.name}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-sage-400 group-hover:text-forest-700 group-hover:translate-x-0.5 transition-all" />
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-sage-100">
                            <Link
                              href="/treatments"
                              className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-forest-900 text-white text-xs font-bold hover:bg-forest-800 transition-colors"
                            >
                              <span>View All 60+ Conditions</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-forest-900 bg-forest-50/80 font-bold"
                      : "text-forest-900/80 hover:text-forest-950 hover:bg-sage-100/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href={CLINIC_INFO.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-600/30 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100/80 text-xs font-bold transition-all shadow-2xs hover:shadow-xs whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/contact#book"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all transform active:scale-98 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={CLINIC_INFO.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Dr. Noor ul Qamar"
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-forest-900 hover:bg-sage-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-sage-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href || (link.isDropdown && pathname.startsWith("/treatments"))
                      ? "bg-forest-50 text-forest-900 font-bold"
                      : "text-forest-900/80 hover:bg-sage-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Quick Treatment Categories on Mobile */}
            <div className="pt-2 border-t border-sage-100">
              <span className="block px-3.5 py-1 text-xs font-bold text-sage-600 uppercase tracking-wider">
                Popular Categories
              </span>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {TREATMENT_CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/treatments?category=${encodeURIComponent(cat.name)}`}
                    className="px-3 py-1.5 rounded-lg text-xs text-forest-900/90 hover:bg-forest-50 truncate"
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-sage-100 space-y-2">
              <Link
                href="/contact#book"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 text-white text-sm font-bold shadow-md"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Book Appointment</span>
              </Link>
              <a
                href={CLINIC_INFO.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-bold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
