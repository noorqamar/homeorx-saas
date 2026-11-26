import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MessageCircle,
  Clock,
  Phone,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  Activity,
  Award,
  MapPin,
  Sparkles,
} from "lucide-react";
import { TREATMENTS, getTreatmentBySlug } from "@/data/treatments";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { AppointmentForm } from "@/components/public/appointment-form";
import { SchemaMarkup } from "@/components/public/schema-markup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: `${treatment.title} Homeopathic Care Lahore & Online | Dr. Noor ul Qamar`,
    description: treatment.metaDescription,
    keywords: [
      `${treatment.title} Homeopathy Lahore`,
      `${treatment.title} Treatment Pakistan`,
      `Homeopathic Doctor for ${treatment.title}`,
      "Dr. Noor ul Qamar",
      "LDA Avenue 1 Homeopathy",
    ],
    alternates: {
      canonical: `/treatments/${treatment.slug}`,
    },
    openGraph: {
      title: `${treatment.title} Homeopathic Care | Dr. Noor ul Qamar`,
      description: treatment.metaDescription,
      url: `https://dr.noorulqamar.com/treatments/${treatment.slug}`,
    },
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);

  if (!treatment) {
    notFound();
  }

  const relatedTreatments = TREATMENTS.filter(
    (t) => t.category === treatment.category && t.slug !== treatment.slug
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup
        type="treatment"
        treatmentData={{
          title: treatment.title,
          description: treatment.shortDescription,
          category: treatment.category,
          slug: treatment.slug,
        }}
        faqItems={treatment.faqs}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Treatments", url: "/treatments" },
          {
            name: treatment.category,
            url: `/treatments?category=${encodeURIComponent(treatment.category)}`,
          },
          { name: treatment.title, url: `/treatments/${treatment.slug}` },
        ]}
      />

      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO HEADER ================= */}
        <section className="bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#081b13] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-sage-300">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-sage-500" />
              <Link href="/treatments" className="hover:text-white transition-colors">
                Treatments
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-sage-500" />
              <Link
                href={`/treatments?category=${encodeURIComponent(treatment.category)}`}
                className="hover:text-white transition-colors"
              >
                {treatment.category}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-sage-500" />
              <span className="text-gold-300 font-medium truncate">{treatment.title}</span>
            </nav>

            <div className="space-y-3">
              <span className="text-xs font-bold text-gold-400 tracking-wider uppercase bg-forest-800/80 px-3.5 py-1.5 rounded-full border border-gold-500/30 inline-block">
                {treatment.category} • Homeopathic Clinical Care
              </span>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">
                {treatment.title}
              </h1>

              <p className="text-base sm:text-lg text-sage-200 leading-relaxed max-w-3xl">
                {treatment.shortDescription}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#book"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(treatment.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs sm:text-sm border border-forest-700 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Practice Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-sage-300 pt-3 border-t border-forest-800/80">
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  <strong className="font-heading text-white font-normal text-sm">Dr. Noor ul Qamar</strong>{" "}
                  <span className="font-sans font-semibold text-sage-300">(10 Yrs Exp)</span>
                </span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Clinic: {CLINIC_INFO.clinicTimings}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidential Consultation</span>
              </span>
            </div>
          </div>
        </section>

        {/* ================= CONTENT BODY ================= */}
        <section className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Primary HD Clinical Illustration */}
              <div className="wellness-card overflow-hidden bg-white border border-sage-200/80 shadow-md">
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-sage-50 overflow-hidden">
                  <Image
                    src={`/images/treatments/${treatment.slug}-primary.webp`}
                    alt={`Medical illustration of clinical pathology, anatomy and symptom presentation for ${treatment.title} - Dr. Noor ul Qamar Homeopathy Care`}
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/85 text-gold-300 text-xs font-bold backdrop-blur-sm border border-gold-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Clinical Guidance • {treatment.category}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 bg-gradient-to-r from-forest-50/70 to-sage-50/40 border-t border-sage-200/60 flex items-center justify-between text-xs text-sage-700">
                  <p className="italic">
                    Personalized case-taking focuses on your constitutional vitality and specific symptom etiology.
                  </p>
                  <span className="shrink-0 font-sans font-semibold text-forest-900 hidden sm:inline">
                    Lahore &amp; Online
                  </span>
                </div>
              </div>

              {/* 1. Common Concerns & Symptoms */}
              <div className="wellness-card p-6 sm:p-8 bg-white space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-forest-900">
                  <Activity className="w-5 h-5 text-gold-500" />
                  <h2 className="font-heading text-xl sm:text-2xl font-normal">
                    Common Concerns & Symptoms Evaluated
                  </h2>
                </div>
                <p className="text-sm text-sage-700 leading-relaxed">
                  During clinical evaluation, Dr. Noor ul Qamar assesses the full range of
                  physiological and qualitative presentations associated with {treatment.title}:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {treatment.commonConcerns.map((concern, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-sage-50/70 border border-sage-200/60 text-xs sm:text-sm text-forest-950 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. How Consultation Works */}
              <div className="wellness-card p-6 sm:p-8 bg-white space-y-5 shadow-xs">
                <div className="flex items-center gap-2 text-forest-900">
                  <HeartHandshake className="w-5 h-5 text-gold-500" />
                  <h2 className="font-heading text-xl sm:text-2xl font-normal">
                    How the Consultation Process Works
                  </h2>
                </div>
                <p className="text-sm text-sage-700 leading-relaxed">
                  Homeopathy is deeply individualised. We do not prescribe standard off-the-shelf
                  medicines by disease name alone. Instead, our clinical protocol follows a
                  structured 4-step constitutional workflow:
                </p>

                <div className="space-y-4 pt-2">
                  {treatment.howConsultationWorks.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-forest-50/50 border border-forest-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-sans text-base font-semibold text-forest-950">
                          {item.step}
                        </h3>
                        <p className="text-xs sm:text-sm text-sage-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Supporting Protocol & Lifestyle Illustration */}
              <div className="wellness-card p-6 sm:p-8 bg-white space-y-4 shadow-xs border border-sage-200/80">
                <div className="flex items-center gap-2 text-forest-900">
                  <Sparkles className="w-5 h-5 text-gold-500" />
                  <h3 className="font-heading text-lg sm:text-xl font-normal">
                    Holistic Constitutional Protocol &amp; Lifestyle Integration
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-sage-700 leading-relaxed">
                  Complementary homeopathic management for {treatment.title} harmonizes individualized remedy dilutions with targeted lifestyle modifications, dietary pacing, and gentle recovery support.
                </p>
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-sage-50 border border-sage-200/60 shadow-xs">
                  <Image
                    src={`/images/treatments/${treatment.slug}-secondary.webp`}
                    alt={`Constitutional homeopathic clinical protocol and lifestyle integration diagram for ${treatment.title} - Dr. Noor ul Qamar`}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
                <p className="text-[11px] sm:text-xs text-sage-600 italic">
                  Educational illustration: Every patient presents a unique physiological constitution requiring dedicated diagnostic dialogue.
                </p>
              </div>

              {/* 3. Red Flags & Urgent Medical Care Notice */}
              <div className="rounded-2xl p-6 sm:p-8 bg-amber-50/80 border border-amber-200 text-amber-950 space-y-4">
                <div className="flex items-center gap-2.5 text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <h2 className="font-heading text-lg sm:text-xl font-normal">
                    When to Seek Urgent Conventional Medical Care
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  Homeopathy serves as complementary and outpatient supportive care. Immediate
                  emergency hospital evaluation or specialist intervention is mandatory if you
                  experience any of the following clinical red flags:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-900/90 pt-1">
                  {treatment.whenToSeekUrgentCare.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-700 font-bold shrink-0 mt-0.5">⚠</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-amber-800 italic pt-1 border-t border-amber-200/80">
                  Safety Notice: Never stop or alter any prescribed conventional medications without
                  the explicit direction of your prescribing physician.
                </p>
              </div>

              {/* 4. FAQs Section */}
              <div className="wellness-card p-6 sm:p-8 bg-white space-y-5 shadow-xs">
                <div className="flex items-center gap-2 text-forest-900">
                  <HelpCircle className="w-5 h-5 text-gold-500" />
                  <h2 className="font-heading text-xl sm:text-2xl font-normal">
                    Frequently Asked Questions About {treatment.title}
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {treatment.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group p-4 rounded-xl border border-sage-200/80 bg-[#fcfbf7] open:border-forest-300 transition-all cursor-pointer"
                    >
                      <summary className="font-sans text-sm sm:text-base font-semibold text-forest-950 list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <span className="ml-2 w-5 h-5 rounded-full bg-forest-50 text-forest-900 flex items-center justify-center text-xs group-open:rotate-180 transition-transform">
                          ↓
                        </span>
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-sage-800 leading-relaxed pt-2 border-t border-sage-200/50">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* 5. Appointment Booking Form Embed */}
              <div className="pt-4">
                <AppointmentForm
                  defaultConcern={`Consultation enquiry regarding: ${treatment.title}`}
                />
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Doctor Consultation Quick Card */}
              <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center font-bold text-sm shrink-0 border border-gold-500/30">
                    Dr. N
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-forest-950">
                      {CLINIC_INFO.doctorName}
                    </h3>
                    <p className="text-xs text-gold-600 font-semibold">
                      {CLINIC_INFO.qualifications}
                    </p>
                    <p className="text-[11px] text-sage-600">10 Years Experience</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-sage-700 pt-2 border-t border-sage-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>Clinic Timings: {CLINIC_INFO.clinicTimings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>LDA Avenue 1, Lahore & Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>Call: {CLINIC_INFO.phone}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20consult%20regarding%20${encodeURIComponent(treatment.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span>WhatsApp Dr. Noor ul Qamar</span>
                  </a>

                  <Link
                    href="#book"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sage-100 hover:bg-sage-200 text-forest-900 font-bold text-xs transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Priority Slot</span>
                  </Link>
                </div>
              </div>

              {/* Related Conditions in Category */}
              {relatedTreatments.length > 0 && (
                <div className="wellness-card p-6 bg-white border border-sage-200/80 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                    More in {treatment.category}
                  </h3>
                  <div className="space-y-2">
                    {relatedTreatments.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/treatments/${rel.slug}`}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-forest-50 text-xs font-semibold text-forest-950 group transition-colors"
                      >
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-sage-100 border border-sage-200/60">
                          <Image
                            src={`/images/treatments/${rel.slug}-primary.webp`}
                            alt={rel.title}
                            width={60}
                            height={60}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate flex-1">{rel.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-sage-400 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety Disclaimers */}
              <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 text-[11px] text-sage-600 leading-relaxed space-y-1.5">
                <span className="font-bold text-forest-900 block">Responsible Clinical Practice:</span>
                <p>
                  Homeopathic remedies are prescribed on an individual constitutional basis. We do
                  not provide cure guarantees or promise permanent outcomes. Healing depends on
                  chronicity, lifestyle, and individual vitality.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
