/**
 * Anatomical & Clinical SVG Artworks for Women's Health & Fertility
 */

const { escapeXml } = require('./theme');

const WOMENS_HEALTH_ARTWORKS = {
  // 11. PCOS
  'pcos': {
    primary: {
      subtitle: 'Ovarian Follicular Arrest ("String of Pearls"), Hyperandrogenism & Metabolic Axis',
      badge: 'ENDOCRINE GYNAECOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Peripheral Follicular Arrest', sub: 'Sub-capsular immature antral follicles', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Thickened Ovarian Stroma', sub: 'Theca cell hyperplasia & androgen excess', targetX: 500, targetY: 430, align: 'left' },
        { x: 340, y: 560, text: 'LH / FSH Ratio Imbalance', sub: 'Elevated luteinizing hormone drive', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Hyperinsulinemia Link', sub: 'Insulin resistance amplifies ovarian theca', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Anovulatory Cycle Pattern', sub: 'Failure of dominant follicle emergence', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Metabolic Harmony', sub: 'Gentle homeopathic ovulatory rhythm support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Enlarged PCOS Ovary Body -->
          <ellipse cx="0" cy="10" rx="140" ry="105" fill="#1b4232" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Dense Central Stroma -->
          <ellipse cx="0" cy="10" rx="80" ry="55" fill="#245742" stroke="#3d8f6c" stroke-width="1.5" stroke-dasharray="4,3"/>
          <text x="0" y="15" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#d4af37" text-anchor="middle">Central Stroma</text>

          <!-- Peripheral "String of Pearls" Immature Follicles (2-9mm) -->
          <g fill="#10291e" stroke="#ffffff" stroke-width="1.2">
            <circle cx="-105" cy="5" r="14"/><circle cx="-90" cy="-45" r="13.5"/>
            <circle cx="-45" cy="-70" r="14"/><circle cx="15" cy="-75" r="13"/>
            <circle cx="70" cy="-55" r="14.5"/><circle cx="105" cy="-15" r="13"/>
            <circle cx="110" cy="35" r="13.5"/><circle cx="75" cy="70" r="14"/>
            <circle cx="20" cy="85" r="13"/><circle cx="-40" cy="80" r="14"/>
            <circle cx="-90" cy="55" r="13.5"/>
          </g>
          <!-- Immature Oocyte cores -->
          <g fill="#d4af37" opacity="0.8">
            <circle cx="-105" cy="5" r="4"/><circle cx="-90" cy="-45" r="3.5"/><circle cx="-45" cy="-70" r="4"/>
            <circle cx="15" cy="-75" r="3.5"/><circle cx="70" cy="-55" r="4"/><circle cx="105" cy="-15" r="3.5"/>
            <circle cx="110" cy="35" r="4"/><circle cx="75" cy="70" r="3.5"/><circle cx="20" cy="85" r="4"/>
            <circle cx="-40" cy="80" r="3.5"/><circle cx="-90" cy="55" r="4"/>
          </g>
        </g>
      `,
    },
  },

  // 12. Irregular Periods
  'irregular-periods': {
    primary: {
      subtitle: 'Hypothalamic-Pituitary-Ovarian (HPO) Axis Dysregulation & Menstrual Chronology',
      badge: 'REPRODUCTIVE ENDOCRINOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Hypothalamic GnRH Pulsatility', sub: 'Stress & cortisol disruption of pulse frequency', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Anterior Pituitary FSH / LH', sub: 'Follicle-stimulating signal variability', targetX: 500, targetY: 410, align: 'left' },
        { x: 340, y: 560, text: 'Endometrial Proliferation Phase', sub: 'Delayed estrogenic building of lining', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Ovulatory Delay / Anovulation', sub: 'Extended follicular phase duration', targetX: 680, targetY: 310, align: 'right' },
        { x: 860, y: 450, text: 'Luteal Phase Deficiency', sub: 'Sub-optimal progesterone plateau', targetX: 680, targetY: 440, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Cycle Synchronization', sub: 'Individualised endocrine balance restoration', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- 28-Day Cycle Clock / Waveform Architecture -->
          <circle cx="0" cy="0" r="130" fill="#132c21" stroke="#d4af37" stroke-width="2" stroke-dasharray="6,4"/>
          
          <!-- Follicular Phase (Days 1-14) -->
          <path d="M0,-130 A130,130 0 0,1 130,0 L0,0 Z" fill="#1e523e" fill-opacity="0.6"/>
          <!-- Luteal Phase (Days 15-28) -->
          <path d="M130,0 A130,130 0 0,1 0,130 L0,0 Z" fill="#2d6e53" fill-opacity="0.6"/>
          <!-- Menstrual Phase (Days 1-5) -->
          <path d="M0,0 L-92,-92 A130,130 0 0,1 0,-130 Z" fill="#b94a4a" fill-opacity="0.5"/>

          <circle cx="0" cy="0" r="50" fill="#0d1e16" stroke="#d4af37" stroke-width="1.5"/>
          <text x="0" y="-8" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#d4af37" text-anchor="middle">HPO AXIS</text>
          <text x="0" y="12" font-family="'Manrope', sans-serif" font-size="9" font-weight="600" fill="#ffffff" text-anchor="middle">RHYTHM</text>

          <!-- Ovulation Indicator at Day 14 -->
          <circle cx="130" cy="0" r="10" fill="#d4af37" stroke="#ffffff" stroke-width="2"/>
          <text x="130" y="28" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d4af37" text-anchor="middle">Ovulation</text>
        </g>
      `,
    },
  },

  // 13. Leucorrhoea
  'leucorrhoea': {
    primary: {
      subtitle: 'Vaginal Mucosal Flora Equilibrium, Lactobacillus Density & Epithelial Toning',
      badge: 'GYNAECOLOGICAL HEALTH',
      labels: [
        { x: 340, y: 310, text: 'Vaginal Epithelial Stratum', sub: 'Glycogen-rich superficial squamous cells', targetX: 520, targetY: 300, align: 'left' },
        { x: 340, y: 440, text: 'Lactobacillus Ecosystem', sub: 'Lactic acid maintaining acidic pH 3.8-4.5', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Cervical Crypt Secretions', sub: 'Endocervical glandular mucus dynamics', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Non-Infective Catarrhal Stasis', sub: 'Pelvic venous congestion & fatigue link', targetX: 680, targetY: 310, align: 'right' },
        { x: 860, y: 450, text: 'Immune Barrier Defense', sub: 'Mucosal secretory IgA & defensins', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Mucosal Toning', sub: 'Individualised pelvic vitality remedies', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Pelvic Mucosal Anatomy Frame -->
          <ellipse cx="0" cy="0" rx="140" ry="110" fill="#17382b" stroke="#d4af37" stroke-width="2" filter="url(#organGlow)"/>
          <ellipse cx="0" cy="0" rx="95" ry="75" fill="#1f4c3a"/>

          <!-- Cervical Canal Opening Profile -->
          <ellipse cx="0" cy="-20" rx="25" ry="35" fill="#2d6e53" stroke="#d4af37" stroke-width="1.5"/>
          <circle cx="0" cy="-20" r="8" fill="#132c21"/>

          <!-- Healthy Flora (Lactobacilli Rods) -->
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.85">
            <line x1="-60" y1="-30" x2="-45" y2="-25"/><line x1="-70" y1="10" x2="-55" y2="15"/>
            <line x1="-40" y1="35" x2="-25" y2="30"/><line x1="50" y1="-25" x2="65" y2="-20"/>
            <line x1="40" y1="20" x2="55" y2="15"/><line x1="60" y1="40" x2="75" y2="35"/>
          </g>
          <text x="0" y="55" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#d4af37" text-anchor="middle">Balanced Mucosal Microbiome</text>
        </g>
      `,
    },
  },

  // 14. Uterine Fibroids (Leiomyomas)
  'uterine-fibroids': {
    primary: {
      subtitle: 'Myometrial Leiomyoma Classification: Submucosal, Intramural & Subserosal Smooth Muscle Neoplasms',
      badge: 'GYNAECOLOGICAL ONCOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Submucosal Leiomyoma', sub: 'Projects into uterine cavity, menorrhagia risk', targetX: 570, targetY: 370, align: 'left' },
        { x: 340, y: 440, text: 'Intramural Leiomyoma', sub: 'Embedded within muscular myometrial wall', targetX: 520, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Subserosal Leiomyoma', sub: 'Outer uterine surface projection & pressure', targetX: 500, targetY: 490, align: 'left' },
        { x: 860, y: 320, text: 'Uterine Cavity Distortion', sub: 'Impairs endometrial implantation', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Vascular Supply & Hyperplasia', sub: 'Estrogen-progesterone responsive growth', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Management', sub: 'Pelvic circulation & menstrual bleeding control', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Uterus Anatomical Silhouette -->
          <!-- Outer Myometrium -->
          <path d="M0,-80 C-70,-80 -130,-40 -130,20 C-130,70 -80,120 -35,130 L-25,160 L25,160 L35,130 C80,120 130,70 130,20 C130,-40 70,-80 0,-80 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2.5"/>
          
          <!-- Inner Endometrial Cavity (Inverted Triangle) -->
          <path d="M0,-30 L-45,15 L-15,80 L15,80 L45,15 Z" fill="#2d6b52" stroke="#ffffff" stroke-width="1.2"/>

          <!-- 1. Submucosal Fibroid (Indenting Cavity) -->
          <circle cx="-15" cy="20" r="18" fill="#d4af37" stroke="#ffffff" stroke-width="1.5"/>
          <text x="-15" y="24" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#143e2e" text-anchor="middle">SUBM</text>

          <!-- 2. Intramural Fibroid (Within Wall) -->
          <circle cx="70" cy="30" r="28" fill="#a4843f" stroke="#d4af37" stroke-width="2"/>
          <text x="70" y="34" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">INTRAMURAL</text>

          <!-- 3. Subserosal Fibroid (Bulging Outside) -->
          <circle cx="-95" cy="50" r="24" fill="#8f6d2f" stroke="#d4af37" stroke-width="1.5"/>
          <text x="-95" y="54" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">SUBSER</text>
        </g>
      `,
    },
  },

  // 15. Endometriosis Support
  'endometriosis-support': {
    primary: {
      subtitle: 'Ectopic Endometrial Tissue Implants, Pelvic Adhesions & Inflammatory Pain Cascade',
      badge: 'PELVIC PATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Ectopic Endometrial Implants', sub: 'Glandular tissue outside uterine cavity', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Retrograde Menstruation Pathway', sub: 'Transtubal dissemination into pelvis', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Ovarian Endometrioma ("Chocolate Cyst")', sub: 'Encapsulated cyclical bleeding stasis', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Peritoneal Inflammatory Cytokines', sub: 'Prostaglandin & TNF-alpha elevation', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Fibrotic Pelvic Adhesions', sub: 'Tissue tethering causing deep dyspareunia', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Pain & Vitality Support', sub: 'Natural anti-inflammatory pelvic easing', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Pelvic Organs Profile -->
          <!-- Uterus -->
          <path d="M-50,-20 C-50,-60 50,-60 50,-20 C50,40 20,80 0,80 C-20,80 -50,40 -50,-20 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          <!-- Ovaries & Fallopian Tubes -->
          <path d="M-50,-40 C-90,-50 -120,-30 -140,-10" fill="none" stroke="#2d6e53" stroke-width="4"/>
          <ellipse cx="-150" cy="0" rx="22" ry="16" fill="#183f2f" stroke="#d4af37" stroke-width="1.5"/>
          
          <path d="M50,-40 C90,-50 120,-30 140,-10" fill="none" stroke="#2d6e53" stroke-width="4"/>
          <ellipse cx="150" cy="0" rx="22" ry="16" fill="#183f2f" stroke="#d4af37" stroke-width="1.5"/>

          <!-- Ectopic Endometrial Lesions (Red/Brown Powder-Burn Spots) -->
          <g fill="#c93c3c" stroke="#ffffff" stroke-width="0.75">
            <circle cx="-135" cy="-8" r="5.5"/>
            <circle cx="-160" cy="8" r="6"/>
            <circle cx="140" cy="-5" r="5"/>
            <circle cx="-30" cy="50" r="5"/>
            <circle cx="20" cy="65" r="5.5"/>
            <circle cx="-70" cy="25" r="6"/>
            <circle cx="65" cy="30" r="5"/>
          </g>

          <!-- Fibrotic Adhesion Bands -->
          <g stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3,2">
            <line x1="-130" y1="10" x2="-50" y2="30"/>
            <line x1="130" y1="10" x2="50" y2="30"/>
            <line x1="-30" y1="70" x2="30" y2="70"/>
          </g>
          <text x="0" y="115" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#d4af37" text-anchor="middle">Endometriotic Foci &amp; Pelvic Tethering</text>
        </g>
      `,
    },
  },

  // 16. Female Infertility Support
  'female-infertility-support': {
    primary: {
      subtitle: 'Complete Reproductive Tract Assessment: Ovulation, Tubal Patency & Endometrial Receptivity',
      badge: 'REPRODUCTIVE MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Follicular Maturation', sub: 'Oocyte quality & pre-ovulatory surge', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Fallopian Tubal Ciliary Transit', sub: 'Ampullary fertilization pathway', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Cervical Mucus Spinnbarkeit', sub: 'Estrogenic fertile sperm conduit', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Trilaminar Endometrial Lining', sub: 'Receptive thickness (8-12mm)', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Corpus Luteum Progesterone', sub: 'Luteal phase support for blastocyst', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Pre-Conception Care', sub: 'Harmonizing vitality for natural conception', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Complete Female Reproductive System Anatomy -->
          <!-- Uterus Body -->
          <path d="M0,-60 C-60,-60 -100,-20 -100,30 C-100,70 -60,110 -25,120 L-18,150 L18,150 L25,120 C60,110 100,70 100,30 C100,-20 60,-60 0,-60 Z" fill="#1b4232" stroke="#d4af37" stroke-width="2"/>
          
          <!-- Endometrial Cavity -->
          <path d="M0,-25 L-40,15 L-12,70 L12,70 L40,15 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>

          <!-- Bilateral Fallopian Tubes -->
          <path d="M-60,-40 C-110,-60 -160,-40 -190,-10 C-200,0 -205,15 -195,25" fill="none" stroke="#255e47" stroke-width="4.5"/>
          <path d="M60,-40 C110,-60 160,-40 190,-10 C200,0 205,15 195,25" fill="none" stroke="#255e47" stroke-width="4.5"/>

          <!-- Ovaries -->
          <ellipse cx="-190" cy="30" rx="24" ry="18" fill="#d4af37" fill-opacity="0.8" stroke="#ffffff" stroke-width="1.5"/>
          <ellipse cx="190" cy="30" rx="24" ry="18" fill="#d4af37" fill-opacity="0.8" stroke="#ffffff" stroke-width="1.5"/>

          <circle cx="-190" cy="30" r="6" fill="#ffffff"/>
          <circle cx="190" cy="30" r="6" fill="#ffffff"/>
        </g>
      `,
    },
  },

  // 17. Thyroid & Fertility Support
  'thyroid-fertility-support': {
    primary: {
      subtitle: 'Thyroid-Ovarian Endocrine Axis: TSH, Free T3/T4 & Luteal Progesterone Synergy',
      badge: 'ENDOCRINE GYNAECOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Thyroid Gland Thyroxine (T4/T3)', sub: 'Metabolic signaling to ovarian granulosa', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Elevated TSH & Prolactin Link', sub: 'Thyrotropin-releasing hormone cross-talk', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Subclinical Hypothyroidism', sub: 'Optimal pre-conception TSH < 2.5 mIU/L', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Granulosa Cell Steroidogenesis', sub: 'Progesterone production modulation', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Basal Metabolic Temperature', sub: 'Biphasic temperature plateau tracking', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Endocrine Harmony', sub: 'Simultaneous thyroid & reproductive care', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Thyroid Gland (Top) -->
          <g transform="translate(0, -60)">
            <path d="M-50,-20 C-60,10 -40,40 -20,35 C-5,30 -5,-5 -20,-15 Z" fill="#d4af37" stroke="#ffffff" stroke-width="1.5"/>
            <path d="M50,-20 C60,10 40,40 20,35 C5,30 5,-5 20,-15 Z" fill="#d4af37" stroke="#ffffff" stroke-width="1.5"/>
            <rect x="-20" y="15" width="40" height="15" fill="#a4843f" rx="3"/>
            <text x="0" y="0" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">Thyroid</text>
          </g>

          <!-- Communication Feedback Axis Arrows -->
          <g stroke="#ffffff" stroke-width="2" stroke-dasharray="4,3">
            <line x1="-30" y1="0" x2="-30" y2="60"/>
            <line x1="30" y1="60" x2="30" y2="0"/>
          </g>

          <!-- Ovary (Bottom) -->
          <g transform="translate(0, 90)">
            <ellipse cx="0" cy="0" rx="65" ry="45" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
            <circle cx="-25" cy="-10" r="9" fill="#d4af37"/>
            <circle cx="20" cy="12" r="12" fill="#d4af37"/>
            <text x="0" y="5" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">Ovary</text>
          </g>
        </g>
      `,
    },
  },

  // 18. Low AMH Guidance
  'low-amh-guidance': {
    primary: {
      subtitle: 'Ovarian Primordial Reserve Dynamics, Pre-Antral Granulosa Secretion & Follicular Quality',
      badge: 'REPRODUCTIVE BIOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Anti-Müllerian Hormone (AMH)', sub: 'Secreted by growing pre-antral follicles', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Diminished Ovarian Reserve (DOR)', sub: 'Quantitative reduction vs oocyte quality', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Antral Follicle Count (AFC)', sub: 'Ultrasound baseline follicular cohort', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Mitochondrial Oocyte Vitality', sub: 'Cellular bioenergetics for maturation', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Natural Quality Optimization', sub: 'One healthy egg needed for conception', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Ovarian Nourishment', sub: 'Empathetic fertility pacing & support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Ovarian Follicular Reserve Depletion Curve -->
          <rect x="-180" y="-90" width="360" height="170" fill="#132e22" stroke="#295e47" stroke-width="1.5" rx="6"/>
          
          <!-- Axes -->
          <line x1="-150" y1="50" x2="150" y2="50" stroke="#d4af37" stroke-width="1.5"/>
          <line x1="-150" y1="50" x2="-150" y2="-70" stroke="#d4af37" stroke-width="1.5"/>
          <text x="-150" y="-76" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#d4af37">AMH Level</text>
          <text x="110" y="66" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#d4af37">Age / Time</text>

          <!-- Normal vs DOR Curves -->
          <!-- Standard Curve (dashed) -->
          <path d="M-140,-45 C-50,-40 50,0 140,40" fill="none" stroke="#689f87" stroke-width="2" stroke-dasharray="4,3"/>
          <text x="60" y="0" font-family="'Manrope', sans-serif" font-size="9" fill="#88bda7">Expected Range</text>

          <!-- Diminished Reserve Curve (accent gold) -->
          <path d="M-140,-20 C-60,0 20,35 140,46" fill="none" stroke="#d4af37" stroke-width="3"/>
          <circle cx="20" cy="35" r="5" fill="#ffffff" stroke="#d4af37" stroke-width="2"/>
          <text x="30" y="25" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff">Low AMH Window</text>
        </g>
      `,
    },
  },

  // 19. Unexplained Infertility Support
  'unexplained-infertility-support': {
    primary: {
      subtitle: 'Comprehensive Diagnostic Workup, Subtle Ovulatory Kinetics & Reproductive Vitality',
      badge: 'FERTILITY EVALUATION',
      labels: [
        { x: 340, y: 310, text: 'Normal Diagnostic Baseline', sub: 'Patent tubes, normal semen, ovulatory proof', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Micro-Nutrient & Endothelial Axis', sub: 'Sub-cellular metabolic fertilization balance', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Immunological Implantation Window', sub: 'Cytokine balance at endometrium', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Psychosomatic Stress Interplay', sub: 'Autonomic nervous system vascular tone', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Couple Constitutional Alignment', sub: 'Holistic constitutional dual evaluation', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Gentle Constitutional Optimization', sub: 'Overcoming unexplained barriers naturally', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Diagnostic Balance Scales / Triad Architecture -->
          <circle cx="0" cy="0" r="120" fill="#153628" stroke="#d4af37" stroke-width="2"/>
          <polygon points="0,-80 80,60 -80,60" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
          
          <circle cx="0" cy="-80" r="14" fill="#d4af37"/>
          <text x="0" y="-100" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Ovulation</text>

          <circle cx="80" cy="60" r="14" fill="#d4af37"/>
          <text x="95" y="85" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Tubal Patency</text>

          <circle cx="-80" cy="60" r="14" fill="#d4af37"/>
          <text x="-95" y="85" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Uterine Ground</text>

          <circle cx="0" cy="15" r="28" fill="#2d6e53" stroke="#d4af37" stroke-width="2"/>
          <text x="0" y="20" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">VITALITY</text>
        </g>
      `,
    },
  },

  // 20. Recurrent Miscarriage Support
  'recurrent-miscarriage-support': {
    primary: {
      subtitle: 'Endometrial Trophoblast Receptivity, Luteal Progesterone Integrity & Maternal Immune Tolerance',
      badge: 'EARLY PREGNANCY CARE',
      labels: [
        { x: 340, y: 310, text: 'Trophoblast Implantation Depth', sub: 'Decidual spiral artery remodeling', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Luteal Phase Progesterone Plateau', sub: 'Endometrial stromal secretory transformation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Immunological Maternal Tolerance', sub: 'Uterine NK cells (uNK) & Treg balance', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Antiphospholipid / Clotting Screen', sub: 'Micro-thrombi prevention context', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Pre-Conception Ground Preparation', sub: 'Toning uterine muscular & mucosal tone', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Gestational Support', sub: 'Emotional resilience & gentle remedies', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Decidual Endometrium & Implantation Blastocyst -->
          <rect x="-190" y="-40" width="380" height="120" fill="#1a4634" stroke="#2d7557" stroke-width="2" rx="4"/>
          <!-- Secretory Glands in Decidua -->
          <g stroke="#d4af37" stroke-width="2" fill="none">
            <path d="M-140,80 C-140,30 -150,0 -130,-15"/>
            <path d="M-70,80 C-65,30 -75,0 -60,-15"/>
            <path d="M60,80 C65,30 55,0 70,-15"/>
            <path d="M130,80 C130,30 120,0 140,-15"/>
          </g>

          <!-- Blastocyst Early Implantation Sphere -->
          <circle cx="0" cy="-35" r="32" fill="#2d6e53" stroke="#d4af37" stroke-width="2.5"/>
          <circle cx="0" cy="-35" r="16" fill="#d4af37"/>
          <text x="0" y="-75" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">Early Implantation Site</text>
        </g>
      `,
    },
  },

  // 21. Homeopathy Support During IVF / IUI
  'homeopathy-support-during-ivf-iui': {
    primary: {
      subtitle: 'Integrative Companion Protocol for Assisted Reproductive Technologies (ART)',
      badge: 'INTEGRATIVE REPRODUCTIVE MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Ovarian Stimulation Companion', sub: 'Easing pelvic bloating & hormonal heaviness', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Uterine Perfusion Before Transfer', sub: 'Optimizing endometrial blood flow velocity', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Endometrial Receptivity Window', sub: 'Non-interfering natural constitutional support', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Two-Week Wait (2WW) Support', sub: 'Autonomic nervous calming & sleep ease', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Procedure Anxiety Mitigation', sub: 'Supporting calmness during egg pickup & ET', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Full Conventional Harmony', sub: 'Zero chemical interference with IVF medicines', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Dual Companion Shields: Conventional ART & Constitutional Homeopathy -->
          <g transform="translate(-80, 0)">
            <rect x="-65" y="-80" width="130" height="150" fill="#16382a" stroke="#ffffff" stroke-width="1.5" rx="8"/>
            <text x="0" y="-45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">IVF / IUI</text>
            <text x="0" y="-25" font-family="'Manrope', sans-serif" font-size="9" fill="#9ec4b3" text-anchor="middle">Conventional ART</text>
            <circle cx="0" cy="20" r="22" fill="#2d6e53"/>
            <text x="0" y="24" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Clinical</text>
          </g>

          <g transform="translate(80, 0)">
            <rect x="-65" y="-80" width="130" height="150" fill="#1b4534" stroke="#d4af37" stroke-width="2" rx="8"/>
            <text x="0" y="-45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#d4af37" text-anchor="middle">HOMEOPATHY</text>
            <text x="0" y="-25" font-family="'Manrope', sans-serif" font-size="9" fill="#dfca91" text-anchor="middle">Companion Care</text>
            <circle cx="0" cy="20" r="22" fill="#d4af37"/>
            <text x="0" y="24" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#143e2e" text-anchor="middle">Holistic</text>
          </g>

          <!-- Synergistic Bridge -->
          <path d="M-15,0 L15,0" stroke="#d4af37" stroke-width="3"/>
        </g>
      `,
    },
  },

  // 60. UTI Support (Recurrent Urinary Tract Infections)
  'uti-support': {
    primary: {
      subtitle: 'Urinary Bladder Urothelial Mucosa, Detrusor Tone & Recurrent Microbial Defense',
      badge: 'UROLOGICAL HEALTH',
      labels: [
        { x: 340, y: 310, text: 'Bladder Urothelium Mucosa', sub: 'Glycosaminoglycan (GAG) protective layer', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Uropathogenic E. coli Adherence', sub: 'Type 1 fimbriae attachment to umbrella cells', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Detrusor Muscle Spasm', sub: 'Dysuria, urinary urgency & frequency', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Urethral Anatomical Pathway', sub: 'Female shorter urethra recurrence factor', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Bladder Emptying & Hydration', sub: 'Hydrodynamic flushing of micro-organisms', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Mucosal Defense', sub: 'Strengthening bladder resistance naturally', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Urinary Bladder Cross Section -->
          <ellipse cx="0" cy="-10" rx="110" ry="90" fill="#184231" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Inner Lumen / Mucosa -->
          <ellipse cx="0" cy="-10" rx="75" ry="60" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>
          
          <!-- Ureteral Inlets -->
          <circle cx="-50" cy="-40" r="6" fill="#d4af37"/>
          <circle cx="50" cy="-40" r="6" fill="#d4af37"/>
          
          <!-- Urethral Outlet -->
          <path d="M-15,50 L-10,95 L10,95 L15,50 Z" fill="#153628" stroke="#d4af37" stroke-width="1.5"/>
          <text x="0" y="-10" font-family="'Manrope', sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">URINARY BLADDER</text>
          <text x="0" y="115" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d4af37" text-anchor="middle">Urethral Conduit</text>
        </g>
      `,
    },
  },
};

module.exports = {
  WOMENS_HEALTH_ARTWORKS,
};
