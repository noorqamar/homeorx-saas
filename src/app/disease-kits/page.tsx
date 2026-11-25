import Link from "next/link";
import {
  Package,
  Calendar,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { DISEASE_KITS, getKitWhatsAppUrl } from "@/data/disease-kits";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Homeopathic Disease Kits & Supportive Care | Dr. Noor ul Qamar",
  description:
    "Curated homeopathic wellness kits for hair care, skin, PCOS, digestive ease, respiratory health, and joint mobility. Personalised consultation required before dispensing.",
};

export default function DiseaseKitsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup type="clinic" />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO HEADER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
              Curated Supportive Regimens
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Homeopathic Disease & Wellness Kits
            </h1>
            <p className="text-sm sm:text-base text-sage-200 leading-relaxed max-w-2xl mx-auto">
              Specially formulated multi-remedy supportive kits designed by Dr. Noor ul Qamar
              (D.H.M.S, R.H.M.P) to support chronic conditions. Every kit requires a brief clinical
              consultation to ensure remedy potencies match your individual constitution.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact#book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs shadow-md transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Clinical Consultation</span>
              </Link>
              <a
                href={CLINIC_INFO.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs border border-forest-700 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= CLINICAL CONSULTATION POLICY BANNER ================= */}
        <section className="bg-sage-100/70 py-4 px-4 sm:px-6 border-b border-sage-200">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm text-forest-950 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Professional Standard:</strong> We do not dispatch commercial, unprescribed
              medicines. A personalized consultation with Dr. Noor ul Qamar is conducted prior to
              confirming any kit.
            </span>
          </div>
        </section>

        {/* ================= KITS CATALOG ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DISEASE_KITS.map((kit) => (
              <div
                key={kit.id}
                className="wellness-card bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs border border-sage-200/80 hover:border-gold-400/60 transition-all"
              >
                <div className="space-y-4">
                  {/* Product Placeholder Image Box */}
                  <div className="relative aspect-16/10 rounded-2xl bg-gradient-to-br from-forest-50 via-sage-50 to-sage-100/80 border border-sage-200/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden shadow-inner">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-xs flex items-center justify-center text-forest-900 border border-sage-200/60 mb-2">
                      <Package className="w-7 h-7 text-forest-800" />
                    </div>
                    <span className="font-heading text-base font-bold text-forest-950">
                      {kit.title}
                    </span>
                    <span className="text-xs text-sage-600 mt-0.5">
                      Personalised Homeopathic Formulations
                    </span>

                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-forest-900 text-gold-300 shadow-xs">
                      {kit.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-2xl font-bold text-forest-950">
                      {kit.title}
                    </h3>
                    <p className="text-xs text-gold-700 font-semibold mt-0.5">{kit.subtitle}</p>
                    <p className="text-xs sm:text-sm text-sage-800 leading-relaxed mt-2.5">
                      {kit.description}
                    </p>
                  </div>

                  {/* Designed to Support */}
                  <div className="space-y-2 pt-2 border-t border-sage-100">
                    <span className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
                      Designed to Support:
                    </span>
                    <ul className="space-y-1.5 text-xs text-sage-700">
                      {kit.designedToSupport.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Inclusions */}
                  <div className="space-y-1.5 pt-2 border-t border-sage-100">
                    <span className="text-xs font-bold text-forest-900 uppercase tracking-wider block">
                      Typical Inclusions:
                    </span>
                    <ul className="space-y-1 text-xs text-sage-600">
                      {kit.keyInclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-gold-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mandatory Consultation Note */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Medical Care Note:</strong> A personalised consultation is required
                    before remedies are dispensed to ensure remedy selection matches your
                    constitution.
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-sage-100 space-y-2">
                  <a
                    href={getKitWhatsAppUrl(kit.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <Link
                    href={`/contact#book`}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sage-50 hover:bg-sage-100 text-forest-900 text-xs font-semibold border border-sage-200 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>Schedule Initial Evaluation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= INTEGRATED WELLNESS PHILOSOPHY ================= */}
        <section className="bg-forest-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-forest-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              Why Consultation Always Precedes Dispensing
            </h2>
            <p className="text-xs sm:text-sm text-sage-200 leading-relaxed max-w-2xl mx-auto">
              In classical homeopathy, remedies act as biological catalysts that depend on exact
              matching of your physical symptoms, thermal modalities, and emotional state. By
              conducting a proper clinical evaluation, Dr. Noor ul Qamar ensures that your treatment
              is both medically safe and constitutionally accurate.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="text-xs font-bold text-gold-400 hover:text-gold-300 underline"
              >
                Learn more about Dr. Noor ul Qamar&apos;s 10-year clinical philosophy →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
