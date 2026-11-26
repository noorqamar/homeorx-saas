/**
 * Anatomical & Clinical SVG Artworks for Skin & Hair Conditions
 */

const { escapeXml } = require('./theme');

const SKIN_HAIR_ARTWORKS = {
  // 1. Hair Loss
  'hair-loss': {
    primary: {
      subtitle: 'Follicular Miniaturization & Dermal Papilla Micro-Circulation',
      badge: 'SCALP DERMATOLOGY & TRICHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Hair Shaft Miniaturization', sub: 'Progressive diameter reduction', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Sebaceous Gland Hypertrophy', sub: 'Excess sebum & 5-alpha reductase', targetX: 500, targetY: 410, align: 'left' },
        { x: 340, y: 560, text: 'Dermal Papilla Vascularization', sub: 'Capillary perfusion to hair matrix', targetX: 540, targetY: 570, align: 'left' },
        { x: 860, y: 320, text: 'Terminal vs Vellus Hairs', sub: 'Shortened anagen growth phase', targetX: 680, targetY: 290, align: 'right' },
        { x: 860, y: 450, text: 'Perifollicular Fibrosis', sub: 'Connective tissue sheath remodeling', targetX: 690, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Vitality Link', sub: 'Nutritional & metabolic support', targetX: 660, targetY: 580, align: 'right' },
      ],
      svg: `
        <!-- Hair Follicle Miniaturization Diagram -->
        <g transform="translate(600, 420)">
          <!-- Scalp Epidermal Surface -->
          <path d="M-280,-110 C-150,-115 150,-115 280,-110 L280,180 C150,185 -150,185 -280,180 Z" fill="#133628" fill-opacity="0.4" stroke="#2a664e" stroke-width="1.5"/>
          <line x1="-280" y1="-110" x2="280" y2="-110" stroke="#c5a059" stroke-width="2.5" opacity="0.8"/>
          
          <!-- Normal Terminal Follicle (Left) -->
          <g transform="translate(-100, 0)">
            <!-- Follicular Outer Sheath -->
            <path d="M-22,-110 C-22,-30 -35,50 -35,110 C-35,150 -10,170 0,170 C10,170 35,150 35,110 C35,50 22,-30 22,-110" fill="#174533" stroke="#3b8265" stroke-width="2"/>
            <!-- Dermal Papilla Bulb -->
            <ellipse cx="0" cy="145" rx="14" ry="18" fill="#c5a059" fill-opacity="0.85"/>
            <!-- Robust Hair Shaft -->
            <path d="M-9,-110 L-9,120 C-9,130 9,130 9,120 L9,-110" fill="#2d6e53" stroke="#48a07c" stroke-width="1"/>
            <path d="M-8,-110 L-8,-200 L8,-200 L8,-110" fill="#368162"/>
            <!-- Sebaceous Gland -->
            <circle cx="-30" cy="-20" r="14" fill="#a4843f" fill-opacity="0.6"/>
            <circle cx="-38" cy="-10" r="10" fill="#c5a059" fill-opacity="0.7"/>
            <text x="0" y="200" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#c5a059" text-anchor="middle">Terminal Follicle</text>
          </g>

          <!-- Miniaturized Follicle (Right) -->
          <g transform="translate(100, 40)">
            <!-- Reduced Outer Sheath -->
            <path d="M-14,-150 C-14,-80 -22,-10 -22,40 C-22,70 -8,85 0,85 C8,85 22,70 22,40 C22,-10 14,-80 14,-150" fill="#123527" stroke="#2a664e" stroke-width="1.5" stroke-dasharray="4,2"/>
            <!-- Atrophied Bulb -->
            <ellipse cx="0" cy="70" rx="7" ry="9" fill="#c5a059" fill-opacity="0.5"/>
            <!-- Thin Vellus Shaft -->
            <path d="M-3,-150 L-3,55 C-3,60 3,60 3,55 L3,-150" fill="#20523e"/>
            <path d="M-2,-150 L-2,-190 L2,-190 L2,-150" fill="#2a664e"/>
            <text x="0" y="115" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#e0c78a" text-anchor="middle">Miniaturized Vellus</text>
          </g>

          <!-- Comparison Arrow -->
          <g transform="translate(0, 10)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#c5a059" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="0" y="-12" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#c5a059" text-anchor="middle">Progression</text>
          </g>
        </g>
      `,
    },
  },

  // 2. Alopecia Areata
  'alopecia-areata': {
    primary: {
      subtitle: 'Autoimmune Lymphocytic Follicular Infiltration & Circumscribed Alopecia',
      badge: 'AUTOIMMUNE TRICHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Exclamation Point Hairs', sub: 'Tapered, fractured proximal shafts', targetX: 510, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Peribulbar Infiltration', sub: '"Swarm of bees" T-lymphocyte cluster', targetX: 520, targetY: 480, align: 'left' },
        { x: 340, y: 560, text: 'Follicular Preservation', sub: 'Stem cells remain viable for regrowth', targetX: 530, targetY: 570, align: 'left' },
        { x: 860, y: 320, text: 'Circumscribed Alopecia Patch', sub: 'Smooth, demarcated erythematous skin', targetX: 680, targetY: 300, align: 'right' },
        { x: 860, y: 450, text: 'Immune Privilege Collapse', sub: 'Upregulation of MHC Class I & II', targetX: 670, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Immune Modulation', sub: 'Remedy harmonization of vitality', targetX: 660, targetY: 580, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Scalp Patch Oval Profile -->
          <ellipse cx="0" cy="0" rx="190" ry="140" fill="#143e2e" fill-opacity="0.5" stroke="#c5a059" stroke-width="2" stroke-dasharray="6,4"/>
          <ellipse cx="0" cy="0" rx="140" ry="95" fill="#184a37" fill-opacity="0.7"/>

          <!-- Hair Bulb under Autoimmune Attack -->
          <path d="M-20,-120 L-20,40 C-20,90 20,90 20,40 L20,-120" fill="#1c553f" stroke="#3d916d" stroke-width="2"/>
          <ellipse cx="0" cy="65" rx="22" ry="24" fill="#c5a059" fill-opacity="0.9"/>
          
          <!-- T-Lymphocyte Clusters ("Swarm of Bees") around bulb -->
          <g fill="#df7a7a" stroke="#ffffff" stroke-width="0.75" opacity="0.9">
            <circle cx="-32" cy="50" r="6"/>
            <circle cx="-25" cy="72" r="5.5"/>
            <circle cx="-38" cy="85" r="5"/>
            <circle cx="30" cy="55" r="6"/>
            <circle cx="35" cy="75" r="5"/>
            <circle cx="25" cy="90" r="5.5"/>
            <circle cx="-10" cy="100" r="5"/>
            <circle cx="8" cy="98" r="6"/>
            <circle cx="-18" cy="80" r="5"/>
            <circle cx="15" cy="82" r="5.5"/>
          </g>

          <!-- Dystrophic Exclamation Point Hair -->
          <g transform="translate(80, -30)">
            <path d="M0,-80 L2,-20 L4,0 L-4,0 L-2,-20 Z" fill="#c5a059"/>
            <circle cx="0" cy="12" r="3" fill="#df7a7a"/>
            <text x="0" y="32" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Exclamation Point</text>
          </g>
        </g>
      `,
    },
  },

  // 3. Dandruff & Scalp Concerns
  'dandruff-scalp-concerns': {
    primary: {
      subtitle: 'Stratum Corneum Desquamation & Scalp Microbiome Equilibrium',
      badge: 'SCALP DERMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Corneocyte Hyper-Proliferation', sub: 'Accelerated 10-14 day epidermal turnover', targetX: 520, targetY: 300, align: 'left' },
        { x: 340, y: 440, text: 'Lipophilic Malassezia Colonization', sub: 'Oleic acid irritant byproduct release', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Sebum Hyper-Secretion', sub: 'Sebaceous gland lipid alteration', targetX: 530, targetY: 540, align: 'left' },
        { x: 860, y: 320, text: 'Desquamating Keratin Flakes', sub: 'Clumped parakeratotic scales', targetX: 680, targetY: 270, align: 'right' },
        { x: 860, y: 450, text: 'Sub-Clinical Scalp Erythema', sub: 'Cutaneous pruritus & inflammation', targetX: 670, targetY: 440, align: 'right' },
        { x: 860, y: 580, text: 'Scalp Barrier Restoration', sub: 'Gentle pH & botanical harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Scalp Epidermal Layers -->
          <rect x="-220" y="-80" width="440" height="40" fill="#2d6e53" rx="4"/>
          <text x="-200" y="-55" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff">Stratum Corneum</text>
          
          <rect x="-220" y="-35" width="440" height="50" fill="#1d4d3a" rx="4"/>
          <text x="-200" y="-5" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#a4cabb">Stratum Spinosum</text>

          <rect x="-220" y="20" width="440" height="70" fill="#133628" rx="4"/>
          <text x="-200" y="60" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#6e9c89">Dermal Papillary Layer</text>

          <!-- Flaking Scales detaching from surface -->
          <g fill="#e4d2a3" stroke="#c5a059" stroke-width="1.2" transform="translate(0, -95)">
            <polygon points="-80,0 -40,-15 -20,-5 -50,5"/>
            <polygon points="10,-5 60,-20 80,-8 40,5"/>
            <polygon points="100,-12 150,-25 170,-10 130,2"/>
            <polygon points="-160,-8 -120,-22 -100,-10 -130,0"/>
          </g>

          <!-- Sebaceous Droplets & Microorganisms -->
          <g fill="#c5a059" opacity="0.85">
            <circle cx="-70" cy="-20" r="5"/>
            <circle cx="-55" cy="-15" r="4"/>
            <circle cx="30" cy="-22" r="5.5"/>
            <circle cx="48" cy="-18" r="4"/>
            <circle cx="110" cy="-24" r="5"/>
          </g>
        </g>
      `,
    },
  },

  // 4. Acne
  'acne': {
    primary: {
      subtitle: 'Pilosebaceous Unit Comedogenesis & Cutibacterium Follicular Inflammation',
      badge: 'CLINICAL DERMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Microcomedo Formation', sub: 'Infundibular hyperkeratinization plug', targetX: 520, targetY: 290, align: 'left' },
        { x: 340, y: 440, text: 'Cutibacterium acnes Proliferation', sub: 'Bacterial colonization in lipid sebum', targetX: 510, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Neutrophil & T-Cell Cascade', sub: 'Erythematous papulopustular reaction', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Sebum Over-Production', sub: 'Androgen-mediated sebocyte activity', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Follicular Wall Rupture Risk', sub: 'Nodulocystic dermal inflammation', targetX: 680, targetY: 470, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Drainage Protocol', sub: 'Metabolic & liver-skin clearance axis', targetX: 660, targetY: 580, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Epidermal Boundary -->
          <path d="M-220,-80 Q0,-80 220,-80 L220,130 Q0,130 -220,130 Z" fill="#143c2c" stroke="#256349" stroke-width="1.5"/>
          <line x1="-220" y1="-80" x2="-35" y2="-80" stroke="#c5a059" stroke-width="2.5"/>
          <line x1="35" y1="-80" x2="220" y2="-80" stroke="#c5a059" stroke-width="2.5"/>

          <!-- Dilated Blocked Follicular Canal -->
          <path d="M-35,-80 C-40,-40 -65,10 -55,70 C-50,110 50,110 55,70 C65,10 40,-40 35,-80" fill="#205940" stroke="#3a8d67" stroke-width="2"/>
          
          <!-- Keratin / Sebum Plug (Blackhead/Whitehead Comedone) -->
          <ellipse cx="0" cy="-70" rx="34" ry="22" fill="#d8b264" stroke="#876828" stroke-width="1.5"/>
          <circle cx="0" cy="-75" r="12" fill="#5c4416"/>

          <!-- Intrafollicular Sebum & C. acnes Pocket -->
          <path d="M-30,-30 C-45,20 45,20 30,-30 Z" fill="#e6c67a" fill-opacity="0.8"/>
          <!-- Bacteria Dots -->
          <g fill="#b93b3b">
            <circle cx="-12" cy="-10" r="3"/>
            <circle cx="0" cy="-5" r="3.5"/>
            <circle cx="15" cy="-12" r="3"/>
            <circle cx="-5" cy="5" r="3"/>
            <circle cx="8" cy="8" r="2.5"/>
          </g>

          <!-- Erythematous Dermal Halo -->
          <circle cx="0" cy="20" r="85" fill="#c24141" fill-opacity="0.18" stroke="#e05252" stroke-width="1" stroke-dasharray="4,4"/>

          <!-- Hypertrophic Sebaceous Glands -->
          <circle cx="-75" cy="0" r="24" fill="#a4843f" fill-opacity="0.7" stroke="#c5a059" stroke-width="1.5"/>
          <circle cx="75" cy="0" r="24" fill="#a4843f" fill-opacity="0.7" stroke="#c5a059" stroke-width="1.5"/>
        </g>
      `,
    },
  },

  // 5. Eczema (Atopic Dermatitis)
  'eczema': {
    primary: {
      subtitle: 'Epidermal Barrier Disruption & Trans-Epidermal Water Loss (TEWL)',
      badge: 'CUTANEOUS IMMUNOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Filaggrin & Lipid Deficiency', sub: 'Defective intercellular ceramides', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Trans-Epidermal Water Loss', sub: 'Severe barrier dehydration & fissures', targetX: 510, targetY: 410, align: 'left' },
        { x: 340, y: 560, text: 'Langerhans Cell Sensitization', sub: 'Th2 allergic cascade activation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Environmental Allergen Entry', sub: 'Dust, irritants penetrate cracked stratum', targetX: 680, targetY: 280, align: 'right' },
        { x: 860, y: 450, text: 'Cutaneous Itch-Scratch Cycle', sub: 'Pruritus-induced lichenification', targetX: 680, targetY: 440, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Moisture Restoration', sub: 'Internal vitality & allergic harmony', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Healthy Skin vs Eczematous Skin Cross-Section -->
          <!-- Healthy Barrier (Left) -->
          <g transform="translate(-110, 0)">
            <rect x="-85" y="-90" width="170" height="30" fill="#2d6e53" stroke="#48a07c" stroke-width="1.5" rx="3"/>
            <text x="0" y="-70" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Intact Lipid Matrix</text>
            <rect x="-85" y="-55" width="170" height="90" fill="#1b4b37" rx="3"/>
            <text x="0" y="0" font-family="'Manrope', sans-serif" font-size="12" font-weight="700" fill="#c5a059" text-anchor="middle">Hydrated Epidermis</text>
            <text x="0" y="60" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#78b99d" text-anchor="middle">Normal Barrier</text>
          </g>

          <!-- Eczematous Disrupted Barrier (Right) -->
          <g transform="translate(110, 0)">
            <!-- Cracked Stratum Corneum -->
            <path d="M-85,-90 L-50,-90 L-40,-75 L-30,-90 L10,-90 L20,-70 L35,-90 L85,-90 L85,-60 L-85,-60 Z" fill="#b94a4a" stroke="#e06565" stroke-width="1.5"/>
            <text x="0" y="-105" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ff9b9b" text-anchor="middle">Fissured Stratum Corneum</text>
            
            <rect x="-85" y="-55" width="170" height="90" fill="#2d1c1c" stroke="#b94a4a" stroke-width="1" rx="3"/>
            
            <!-- Water Loss Arrows going up -->
            <g stroke="#61b7cf" stroke-width="2" marker-end="url(#arrow)">
              <line x1="-30" y1="-20" x2="-30" y2="-65"/>
              <line x1="20" y1="-20" x2="20" y2="-65"/>
            </g>
            <text x="0" y="0" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#61b7cf" text-anchor="middle">TEWL (Water Loss)</text>
            
            <!-- Allergen Penetration Arrows going down -->
            <g stroke="#dfa33b" stroke-width="1.5" stroke-dasharray="3,2">
              <line x1="-50" y1="-85" x2="-45" y2="-45"/>
              <line x1="40" y1="-85" x2="35" y2="-45"/>
            </g>
            <text x="0" y="60" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#df7a7a" text-anchor="middle">Eczematous Inflammation</text>
          </g>
        </g>
      `,
    },
  },

  // 6. Psoriasis
  'psoriasis': {
    primary: {
      subtitle: 'Epidermal Hyperkeratosis, Munro Microabscesses & Dermal Papillary Elongation',
      badge: 'CHRONIC DERMATOPATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Silvery Micaceous Scale', sub: 'Parakeratotic stratum corneum plaques', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Munro Microabscesses', sub: 'Neutrophils trapped in upper epidermis', targetX: 510, targetY: 410, align: 'left' },
        { x: 340, y: 560, text: 'Acanthosis & Rete Ridges', sub: 'Clubbed epidermal elongation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Accelerated 3-Day Turnover', sub: 'Keratinocyte proliferation overdrive', targetX: 680, targetY: 290, align: 'right' },
        { x: 860, y: 450, text: 'Auspitz Sign Mechanism', sub: 'Dilated tortuous papillary capillaries', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Psoriasis Protocol', sub: 'Cellular regulation & nervous calm', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Thick Silvery Plaque Top Layer -->
          <path d="M-200,-100 Q-100,-120 0,-105 Q100,-120 200,-100 L200,-70 Q100,-85 0,-75 Q-100,-85 -200,-70 Z" fill="#d9d9d9" stroke="#ffffff" stroke-width="2"/>
          <text x="0" y="-85" font-family="'Manrope', sans-serif" font-size="12" font-weight="800" fill="#143e2e" text-anchor="middle">SILVERY MICACEOUS SCALE</text>

          <!-- Elongated Club-Shaped Rete Pegs (Acanthosis) -->
          <path d="M-200,-70 C-180,-10 -180,60 -160,60 C-140,60 -140,-40 -120,-40 C-100,-40 -100,70 -80,70 C-60,70 -60,-35 -40,-35 C-20,-35 -20,80 0,80 C20,80 20,-35 40,-35 C60,-35 60,70 80,70 C100,70 100,-40 120,-40 C140,-40 140,60 160,60 C180,60 180,-10 200,-70 L200,120 L-200,120 Z" fill="#1e523e" stroke="#3b8265" stroke-width="1.5"/>

          <!-- Tortuous Dilated Capillaries in Dermal Papillae (Auspitz Bleeding Points) -->
          <g stroke="#d63a3a" stroke-width="2.5" fill="none">
            <path d="M-120,110 C-120,40 -125,-10 -120,-30 C-115,-10 -120,40 -120,110"/>
            <path d="M-40,110 C-40,30 -45,-5 -40,-25 C-35,-5 -40,30 -40,110"/>
            <path d="M40,110 C40,30 35,-5 40,-25 C45,-5 40,30 40,110"/>
            <path d="M120,110 C120,40 115,-10 120,-30 C125,-10 120,40 120,110"/>
          </g>

          <!-- Munro Microabscesses (Neutrophil Pockets) -->
          <g fill="#c5a059" stroke="#ffffff" stroke-width="0.5">
            <circle cx="-60" cy="-65" r="4.5"/>
            <circle cx="20" cy="-68" r="5"/>
            <circle cx="100" cy="-64" r="4.5"/>
          </g>
        </g>
      `,
    },
  },

  // 7. Skin Allergy (Urticaria)
  'skin-allergy': {
    primary: {
      subtitle: 'Mast Cell Degranulation, Histamine Release & Wheal-and-Flare Vascular Reaction',
      badge: 'ALLERGIC IMMUNOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Cutaneous Wheal & Flare', sub: 'Dermal edema with surrounding erythema', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Mast Cell Degranulation', sub: 'Cross-linked IgE triggers chemical release', targetX: 500, targetY: 430, align: 'left' },
        { x: 340, y: 560, text: 'Histamine Granule Influx', sub: 'H1 receptor mediated pruritus', targetX: 530, targetY: 540, align: 'left' },
        { x: 860, y: 320, text: 'Microvascular Permeability', sub: 'Endothelial gap dilation & plasma leak', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Sensory Nerve Stimulation', sub: 'Intense burning & stinging sensation', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Desensitization', sub: 'Restoring hyper-reactive mast cell balance', targetX: 660, targetY: 580, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Mast Cell Body -->
          <ellipse cx="0" cy="20" rx="95" ry="85" fill="#184b37" stroke="#c5a059" stroke-width="2.5" filter="url(#organGlow)"/>
          <text x="0" y="25" font-family="'Manrope', sans-serif" font-size="12" font-weight="800" fill="#c5a059" text-anchor="middle">MAST CELL</text>

          <!-- Granules being expelled (Histamine, Leukotrienes, Bradykinin) -->
          <g fill="#e05252" stroke="#ffffff" stroke-width="0.75">
            <!-- Internal granules -->
            <circle cx="-40" cy="-20" r="7"/>
            <circle cx="-20" cy="-35" r="6"/>
            <circle cx="30" cy="-25" r="7.5"/>
            <circle cx="-50" cy="25" r="6.5"/>
            <circle cx="45" cy="30" r="7"/>
            <circle cx="20" cy="50" r="6"/>
            
            <!-- Degranulating Granules Flying Out -->
            <circle cx="-110" cy="-40" r="6.5"/>
            <circle cx="-135" cy="-15" r="6"/>
            <circle cx="-120" cy="40" r="7"/>
            <circle cx="115" cy="-30" r="6.5"/>
            <circle cx="130" cy="15" r="7"/>
            <circle cx="110" cy="55" r="6"/>
          </g>

          <!-- IgE Y-Shaped Receptors on Membrane -->
          <g stroke="#ffffff" stroke-width="2" fill="none">
            <path d="M-80,-40 L-95,-55 M-95,-55 L-105,-60 M-95,-55 L-95,-70"/>
            <path d="M0,-65 L0,-85 M0,-85 L-12,-95 M0,-85 L12,-95"/>
            <path d="M80,-40 L95,-55 M95,-55 L95,-70 M95,-55 L105,-60"/>
          </g>
        </g>
      `,
    },
  },

  // 8. Lichen Planus
  'lichen-planus': {
    primary: {
      subtitle: 'Band-Like Lymphocytic Infiltrate, Civatte Bodies & Saw-Tooth Rete Ridges',
      badge: 'CHRONIC DERMATOPATHOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Polygonal Violaceous Papules', sub: 'Flat-topped, shiny purple lesions', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Wickham\'s Striae Network', sub: 'Fine reticular whitish mucosal network', targetX: 500, targetY: 380, align: 'left' },
        { x: 340, y: 560, text: 'Band-Like T-Cell Infiltrate', sub: 'Dense dermal-epidermal junction swarm', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Saw-Tooth Rete Ridges', sub: 'Pointed basal epithelial atrophy', targetX: 680, targetY: 340, align: 'right' },
        { x: 860, y: 450, text: 'Civatte / Colloid Bodies', sub: 'Apoptotic necrotic basal keratinocytes', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Epithelial Repair', sub: 'Gentle dilution for mucocutaneous health', targetX: 660, targetY: 580, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Stratum Corneum & Hypergranulosis with Wickham's Striae -->
          <path d="M-200,-90 L200,-90 L200,-60 L-200,-60 Z" fill="#6a3575" fill-opacity="0.7" stroke="#b269c2" stroke-width="1.5"/>
          <text x="0" y="-72" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">Hypergranulosis &amp; Wickham's Striae</text>

          <!-- Saw-Tooth Rete Ridges -->
          <path d="M-200,-60 L-160,20 L-120,-40 L-80,30 L-40,-35 L0,35 L40,-35 L80,30 L120,-40 L160,20 L200,-60 L200,110 L-200,110 Z" fill="#194835" stroke="#358b66" stroke-width="1.5"/>

          <!-- Colloid (Civatte) Bodies at dermal-epidermal junction -->
          <g fill="#d877d8" stroke="#ffffff" stroke-width="0.75">
            <circle cx="-140" cy="-10" r="5"/>
            <circle cx="-60" cy="0" r="6"/>
            <circle cx="20" cy="5" r="5.5"/>
            <circle cx="100" cy="-5" r="5"/>
          </g>

          <!-- Dense Band-Like Lymphocytic Infiltrate (T-Cells) -->
          <g fill="#905fb5" opacity="0.85">
            <circle cx="-180" cy="50" r="3.5"/><circle cx="-160" cy="65" r="4"/><circle cx="-140" cy="55" r="3.5"/>
            <circle cx="-100" cy="60" r="4"/><circle cx="-80" cy="75" r="3.5"/><circle cx="-60" cy="60" r="4"/>
            <circle cx="-20" cy="70" r="3.5"/><circle cx="0" cy="80" r="4"/><circle cx="20" cy="65" r="3.5"/>
            <circle cx="60" cy="70" r="4"/><circle cx="80" cy="80" r="3.5"/><circle cx="100" cy="65" r="4"/>
            <circle cx="140" cy="60" r="3.5"/><circle cx="160" cy="75" r="4"/><circle cx="180" cy="65" r="3.5"/>
          </g>
          <text x="0" y="98" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#d9b6ed" text-anchor="middle">Dense Band-Like T-Cell Infiltrate</text>
        </g>
      `,
    },
  },

  // 9. Vitiligo
  'vitiligo': {
    primary: {
      subtitle: 'Epidermal Melanocyte Depletion & Delineated Amelanotic Macules',
      badge: 'PIGMENTARY DERMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Complete Melanocyte Absence', sub: 'Autoimmune destruction in basal layer', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Delineated Amelanotic Margin', sub: 'Chalk-white macule demarcation', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Oxidative Stress in Keratinocytes', sub: 'Free radical lipid peroxidation', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Normal Pigmented Skin', sub: 'Active dendritic melanocytes & melanin', targetX: 680, targetY: 280, align: 'right' },
        { x: 860, y: 450, text: 'Perifollicular Pigment Reservoir', sub: 'Hair follicle stem cells for repigmentation', targetX: 680, targetY: 460, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Melanocyte Support', sub: 'Internal vitality & immune modulation', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Contrast Boundary: Pigmented Skin (Left) vs Amelanotic Vitiligo Skin (Right) -->
          <!-- Pigmented Side -->
          <rect x="-220" y="-80" width="220" height="150" fill="#2d523f" rx="4"/>
          <!-- Active Melanin Granules in Basal Layer -->
          <g fill="#936d38">
            <circle cx="-190" cy="-40" r="4"/><circle cx="-160" cy="-35" r="4.5"/><circle cx="-130" cy="-42" r="4"/>
            <circle cx="-100" cy="-38" r="4.5"/><circle cx="-70" cy="-40" r="4"/><circle cx="-40" cy="-36" r="4.5"/>
          </g>
          <text x="-110" y="20" font-family="'Manrope', sans-serif" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">Normal Pigmented Skin</text>
          <text x="-110" y="42" font-family="'Manrope', sans-serif" font-size="10" font-weight="500" fill="#c5a059" text-anchor="middle">Active Basal Melanin</text>

          <!-- Demarcated Vitiligo Side (Chalk White Depigmented) -->
          <rect x="0" y="-80" width="220" height="150" fill="#fcfbf7" fill-opacity="0.88" rx="4"/>
          <text x="110" y="20" font-family="'Manrope', sans-serif" font-size="13" font-weight="700" fill="#143e2e" text-anchor="middle">Vitiligo Macule</text>
          <text x="110" y="42" font-family="'Manrope', sans-serif" font-size="10" font-weight="600" fill="#993d3d" text-anchor="middle">0% Melanocyte Activity</text>

          <!-- Clear Dividing Margin -->
          <line x1="0" y1="-80" x2="0" y2="70" stroke="#c5a059" stroke-width="3" stroke-dasharray="6,4"/>
        </g>
      `,
    },
  },

  // 10. Hyperpigmentation / Melasma
  'hyperpigmentation-melasma': {
    primary: {
      subtitle: 'Melanosome Transfer Hyper-Activity & Centrofacial Melanin Deposition',
      badge: 'PIGMENTARY DERMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Melanocyte Hyper-Activity', sub: 'UV & hormonal estrogen/progesterone trigger', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Epidermal & Dermal Melanin', sub: 'Excessive pigment in basal & suprabasal cells', targetX: 510, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Solar Elastosis Link', sub: 'Underlying photo-damaged dermal matrix', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Malar & Centrofacial Pattern', sub: 'Symmetrical butterfly pigment distribution', targetX: 680, targetY: 280, align: 'right' },
        { x: 860, y: 450, text: 'Melanosome Transfer Rate', sub: 'Dendritic transfer to adjacent keratinocytes', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Pigment Harmony', sub: 'Internal endocrine & cutaneous clearance', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Dendritic Melanocyte transferring Melanin to Keratinocytes -->
          <path d="M0,40 C-30,40 -60,0 -80,-30 M0,40 C-10,0 -20,-50 -25,-80 M0,40 C10,0 20,-50 25,-80 M0,40 C30,40 60,0 80,-30" stroke="#c5a059" stroke-width="4" stroke-linecap="round" fill="none"/>
          
          <!-- Melanocyte Soma -->
          <ellipse cx="0" cy="55" rx="35" ry="25" fill="#8f6d2f" stroke="#c5a059" stroke-width="2"/>
          <text x="0" y="60" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Melanocyte</text>

          <!-- Melanin Granules being transferred upward -->
          <g fill="#422e11" stroke="#ffffff" stroke-width="0.5">
            <circle cx="-65" cy="-20" r="4"/><circle cx="-75" cy="-35" r="4.5"/>
            <circle cx="-20" cy="-65" r="4.5"/><circle cx="-25" cy="-85" r="4"/>
            <circle cx="20" cy="-65" r="4.5"/><circle cx="25" cy="-85" r="4"/>
            <circle cx="65" cy="-20" r="4"/><circle cx="75" cy="-35" r="4.5"/>
          </g>

          <!-- Surrounding Keratinocytes absorbing melanin -->
          <g stroke="#35785a" stroke-width="1.2" fill="#174533" opacity="0.6">
            <rect x="-140" y="-100" width="50" height="40" rx="4"/>
            <rect x="-80" y="-100" width="50" height="40" rx="4"/>
            <rect x="30" y="-100" width="50" height="40" rx="4"/>
            <rect x="90" y="-100" width="50" height="40" rx="4"/>
          </g>
        </g>
      `,
    },
  },

  // 11. Sun Allergy (PMLE)
  'sun-allergy': {
    primary: {
      subtitle: 'Polymorphous Light Eruption (PMLE) & Delayed-Type Solar Hypersensitivity',
      badge: 'PHOTODERMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'UVA / UVB Photosensitivity', sub: 'Photoneoantigen formation in dermal cells', targetX: 520, targetY: 280, align: 'left' },
        { x: 340, y: 440, text: 'Perivascular T-Cell Infiltration', sub: 'CD4+ Th1 delayed-type hypersensitivity', targetX: 510, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Pruritic Papulovesicles', sub: 'Erythematous itchy bumps on exposed skin', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Hardening Phenomenon Absence', sub: 'Failure of endogenous solar tolerance', targetX: 680, targetY: 280, align: 'right' },
        { x: 860, y: 450, text: 'Dermal Papillary Edema', sub: 'Localized swelling & vascular reactivity', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Solar Tolerance', sub: 'Gentle desensitization for outdoor ease', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- UV Rays penetrating Epidermis -->
          <g stroke="#e2b44d" stroke-width="2" stroke-dasharray="4,4">
            <line x1="-120" y1="-120" x2="-80" y2="-40"/>
            <line x1="-40" y1="-130" x2="-20" y2="-40"/>
            <line x1="40" y1="-130" x2="20" y2="-40"/>
            <line x1="120" y1="-120" x2="80" y2="-40"/>
          </g>
          <text x="0" y="-120" font-family="'Manrope', sans-serif" font-size="12" font-weight="800" fill="#f7cd6d" text-anchor="middle">UVA / UVB SOLAR IRRADIATION</text>

          <!-- Skin Layer with Papular Flare Reaction -->
          <rect x="-200" y="-40" width="400" height="120" fill="#1b4937" stroke="#2f785b" stroke-width="1.5" rx="4"/>
          
          <!-- Erythematous Papules / Bumps -->
          <g fill="#c94444" stroke="#ffffff" stroke-width="1">
            <ellipse cx="-80" cy="-40" rx="18" ry="12"/>
            <ellipse cx="-20" cy="-42" rx="22" ry="14"/>
            <ellipse cx="40" cy="-40" rx="16" ry="11"/>
            <ellipse cx="95" cy="-41" rx="20" ry="13"/>
          </g>
          <text x="0" y="30" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">Photodistributed Pruritic Papules</text>
        </g>
      `,
    },
  },
};

module.exports = {
  SKIN_HAIR_ARTWORKS,
};
