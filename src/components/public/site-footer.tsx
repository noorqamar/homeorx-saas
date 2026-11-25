import Link from "next/link";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  Heart,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { TREATMENT_CATEGORIES } from "@/data/treatments";

export function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-sage-200 border-t border-forest-800/80">
      {/* Top Pre-Footer Callout */}
      <div className="border-b border-forest-800/60 bg-forest-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              Looking for Thoughtful, Individualised Homeopathic Care?
            </h3>
            <p className="text-sage-300 text-sm max-w-2xl">
              Consult Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of clinical experience.
              In-clinic visits at LDA Avenue 1, Lahore, and private online consultations worldwide.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/contact#book"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={CLINIC_INFO.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm border border-forest-700 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>WhatsApp: {CLINIC_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Doctor Credentials Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center text-gold-400 border border-gold-500/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="w-5 h-5"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  <path d="M12 6c3 0 6 2 6 6s-3 6-6 6" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white block">
                  {CLINIC_INFO.brandName}
                </span>
                <span className="text-xs text-gold-400 font-medium">
                  {CLINIC_INFO.doctorName} • {CLINIC_INFO.qualifications}
                </span>
              </div>
            </div>

            <p className="text-sage-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Dedicated to compassionate, patient-centred homeopathic healthcare grounded in 10
              years of clinical experience. Specialising in women’s hormonal wellness, chronic skin &
              hair conditions, gastrointestinal ease, and family vitality.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-sage-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Clinic Timings: {CLINIC_INFO.clinicTimings} (Mon – Sat)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  Phone: {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={CLINIC_INFO.whatsappDefaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors"
                >
                  WhatsApp: +{CLINIC_INFO.whatsapp}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Dr. Noor ul Qamar
                </Link>
              </li>
              <li>
                <Link href="/womens-health" className="hover:text-gold-300 transition-colors">
                  Women’s Health & Fertility
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="hover:text-gold-300 transition-colors">
                  Treatments Directory (60+)
                </Link>
              </li>
              <li>
                <Link href="/disease-kits" className="hover:text-gold-300 transition-colors">
                  Disease Kits
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold-300 transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-gold-300 transition-colors">
                  Doctor Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Treatment Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Treatments</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {TREATMENT_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/treatments?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 text-sage-400 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal, Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Patient Policies</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation-refund" className="hover:text-gold-300 transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>

            <div className="pt-4 border-t border-forest-800 space-y-2">
              <span className="text-[11px] font-semibold text-gold-400 block uppercase tracking-wider">
                Practice Standards
              </span>
              <div className="flex items-center gap-2 text-xs text-sage-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Registered Homeopathic Practitioner</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-sage-300">
                <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>10 Years of Clinical Care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Safety Disclaimer Banner */}
        <div className="mt-12 pt-6 border-t border-forest-800/80 text-[12px] text-sage-300 leading-relaxed space-y-2 bg-forest-900/30 p-4 rounded-xl border border-forest-800/40">
          <p className="font-semibold text-white">Medical & Regulatory Notice:</p>
          <p>
            The information provided on this website is for educational and wellness guidance
            purposes only and should not be construed as medical diagnosis, emergency medical
            advice, or a substitute for consulting qualified primary physicians or hospital
            specialists. Homeopathic remedies are prescribed on an individual constitutional basis
            following comprehensive clinical assessment.
          </p>
          <p>
            We strictly advise patients never to discontinue, modify, or taper their prescribed
            conventional medications (including anti-hypertensive drugs, insulin, thyroid
            replacements, or inhalers) without the explicit direction of their treating physician.
            For severe acute medical emergencies, please immediately visit the nearest emergency room.
          </p>
        </div>

        {/* Copyright & Signoff */}
        <div className="mt-8 pt-6 border-t border-forest-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <p>© 2026 Dr. Noor ul Qamar Homeopathy Care. All rights reserved.</p>
          <p className="text-sage-400 text-center sm:text-right">
            LDA Avenue 1, Lahore, Pakistan • Clinic Timings: 6:00 PM – 10:00 PM
          </p>
        </div>
      </div>
    </footer>
  );
}
