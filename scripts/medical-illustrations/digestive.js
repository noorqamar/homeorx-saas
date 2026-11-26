/**
 * Anatomical & Clinical SVG Artworks for Digestive & Hepato-Biliary Conditions
 */

const { escapeXml } = require('./theme');

const DIGESTIVE_ARTWORKS = {
  // 26. Fatty Liver (NAFLD)
  'fatty-liver': {
    primary: {
      subtitle: 'Hepatic Steatosis, Hepatocyte Triglyceride Accumulation & Portal Triad Micro-Anatomy',
      badge: 'HEPATOLOGY & METABOLISM',
      labels: [
        { x: 340, y: 310, text: 'Hepatocyte Microvesicular Steatosis', sub: 'Intracellular lipid droplet accumulation', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Portal Triad Architecture', sub: 'Hepatic artery, portal vein & bile ductules', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Kupffer Cell Activation Risk', sub: 'Progression from simple steatosis to NASH', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Enlarged Hepatic Silhouette', sub: 'Diffuse hyperechogenicity on ultrasound', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Insulin Resistance Link', sub: 'Impaired peripheral lipid beta-oxidation', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Hepatic Drainage', sub: 'Gentle metabolic clearance & cellular support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Liver Silhouette -->
          <path d="M-150,-40 C-160,20 -100,100 -20,110 C60,110 140,80 160,20 C170,-20 120,-70 40,-80 C-40,-85 -130,-70 -150,-40 Z" fill="#1b4533" stroke="#b89047" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Steatotic Fat Droplets in Hepatic Lobules (Yellow/Gold) -->
          <g fill="#d8b674" stroke="#ffffff" stroke-width="0.75" opacity="0.9">
            <circle cx="-90" cy="10" r="14"/><circle cx="-55" cy="-20" r="16"/><circle cx="-30" cy="30" r="15"/>
            <circle cx="20" cy="-30" r="18"/><circle cx="50" cy="20" r="16"/><circle cx="95" cy="-10" r="15"/>
            <circle cx="120" cy="25" r="12"/><circle cx="-110" cy="-25" r="11"/><circle cx="10" cy="65" r="14"/>
            <circle cx="-65" cy="55" r="13"/><circle cx="65" cy="-40" r="12"/>
          </g>
          
          <!-- Portal Triad Marker -->
          <circle cx="0" cy="5" r="12" fill="#b93b3b" stroke="#ffffff" stroke-width="1.5"/>
          <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">PV</text>
        </g>
      `,
    },
  },

  // 27. Hepatitis Support
  'hepatitis-support': {
    primary: {
      subtitle: 'Hepatic Parenchymal Cellular Vitality, Transaminase Balance & Bilirubin Conjugation',
      badge: 'CLINICAL HEPATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Hepatocyte Integrity', sub: 'Supporting parenchymal cellular regeneration', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Sinusoidal Micro-Circulation', sub: 'Endothelial filtration & immune processing', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'ALT / AST Transaminase Harmony', sub: 'Marker modulation during recovery', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Bile Canalicular Drainage', sub: 'Bilirubin clearance & jaundice mitigation', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Post-Viral Fatigue Management', sub: 'Restoring constitutional energy reserve', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Complementary Liver Support', sub: 'Safe, non-toxic constitutional dilutions', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Liver Hexagonal Lobule Diagram -->
          <polygon points="0,-100 87,-50 87,50 0,100 -87,50 -87,-50" fill="#173b2b" stroke="#b89047" stroke-width="2.5"/>
          
          <!-- Central Vein -->
          <circle cx="0" cy="0" r="22" fill="#2d6e53" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="4" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">CENTRAL V.</text>

          <!-- Sinusoids radiating outward -->
          <g stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6">
            <line x1="0" y1="-22" x2="0" y2="-95"/>
            <line x1="19" y1="-11" x2="80" y2="-45"/>
            <line x1="19" y1="11" x2="80" y2="45"/>
            <line x1="0" y1="22" x2="0" y2="95"/>
            <line x1="-19" y1="11" x2="-80" y2="45"/>
            <line x1="-19" y1="-11" x2="-80" y2="-45"/>
          </g>

          <!-- Portal Triads at Vertices -->
          <circle cx="0" cy="-100" r="7" fill="#b89047"/><circle cx="87" cy="-50" r="7" fill="#b89047"/>
          <circle cx="87" cy="50" r="7" fill="#b89047"/><circle cx="0" cy="100" r="7" fill="#b89047"/>
          <circle cx="-87" cy="50" r="7" fill="#b89047"/><circle cx="-87" cy="-50" r="7" fill="#b89047"/>
        </g>
      `,
    },
  },

  // 28. Acidity & GERD
  'acidity-gerd': {
    primary: {
      subtitle: 'Lower Esophageal Sphincter (LES) Competence, Acid Reflux & Mucosal Protection',
      badge: 'UPPER GASTROENTEROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Esophageal Squamous Epithelium', sub: 'Non-keratinized acid-sensitive lining', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Lower Esophageal Sphincter (LES)', sub: 'Transient relaxation allowing acid reflux', targetX: 500, targetY: 410, align: 'left' },
        { x: 340, y: 560, text: 'Diaphragmatic Crura Grip', sub: 'Anti-reflux barrier mechanism', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Retrograde Gastric Acid Flush', sub: 'Hydrochloric acid (HCl) & pepsin burn', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Gastric Fundus Acid Pocket', sub: 'Post-prandial unbuffered acid layer', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Reflux Soothing', sub: 'Regulating gastric tone & nervous digestion', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Esophagus Conduit (Top) -->
          <path d="M-18,-150 L-18,-30 L18,-30 L18,-150 Z" fill="#204f3b" stroke="#ffffff" stroke-width="1.5"/>
          
          <!-- Acid Reflux Wave traveling UP esophagus (Red/Orange Gradient) -->
          <path d="M-12,-40 C-8,-70 8,-90 0,-130 C-4,-90 4,-70 12,-40 Z" fill="#e05353" opacity="0.85"/>
          <text x="0" y="-80" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">ACID REFLUX</text>

          <!-- Lower Esophageal Sphincter (LES) Ring -->
          <ellipse cx="0" cy="-30" rx="30" ry="12" fill="#b89047" stroke="#ffffff" stroke-width="1.5"/>
          <text x="0" y="-26" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#143e2e" text-anchor="middle">LES SPHINCTER</text>

          <!-- Stomach Silhouette (Bottom) -->
          <path d="M-18,-25 C-60,-20 -110,20 -100,80 C-90,140 20,150 70,120 C120,90 120,30 60,0 C30,-15 18,-20 18,-25 Z" fill="#1b4534" stroke="#b89047" stroke-width="2.5"/>
          
          <!-- Gastric Fluid Pool -->
          <path d="M-75,80 C-50,110 50,110 65,80 C50,70 -50,70 -75,80 Z" fill="#d8b674" opacity="0.8"/>
          <text x="0" y="90" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#143e2e" text-anchor="middle">Gastric Acid Pool (pH 1.5-2)</text>
        </g>
      `,
    },
  },

  // 29. Gastritis
  'gastritis': {
    primary: {
      subtitle: 'Gastric Mucosal Barrier Integrity, Bicarbonate Mucus Coat & Epigastric Burning',
      badge: 'GASTROINTESTINAL PATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Protective Mucus-Bicarbonate Layer', sub: 'Epithelial defense against pepsin digestion', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Mucosal Erythema & Petechiae', sub: 'Superficial diffuse gastric inflammation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'NSAID / Stress Barrier Breakdown', sub: 'Prostaglandin synthesis inhibition', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Epigastric Burning & Fullness', sub: 'Post-prandial gnawing discomfort', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Gastric Parietal Cell Activity', sub: 'H+/K+ ATPase proton pump balance', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Mucosal Healing', sub: 'Gentle soothing remedies & digestive ease', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Stomach Wall Cross-Section -->
          <path d="M-180,-80 Q0,-100 180,-80 L180,100 Q0,80 -180,100 Z" fill="#1b4533" stroke="#b89047" stroke-width="2"/>
          
          <!-- Surface Epithelial Layer with Inflamed Erythematous Foci -->
          <path d="M-180,-80 Q0,-100 180,-80 L180,-40 Q0,-60 -180,-40 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1"/>
          
          <!-- Inflamed Patches (Gastritis Areas) -->
          <g fill="#c93838" stroke="#ffffff" stroke-width="0.5">
            <ellipse cx="-110" cy="-60" rx="25" ry="10"/>
            <ellipse cx="-30" cy="-68" rx="30" ry="12"/>
            <ellipse cx="60" cy="-62" rx="24" ry="11"/>
            <ellipse cx="130" cy="-55" rx="20" ry="9"/>
          </g>
          <text x="0" y="-30" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ff9999" text-anchor="middle">Erythematous Mucosal Erosion</text>

          <!-- Gastric Pits & Parietal Cells -->
          <g stroke="#b89047" stroke-width="1.5" fill="none">
            <line x1="-120" y1="-40" x2="-120" y2="40"/>
            <line x1="-60" y1="-40" x2="-60" y2="40"/>
            <line x1="0" y1="-40" x2="0" y2="40"/>
            <line x1="60" y1="-40" x2="60" y2="40"/>
            <line x1="120" y1="-40" x2="120" y2="40"/>
          </g>
          <text x="0" y="65" font-family="'Manrope', sans-serif" font-size="10" font-weight="600" fill="#a4cebc" text-anchor="middle">Gastric Glandular Submucosa</text>
        </g>
      `,
    },
  },

  // 30. Peptic Ulcer
  'peptic-ulcer': {
    primary: {
      subtitle: 'Gastroduodenal Mucosal Excavation, Muscularis Mucosae Breach & Ulcer Crater Healing',
      badge: 'GASTROINTESTINAL PATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Circumscribed Ulcer Crater', sub: 'Penetration through mucosal barrier', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Necrotic Fibrinous Base', sub: 'Exudative base with underlying granulation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Nocturnal Gnawing Hunger Pain', sub: 'Relieved by food/milk in duodenal ulcer', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Muscularis Propria Exposure', sub: 'Erosion risk to vascular branches', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Epithelial Regeneration Margins', sub: 'Restorative mucosal migration', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Healing Protocol', sub: 'Harmonizing vitality for tissue repair', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Gut Wall Tissue Architecture with Deep Ulcer Crater -->
          <rect x="-190" y="-80" width="380" height="150" fill="#1b4533" stroke="#b89047" stroke-width="2" rx="4"/>
          
          <!-- Mucosal Layer (top) with Crater Depression -->
          <path d="M-190,-80 L-60,-80 C-40,-80 -45,-15 0,-15 C45,-15 40,-80 60,-80 L190,-80 L190,-30 C190,-30 45,5 0,5 C-45,5 -190,-30 -190,-30 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>

          <!-- Ulcer Crater Core (Exudate & Granulation) -->
          <ellipse cx="0" cy="-10" rx="35" ry="14" fill="#a83232" stroke="#e05353" stroke-width="2"/>
          <ellipse cx="0" cy="-10" rx="18" ry="7" fill="#dfca91"/>
          <text x="0" y="-30" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">ULCER CRATER</text>

          <!-- Exposed Muscular Layer Below -->
          <line x1="-160" y1="35" x2="160" y2="35" stroke="#b89047" stroke-width="2" stroke-dasharray="6,4"/>
          <text x="0" y="55" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d8b674" text-anchor="middle">Muscularis Propria Base</text>
        </g>
      `,
    },
  },

  // 31. Indigestion & Dyspepsia
  'indigestion-dyspepsia': {
    primary: {
      subtitle: 'Functional Gastrointestinal Motility, Delayed Gastric Emptying & Epigastric Distension',
      badge: 'FUNCTIONAL GASTROENTEROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Fundic Accommodation Defect', sub: 'Impaired relaxation following food intake', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Gastric Antral Hypomotility', sub: 'Delayed gastric emptying & early satiety', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Duodenal Acid Sensitivity', sub: 'Chemoreceptor hypersensitivity to lipids', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Post-Prandial Epigastric Fullness', sub: 'Distension, belching & abdominal bloating', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Digestive Enzyme Synchronization', sub: 'Biliary & pancreatic digestive secretions', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Digestive Harmony', sub: 'Gentle stimulation of functional vitality', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Functional Stomach Digestive Motility Waves -->
          <path d="M-10,-100 C-60,-90 -110,-40 -110,20 C-110,80 -50,120 0,120 C50,120 100,80 90,30 C80,-20 30,-50 10,-100 Z" fill="#1b4534" stroke="#b89047" stroke-width="2.5"/>
          
          <!-- Peristaltic Wave Constriction Ripples -->
          <g stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" fill="none">
            <ellipse cx="-20" cy="-20" rx="55" ry="30"/>
            <ellipse cx="-15" cy="25" rx="65" ry="35"/>
            <ellipse cx="0" cy="70" rx="50" ry="25"/>
          </g>

          <!-- Central Motility Indicator -->
          <circle cx="-15" cy="25" r="24" fill="#2d6e53" stroke="#b89047" stroke-width="1.5"/>
          <text x="-15" y="22" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">MOTILITY</text>
          <text x="-15" y="34" font-family="'Manrope', sans-serif" font-size="8" font-weight="600" fill="#d8b674" text-anchor="middle">WAVE</text>
        </g>
      `,
    },
  },

  // 32. IBS (Irritable Bowel Syndrome)
  'ibs': {
    primary: {
      subtitle: 'Brain-Gut Axis Communication, Colonic Visceral Hypersensitivity & Motility Dysregulation',
      badge: 'NEURO-GASTROENTEROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Brain-Gut Neural Signaling Axis', sub: 'Bidirectional vagal & autonomic feedback', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Colonic Visceral Hypersensitivity', sub: 'Amplified pain response to normal gas', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Enteric Nervous System (ENS)', sub: 'Serotonin (5-HT) colonic regulation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Altered Peristaltic Transit', sub: 'IBS-D (rapid transit) vs IBS-C (spastic delay)', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Stress-Induced Flare Mechanism', sub: 'Corticotropin-releasing factor in colon', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Gut-Brain Harmony', sub: 'Balancing nervous system & colonic comfort', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Colon Segment with Spastic Waves -->
          <path d="M-150,40 C-150,-30 -80,-50 -40,-40 C0,-30 40,-50 100,-40 C140,-30 150,40 150,40 L120,70 C100,50 60,60 20,50 C-20,40 -60,60 -100,50 C-130,40 -150,40 -150,40 Z" fill="#1b4534" stroke="#b89047" stroke-width="2.5"/>

          <!-- Brain-Gut Communication Line (Upward) -->
          <g stroke="#ffffff" stroke-width="2" stroke-dasharray="4,4">
            <line x1="0" y1="-40" x2="0" y2="-120"/>
          </g>
          <circle cx="0" cy="-125" r="28" fill="#2d6e53" stroke="#b89047" stroke-width="2"/>
          <text x="0" y="-127" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">BRAIN</text>
          <text x="0" y="-116" font-family="'Manrope', sans-serif" font-size="8" font-weight="600" fill="#d8b674" text-anchor="middle">AXIS</text>

          <!-- Hypersensitive Nerve Terminals in Colon -->
          <g fill="#e05252">
            <circle cx="-60" cy="5" r="5"/><circle cx="0" cy="10" r="5.5"/><circle cx="60" cy="8" r="5"/>
          </g>
          <text x="0" y="88" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d8b674" text-anchor="middle">Spastic Colonic Segment</text>
        </g>
      `,
    },
  },

  // 33. Constipation
  'constipation': {
    primary: {
      subtitle: 'Colonic Peristalsis Delay, Haustral Segmentation & Fecal Water Reabsorption Kinetics',
      badge: 'COLORECTAL PHYSIOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Slow Colonic Transit Time', sub: 'Decreased high-amplitude propagating contractions', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Excessive Fluid Reabsorption', sub: 'Formation of hard, scybalous dry stools', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Pelvic Floor Dyssynergia', sub: 'Paradoxical puborectalis contraction', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Haustral Segmental Spasm', sub: 'Uncoordinated segmental colon contractions', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Rectal Hyposensitivity', sub: 'Blunted defecation urge reflex', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Motility Protocol', sub: 'Natural peristalsis revival without laxatives', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Large Intestine Anatomy (Ascending, Transverse, Descending) -->
          <path d="M-130,80 L-130,-40 C-130,-70 -80,-80 0,-80 C80,-80 130,-70 130,-40 L130,80" fill="none" stroke="#255e46" stroke-width="32" stroke-linecap="round"/>
          
          <!-- Hardened Fecal Boluses in Descending Colon -->
          <g fill="#6a4c28" stroke="#ffffff" stroke-width="1">
            <ellipse cx="130" cy="-20" rx="12" ry="16"/>
            <ellipse cx="130" cy="20" rx="13" ry="18"/>
            <ellipse cx="130" cy="60" rx="14" ry="18"/>
          </g>

          <text x="0" y="-30" font-family="'Manrope', sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">LARGE INTESTINE</text>
          <text x="0" y="-10" font-family="'Manrope', sans-serif" font-size="10" font-weight="600" fill="#d8b674" text-anchor="middle">Haustral Transit Delay</text>
        </g>
      `,
    },
  },

  // 34. Piles (Haemorrhoids)
  'piles': {
    primary: {
      subtitle: 'Internal & External Haemorrhoidal Venous Plexuses, Supporting Stroma & Vascular Engorgement',
      badge: 'PROCTOLOGY & VASCULAR ANATOMY',
      labels: [
        { x: 340, y: 310, text: 'Internal Haemorrhoidal Plexus', sub: 'Above dentate line; painless bleeding', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'External Haemorrhoidal Plexus', sub: 'Below dentate line; sensitive somatic nerves', targetX: 500, targetY: 430, align: 'left' },
        { x: 340, y: 560, text: 'Treitz Muscle Fibroelastic Laxity', sub: 'Descent of mucosal vascular cushion', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Increased Intra-Abdominal Pressure', sub: 'Chronic straining & venous hypertension', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Bright Red Rectal Bleeding', sub: 'Post-defecatory arterial-venous pooling', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Venous Toning', sub: 'Relieving engorgement & strengthening veins', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Anal Canal Cross-Section -->
          <path d="M-80,-100 L-40,80 L40,80 L80,-100 Z" fill="#1b4534" stroke="#b89047" stroke-width="2"/>
          
          <!-- Dentate (Pectinate) Line -->
          <line x1="-55" y1="0" x2="55" y2="0" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,2"/>
          <text x="0" y="-5" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Dentate Line</text>

          <!-- Internal Piles Cushions (Above Dentate) -->
          <ellipse cx="-45" cy="-35" rx="16" ry="22" fill="#8f2c2c" stroke="#d4af37" stroke-width="1.5"/>
          <ellipse cx="45" cy="-35" rx="16" ry="22" fill="#8f2c2c" stroke="#d4af37" stroke-width="1.5"/>
          <text x="-45" y="-32" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">INT</text>
          <text x="45" y="-32" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">INT</text>

          <!-- External Piles (Below Dentate) -->
          <ellipse cx="-35" cy="45" rx="14" ry="18" fill="#5c2020" stroke="#b89047" stroke-width="1.5"/>
          <ellipse cx="35" cy="45" rx="14" ry="18" fill="#5c2020" stroke="#b89047" stroke-width="1.5"/>
          <text x="-35" y="48" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">EXT</text>
          <text x="35" y="48" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">EXT</text>
        </g>
      `,
    },
  },

  // 35. Anal Fissure
  'anal-fissure': {
    primary: {
      subtitle: 'Anal Anoderm Longitudinal Linear Tear, Internal Sphincter Spasm & Ischemic Healing Delay',
      badge: 'COLORECTAL SURGICAL PATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Posterior Midline Linear Tear', sub: 'Anoderm split distal to dentate line', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Internal Anal Sphincter Hypertonicity', sub: 'Resting pressure spasm reducing blood flow', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Anoderm Ischemic Hypoperfusion', sub: 'Poor posterior commissure vascular supply', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Sharp Knife-Like Burning Pain', sub: 'Intense post-defecation muscular spasm', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Sentinel Skin Tag Formation', sub: 'Hypertrophic papilla & chronic induration', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Sphincter Relaxation', sub: 'Relieving spasm & accelerating mucosal repair', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Anal Verge Ring Profile -->
          <ellipse cx="0" cy="0" rx="110" ry="85" fill="#1a4231" stroke="#b89047" stroke-width="2.5"/>
          
          <!-- Hypertonic Internal Sphincter Muscular Ring -->
          <ellipse cx="0" cy="0" rx="75" ry="55" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,2"/>
          <text x="0" y="-35" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">SPHINCTER MUSCLE</text>

          <!-- Posterior Linear Fissure Tear (Sharp Red Line) -->
          <path d="M0,0 L0,55" stroke="#e04848" stroke-width="4.5" stroke-linecap="round"/>
          <circle cx="0" cy="55" r="7" fill="#e04848"/>
          <text x="0" y="75" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#e04848" text-anchor="middle">Fissure Tear Site</text>
        </g>
      `,
    },
  },

  // 36. Fistula Support (Anal Fistula)
  'fistula-support': {
    primary: {
      subtitle: 'Cryptoglandular Anal Intersphincteric Tract, Abscess Drainage & Perianal Fistula Anatomy',
      badge: 'COLORECTAL SURGICAL ANATOMY',
      labels: [
        { x: 340, y: 310, text: 'Crypt of Morgagni Infection', sub: 'Internal opening in anal crypt gland', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Intersphincteric Fistulous Tract', sub: 'Epithelialized tract penetrating sphincter', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'External Perianal Opening', sub: 'Cutaneous discharge of seropurulent fluid', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Goodsall\'s Rule Trajectory', sub: 'Anterior radial vs posterior curved tract', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Perianal Abscess Recurrence Risk', sub: 'Blocked external opening causing acute flare', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Drainage & Hygiene', sub: 'Promoting gentle tissue drainage & comfort', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Anal Canal Cross-Section -->
          <rect x="-90" y="-80" width="180" height="150" fill="#1b4533" stroke="#b89047" stroke-width="2" rx="4"/>
          <line x1="0" y1="-80" x2="0" y2="70" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,3"/>

          <!-- Internal Opening at Dentate Line -->
          <circle cx="0" cy="-10" r="6" fill="#d4af37"/>

          <!-- Fistulous Tract branching across sphincter to perianal skin -->
          <path d="M0,-10 C45,0 70,30 90,60" fill="none" stroke="#e04848" stroke-width="4.5" stroke-linecap="round"/>
          <circle cx="90" cy="60" r="7" fill="#e04848"/>
          
          <text x="0" y="-22" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">Internal Opening</text>
          <text x="90" y="80" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#e04848" text-anchor="middle">External Opening</text>
        </g>
      `,
    },
  },

  // 37. Gallbladder Stone Support (Cholelithiasis)
  'gallbladder-stone-support': {
    primary: {
      subtitle: 'Biliary Tree Anatomy, Cholesterol Supersaturation, Calculi & Cystic Duct Patency',
      badge: 'BILIARY HEPATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Gallbladder Fundus & Body', sub: 'Bile storage & concentration reservoir', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Cholelithiasis Calculi (Gallstones)', sub: 'Cholesterol & pigment stone aggregation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Biliary Sludge (Microlithiasis)', sub: 'Calcium bilirubinate & cholesterol crystals', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Cystic Duct & Neck Patency', sub: 'Spasm risk during post-fatty meal contraction', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Common Bile Duct (CBD)', sub: 'Clear pathway to duodenum ampulla of Vater', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Biliary Harmony', sub: 'Gentle antispasmodic & metabolic support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Gallbladder Pear-Shaped Organ Profile -->
          <path d="M-40,-80 C-80,-40 -90,40 -40,90 C-10,110 30,100 45,70 C60,40 40,-20 0,-60 L-10,-95 L-40,-80 Z" fill="#205940" stroke="#b89047" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Cystic Duct connecting upward -->
          <path d="M-10,-95 C0,-120 30,-120 40,-140" fill="none" stroke="#2d6e53" stroke-width="7"/>

          <!-- Gallstones Inside Fundus (Multiple Multifaceted Stones) -->
          <g fill="#d8b674" stroke="#ffffff" stroke-width="1.2">
            <polygon points="-25,45 -10,35 -5,55 -20,65"/>
            <polygon points="5,30 25,25 30,45 15,50"/>
            <polygon points="-10,65 10,60 15,80 -5,85"/>
            <circle cx="20" cy="65" r="9"/>
          </g>
          
          <text x="-15" y="15" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">GALLBLADDER</text>
        </g>
      `,
    },
  },

  // 38. Kidney Stone Support (Nephrolithiasis)
  'kidney-stone-support': {
    primary: {
      subtitle: 'Renal Pelvis, Calyces & Ureteric Calculi: Calcium Oxalate & Uric Acid Crystal Conglomeration',
      badge: 'NEPHROLOGY & UROLOGY',
      labels: [
        { x: 340, y: 310, text: 'Renal Calyces (Major & Minor)', sub: 'Urine collection from renal pyramids', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Renal Pelvic Calculus', sub: 'Calcium oxalate monohydrate crystal mass', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Pelvi-Ureteric Junction (PUJ)', sub: 'First anatomical physiological constriction', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Ureteric Colic Mechanism', sub: 'Hyper-peristaltic smooth muscle spasm', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Microscopic Hematuria Marker', sub: 'Urothelial mucosal abrasion from jagged edges', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Renal Flush Protocol', sub: 'Antispasmodic easing & urinary pH balance', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Kidney Bean-Shaped Silhouette -->
          <path d="M-60,-110 C0,-120 70,-80 80,0 C90,80 30,120 -40,110 C-100,100 -90,40 -60,0 C-40,-30 -80,-80 -60,-110 Z" fill="#1b4533" stroke="#b89047" stroke-width="2.5" filter="url(#organGlow)"/>
          
          <!-- Renal Pelvis Funnel & Ureter (Departing Right-Down) -->
          <path d="M-40,0 L10,0 L20,95 L0,95 L-10,0 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.2"/>

          <!-- Kidney Stone in Renal Pelvis (Jagged Calcium Oxalate) -->
          <g fill="#d8b674" stroke="#ffffff" stroke-width="1.5">
            <polygon points="-5,-8 10,-12 18,2 8,12 -8,8 -14,-2"/>
          </g>
          
          <text x="-40" y="-45" font-family="'Manrope', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">KIDNEY</text>
          <text x="5" y="28" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">Calculus</text>
        </g>
      `,
    },
  },
};

module.exports = {
  DIGESTIVE_ARTWORKS,
};
