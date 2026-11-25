import { CLINIC_INFO } from "./clinic-info";

export interface DiseaseKit {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  designedToSupport: string[];
  keyInclusions: string[];
  consultationNote: string;
  suitableFor: string;
  imageAlt: string;
}

export const DISEASE_KITS: DiseaseKit[] = [
  {
    id: "kit-hair-care",
    slug: "hair-care-support-kit",
    title: "Hair Care Support Kit",
    subtitle: "Constitutional Scalp & Follicular Nourishment",
    badge: "Scalp & Follicular Vitality",
    description:
      "A curated, multi-faceted supportive regimen formulated to address chronic diffuse shedding, weak roots, dandruff-prone scalps, and post-illness telogen effluvium.",
    designedToSupport: [
      "Minimizing excessive daily hair fall and root breakage",
      "Balancing dry, flaky, or overly greasy scalp sebum production",
      "Nutrient absorption and micro-circulation to dormant hair follicles",
      "Scalp comfort, soothing itching and follicle irritation",
    ],
    keyInclusions: [
      "Individualized constitutional homeopathic drops (30-day supply)",
      "Gentle biochemic tissue salts for keratin and mineral assimilation",
      "Herbal scalp massage oil formulated with Arnica and Jaborandi extracts",
      "Comprehensive hair nutrition and stress-management guide",
    ],
    consultationNote:
      "Important Note: A personalized clinical consultation with Dr. Noor ul Qamar is required before remedies are dispensed to ensure remedy selection matches your unique constitutional makeup.",
    suitableFor: "Individuals experiencing diffuse hair thinning, stress-induced hair loss, or dry flaky scalps.",
    imageAlt: "Homeopathic Hair Care Support Kit by Dr. Noor ul Qamar",
  },
  {
    id: "kit-skin-wellness",
    slug: "skin-wellness-support-kit",
    title: "Skin Wellness Support Kit",
    subtitle: "Internal Cutaneous Purification & Barrier Harmony",
    badge: "Clear & Balanced Complexion",
    description:
      "Formulated to gently support the skin from the inside out, addressing recurrent acne, eczema flares, cutaneous allergies, and uneven pigmentation without harsh chemicals.",
    designedToSupport: [
      "Calming inflamed cystic, hormonal, and adolescent facial breakouts",
      "Relieving persistent itchiness, dry roughness, and cutaneous sensitivity",
      "Supporting natural hepatic and lymphatic elimination pathways",
      "Promoting healthy, radiant skin renewal and tone balance",
    ],
    keyInclusions: [
      "Personalized constitutional homeopathic remedies (30-day course)",
      "Cellular biochemic tissue salt combination for skin barrier integrity",
      "Gentle soothing external calendula and echinacea topical balm",
      "Anti-inflammatory dietary protocol and skin hydration guide",
    ],
    consultationNote:
      "Important Note: Skin complaints reflect internal systemic patterns. Remedies are carefully tailored following a detailed evaluation of your overall health and medical history.",
    suitableFor: "Patients struggling with stubborn acne, chronic eczema, allergic hives, or post-breakout hyperpigmentation.",
    imageAlt: "Homeopathic Skin Wellness Support Kit by Dr. Noor ul Qamar",
  },
  {
    id: "kit-pcos-wellness",
    slug: "pcos-wellness-support-kit",
    title: "PCOS Wellness Support Kit",
    subtitle: "Endocrine Balance & Natural Ovulatory Rhythm",
    badge: "Hormonal & Cycle Equilibrium",
    description:
      "An integrative constitutional kit designed to gently assist women with polycystic ovarian patterns, irregular cycles, hormonal breakouts, and metabolic sluggishness.",
    designedToSupport: [
      "Encouraging natural, regular ovulatory menstrual cycles",
      "Soothing hormonal acne and moderating androgenic facial hair tendencies",
      "Managing metabolic sluggishness, sugar cravings, and weight stagnation",
      "Supporting pelvic blood flow and emotional tranquility during PMS",
    ],
    keyInclusions: [
      "Deep-acting constitutional remedies selected for your hormonal constitution",
      "Tissue salt combination supporting ovarian and uterine tone",
      "Hormone-supportive lifestyle, sleep, and low-glycemic dietary blueprint",
      "Cycle tracking journal and basal temperature guideline",
    ],
    consultationNote:
      "Important Note: PCOS is a multifaceted endocrine state. A comprehensive case evaluation is mandatory before prescribing to understand your ultrasound imaging, lab work, and cycle history.",
    suitableFor: "Women diagnosed with PCOS, delayed or absent cycles, hormonal breakouts, and premenstrual mood shifts.",
    imageAlt: "Homeopathic PCOS Wellness Support Kit by Dr. Noor ul Qamar",
  },
  {
    id: "kit-digestive-wellness",
    slug: "digestive-wellness-support-kit",
    title: "Digestive Wellness Support Kit",
    subtitle: "Gut-Brain Comfort & Gastrointestinal Ease",
    badge: "Gentle Gastric & Bowel Harmony",
    description:
      "A soothing homeopathic regimen tailored for individuals suffering from chronic acidity, GERD, gas, bloating, sluggish transit, and stress-related irritable bowel symptoms.",
    designedToSupport: [
      "Relieving post-meal bloating, heavy fullness, and sour reflux",
      "Restoring smooth, unforced daily bowel regularity without harsh laxatives",
      "Soothing irritated stomach and intestinal mucosal linings",
      "Calming gut-brain axis sensitivity and nervous belly spasms",
    ],
    keyInclusions: [
      "Constitutional homeopathic carminative and digestive remedies",
      "Biochemic stomach and bowel harmony salts (Mag Phos & Nat Phos)",
      "Digestive enzyme-sparing eating schedule and lifestyle recommendations",
      "Hydration and gut microbiome nurturing guidance",
    ],
    consultationNote:
      "Important Note: Persistent indigestion or bowel habit changes require responsible clinical review. A full consultation is conducted to ensure no red flag symptoms are overlooked.",
    suitableFor: "Individuals troubled by persistent acidity, heartburn, gas, constipation, or spastic irritable bowel symptoms.",
    imageAlt: "Homeopathic Digestive Wellness Support Kit by Dr. Noor ul Qamar",
  },
  {
    id: "kit-respiratory-care",
    slug: "respiratory-care-support-kit",
    title: "Respiratory Care Support Kit",
    subtitle: "Bronchial Ease & Seasonal Allergen Desensitization",
    badge: "Clear Breathing & Sinus Comfort",
    description:
      "A gentle, non-drowsy constitutional kit designed to soothe morning sneezing fits, sinus pressure, catarrh, chest tightness, and seasonal respiratory sensitivities.",
    designedToSupport: [
      "Reducing morning sneezing paroxysms and clear watery nasal discharge",
      "Clearing blocked sinuses, facial heaviness, and sticky post-nasal drip",
      "Soothing tickling, dry coughs, and easing bronchial expectoration",
      "Strengthening mucosal resilience against dust, cold air, and pollen changes",
    ],
    keyInclusions: [
      "Personalized constitutional anti-allergy homeopathic remedies",
      "Tissue salt respiratory combination for sinus and mucosal health (Ferrum Phos & Kali Mur)",
      "Steam inhalation and natural respiratory soothing protocol",
      "Indoor air quality and seasonal desensitization guidelines",
    ],
    consultationNote:
      "Important Note: Acute severe breathlessness or asthma attacks require immediate medical evaluation. Remedies in this kit are supportive and prescribed after clinical review.",
    suitableFor: "Patients troubled by allergic rhinitis, recurring sinusitis, chronic morning sneezing, or sensitive bronchial airways.",
    imageAlt: "Homeopathic Respiratory Care Support Kit by Dr. Noor ul Qamar",
  },
  {
    id: "kit-joint-care",
    slug: "joint-care-support-kit",
    title: "Joint Care Support Kit",
    subtitle: "Musculoskeletal Comfort & Mobility Support",
    badge: "Flexible Joints & Easy Movement",
    description:
      "An integrative homeopathic care kit formulated to soothe morning joint stiffness, knee discomfort, back strain, and weather-sensitive aches without gastric upset.",
    designedToSupport: [
      "Easing morning stiffness and improving joint flexibility and movement",
      "Soothing aching knees, hips, shoulders, and lower lumbar muscles",
      "Supporting comfortable walking and stair navigation",
      "Gentle anti-inflammatory action that does not irritate the stomach lining",
    ],
    keyInclusions: [
      "Deep constitutional joint and connective tissue homeopathic remedies",
      "Biochemic mineral combination for bone and cartilage support (Calc Fluor & Silicea)",
      "External soothing herbal oil blend (Rhus Tox and Gaultheria) for localized relief",
      "Joint preservation exercises, posture guidance, and hydration plan",
    ],
    consultationNote:
      "Important Note: Joint pain can arise from osteoarthritis, high uric acid, or autoimmune conditions. A personalized consultation is needed to pinpoint the exact underlying etiology.",
    suitableFor: "Individuals experiencing knee stiffness, age-related wear-and-tear, lower back stiffness, or weather-aggravated joint aches.",
    imageAlt: "Homeopathic Joint Care Support Kit by Dr. Noor ul Qamar",
  },
];

export function getKitWhatsAppUrl(kitTitle: string): string {
  const message = [
    `*Disease Kit Enquiry — Dr. Noor ul Qamar Homeopathy Care*`,
    ``,
    `Hello Dr. Noor ul Qamar,`,
    `I am interested in learning more about the *${kitTitle}*.`,
    `Could you please guide me on how to book a consultation to see if this supportive kit is suitable for my health condition?`,
    ``,
    `Thank you!`,
  ].join("\n");

  return `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}
