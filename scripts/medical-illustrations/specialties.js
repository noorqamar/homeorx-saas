/**
 * Anatomical & Clinical SVG Artworks for Child Health & Men's Health Conditions
 */

const { escapeXml } = require('./theme');

const SPECIALTIES_ARTWORKS = {
  // 63. Child Health & Pediatric Wellness
  'child-health': {
    primary: {
      subtitle: 'Pediatric Immune Maturation, Developmental Milestone Vitality & Gentle Outpatient Care',
      badge: 'PEDIATRIC MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Gentle Clinical Consultation', sub: 'Non-invasive, empathetic pediatric case-taking', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Immune System Education Phase', sub: 'Maturing naive T & B lymphocytes safely', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Dentition & Growth Spurts', sub: 'Supporting physiological development periods', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Gentle Sugar Globule Dispensing', sub: 'Child-friendly, palatable natural dilutions', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Respiratory & Digestive Resilience', sub: 'Tackling recurrent colds & gut discomfort', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Parental Guidance & Nutritional Care', sub: 'Collaborative family health stewardship', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Pediatric Wellness Shield & Gentle Care Emblems -->
          <circle cx="0" cy="0" r="115" fill="#173e2d" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Pediatric Growth Curve Rising -->
          <path d="M-80,60 C-40,45 0,10 40,-35 C60,-55 80,-70 90,-75" fill="none" stroke="#68b99d" stroke-width="3" stroke-linecap="round"/>
          
          <!-- Pediatric Stethoscope & Gentle Health Emblem -->
          <circle cx="0" cy="-10" r="45" fill="#245741" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M-15,-20 C-15,-35 15,-35 15,-20 C15,0 -15,0 -15,15 C-15,25 0,25 0,25" fill="none" stroke="#d4af37" stroke-width="3"/>
          <circle cx="0" cy="25" r="5" fill="#d4af37"/>

          <!-- Palatable Sucrose Globules -->
          <g fill="#ffffff">
            <circle cx="-50" cy="40" r="7"/><circle cx="-35" cy="50" r="6.5"/><circle cx="-20" cy="40" r="6"/>
          </g>
          <text x="0" y="85" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">Pediatric Wellness</text>
        </g>
      `,
    },
  },

  // 64. Erectile Dysfunction & Men's Wellness
  'erectile-dysfunction-mens-wellness': {
    primary: {
      subtitle: 'Penile Cavernosal Micro-Vascular Endothelium, Nitric Oxide-cGMP Inflow & Pelvic Neurovascular Health',
      badge: 'ANDROLOGY & MALE REPRODUCTIVE MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Corpora Cavernosa Architecture', sub: 'Trabecular smooth muscle lacunar spaces', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Endothelial Nitric Oxide Release', sub: 'Arterial inflow & helical artery dilation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Venous Occlusion Mechanism', sub: 'Sub-tunical venular plexus compression', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Cardiovascular Risk Stratification', sub: 'Penile artery as early vascular sentinel', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Psychophysiological Performance Anxiety', sub: 'Sympathetic vasoconstrictor over-drive', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Andrological Care', sub: 'Confidential, holistic constitutional restoration', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Pelvic Neurovascular Cross-Section -->
          <ellipse cx="0" cy="0" rx="120" ry="80" fill="#143628" stroke="#b89047" stroke-width="2"/>
          
          <!-- Paired Corpora Cavernosa -->
          <ellipse cx="-45" cy="-5" rx="36" ry="42" fill="#1f4c39" stroke="#ffffff" stroke-width="1.5"/>
          <ellipse cx="45" cy="-5" rx="36" ry="42" fill="#1f4c39" stroke="#ffffff" stroke-width="1.5"/>

          <!-- Deep Cavernosal Central Arteries -->
          <circle cx="-45" cy="-5" r="9" fill="#c93838" stroke="#ffffff" stroke-width="1.2"/>
          <circle cx="45" cy="-5" r="9" fill="#c93838" stroke="#ffffff" stroke-width="1.2"/>

          <!-- Spongiosum (Bottom) -->
          <ellipse cx="0" cy="40" rx="24" ry="18" fill="#2d6e53" stroke="#b89047" stroke-width="1.5"/>
          <circle cx="0" cy="40" r="5" fill="#143628"/>

          <text x="-45" y="-18" font-family="'Manrope', sans-serif" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle">Cavernosum</text>
          <text x="45" y="-18" font-family="'Manrope', sans-serif" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle">Cavernosum</text>
        </g>
      `,
    },
  },

  // 65. Premature Ejaculation Support
  'premature-ejaculation-support': {
    primary: {
      subtitle: 'Pudendal Somatosensory Reflex Arc, Central Serotonergic Modulation & Pelvic Neuromuscular Control',
      badge: 'ANDROLOGICAL NEUROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Dorsal Nerve of Penis Sensitivity', sub: 'Pudendal sensory afferent signaling', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Central 5-HT Receptor Dynamics', sub: 'Serotonergic control in hypothalamus', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Bulbospongiosus Muscle Tone', sub: 'Spinal ejaculatory reflex center (L1-S2)', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Intravaginal Latency Time (IELT)', sub: 'Sensory threshold modulation goals', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Sympathetic Hyperarousal Modulation', sub: 'Autonomic nervous calming & pacing', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Neurological Pacing', sub: 'Restoring neuromuscular confidence & harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Neuro-Sensory Reflex Arc Circuit Diagram -->
          <circle cx="0" cy="0" r="115" fill="#143729" stroke="#b89047" stroke-width="2"/>
          
          <!-- Central Nervous Feedback Pathway -->
          <path d="M-70,50 C-70,-20 -20,-70 0,-70 C20,-70 70,-20 70,50" fill="none" stroke="#68b99d" stroke-width="3"/>

          <!-- Synaptic Reflex Node at Center -->
          <circle cx="0" cy="-70" r="16" fill="#b89047" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="-90" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">SPINAL REFLEX</text>

          <circle cx="0" cy="10" r="34" fill="#20523e" stroke="#ffffff" stroke-width="1.5"/>
          <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Sensory</text>
          <text x="0" y="20" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#d8b674" text-anchor="middle">Threshold</text>
        </g>
      `,
    },
  },

  // 66. Prostate Enlargement Support (BPH)
  'prostate-enlargement-support': {
    primary: {
      subtitle: 'Prostatic Transition Zone Hyperplasia, Urethral Compression & Detrusor Compensatory Mechanics',
      badge: 'UROLOGY & ANDROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Transition Zone Hyperplasia', sub: 'Stromal and glandular benign proliferation', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Prostatic Urethral Compression', sub: 'Elongation & narrowing of urinary conduit', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Bladder Detrusor Hypertrophy', sub: 'Trabeculation & post-void residual urine', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Lower Urinary Tract Symptoms (LUTS)', sub: 'Weak stream, nocturia, hesitancy & frequency', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Dihydrotestosterone (DHT) Pathway', sub: '5-alpha reductase mediated glandular expansion', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Prostatic Relief', sub: 'Easing urinary resistance & glandular congestion', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Urinary Bladder Base (Top) -->
          <path d="M-80,-110 C-40,-130 40,-130 80,-110 C80,-50 -80,-50 -80,-110 Z" fill="#173b2c" stroke="#b89047" stroke-width="2"/>
          <text x="0" y="-80" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Bladder Base</text>

          <!-- Enlarged Prostate Gland Bilateral Lobes surrounding Urethra -->
          <ellipse cx="-45" cy="5" rx="42" ry="48" fill="#1f523c" stroke="#b89047" stroke-width="2.5" filter="url(#organGlow)"/>
          <ellipse cx="45" cy="5" rx="42" ry="48" fill="#1f523c" stroke="#b89047" stroke-width="2.5" filter="url(#organGlow)"/>

          <!-- Compressed Pinched Prostatic Urethra Lumen (Thin Red Line) -->
          <path d="M0,-50 L0,-15 L-3,10 L3,25 L0,70" stroke="#e05353" stroke-width="3" stroke-linecap="round" fill="none"/>

          <text x="-45" y="10" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">BPH</text>
          <text x="45" y="10" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">BPH</text>
          <text x="0" y="85" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#d8b674" text-anchor="middle">Compressed Urethra</text>
        </g>
      `,
    },
  },
};

module.exports = {
  SPECIALTIES_ARTWORKS,
};
