import { CLINIC_INFO } from "./clinic-info";

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-first-consultation",
    category: "Consultations",
    question: "What happens in the first consultation?",
    answer:
      "Your initial consultation with Dr. Noor ul Qamar is an in-depth, relaxed, and detailed clinical evaluation. Rather than spending only a few rushed minutes, Dr. Noor ul Qamar listens attentively to your main health concerns, onset timeline, past medical treatments, previous lab reports, emotional stressors, sleep patterns, dietary preferences, and thermal sensitivities. This comprehensive portrait allows him to identify the single most suitable constitutional remedy that matches your whole person, not just an isolated symptom.",
  },
  {
    id: "faq-online-consultations",
    category: "Consultations",
    question: "Do you offer online consultations?",
    answer:
      "Yes. Dr. Noor ul Qamar provides comprehensive online consultations for patients across Pakistan and internationally. Consultations take place conveniently via secure WhatsApp voice or video calls. You can share your diagnostic reports, ultrasound scans, or clear photos in advance. Following your consultation, your customized remedies can be dispatched directly to your doorstep via reliable courier delivery or collected from our Lahore clinic.",
  },
  {
    id: "faq-continue-prescribed-medicines",
    category: "Medications & Safety",
    question: "Can I continue my regular prescribed medicines?",
    answer:
      "Yes, absolutely. You should never stop or alter any conventional medications prescribed by your physician, cardiologist, endocrinologist, or gynaecologist (such as blood pressure tablets, insulin, thyroid hormone, or inhalers) without their direct clinical supervision. Homeopathic remedies are ultra-diluted, non-toxic, and do not chemically interact with conventional pharmaceutical drugs. They work complementarily to support your body's constitutional vitality alongside your standard care.",
  },
  {
    id: "faq-consultation-duration",
    category: "Consultations",
    question: "How long does a consultation take?",
    answer:
      "An initial consultation generally lasts between 25 to 45 minutes, ensuring ample time for detailed case-taking and report reviews. Follow-up reviews are typically scheduled every 3 to 5 weeks and generally take approximately 15 to 20 minutes to assess clinical progress and make any necessary potency adjustments.",
  },
  {
    id: "faq-what-to-share-beforehand",
    category: "Consultations",
    question: "What information should I share before an online consultation?",
    answer:
      "To maximize the value of your consultation, please share recent blood tests (CBC, thyroid panel, fasting glucose, vitamin levels, etc.), ultrasound or MRI imaging reports, a list of all current medications/supplements you are taking, and brief notes on when your symptoms began. For skin or hair concerns, sending clear, high-resolution photographs taken under natural daytime lighting is extremely helpful.",
  },
  {
    id: "faq-emergency-care",
    category: "Medications & Safety",
    question: "When should I seek emergency medical care?",
    answer:
      "Homeopathy is an outpatient, complementary system of supportive care and is not a substitute for emergency hospital medicine. You must immediately call emergency services or visit the nearest hospital emergency room if you experience: sudden crushing chest pain, difficulty breathing, coughing up blood, sudden facial drooping or limb paralysis, high spiking fevers with a stiff neck, sudden severe unyielding abdominal pain, or heavy uncontrolled bleeding.",
  },
  {
    id: "faq-how-to-contact",
    category: "Clinic Information",
    question: "How can I contact the clinic?",
    answer: `You can reach Dr. Noor ul Qamar Homeopathy Care directly by calling ${CLINIC_INFO.phone} or messaging us on WhatsApp at +${CLINIC_INFO.whatsapp}. You can also use the appointment booking form on this website to send your case enquiry directly to our clinic WhatsApp number for prompt scheduling.`,
  },
  {
    id: "faq-clinic-timings",
    category: "Clinic Information",
    question: "What are the clinic timings?",
    answer: `Our clinic operates from ${CLINIC_INFO.clinicTimings}, Monday through Saturday. Both in-clinic appointments at our Lahore address (Noor Street, LDA Avenue 1, Lahore) and scheduled online video/voice consultations are conducted during these hours. Advance appointment booking is recommended to avoid waiting times.`,
  },
  {
    id: "faq-remedy-safety",
    category: "Medications & Safety",
    question: "Are homeopathic remedies safe and free from side effects?",
    answer:
      "When prescribed by a qualified, registered homeopathic practitioner (D.H.M.S, R.H.M.P), classical homeopathic remedies prepared in accordance with official pharmacopoeias are ultra-diluted, non-toxic, non-sedating, and non-habit forming. They are safe for children, adults, and elderly individuals.",
  },
  {
    id: "faq-guarantees",
    category: "Medications & Safety",
    question: "Do you offer guaranteed or permanent cures?",
    answer:
      "No ethical medical professional can offer 100% guarantees or promise 'permanent cures'. Healing is an individualized biological process influenced by the duration and chronicity of the illness, genetic predispositions, lifestyle factors, and compliance. Our clinic is committed to honest, evidence-grounded, and patient-centered homeopathic care with 10 years of clinical experience.",
  },
];
