import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Calendar,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { CLINIC_INFO } from "@/data/clinic-info";
import { TREATMENTS, getTreatmentsByCategory } from "@/data/treatments";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { AppointmentForm } from "@/components/public/appointment-form";
import { SchemaMarkup } from "@/components/public/schema-markup";

export const metadata = {
  title: "Doctor for Women’s Health, Fertility & PCOS Homeopathy in Lahore | Dr. Noor ul Qamar",
  description:
    "Thoughtful, private homeopathic care by Doctor Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) for PCOS, irregular cycles, hormonal balance, low AMH, fertility support, endometriosis, and IVF/IUI companion care in Lahore & online.",
  keywords: [
    "Doctor for Women's Health Lahore",
    "PCOS Homeopathy Doctor Lahore",
    "Homeopathic Doctor for Fertility Pakistan",
    "PCOS Treatment Lahore",
    "Low AMH Homeopathy Doctor",
    "Dr. Noor ul Qamar Women's Health",
    "IVF Support Homeopathy Lahore",
    "Endometriosis Homeopathy",
  ],
  alternates: {
    canonical: "/womens-health",
  },
};

const WOMENS_FAQS = [
  {
    question: "How does homeopathy support hormonal balance in PCOS?",
    answer:
      "Unlike synthetic oral contraceptives that suppress your natural endocrine axis to trigger withdrawal bleeding, constitutional homeopathy works by gently stimulating your own hypothalamic-pituitary-ovarian axis. By addressing metabolic sluggishness, stress, and ovarian circulation, remedies support the body in restoring natural ovulatory cycles.",
  },
  {
    question: "Can I receive homeopathic fertility support while preparing for IVF or IUI?",
    answer:
      "Yes. Dr. Noor ul Qamar provides companion homeopathic care designed to calm procedural anxiety, support uterine blood flow, and nurture emotional resilience before and during assisted reproductive cycles. We coordinate respectfully with your reproductive endocrinologist's schedule.",
  },
  {
    question: "Is online consultation private and confidential for sensitive women's health concerns?",
    answer:
      "Completely. All consultations with Dr. Noor ul Qamar are strictly confidential. Whether you connect via private WhatsApp audio/video or visit in person at our Lahore clinic, your dignity, privacy, and personal history are safeguarded with the highest ethical standards.",
  },
  {
    question: "How long does it usually take to see improvements in cycle regularity?",
    answer:
      "Because biological follicular maturation and hormonal recalibration require time, most women experience noticeable cycle stabilization and reduced PMS/bloating within 3 to 6 consecutive cycles of constitutional care.",
  },
];

