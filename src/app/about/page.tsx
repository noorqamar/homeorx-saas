import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Clock,
  MapPin,
  Phone,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { DoctorPortrait } from "@/components/public/doctor-card";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "About Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) | 10 Years Experience",
  description:
    "Learn about Dr. Noor ul Qamar, registered homeopathic medical practitioner with 10 years experience in Lahore. Dedicated to patient-centred, individualised constitutional care.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutDoctorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup type="clinic" />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO BANNER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
              Consultant Homeopathic Physician
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">
              About Dr. Noor ul Qamar
            </h1>
            <p className="font-sans text-sm sm:text-base text-gold-300 font-semibold tracking-wide">
              D.H.M.S, R.H.M.P • 10 Years of Clinical Practice
            </p>
            <p className="text-xs sm:text-sm text-sage-200 max-w-2xl mx-auto leading-relaxed">
              Serving patients in Lahore and worldwide online with patient-centred, detailed, and
              compassionate constitutional homeopathic care.
            </p>
          </div>
        </section>

        {/* ================= BIOGRAPHY & CLINICAL PHILOSOPHY ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Doctor Portrait & Key Stats */}
            <div className="lg:col-span-5 space-y-6">
              <DoctorPortrait className="w-full max-w-sm mx-auto" />

              {/* Four Core Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="wellness-card p-4 text-center bg-white border border-sage-200">
                  <span className="block font-heading text-2xl font-normal text-forest-900">
                    10+ Years
                  </span>
                  <span className="text-xs text-sage-600 font-medium font-sans">Clinical Experience</span>
                </div>

                <div className="wellness-card p-4 text-center bg-white border border-sage-200">
                  <span className="block font-heading text-2xl font-normal text-forest-900">
                    Online
                  </span>
                  <span className="text-xs text-sage-600 font-medium font-sans">Consultations Worldwide</span>
                </div>

                <div className="wellness-card p-4 text-center bg-white border border-sage-200">
                  <span className="block font-heading text-2xl font-normal text-forest-900">
                    In-Clinic
                  </span>
                  <span className="text-xs text-sage-600 font-medium font-sans">LDA Avenue 1, Lahore</span>
                </div>

                <div className="wellness-card p-4 text-center bg-white border border-sage-200">
                  <span className="block font-heading text-2xl font-normal text-forest-900">
                    Personalised
                  </span>
                  <span className="text-xs text-sage-600 font-medium font-sans">Constitutional Care</span>
                </div>
              </div>

              {/* Direct Contacts Card */}
              <div className="wellness-card p-5 bg-forest-50/60 border border-forest-200/80 space-y-2 text-xs text-forest-950">
                <h4 className="font-bold uppercase tracking-wider text-forest-900">
                  Clinic Consultation Timings
                </h4>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-600" />
                  <span>{CLINIC_INFO.clinicTimings} (Monday – Saturday)</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-600" />
                  <span>{CLINIC_INFO.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-600" />
                  <span>Call: {CLINIC_INFO.phone}</span>
                </p>
              </div>
            </div>

            {/* Right: Detailed Journey & Principles */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 text-forest-900 text-xs font-bold border border-forest-200">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                  <span>A Decade of Dedicated Practice</span>
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl font-normal text-forest-950 tracking-tight">
                  Patient-Centred, Detailed, and Thoughtful Care
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-sage-800 leading-relaxed">
                  <p>
                    Over the past 10 years, Dr. Noor ul Qamar has cultivated a medical practice
                    grounded in one uncompromising principle: <em>every patient is biologically and
                    constitutionally unique</em>. Two individuals suffering from the same medical
                    diagnosis may require completely different natural remedies depending on their
                    emotional temperament, lifestyle stressors, thermal modalities, and familial
                    health background.
                  </p>
                  <p>
                    Graduating with a Diploma in Homeopathic Medical Science (D.H.M.S) and registered
                    with the National Council for Homeopathy as a Registered Homeopathic Medical
                    Practitioner (R.H.M.P), Dr. Noor ul Qamar has treated thousands of acute and
                    chronic cases across Pakistan and abroad.
                  </p>
                  <p>
                    His clinical practice focuses primarily on chronic conditions that are often
                    poorly managed by quick-fix superficial treatments: hormonal and reproductive
                    challenges in women (PCOS, menstrual irregularities, fertility support), stubborn
                    dermatological concerns (acne, eczema, psoriasis, alopecia), persistent digestive
                    disorders (GERD, IBS, chronic constipation), and respiratory sensitivities.
                  </p>
                </div>
              </div>

              {/* What to Expect in a Consultation */}
              <div className="wellness-card p-6 sm:p-8 bg-white border border-sage-200/80 shadow-xs space-y-4">
                <h3 className="font-heading text-xl font-normal text-forest-950 flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-gold-500" />
                  <span>What You Can Expect in Every Consultation</span>
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-sage-800">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest-950 block">An Unhurried Clinical Environment:</strong>
                      Initial consultations take 25 to 45 minutes to ensure your full medical history
                      and previous lab reports are thoroughly examined.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest-950 block">Respect for Conventional Medicine:</strong>
                      We never advise patients to abandon their prescribed medicines or bypass
                      essential conventional diagnostics. Homeopathy is integrated safely.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest-950 block">No False Promises or Miracle Claims:</strong>
                      We communicate with complete medical honesty. Natural healing is an organic
                      biological process that requires time, commitment, and healthy living.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest-950 block">Strict Confidentiality:</strong>
                      All communications, symptoms, and health records are handled with the utmost
                      discretion and privacy.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Book Consultation With Dr. Noor ul Qamar</span>
                </Link>

                <a
                  href={CLINIC_INFO.whatsappDefaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-sm shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
