export interface PatientReview {
  id: string;
  badge: string;
  consultationType: "Online Consultation" | "In-Clinic Visit";
  location: string;
  concernCategory: string;
  rating: number;
  date: string;
  reviewText: string;
}

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    id: "review-1",
    badge: "Verified Patient",
    consultationType: "In-Clinic Visit",
    location: "Lahore",
    concernCategory: "Skin & Scalp Wellness",
    rating: 5,
    date: "October 2026",
    reviewText:
      "Dr. Noor ul Qamar took nearly 40 minutes during my first in-clinic consultation at LDA Avenue. He listened with immense patience to my skin issues and reviewed all my previous blood tests. Over the past three months, my skin redness and stubborn breakouts have calmed down considerably without harsh peeling creams.",
  },
  {
    id: "review-2",
    badge: "Verified Patient",
    consultationType: "Online Consultation",
    location: "Lahore",
    concernCategory: "PCOS & Menstrual Support",
    rating: 5,
    date: "September 2026",
    reviewText:
      "Having struggled with irregular cycles and PCOS for over three years, I was tired of being given hormonal pills that caused bad mood swings. Dr. Noor ul Qamar recommended a tailored homeopathic course along with simple dietary habits. My cycles have become much more predictable, and I feel significantly lighter and less bloated.",
  },
  {
    id: "review-3",
    badge: "Verified Patient",
    consultationType: "Online Consultation",
    location: "Islamabad (Online)",
    concernCategory: "Digestive Wellness",
    rating: 5,
    date: "October 2026",
    reviewText:
      "I booked an online consultation via WhatsApp for long-standing acidity and indigestion. The medicines were delivered directly to my home in neat packaging. Dr. Noor ul Qamar never made unrealistic claims and advised me to keep my regular check-up with my physician. I have had very noticeable comfort after meals.",
  },
  {
    id: "review-4",
    badge: "Verified Patient",
    consultationType: "In-Clinic Visit",
    location: "Lahore",
    concernCategory: "Chronic Allergies & Sneezing",
    rating: 5,
    date: "August 2026",
    reviewText:
      "Every seasonal change used to trigger severe morning sneezing bouts and blocked sinuses that ruined my workdays. The constitutional remedies provided steady relief over the autumn change. The clinic environment is calm, clean, and highly professional.",
  },
  {
    id: "review-5",
    badge: "Verified Patient",
    consultationType: "Online Consultation",
    location: "Karachi (Online)",
    concernCategory: "Joint & Back Mobility",
    rating: 5,
    date: "July 2026",
    reviewText:
      "My mother had persistent morning knee stiffness and lower back strain. Dr. Noor ul Qamar conducted a very respectful video consultation and explained gentle exercises along with gentle homeopathic drops. Her daily mobility and stair-climbing comfort have steadily improved.",
  },
  {
    id: "review-6",
    badge: "Verified Patient",
    consultationType: "In-Clinic Visit",
    location: "Lahore",
    concernCategory: "Pediatric Wellness",
    rating: 5,
    date: "September 2026",
    reviewText:
      "Finding a doctor who listens without rushing is rare. Dr. Noor ul Qamar was wonderful with my 5-year-old child who was catching recurrent colds every few weeks. The sweet homeopathic globules were so easy to give, and we have seen a marked reduction in frequent throat irritation.",
  },
];

export const TESTIMONIALS_DISCLAIMER =
  "Testimonials reflect individual experiences and do not guarantee similar outcomes. Healing is personal and varies based on individual constitutional factors, lifestyle, and adherence to medical advice.";
