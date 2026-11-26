/**
 * Generates Clinically Relevant Medical Illustrations for:
 * 1. Medical Categories (8)
 * 2. Supportive Disease Kits (6)
 * 3. Health Blog Articles (5)
 * 4. Women's Health Wing (2)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClinicalFrame } = require('./theme');

const SUPPLEMENTARY_ASSETS = [
  // 1. Categories (8)
  {
    dest: 'public/images/categories/womens-health.webp',
    category: "Women's Health",
    title: "Women's Health & Fertility",
    subtitle: "Endocrine Gynaecology, Ovarian Rhythm & Pre-Conception Care",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Ovarian Follicular Rhythm', sub: 'Ovulation & AMH reserve', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Uterine Endometrial Lining', sub: 'Cyclical hormonal receptivity', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Hypothalamic-Pituitary Axis', sub: 'LH, FSH, Estrogen & Progesterone', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Confidential Case-Taking', sub: 'Private constitutional consultation', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="140" ry="105" fill="#1b4534" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
        <path d="M0,-50 C-40,-50 -70,-20 -70,20 C-70,50 -40,75 0,75 C40,75 70,50 70,20 C70,-20 40,-50 0,-50 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="-100" cy="0" r="18" fill="#d4af37"/>
        <circle cx="100" cy="0" r="18" fill="#d4af37"/>
        <text x="0" y="10" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">REPRODUCTIVE HEALTH</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/skin-hair.webp',
    category: "Skin & Hair",
    title: "Skin & Hair (Dermatology)",
    subtitle: "Dermal Barrier Integrity, Cutaneous Immunology & Trichology",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Follicular Miniaturization & Growth', sub: 'Hair root vascularization', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Stratum Corneum Barrier', sub: 'Lipid matrix & moisture defense', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Sebaceous Gland Equilibrium', sub: 'Acne & sebum regulation', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Autoimmune Melanocyte Care', sub: 'Vitiligo & pigment balance', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="130" fill="#143e2e" stroke="#c5a059" stroke-width="2.5"/>
        <path d="M-90,-60 Q0,-80 90,-60 L90,60 Q0,80 -90,60 Z" fill="#245c43" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M-20,-80 L-20,30 C-20,55 20,55 20,30 L20,-80" fill="#2d6e53" stroke="#d4af37" stroke-width="2"/>
        <ellipse cx="0" cy="45" rx="16" ry="18" fill="#d4af37"/>
        <text x="0" y="85" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">DERMAL MATRIX</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/digestive-health.webp',
    category: "Digestive Health",
    title: "Digestive & Liver Health",
    subtitle: "Gastroenterology, Hepato-Biliary Kinetics & Colorectal Care",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Gastroduodenal Mucosal Defense', sub: 'Acidity, gastritis & ulcer repair', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Hepatic Parenchymal Vitality', sub: 'Fatty liver & biliary clearance', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Brain-Gut Enteric Axis', sub: 'IBS & motility regulation', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Anorectal Venous Integrity', sub: 'Piles & fissure resolution', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="140" ry="110" fill="#133324" stroke="#b89047" stroke-width="2.5"/>
        <!-- Stomach & Liver silhouette overlap -->
        <path d="M-80,-40 C-80,-70 0,-70 20,-40 C40,-10 30,50 -20,60 C-70,50 -80,-10 -80,-40 Z" fill="#1f4f39" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M10,-30 C40,-50 90,-40 90,10 C90,60 40,70 10,40 Z" fill="#a4843f" fill-opacity="0.8" stroke="#d8b674" stroke-width="1.5"/>
        <text x="0" y="15" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">GASTRO-HEPATIC AXIS</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/respiratory-health.webp',
    category: "Respiratory Health",
    title: "Respiratory & ENT Care",
    subtitle: "Bronchial Airway Reactivity, Sinus Ostia & Pulmonary Function",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Bronchial Airway Patency', sub: 'Asthma & bronchospasm relief', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Paranasal Sinus Clearance', sub: 'Sinusitis & facial pressure', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Allergic Nasal Desensitization', sub: 'Rhinitis & pollen reactivity', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Waldeyer Ring Lymphoid Tone', sub: 'Tonsillitis & throat ease', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="130" fill="#0d271c" stroke="#c5a059" stroke-width="2.5"/>
        <path d="M-20,-70 C-50,-70 -80,-30 -80,30 C-80,70 -40,80 -20,75 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M20,-70 C50,-70 80,-30 80,30 C80,70 40,80 20,75 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
        <line x1="0" y1="-80" x2="0" y2="-20" stroke="#c5a059" stroke-width="4"/>
        <line x1="0" y1="-20" x2="-25" y2="10" stroke="#c5a059" stroke-width="3"/>
        <line x1="0" y1="-20" x2="25" y2="10" stroke="#c5a059" stroke-width="3"/>
        <text x="0" y="105" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#a4cebc" text-anchor="middle">Bronchial Tree</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/joint-and-pain-care.webp',
    category: "Joint & Pain Care",
    title: "Joint & Pain Care",
    subtitle: "Synovial Articulation, Cartilage Preservation & Spinal Health",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Articular Cartilage Cushion', sub: 'Osteo & rheumatoid support', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Lumbar & Sciatic Decompression', sub: 'Spinal disc & nerve roots', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Uric Acid Metabolic Balance', sub: 'Gout & crystal clearance', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Venous Valve Elasticity', sub: 'Varicose vein aching relief', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="135" ry="105" fill="#143727" stroke="#d4af37" stroke-width="2.5"/>
        <rect x="-60" y="-80" width="120" height="40" fill="#1d4e38" stroke="#ffffff" stroke-width="1.5" rx="4"/>
        <rect x="-50" y="-35" width="100" height="20" fill="#d4af37" rx="3"/>
        <rect x="-60" y="-10" width="120" height="40" fill="#1d4e38" stroke="#ffffff" stroke-width="1.5" rx="4"/>
        <rect x="-50" y="35" width="100" height="20" fill="#d4af37" rx="3"/>
        <rect x="-60" y="60" width="120" height="40" fill="#1d4e38" stroke="#ffffff" stroke-width="1.5" rx="4"/>
        <text x="0" y="24" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">SPINAL &amp; JOINT INTEGRITY</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/mens-health.webp',
    category: "Men's Health",
    title: "Men's Health & Wellness",
    subtitle: "Andrological Physiology, Cavernosal Endothelium & Prostate Care",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Cavernosal Vascular Flow', sub: 'Nitric oxide endothelial health', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Pelvic Neuromuscular Tone', sub: 'Pudendal reflex modulation', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Prostatic Transition Zone', sub: 'BPH & urinary flow easing', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Strict Confidentiality', sub: 'Private professional guidance', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="125" fill="#0e291d" stroke="#b89047" stroke-width="2.5"/>
        <ellipse cx="-40" cy="-5" rx="32" ry="38" fill="#1f4c39" stroke="#ffffff" stroke-width="1.5"/>
        <ellipse cx="40" cy="-5" rx="32" ry="38" fill="#1f4c39" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="-40" cy="-5" r="8" fill="#c93838"/>
        <circle cx="40" cy="-5" r="8" fill="#c93838"/>
        <text x="0" y="65" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#d8b674" text-anchor="middle">MALE VITALITY &amp; ANDROLOGY</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/child-health.webp',
    category: "Child Health",
    title: "Child Health & Pediatric Care",
    subtitle: "Pediatric Development, Gentle Immune Maturation & Growth",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Gentle Sugar Globules', sub: 'Palatable, non-toxic natural remedies', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Immune Maturation Support', sub: 'Recurrent colds & throat health', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Digestive & Dentition Ease', sub: 'Gentle colic & teething comfort', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Collaborative Family Care', sub: 'Comprehensive parental reassurance', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="120" fill="#153a2a" stroke="#d4af37" stroke-width="2.5"/>
        <circle cx="0" cy="-10" r="45" fill="#245741" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M-15,-20 C-15,-35 15,-35 15,-20 C15,0 -15,0 -15,15 C-15,25 0,25 0,25" fill="none" stroke="#d4af37" stroke-width="3"/>
        <circle cx="0" cy="25" r="5" fill="#d4af37"/>
        <text x="0" y="75" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">PEDIATRIC HARMONY</text>
      </g>
    `,
  },
  {
    dest: 'public/images/categories/general-wellness.webp',
    category: "General Wellness",
    title: "General Wellness & Chronic Health",
    subtitle: "Metabolic Equilibrium, Neurological Health & Endocrine Harmony",
    badge: "CLINICAL SPECIALITY",
    labels: [
      { x: 340, y: 320, text: 'Thyroid & Endocrine Rhythm', sub: 'TSH, goitre & metabolic pacing', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Cardiovascular Compliance', sub: 'Arterial blood pressure harmony', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Cranial Neurological Comfort', sub: 'Migraine & tension headache ease', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Circadian Sleep & Vitality', sub: 'HPA axis & restorative sleep', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="140" ry="110" fill="#113022" stroke="#c5a059" stroke-width="2.5"/>
        <circle cx="0" cy="0" r="50" fill="#1b4534" stroke="#ffffff" stroke-width="2"/>
        <path d="M-80,0 L80,0 M0,-70 L0,70" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4,4"/>
        <text x="0" y="5" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#d4af37" text-anchor="middle">HOMEOSTASIS</text>
      </g>
    `,
  },

  // 2. Women's Health Wing Dual Visuals (2)
  {
    dest: 'public/images/womens-health/hero.webp',
    category: "Women's Health",
    title: "Women's Health & Fertility Wing",
    subtitle: "Empathetic, Private Constitutional Consultation in Lahore & Online",
    badge: "CLINICAL CONSULTATION WING",
    labels: [
      { x: 340, y: 320, text: 'Confidential Case Dialogue', sub: 'Private, empathetic diagnostic care', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Comprehensive Hormone Audit', sub: 'PCOS, cycle regularity & AMH reserve', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: '10 Years of Clinical Practice', sub: 'Dr. Noor ul Qamar (D.H.M.S, R.H.M.P)', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Natural Pre-Conception Support', sub: 'Fertility preparation & IVF companion', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="150" ry="110" fill="#172b22" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
        <circle cx="0" cy="0" r="60" fill="#1f4535" stroke="#ffffff" stroke-width="2"/>
        <path d="M-15,-20 C-15,-35 15,-35 15,-20 C15,5 -15,5 -15,25" fill="none" stroke="#d4af37" stroke-width="3"/>
        <circle cx="0" cy="35" r="5" fill="#d4af37"/>
        <text x="0" y="75" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">WOMEN'S CLINICAL WING</text>
      </g>
    `,
  },
  {
    dest: 'public/images/womens-health/lifestyle.webp',
    category: "Women's Health",
    title: "Hormonal Harmony & Lifestyle Pacing",
    subtitle: "Constitutional Case-Taking, Menstrual Rhythm & Restorative Vitality",
    badge: "HOLISTIC CARE FRAMEWORK",
    labels: [
      { x: 340, y: 320, text: 'Cycle Synchronization Protocol', sub: 'Follicular & luteal phase pacing', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Nutritional Anti-Inflammatory Care', sub: 'Whole food endocrine nourishment', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Autonomic Stress Mitigation', sub: 'Cortisol modulation & sleep hygiene', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Gentle Dilution Formulations', sub: 'Individualised constitutional medicines', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="130" fill="#172b22" stroke="#d4af37" stroke-width="2"/>
        <!-- 4-Quadrant Synchronization -->
        <circle cx="-50" cy="-50" r="26" fill="#2d6e53"/>
        <circle cx="50" cy="-50" r="26" fill="#2d6e53"/>
        <circle cx="50" cy="50" r="26" fill="#2d6e53"/>
        <circle cx="-50" cy="50" r="26" fill="#2d6e53"/>
        <circle cx="0" cy="0" r="32" fill="#0d1f18" stroke="#d4af37" stroke-width="2"/>
        <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">HARMONY</text>
      </g>
    `,
  },

  // 3. Supportive Disease Kits (6)
  {
    dest: 'public/images/kits/hair-care-kit.webp',
    category: "Skin & Hair",
    title: "Hair Care & Follicular Kit",
    subtitle: "Supportive Homeopathic Formulations for Hair Fall & Scalp Nourishment",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Follicle Nourishing Dilutions', sub: 'Promoting scalp micro-circulation', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Scalp Sebum Balancing Formula', sub: 'Dandruff & flaking control', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Tailored specifically to individual constitution', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'No unprescribed commercial medicines', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#143e2e" stroke="#c5a059" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#245c43" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M-10,-25 L-10,5 C-10,18 10,18 10,5 L10,-25" fill="#d4af37"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">HAIR VITALITY KIT</text>
      </g>
    `,
  },
  {
    dest: 'public/images/kits/skin-clear-kit.webp',
    category: "Skin & Hair",
    title: "Skin Clear & Dermal Kit",
    subtitle: "Supportive Homeopathic Formulations for Acne, Blemishes & Skin Clarity",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Cutaneous Drainage Dilutions', sub: 'Supporting internal metabolic clearance', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Dermal Barrier Soothing', sub: 'Calming redness & follicular inflammation', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Tailored specifically to skin constitution', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'Safe, individualized remedy selection', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#143e2e" stroke="#c5a059" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#245c43" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="0" cy="-10" r="18" fill="#d4af37"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">SKIN CLEAR KIT</text>
      </g>
    `,
  },
  {
    dest: 'public/images/kits/pcos-support-kit.webp',
    category: "Women's Health",
    title: "PCOS Harmony & Cycle Kit",
    subtitle: "Supportive Homeopathic Formulations for Hormonal Rhythm & Cycle Ease",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Ovarian Rhythm Harmonization', sub: 'Constitutional ovulatory support', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Metabolic & Skin Support', sub: 'Easing acne & hormonal bloating', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Tailored to hormonal and menstrual history', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'Confidential, personalized care', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#172b22" stroke="#d4af37" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#1f4535" stroke="#ffffff" stroke-width="1.5"/>
        <ellipse cx="0" cy="-10" rx="18" ry="12" fill="#d4af37"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">PCOS HARMONY KIT</text>
      </g>
    `,
  },
  {
    dest: 'public/images/kits/digestive-care-kit.webp',
    category: "Digestive Health",
    title: "Digestive Ease & Gut Kit",
    subtitle: "Supportive Homeopathic Formulations for Acidity, Indigestion & Bloating",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Upper GI Soothing Formula', sub: 'Easing acidity, GERD & burning sensations', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Colonic Peristalsis Support', sub: 'Natural digestive transit and motility', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Tailored to dietary and digestive modalities', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'Non-addictive, gentle formulations', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#133324" stroke="#b89047" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#1f4f39" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M-12,-20 C-12,5 12,5 12,-20" fill="none" stroke="#d8b674" stroke-width="3"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">DIGESTIVE EASE KIT</text>
      </g>
    `,
  },
  {
    dest: 'public/images/kits/respiratory-wellness-kit.webp',
    category: "Respiratory Health",
    title: "Respiratory & Breathing Kit",
    subtitle: "Supportive Homeopathic Formulations for Allergies, Cough & Bronchial Comfort",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Bronchial Airway Dilutions', sub: 'Promoting clear breathing & easing chest tightness', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Nasal & Sinus Drainage Support', sub: 'Allergic catarrh and sinus pressure relief', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Assessing allergy triggers & respiratory history', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'Gentle, non-drowsy natural care', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#0d271c" stroke="#c5a059" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M-10,-25 L-10,-5 M10,-25 L10,-5 M-10,-5 C-15,10 15,10 10,-5" stroke="#d4af37" stroke-width="2.5" fill="none"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">RESPIRATORY KIT</text>
      </g>
    `,
  },
  {
    dest: 'public/images/kits/joint-mobility-kit.webp',
    category: "Joint & Pain Care",
    title: "Joint Mobility & Ease Kit",
    subtitle: "Supportive Homeopathic Formulations for Arthritis, Stiffness & Flexibility",
    badge: "SUPPORTIVE WELLNESS KIT",
    labels: [
      { x: 340, y: 320, text: 'Synovial Membrane Soothing', sub: 'Easing morning stiffness & cold damp aggravation', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Musculoskeletal Flexibility', sub: 'Supporting joint comfort & natural mobility', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Mandatory Clinical Consultation', sub: 'Evaluation of joint symptoms and modalities', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Doctor Dispensed Standard', sub: 'Safe, long-term joint comfort support', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <rect x="-100" y="-80" width="200" height="150" fill="#143727" stroke="#d4af37" stroke-width="2.5" rx="10"/>
        <circle cx="0" cy="-10" r="35" fill="#1d4e38" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="0" cy="-10" r="16" fill="#d4af37"/>
        <text x="0" y="45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">JOINT MOBILITY KIT</text>
      </g>
    `,
  },

  // 4. Health Blog Articles (5)
  {
    dest: 'public/images/blog/understanding-hair-fall-questions-to-ask.webp',
    category: "Skin & Hair",
    title: "Understanding Hair Fall: Diagnostic Guide",
    subtitle: "Clinical Trichology Case-Taking, Follicular Health & What to Ask Your Doctor",
    badge: "CLINICAL ARTICLE",
    labels: [
      { x: 340, y: 320, text: 'Telogen Effluvium vs Alopecia', sub: 'Evaluating shedding chronology', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Nutritional & Ferritin Markers', sub: 'Internal metabolic roots of hair loss', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Constitutional Remedy Approach', sub: 'Individualized vitality restoration', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Clinical Consultation Questions', sub: 'Guiding your medical dialogue', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="120" fill="#143e2e" stroke="#c5a059" stroke-width="2"/>
        <path d="M-20,-70 C-20,20 20,20 20,-70" fill="#2d6e53" stroke="#d4af37" stroke-width="2"/>
        <ellipse cx="0" cy="30" rx="18" ry="20" fill="#d4af37"/>
        <text x="0" y="75" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">TRICHOLOGY GUIDE</text>
      </g>
    `,
  },
  {
    dest: 'public/images/blog/pcos-stress-and-everyday-wellness-habits.webp',
    category: "Women's Health",
    title: "PCOS, Stress & Everyday Wellness",
    subtitle: "Understanding the HPO-Adrenal Connection & Evidence-Based Lifestyle Pacing",
    badge: "CLINICAL ARTICLE",
    labels: [
      { x: 340, y: 320, text: 'Cortisol & Insulin Resistance', sub: 'Adrenal stress amplifies ovarian androgens', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Circadian Sleep & Meal Timing', sub: 'Restoring metabolic hormonal harmony', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Gentle Constitutional Remedies', sub: 'Nourishing ovulatory vitality naturally', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Daily Habit Architecture', sub: 'Practical steps for PCOS management', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="140" ry="105" fill="#172b22" stroke="#d4af37" stroke-width="2"/>
        <circle cx="0" cy="0" r="50" fill="#1f4535" stroke="#ffffff" stroke-width="1.5"/>
        <text x="0" y="5" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#d4af37" text-anchor="middle">PCOS WELLNESS</text>
      </g>
    `,
  },
  {
    dest: 'public/images/blog/supporting-digestive-wellness-when-to-speak-to-a-doctor.webp',
    category: "Digestive Health",
    title: "Digestive Wellness & Clinical Red Flags",
    subtitle: "Distinguishing Functional Discomfort from Urgent Conventional Medical Warning Signs",
    badge: "CLINICAL ARTICLE",
    labels: [
      { x: 340, y: 320, text: 'Functional Dyspepsia vs Red Flags', sub: 'Identifying when hospital evaluation is needed', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Gut-Brain Neural Equilibrium', sub: 'Managing stress-induced colonic spasms', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Gentle Homeopathic Digestive Care', sub: 'Non-toxic support for stomach & bowel comfort', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Nutritional & Meal Timing Habits', sub: 'Supporting natural digestive enzymes', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="120" fill="#133324" stroke="#b89047" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="60" ry="45" fill="#1f4f39" stroke="#ffffff" stroke-width="1.5"/>
        <text x="0" y="5" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#d8b674" text-anchor="middle">DIGESTIVE GUIDE</text>
      </g>
    `,
  },
  {
    dest: 'public/images/blog/seasonal-allergies-and-homeopathy-approach.webp',
    category: "Respiratory Health",
    title: "Seasonal Allergies: The Homeopathic Approach",
    subtitle: "Pollen Sensitization, Mucosal Reactivity & Constitutional Desensitization",
    badge: "CLINICAL ARTICLE",
    labels: [
      { x: 340, y: 320, text: 'Histamine Cascade Modulation', sub: 'Calming hyper-reactive mast cells', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Nasal Turbinate Mucosal Ease', sub: 'Reducing congestion and watery discharge', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Pre-Seasonal Constitutional Care', sub: 'Building immune tolerance before pollen peaks', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Safe, Non-Sedating Solutions', sub: 'Clear thinking without antihistamine drowsiness', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <circle cx="0" cy="0" r="120" fill="#0d271c" stroke="#c5a059" stroke-width="2"/>
        <path d="M-40,0 L0,-40 L40,0 L0,40 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="15" fill="#d4af37"/>
        <text x="0" y="65" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">ALLERGY DEFENSE</text>
      </g>
    `,
  },
  {
    dest: 'public/images/blog/chronic-joint-pain-and-mobility-questions-to-ask.webp',
    category: "Joint & Pain Care",
    title: "Chronic Joint Pain & Mobility Guide",
    subtitle: "Preserving Cartilage, Managing Morning Stiffness & Questions for Your Doctor",
    badge: "CLINICAL ARTICLE",
    labels: [
      { x: 340, y: 320, text: 'Cartilage Health & Joint Space', sub: 'Understanding structural wear vs inflammation', targetX: 520, targetY: 340, align: 'left' },
      { x: 340, y: 460, text: 'Morning Stiffness Management', sub: 'Gentle warmth and movement strategies', targetX: 500, targetY: 450, align: 'left' },
      { x: 860, y: 320, text: 'Constitutional Remedy Synergy', sub: 'Long-term joint comfort without stomach irritation', targetX: 680, targetY: 320, align: 'right' },
      { x: 860, y: 460, text: 'Essential Consultation Questions', sub: 'Structuring your joint health appointment', targetX: 680, targetY: 460, align: 'right' },
    ],
    svg: `
      <g transform="translate(600, 420)">
        <ellipse cx="0" cy="0" rx="130" ry="100" fill="#143727" stroke="#d4af37" stroke-width="2"/>
        <ellipse cx="0" cy="0" rx="55" ry="35" fill="#1d4e38" stroke="#ffffff" stroke-width="1.5"/>
        <text x="0" y="5" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#d4af37" text-anchor="middle">JOINT MOBILITY</text>
      </g>
    `,
  },
];

async function generateSupplementary() {
  console.log(`Generating ${SUPPLEMENTARY_ASSETS.length} supplementary clinical visuals...`);
  for (const item of SUPPLEMENTARY_ASSETS) {
    const fullPath = path.join(process.cwd(), item.dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    const svg = createClinicalFrame({
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      badge: item.badge,
      clinicalLabels: item.labels,
      centerContent: item.svg,
      isSecondary: false,
    });

    await sharp(Buffer.from(svg))
      .webp({ quality: 90, effort: 4 })
      .toFile(fullPath);

    console.log(`✓ ${item.dest}`);
  }
  console.log('All supplementary clinical visuals rendered successfully!');
}

generateSupplementary().catch(console.error);
