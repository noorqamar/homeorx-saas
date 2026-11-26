/**
 * Anatomical & Clinical SVG Artworks for General Wellness, Endocrine, Neurological & Hematology Conditions
 */

const { escapeXml } = require('./theme');

const GENERAL_WELLNESS_ARTWORKS = {
  // 22. Thyroid Concerns
  'thyroid-concerns': {
    primary: {
      subtitle: 'Thyroid Gland (Lobes & Isthmus), Thyroglobulin Synthesis & TSH Feedback Regulation',
      badge: 'ENDOCRINE MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Bilateral Thyroid Lobes & Isthmus', sub: 'Anterior tracheal wrapping anatomy', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Thyroid Follicle Colloid Core', sub: 'Thyroglobulin iodination reservoir', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Pituitary TSH Feedback Loop', sub: 'Hypothalamic TRH regulation axis', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Free T3 / Free T4 Metabolic Rate', sub: 'Cellular mitochondrial oxygen consumption', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Hypo vs Hyper Symptoms', sub: 'Fatigue, chilliness, weight changes', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Endocrine Harmony', sub: 'Restoring metabolic rhythm & thyroid vitality', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Trachea Cartilaginous Column Background -->
          <rect x="-25" y="-130" width="50" height="230" fill="#1b4534" stroke="#c5a059" stroke-width="1.5" rx="3"/>
          <g stroke="#ffffff" stroke-width="1.5" opacity="0.6">
            <line x1="-20" y1="-100" x2="20" y2="-100"/>
            <line x1="-20" y1="-70" x2="20" y2="-70"/>
            <line x1="-20" y1="40" x2="20" y2="40"/>
            <line x1="-20" y1="70" x2="20" y2="70"/>
          </g>

          <!-- Butterfly Thyroid Gland (Bilateral Lobes + Isthmus) -->
          <!-- Left Lobe -->
          <path d="M-20,-40 C-70,-60 -95,-30 -90,20 C-85,60 -60,70 -20,30 Z" fill="#d4af37" stroke="#ffffff" stroke-width="2" filter="url(#organGlow)"/>
          <!-- Right Lobe -->
          <path d="M20,-40 C70,-60 95,-30 90,20 C85,60 60,70 20,30 Z" fill="#d4af37" stroke="#ffffff" stroke-width="2" filter="url(#organGlow)"/>
          <!-- Central Isthmus -->
          <rect x="-25" y="-5" width="50" height="25" fill="#a4843f" stroke="#ffffff" stroke-width="1.5" rx="2"/>

          <text x="0" y="12" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Isthmus</text>
        </g>
      `,
    },
  },

  // 23. Goitre
  'goitre': {
    primary: {
      subtitle: 'Diffuse & Multinodular Thyroid Gland Hypertrophy, Compressive Neck Anatomy & Iodine Kinetics',
      badge: 'ENDOCRINE PATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Thyroid Gland Enlargement (Goitre)', sub: 'Bilateral visible collar hypertrophy', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Multinodular Follicular Growth', sub: 'Hyperplastic thyroid nodules & colloid cysts', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Tracheal Compression Context', sub: 'Pemberton sign & airway luminal patency', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'TSH Receptor Stimulation', sub: 'Compensatory hypertrophy mechanism', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Thyroid Ultrasound Characterization', sub: 'Echogenicity & vascular Doppler mapping', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Glandular Drainage', sub: 'Gentle homeopathic glandular resolution support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Significantly Enlarged (Hypertrophied) Thyroid Gland Profile -->
          <path d="M-30,-60 C-110,-90 -150,-40 -140,40 C-130,100 -80,110 -30,50 Z" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" filter="url(#organGlow)"/>
          <path d="M30,-60 C110,-90 150,-40 140,40 C130,100 80,110 30,50 Z" fill="#d4af37" stroke="#ffffff" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <rect x="-35" y="-10" width="70" height="40" fill="#a4843f" stroke="#ffffff" stroke-width="2" rx="4"/>
          
          <!-- Nodular Clusters inside Goitre -->
          <g fill="#143e2e" stroke="#ffffff" stroke-width="1.2">
            <circle cx="-75" cy="-10" r="14"/><circle cx="-85" cy="30" r="16"/>
            <circle cx="75" cy="-10" r="14"/><circle cx="85" cy="30" r="16"/>
          </g>

          <text x="0" y="16" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">GOITRE</text>
        </g>
      `,
    },
  },

  // 24. Diabetes Wellness Support
  'diabetes-wellness-support': {
    primary: {
      subtitle: 'Pancreatic Islet Beta-Cell Insulin Secretion, Cellular GLUT-4 Receptors & Glycemic Stability',
      badge: 'METABOLIC MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Pancreatic Islets of Langerhans', sub: 'Beta-cell proinsulin synthesis & secretion', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Peripheral Insulin Resistance', sub: 'Impaired tyrosine kinase receptor signaling', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'GLUT-4 Glucose Transporter', sub: 'Skeletal muscle & adipose glucose uptake', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'HbA1c Glycation Trajectory', sub: '3-Month erythrocyte glucose integration', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Microvascular Endothelial Protection', sub: 'Retinopathy & neuropathy prevention context', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Glycemic Pacing', sub: 'Supportive homeopathic metabolic harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Cellular Membrane with Insulin Receptor & Glucose Channel -->
          <rect x="-180" y="-30" width="360" height="25" fill="#2d6e53" stroke="#d4af37" stroke-width="1.5" rx="3"/>
          <text x="0" y="-13" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Cellular Membrane (Lipid Bilayer)</text>

          <!-- Insulin Receptor (Y-Shaped) -->
          <g transform="translate(-70, -30)">
            <path d="M0,0 L0,-25 M0,-25 L-12,-40 M0,-25 L12,-40" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/>
            <!-- Insulin Molecule Binding -->
            <circle cx="0" cy="-45" r="7" fill="#ffffff"/>
            <text x="0" y="-58" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">Insulin</text>
          </g>

          <!-- GLUT-4 Glucose Channel Opening -->
          <g transform="translate(70, -30)">
            <rect x="-18" y="-5" width="36" height="35" fill="#1b4534" stroke="#ffffff" stroke-width="1.5"/>
            <!-- Glucose Molecules entering cell -->
            <circle cx="0" cy="-25" r="7" fill="#dfca91"/>
            <circle cx="0" cy="12" r="7" fill="#dfca91"/>
            <circle cx="0" cy="45" r="7" fill="#dfca91"/>
            <text x="0" y="68" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#dfca91" text-anchor="middle">Glucose Entry</text>
          </g>
        </g>
      `,
    },
  },

  // 25. High Blood Pressure Wellness Support
  'high-blood-pressure-wellness-support': {
    primary: {
      subtitle: 'Arterial Hemodynamics, Endothelial Nitric Oxide Compliance & Peripheral Vascular Resistance',
      badge: 'CARDIOVASCULAR HEALTH',
      labels: [
        { x: 340, y: 310, text: 'Arterial Tunica Media Smooth Muscle', sub: 'Vasoconstrictor sympathetic tone modulation', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Endothelial Nitric Oxide (NO) Axis', sub: 'Endogenous vasodilator compliance', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Renin-Angiotensin-Aldosterone (RAAS)', sub: 'Systemic volume & pressure homeostasis', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Systolic / Diastolic Pressure Wave', sub: 'Pulse wave velocity & vascular elasticity', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Baroreceptor Reflex Sensitivity', sub: 'Carotid sinus autonomic buffering', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Vascular Calming', sub: 'Supportive homeopathic cardiovascular harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Artery Cross-Section with Pulsatile Pressure Vectors -->
          <circle cx="0" cy="0" r="105" fill="#1b4534" stroke="#d4af37" stroke-width="6"/>
          <circle cx="0" cy="0" r="75" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="45" fill="#8f2c2c"/>

          <!-- Outward Pressure Vector Arrows -->
          <g stroke="#ffffff" stroke-width="2" marker-end="url(#arrow)">
            <line x1="0" y1="-25" x2="0" y2="-65"/>
            <line x1="25" y1="0" x2="65" y2="0"/>
            <line x1="0" y1="25" x2="0" y2="65"/>
            <line x1="-25" y1="0" x2="-65" y2="0"/>
          </g>
          
          <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">LUMEN</text>
          <text x="0" y="125" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#d4af37" text-anchor="middle">Arterial Wall Compliance</text>
        </g>
      `,
    },
  },

  // 55. Migraine
  'migraine': {
    primary: {
      subtitle: 'Trigeminovascular System Activation, Cortical Spreading Depression & Pulsatile Vascular Cascade',
      badge: 'CLINICAL NEUROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Trigeminovascular Pathway (Cranial V)', sub: 'Sensory afferent activation from meninges', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Cortical Spreading Depression (CSD)', sub: 'Slow neuronal depolarization aura wave', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'CGRP & Substance P Neuro-Release', sub: 'Meningeal sterile neurogenic inflammation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Unilateral Throbbing Pulsatile Hemicrania', sub: 'Severe temporal & retro-orbital pain', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Photophobia & Sensory Hypersensitivity', sub: 'Sensitization of second-order brainstem neurons', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Neurological Relief', sub: 'Calming vascular spasm & trigger reactivity', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Cranial Silhouette Profile -->
          <path d="M-90,-120 C-40,-150 40,-150 90,-110 C130,-70 140,-10 110,40 C90,80 30,110 -20,110 C-60,110 -90,70 -100,20 C-110,-40 -110,-90 -90,-120 Z" fill="#143628" stroke="#c5a059" stroke-width="2"/>
          
          <!-- Brain / Cerebral Cortex Region with Pulsatile Pain Radiation -->
          <ellipse cx="10" cy="-40" rx="75" ry="55" fill="#1d4837" stroke="#ffffff" stroke-width="1.2"/>
          
          <!-- Unilateral Temporal Migraine Epicenter (Intense Red Radiation) -->
          <g transform="translate(45, -35)">
            <circle cx="0" cy="0" r="16" fill="#e04848" filter="url(#organGlow)"/>
            <!-- Pulsatile Radiating Waves -->
            <circle cx="0" cy="0" r="28" fill="none" stroke="#e04848" stroke-width="2" stroke-dasharray="3,3"/>
            <circle cx="0" cy="0" r="42" fill="none" stroke="#e04848" stroke-width="1.5" stroke-dasharray="4,4"/>
            <circle cx="0" cy="0" r="56" fill="none" stroke="#e04848" stroke-width="1"/>
            <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">AURA</text>
          </g>
          <text x="0" y="80" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d4af37" text-anchor="middle">Trigeminovascular System</text>
        </g>
      `,
    },
  },

  // 56. Tension Headache
  'tension-headache': {
    primary: {
      subtitle: 'Pericranial Myofascial Constriction, Suboccipital Muscle Spasm & Band-Like Pressure',
      badge: 'NEUROLOGY & PAIN MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Suboccipital Muscle Group Spasm', sub: 'Rectus capitis & obliquus hypertonicity', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Temporalis & Frontalis Tightness', sub: 'Bilateral vice-like constricting band sensation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Central Sensitization of Myofascia', sub: 'Heightened nociceptive cranial sensitivity', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Non-Pulsatile Steady Pressure Ache', sub: 'Dull ache without nausea or aura', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Cervicogenic Postural Forward Head', sub: 'Ergonomic screen fatigue & muscle ischemia', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Muscular Relaxation', sub: 'Gentle release of chronic physical tension', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Cranium Silhouette -->
          <ellipse cx="0" cy="-20" rx="90" ry="80" fill="#173b2c" stroke="#c5a059" stroke-width="2"/>
          
          <!-- Circumferential Vice-Like Constricting Band (Around Head) -->
          <ellipse cx="0" cy="-20" rx="100" ry="25" fill="none" stroke="#d4af37" stroke-width="8" stroke-dasharray="12,6"/>
          <ellipse cx="0" cy="-20" rx="95" ry="22" fill="#d4af37" fill-opacity="0.3"/>
          <text x="0" y="-15" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">BAND-LIKE CONSTRICTION</text>

          <!-- Cervical Spine & Tight Neck Muscles Below -->
          <path d="M-30,45 L-30,110 L30,110 L30,45 Z" fill="#1b4534" stroke="#ffffff" stroke-width="1.5"/>
          <text x="0" y="85" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#a4cebc" text-anchor="middle">Cervical Spine</text>
        </g>
      `,
    },
  },

  // 57. Anxiety & Sleep Support (Insomnia)
  'anxiety-sleep-support': {
    primary: {
      subtitle: 'Hypothalamic-Pituitary-Adrenal (HPA) Axis, Melatonin Circadian Rhythm & Sleep Architecture',
      badge: 'NEURO-PSYCHIATRY & SLEEP MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'HPA Axis Hyperarousal & Cortisol', sub: 'Elevated evening cortisol blunts sleep onset', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'GABA-A Receptor Neurotransmission', sub: 'Inhibitory calming neurotransmitter balance', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Pineal Gland Melatonin Secretion', sub: 'Dim light melatonin onset (DLMO) rhythm', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Sleep Architecture (NREM & REM)', sub: 'Restorative slow-wave delta sleep cycles', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Autonomic Sympathetic Calming', sub: 'Slowing racing thoughts & nocturnal palpitation', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Sleep Harmony', sub: 'Natural, non-habit forming restorative rest', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Day/Night Circadian Rhythm Balance Circle -->
          <circle cx="0" cy="0" r="120" fill="#132c21" stroke="#d4af37" stroke-width="2"/>
          
          <!-- Nocturnal Sleep Arc (Right Side Deep Dark Night) -->
          <path d="M0,-120 A120,120 0 0,1 0,120 Z" fill="#081711" stroke="#ffffff" stroke-width="1"/>
          
          <!-- Crescent Moon & Sleep Stars Iconography on Night Side -->
          <path d="M40,-40 A30,30 0 0,1 60,10 A22,22 0 0,0 40,-40 Z" fill="#d4af37"/>
          
          <!-- Circadian Sine Wave across Center -->
          <path d="M-120,0 C-60,-80 60,80 120,0" fill="none" stroke="#68b99d" stroke-width="3"/>

          <circle cx="0" cy="0" r="30" fill="#2d6e53" stroke="#d4af37" stroke-width="1.5"/>
          <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">RHYTHM</text>
        </g>
      `,
    },
  },

  // 58. Epilepsy Support
  'epilepsy-support': {
    primary: {
      subtitle: 'Cortical Neuronal Excitability, GABA / Glutamate Neurotransmitter Balance & Paroxysmal Discharge',
      badge: 'CLINICAL NEUROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Cortical Synaptic Circuitry', sub: 'Excitatory glutamatergic neural networks', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Inhibitory GABAergic Tone', sub: 'Maintaining membrane resting potential', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Ion Channel Membrane Stability', sub: 'Voltage-gated sodium/calcium regulation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Paroxysmal Depolarization Shift', sub: 'Synchronized excessive neuronal firing', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Conventional Therapy Adherence', sub: 'Safe, complementary non-interfering care', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Neurological Calming', sub: 'Supporting brain vitality & nervous resilience', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Neural Network Node & Synaptic Firing Pattern -->
          <circle cx="0" cy="0" r="110" fill="#143628" stroke="#c5a059" stroke-width="2"/>
          
          <!-- Central Neuron Soma -->
          <polygon points="0,-45 40,-15 25,35 -25,35 -40,-15" fill="#2d6e53" stroke="#ffffff" stroke-width="2"/>
          <circle cx="0" cy="0" r="14" fill="#d4af37"/>

          <!-- Dendrites & Axons radiating with electrical discharge sparks -->
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="0" y1="-45" x2="0" y2="-90"/>
            <line x1="40" y1="-15" x2="80" y2="-35"/>
            <line x1="25" y1="35" x2="60" y2="75"/>
            <line x1="-25" y1="35" x2="-60" y2="75"/>
            <line x1="-40" y1="-15" x2="-80" y2="-35"/>
          </g>

          <!-- Synchronized Waveform (EEG-style spikes) -->
          <path d="M-80,85 L-50,85 L-40,65 L-30,105 L-20,75 L-10,85 L20,85 L30,65 L40,105 L50,75 L60,85 L80,85" fill="none" stroke="#e04848" stroke-width="2"/>
        </g>
      `,
    },
  },

  // 59. Ear Infection Support (Otitis Media)
  'ear-infection-support': {
    primary: {
      subtitle: 'Tympanic Membrane Erythema, Middle Ear Cavity Effusion & Eustachian Tube Dysfunction',
      badge: 'OTOLOGY & ENT',
      labels: [
        { x: 340, y: 310, text: 'Tympanic Membrane (Eardrum)', sub: 'Hyperemic bulging & loss of light reflex', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Middle Ear Cavity (Tympanum)', sub: 'Serous or purulent fluid accumulation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Eustachian Tube Ventilation', sub: 'Pharyngeal tube edema blocking drainage', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Auditory Ossicles (Malleus, Incus)', sub: 'Conductive sound transmission dampening', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Severe Throbbing Otalgia', sub: 'Pulsatile earache worse at night & lying down', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Middle Ear Relief', sub: 'Gentle drainage & soothing natural remedies', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Ear Canal, Tympanic Membrane & Middle Ear -->
          <!-- External Auditory Canal -->
          <path d="M-130,-40 L-40,-30 L-40,30 L-130,40 Z" fill="#143628" stroke="#ffffff" stroke-width="1.5"/>

          <!-- Tympanic Membrane (Tilted Oval with Red Erythema & Bulging) -->
          <ellipse cx="-35" cy="0" rx="12" ry="42" fill="#c93838" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>

          <!-- Middle Ear Cavity behind Membrane (with Fluid Level) -->
          <ellipse cx="40" cy="0" rx="65" ry="50" fill="#1b4534" stroke="#ffffff" stroke-width="1.5"/>
          <!-- Purulent Fluid in Middle Ear -->
          <path d="M-15,15 C0,45 80,45 95,15 C95,35 70,50 40,50 C10,50 -15,35 -15,15 Z" fill="#d8b674" opacity="0.85"/>
          
          <!-- Eustachian Tube draining down -->
          <path d="M40,40 L70,110" stroke="#255e46" stroke-width="10"/>

          <text x="-35" y="-50" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ff9999" text-anchor="middle">Bulging Eardrum</text>
          <text x="40" y="5" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Middle Ear</text>
        </g>
      `,
    },
  },

  // 61. Eosinophilia Support
  'eosinophilia-support': {
    primary: {
      subtitle: 'Eosinophil Granulocyte Morphology, Major Basic Protein (MBP) & Systemic Allergic Response',
      badge: 'HEMATOLOGY & ALLERGIC MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Bilobed Nucleus Granulocyte', sub: 'Characteristic spectacle-shaped nuclear morphology', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Major Basic Protein (MBP) Granules', sub: 'Eosinophilic bright pink-orange granules', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Interleukin-5 (IL-5) Stimulation', sub: 'Bone marrow differentiation & survival cytokine', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Absolute Eosinophil Count (AEC)', sub: 'Triage when AEC exceeds 500 cells/microL', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Tissue Extravasation & Mucosa', sub: 'Allergic respiratory & gastrointestinal infiltration', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Eosinophil Modulation', sub: 'Gentle immune rebalancing & allergic stability', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Eosinophil Cell Body (Large Leukocyte) -->
          <circle cx="0" cy="0" r="95" fill="#1b4534" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Characteristic Bilobed Nucleus (Dark Purple-Blue Spectacle Shape) -->
          <g fill="#43286b" stroke="#ffffff" stroke-width="1.2">
            <ellipse cx="-32" cy="-10" rx="28" ry="38"/>
            <ellipse cx="32" cy="-10" rx="28" ry="38"/>
            <!-- Nuclear Bridge -->
            <path d="M-15,10 C0,5 0,15 15,10" stroke="#43286b" stroke-width="12" fill="none"/>
          </g>

          <!-- Cytoplasmic Eosinophilic Granules (Bright Red/Orange Droplets) -->
          <g fill="#e05353" opacity="0.85">
            <circle cx="-65" cy="-30" r="5"/><circle cx="-55" cy="40" r="4.5"/><circle cx="-25" cy="55" r="5"/>
            <circle cx="25" cy="55" r="4.5"/><circle cx="55" cy="40" r="5"/><circle cx="65" cy="-30" r="4.5"/>
            <circle cx="0" cy="-65" r="5"/><circle cx="-35" cy="-60" r="4"/><circle cx="35" cy="-60" r="4"/>
          </g>

          <text x="0" y="85" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Eosinophil Granulocyte</text>
        </g>
      `,
    },
  },

  // 62. Anaemia Support
  'anaemia-support': {
    primary: {
      subtitle: 'Erythrocyte Morphology, Hemoglobin-Oxygen Transport & Microcytic Hypochromic Kinetics',
      badge: 'HEMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Microcytic Hypochromic RBCs', sub: 'Reduced mean corpuscular volume (MCV < 80 fL)', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Hemoglobin Iron-Binding Core', sub: 'Tetrameric heme ring carrying molecular oxygen', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Serum Ferritin Depletion', sub: 'Depleted reticuloendothelial iron stores', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Tissue Hypoxia & Fatigue Cascade', sub: 'Tachycardia, pallor, dizziness on exertion', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Erythropoiesis in Bone Marrow', sub: 'Stimulating healthy red cell maturation', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Hematinic Support', sub: 'Natural iron assimilation & vital energy renewal', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Comparison: Normal Normocytic Erythrocyte (Left) vs Microcytic Hypochromic Anaemia RBC (Right) -->
          <g transform="translate(-100, 0)">
            <!-- Robust Biconcave Red Blood Cell -->
            <ellipse cx="0" cy="0" rx="70" ry="55" fill="#8f2c2c" stroke="#d4af37" stroke-width="2"/>
            <!-- Normal Central Pallor (One Third of Diameter) -->
            <ellipse cx="0" cy="0" rx="26" ry="20" fill="#d95d5d"/>
            <text x="0" y="80" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#a4cebc" text-anchor="middle">Normal Erythrocyte</text>
          </g>

          <g transform="translate(100, 0)">
            <!-- Microcytic (Small) & Hypochromic (Pale Huge Center) Cell -->
            <ellipse cx="0" cy="0" rx="50" ry="40" fill="#6e2b2b" stroke="#ffffff" stroke-width="1.5"/>
            <!-- Abnormally Wide Pale Central Pallor -->
            <ellipse cx="0" cy="0" rx="35" ry="28" fill="#d98989"/>
            <text x="0" y="80" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#e07272" text-anchor="middle">Microcytic Hypochromic</text>
          </g>
        </g>
      `,
    },
  },
};

module.exports = {
  GENERAL_WELLNESS_ARTWORKS,
};
