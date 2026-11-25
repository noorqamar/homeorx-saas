import Link from "next/link";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Dr. Noor ul Qamar Homeopathy Care",
  description:
    "Terms of clinical service, consultation guidelines, and professional boundaries of Dr. Noor ul Qamar Homeopathy Care.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SiteHeader />

      <main className="flex-1 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 text-xs font-bold border border-forest-200">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Practice Engagement Terms</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-forest-950">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-sage-600">
            Last Updated: November 2026 • Dr. Noor ul Qamar Homeopathy Care
          </p>
        </div>

        <div className="wellness-card p-6 sm:p-10 bg-white border border-sage-200/80 shadow-xs space-y-6 text-sm text-sage-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              1. Nature of Homeopathic Clinical Care
            </h2>
            <p>
              Dr. Noor ul Qamar Homeopathy Care provides individualised, constitutional homeopathic
              evaluations and supportive natural remedies. Homeopathy is a gentle, complementary
              medical modality aimed at supporting the body&apos;s natural self-regulatory vitality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              2. No Medical Guarantees Policy
            </h2>
            <p>
              In accordance with ethical healthcare standards and medical science, we strictly do
              not make claims of &ldquo;permanent cures,&rdquo; 100% guarantees, or uniform timelines. Healing
              is an individual biological process influenced by the severity and chronicity of the
              condition, adherence to prescribed remedies, lifestyle, and nutrition.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              3. Conventional Prescriptions Non-Discontinuation
            </h2>
            <p>
              Patients are explicitly advised never to stop, reduce, or alter any conventional
              medications prescribed by their primary physicians, cardiologists, endocrinologists,
              or surgeons without their direct authorization. Homeopathic care is integrated safely
              alongside ongoing medical care.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              4. Emergency Care Exclusions
            </h2>
            <p>
              This website, our WhatsApp messaging, and outpatient consultations do not provide
              emergency medical intervention. In the event of acute medical crises—such as severe
              chest pain, loss of consciousness, acute respiratory failure, or traumatic injury—you
              must immediately seek assistance at a hospital emergency room.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
