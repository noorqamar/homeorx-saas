export type TreatmentCategory =
  | "Women's Health"
  | "Skin & Hair"
  | "Digestive Health"
  | "Respiratory Health"
  | "Joint & Pain Care"
  | "Men's Health"
  | "Child Health"
  | "General Wellness";

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  slug: string;
  title: string;
  category: TreatmentCategory;
  shortDescription: string;
  commonConcerns: string[];
  howConsultationWorks: {
    step: string;
    description: string;
  }[];
  whenToSeekUrgentCare: string[];
  faqs: TreatmentFAQ[];
  metaDescription: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  supportingImage?: string;
  supportingImageAlt?: string;
  supportingImageCaption?: string;
}

export function getTreatmentPrimaryImage(slug: string): string {
  return `/images/treatments/${slug}-primary.webp`;
}

export function getTreatmentSecondaryImage(slug: string): string {
  return `/images/treatments/${slug}-secondary.webp`;
}

export function getCategoryImageUrl(slug: string): string {
  return `/images/categories/${slug}.webp`;
}

export const TREATMENT_CATEGORIES: {
  name: TreatmentCategory;
  slug: string;
  description: string;
  iconName: string;
}[] = [
  {
    name: "Women's Health",
    slug: "womens-health",
    description: "Supportive homeopathic care for PCOS, menstrual irregularities, fertility wellbeing, and hormonal balance.",
    iconName: "HeartHandshake",
  },
  {
    name: "Skin & Hair",
    slug: "skin-and-hair",
    description: "Holistic constitutional management for acne, eczema, psoriasis, alopecia, and chronic dermatological concerns.",
    iconName: "Sparkles",
  },
  {
    name: "Digestive Health",
    slug: "digestive-health",
    description: "Individualized support for acidity, IBS, chronic constipation, gastritis, and digestive system harmony.",
    iconName: "Activity",
  },
  {
    name: "Respiratory Health",
    slug: "respiratory-health",
    description: "Gentle therapies for allergic rhinitis, asthma support, chronic sinusitis, bronchitis, and seasonal sensitivities.",
    iconName: "Wind",
  },
  {
    name: "Joint & Pain Care",
    slug: "joint-and-pain-care",
    description: "Care plans for osteoarthritis, sciatica, back ache, gout, and systemic musculoskeletal stiffness.",
    iconName: "Bone",
  },
  {
    name: "Men's Health",
    slug: "mens-health",
    description: "Confidential and empathetic consultations for vitality, prostate wellness, and stress-induced concerns.",
    iconName: "Shield",
  },
  {
    name: "Child Health",
    slug: "child-health",
    description: "Gentle, non-invasive homeopathic care for pediatric recurrent colds, teething, digestion, and immunity support.",
    iconName: "Smile",
  },
  {
    name: "General Wellness",
    slug: "general-wellness",
    description: "Whole-person lifestyle and homeopathic constitutional support for sleep, anxiety, metabolic vitality, and fatigue.",
    iconName: "Sun",
  },
];

