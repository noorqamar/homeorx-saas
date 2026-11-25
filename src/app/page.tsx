import Link from "next/link";
import {
  Calendar,
  MessageCircle,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  Award,
  Sparkles,
  Heart,
  ArrowRight,
  ChevronRight,
  Activity,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Package,
  Star,
  Users,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { TREATMENTS, TREATMENT_CATEGORIES } from "@/data/treatments";
import { DISEASE_KITS } from "@/data/disease-kits";
import { BLOG_POSTS } from "@/data/blog-posts";
import { FAQS } from "@/data/faqs";
import { PATIENT_REVIEWS, TESTIMONIALS_DISCLAIMER } from "@/data/reviews";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { AppointmentForm } from "@/components/public/appointment-form";
import { DoctorPortrait } from "@/components/public/doctor-card";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Dr. Noor ul Qamar Homeopathy Care | Clinic in Lahore & Online Consultation",
  description:
    "Personalised homeopathic care in Lahore & online. Consult Dr. Noor ul Qamar, D.H.M.S, R.H.M.P, with 10 years of experience. Thoughtful care for women's health, skin, hair, allergies, and digestive wellness.",
};

export default function HomePage() {
  const featuredTreatments = TREATMENTS.filter((t) => t.featured).slice(0, 10);
  const featuredBlogs = BLOG_POSTS.slice(0, 3);
  const coreFaqs = FAQS.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup
        type="clinic"
        faqItems={coreFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* ================= 1. HERO SECTION ================= */}
        <section className="relative overflow-hidden bg-[#fcfbf7] bg-gradient-to-b from-forest-50/60 via-sage-50/40 to-[#fcfbf7] pt-8 pb-16 lg:py-20 border-b border-sage-200/50">
          {/* Subtle background botanical accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest-700/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Hero Text & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/80 border border-forest-300/40 text-forest-900 text-xs sm:text-sm font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Personalised Homeopathic Care in Lahore & Online</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-forest-950 tracking-tight leading-[1.18]">
                  Thoughtful Homeopathic Care for Your Health and Wellbeing
                </h1>

                {/* Subtext */}
                <p className="text-base sm:text-lg text-sage-800 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                  Consult <strong className="font-heading text-forest-950 font-normal text-lg sm:text-xl">Dr. Noor ul Qamar</strong>,{" "}
                  <span className="font-sans text-forest-900 font-semibold">D.H.M.S, R.H.M.P</span>, for
                  individualised homeopathic care with{" "}
                  <span className="font-sans text-forest-900 font-semibold">10 years of experience</span>.
                  Experience gentle, evidence-informed consultations tailored to your unique
                  constitution.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                  <Link
                    href="/contact#book"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all transform active:scale-98"
                  >
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>Book Appointment</span>
                  </Link>

                  <a
                    href={CLINIC_INFO.whatsappDefaultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-300 font-bold text-sm sm:text-base shadow-xs hover:shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>

                {/* Three Trust / Statistic Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-sage-200/80">
                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sage-200/70 shadow-2xs text-center lg:text-left">
                    <span className="block font-heading text-2xl font-normal text-forest-900">
                      10+ Years
                    </span>
                    <span className="text-xs text-sage-700 font-medium font-sans">Clinical Experience</span>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sage-200/70 shadow-2xs text-center lg:text-left">
                    <span className="block font-heading text-2xl font-normal text-forest-900">
                      Detailed
                    </span>
                    <span className="text-xs text-sage-700 font-medium font-sans">Personalised Consultation</span>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-sage-200/70 shadow-2xs text-center lg:text-left">
                    <span className="block font-heading text-2xl font-normal text-forest-900">
                      Worldwide
                    </span>
                    <span className="text-xs text-sage-700 font-medium font-sans">Online Consultations</span>
                  </div>
                </div>

                {/* Small Trust Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-forest-900 pt-2">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Patient-Focused Care</span>
                  </span>
                  <span className="text-sage-300">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Private Consultation</span>
                  </span>
                  <span className="text-sage-300">•</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-500" />
                    <span>Natural Wellness Approach</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Doctor Portrait Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md">
                  <DoctorPortrait />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. FEATURED TREATMENT CATEGORIES ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-forest-50 px-3 py-1 rounded-full border border-forest-200/60 inline-block">
              Clinical Specialisations
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
              Featured Treatment Categories
            </h2>
            <p className="text-sm sm:text-base text-sage-700 leading-relaxed">
              Explore our core areas of clinical focus. Every condition is evaluated through an
              individualised constitutional lens respecting the whole person.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredTreatments.map((treatment) => (
              <Link
                key={treatment.slug}
                href={`/treatments/${treatment.slug}`}
                className="wellness-card p-5 group flex flex-col justify-between hover:border-gold-400/60 transition-all duration-300 bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-forest-800 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100 font-sans">
                      {treatment.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-forest-900 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="font-sans text-lg font-semibold text-forest-950 group-hover:text-forest-800 transition-colors tracking-tight">
                    {treatment.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sage-700 line-clamp-2 leading-relaxed">
                    {treatment.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs font-bold text-forest-900 group-hover:text-gold-600 transition-colors">
                  <span>Learn More & Consult</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Directory Link Banner */}
          <div className="mt-12 text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Explore Complete 60+ Conditions Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================= 3. WOMEN'S HEALTH SPOTLIGHT BANNER ================= */}
        <section className="bg-forest-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-forest-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900 text-gold-300 text-xs font-bold border border-gold-500/30">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Dedicated Women&apos;s Health & Fertility Wing</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight">
                Empowering Women’s Hormonal & Reproductive Wellbeing
              </h2>
              <p className="text-sage-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                From chronic PCOS and painful, irregular cycles to fertility preparation, low AMH
                support, and IVF/IUI companion care. Dr. Noor ul Qamar provides private, empathetic
                and constitutional guidance for women in Lahore and across the globe.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["PCOS & Hormones", "Cycle Regularity", "Fertility Support", "Low AMH Guidance", "IVF / IUI Support"].map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 rounded-lg bg-forest-900/90 text-sage-200 text-xs border border-forest-800 font-medium"
                  >
                    ✓ {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/womens-health"
                className="w-full py-3.5 px-5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-center text-sm shadow-md transition-all"
              >
                Explore Women&apos;s Health Care
              </Link>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20enquire%20about%20a%20private%20women%27s%20health%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-forest-900 hover:bg-forest-800 border border-forest-700 text-white font-bold text-center text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Private WhatsApp Enquiry</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================= 4. DISEASE KITS SHOWCASE ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-forest-50 px-3 py-1 rounded-full border border-forest-200/60 inline-block">
              Supportive Wellness Kits
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
              Homeopathic Disease & Wellness Kits
            </h2>
            <p className="text-sm sm:text-base text-sage-700">
              Structured supportive regimens for common chronic concerns. Every kit is reviewed
              and tailored through a clinical consultation before dispensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISEASE_KITS.slice(0, 3).map((kit) => (
              <div
                key={kit.id}
                className="wellness-card p-6 flex flex-col justify-between bg-white border border-sage-200/80 shadow-xs"
              >
                <div className="space-y-4">
                  {/* Product Image Placeholder Box */}
                  <div className="aspect-16/10 rounded-xl bg-gradient-to-br from-forest-50 to-sage-100 flex flex-col items-center justify-center p-4 text-center border border-sage-200/60 relative overflow-hidden">
                    <Package className="w-10 h-10 text-forest-800 mb-2" />
                    <span className="font-heading text-sm font-bold text-forest-950">
                      {kit.title}
                    </span>
                    <span className="text-[11px] text-sage-600 mt-0.5">
                      Personalised Consultation Required
                    </span>
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-forest-900 text-gold-300">
                      {kit.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-forest-950">
                      {kit.title}
                    </h3>
                    <p className="text-xs text-sage-600 font-medium mt-0.5">{kit.subtitle}</p>
                    <p className="text-xs sm:text-sm text-sage-800 mt-2 leading-relaxed">
                      {kit.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-forest-900 block">Designed to support:</span>
                    <ul className="space-y-1 text-xs text-sage-700">
                      {kit.designedToSupport.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sage-100 space-y-3">
                  <p className="text-[11px] text-sage-500 italic">
                    Note: Personalised consultation required before remedies are dispensed.
                  </p>
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(kit.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-gold-400" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/disease-kits"
              className="inline-flex items-center gap-2 text-sm font-bold text-forest-900 hover:text-forest-700 underline"
            >
              <span>View All Disease Kits (Skin, Hair, PCOS, Digestive, Respiratory, Joints)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================= 5. ABOUT DOCTOR SUMMARY ================= */}
        <section className="bg-sage-50/60 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-sage-200/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <DoctorPortrait className="max-w-sm w-full" />
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-forest-900 text-xs font-bold border border-sage-200 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-gold-500" />
                <span>About Your Doctor</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-normal text-forest-950 tracking-tight">
                Meet Dr. Noor ul Qamar
              </h2>
              <p className="font-sans text-sm font-semibold text-gold-700 tracking-wide">
                D.H.M.S, R.H.M.P • 10 Years of Clinical Practice
              </p>

              <div className="space-y-3 text-sm sm:text-base text-sage-800 leading-relaxed">
                <p>
                  With a decade of clinical experience in homeopathy, Dr. Noor ul Qamar is
                  committed to providing patient-centred, unhurried, and meticulous consultations.
                  He believes that chronic illnesses cannot be solved by superficial suppression;
                  true healing requires understanding the whole human organism—its physical
                  symptoms, mental stressors, and constitutional traits.
                </p>
                <p>
                  Practicing out of Noor Street, LDA Avenue 1, Lahore, Dr. Noor ul Qamar also
                  provides seamless online consultations for patients across Pakistan and
                  internationally, ensuring thoughtful homeopathic care is accessible anywhere.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-sage-200 text-center">
                  <span className="block font-bold text-forest-950 text-sm">10+ Years</span>
                  <span className="text-[11px] text-sage-600">Experience</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-sage-200 text-center">
                  <span className="block font-bold text-forest-950 text-sm">Online</span>
                  <span className="text-[11px] text-sage-600">Consultations</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-sage-200 text-center">
                  <span className="block font-bold text-forest-950 text-sm">In-Clinic</span>
                  <span className="text-[11px] text-sage-600">Lahore Visits</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-sage-200 text-center">
                  <span className="block font-bold text-forest-950 text-sm">Personalised</span>
                  <span className="text-[11px] text-sage-600">Constitutional</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
                >
                  <span>Read Full Profile & Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact#book"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-sage-100 text-forest-900 border border-sage-300 text-xs sm:text-sm font-bold transition-colors"
                >
                  <Calendar className="w-4 h-4 text-gold-500" />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. APPOINTMENT FORM SECTION ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <AppointmentForm />
        </section>

        {/* ================= 7. PATIENT REVIEWS ================= */}
        <section className="bg-forest-50/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-sage-200/60">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-white px-3 py-1 rounded-full border border-sage-200 inline-block">
                Patient Experiences
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
                Reflections on Patient-Centred Care
              </h2>
              <p className="text-sm sm:text-base text-sage-700">
                Read authentic feedback from individuals who have consulted Dr. Noor ul Qamar for
                in-clinic visits in Lahore and online consultations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PATIENT_REVIEWS.map((review) => (
                <div
                  key={review.id}
                  className="wellness-card p-6 bg-white flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    {/* Header info with Verified Badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{review.badge}</span>
                      </span>
                      <div className="flex text-gold-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-sage-800 leading-relaxed italic">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between text-xs text-sage-600">
                    <div>
                      <span className="font-bold text-forest-900 block">
                        {review.consultationType}
                      </span>
                      <span>{review.location}</span>
                    </div>
                    <span className="text-[11px] text-sage-500">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonials Disclaimer Notice */}
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-white/80 border border-sage-200/80 text-center text-xs text-sage-600 leading-relaxed">
              <span className="font-bold text-forest-900 block mb-1">Disclaimer:</span>
              {TESTIMONIALS_DISCLAIMER}
            </div>
          </div>
        </section>

        {/* ================= 8. HEALTH BLOG ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-forest-50 px-3 py-1 rounded-full border border-forest-200/60 inline-block">
              Clinical Insights
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
              Health & Wellness Articles
            </h2>
            <p className="text-sm sm:text-base text-sage-700">
              Responsible, educational reading prepared by Dr. Noor ul Qamar to empower you with
              scientific perspective and thoughtful lifestyle guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBlogs.map((post) => (
              <article
                key={post.slug}
                className="wellness-card overflow-hidden bg-white flex flex-col justify-between group shadow-xs"
              >
                {/* Article Header / Mock Cover */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-sage-600">
                    <span className="font-bold text-forest-800 bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="font-sans text-lg font-semibold text-forest-950 group-hover:text-forest-800 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-sage-700 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-sage-100 flex items-center justify-between">
                  <span className="text-[11px] text-sage-500">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-forest-900 group-hover:text-gold-600 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>Explore All Health Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ================= 9. CLINICAL FAQS SECTION ================= */}
        <section className="bg-sage-50/50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-sage-200/60">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-white px-3 py-1 rounded-full border border-sage-200 inline-block">
                Patient Questions
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-sage-700">
                Clear, transparent, and medically safe answers regarding consultation procedures,
                safety, and clinic policies.
              </p>
            </div>

            <div className="space-y-4">
              {coreFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group wellness-card bg-white p-5 sm:p-6 transition-all duration-200 open:border-forest-300 open:shadow-md cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-sans text-base sm:text-lg font-semibold text-forest-950 list-none group-hover:text-forest-800">
                    <span>{faq.question}</span>
                    <span className="ml-4 flex items-center justify-center w-7 h-7 rounded-full bg-forest-50 text-forest-900 group-open:rotate-180 transition-transform shrink-0">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 text-xs sm:text-sm text-sage-800 leading-relaxed pt-3 border-t border-sage-100">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="text-center pt-4">
              <p className="text-xs sm:text-sm text-sage-700">
                Have another question? Reach out directly via WhatsApp at{" "}
                <a
                  href={CLINIC_INFO.whatsappDefaultUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-forest-900 underline"
                >
                  +{CLINIC_INFO.whatsapp}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ================= 10. CLINIC LOCATION & DIRECT CONTACT BAR ================= */}
        <section className="bg-forest-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-forest-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <MapPin className="w-6 h-6 text-gold-400 shrink-0" />
              <div>
                <h4 className="font-heading text-base font-bold text-white">Clinic Address</h4>
                <p className="text-xs text-sage-300 mt-1">{CLINIC_INFO.address}</p>
                <Link
                  href="/contact"
                  className="text-xs text-gold-300 hover:text-white underline mt-1.5 inline-block font-semibold"
                >
                  View on Interactive Map →
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <Clock className="w-6 h-6 text-gold-400 shrink-0" />
              <div>
                <h4 className="font-heading text-base font-bold text-white">Practice Hours</h4>
                <p className="text-xs text-sage-300 mt-1">
                  {CLINIC_INFO.clinicTimings} (Mon – Sat)
                </p>
                <span className="text-xs text-emerald-300 mt-1 block">
                  Online Consultations Worldwide
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <Phone className="w-6 h-6 text-gold-400 shrink-0" />
              <div>
                <h4 className="font-heading text-base font-bold text-white">Direct Contacts</h4>
                <p className="text-xs text-sage-300 mt-1">
                  Call: <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-gold-300 underline font-semibold">{CLINIC_INFO.phone}</a>
                </p>
                <p className="text-xs text-sage-300 mt-0.5">
                  WhatsApp: <a href={CLINIC_INFO.whatsappDefaultUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 underline font-semibold">+{CLINIC_INFO.whatsapp}</a>
                </p>
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
