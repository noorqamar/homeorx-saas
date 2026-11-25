import Link from "next/link";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Dr. Noor ul Qamar Homeopathy Care",
  description:
    "Patient confidentiality, medical records security, and privacy policies of Dr. Noor ul Qamar Homeopathy Care.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SiteHeader />

      <main className="flex-1 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 text-xs font-bold border border-forest-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Patient Confidentiality Commitment</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-forest-950">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-sage-600">
            Last Updated: November 2026 • Dr. Noor ul Qamar Homeopathy Care
          </p>
        </div>

        <div className="wellness-card p-6 sm:p-10 bg-white border border-sage-200/80 shadow-xs space-y-6 text-sm text-sage-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              1. Our Ethical Commitment to Patient Privacy
            </h2>
            <p>
              At Dr. Noor ul Qamar Homeopathy Care, we hold medical confidentiality as a sacred
              trust. All health histories, personal consultations, laboratory reports, photographs,
              and private clinical notes shared with Dr. Noor ul Qamar are protected with strict
              discretion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              2. Information We Collect
            </h2>
            <p>During appointment bookings and consultations, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, phone number, city, and delivery address for remedies.</li>
              <li>
                Clinical records: Detailed symptom descriptions, medical chronologies, previous
                investigation reports (CBC, ultrasound, hormonal panels), and medication history.
              </li>
              <li>
                Consultation logs: Case-taking notes maintained solely for prescribing accuracy and
                follow-up assessments.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              3. How Your Information Is Used
            </h2>
            <p>
              Your clinical details are strictly utilized to formulate tailored constitutional
              homeopathic remedies, track therapeutic progress, and coordinate safe courier delivery
              of medicines. We never sell, rent, commercialize, or share your contact or health
              information with third-party marketers or insurers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              4. WhatsApp & Digital Communications
            </h2>
            <p>
              When you contact our practice via WhatsApp (+923004627881), messages, images, and
              calls are protected by WhatsApp&apos;s end-to-end encryption protocols. Only Dr. Noor ul
              Qamar and authorized clinical staff view your case enquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading text-lg font-bold text-forest-950">
              5. Contacting the Clinic
            </h2>
            <p>
              If you have any questions regarding your medical data or wish to update your records,
              please reach out directly to Dr. Noor ul Qamar at {CLINIC_INFO.phone} or visit our
              clinic at {CLINIC_INFO.address}.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
