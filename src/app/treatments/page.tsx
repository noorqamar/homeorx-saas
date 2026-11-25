import { Suspense } from "react";
import Link from "next/link";
import { Calendar, MessageCircle, ShieldCheck, Heart } from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { TreatmentsClient } from "./treatments-client";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Treatments Directory | Complete 60+ Conditions | Dr. Noor ul Qamar",
  description:
    "Explore our complete directory of 60+ chronic and acute conditions managed through thoughtful constitutional homeopathy. Women's health, skin, hair, allergies, joints, and digestion.",
};

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup type="clinic" />
      <SiteHeader />

      <main className="flex-1">
        {/* Header Hero Banner */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
              Comprehensive Clinical Directory
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Homeopathic Treatments Directory
            </h1>
            <p className="text-sm sm:text-base text-sage-200 max-w-2xl mx-auto leading-relaxed">
              Explore 60+ chronic and acute conditions carefully evaluated by Dr. Noor ul Qamar
              (D.H.M.S, R.H.M.P) with 10 years of clinical experience. Search or filter by
              speciality below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/contact#book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs shadow-md transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </Link>
              <a
                href={CLINIC_INFO.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs border border-forest-700 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>WhatsApp: {CLINIC_INFO.whatsapp}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Directory & Filter Engine */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Suspense fallback={<div className="p-12 text-center text-sage-600">Loading directory...</div>}>
            <TreatmentsClient />
          </Suspense>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