export default function WomensHealthPage() {
  const womensTreatments = getTreatmentsByCategory("Women's Health");

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SchemaMarkup
        type="clinic"
        faqItems={WOMENS_FAQS}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Women's Health & Fertility", url: "/womens-health" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ================= HERO BANNER ================= */}
        <section className="relative overflow-hidden bg-forest-950 bg-gradient-to-b from-forest-900 via-forest-950 to-[#0a1f16] text-white py-16 sm:py-22 px-4 sm:px-6 lg:px-8 border-b border-forest-800">
          <div className="max-w-5xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-800/80 text-gold-300 text-xs font-bold border border-gold-500/30 shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-current text-gold-400" />
              <span>Dedicated Women’s Health & Fertility Wing</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.18]">
              Thoughtful, Gentle Care for Women’s Health & Fertility
            </h1>

            <p className="text-base sm:text-lg text-sage-200 leading-relaxed max-w-3xl mx-auto">
              Empowering your hormonal balance, reproductive vitality, and emotional peace.
              Consult Dr. Noor ul Qamar (D.H.M.S, R.H.M.P) with 10 years of clinical experience for
              private, individualised care in Lahore and worldwide online.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="#book"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-forest-950 font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Consultation</span>
              </Link>

              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20enquire%20about%20a%20private%20women%27s%20health%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs sm:text-sm border border-forest-700 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Private WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-sage-300 pt-6 border-t border-forest-800/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Confidential Care</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>10 Years Experience</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>Evening Timings: {CLINIC_INFO.clinicTimings}</span>
              </span>
            </div>
          </div>
        </section>

        {/* ================= CLINICAL & LIFESTYLE VISUAL GALLERY ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="wellness-card overflow-hidden bg-white border border-sage-200/80 shadow-md">
              <div className="relative aspect-[16/10] bg-sage-50 overflow-hidden">
                <Image
                  src="/images/womens-health/hero.webp"
                  alt="Empathetic, confidential clinical consultation for women's reproductive health - Dr. Noor ul Qamar"
                  width={800}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/85 text-gold-300 text-xs font-bold backdrop-blur-xs border border-gold-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Clinical Excellence</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-forest-50/70 to-sage-50/40 border-t border-sage-200/60">
                <h3 className="font-heading text-base font-normal text-forest-950">
                  Empathetic Constitutional Diagnostic Dialogue
                </h3>
                <p className="text-xs text-sage-700 mt-1 leading-relaxed">
                  Every case study involves extensive evaluation of hormonal markers, menstrual chronology, emotional health, and constitutional vitality.
                </p>
              </div>
            </div>

            <div className="wellness-card overflow-hidden bg-white border border-sage-200/80 shadow-md">
              <div className="relative aspect-[16/10] bg-sage-50 overflow-hidden">
                <Image
                  src="/images/womens-health/lifestyle.webp"
                  alt="Holistic lifestyle pacing, nutritional guidance and restorative wellness for women"
                  width={800}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/85 text-gold-300 text-xs font-bold backdrop-blur-xs border border-gold-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>Holistic Vitality</span>
                </div>
              </div>
              <div className="p-4 sm:p-5 bg-gradient-to-r from-forest-50/70 to-sage-50/40 border-t border-sage-200/60">
                <h3 className="font-heading text-base font-normal text-forest-950">
                  Nutritional Harmony &amp; Cycle Synchronization
                </h3>
                <p className="text-xs text-sage-700 mt-1 leading-relaxed">
                  Supportive constitutional remedies paired with lifestyle rhythm guidance, sleep hygiene, and stress-modulation strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= KEY SPECIALISATIONS GRID ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-forest-800 tracking-wider uppercase bg-forest-50 px-3 py-1 rounded-full border border-forest-200/60 inline-block">
              Areas of Supportive Care
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-forest-950 tracking-tight">
              Comprehensive Support Across Every Stage of Life
            </h2>
            <p className="text-sm sm:text-base text-sage-700">
              From adolescent cycle irregularities to pre-conception optimization and beyond.
              Click on any condition to read the full clinical overview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {womensTreatments.map((treatment) => (
              <div
                key={treatment.slug}
                className="wellness-card p-6 bg-white flex flex-col justify-between group hover:border-gold-400/60 shadow-xs"
              >
                <div className="space-y-3">
                  {/* Thumbnail Image */}
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-sage-50 border border-sage-200/60 group-hover:border-gold-400/50 transition-colors shadow-xs"
                  >
                    <Image
                      src={`/images/treatments/${treatment.slug}-primary.webp`}
                      alt={`Evaluation and care for ${treatment.title} - Dr. Noor ul Qamar`}
                      width={400}
                      height={250}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </Link>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-forest-800 uppercase tracking-wider bg-forest-50 px-2.5 py-0.5 rounded-md border border-forest-100">
                      Women&apos;s Health
                    </span>
                    <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-forest-900 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-semibold text-forest-950 group-hover:text-forest-800 transition-colors tracking-tight">
                    <Link href={`/treatments/${treatment.slug}`}>{treatment.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-sage-700 leading-relaxed line-clamp-3">
                    {treatment.shortDescription}
                  </p>

                  <div className="space-y-1 pt-2">
                    <span className="text-[11px] font-bold text-forest-900 block">Focus areas:</span>
                    <ul className="space-y-1 text-xs text-sage-600">
                      {treatment.commonConcerns.slice(0, 3).map((concern, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="truncate">{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sage-100 flex items-center justify-between">
                  <Link
                    href={`/treatments/${treatment.slug}`}
                    className="text-xs font-bold text-forest-900 group-hover:text-gold-600 flex items-center gap-1 transition-colors"
                  >
                    <span>Read Guide</span>
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
        </section>

        {/* ================= SAFETY SECTION: WHEN TO SEE A GYNAECOLOGIST ================= */}
        <section className="bg-amber-50/70 py-14 px-4 sm:px-6 lg:px-8 border-y border-amber-200/80">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="flex items-center gap-3 text-amber-900">
              <AlertTriangle className="w-6 h-6 text-amber-700 shrink-0" />
              <h2 className="font-heading text-xl sm:text-2xl font-normal">
                When to See a Gynaecologist or Fertility Specialist Immediately
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              Dr. Noor ul Qamar firmly champions responsible, integrated healthcare. While homeopathy
              is a powerful constitutional support for chronic hormonal disharmony, conventional
              obstetric/gynaecological emergency care is indispensable in acute situations. You must
              urgently consult a specialist or hospital emergency room if you experience:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-amber-950">
              <li className="p-3 bg-white/80 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="text-amber-700 font-bold">⚠</span>
                <span>Positive pregnancy test with sharp, severe unilateral pelvic pain (rule out ectopic pregnancy)</span>
              </li>
              <li className="p-3 bg-white/80 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="text-amber-700 font-bold">⚠</span>
                <span>Acute, flooding vaginal haemorrhage soaking more than 2 maxi pads per hour</span>
              </li>
              <li className="p-3 bg-white/80 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="text-amber-700 font-bold">⚠</span>
                <span>Post-menopausal bleeding or unexplained spotting after a full year without menses</span>
              </li>
              <li className="p-3 bg-white/80 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="text-amber-700 font-bold">⚠</span>
                <span>Pelvic pain accompanied by high spiking fever, rigors, and purulent vaginal discharge</span>
              </li>
            </ul>

            <p className="text-[11px] text-amber-800 italic pt-2">
              Note: Never discontinue any hormone replacement therapy, thyroid medicine, or fertility
              prescriptions without the direct guidance of your prescribing specialist.
            </p>
          </div>
        </section>

        {/* ================= FAQS ACCORDION ================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl sm:text-3xl font-normal text-forest-950">
              Women’s Health & Fertility FAQs
            </h2>
            <p className="text-xs sm:text-sm text-sage-700">
              Clear answers to common questions regarding treatment, privacy, and safety.
            </p>
          </div>

          <div className="space-y-4">
            {WOMENS_FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group wellness-card bg-white p-5 sm:p-6 transition-all duration-200 open:border-forest-300 open:shadow-md cursor-pointer"
              >
                <summary className="flex items-center justify-between font-sans text-base font-semibold text-forest-950 list-none group-hover:text-forest-800">
                  <span>{faq.question}</span>
                  <span className="ml-4 flex items-center justify-center w-6 h-6 rounded-full bg-forest-50 text-forest-900 group-open:rotate-180 transition-transform shrink-0">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-sage-800 leading-relaxed pt-2 border-t border-sage-100">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ================= APPOINTMENT FORM EMBED ================= */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <AppointmentForm
            defaultConcern="Women's Health / Hormonal / Fertility Consultation"
          />
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
