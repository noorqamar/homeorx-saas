import Link from "next/link";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Calendar,
  ExternalLink,
  Navigation,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { AppointmentForm } from "@/components/public/appointment-form";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Contact & Clinic Location | Dr. Noor ul Qamar Homeopathy Care Lahore",
  description:
    "Visit Dr. Noor ul Qamar at Noor Street, LDA Avenue 1, Lahore, Pakistan, or book an online WhatsApp consultation. Call 03004627881. Clinic timings: 6:00 PM – 10:00 PM.",
  keywords: [
    "Homeopathy Clinic LDA Avenue Lahore",
    "Dr. Noor ul Qamar Contact Number",
    "Homeopathy Doctor Lahore Phone Number",
    "LDA Avenue 1 Homeopathic Clinic",
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup type="clinic" />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO BANNER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
              Clinic Location & Appointments
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Contact & Visit Dr. Noor ul Qamar
            </h1>
            <p className="text-sm sm:text-base text-sage-200 leading-relaxed max-w-2xl mx-auto">
              We welcome you to our peaceful clinic on Noor Street, LDA Avenue 1, Lahore, as well
              as to our worldwide online consultation service via WhatsApp audio/video.
            </p>
          </div>
        </section>

        {/* ================= CONTACT CARDS ROW ================= */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center border border-forest-200/60">
                  <Phone className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-heading text-lg font-bold text-forest-950">Direct Phone Call</h3>
                <p className="text-xs text-sage-600 leading-relaxed">
                  Call our clinic desk directly during practice hours for appointment enquiries and
                  general information.
                </p>
                <p className="text-base font-bold text-forest-950">{CLINIC_INFO.phone}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-sage-100">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLINIC_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <h3 className="font-heading text-lg font-bold text-forest-950">WhatsApp Consultation</h3>
                <p className="text-xs text-sage-600 leading-relaxed">
                  Fastest way to book an appointment, share medical reports, or enquire about
                  homeopathic disease kits.
                </p>
                <p className="text-base font-bold text-forest-950">+{CLINIC_INFO.whatsapp}</p>
              </div>

              <div className="pt-4 mt-2 border-t border-sage-100">
                <a
                  href={CLINIC_INFO.whatsappDefaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Clinic Timings & Location Card */}
            <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest-900 flex items-center justify-center border border-forest-200/60">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="font-heading text-lg font-bold text-forest-950">Clinic Timings</h3>
                <p className="text-xs text-sage-600 leading-relaxed">
                  Monday to Saturday: <strong>{CLINIC_INFO.clinicTimings}</strong> (PKT).
                  Sunday: Closed for routine clinic visits.
                </p>
                <p className="text-xs text-sage-800 font-medium">
                  {CLINIC_INFO.address}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-sage-100">
                <a
                  href={CLINIC_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sage-100 hover:bg-sage-200 text-forest-900 text-xs font-bold transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-forest-800" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GOOGLE MAP & LOCATION EMBED ================= */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="wellness-card overflow-hidden bg-white border border-sage-200/80 shadow-md">
            <div className="p-6 sm:p-8 border-b border-sage-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">
                  Find Us in Lahore
                </span>
                <h2 className="font-heading text-2xl font-bold text-forest-950">
                  Clinic Map & Directions
                </h2>
                <p className="text-xs sm:text-sm text-sage-700 mt-0.5">
                  Located conveniently on Noor Street, LDA Avenue 1, Lahore, Pakistan.
                </p>
              </div>

              <a
                href={CLINIC_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                <span>Find Us on Google Maps</span>
              </a>
            </div>

            {/* Embedded Responsive Map */}
            <div className="relative w-full h-80 sm:h-96 bg-sage-100">
              <iframe
                title="Dr. Noor ul Qamar Homeopathy Care Location Map"
                src={CLINIC_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-4 sm:p-6 bg-[#fcfbf7] border-t border-sage-100 flex flex-wrap items-center justify-between gap-4 text-xs text-sage-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest-800 shrink-0" />
                <span>
                  <strong>Full Address:</strong> {CLINIC_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-forest-800 shrink-0" />
                <span>
                  <strong>Timings:</strong> 6:00 PM – 10:00 PM (Mon – Sat)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= APPOINTMENT FORM SECTION ================= */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <AppointmentForm />
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