export const TREATMENTS: Treatment[] = [
  // --- SKIN & HAIR ---
  {
    slug: "hair-loss",
    title: "Hair Loss",
    category: "Skin & Hair",
    featured: true,
    shortDescription: "Personalized constitutional evaluation to address excessive shedding, hormonal triggers, and scalp vitality.",
    commonConcerns: [
      "Diffuse thinning across the crown and parting",
      "Post-illness or post-partum sudden hair shedding (telogen effluvium)",
      "Receding hairline or genetic thinning tendencies",
      "Nutritional, stress, or thyroid-related hair fall",
    ],
    howConsultationWorks: [
      { step: "Detailed Hair & Scalp History", description: "Reviewing onset timeline, family history, blood work (iron, ferritin, thyroid, vitamins), and previous treatments." },
      { step: "Constitutional Profiling", description: "Evaluating stress levels, dietary patterns, sleep quality, and systemic vitality factors." },
      { step: "Individualized Remedy Prescription", description: "Selecting precise homeopathic remedies matching your overall constitution rather than generic hair oils." },
      { step: "Progressive Monitoring", description: "Scheduled follow-ups every 4-6 weeks to observe hair root strength, density improvements, and systemic wellness." },
    ],
    whenToSeekUrgentCare: [
      "Rapid total body hair shedding accompanied by systemic rash or severe fatigue",
      "Infected, crusting, or painful scalp lesions with active purulent discharge",
      "Suspected acute autoimmune flares requiring urgent dermatological biopsy",
    ],
    faqs: [
      { question: "How long does it take to see positive changes in hair fall?", answer: "Hair growth cycles take time. Patients typically observe a reduction in active shedding within 6 to 8 weeks, followed by gradual texture and density improvement over 3 to 6 months." },
      { question: "Do I need to stop minoxidil or prescribed topical treatments?", answer: "No. You should never stop prescribed medical treatments abruptly without discussing it with your dermatologist. Homeopathic care can be integrated safely alongside your current regimen." },
      { question: "Are homeopathic remedies safe for hair fall?", answer: "Yes, constitutional homeopathic remedies are ultra-diluted, non-toxic, and free from synthetic hormone disruptors when prescribed by a qualified homeopath." },
    ],
    metaDescription: "Consult Dr. Noor ul Qamar in Lahore for thoughtful homeopathic hair loss care. Natural, constitutional support for shedding and scalp wellness.",
  },
  {
    slug: "alopecia-areata",
    title: "Alopecia Areata",
    category: "Skin & Hair",
    shortDescription: "Gentle autoimmune and constitutional support addressing circular bald patches and immune balance.",
    commonConcerns: [
      "Sudden onset of round, smooth bald patches on the scalp or beard",
      "Enlarging patches with exclamation mark hairs at the periphery",
      "Emotional stress triggering cyclical patch formation",
    ],
    howConsultationWorks: [
      { step: "Immune & Emotional Assessment", description: "Assessing acute emotional triggers, grief, shock, or metabolic shifts preceding hair patch appearance." },
      { step: "Scalp Surface Mapping", description: "Documenting patch size, active follicular margins, and presence of peach fuzz or regrowth." },
      { step: "Deep Constitutional Selection", description: "Targeting internal immune equilibrium through personalized constitutional homeopathy." },
      { step: "Regular Photographic Follow-up", description: "Tracking follicular repigmentation and fine hair progression across months." },
    ],
    whenToSeekUrgentCare: [
      "Rapid progression to Alopecia Totalis (entire scalp) or Universalis (entire body)",
      "Associated nail pitting or severe autoimmune symptoms (joint inflammation, extreme weakness)",
    ],
    faqs: [
      { question: "Can homeopathy help autoimmune patch hair loss?", answer: "Homeopathy works holistically to support your body's self-regulatory immune mechanisms and manage underlying nervous stress that often correlates with autoimmune flare-ups." },
      { question: "Can I receive online consultations for alopecia?", answer: "Yes. High-resolution photographs along with a thorough video or audio case intake allow Dr. Noor ul Qamar to assess your condition effectively." },
    ],
    metaDescription: "Homeopathic support for alopecia areata with Dr. Noor ul Qamar, Lahore. Gentle immune-supportive care for circular bald patches.",
  },
  {
    slug: "dandruff-scalp-concerns",
    title: "Dandruff & Scalp Concerns",
    category: "Skin & Hair",
    shortDescription: "Individualized remedies addressing seborrhoeic scales, stubborn flaking, redness, and scalp irritation.",
    commonConcerns: [
      "Persistent greasy or dry white flakes that return after medicated shampoos",
      "Scalp itching, redness, burning sensations, and soreness",
      "Aggravation during seasonal transitions or high-stress periods",
    ],
    howConsultationWorks: [
      { step: "Scalp Sebaceous Evaluation", description: "Distinguishing between dry pityriasis and oily seborrhoeic dermatitis with microbial overgrowth tendencies." },
      { step: "Modality Mapping", description: "Noting aggravating factors (humidity, cold air, dietary sugars, specific hair oils)." },
      { step: "Targeted Constitutional Remedy", description: "Prescribing deep-acting natural remedies to restore the scalp's microbiome balance." },
      { step: "Gentle Hair Care Guidance", description: "Advising on mild, sulfate-free washing habits that protect the scalp barrier." },
    ],
    whenToSeekUrgentCare: [
      "Spreading facial or eyelid swelling, intense pain, or oozing yellow crusts",
      "High fever accompanied by tender cervical lymph node swelling",
    ],
    faqs: [
      { question: "Why does my dandruff keep returning?", answer: "Dandruff is frequently tied to constitutional sebaceous balance and internal immunity rather than external hygiene alone. Homeopathy addresses internal susceptibility." },
      { question: "Can I continue anti-fungal shampoos during treatment?", answer: "Yes, you may use gentle maintenance washes as recommended by your primary doctor while constitutional remedies work internally." },
    ],
    metaDescription: "Long-term relief from chronic dandruff and seborrhoeic scalp concerns through constitutional homeopathy with Dr. Noor ul Qamar.",
  },
  {
    slug: "acne",
    title: "Acne",
    category: "Skin & Hair",
    featured: true,
    shortDescription: "Holistic care for adolescent, hormonal, cystic, and adult acne focusing on systemic purification and balance.",
    commonConcerns: [
      "Painful, deep cystic nodules on jawline, cheeks, and back",
      "Premenstrual breakouts and hormonal flare-ups",
      "Persistent post-inflammatory erythema and scarring",
      "Excessive sebum production with blackheads and whiteheads",
    ],
    howConsultationWorks: [
      { step: "Hormonal & Digestive Review", description: "Connecting skin breakouts to gut motility, liver processing, menstrual regularity, and dietary sensitivities." },
      { step: "Lesion Characterization", description: "Careful differentiation of papular, pustular, comedonal, and nodulocystic presentations." },
      { step: "Constitutional Remedy Matching", description: "Selecting remedies that stimulate natural drainage and calm cutaneous inflammation." },
      { step: "Long-Term Skin Barrier Support", description: "Minimizing harsh topicals that strip the skin barrier while supporting clear complexion." },
    ],
    whenToSeekUrgentCare: [
      "Severe cellulitis of the face with rapidly spreading redness, warmth, and high fever",
      "Sudden painful facial swelling near the eyes or cavernous sinus area",
    ],
    faqs: [
      { question: "Does homeopathy offer an alternative to strong medications like isotretinoin?", answer: "Homeopathy offers a gentle, non-toxic option especially suited for mild to moderate and hormonal acne. For extremely severe scarring cystic acne, we collaborate respectfully with dermatological advice." },
      { question: "How does diet relate to acne in homeopathy?", answer: "Diet is an integral part of case taking. We guide patients on identifying personal food triggers while treating internal metabolic vitality." },
    ],
    metaDescription: "Gentle, non-toxic homeopathic acne treatment in Lahore by Dr. Noor ul Qamar. Hormonal and cystic acne care with 10 years experience.",
  },
  {
    slug: "eczema",
    title: "Eczema",
    category: "Skin & Hair",
    shortDescription: "Gentle constitutional treatment for atopic dermatitis, dry itchy patches, and skin barrier sensitivity.",
    commonConcerns: [
      "Intense nocturnal itching leading to lichenification and sleep disruption",
      "Dry, cracked, erythematous patches on flexural folds (elbows, knees, neck)",
      "Frequent flare-ups triggered by sweat, wool, soaps, or seasonal dryness",
    ],
    howConsultationWorks: [
      { step: "Atopic Diathesis Exploration", description: "Reviewing personal and familial history of asthma, allergic rhinitis, and cutaneous sensitivity." },
      { step: "Itch & Moisture Modalities", description: "Determining whether complaints worsen with cold, warmth, water exposure, or nighttime." },
      { step: "Non-Suppressant Remedy Selection", description: "Providing gentle homeopathic remedies that soothe the skin from within without suppression." },
      { step: "Barrier Preservation Strategy", description: "Guiding non-irritating emollient application and environmental allergen reduction." },
    ],
    whenToSeekUrgentCare: [
      "Signs of secondary bacterial infection (honey-colored crusts, oozing pus, cellulitis)",
      "Eczema herpeticum (painful blister clusters with fever), which is a medical emergency",
    ],
    faqs: [
      { question: "Can I use moisturizers while taking homeopathic remedies?", answer: "Absolutely. Maintaining a healthy external skin barrier with plain, fragrance-free emollients is vital for eczema patients." },
      { question: "Will homeopathy cause an initial aggravation?", answer: "In experienced hands with proper dosage adjustment, severe aggravations are rare. We start conservatively to ensure gentle relief." },
    ],
    metaDescription: "Constitutional homeopathic care for chronic eczema and atopic dermatitis with Dr. Noor ul Qamar, Lahore. Calm itchy, dry skin naturally.",
  },
  {
    slug: "psoriasis",
    title: "Psoriasis",
    category: "Skin & Hair",
    shortDescription: "Long-term constitutional management for plaque psoriasis, guttate flares, and scaling skin conditions.",
    commonConcerns: [
      "Thick, silvery-scaled erythematous plaques on elbows, knees, scalp, or lumbosacral region",
      "Painful cracking, bleeding, and localized pruritus",
      "Joint stiffness or aches accompanying skin flares (psoriatic arthritis risk)",
      "Emotional stress triggering sudden flare-ups",
    ],
    howConsultationWorks: [
      { step: "Systemic Immune Mapping", description: "Evaluating metabolic health, stress load, previous corticosteroid usage, and family history." },
      { step: "Plaque Quality & Distribution", description: "Assessing plaque thickness, Auspitz sign history, and seasonal variations." },
      { step: "Deep Constitutional Selection", description: "Administering individualized remedies that moderate cellular hyperproliferation." },
      { step: "Joint & Skin Co-Monitoring", description: "Regular screening for peripheral joint stiffness alongside dermatological tracking." },
    ],
    whenToSeekUrgentCare: [
      "Erythrodermic psoriasis covering more than 90% of the body surface with chills and fluid loss",
      "Generalized pustular psoriasis with widespread sterile pustules and high fever",
    ],
    faqs: [
      { question: "Can psoriasis be managed long-term with homeopathy?", answer: "Psoriasis is a chronic systemic condition. Homeopathy aims to reduce the severity and frequency of flare-ups, soothe itching, and prolong remission periods." },
      { question: "Should I stop my immunosuppressant medications?", answer: "No. Never stop biologics, methotrexate, or topical steroids without the explicit guidance of your prescribing rheumatologist or dermatologist." },
    ],
    metaDescription: "Psoriasis constitutional care with Dr. Noor ul Qamar Homeopathy Care, Lahore. Long-term management of silvery plaques and skin comfort.",
  },
  {
    slug: "skin-allergy",
    title: "Skin Allergy",
    category: "Skin & Hair",
    shortDescription: "Constitutional remedies for acute and chronic urticaria, contact dermatitis, and histamine reactivity.",
    commonConcerns: [
      "Sudden raised, red, warm wheals (hives) that shift locations rapidly",
      "Intense prickling, burning, and itching sensations",
      "Reactions triggered by temperature changes, pressure, foods, or emotional stress",
    ],
    howConsultationWorks: [
      { step: "Trigger Identification", description: "Reviewing food journals, medications, soaps, thermal triggers (cold/heat), and stress patterns." },
      { step: "Symptom Modality Profile", description: "Noting whether bathing, cool air, warmth, or pressure alleviates or worsens the wheals." },
      { step: "Individualized Prescription", description: "Selecting remedies aimed at desensitizing hyper-reactive cutaneous histamine response." },
      { step: "Reactivity Tapering Follow-up", description: "Monitoring reduction in flare frequency and antihistamine dependence over time." },
    ],
    whenToSeekUrgentCare: [
      "Swelling of the lips, tongue, throat, or difficulty breathing (Anaphylaxis is an immediate 911/ER emergency)",
      "Dizziness, lightheadedness, or sudden drop in blood pressure during a flare",
    ],
    faqs: [
      { question: "Can homeopathy help chronic hives that last for months?", answer: "Yes, chronic spontaneous urticaria is one of the conditions where constitutional homeopathy often provides substantial long-term stabilization." },
    ],
    metaDescription: "Holistic skin allergy and urticaria treatment in Lahore by Dr. Noor ul Qamar. Natural desensitization for chronic hives and itching.",
  },
  {
    slug: "lichen-planus",
    title: "Lichen Planus",
    category: "Skin & Hair",
    shortDescription: "Careful constitutional support for pruritic, polygonal, violaceous papules on skin and oral mucosa.",
    commonConcerns: [
      "Intensely itchy, flat-topped purple papules on wrists, ankles, and lumbar area",
      "Lacy white Wickham striae in the mouth or painful erosive oral lesions",
      "Post-inflammatory hyperpigmentation persisting after lesions resolve",
    ],
    howConsultationWorks: [
      { step: "Cutaneous & Mucosal Inspection", description: "Differentiating between cutaneous, oral, hypertrophic, and follicular presentations." },
      { step: "Constitutional Case Taking", description: "Exploring liver vitality, past pharmaceutical exposures, and chronic psychological stress." },
      { step: "Soothing Remedy Selection", description: "Prescribing gentle remedies to arrest active papule formation and relieve pruritus." },
      { step: "Periodic Oral Surveillance", description: "Advising regular dental checks for oral lichen planus alongside homeopathic care." },
    ],
    whenToSeekUrgentCare: [
      "Severe oral ulcerations preventing adequate oral fluid and nutrition intake",
      "Rapidly ulcerating or non-healing oral lesions requiring specialist biopsy",
    ],
    faqs: [
      { question: "Is Lichen Planus contagious?", answer: "No, Lichen Planus is an inflammatory condition and is completely non-contagious. Homeopathy focuses on restoring internal harmony." },
    ],
    metaDescription: "Lichen Planus care with Dr. Noor ul Qamar, Lahore. Soothing constitutional care for itchy violaceous papules and oral lesions.",
  },
  {
    slug: "vitiligo",
    title: "Vitiligo",
    category: "Skin & Hair",
    shortDescription: "Supportive constitutional approach addressing depigmented macules and melanocyte vitality.",
    commonConcerns: [
      "Milky-white macules appearing symmetrically on hands, face, or periorificial areas",
      "Spreading patches following physical trauma or severe emotional stress (Koebner phenomenon)",
      "Psychological distress and social self-consciousness",
    ],
    howConsultationWorks: [
      { step: "Patch Activity Assessment", description: "Determining whether patches are active, spreading, or stable, and reviewing family history of thyroid or vitiligo." },
      { step: "Deep Constitutional Formulation", description: "Targeting internal immune stability and metabolic balance to halt active depigmentation." },
      { step: "Repigmentation Tracking", description: "Monitoring perifollicular repigmentation islands over a structured 6-to-12-month period." },
      { step: "Sun Protection & Mental Wellness Support", description: "Guiding safe sun habits and providing compassionate emotional support." },
    ],
    whenToSeekUrgentCare: [
      "Rapidly spreading lesions accompanied by severe sunburn or blistering on depigmented skin",
    ],
    faqs: [
      { question: "Does homeopathy promise 100% cure for vitiligo?", answer: "Responsible practitioners do not promise guaranteed repigmentation. Homeopathy aims to stabilize active spread and encourage natural repigmentation where viable melanocytes remain." },
    ],
    metaDescription: "Thoughtful vitiligo care in Lahore with Dr. Noor ul Qamar. Constitutional support to stabilize patches and encourage healthy pigmentation.",
  },
  {
    slug: "hyperpigmentation-melasma",
    title: "Hyperpigmentation / Melasma",
    category: "Skin & Hair",
    shortDescription: "Gentle internal therapies for hormonal pigmentation, dark patches, and sun-induced melasma.",
    commonConcerns: [
      "Symmetrical brown or grayish patches on cheeks, bridge of nose, forehead, and upper lip",
      "Flare-ups triggered by sun exposure, pregnancy (chloasma), or oral contraceptives",
      "Rebound pigmentation after harsh chemical peels or hydroquinone creams",
    ],
    howConsultationWorks: [
      { step: "Hormonal & Lifestyle Assessment", description: "Evaluating reproductive history, thyroid health, sun habits, and previous topical usage." },
      { step: "Metabolic Harmony Remedy", description: "Selecting constitutional remedies that gently support liver detoxification and endocrine equilibrium." },
      { step: "Safe Topical Guidance", description: "Recommending broad-spectrum mineral sunscreens and gentle barrier-repair routines." },
      { step: "Gradual Tone Review", description: "Assessing fading of hyperpigmented borders over consecutive follow-up consultations." },
    ],
    whenToSeekUrgentCare: [
      "Any pigmented mole showing asymmetry, irregular borders, varied color, or diameter > 6mm (ABCDE rule for melanoma check)",
    ],
    faqs: [
      { question: "Can homeopathy lighten stubborn melasma without harsh peeling?", answer: "Yes, homeopathy approaches melasma internally by balancing hormonal pathways and cellular vitality, avoiding rebound hyperpigmentation." },
    ],
    metaDescription: "Natural melasma and hyperpigmentation care with Dr. Noor ul Qamar, Lahore. Gentle internal balancing for clear, radiant skin.",
  },

  // --- WOMEN'S HEALTH ---
  {
    slug: "pcos",
    title: "PCOS (Polycystic Ovary Syndrome)",
    category: "Women's Health",
    featured: true,
    shortDescription: "Comprehensive constitutional care addressing irregular cycles, hirsutism, insulin resistance, and ovarian vitality.",
    commonConcerns: [
      "Oligomenorrhoea or absent cycles lasting months",
      "Unwanted facial hair growth, cystic acne, and scalp hair thinning",
      "Weight gain, cravings, and difficulty managing body mass index",
      "Multiple small peripheral follicles on pelvic ultrasound scan",
    ],
    howConsultationWorks: [
      { step: "Endocrine Profile Review", description: "Reviewing ultrasound imaging, LH:FSH ratios, androgens, prolactin, fasting insulin, and thyroid panels." },
      { step: "Ovulatory Cycle Mapping", description: "Analyzing menstrual flow characteristics, PMS symptoms, and ovulation markers." },
      { step: "Constitutional Remedy Selection", description: "Prescribing deep-acting remedies that help restore natural hypothalamic-pituitary-ovarian axis rhythm." },
      { step: "Lifestyle & Metabolic Coaching", description: "Aligning gentle remedies with low-glycemic nutrition, resistance exercise, and sleep hygiene." },
    ],
    whenToSeekUrgentCare: [
      "Sudden severe unilateral pelvic pain (risk of ovarian torsion or ruptured cyst)",
      "Extremely heavy vaginal bleeding soaking through more than two maxi pads per hour for consecutive hours",
    ],
    faqs: [
      { question: "Can homeopathy regularize periods without birth control pills?", answer: "Yes. Rather than supplying synthetic hormones that induce withdrawal bleeds, constitutional homeopathy works to stimulate natural ovarian ovulatory cycles." },
      { question: "Is homeopathy helpful for PCOS-related fertility concerns?", answer: "Many patients experience improved cycle regularity and ovulation through individualized care, which is foundational for natural conception." },
    ],
    metaDescription: "Leading PCOS homeopathic doctor in Lahore, Dr. Noor ul Qamar. Natural treatment for irregular cycles, hormonal acne, and fertility support.",
  },
  {
    slug: "irregular-periods",
    title: "Irregular Periods",
    category: "Women's Health",
    shortDescription: "Individualized support for delayed, frequent, painful, or scanty menstrual cycles.",
    commonConcerns: [
      "Cycles arriving every 45 to 90 days or fluctuating unpredictably",
      "Extremely light spotting or excessively prolonged bleeding",
      "Severe premenstrual mood changes, bloating, and breast tenderness",
    ],
    howConsultationWorks: [
      { step: "Cycle Timeline Logging", description: "Documenting cycle length variability, flow volume, clot formation, and accompanying pains." },
      { step: "Stress & Endocrine Evaluation", description: "Reviewing emotional stress, travel, nutritional status, and thyroid function." },
      { step: "Regulating Homeopathic Prescription", description: "Selecting gentle remedies matching your specific hormonal rhythm and physical constitution." },
      { step: "Monthly Cycle Assessment", description: "Tracking cycle stabilization over 3 to 4 consecutive menstrual cycles." },
    ],
    whenToSeekUrgentCare: [
      "Post-menopausal vaginal bleeding or unexpected spotting after a full year without periods",
      "Severe dizziness, fainting, or pale lips accompanying unusually heavy menstrual flooding",
    ],
    faqs: [
      { question: "How many months of treatment are typically recommended?", answer: "Hormonal cycles generally require 3 to 6 months of consistent observation and tailored homeopathic care for sustainable regularity." },
    ],
    metaDescription: "Care for irregular periods with Dr. Noor ul Qamar in Lahore. Restore natural menstrual rhythm with gentle homeopathic solutions.",
  },
  {
    slug: "leucorrhoea",
    title: "Leucorrhoea",
    category: "Women's Health",
    shortDescription: "Gentle homeopathic therapies for chronic, bothersome vaginal discharge and pelvic discomfort.",
    commonConcerns: [
      "Excessive whitish, yellowish, or thick vaginal discharge",
      "Associated backache, pelvic heaviness, weakness, and fatigue",
      "Vulvovaginal irritation, itching, or burning sensations",
    ],
    howConsultationWorks: [
      { step: "Discharge Characterization", description: "Noting color, consistency, odor, modalities (worse before/after menses), and accompanying symptoms." },
      { step: "Infection Screening Guidance", description: "Recommending conventional swabs or examinations when bacterial vaginosis or yeast is suspected." },
      { step: "Mucous Membrane Balancing Remedy", description: "Administering constitutional remedies to tone pelvic tissues and relieve chronic inflammation." },
      { step: "Hygiene & Flora Preservation", description: "Guiding patients away from harsh chemical douches to preserve protective vaginal flora." },
    ],
    whenToSeekUrgentCare: [
      "Foul-smelling bloody discharge accompanied by fever, chills, and lower abdominal rigidity",
      "Acute pelvic inflammatory disease (PID) signs requiring emergency antibiotic intervention",
    ],
    faqs: [
      { question: "Is all white discharge abnormal?", answer: "No, physiological discharge varies throughout the cycle. Homeopathy is indicated when discharge is excessive, irritating, stained, or accompanied by weakness." },
    ],
    metaDescription: "Relief from chronic leucorrhoea and pelvic weakness through homeopathic care with Dr. Noor ul Qamar, Lahore.",
  },
  {
    slug: "uterine-fibroids",
    title: "Uterine Fibroids",
    category: "Women's Health",
    shortDescription: "Supportive homeopathic care to manage heavy bleeding, pelvic pressure, and fibroid-related discomfort.",
    commonConcerns: [
      "Menorrhagia (excessive menstrual bleeding with large clots)",
      "Pelvic fullness, dull aching, and frequent urination due to bladder pressure",
      "Secondary iron-deficiency anaemia and severe exhaustion",
    ],
    howConsultationWorks: [
      { step: "Ultrasound & Pelvic Audit", description: "Reviewing fibroid dimensions (intramural, subserosal, submucosal) and endometrial thickness." },
      { step: "Haemostatic & Tonal Prescription", description: "Selecting remedies aimed at moderating blood loss and relieving pelvic congestion." },
      { step: "Iron & Vitality Strategy", description: "Supporting haematopoiesis in collaboration with dietary iron and supplementation." },
      { step: "Follow-up Pelvic Imaging", description: "Re-evaluating symptoms and periodic repeat scans to track stabilization." },
    ],
    whenToSeekUrgentCare: [
      "Acute severe pelvic pain due to fibroid torsion or red degeneration",
      "Bleeding causing acute haemodynamic compromise, palpitations, and near-syncope",
    ],
    faqs: [
      { question: "Can homeopathy melt large fibroids?", answer: "Homeopathy primarily focuses on controlling excessive bleeding, relieving pain, and halting progressive growth. Surgical assessment remains essential for very large or obstructing fibroids." },
    ],
    metaDescription: "Homeopathic management for uterine fibroid symptoms, heavy periods, and pelvic pressure with Dr. Noor ul Qamar, Lahore.",
  },
  {
    slug: "endometriosis-support",
    title: "Endometriosis Support",
    category: "Women's Health",
    shortDescription: "Comprehensive supportive care for pelvic pain, dysmenorrhoea, and inflammatory comfort.",
    commonConcerns: [
      "Debilitating menstrual cramps (dysmenorrhoea) starting days before the cycle",
      "Deep pelvic pain during intercourse (dyspareunia) or bowel movements (dyschezia)",
      "Chronic pelvic inflammation and associated fertility challenges",
    ],
    howConsultationWorks: [
      { step: "Pain Profile & Cycle Charting", description: "Documenting the exact character of pelvic pain, radiation to thighs, and analgesic usage." },
      { step: "Anti-Inflammatory Constitutional Selection", description: "Prescribing deep remedies to ease tissue congestion and lessen inflammatory spasms." },
      { step: "Holistic Gut-Pelvis Optimization", description: "Addressing coexisting bowel irritability and reducing inflammatory dietary triggers." },
      { step: "Long-Term Quality of Life Review", description: "Focusing on reducing pain scale ratings and improving daily functional capacity." },
    ],
    whenToSeekUrgentCare: [
      "Sudden unbearable pelvic pain indicating possible endometrioma rupture or appendicitis",
      "Acute intestinal obstruction with vomiting and inability to pass gas",
    ],
    faqs: [
      { question: "Can I take homeopathy alongside my prescribed pain medications?", answer: "Yes, you can safely combine supportive homeopathic remedies with prescribed analgesics or hormonal therapies." },
    ],
    metaDescription: "Compassionate homeopathic endometriosis pain support with Dr. Noor ul Qamar, Lahore. Relieve severe menstrual cramps and pelvic discomfort.",
  },
  {
    slug: "female-infertility-support",
    title: "Female Infertility Support",
    category: "Women's Health",
    featured: true,
    shortDescription: "Gentle, non-invasive constitutional support optimizing reproductive vitality and emotional wellbeing.",
    commonConcerns: [
      "Difficulty conceiving after 12+ months of regular unprotected intercourse",
      "Ovulatory dysfunction, luteal phase defect, or thin endometrial lining",
      "High emotional anxiety, stress, and societal pressure",
    ],
    howConsultationWorks: [
      { step: "Comprehensive Couple Case History", description: "Reviewing semen analysis, HSG tubal patency, AMH, prolactin, and ovulation tracking." },
      { step: "Endometrial & Ovulatory Tone", description: "Selecting constitutional homeopathic remedies to encourage healthy follicle maturation and receptive lining." },
      { step: "Stress & Mind-Body Regulation", description: "Relieving autonomic nervous tension which can impede microcirculation to reproductive organs." },
      { step: "Coordinated Timed Intercourse Guidance", description: "Providing calm, scientific guidance on fertile windows and healthy living." },
    ],
    whenToSeekUrgentCare: [
      "Positive pregnancy test with unilateral sharp pelvic pain or spotting (suspected ectopic pregnancy requires emergency ER care)",
    ],
    faqs: [
      { question: "Is homeopathic fertility support safe?", answer: "Yes, remedies are prepared from ultra-diluted natural sources and do not introduce synthetic steroids or ovarian hyperstimulation risks." },
      { question: "Does Dr. Noor ul Qamar treat both partners?", answer: "Yes. Infertility is a journey of both partners, and optimizing male semen parameters is addressed simultaneously." },
    ],
    metaDescription: "Female infertility homeopathic support in Lahore by Dr. Noor ul Qamar. Natural, holistic care for ovulation and reproductive wellbeing.",
  },
  {
    slug: "thyroid-fertility-support",
    title: "Thyroid & Fertility Support",
    category: "Women's Health",
    shortDescription: "Harmonizing subclinical thyroid imbalances that influence ovulatory cycles and implantation.",
    commonConcerns: [
      "Elevated TSH levels (above optimal fertility range of 2.5 mIU/L)",
      "High anti-TPO antibodies indicating Hashimoto's thyroiditis",
      "Persistent fatigue, cold intolerance, constipation, and sluggish metabolism",
    ],
    howConsultationWorks: [
      { step: "Full Thyroid & Antibody Panel Review", description: "Evaluating Free T3, Free T4, TSH, and thyroid autoantibodies alongside reproductive hormones." },
      { step: "Constitutional Energy Prescribing", description: "Supporting cellular metabolic activity and glandular vitality with individualized remedies." },
      { step: "L-Thyroxine Integration", description: "Collaborating with ongoing thyroid hormone replacement prescribed by endocrinologists." },
      { step: "Quarterly Biochemical Tracking", description: "Monitoring TSH stabilization and ovulatory improvements." },
    ],
    whenToSeekUrgentCare: [
      "Severe thyrotoxic crisis (racing heart > 140 bpm, high fever, agitation)",
      "Rapidly enlarging hard neck lump causing swallowing or breathing difficulty",
    ],
    faqs: [
      { question: "Should I stop taking Thyroxine?", answer: "Never stop your prescribed thyroid hormone medicine. Homeopathy is provided alongside to support overall vitality and antibody regulation." },
    ],
    metaDescription: "Thyroid and fertility homeopathic care in Lahore with Dr. Noor ul Qamar. Optimize thyroid balance for healthy conception.",
  },
  {
    slug: "low-amh-guidance",
    title: "Low AMH Guidance",
    category: "Women's Health",
    shortDescription: "Gentle supportive care focusing on egg quality, ovarian microcirculation, and systemic vitality.",
    commonConcerns: [
      "Low Anti-Müllerian Hormone test results indicating diminished ovarian reserve",
      "Fear of premature ovarian insufficiency before planned pregnancy",
      "Previous poor response during IVF stimulation protocols",
    ],
    howConsultationWorks: [
      { step: "Reserve & Antral Follicle Audit", description: "Evaluating AMH in context with age, AFC ultrasound, and FSH levels without panic." },
      { step: "Ovarian Microcirculation Support", description: "Prescribing constitutional remedies to enhance pelvic blood flow and cellular oxygenation." },
      { step: "Mitochondrial & Cellular Nutrition", description: "Recommending lifestyle adjustments and antioxidant-rich dietary protocols." },
      { step: "Calm Decision-Making Environment", description: "Providing realistic, honest, and compassionate guidance for natural or assisted paths." },
    ],
    whenToSeekUrgentCare: [
      "Sudden unexplained collapse, severe pelvic haemorrhage, or high fever",
    ],
    faqs: [
      { question: "Can homeopathy increase AMH levels?", answer: "AMH reflects biological egg reserve which cannot be magically multiplied, but homeopathy can optimize cellular quality, ovarian circulation, and ovulatory responsiveness." },
    ],
    metaDescription: "Compassionate homeopathic low AMH guidance in Lahore with Dr. Noor ul Qamar. Focus on egg quality and ovarian wellness.",
  },
  {
    slug: "unexplained-infertility-support",
    title: "Unexplained Infertility Support",
    category: "Women's Health",
    shortDescription: "Comprehensive whole-person analysis for couples with normal diagnostic tests who have not yet conceived.",
    commonConcerns: [
      "Normal semen analysis, patent fallopian tubes, and regular cycles with no conception",
      "Accumulated grief and stress from month after month of negative pregnancy tests",
      "Subtle immunological or emotional resistance patterns",
    ],
    howConsultationWorks: [
      { step: "Whole-Person Diagnostic Review", description: "Re-examining subtle metabolic markers, subclinical inflammation, and daily stress loads." },
      { step: "Constitutional Harmony Remedy", description: "Prescribing deep-acting remedies to restore holistic psychosomatic equilibrium." },
      { step: "Couples Alignment Consultation", description: "Providing emotional decompression and synchronized vitality care for both partners." },
      { step: "Natural Conception Windows", description: "Supporting timed conception in a relaxed, non-clinical psychological space." },
    ],
    whenToSeekUrgentCare: [
      "Suspected ectopic pregnancy signs (sharp one-sided pain, dizziness, brown spotting)",
    ],
    faqs: [
      { question: "What is unexplained infertility in homeopathy?", answer: "Where conventional tests find no gross structural defect, homeopathy investigates fine functional, constitutional, and autonomic imbalances that may hinder conception." },
    ],
    metaDescription: "Unexplained infertility homeopathic care in Lahore with Dr. Noor ul Qamar. Holistic psychosomatic support for couples.",
  },
  {
    slug: "recurrent-miscarriage-support",
    title: "Recurrent Miscarriage Support",
    category: "Women's Health",
    shortDescription: "Compassionate supportive care addressing uterine tone, immune balance, and emotional healing.",
    commonConcerns: [
      "History of two or more early pregnancy losses",
      "Emotional trauma, anxiety, and fear regarding future pregnancies",
      "Suspected luteal phase insufficiency or uterine receptivity issues",
    ],
    howConsultationWorks: [
      { step: "Thorough Loss Audit", description: "Reviewing karyotyping, thrombophilia panels, TORCH screen, antiphospholipid antibodies, and uterine anatomy." },
      { step: "Constitutional Pre-Conception Toning", description: "Strengthening uterine vascular tone and general maternal vitality before attempting pregnancy." },
      { step: "Early Gestational Supportive Remedies", description: "Offering gentle, non-toxic homeopathic support during the sensitive first trimester under medical supervision." },
      { step: "Empathetic Emotional Grounding", description: "Holding a safe space for psychological recovery and reassurance." },
    ],
    whenToSeekUrgentCare: [
      "Active vaginal bleeding with cramping during pregnancy (immediate hospital emergency)",
      "High fever, shivering, or foul-smelling lochia after an incomplete loss",
    ],
    faqs: [
      { question: "When should I begin homeopathic support after a miscarriage?", answer: "Beginning 3 to 6 months prior to attempting conception allows your body to rebuild systemic vitality, hormonal rhythm, and emotional resilience." },
    ],
    metaDescription: "Gentle homeopathic support for recurrent miscarriage with Dr. Noor ul Qamar, Lahore. Pre-conception toning and compassionate care.",
  },
  {
    slug: "homeopathy-support-during-ivf-iui",
    title: "Homeopathy Support During IVF / IUI",
    category: "Women's Health",
    shortDescription: "Complementary care to improve emotional resilience, ease medication side-effects, and support endometrial receptivity.",
    commonConcerns: [
      "Severe anxiety, mood swings, and bloating during ovarian stimulation injections",
      "Sub-optimal endometrial thickness prior to embryo transfer",
      "Emotional tension during the challenging two-week wait",
    ],
    howConsultationWorks: [
      { step: "Protocol Synchronization", description: "Reviewing your fertility specialist's exact IVF/IUI medication schedule to ensure zero interference." },
      { step: "Supportive Non-Interfering Remedies", description: "Prescribing ultra-diluted remedies that calm hyperstimulated nerves and soothe bloating." },
      { step: "Lining & Relaxation Support", description: "Fostering pelvic blood flow and deep diaphragmatic calm leading up to transfer day." },
      { step: "Post-Transfer Gentle Care", description: "Supporting tranquility and emotional steadiness throughout the waiting period." },
    ],
    whenToSeekUrgentCare: [
      "Ovarian Hyperstimulation Syndrome (OHSS) signs: rapid weight gain, severe abdominal distension, shortness of breath",
    ],
    faqs: [
      { question: "Will homeopathy interfere with my IVF hormonal injections?", answer: "No. We select non-interfering, supportive constitutional remedies strictly aligned with your reproductive specialist's protocol." },
    ],
    metaDescription: "Complementary homeopathy for IVF and IUI cycles in Lahore with Dr. Noor ul Qamar. Soothe anxiety and support endometrial receptivity.",
  },

  // --- GENERAL WELLNESS & ENDOCRINE ---
  {
    slug: "thyroid-concerns",
    title: "Thyroid Concerns",
    category: "General Wellness",
    featured: true,
    shortDescription: "Constitutional management for hypothyroidism, sluggish metabolism, chronic fatigue, and thyroid swelling.",
    commonConcerns: [
      "Unexplained weight gain, puffy face, dry skin, and hair thinning",
      "Chronic low energy, mental brain fog, and sensitivity to cold",
      "Subclinical hypothyroidism with mildly elevated TSH",
    ],
    howConsultationWorks: [
      { step: "Full Biochemical Profile Evaluation", description: "Reviewing TSH, FT3, FT4, anti-TPO antibodies, and ultrasound of the thyroid gland." },
      { step: "Constitutional Matching", description: "Prescribing deep-acting natural remedies tailored to your individual metabolic and thermal traits." },
      { step: "Safe Adjunctive Support", description: "Working smoothly alongside prescribed thyroid hormone medications." },
      { step: "Serial Laboratory Follow-up", description: "Retesting every 8-12 weeks to monitor thyroid hormone stabilization." },
    ],
    whenToSeekUrgentCare: [
      "Thyroid storm signs: sudden high fever, rapid heartbeat, extreme agitation, delirium",
      "Myxedema coma signs: severe hypothermia, slow heart rate, progressive unresponsiveness",
    ],
    faqs: [
      { question: "Can homeopathy cure hypothyroidism completely?", answer: "Homeopathy aims to optimize gland function, manage antibody-mediated inflammation in early Hashimoto's, and relieve fatigue. Replacement hormones may still be needed if thyroid tissue is fibrotic." },
    ],
    metaDescription: "Homeopathic thyroid treatment in Lahore with Dr. Noor ul Qamar. Natural constitutional care for hypothyroidism and fatigue.",
  },
  {
    slug: "goitre",
    title: "Goitre",
    category: "General Wellness",
    shortDescription: "Supportive care addressing thyroid gland enlargement, neck fullness, and hormonal equilibrium.",
    commonConcerns: [
      "Visible swelling or fullness at the base of the neck",
      "Feeling of tightness in the throat or difficulty with tight collars",
      "Associated emotional sensitivity and swallowing discomfort",
    ],
    howConsultationWorks: [
      { step: "Thyroid Ultrasound & Scan Review", description: "Distinguishing between diffuse colloid goitre, multinodular goitre, and solitary nodules." },
      { step: "Endocrine & Iodine History", description: "Checking dietary iodine intake, goitrogen exposure, and family history." },
      { step: "Glandular Tonic Prescription", description: "Prescribing homeopathic remedies suited to glandular hyper-trophy and soft tissue enlargement." },
      { step: "Size Monitoring", description: "Serial neck circumference measurements and follow-up sonography." },
    ],
    whenToSeekUrgentCare: [
      "Rapidly enlarging solitary hard nodule or hoarseness of voice (requires immediate specialist biopsy)",
      "Acute compression of trachea causing stridor or difficulty breathing",
    ],
    faqs: [
      { question: "Is surgery always needed for goitre?", answer: "Benign, diffuse non-toxic goitres that do not compromise the airway can often be managed conservatively and monitored closely with homeopathy." },
    ],
    metaDescription: "Gentle homeopathic care for thyroid goitre and neck swelling with Dr. Noor ul Qamar, Lahore.",
  },
  {
    slug: "diabetes-wellness-support",
    title: "Diabetes Wellness Support",
    category: "General Wellness",
    shortDescription: "Complementary constitutional therapies addressing fatigue, neuropathy discomfort, and metabolic vitality.",
    commonConcerns: [
      "Fluctuating blood sugar levels despite standard oral hypoglycaemic agents",
      "Numbness, tingling, or burning sensations in feet (early diabetic neuropathy)",
      "Sluggish wound healing, chronic lethargy, and post-meal drowsiness",
    ],
    howConsultationWorks: [
      { step: "Glycaemic History & HbA1c Review", description: "Assessing 3-month average glucose control, fasting insulin, and renal function markers." },
      { step: "Microvascular & Nerve Vitality", description: "Prescribing specific homeopathic remedies known to support microvascular circulation." },
      { step: "Dietary & Lifestyle Harmonization", description: "Providing practical guidance on low-glycaemic nutrition, walks, and hydration." },
      { step: "Safe Collaborative Care", description: "Ensuring you continue all medications prescribed by your endocrinologist." },
    ],
    whenToSeekUrgentCare: [
      "Diabetic Ketoacidosis (DKA) symptoms: fruity breath, vomiting, confusion, rapid deep breathing",
      "Severe hypoglycemia (blood sugar < 70 mg/dL with tremors, sweating, confusion) — take fast sugars immediately",
      "Non-healing foot ulcers showing blackening or signs of deep infection",
    ],
    faqs: [
      { question: "Can I stop my insulin or metformin?", answer: "No. Never stop conventional diabetes medications. Homeopathy acts as a supportive metabolic therapy to improve quality of life." },
    ],
    metaDescription: "Complementary homeopathic diabetes wellness in Lahore by Dr. Noor ul Qamar. Support energy, neuropathy comfort, and metabolic vitality.",
  },
  {
    slug: "high-blood-pressure-wellness-support",
    title: "High Blood Pressure Wellness Support",
    category: "General Wellness",
    shortDescription: "Constitutional lifestyle and homeopathic support for stress-related hypertension and arterial calmness.",
    commonConcerns: [
      "Elevated systolic and diastolic readings during periods of high work or family stress",
      "Occipital morning headaches, throbbing in temples, and facial flushing",
      "Restlessness, palpitations, and sleep disruption",
    ],
    howConsultationWorks: [
      { step: "Home BP Diary Analysis", description: "Reviewing morning and evening blood pressure logs, pulse rates, and lifestyle stressors." },
      { step: "Autonomic Nervous Regulation", description: "Selecting homeopathic constitutional remedies aimed at calming sympathetic nervous hyperarousal." },
      { step: "Dietary Sodium & Potassium Review", description: "Advising heart-healthy food patterns, stress-reduction techniques, and walking." },
      { step: "Stable Cardiovascular Tracking", description: "Ensuring steady blood pressure control alongside any ongoing anti-hypertensive drugs." },
    ],
    whenToSeekUrgentCare: [
      "Hypertensive crisis: Blood pressure > 180/120 mmHg with severe headache, blurred vision, or chest pain (emergency ER care required)",
    ],
    faqs: [
      { question: "Does homeopathy replace blood pressure medication?", answer: "No, patients should never stop prescribed blood pressure tablets. Homeopathy serves as an adjunctive, stress-reducing therapy." },
    ],
    metaDescription: "Supportive homeopathic care for stress hypertension with Dr. Noor ul Qamar, Lahore. Calm arterial pressure naturally.",
  },
  {
    slug: "fatty-liver",
    title: "Fatty Liver",
    category: "Digestive Health",
    shortDescription: "Individualized remedies to support hepatic lipid processing, digestive sluggishness, and right hypochondriac heaviness.",
    commonConcerns: [
      "Grade 1 or Grade 2 fatty liver (hepatic steatosis) detected on ultrasound",
      "Dull ache or fullness under the right rib cage after meals",
      "Persistent sluggish digestion, bloating, and elevated ALT/AST liver enzymes",
    ],
    howConsultationWorks: [
      { step: "Ultrasound & Liver Panel Assessment", description: "Reviewing liver ultrasound findings, SGPT/ALT, SGOT/AST, bilirubin, and lipid profiles." },
      { step: "Constitutional Hepatic Remedies", description: "Prescribing deep-acting remedies that support bile flow and hepatic lipid metabolism." },
      { step: "Nutritional Cleansing Guidance", description: "Recommending anti-inflammatory foods, minimizing refined seed oils and sugars." },
      { step: "Enzyme Retesting Follow-up", description: "Checking liver enzyme normalization every 12 to 16 weeks." },
    ],
    whenToSeekUrgentCare: [
      "Yellowing of skin or eyes (jaundice), dark tea-colored urine, and clay-colored stools",
      "Abdominal fluid accumulation (ascites) or confusion (hepatic encephalopathy)",
    ],
    faqs: [
      { question: "Can fatty liver be reversed with homeopathy and lifestyle?", answer: "Early-stage non-alcoholic fatty liver (NAFLD) is highly responsive to lifestyle adjustments combined with targeted homeopathic liver tonics." },
    ],
    metaDescription: "Homeopathic fatty liver care in Lahore with Dr. Noor ul Qamar. Natural remedies to support hepatic vitality and digestion.",
  },
  {
    slug: "hepatitis-support",
    title: "Hepatitis Support",
    category: "Digestive Health",
    shortDescription: "Supportive constitutional therapies to aid hepatic recovery, reduce fatigue, and support liver cell vitality.",
    commonConcerns: [
      "Post-viral hepatitis convalescence with persistent weakness and loss of appetite",
      "Mildly elevated transaminases following chronic viral exposure",
      "Right upper quadrant discomfort, nausea, and digestive intolerance to fatty foods",
    ],
    howConsultationWorks: [
      { step: "Viral Markers & Liver Panel Review", description: "Checking PCR viral load reports, LFTs, and ultrasound findings." },
      { step: "Convalescent Vitality Prescription", description: "Selecting gentle homeopathic remedies that invigorate appetite and liver regeneration." },
      { step: "Immune System Strengthening", description: "Building systemic resistance to minimize chronic liver fatigue." },
      { step: "Ongoing Medical Surveillance", description: "Ensuring close coordination with treating hepatologists." },
    ],
    whenToSeekUrgentCare: [
      "Acute hepatic failure signs: confusion, vomiting blood, extreme jaundice, bleeding gums",
    ],
    faqs: [
      { question: "Does homeopathy treat viral hepatitis?", answer: "Homeopathy provides supportive and symptomatic relief for liver health and convalescence. Patients must continue prescribed antivirals under hepatologist supervision." },
    ],
    metaDescription: "Compassionate homeopathic hepatitis supportive care in Lahore with Dr. Noor ul Qamar. Support liver recovery and vitality.",
  },

  // --- DIGESTIVE HEALTH ---
  {
    slug: "acidity-gerd",
    title: "Acidity & GERD",
    category: "Digestive Health",
    featured: true,
    shortDescription: "Constitutional remedies for acid reflux, heartburn, regurgitation, and hiatus hernia discomfort.",
    commonConcerns: [
      "Burning pain behind the breastbone (pyrosis) worsening after meals or lying down",
      "Sour, acidic fluid regurgitating into the throat and mouth",
      "Chronic throat clearing, sour cough, or globus sensation",
    ],
    howConsultationWorks: [
      { step: "Meal & Reflux Trigger Log", description: "Evaluating timing, trigger foods (spices, tea, coffee, late dinners), and sleep position." },
      { step: "Gastric Motility Assessment", description: "Differentiating between hyperacidity, hypochlorhydria, and delayed gastric emptying." },
      { step: "Constitutional Remedy Matching", description: "Prescribing gentle remedies to soothe mucosal irritation and strengthen lower esophageal tone." },
      { step: "Lifestyle & Posture Guidance", description: "Advising on meal spacing, head elevation, and stress relief." },
    ],
    whenToSeekUrgentCare: [
      "Difficulty swallowing (dysphagia) or painful swallowing (odynophagia)",
      "Vomiting coffee-ground material or passing black tarry stools",
      "Crushing retrosternal chest pain radiating to left arm or jaw (always rule out cardiac ischemia in ER first)",
    ],
    faqs: [
      { question: "Can I stop my daily PPI acid-blockers immediately?", answer: "No, never stop PPIs abruptly as acid rebound can occur. We work to gradually improve stomach health so your doctor can taper medications safely." },
    ],
    metaDescription: "Natural relief from acidity, GERD, and heartburn in Lahore with Dr. Noor ul Qamar. Gentle constitutional homeopathic care.",
  },
  {
    slug: "gastritis",
    title: "Gastritis",
    category: "Digestive Health",
    shortDescription: "Gentle therapies for acute and chronic stomach lining irritation, fullness, and epigastric discomfort.",
    commonConcerns: [
      "Gnawing or burning ache in the upper abdomen relieved or worsened by food",
      "Nausea, bloating, belching, and early satiety",
      "Gastritis triggered by NSAID painkillers, stress, or H. pylori history",
    ],
    howConsultationWorks: [
      { step: "Mucosal Irritation History", description: "Reviewing endoscopy reports, H. pylori testing, and medication history." },
      { step: "Symptom Modality Profile", description: "Noting whether warm drinks, cold drinks, fasting, or bland meals give relief." },
      { step: "Soothing Mucosal Remedies", description: "Administering homeopathic remedies that promote epithelial restoration." },
      { step: "Long-Term Gut Health Follow-up", description: "Tracking reduction in bloating and steady restoration of dietary tolerance." },
    ],
    whenToSeekUrgentCare: [
      "Severe intractable vomiting with inability to keep liquids down",
      "Signs of gastrointestinal bleeding (hematemesis or melena)",
    ],
    faqs: [
      { question: "How does homeopathy help chronic gastritis?", answer: "Homeopathy calms autonomic hyperacidity and promotes gastric mucosal healing, reducing dependence on antacids." },
    ],
    metaDescription: "Homeopathic gastritis care in Lahore with Dr. Noor ul Qamar. Soothe chronic stomach burning and bloating naturally.",
  },
  {
    slug: "peptic-ulcer",
    title: "Peptic Ulcer",
    category: "Digestive Health",
    shortDescription: "Supportive care for gastric and duodenal ulcers, epigastric pain, and mucosal comfort.",
    commonConcerns: [
      "Burning epigastric ache waking the patient between 1 AM and 3 AM",
      "Pain relieved by eating or antacids (duodenal) or aggravated right after eating (gastric)",
      "Loss of appetite and unintended weight loss",
    ],
    howConsultationWorks: [
      { step: "Endoscopy & Infection Audit", description: "Reviewing gastroenterology endoscopy findings and confirming H. pylori treatment status." },
      { step: "Constitutional Healing Prescription", description: "Selecting natural remedies suited to ulcer diathesis and nervous tension." },
      { step: "Bland Diet & Meal Scheduling", description: "Structuring small, frequent meals to buffer stomach acidity naturally." },
      { step: "Pain Scale Monitoring", description: "Observing progressive decrease in nocturnal pain episodes." },
    ],
    whenToSeekUrgentCare: [
      "Sudden, sharp, severe peritonitis pain across the whole abdomen (indicates acute ulcer perforation)",
      "Vomiting red blood or sudden severe dizziness",
    ],
    faqs: [
      { question: "Is homeopathy safe for diagnosed ulcers?", answer: "Yes, when integrated responsibly with diagnostic oversight. Homeopathic remedies do not erode the stomach lining." },
    ],
    metaDescription: "Supportive homeopathic care for peptic and duodenal ulcers with Dr. Noor ul Qamar, Lahore. Relieve nocturnal stomach pain.",
  },
  {
    slug: "indigestion-dyspepsia",
    title: "Indigestion & Dyspepsia",
    category: "Digestive Health",
    shortDescription: "Holistic care for functional dyspepsia, heavy bloating, slow digestion, and post-meal discomfort.",
    commonConcerns: [
      "Feeling uncomfortably full immediately after eating a few bites",
      "Persistent loud belching, flatulence, and sluggish bowel transit",
      "Upper abdominal distension that makes waistbands tight by evening",
    ],
    howConsultationWorks: [
      { step: "Enzymatic & Digestive Rhythm Assessment", description: "Evaluating chewing habits, hydration, meal timing, and gallbladder/pancreatic health." },
      { step: "Functional Dyspepsia Profiling", description: "Assessing nervous tension that locks the digestive vagus nerve." },
      { step: "Constitutional Carminative Remedy", description: "Administering homeopathic remedies to restore synchronized peristalsis." },
      { step: "Digestive Rebalancing Review", description: "Evaluating lightness, energy after meals, and flatulence reduction." },
    ],
    whenToSeekUrgentCare: [
      "Unexplained rapid weight loss, persistent vomiting, or new onset indigestion in individuals over 50",
    ],
    faqs: [
      { question: "Why do my medical tests show normal results despite constant indigestion?", answer: "Functional dyspepsia often involves sensory nerve hypersensitivity and motor sluggishness rather than structural ulcers. Homeopathy excels in functional disorders." },
    ],
    metaDescription: "Natural relief for indigestion, gas, and functional dyspepsia in Lahore with Dr. Noor ul Qamar. Restore comfortable digestion.",
  },
  {
    slug: "ibs",
    title: "IBS (Irritable Bowel Syndrome)",
    category: "Digestive Health",
    featured: true,
    shortDescription: "Constitutional psychosomatic care for IBS-D, IBS-C, or alternating bowel habits and spastic colon.",
    commonConcerns: [
      "Urgent morning diarrhoea or alternating bouts of constipation and loose stools",
      "Lower abdominal cramping relieved immediately after bowel evacuation",
      "Aggravation during travel, exams, social functions, or emotional stress",
      "Mucus in stool, loud borborygmi (rumbling), and incomplete evacuation sensation",
    ],
    howConsultationWorks: [
      { step: "Brain-Gut Axis Deep Intake", description: "Exploring the intricate connection between anxiety, emotional holding, and enteric nervous hyper-reactivity." },
      { step: "Bowel Pattern Classification", description: "Distinguishing IBS-Diarrhoea, IBS-Constipation, and mixed forms." },
      { step: "Constitutional Homeopathic Remedy", description: "Prescribing deep-acting remedies that calm enteric smooth muscle spasticity." },
      { step: "Gentle Food Integration", description: "Gradually expanding your diet safely without lifelong restrictive eating." },
    ],
    whenToSeekUrgentCare: [
      "Visible blood in the stool or unexplained fever and weight loss (rule out IBD/Crohn's/Colitis with colonoscopy)",
      "Nocturnal diarrhoea that wakes you up from sound sleep",
    ],
    faqs: [
      { question: "Can homeopathy cure IBS?", answer: "Homeopathy has an exceptional track record in IBS because it treats the gut and the nervous system simultaneously, significantly reducing flare-up frequency." },
      { question: "How does stress affect my IBS?", answer: "The gut has its own nervous system (enteric plexus) directly wired to your emotions. Homeopathic constitutional remedies soothe this hyper-responsiveness." },
    ],
    metaDescription: "Expert IBS homeopathic treatment in Lahore with Dr. Noor ul Qamar. Holistic care for spastic colon, gas, and irregular bowel habits.",
  },
  {
    slug: "constipation",
    title: "Constipation",
    category: "Digestive Health",
    shortDescription: "Gentle, non-habit forming homeopathic remedies to restore natural colonic peristalsis and soft stools.",
    commonConcerns: [
      "Passing hard, dry, knotty stools fewer than three times a week",
      "Severe straining, incomplete evacuation sensation, and rectal fullness",
      "Chronic dependence on stimulant laxatives, senna teas, or enemas",
    ],
    howConsultationWorks: [
      { step: "Peristaltic & Habit Analysis", description: "Reviewing fluid intake, dietary fiber, physical mobility, and laxative history." },
      { step: "Rectal Sensation Modalities", description: "Assessing whether urge is absent (atonic bowel) or ineffectual and painful (spastic bowel)." },
      { step: "Non-Habit Forming Constitutional Remedy", description: "Prescribing natural remedies that gently re-educate the colon without causing dependency." },
      { step: "Laxative Weaning Protocol", description: "Safely tapering off harsh laxatives as natural bowel motions resume." },
    ],
    whenToSeekUrgentCare: [
      "Complete inability to pass both stool and flatus accompanied by severe abdominal distension and vomiting (acute bowel obstruction)",
    ],
    faqs: [
      { question: "Are homeopathic constipation remedies habit-forming?", answer: "No. Unlike chemical laxatives that irritate the colon wall, homeopathic remedies stimulate natural physiological peristalsis without causing dependency." },
    ],
    metaDescription: "Relief from chronic constipation in Lahore with Dr. Noor ul Qamar. Gentle, non-habit forming constitutional homeopathic care.",
  },
  {
    slug: "piles",
    title: "Piles (Haemorrhoids)",
    category: "Digestive Health",
    shortDescription: "Constitutional care to reduce venous congestion, relieve rectal pain, and stop bleeding from internal or external piles.",
    commonConcerns: [
      "Bright red blood dripping into the toilet bowl after passing stool",
      "Painful, tender external swollen lumps or prolapsing internal haemorrhoids",
      "Intense burning, itching, and throbbing in the anal canal",
    ],
    howConsultationWorks: [
      { step: "Venous & Stool History", description: "Reviewing grading of piles (Grade 1 to 4), portal congestion, and straining patterns." },
      { step: "Venous Tonic Homeopathic Prescription", description: "Administering specific remedies that strengthen hemorrhoidal vein walls and reduce inflammation." },
      { step: "Stool Softening Guidance", description: "Ensuring smooth, effortless stool transit to prevent mechanical friction on venous clusters." },
      { step: "Follow-up Swelling Check", description: "Tracking reduction in prolapse, cessation of bleeding, and tissue shrinkage." },
    ],
    whenToSeekUrgentCare: [
      "Thrombosed external hemorrhoid with sudden, excruciating, purple, stone-hard swelling",
      "Profuse, continuous rectal bleeding leading to pallor and dizziness",
    ],
    faqs: [
      { question: "Can piles be treated without surgery?", answer: "Grade 1, Grade 2, and many Grade 3 haemorrhoids respond remarkably well to constitutional homeopathy, often avoiding the need for surgery." },
    ],
    metaDescription: "Piles and hemorrhoid homeopathic treatment in Lahore with Dr. Noor ul Qamar. Relieve pain, bleeding, and swelling naturally.",
  },
  {
    slug: "anal-fissure",
    title: "Anal Fissure",
    category: "Digestive Health",
    shortDescription: "Quick soothing and healing care for sharp, knife-like anal tears, spasms, and post-defaecation burning.",
    commonConcerns: [
      "Severe knife-like or glass-cutting pain during and for hours after passing stool",
      "Bright red blood streaks on toilet paper or stool surface",
      "Severe internal anal sphincter spasm causing extreme fear of passing stool",
    ],
    howConsultationWorks: [
      { step: "Aetiology & Spasm Evaluation", description: "Determining whether fissure was triggered by hard stool, diarrhoea, or chronic hypertonicity." },
      { step: "Targeted Wound Healing Remedies", description: "Selecting homeopathic medicines renowned for healing mucosal fissures and relaxing sphincter spasm." },
      { step: "Sitz Bath & Local Comfort Protocol", description: "Recommending warm water sitz baths to relieve painful muscle cramps." },
      { step: "Epithelial Repair Tracking", description: "Observing cessation of bleeding and progressive pain relief within days to weeks." },
    ],
    whenToSeekUrgentCare: [
      "Development of an ischiorectal abscess: throbbing perianal lump with high fever and chills",
    ],
    faqs: [
      { question: "How quickly does homeopathy relieve fissure pain?", answer: "Many patients experience a noticeable reduction in sphincter spasm and burning within 3 to 7 days, with complete mucosal healing over several weeks." },
    ],
    metaDescription: "Anal fissure homeopathic relief in Lahore with Dr. Noor ul Qamar. Fast healing for painful tears and sphincter spasms.",
  },
  {
    slug: "fistula-support",
    title: "Fistula Support",
    category: "Digestive Health",
    shortDescription: "Supportive homeopathic care for chronic anal fistula discharge, perianal induration, and tissue healing.",
    commonConcerns: [
      "Recurrent foul-smelling, purulent, or serosanguinous discharge from a perianal opening",
      "Periodic swelling, throbbing pain, and bursting of pus with temporary relief",
      "History of previous perianal abscess or multiple failed surgeries",
    ],
    howConsultationWorks: [
      { step: "MRI Fistulogram Review", description: "Reviewing tract anatomy (intersphincteric, transsphincteric, horseshoe, or high vs. low fistula)." },
      { step: "Suppuration & Drainage Remedy", description: "Prescribing deep constitutional homeopathic remedies known to promote natural tract cleansing and granulating tissue repair." },
      { step: "Local Hygiene & Comfort Management", description: "Guiding sterile dressing and sitz bath hygiene." },
      { step: "Tract Closure Monitoring", description: "Observing reduction in discharge volume, induration shrinkage, and internal healing." },
    ],
    whenToSeekUrgentCare: [
      "Spreading redness, extreme heat, and systemic fever indicating new abscess formation requiring emergency surgical drainage",
    ],
    faqs: [
      { question: "Can homeopathy help recurrent fistula after surgery?", answer: "Yes, many patients seek homeopathy precisely after recurrence to support internal tissue healing and minimize chronic discharge." },
    ],
    metaDescription: "Anal fistula supportive homeopathic care in Lahore with Dr. Noor ul Qamar. Natural healing for perianal discharge and tract comfort.",
  },
  {
    slug: "gallbladder-stone-support",
    title: "Gallbladder Stone Support",
    category: "Digestive Health",
    shortDescription: "Conservative care for biliary sludge, small gallstones, indigestion, and right upper quadrant colic prevention.",
    commonConcerns: [
      "Biliary sludge or asymptomatic small gallstones found incidentally on ultrasound",
      "Discomfort and bloating after fatty meals (biliary dyspepsia)",
      "Fear of emergency cholecystectomy",
    ],
    howConsultationWorks: [
      { step: "Ultrasound Stone Measurement", description: "Reviewing stone size, acoustic shadowing, gallbladder wall thickness, and common bile duct diameter." },
      { step: "Biliary Flow Harmonization", description: "Prescribing homeopathic remedies to improve cholesterol-bile salt solubility and ease biliary spasm." },
      { step: "Low-Fat Diet Alignment", description: "Guiding balanced nutritional habits that prevent sudden gallbladder contraction spikes." },
      { step: "Serial Sonography Follow-up", description: "Tracking sludge clearance and absence of colic attacks." },
    ],
    whenToSeekUrgentCare: [
      "Acute cholecystitis: severe right upper abdominal pain radiating to right shoulder lasting > 4 hours with fever, vomiting, and jaundice (requires immediate hospital ER care)",
    ],
    faqs: [
      { question: "Can homeopathy dissolve all gallstones?", answer: "Sludge and small cholesterol stones often respond favorably. Large calcified stones may not dissolve, but homeopathy helps prevent painful spasms and inflammation." },
    ],
    metaDescription: "Gallbladder stone and biliary sludge care in Lahore with Dr. Noor ul Qamar. Conservative homeopathic support for digestive comfort.",
  },
  {
    slug: "kidney-stone-support",
    title: "Kidney Stone Support",
    category: "Digestive Health",
    shortDescription: "Individualized remedies to assist stone passage, relieve flank spasm, and prevent recurrent lithiasis.",
    commonConcerns: [
      "Flank pain radiating downward toward the groin or testicle/labium",
      "Microscopic or visible blood in the urine (haematuria) with burning micturition",
      "History of recurring calcium oxalate, uric acid, or phosphate renal calculi",
    ],
    howConsultationWorks: [
      { step: "Stone Location & Size Audit", description: "Reviewing ultrasound or KUB CT scans for exact millimetric size (e.g. 3mm - 8mm) and location." },
      { step: "Spasmolytic & Diuretic Homeopathic Prescription", description: "Administering remedies that relax ureteric smooth muscle and facilitate smooth passage." },
      { step: "Hydration & Metabolic Strategy", description: "Guiding specific fluid intake and dietary adjustments based on stone composition." },
      { step: "Constitutional Anti-Lithic Therapy", description: "Treating the underlying metabolic diathesis to stop future stone formation." },
    ],
    whenToSeekUrgentCare: [
      "Total inability to pass urine (acute urinary retention)",
      "High fever with severe flank pain (infected hydronephrosis is a medical emergency)",
      "Uncontrollable intractable vomiting and agony",
    ],
    faqs: [
      { question: "What size kidney stones can pass with homeopathic help?", answer: "Stones under 7mm to 8mm located in the renal pelvis or ureter frequently pass smoothly with homeopathic spasmolytic remedies and adequate hydration." },
    ],
    metaDescription: "Kidney stone homeopathic treatment in Lahore with Dr. Noor ul Qamar. Assist natural stone passage and prevent recurrence.",
  },

  // --- RESPIRATORY HEALTH ---
  {
    slug: "asthma",
    title: "Asthma",
    category: "Respiratory Health",
    featured: true,
    shortDescription: "Constitutional care to reduce airway hypersensitivity, nocturnal wheezing, and seasonal bronchospasms.",
    commonConcerns: [
      "Recurrent episodes of wheezing, chest tightness, and shortness of breath",
      "Nocturnal coughing spells waking the patient between 2 AM and 4 AM",
      "Attacks triggered by cold air, dust mites, exercise, pollen, or viral infections",
    ],
    howConsultationWorks: [
      { step: "Pulmonary History & Peak Flow Review", description: "Reviewing spirometry, inhaler usage (reliever vs. preventer), and trigger profiles." },
      { step: "Constitutional Bronchial Desensitization", description: "Prescribing deep remedies to modulate the allergic hyper-reactive immune response." },
      { step: "Environmental Trigger Control", description: "Advising on bedding hygiene, indoor air quality, and avoidance of sudden temperature shocks." },
      { step: "Safety Inhaler Retention", description: "Ensuring patient always keeps their emergency bronchodilator inhaler on hand." },
    ],
    whenToSeekUrgentCare: [
      "Severe acute asthma exacerbation: inability to speak full sentences, blue lips or nails, retractions of neck/rib muscles (immediate 911/ER care)",
      "Peak flow meter reading in the red zone (< 50% of personal best) not responding to rescue inhaler",
    ],
    faqs: [
      { question: "Should I throw away my inhaler when starting homeopathy?", answer: "Never throw away your rescue inhaler. Homeopathy works as a deep preventive therapy to reduce flare frequency over time while keeping safety paramount." },
    ],
    metaDescription: "Constitutional asthma homeopathic treatment in Lahore by Dr. Noor ul Qamar. Reduce wheezing, night coughing, and allergy flares.",
  },
  {
    slug: "bronchitis",
    title: "Bronchitis",
    category: "Respiratory Health",
    shortDescription: "Gentle remedies for acute and chronic bronchial cough, mucus clearance, and chest soreness.",
    commonConcerns: [
      "Persistent productive cough with yellow, green, or thick white phlegm",
      "Raw, sore sensation behind the sternum with every coughing paroxysm",
      "Low-grade fever, fatigue, and rattling of mucus in the chest",
    ],
    howConsultationWorks: [
      { step: "Cough Modality & Sound Profile", description: "Differentiating between loose rattling coughs, dry croupy barks, and suffocative spasms." },
      { step: "Expectorant Homeopathic Prescription", description: "Selecting natural remedies to liquefy viscous bronchial secretions and calm airways." },
      { step: "Immune Support & Steam Therapy", description: "Guiding warm hydration, natural chest warmth, and rest." },
      { step: "Recovery Follow-up", description: "Ensuring complete resolution to prevent chronic bronchiectatic tendencies." },
    ],
    whenToSeekUrgentCare: [
      "Coughing up significant quantities of fresh blood (hemoptysis)",
      "High spiking fever with severe shortness of breath or suspected bacterial pneumonia",
    ],
    faqs: [
      { question: "How does homeopathy help chronic smoker's bronchitis?", answer: "Homeopathy helps soothe chronically inflamed bronchial mucosa, eases phlegm expectoration, and improves respiratory comfort." },
    ],
    metaDescription: "Relief from chronic bronchitis and stubborn chest cough with Dr. Noor ul Qamar, Lahore. Gentle homeopathic care.",
  },
  {
    slug: "copd-support",
    title: "COPD Support",
    category: "Respiratory Health",
    shortDescription: "Supportive homeopathic care to ease breathlessness, improve mucus drainage, and support respiratory vitality.",
    commonConcerns: [
      "Progressive breathlessness on mild exertion (walking up stairs)",
      "Chronic morning cough with copious sputum expectoration",
      "Chest heaviness and reduced exercise tolerance",
    ],
    howConsultationWorks: [
      { step: "Pulmonary Function & Oximetry Review", description: "Reviewing FEV1/FVC ratios, baseline oxygen saturations, and pulmonology care plans." },
      { step: "Complementary Bronchial Ease Remedies", description: "Prescribing gentle remedies to reduce air-trapping sensation and assist expectoration." },
      { step: "Diaphragmatic Breathing Guidance", description: "Encouraging pursed-lip breathing and posture techniques for efficient ventilation." },
      { step: "Collaborative Wellness Monitoring", description: "Working alongside your regular pulmonologist and prescribed medications." },
    ],
    whenToSeekUrgentCare: [
      "Acute drop in oxygen saturation (SpO2 < 88%) or cyanosis",
      "Acute confusion, extreme drowsiness, or severe respiratory exhaustion",
    ],
    faqs: [
      { question: "Can homeopathy cure damaged lung alveoli in emphysema?", answer: "Homeopathy cannot reverse permanent architectural destruction of lung tissue, but it significantly helps improve functional stamina, clears mucus, and reduces exacerbations." },
    ],
    metaDescription: "Supportive homeopathic care for COPD and chronic breathlessness with Dr. Noor ul Qamar, Lahore.",
  },
  {
    slug: "allergic-rhinitis",
    title: "Allergic Rhinitis",
    category: "Respiratory Health",
    featured: true,
    shortDescription: "Deep constitutional desensitization for morning sneezing fits, watery rhinorrhoea, and itchy eyes/nose.",
    commonConcerns: [
      "Waking up to 10 to 30 continuous violent sneezing spells",
      "Profuse, excoriating or bland watery nasal discharge",
      "Intense itching of the palate, inner ears, nose, and red watery eyes",
      "Nasal blockage alternating between nostrils upon lying down",
    ],
    howConsultationWorks: [
      { step: "Allergen & Seasonality Mapping", description: "Identifying triggers: pollens, house dust, animal dander, AC drafts, or humidity." },
      { step: "Nasal Modality Analysis", description: "Determining whether symptoms improve in open air, warm rooms, or with warm drinks." },
      { step: "Constitutional Anti-Allergy Remedy", description: "Selecting deep remedies to recalibrate mucosal IgE response over successive seasons." },
      { step: "Seasonal Prevention Follow-up", description: "Starting preventive remedies 4 weeks prior to known seasonal allergy onset." },
    ],
    whenToSeekUrgentCare: [
      "Facial cellulitis or orbital swelling around the eyes with high fever",
    ],
    faqs: [
      { question: "Can homeopathy provide freedom from daily anti-histamines?", answer: "Yes, constitutional homeopathic treatment aims to desensitize the hyper-reactive nasal mucosa, allowing many patients to gradually reduce antihistamine dependence." },
    ],
    metaDescription: "Allergic rhinitis and chronic sneezing homeopathic doctor in Lahore, Dr. Noor ul Qamar. Natural desensitization.",
  },
  {
    slug: "sinusitis",
    title: "Sinusitis",
    category: "Respiratory Health",
    shortDescription: "Effective remedies for frontal/maxillary sinus pressure, post-nasal drip, headache, and nasal congestion.",
    commonConcerns: [
      "Throbbing frontal or cheekbone facial pain worsening when bending forward",
      "Thick yellow-green nasal discharge or persistent post-nasal drip triggering throat clearing",
      "Impaired sense of smell (anosmia) and heavy congested head",
    ],
    howConsultationWorks: [
      { step: "Sinus Cavity Identification", description: "Differentiating frontal, maxillary, ethmoid, or sphenoid sinus involvement." },
      { step: "Drainage-Promoting Prescription", description: "Prescribing natural remedies that promote natural sinus ostia drainage without rebound congestion." },
      { step: "Inhalation & Saline Guidance", description: "Advising isotonic saline rinses and humidification." },
      { step: "Recurrence Prevention Strategy", description: "Strengthening immune defense to prevent future cold-weather relapses." },
    ],
    whenToSeekUrgentCare: [
      "Swelling, redness, or protrusion of the eyeball, double vision, or high fever with stiff neck (rule out orbital cellulitis/meningitis in hospital ER)",
    ],
    faqs: [
      { question: "Does homeopathy treat chronic sinus infection without antibiotics?", answer: "For chronic non-emergency sinus congestion, homeopathy promotes natural drainage and addresses underlying mucosal inflammation effectively." },
    ],
    metaDescription: "Homeopathic sinusitis treatment in Lahore with Dr. Noor ul Qamar. Relieve facial pressure, sinus headaches, and nasal blockage.",
  },
  {
    slug: "tonsillitis",
    title: "Tonsillitis",
    category: "Respiratory Health",
    shortDescription: "Gentle constitutional treatment for recurring throat infections, swollen tonsils, and painful swallowing.",
    commonConcerns: [
      "Enlarged, inflamed tonsils with painful swallowing radiating to the ears",
      "Recurrent attacks with every cold drink, seasonal change, or ice cream",
      "Tonsillar crypts with foul white debris (tonsilloliths)",
    ],
    howConsultationWorks: [
      { step: "Oropharyngeal Inspection", description: "Assessing tonsillar size (Grade 1 to 4), erythema, follicular exudates, and anterior cervical nodes." },
      { step: "Throat Modality Profile", description: "Noting whether warm liquids or cold liquids soothe the throat." },
      { step: "Immune-Modulating Prescription", description: "Selecting constitutional remedies to reduce chronic lymphoid tissue hyper-trophy." },
      { step: "Tonsillectomy Avoidance Tracking", description: "Monitoring reduction in infection frequency to help preserve healthy tonsillar lymphoid tissue." },
    ],
    whenToSeekUrgentCare: [
      "Peritonsillar abscess (Quinsy): severe unilateral throat pain, inability to open mouth (trismus), 'hot potato' voice",
      "Stridor or breathing difficulty from massive kissing tonsils",
    ],
    faqs: [
      { question: "Can homeopathy save children from tonsil removal surgery?", answer: "In many cases of recurrent non-obstructive tonsillitis, constitutional homeopathy successfully reduces the frequency and severity of infections, making surgery unnecessary." },
    ],
    metaDescription: "Recurrent tonsillitis care in Lahore with Dr. Noor ul Qamar. Gentle remedies for swollen tonsils and painful throat.",
  },
  {
    slug: "breathlessness-assessment-support",
    title: "Breathlessness Assessment Support",
    category: "Respiratory Health",
    shortDescription: "Careful supportive evaluation for non-emergency shortness of breath, anxiety-induced dyspnoea, and post-viral recovery.",
    commonConcerns: [
      "Air hunger or constant sighing breaths linked to nervous tension or hyperventilation",
      "Post-viral lingering breathlessness after normal chest X-ray and CT scans",
      "Chest tightness exacerbated by panic or enclosed spaces",
    ],
    howConsultationWorks: [
      { step: "Cardiopulmonary Safety Screening", description: "Ensuring thorough medical clearance (ECG, echo, D-dimer, chest radiography) by conventional physicians." },
      { step: "Psychosomatic Respiratory Profiling", description: "Addressing diaphragmatic tension and autonomic nervous system stress." },
      { step: "Constitutional Calming Remedies", description: "Selecting remedies that restore relaxed respiratory rhythm." },
      { step: "Breath Retraining Guidance", description: "Coaching slow nasal diaphragmatic breathing to stabilize blood carbon dioxide levels." },
    ],
    whenToSeekUrgentCare: [
      "Sudden onset unexplained breathlessness with chest pain or calf swelling (immediate emergency ER evaluation for pulmonary embolism/MI)",
    ],
    faqs: [
      { question: "Can anxiety cause actual breathing difficulty?", answer: "Yes, hyperventilation and anxiety frequently create distressing feelings of air hunger. Homeopathy helps calm autonomic nervous agitation gently." },
    ],
    metaDescription: "Supportive homeopathic care for non-emergency breathlessness and anxiety-related dyspnoea with Dr. Noor ul Qamar, Lahore.",
  },
  {
    slug: "sun-allergy",
    title: "Sun Allergy (Polymorphous Light Eruption)",
    category: "Skin & Hair",
    shortDescription: "Constitutional remedies for solar urticaria, itchy photo-dermatitis, and heat bumps.",
    commonConcerns: [
      "Itchy, red, bumpy rash appearing on sun-exposed arms, chest, and neck within hours of outdoor light",
      "Burning sensations, tiny blisters, or solar urticaria hives",
      "Recurrent flares every spring and summer",
    ],
    howConsultationWorks: [
      { step: "Photo-Sensitivity History", description: "Reviewing medication photo-sensitizers and onset times following UV exposure." },
      { step: "Skin Heat Reaction Modalities", description: "Evaluating tolerance to radiant heat, sweat, and direct sunlight." },
      { step: "Constitutional Desensitization Prescription", description: "Administering remedies that increase cutaneous tolerance to photo-stimuli." },
      { step: "Physical UV Protection Advice", description: "Guiding zinc oxide sunblocks and protective clothing during outdoor hours." },
    ],
    whenToSeekUrgentCare: [
      "Extensive blistering with fever and chills resembling second-degree burns",
    ],
    faqs: [
      { question: "Can homeopathy help me tolerate outdoor sunlight better?", answer: "Yes, constitutional care works to balance immune reactivity to UV rays, reducing rash severity over successive seasons." },
    ],
    metaDescription: "Homeopathic care for sun allergy and polymorphic light eruption with Dr. Noor ul Qamar, Lahore.",
  },

  // --- JOINT & PAIN CARE ---
  {
    slug: "arthritis",
    title: "Arthritis",
    category: "Joint & Pain Care",
    featured: true,
    shortDescription: "Comprehensive constitutional care to manage joint stiffness, inflammation, and mobility comfort.",
    commonConcerns: [
      "Aching, swelling, and warmth in multiple joints (knees, hands, shoulders, hips)",
      "Morning joint stiffness lasting more than 30 minutes",
      "Crepitus, grinding sounds, and progressive reduction in flexibility",
    ],
    howConsultationWorks: [
      { step: "Rheumatological Profiling", description: "Reviewing X-rays, ESR, CRP, rheumatoid factor, and uric acid levels." },
      { step: "Weather & Movement Modalities", description: "Noting whether pain improves with gentle motion, warm wraps, rest, or worsens with damp cold." },
      { step: "Constitutional Anti-Inflammatory Remedy", description: "Selecting natural remedies to soothe synovial inflammation and protect joint cartilage." },
      { step: "Joint Preservation Guidance", description: "Recommending low-impact mobility exercises, hydration, and anti-inflammatory nutrition." },
    ],
    whenToSeekUrgentCare: [
      "Hot, red, exquisitely swollen single joint with high fever (rule out septic arthritis in emergency room)",
      "Sudden inability to bear any weight on a joint following a trauma or fall",
    ],
    faqs: [
      { question: "Can I take homeopathy alongside my prescribed pain relievers?", answer: "Yes, homeopathic remedies can be safely used alongside prescribed analgesics. As comfort improves, your physician can guide pain medication reduction." },
    ],
    metaDescription: "Arthritis homeopathic treatment in Lahore with Dr. Noor ul Qamar. Gentle relief from joint pain, morning stiffness, and inflammation.",
  },
  {
    slug: "rheumatoid-arthritis-support",
    title: "Rheumatoid Arthritis Support",
    category: "Joint & Pain Care",
    shortDescription: "Complementary autoimmune support to soothe symmetrical small joint pain, swelling, and morning stiffness.",
    commonConcerns: [
      "Symmetrical pain, swelling, and boggy warmth in MCP and PIP finger joints and wrists",
      "Protracted morning stiffness lasting hours",
      "Systemic malaise, low-grade fatigue, and rheumatoid nodules",
    ],
    howConsultationWorks: [
      { step: "Serological & Rheumatology Review", description: "Evaluating Anti-CCP antibodies, RF, ESR, and coordinating with your rheumatologist's DMARD protocol." },
      { step: "Constitutional Immune Regulation", description: "Prescribing deep-acting remedies aimed at dampening autoimmune hyper-reactivity." },
      { step: "Gentle Joint Mobilization Support", description: "Encouraging gentle range-of-motion routines to preserve fine motor function." },
      { step: "Inflammatory Index Tracking", description: "Observing functional ease and monitoring routine blood parameters." },
    ],
    whenToSeekUrgentCare: [
      "Severe cervical spine pain with neurological numbness or weakness in hands",
      "Sudden severe eye redness and pain (scleritis / uveitis complication)",
    ],
    faqs: [
      { question: "Should I discontinue my DMARDs or biologics?", answer: "No. Never stop your DMARDs or biological medications without your rheumatologist's explicit supervision. Homeopathy works complementarily." },
    ],
    metaDescription: "Rheumatoid arthritis supportive homeopathic care in Lahore with Dr. Noor ul Qamar. Soothe joint swelling and autoimmune stiffness.",
  },
  {
    slug: "osteoarthritis-support",
    title: "Osteoarthritis Support",
    category: "Joint & Pain Care",
    shortDescription: "Gentle constitutional therapies to relieve knee, hip, and spine cartilage wear-and-tear and pain.",
    commonConcerns: [
      "Knee pain worsening when climbing stairs, squatting, or standing up from a chair",
      "Audible clicking or grinding sensations (crepitus) on movement",
      "Joint stiffness after sitting that loosens up after a few steps",
    ],
    howConsultationWorks: [
      { step: "Radiological Joint Space Review", description: "Assessing weight-bearing X-rays for joint space narrowing, subchondral sclerosis, and osteophytes." },
      { step: "Modalities & Biomechanical Analysis", description: "Determining aggravating weather conditions, walking surfaces, and gait posture." },
      { step: "Cartilage Comfort Homeopathic Remedy", description: "Administering natural remedies that soothe periarticular soft tissue strain and synovial discomfort." },
      { step: "Quadriceps & Weight Support Coaching", description: "Recommending gentle strengthening and low-impact walking routines." },
    ],
    whenToSeekUrgentCare: [
      "Sudden knee locking where the joint cannot be straightened at all (possible displaced meniscal tear)",
    ],
    faqs: [
      { question: "Can homeopathy regrow completely worn-out cartilage in Stage 4 OA?", answer: "Homeopathy cannot reverse advanced Stage 4 bone-on-bone changes, but it can provide meaningful pain relief, reduce reliance on painkillers, and preserve functional mobility in Stages 1 to 3." },
    ],
    metaDescription: "Osteoarthritis and knee pain homeopathic care in Lahore with Dr. Noor ul Qamar. Relieve stiffness and support joint mobility.",
  },
  {
    slug: "ankylosing-spondylitis-support",
    title: "Ankylosing Spondylitis Support",
    category: "Joint & Pain Care",
    shortDescription: "Supportive homeopathic care for sacroiliac joint inflammation, morning back stiffness, and spine mobility.",
    commonConcerns: [
      "Deep dull buttocks pain and lower back stiffness that awakens you in the second half of the night",
      "Stiffness that improves with warm showers and movement but worsens with rest",
      "Positive HLA-B27 marker with radiographic sacroiliitis",
    ],
    howConsultationWorks: [
      { step: "Pelvic MRI & HLA-B27 Review", description: "Evaluating sacroiliac joint edema, syndesmophytes, and spinal flexibility tests." },
      { step: "Constitutional Axial Spondylitis Prescription", description: "Selecting deep homeopathic remedies to ease inflammatory pain and night restlessness." },
      { step: "Postural & Thoracic Expansion Exercises", description: "Emphasizing chest expansion and posture maintenance routines." },
      { step: "Long-Term Quality of Life Review", description: "Monitoring daily stiffness duration and functional movement." },
    ],
    whenToSeekUrgentCare: [
      "Sudden painful red eye with photophobia and blurred vision (acute anterior uveitis requires emergency ophthalmologist care)",
    ],
    faqs: [
      { question: "Can homeopathy be used alongside biologics for Ankylosing Spondylitis?", answer: "Yes, supportive constitutional homeopathy integrates safely alongside conventional biologics or NSAIDs to support overall vitality." },
    ],
    metaDescription: "Ankylosing spondylitis supportive care in Lahore with Dr. Noor ul Qamar. Gentle relief for sacroiliac pain and spine stiffness.",
  },
  {
    slug: "sciatica",
    title: "Sciatica",
    category: "Joint & Pain Care",
    shortDescription: "Fast, gentle relief for shooting nerve pain, tingling, and numbness radiating down the leg.",
    commonConcerns: [
      "Sharp, electric, or burning pain shooting from lower back through buttocks down to calf or foot",
      "Pain aggravated by coughing, sneezing, bending forward, or prolonged sitting",
      "Numbness, pins-and-needles, or heavy sensations along the sciatic nerve pathway",
    ],
    howConsultationWorks: [
      { step: "Lumbar Spine MRI Review", description: "Reviewing disc bulge/herniation levels (L4-L5, L5-S1) and nerve root compression." },
      { step: "Neuralgic Pain Modality Mapping", description: "Noting whether pain is right-sided or left-sided, relieved by lying down, heat, or gentle walking." },
      { step: "Nerve Soothing Homeopathic Remedy", description: "Prescribing targeted remedies renowned for calming acute nerve sheath irritation." },
      { step: "Ergonomic & Core Care Guidance", description: "Advising lumbar support, proper lifting mechanics, and avoiding nerve stretch strain." },
    ],
    whenToSeekUrgentCare: [
      "Cauda Equina Syndrome: sudden loss of bladder or bowel control, or progressive numbness in groin/saddle area (immediate emergency spinal surgery required)",
      "Sudden progressive 'foot drop' where you cannot lift your foot when walking",
    ],
    faqs: [
      { question: "How quickly does sciatica respond to homeopathy?", answer: "Many patients experience significant relief from sharp neuralgic shooting pains within 7 to 14 days of starting the indicated remedy." },
    ],
    metaDescription: "Sciatica nerve pain relief in Lahore with Dr. Noor ul Qamar. Natural, fast homeopathic relief for leg and lower back nerve pain.",
  },
  {
    slug: "low-back-pain",
    title: "Low Back Pain",
    category: "Joint & Pain Care",
    shortDescription: "Individualized care for chronic lumbago, muscular spasms, postural backache, and disc strain.",
    commonConcerns: [
      "Dull, persistent ache in the lumbar region after standing or sitting at a desk all day",
      "Acute lumbar muscle catch or spasm triggered by bending or lifting",
      "Morning stiffness in the lower spine needing time to warm up",
    ],
    howConsultationWorks: [
      { step: "Musculoskeletal & Postural Audit", description: "Assessing pelvic tilt, core weakness, desk ergonomics, and spinal mobility." },
      { step: "Pain Modality Assessment", description: "Checking if backache is relieved by firm pressure, warm application, or continuous gentle movement." },
      { step: "Muscular & Ligamentous Tonic", description: "Prescribing remedies that ease ligamentous sprain and chronic myofascial trigger points." },
      { step: "Spinal Rehabilitation Advice", description: "Guiding gentle core stabilization and ergonomic chair adjustments." },
    ],
    whenToSeekUrgentCare: [
      "Back pain accompanied by unexplained high fever, night sweats, or a history of cancer",
      "Severe pain following major trauma (motor vehicle accident or fall from height)",
    ],
    faqs: [
      { question: "Is bed rest the best approach for lower back pain?", answer: "Prolonged bed rest often worsens stiffness. Gentle movement supported by the right homeopathic remedies promotes faster muscular recovery." },
    ],
    metaDescription: "Low back pain and lumbago homeopathic treatment in Lahore with Dr. Noor ul Qamar. Relieve muscular spasm and lumbar stiffness.",
  },
  {
    slug: "gout-high-uric-acid",
    title: "Gout & High Uric Acid",
    category: "Joint & Pain Care",
    shortDescription: "Constitutional care to reduce serum uric acid, prevent painful gouty flares, and ease tophi inflammation.",
    commonConcerns: [
      "Sudden, excruciating, throbbing pain, redness, and swelling in the big toe (podagra)",
      "High serum uric acid levels (> 7.0 mg/dL in men, > 6.0 mg/dL in women) on blood tests",
      "Repeated flares triggered by meat, seafood, lentils, or dehydration",
    ],
    howConsultationWorks: [
      { step: "Metabolic & Renal Uric Audit", description: "Evaluating blood uric acid, creatinine, GFR, and dietary purine patterns." },
      { step: "Acute Flare vs. Chronic Diathesis Care", description: "Managing acute throbbing joint pain followed by deep constitutional remedies to prevent crystal precipitation." },
      { step: "Dietary Purine & Hydration Plan", description: "Guiding generous alkaline hydration and realistic dietary adjustments." },
      { step: "Serum Uric Acid Monitoring", description: "Retesting blood levels every 8 weeks to track steady normalization." },
    ],
    whenToSeekUrgentCare: [
      "Joint swelling accompanied by high spiking fever and chills (must rule out septic joint infection)",
    ],
    faqs: [
      { question: "Can homeopathy lower high uric acid levels permanently?", answer: "Homeopathy addresses the metabolic tendency of the liver and kidneys to overproduce or underexcrete uric acid, helping maintain balanced levels long-term." },
    ],
    metaDescription: "Gout and high uric acid homeopathic treatment in Lahore by Dr. Noor ul Qamar. Fast relief from big toe pain and crystal deposits.",
  },
  {
    slug: "varicose-veins",
    title: "Varicose Veins",
    category: "Joint & Pain Care",
    shortDescription: "Constitutional vascular support for tortuous leg veins, heavy tired legs, and venous stasis discomfort.",
    commonConcerns: [
      "Enlarged, twisted, blue or dark purple veins bulging on calves and thighs",
      "Aching, heavy, or throbbing pain in the legs worsening after prolonged standing",
      "Restless legs, ankle swelling by evening, and itchy skin over veins",
    ],
    howConsultationWorks: [
      { step: "Venous Doppler Ultrasound Review", description: "Reviewing saphenofemoral junction competence and deep vs. superficial venous reflux." },
      { step: "Venous Wall Tonic Homeopathy", description: "Prescribing proven vascular remedies that tone venous valves and reduce capillary fragility." },
      { step: "Circulatory Routine & Leg Elevation", description: "Advising calf-muscle pumping exercises, periodic leg elevation, and supportive stockings if indicated." },
      { step: "Skin Integrity Tracking", description: "Guiding moisturization to prevent stasis dermatitis and venous ulcerations." },
    ],
    whenToSeekUrgentCare: [
      "Sudden, hot, red, firm, tender cord-like vein swelling (superficial thrombophlebitis or DVT risk)",
      "Sudden unilateral leg swelling with calf pain and chest shortness of breath (emergency ER evaluation for DVT/PE)",
      "Profuse bleeding from a burst varicose vein (apply direct firm pressure and seek medical care)",
    ],
    faqs: [
      { question: "Can homeopathy cure bulging varicose veins completely?", answer: "Homeopathy greatly relieves the aching pain, heaviness, cramps, and prevents complications and progression. Very large, tortuous veins with failed valves may still require vascular evaluation." },
    ],
    metaDescription: "Varicose veins and heavy legs homeopathic care in Lahore with Dr. Noor ul Qamar. Strengthen venous tone and relieve leg aching.",
  },

  // --- NEUROLOGY, HEADACHE & MENTAL WELLNESS ---
  {
    slug: "migraine",
    title: "Migraine",
    category: "General Wellness",
    featured: true,
    shortDescription: "Constitutional care to reduce frequency and intensity of throbbing one-sided headaches, auras, and nausea.",
    commonConcerns: [
      "Intense throbbing or pulsating pain usually on one side of the head",
      "Extreme sensitivity to light (photophobia), sound (phonophobia), and odors",
      "Visual auras (zigzag lines, blind spots) preceding the attack",
      "Associated nausea, vomiting, and necessity to lie down in a dark, quiet room",
    ],
    howConsultationWorks: [
      { step: "Migraine Diary & Trigger Analysis", description: "Identifying personal triggers: lack of sleep, hormonal fluctuations, skipped meals, bright sunlight, or stress letdown." },
      { step: "Vascular & Neural Modality Profile", description: "Noting whether pain is relieved by firm head pressure, cold compresses, or dark isolation." },
      { step: "Constitutional Desensitization Prescription", description: "Selecting deep-acting constitutional remedies to stabilize neuro-vascular excitability." },
      { step: "Monthly Frequency Tracking", description: "Monitoring reduction in monthly attack days and decreased need for emergency triptans or pain relievers." },
    ],
    whenToSeekUrgentCare: [
      "Sudden, catastrophic 'thunderclap' headache reaching maximum intensity in seconds (immediate ER evaluation for subarachnoid haemorrhage)",
      "Headache with fever, stiff neck, confusion, seizure, or focal neurological deficit (weakness/speech slurring)",
    ],
    faqs: [
      { question: "Can homeopathy stop recurrent migraines?", answer: "Constitutional homeopathy is exceptionally effective for recurrent migraines because it addresses underlying neurovascular sensitivity and hormonal triggers." },
    ],
    metaDescription: "Migraine homeopathic treatment in Lahore by Dr. Noor ul Qamar. Natural, gentle relief from one-sided headaches, aura, and nausea.",
  },
  {
    slug: "tension-headache",
    title: "Tension Headache",
    category: "General Wellness",
    shortDescription: "Gentle therapies for tight band-like head pressure, neck tension, and stress-induced headaches.",
    commonConcerns: [
      "Dull, aching pain feeling like a tight vice or band squeezing around the forehead or back of head",
      "Tenderness in scalp, neck, and shoulder muscles",
      "Worsening toward late afternoon following prolonged computer work or driving",
    ],
    howConsultationWorks: [
      { step: "Cervical & Postural Assessment", description: "Reviewing forward-head posture, screen time, eye strain, and daily stress accumulation." },
      { step: "Myofascial Tension Remedies", description: "Selecting homeopathic remedies that relax cervical muscles and calm tension." },
      { step: "Ergonomic & Hydration Strategy", description: "Advising frequent micro-breaks, eye-relaxation exercises, and hydration." },
      { step: "Headache Free Days Follow-up", description: "Observing steady reduction in weekly tension episodes." },
    ],
    whenToSeekUrgentCare: [
      "New, progressive headache starting after age 50 or headache waking you up every night with vomiting",
    ],
    faqs: [
      { question: "How does homeopathy differ from taking daily paracetamol?", answer: "Paracetamol masks the pain temporarily. Homeopathy addresses chronic muscular spasm, emotional tension, and nervous fatigue that generate the headache." },
    ],
    metaDescription: "Tension headache care in Lahore with Dr. Noor ul Qamar. Relieve tight band-like head pain and neck muscle stiffness naturally.",
  },
  {
    slug: "anxiety-sleep-support",
    title: "Anxiety & Sleep Support",
    category: "General Wellness",
    featured: true,
    shortDescription: "Compassionate, non-addictive constitutional support for nervous restlessness, panic tendencies, and insomnia.",
    commonConcerns: [
      "Persistent racing thoughts, anticipatory anxiety, and feeling on edge",
      "Difficulty falling asleep, tossing and turning for hours, or waking at 3 AM with dread",
      "Physical anxiety symptoms: heart fluttering, shallow breathing, stomach churning, trembling hands",
    ],
    howConsultationWorks: [
      { step: "Psychosomatic Mind-Body Intake", description: "Taking a deep, respectful, non-judgmental case history of life stressors, grief, perfectionism, and fears." },
      { step: "Sleep Architecture Analysis", description: "Differentiating between sleep onset latency, frequent nocturnal awakenings, and non-restorative sleep." },
      { step: "Constitutional Calming Remedy", description: "Administering individualized remedies that gently balance nervous system tone without sedation." },
      { step: "Sleep Hygiene Coaching", description: "Guiding circadian rhythm alignment, evening screen cut-offs, and relaxation rituals." },
    ],
    whenToSeekUrgentCare: [
      "Active thoughts of self-harm or suicide (reach out immediately to emergency mental health crisis services or hospital ER)",
      "Severe acute panic with crushing chest pain (always rule out cardiac causes first)",
    ],
    faqs: [
      { question: "Are homeopathic sleep remedies habit-forming or sedating?", answer: "No. Homeopathic remedies are completely non-addictive and do not cause morning grogginess or physical dependency." },
      { question: "Can I take homeopathy if I am already taking anti-depressants or anxiolytics?", answer: "Yes, you can take supportive homeopathic care safely alongside prescribed psychiatric medications. Never alter psychiatric dosages on your own." },
    ],
    metaDescription: "Anxiety and insomnia homeopathic support in Lahore with Dr. Noor ul Qamar. Non-addictive, natural calm for restless minds and sound sleep.",
  },
  {
    slug: "epilepsy-support",
    title: "Epilepsy Support",
    category: "General Wellness",
    shortDescription: "Supportive, adjunctive care to promote nervous system stability and emotional calm alongside neurologist treatment.",
    commonConcerns: [
      "Persistent exhaustion, brain fog, and anxiety between seizure episodes",
      "Emotional triggers or sleep deprivation lowering seizure thresholds",
      "Desire for complementary nervous system support",
    ],
    howConsultationWorks: [
      { step: "Neurology Care Alignment", description: "Strictly reviewing neurologist diagnosis, EEG reports, MRI brain scans, and anti-epileptic medications." },
      { step: "Supportive Constitutional Selection", description: "Prescribing gentle, ultra-diluted remedies aimed at supporting nervous resilience and overall vitality." },
      { step: "Strict Non-Discontinuation Contract", description: "Explicit agreement that anti-epileptic drugs (AEDs) will NEVER be stopped or altered without your neurologist." },
      { step: "Quality of Life & Fatigue Review", description: "Supporting mental clarity, restful sleep, and emotional calm." },
    ],
    whenToSeekUrgentCare: [
      "Seizure lasting longer than 5 minutes or multiple seizures without regaining consciousness (Status Epilepticus is an immediate 911/ER medical emergency)",
      "First-ever seizure, or seizure following a head injury",
    ],
    faqs: [
      { question: "Does homeopathy replace anti-seizure medication?", answer: "No. Never stop or reduce your anti-epileptic medication. Homeopathy is offered strictly as an adjunctive therapy to support general health and stress resilience." },
    ],
    metaDescription: "Supportive homeopathic care for individuals with epilepsy with Dr. Noor ul Qamar, Lahore. Gentle nervous system vitality alongside neurologist care.",
  },
  {
    slug: "ear-infection-support",
    title: "Ear Infection Support (Otitis Media)",
    category: "General Wellness",
    shortDescription: "Gentle remedies for earache, recurrent middle ear fluid, Eustachian tube catarrh, and pain.",
    commonConcerns: [
      "Sharp, throbbing ear pain following a common cold or flu",
      "Feeling of fullness, clogged ears, or crackling sounds on swallowing",
      "Recurrent otitis media with effusion in children or adults",
    ],
    howConsultationWorks: [
      { step: "Otoscopic History Review", description: "Reviewing tympanic membrane appearance (bulging, redness, fluid levels, or perforation)." },
      { step: "Pain Modality Profile", description: "Noting whether warmth or cold application relieves earache, and reviewing nasal congestion links." },
      { step: "Eustachian Drainage Remedies", description: "Administering remedies to relieve catarrhal congestion and soothe middle ear inflammation." },
      { step: "Recurrence Prevention", description: "Building mucosal immune resistance to stop recurrent seasonal earaches." },
    ],
    whenToSeekUrgentCare: [
      "Mastoiditis signs: painful red swelling or tenderness behind the ear with high fever",
      "Purulent or bloody ear discharge following acute severe pain (indicates eardrum perforation requiring medical check)",
      "Sudden hearing loss or facial nerve weakness",
    ],
    faqs: [
      { question: "Can homeopathy help recurrent glue ear without grommet surgery?", answer: "Yes, many children and adults with Eustachian tube dysfunction and recurrent fluid accumulation benefit significantly from constitutional homeopathic catarrhal remedies." },
    ],
    metaDescription: "Ear infection and earache homeopathic relief in Lahore with Dr. Noor ul Qamar. Soothe ear pain and support Eustachian drainage.",
  },
  {
    slug: "uti-support",
    title: "UTI Support (Recurrent Urinary Tract Infections)",
    category: "Women's Health",
    shortDescription: "Supportive constitutional care to reduce recurrence of urinary burning, frequency, and bladder irritation.",
    commonConcerns: [
      "Frequent urgent need to urinate with only a few painful, burning drops passed",
      "Suprapubic aching and bladder discomfort",
      "Recurrent episodes recurring every few weeks despite repeated antibiotic courses",
    ],
    howConsultationWorks: [
      { step: "Urine Culture & Sensitivity Review", description: "Checking midstream urine culture reports, bacterial counts, and antibiotic resistance patterns." },
      { step: "Bladder Mucosal Constitutional Remedy", description: "Prescribing deep-acting remedies to strengthen the urinary urothelium and soothe dysuria." },
      { step: "Hydration & Bladder Habits", description: "Advising proper hydration, post-coital urination, and urinary hygiene without harsh chemical washes." },
      { step: "Recurrence Tracking", description: "Observing prolonged infection-free intervals across months." },
    ],
    whenToSeekUrgentCare: [
      "Pyelonephritis signs: flank/kidney pain, high spiking fever, shaking chills, nausea, vomiting (requires immediate hospital antibiotic treatment)",
      "Visible blood in urine (gross haematuria) without previous medical evaluation",
    ],
    faqs: [
      { question: "Should I take antibiotics if I have an acute severe UTI with fever?", answer: "Yes, acute febrile urinary tract infections require immediate conventional medical evaluation and antibiotics to protect the kidneys. Homeopathy is ideal for chronic, recurrent prevention." },
    ],
    metaDescription: "Recurrent UTI homeopathic care in Lahore with Dr. Noor ul Qamar. Natural support to soothe burning urination and stop frequent infections.",
  },
  {
    slug: "eosinophilia-support",
    title: "Eosinophilia Support",
    category: "General Wellness",
    shortDescription: "Individualized remedies to balance allergic diathesis and moderate elevated absolute eosinophil counts.",
    commonConcerns: [
      "Elevated eosinophil levels on routine CBC blood tests (> 500 cells/mcL)",
      "Associated allergic symptoms: chronic dry cough, chest tightness, or itchy skin",
      "Seasonal allergy flare-ups with persistent fatigue",
    ],
    howConsultationWorks: [
      { step: "Hematology & Allergy History", description: "Reviewing complete blood count (CBC), absolute eosinophil count (AEC), and ruling out parasitic infections." },
      { step: "Allergic Diathesis Homeopathic Prescription", description: "Selecting deep constitutional remedies suited to hyper-eosinophilic allergic terrain." },
      { step: "Environmental Allergen Audit", description: "Assisting in identifying indoor and dietary sensitivities." },
      { step: "Follow-up AEC Testing", description: "Retesting absolute eosinophil counts every 8 to 12 weeks to observe steady stabilization." },
    ],
    whenToSeekUrgentCare: [
      "Rapidly rising eosinophil count (> 1500) accompanied by chest pain, heart failure signs, or neurological weakness (Hyper-eosinophilic syndrome requires emergency specialist care)",
    ],
    faqs: [
      { question: "What causes eosinophils to rise?", answer: "Eosinophils most commonly rise in response to chronic allergies, asthma, eczema, or parasitic exposure. Homeopathy works to rebalance this hyperactive immune response." },
    ],
    metaDescription: "Eosinophilia homeopathic care in Lahore with Dr. Noor ul Qamar. Natural constitutional support for high eosinophil counts and allergies.",
  },
  {
    slug: "anaemia-support",
    title: "Anaemia Support",
    category: "General Wellness",
    shortDescription: "Supportive constitutional care to enhance iron absorption, improve vitality, and overcome chronic fatigue.",
    commonConcerns: [
      "Low haemoglobin, low ferritin, pale conjunctiva, and brittle ridged nails",
      "Persistent exhaustion, dizziness when standing quickly, and shortness of breath on stairs",
      "Intolerance to oral iron tablets (severe constipation or stomach cramps)",
    ],
    howConsultationWorks: [
      { step: "Complete Iron Profile Analysis", description: "Reviewing CBC, serum iron, ferritin, TIBC, and ruling out hidden sources of blood loss." },
      { step: "Digestive Absorption Homeopathic Remedy", description: "Prescribing natural remedies that enhance intestinal iron uptake and assimilation." },
      { step: "Dietary Iron Synergy Guidance", description: "Recommending food combinations that boost non-heme and heme iron absorption with Vitamin C." },
      { step: "Haemoglobin Tracking", description: "Retesting CBC and ferritin after 8 to 12 weeks of treatment." },
    ],
    whenToSeekUrgentCare: [
      "Severe acute anaemia: severe chest pain, shortness of breath at rest, extreme pallor, or fainting (requires urgent transfusion/ER evaluation)",
    ],
    faqs: [
      { question: "Does homeopathy replace iron supplements?", answer: "Homeopathy does not directly provide elemental iron molecules, but it optimizes your body's ability to absorb iron from diet and supplements without gastrointestinal distress." },
    ],
    metaDescription: "Anaemia homeopathic support in Lahore with Dr. Noor ul Qamar. Enhance iron absorption, boost energy, and relieve chronic fatigue naturally.",
  },

  // --- CHILD HEALTH ---
  {
    slug: "child-health",
    title: "Child Health & Pediatric Wellness",
    category: "Child Health",
    featured: true,
    shortDescription: "Gentle, sweet-tasting, non-toxic homeopathic care for pediatric recurrent colds, teething, poor appetite, and immunity.",
    commonConcerns: [
      "Frequent catching of colds, coughs, and throat infections with every weather shift or school term",
      "Teething distress: irritability, gum swelling, loose motions, and sleep disturbance",
      "Poor appetite, selective eating, sluggish weight gain, and digestive sluggishness",
      "Pediatric eczema, diaper rash, or recurrent nocturnal bedwetting",
    ],
    howConsultationWorks: [
      { step: "Gentle Child Observation", description: "Observing child's temperament, physical milestones, thermal preferences, sleep habits, and emotional nature." },
      { step: "Sweet-Tasting Dilution Dispensing", description: "Providing gentle, sugar-globule remedies that children love to take without struggle or distress." },
      { step: "Immune Building Foundation", description: "Focusing on constitutional resilience to break the cycle of repeated antibiotic and fever syrup use." },
      { step: "Parental Guidance & Growth Tracking", description: "Guiding parents on balanced pediatric nutrition, hydration, and natural fever management." },
    ],
    whenToSeekUrgentCare: [
      "High persistent fever with lethargy, stiff neck, bulging fontanelle in infants, or purple rash",
      "Signs of pediatric dehydration: no wet diapers for 8 hours, sunken eyes, dry crying without tears",
      "Stridor, barking cough with retractions, or severe breathing distress",
    ],
    faqs: [
      { question: "Is homeopathy safe for infants and toddlers?", answer: "Yes, homeopathic remedies are ultra-diluted, non-toxic, free of synthetic chemical additives, and exceptionally gentle for young developing bodies." },
      { question: "How do children take homeopathic medicines?", answer: "Remedies are dispensed as tiny sweet globules that dissolve instantly on the tongue, making medicine time completely tear-free." },
    ],
    metaDescription: "Pediatric homeopathy in Lahore with Dr. Noor ul Qamar. Gentle, sweet, non-toxic care for children's immunity, colds, and appetite.",
  },

  // --- MEN'S HEALTH ---
  {
    slug: "erectile-dysfunction-mens-wellness",
    title: "Erectile Dysfunction & Men’s Wellness",
    category: "Men's Health",
    featured: true,
    shortDescription: "Confidential, respectful constitutional care for performance anxiety, circulatory vitality, and vitality restoration.",
    commonConcerns: [
      "Difficulty achieving or maintaining firm erections during intimacy",
      "Performance anxiety, work stress, mental exhaustion, and loss of confidence",
      "Underlying vascular sluggishness, smoking history, or diabetes-related nerve fatigue",
    ],
    howConsultationWorks: [
      { step: "Strictly Confidential Intake", description: "Conducting a sensitive, private consultation assessing cardiovascular health, stress, and lifestyle." },
      { step: "Psychosomatic & Vascular Profiling", description: "Differentiating between performance-related autonomic nervousness and organic vascular causes." },
      { step: "Constitutional Vitality Prescription", description: "Administering individualized remedies that invigorate microvascular blood flow and calm nervous apprehension." },
      { step: "Sleep, Exercise & Nitric Oxide Habits", description: "Advising lifestyle measures that support healthy cardiovascular endothelium." },
    ],
    whenToSeekUrgentCare: [
      "Priapism: prolonged, painful erection lasting longer than 4 hours (immediate urological emergency)",
      "Sudden testicular pain or swelling (must rule out testicular torsion in hospital ER)",
    ],
    faqs: [
      { question: "Is the consultation completely private and confidential?", answer: "Yes. All consultations at Dr. Noor ul Qamar Homeopathy Care are strictly confidential, whether conducted in-clinic or through private WhatsApp video/audio." },
      { question: "Do homeopathic remedies contain synthetic stimulants?", answer: "Never. Homeopathic remedies are 100% natural and do not contain sildenafil, synthetic stimulants, or dangerous chemicals." },
    ],
    metaDescription: "Confidential Men's Health & ED homeopathic care in Lahore with Dr. Noor ul Qamar. Natural constitutional vitality and stress relief.",
  },
  {
    slug: "premature-ejaculation-support",
    title: "Premature Ejaculation Support",
    category: "Men's Health",
    shortDescription: "Empathetic, holistic care addressing nervous excitability, pelvic floor tension, and ejaculatory control.",
    commonConcerns: [
      "Inability to delay ejaculation, occurring within one minute of penetration",
      "High autonomic nervous excitability, rapid heart rate, and performance anxiety",
      "Relationship tension, frustration, and diminished sexual confidence",
    ],
    howConsultationWorks: [
      { step: "Ejaculatory Rhythm & History Assessment", description: "Evaluating whether condition is lifelong (primary) or acquired (secondary to stress or prostatitis)." },
      { step: "Autonomic Nervous Regulation", description: "Prescribing deep-acting homeopathic remedies to calm sympathetic nervous hyper-reflexes." },
      { step: "Pelvic Muscle Awareness Guidance", description: "Guiding relaxation of hypertonic pelvic floor musculature." },
      { step: "Progressive Confidence Follow-up", description: "Observing improved sensory control and reduced anxiety over regular follow-ups." },
    ],
    whenToSeekUrgentCare: [
      "Painful ejaculation accompanied by blood in semen, high fever, or severe pelvic pain (requires urologist evaluation for acute prostatitis)",
    ],
    faqs: [
      { question: "How does homeopathy address premature ejaculation?", answer: "Rather than using topical numbing creams that deaden sensation, homeopathy calms central nervous system over-excitability and balances autonomic reflexes." },
    ],
    metaDescription: "Premature ejaculation homeopathic care in Lahore with Dr. Noor ul Qamar. Confidential, natural support for nervous control and confidence.",
  },
  {
    slug: "prostate-enlargement-support",
    title: "Prostate Enlargement Support (BPH)",
    category: "Men's Health",
    shortDescription: "Gentle therapies for Benign Prostatic Hyperplasia, weak urinary stream, nighttime frequency, and urgency.",
    commonConcerns: [
      "Waking up 3 to 6 times every night to urinate (nocturia), disrupting rest",
      "Hesitancy: waiting at the toilet for the urinary stream to start",
      "Weak, interrupted, or dribbling urinary stream with feeling of incomplete bladder emptying",
    ],
    howConsultationWorks: [
      { step: "Prostate Ultrasound & PSA Review", description: "Reviewing post-void residual urine volume (PVR), prostate gland volume in grams, and serum PSA levels." },
      { step: "Prostatic Decongestant Homeopathic Prescription", description: "Selecting specific remedies known to reduce pelvic venous congestion and relax bladder neck tension." },
      { step: "Fluid Timing & Bladder Habits", description: "Advising evening fluid management, avoiding caffeine/alcohol after sunset, and double voiding." },
      { step: "Serial Residual Volume Checks", description: "Tracking reduction in nocturia episodes and improved stream vigor." },
    ],
    whenToSeekUrgentCare: [
      "Acute urinary retention: sudden total inability to pass urine with painful bladder distension (requires immediate catheterization in emergency room)",
      "High fever with severe difficulty urinating (acute bacterial prostatitis)",
    ],
    faqs: [
      { question: "Can homeopathy help me avoid prostate surgery for BPH?", answer: "Many men with mild-to-moderate BPH experience marked improvement in urinary flow and a reduction in nighttime waking, helping maintain bladder health comfortably." },
      { question: "Is a PSA blood test required before starting treatment?", answer: "Yes, Dr. Noor ul Qamar always recommends a recent PSA test and ultrasound to ensure responsible medical monitoring." },
    ],
    metaDescription: "Prostate enlargement (BPH) homeopathic care in Lahore with Dr. Noor ul Qamar. Relieve night urination frequency and weak stream naturally.",
  },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return TREATMENTS.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(category: TreatmentCategory): Treatment[] {
  return TREATMENTS.filter((t) => t.category === category);
}

export function searchTreatments(query: string, category?: string): Treatment[] {
  const q = query.trim().toLowerCase();
  return TREATMENTS.filter((t) => {
    const matchesCategory =
      !category || category === "All" || t.category.toLowerCase() === category.toLowerCase();
    const matchesQuery =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.commonConcerns.some((c) => c.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });
}
