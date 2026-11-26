/**
 * Anatomical & Clinical SVG Artworks for Respiratory & ENT Conditions
 */

const { escapeXml } = require('./theme');

const RESPIRATORY_ARTWORKS = {
  // 39. Asthma
  'asthma': {
    primary: {
      subtitle: 'Bronchial Hyper-Reactivity, Smooth Muscle Bronchospasm & Airway Lumen Constriction',
      badge: 'PULMONARY MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Bronchospasm Smooth Muscle Band', sub: 'Hypertrophied muscle constriction', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Submucosal Edema & Eosinophils', sub: 'Inflammatory thickening of bronchial wall', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Goblet Cell Mucus Hypersecretion', sub: 'Tenacious mucous plugs in small airways', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Normal Airway vs Asthmatic Airway', sub: 'Dramatic reduction in cross-sectional radius', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Expiratory Wheeze Acoustic Marker', sub: 'Turbulent airflow through narrowed bronchi', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Bronchial Relaxation', sub: 'Calming hyper-reactivity & promoting clear breathing', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Normal Airway (Left) -->
          <g transform="translate(-110, 0)">
            <!-- Outer Muscle -->
            <circle cx="0" cy="0" r="75" fill="#184232" stroke="#2b6b50" stroke-width="2"/>
            <!-- Open Lumen -->
            <circle cx="0" cy="0" r="52" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
            <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">Open Airway</text>
            <text x="0" y="100" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#a4cebc" text-anchor="middle">Normal Bronchiole</text>
          </g>

          <!-- Asthmatic Airway (Right - Constricted, Edematous) -->
          <g transform="translate(110, 0)">
            <!-- Thickened Constricted Muscle Band -->
            <circle cx="0" cy="0" r="75" fill="#184232" stroke="#c5a059" stroke-width="6"/>
            <!-- Swollen Inflamed Mucosa -->
            <circle cx="0" cy="0" r="52" fill="#8f3232" stroke="#e05353" stroke-width="2"/>
            <!-- Pinched Constricted Lumen filled with Mucus -->
            <ellipse cx="0" cy="0" rx="18" ry="12" fill="#d8b674" stroke="#ffffff" stroke-width="1.5"/>
            <text x="0" y="100" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#e07272" text-anchor="middle">Asthmatic Bronchospasm</text>
          </g>
        </g>
      `,
    },
  },

  // 40. Bronchitis
  'bronchitis': {
    primary: {
      subtitle: 'Tracheobronchial Mucociliary Clearance Impairment & Catarrhal Inflammatory Secretions',
      badge: 'PULMONARY MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Tracheobronchial Bifurcation (Carina)', sub: 'Primary bronchial conducting division', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Mucociliary Escalator Paralysis', sub: 'Loss of coordinated epithelial ciliary sweep', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Hyperplastic Bronchial Submucosa', sub: 'Reid index elevation in chronic bronchitis', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Purulent Bronchial Secretions', sub: 'Tenacious morning sputum clearance', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Paroxysmal Cough Reflex Arc', sub: 'Vagal afferent cough receptor activation', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Mucus Liquefaction', sub: 'Gentle expectoration & chest ease', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Tracheobronchial Tree Branching -->
          <!-- Trachea (Top) -->
          <path d="M-22,-120 L-22,-30 L22,-30 L22,-120 Z" fill="#1b4534" stroke="#c5a059" stroke-width="2"/>
          <!-- Cartilaginous Rings on Trachea -->
          <g stroke="#ffffff" stroke-width="1.5" opacity="0.6">
            <line x1="-20" y1="-100" x2="20" y2="-100"/>
            <line x1="-20" y1="-75" x2="20" y2="-75"/>
            <line x1="-20" y1="-50" x2="20" y2="-50"/>
          </g>

          <!-- Bronchial Carina & Branches (Left & Right) with Inflamed Erythema -->
          <path d="M-22,-30 C-22,0 -90,40 -120,90" fill="none" stroke="#2d6e53" stroke-width="18" stroke-linecap="round"/>
          <path d="M22,-30 C22,0 90,40 120,90" fill="none" stroke="#2d6e53" stroke-width="18" stroke-linecap="round"/>

          <!-- Catarrhal Inflamed Secretions (Gold/Red Inner Core) -->
          <path d="M-22,-30 C-22,0 -90,40 -120,90" fill="none" stroke="#d8b674" stroke-width="7" stroke-linecap="round"/>
          <path d="M22,-30 C22,0 90,40 120,90" fill="none" stroke="#d8b674" stroke-width="7" stroke-linecap="round"/>
          
          <text x="0" y="20" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">Carina</text>
        </g>
      `,
    },
  },

  // 41. COPD Support
  'copd-support': {
    primary: {
      subtitle: 'Alveolar Septal Destruction (Emphysema), Loss of Elastic Recoil & Chronic Airflow Limitation',
      badge: 'CHRONIC PULMONARY MEDICINE',
      labels: [
        { x: 340, y: 310, text: 'Normal Elastic Alveolar Clusters', sub: 'High surface area capillary gas exchange', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Protease / Anti-Protease Imbalance', sub: 'Elastin degradation by neutrophil elastase', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Permanent Airspace Enlargement', sub: 'Coalesced emphysematous bullae', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Expiratory Dynamic Airway Collapse', sub: 'Loss of radial traction on small bronchioles', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Pulmonary Hyperinflation & Trapping', sub: 'Increased residual volume (RV)', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Respiratory Stamina', sub: 'Vital energy support & breath conservation', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Comparison: Healthy Alveoli (Left) vs Emphysematous COPD Bullae (Right) -->
          <g transform="translate(-100, 0)">
            <!-- Healthy Intact Clusters of Small Alveoli -->
            <g fill="#2d6e53" stroke="#ffffff" stroke-width="1.2">
              <circle cx="-25" cy="-25" r="18"/><circle cx="15" cy="-25" r="18"/>
              <circle cx="-35" cy="15" r="18"/><circle cx="0" cy="20" r="19"/>
              <circle cx="35" cy="15" r="18"/>
            </g>
            <text x="0" y="70" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#a4cebc" text-anchor="middle">Normal Alveoli</text>
          </g>

          <g transform="translate(100, 0)">
            <!-- Destroyed Septa forming One Large Ineffective Sac -->
            <ellipse cx="0" cy="0" rx="65" ry="50" fill="#1b4534" stroke="#c5a059" stroke-width="2.5"/>
            <!-- Remnant Broken Septal Stubs -->
            <path d="M-65,0 L-40,0 M65,0 L40,0 M0,-50 L0,-30" stroke="#e07272" stroke-width="2.5"/>
            <text x="0" y="70" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#e07272" text-anchor="middle">COPD Emphysema</text>
          </g>
        </g>
      `,
    },
  },

  // 42. Allergic Rhinitis
  'allergic-rhinitis': {
    primary: {
      subtitle: 'Nasal Turbinate Mucosal Hyper-Reactivity, IgE-Mediated Histamine Flare & Rhinorrhea',
      badge: 'ALLERGIC RHINOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Inferior Turbinate Hypertrophy', sub: 'Erythematous or pale boggy mucosa', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Pollen / Dust Mite Sensitization', sub: 'Immediate Phase cross-linking of IgE', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Watery Rhinorrhea & Sneezing Fits', sub: 'Parasympathetic secretomotor reflex', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Nasal Airway Resistance Elevation', sub: 'Venous sinusoid engorgement in turbinates', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Allergic Shiner & Nasal Crease', sub: 'Infraorbital venous stasis markers', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Mucosal Desensitization', sub: 'Natural tolerance to airborne allergens', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Sagittal Nasal Cavity Silhouette -->
          <path d="M-80,-110 C-30,-120 40,-90 70,-40 C90,0 90,60 60,110 L-20,110 C-60,70 -80,20 -80,-110 Z" fill="#1b4534" stroke="#c5a059" stroke-width="2"/>
          
          <!-- Nasal Turbinates (Superior, Middle, Inferior) -->
          <ellipse cx="10" cy="-40" rx="35" ry="12" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>
          <ellipse cx="20" cy="0" rx="42" ry="14" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>
          <!-- Hypertrophied Boggy Inferior Turbinate -->
          <ellipse cx="25" cy="45" rx="50" ry="18" fill="#8f3232" stroke="#d4af37" stroke-width="2"/>
          
          <text x="25" y="49" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">Swollen Turbinate</text>
        </g>
      `,
    },
  },

  // 43. Sinusitis
  'sinusitis': {
    primary: {
      subtitle: 'Paranasal Sinus Ostiomeatal Complex Blockage, Mucous Stasis & Facial Pressure',
      badge: 'RHINOLOGY & ENT',
      labels: [
        { x: 340, y: 310, text: 'Frontal Sinuses (Supraorbital)', sub: 'Forehead headache & acute tenderness', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Maxillary Sinuses (Antrum of Highmore)', sub: 'Malar facial fullness & dental aching', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Ethmoid Air Cell Labyrinth', sub: 'Retro-orbital pressure & nasal root pain', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Ostiomeatal Complex Obstruction', sub: 'Narrowed drainage cleft & mucous retention', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Purulent Post-Nasal Catarrh', sub: 'Pharyngeal drainage & chronic cough trigger', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Sinus Drainage', sub: 'Relieving inflammation & clearing natural ostia', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Craniofacial Silhouette -->
          <path d="M-100,-110 C-30,-140 30,-140 100,-110 C140,-50 140,50 100,110 C30,130 -30,130 -100,110 C-140,50 -140,-50 -100,-110 Z" fill="#143628" stroke="#255e46" stroke-width="2"/>
          
          <!-- Frontal Sinuses (Above Eyes) -->
          <ellipse cx="-35" cy="-80" rx="25" ry="16" fill="#8f3232" stroke="#d4af37" stroke-width="1.5"/>
          <ellipse cx="35" cy="-80" rx="25" ry="16" fill="#8f3232" stroke="#d4af37" stroke-width="1.5"/>
          <text x="0" y="-85" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Frontal</text>

          <!-- Ethmoid Sinuses (Between Eyes) -->
          <g fill="#a4843f">
            <circle cx="-12" cy="-35" r="6"/><circle cx="-12" cy="-20" r="6"/>
            <circle cx="12" cy="-35" r="6"/><circle cx="12" cy="-20" r="6"/>
          </g>

          <!-- Maxillary Sinuses (Cheeks) -->
          <path d="M-65,10 C-40,10 -25,35 -35,65 C-50,75 -75,70 -80,50 C-85,30 -75,10 -65,10 Z" fill="#8f3232" stroke="#d4af37" stroke-width="2"/>
          <path d="M65,10 C40,10 25,35 35,65 C50,75 75,70 80,50 C85,30 75,10 65,10 Z" fill="#8f3232" stroke="#d4af37" stroke-width="2"/>
          <text x="-55" y="45" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Maxillary</text>
          <text x="55" y="45" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Maxillary</text>
        </g>
      `,
    },
  },

  // 44. Tonsillitis
  'tonsillitis': {
    primary: {
      subtitle: 'Palatine Tonsil Hypertrophy, Waldeyer Ring Lymphoid Tissue & Follicular Exudate',
      badge: 'OTOLARYNGOLOGY (ENT)',
      labels: [
        { x: 340, y: 310, text: 'Palatine Tonsils Enlargement', sub: 'Kissing tonsils grading III-IV obstruction', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Cryptic Exudate / Tonsilloliths', sub: 'Fibrinous debris & bacterial accumulation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Anterior Tonsillar Pillar Erythema', sub: 'Palatoglossal arch inflammation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Severe Odynophagia (Painful Swallowing)', sub: 'Referred otalgia via glossopharyngeal nerve', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Jugulodigastric Lymphadenopathy', sub: 'Tender anterior cervical lymph node swell', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Tonsillar Resolution', sub: 'Strengthening lymphoid immunity naturally', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Open Oral Cavity Frame -->
          <ellipse cx="0" cy="0" rx="140" ry="110" fill="#143628" stroke="#c5a059" stroke-width="2"/>
          <ellipse cx="0" cy="15" rx="100" ry="75" fill="#0b241b"/>

          <!-- Uvula Hanging Center -->
          <path d="M-8,-40 C-8,-10 -15,0 0,15 C15,0 8,-10 8,-40 Z" fill="#8f3232" stroke="#ffffff" stroke-width="1.2"/>

          <!-- Inflamed Swollen Palatine Tonsils (Bilateral) -->
          <ellipse cx="-65" cy="0" rx="30" ry="42" fill="#b93b3b" stroke="#ffffff" stroke-width="2"/>
          <ellipse cx="65" cy="0" rx="30" ry="42" fill="#b93b3b" stroke="#ffffff" stroke-width="2"/>

          <!-- Follicular Exudate White Spots -->
          <g fill="#ffffff">
            <circle cx="-60" cy="-15" r="4"/><circle cx="-70" cy="5" r="4.5"/><circle cx="-55" cy="18" r="4"/>
            <circle cx="60" cy="-15" r="4"/><circle cx="70" cy="5" r="4.5"/><circle cx="55" cy="18" r="4"/>
          </g>

          <text x="-65" y="55" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">Swollen Tonsil</text>
          <text x="65" y="55" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">Swollen Tonsil</text>
        </g>
      `,
    },
  },

  // 45. Breathlessness Assessment Support
  'breathlessness-assessment-support': {
    primary: {
      subtitle: 'Pulmonary Mechanics, Alveolar-Capillary Diffusion & Respiratory Rate Assessment',
      badge: 'CLINICAL PULMONARY PHYSIOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Diaphragmatic Excursion Deficit', sub: 'Reduced inspiratory muscle efficiency', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Ventilation-Perfusion (V/Q) Ratio', sub: 'Alveolar oxygen diffusion interface', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Accessory Muscle Usage Check', sub: 'Sternocleidomastoid & scalene tension', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Oxygen Saturation (SpO2) Triage', sub: 'Clinical threshold monitoring (&gt;95%)', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Psychophysiological Dyspnoea', sub: 'Hyperventilation & anxiety feedback loop', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Respiratory Calming', sub: 'Gentle support for vital breath harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Thoracic Rib Cage & Lung Fields Profile -->
          <ellipse cx="0" cy="0" rx="130" ry="110" fill="#173b2c" stroke="#c5a059" stroke-width="2"/>
          
          <!-- Bilateral Lung Silhouettes -->
          <path d="M-20,-70 C-50,-70 -90,-30 -90,40 C-90,80 -50,90 -20,85 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
          <path d="M20,-70 C50,-70 90,-30 90,40 C90,80 50,90 20,85 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>

          <!-- Central Trachea & Airway Path -->
          <line x1="0" y1="-80" x2="0" y2="-20" stroke="#c5a059" stroke-width="4"/>
          <line x1="0" y1="-20" x2="-35" y2="10" stroke="#c5a059" stroke-width="3"/>
          <line x1="0" y1="-20" x2="35" y2="10" stroke="#c5a059" stroke-width="3"/>

          <!-- Diaphragm Muscle Arch at Base -->
          <path d="M-100,85 Q0,50 100,85" fill="none" stroke="#d4af37" stroke-width="3.5"/>
          <text x="0" y="105" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d4af37" text-anchor="middle">Diaphragmatic Excursion</text>
        </g>
      `,
    },
  },
};

module.exports = {
  RESPIRATORY_ARTWORKS,
};
