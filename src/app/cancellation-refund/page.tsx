import Link from "next/link";
import { CLINIC_INFO } from "@/data/clinic-info";
import { SiteHeader } from "@/components/public/site-header";
import { SiteFooter } from "@/components/public/site-footer";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | Dr. Noor ul Qamar Homeopathy Care",
  description:
    "Appointment cancellation, rescheduling, and refund policies of Dr. Noor ul Qamar Homeopathy Care.",
  alternates: {
    canonical: "/cancellation-refund",
  },
};

export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf7] text-[#1c2d27]">
      <SiteHeader />

      <main className="flex-1 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-900 text-xs font-bold border border-forest-200">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
            <span>Clinic Transparency</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-normal text-forest-950">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-sage-600">
            Last Updated: November 2026 • Dr. Noor ul Qamar Homeopathy Care
          </p>
        </div>

        <div className="wellness-card p-6 sm:p-10 bg-white border border-sage-200/80 shadow-xs space-y-6 text-sm text-sage-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-sans text-base sm:text-lg font-semibold text-forest-950">
              1. Rescheduling & Cancelling Appointments
            </h2>
            <p>
              We understand that personal schedules and health emergencies can arise unexpectedly.
              Patients may reschedule or cancel their confirmed consultation without penalty by
              notifying our clinic desk via phone ({CLINIC_INFO.phone}) or WhatsApp (+923004627881)
              at least <strong>4 hours prior</strong> to the scheduled consultation time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-sans text-base sm:text-lg font-semibold text-forest-950">
              2. Consultation Fee Policy
            </h2>
            <p>
              Consultation fees cover the dedicated clinical time, detailed constitutional case
              evaluation, and individualized remedy selection performed by Dr. Noor ul Qamar. Once a
              consultation has taken place and clinical advice has been provided, the consultation
              fee is non-refundable. If an advance fee was paid and the appointment was cancelled
              with due notice, a full refund or future credit will be processed promptly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-sans text-base sm:text-lg font-semibold text-forest-950">
              3. Custom Prepared Remedies & Dispatches
            </h2>
            <p>
              Homeopathic remedies are custom-diluted, bottled, and prepared specifically for your
              individual case. For hygiene, pharmaceutical safety, and regulatory compliance,
              customized medicinal formulations cannot be returned or refunded once dispatched from
              our clinic.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-sans text-base sm:text-lg font-semibold text-forest-950">
              4. Damaged or Incomplete Shipments
            </h2>
            <p>
              In the unlikely event that your remedy package arrives damaged or compromised during
              courier transit, please share a photograph with our WhatsApp support line within 24
              hours of delivery. We will immediately replace and redispatch your medications at no
              extra charge.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
