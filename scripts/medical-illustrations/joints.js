/**
 * Anatomical & Clinical SVG Artworks for Joint, Spine & Vascular Conditions
 */

const { escapeXml } = require('./theme');

const JOINTS_ARTWORKS = {
  // 47. Arthritis
  'arthritis': {
    primary: {
      subtitle: 'Synovial Joint Architecture, Cartilage Fibrillation & Joint Space Narrowing',
      badge: 'RHEUMATOLOGY & ORTHOPAEDICS',
      labels: [
        { x: 340, y: 310, text: 'Articular Hyaline Cartilage', sub: 'Chondrocyte matrix loss & surface erosion', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Synovial Membrane Effusion', sub: 'Vascular congestion & inflammatory fluid', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Subchondral Bone Sclerosis', sub: 'Micro-fractures & reactive cortical thickening', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Joint Space Narrowing', sub: 'Radiological loss of cartilage cushion', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Capsular Fibrosis & Stiffness', sub: 'Loss of range of motion on cold damp days', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Joint Comfort', sub: 'Gentle mobility & systemic anti-inflammatory support', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Upper Bone (Femur Head) -->
          <path d="M-50,-130 L-50,-40 C-50,-10 -90,0 -80,10 C-70,20 -10,25 0,25 C10,25 70,20 80,10 C90,0 50,-10 50,-40 L50,-130 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          
          <!-- Eroded Articular Cartilage on Upper Bone -->
          <path d="M-75,10 C-40,22 40,22 75,10" fill="none" stroke="#e07272" stroke-width="6"/>

          <!-- Joint Space / Synovial Cavity Gap -->
          <ellipse cx="0" cy="20" rx="95" ry="12" fill="#122b20" stroke="#ffffff" stroke-width="1" stroke-dasharray="3,3"/>

          <!-- Lower Bone (Tibia Plateau) -->
          <path d="M-80,30 C-60,20 60,20 80,30 C90,40 50,50 50,80 L50,130 L-50,130 L-50,80 C-50,50 -90,40 -80,30 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          <!-- Cartilage on Lower Bone -->
          <path d="M-75,30 C-40,22 40,22 75,30" fill="none" stroke="#e07272" stroke-width="6"/>
          
          <text x="0" y="24" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">JOINT SPACE</text>
        </g>
      `,
    },
  },

  // 48. Rheumatoid Arthritis Support
  'rheumatoid-arthritis-support': {
    primary: {
      subtitle: 'Autoimmune Synovial Pannus Formation, Symmetric Polyarthritis & Marginal Bone Erosion',
      badge: 'AUTOIMMUNE RHEUMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Hyperplastic Synovial Pannus', sub: 'Aggressive fibrovascular tissue invasion', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Marginal Bare Area Erosions', sub: 'Osteoclastic pit activation by RANKL', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Morning Stiffness (>1 Hour)', sub: 'Inflammatory stasis relieved by gentle motion', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Symmetric Small Joint Target', sub: 'MCP and PIP joints of hands & wrists', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Rheumatoid Factor & Anti-CCP', sub: 'Systemic autoimmune circulating complexes', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Immune Harmony', sub: 'Restoring systemic vitality without suppression', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Hand MCP Joint Model -->
          <path d="M-35,-110 L-35,-20 C-35,0 -65,10 -55,20 C-45,30 -10,35 0,35 C10,35 45,30 55,20 C65,10 35,0 35,-20 L35,-110 Z" fill="#173a2c" stroke="#d4af37" stroke-width="2"/>
          <path d="M-55,40 C-35,30 35,30 55,40 C65,50 35,60 35,90 L35,130 L-35,130 L-35,90 C-35,60 -65,50 -55,40 Z" fill="#173a2c" stroke="#d4af37" stroke-width="2"/>

          <!-- Inflamed Synovial Pannus invading cartilage (Deep Red/Purple) -->
          <ellipse cx="-60" cy="30" rx="22" ry="18" fill="#b93b3b" stroke="#ffffff" stroke-width="1.5"/>
          <ellipse cx="60" cy="30" rx="22" ry="18" fill="#b93b3b" stroke="#ffffff" stroke-width="1.5"/>

          <text x="-60" y="34" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">Pannus</text>
          <text x="60" y="34" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#ffffff" text-anchor="middle">Pannus</text>
          <text x="0" y="33" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">Bone Erosion</text>
        </g>
      `,
    },
  },

  // 49. Osteoarthritis Support
  'osteoarthritis-support': {
    primary: {
      subtitle: 'Degenerative Cartilage Wear, Marginal Osteophyte Spurring & Subchondral Sclerosis',
      badge: 'DEGENERATIVE ORTHOPAEDICS',
      labels: [
        { x: 340, y: 310, text: 'Articular Cartilage Thinning', sub: 'Mechanical wear-and-tear of weight-bearing joint', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Marginal Osteophytes (Bone Spurs)', sub: 'Reparative bone proliferation at joint edge', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Subchondral Bone Cysts & Sclerosis', sub: 'Eburnation due to bone-on-bone friction', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Asymmetric Knee / Hip Compartment', sub: 'Medial compartment joint space collapse', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Crepitus & Load-Bearing Pain', sub: 'Stair climbing & post-inactivity gel phenomenon', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Joint Preservation', sub: 'Nourishing mobility & easing mechanical discomfort', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Knee Joint Medial vs Lateral Compartment -->
          <g transform="translate(0, 0)">
            <!-- Femoral Condyles with Osteophyte Spurs on Edges -->
            <path d="M-90,15 C-95,12 -98,5 -95,-10 L-60,-20 L-50,-120 L50,-120 L60,-20 L95,-10 C98,5 95,12 90,15 C70,18 40,25 0,22 C-40,25 -70,18 -90,15 Z" fill="#1d4837" stroke="#d4af37" stroke-width="2"/>
            
            <!-- Bone Spur Pointing Out (Osteophyte) -->
            <polygon points="-90,15 -115,22 -92,8" fill="#d4af37" stroke="#ffffff" stroke-width="1"/>
            <polygon points="90,15 115,22 92,8" fill="#d4af37" stroke="#ffffff" stroke-width="1"/>

            <!-- Tibial Plateau (Bottom) with Bone-on-Bone Contact on Medial Side -->
            <path d="M-85,32 C-60,25 60,25 85,32 C95,45 60,60 50,120 L-50,120 C-60,60 -95,45 -85,32 Z" fill="#1d4837" stroke="#d4af37" stroke-width="2"/>

            <!-- Narrowed Joint Space (Bone on Bone) -->
            <ellipse cx="-40" cy="27" rx="30" ry="4" fill="#a83232"/>
            <text x="-115" y="42" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">Osteophyte</text>
            <text x="115" y="42" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">Osteophyte</text>
          </g>
        </g>
      `,
    },
  },

  // 50. Ankylosing Spondylitis Support
  'ankylosing-spondylitis-support': {
    primary: {
      subtitle: 'Axial Spine Enthesitis, Sacroiliac Joint Erosion & Bamboo Spine Syndesmophyte Bridging',
      badge: 'SPINAL RHEUMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'Sacroiliitis Symmetrical Blurring', sub: 'Pseudowidening followed by joint ankylosis', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Enthesitis at Tendon Insertions', sub: 'Inflammation where annulus fibrosus attaches', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Vertebral Body Squaring', sub: 'Romanus lesion erosion of anterior corners', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Syndesmophyte Bony Bridging', sub: 'Vertical calcification of spinal ligaments', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Nocturnal Inflammatory Back Pain', sub: 'Pain waking patient in 2nd half of night', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Spinal Flexibility', sub: 'Nourishing vitality & preserving posture', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Vertebral Column Segment (3 Vertebrae with Syndesmophyte Bridges) -->
          <!-- Vertebra 1 -->
          <rect x="-60" y="-110" width="120" height="45" fill="#1b4534" stroke="#d4af37" stroke-width="2" rx="4"/>
          <!-- Disc 1 with Lateral Bony Bridges -->
          <rect x="-55" y="-65" width="110" height="20" fill="#2d6e53" stroke="#ffffff" stroke-width="1"/>
          <!-- Syndesmophyte Bridges on Both Sides -->
          <path d="M-60,-80 L-68,-55 L-60,-30" fill="none" stroke="#d4af37" stroke-width="4"/>
          <path d="M60,-80 L68,-55 L60,-30" fill="none" stroke="#d4af37" stroke-width="4"/>

          <!-- Vertebra 2 -->
          <rect x="-60" y="-45" width="120" height="45" fill="#1b4534" stroke="#d4af37" stroke-width="2" rx="4"/>
          <!-- Disc 2 with Lateral Bony Bridges -->
          <rect x="-55" y="0" width="110" height="20" fill="#2d6e53" stroke="#ffffff" stroke-width="1"/>
          <path d="M-60,-15 L-68,10 L-60,35" fill="none" stroke="#d4af37" stroke-width="4"/>
          <path d="M60,-15 L68,10 L60,35" fill="none" stroke="#d4af37" stroke-width="4"/>

          <!-- Vertebra 3 -->
          <rect x="-60" y="20" width="120" height="45" fill="#1b4534" stroke="#d4af37" stroke-width="2" rx="4"/>
          <text x="0" y="48" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">Lumbar Vertebra</text>
        </g>
      `,
    },
  },

  // 51. Sciatica
  'sciatica': {
    primary: {
      subtitle: 'Lumbar Nerve Root Impingement (L4-S1), Sciatic Foramen Pathway & Radiculopathy',
      badge: 'SPINAL NEUROLOGY',
      labels: [
        { x: 340, y: 310, text: 'L4-L5 / L5-S1 Disc Protrusion', sub: 'Posterolateral herniation pressing nerve root', targetX: 520, targetY: 310, align: 'left' },
        { x: 340, y: 440, text: 'Sciatic Nerve Trunk (N. Ischiadicus)', sub: 'Largest human nerve exiting greater sciatic notch', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Piriformis Muscular Compression', sub: 'Piriformis syndrome secondary nerve entrapment', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Shooting Dermatomal Radiculopathy', sub: 'Electric lancinating pain down posterior thigh', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Foot Numbness / Paresthesia', sub: 'L5 lateral calf / S1 sole sensory deficit', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Neuralgic Relief', sub: 'Decompressing inflammation & restoring nerve ease', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Pelvis & Lumbar Spine (Top) -->
          <rect x="-50" y="-120" width="100" height="35" fill="#1c4837" stroke="#d4af37" stroke-width="2" rx="4"/>
          <text x="0" y="-98" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">L5 Vertebra</text>

          <rect x="-50" y="-80" width="100" height="35" fill="#1c4837" stroke="#d4af37" stroke-width="2" rx="4"/>
          <text x="0" y="-58" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">S1 Sacrum</text>

          <!-- Disc Herniation Bulge (Red) -->
          <ellipse cx="45" cy="-82" rx="14" ry="10" fill="#d63a3a"/>

          <!-- Sciatic Nerve Pathway Traveling Down through Gluteal to Leg (Bright Yellow/Gold Line) -->
          <path d="M45,-82 C55,-30 65,20 50,70 C40,100 45,130 50,160" fill="none" stroke="#d4af37" stroke-width="5" stroke-linecap="round"/>
          <path d="M45,-82 C55,-30 65,20 50,70 C40,100 45,130 50,160" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3"/>

          <!-- Piriformis Muscle crossing nerve -->
          <path d="M-40,-10 L80,-30" stroke="#7a3f3f" stroke-width="14" opacity="0.6"/>
          <text x="-30" y="-18" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff">Piriformis</text>
        </g>
      `,
    },
  },

  // 52. Low Back Pain
  'low-back-pain': {
    primary: {
      subtitle: 'Lumbar Spine Biomechanics, Annulus Fibrosus Integrity & Facet Joint Strain',
      badge: 'SPINAL ORTHOPAEDICS',
      labels: [
        { x: 340, y: 310, text: 'Intervertebral Disc Nucleus Pulposus', sub: 'Hydrated gelatinous shock absorber cushion', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Lumbar Facet (Z-Joint) Articulation', sub: 'Synovial facet capsule strain & arthropathy', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Paravertebral Muscle Spasm', sub: 'Erector spinae protective splinting reflex', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Mechanical Axial Load Distribution', sub: 'L4-L5 lumbar lordosis curvature biomechanics', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Postural Strain & Ergonomic Deficit', sub: 'Prolonged sitting & forward flexion fatigue', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Musculoskeletal Easing', sub: 'Soothing lumbar stiffness & muscular ache', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Sagittal View of 2 Lumbar Vertebrae with Intervertebral Disc -->
          <!-- Upper Vertebra -->
          <path d="M-70,-110 L40,-110 L60,-70 L-50,-70 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          <text x="-10" y="-85" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">L4 Vertebral Body</text>

          <!-- Intervertebral Disc with Annulus & Nucleus -->
          <path d="M-65,-65 L45,-65 L55,-35 L-55,-35 Z" fill="#2d6e53" stroke="#ffffff" stroke-width="1.5"/>
          <ellipse cx="-5" cy="-50" rx="28" ry="8" fill="#d4af37"/>
          <text x="-5" y="-47" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#143e2e" text-anchor="middle">Nucleus Pulposus</text>

          <!-- Lower Vertebra -->
          <path d="M-60,-30 L50,-30 L70,10 L-40,10 Z" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          <text x="0" y="-5" font-family="'Manrope', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">L5 Vertebral Body</text>

          <!-- Facet Joint Line on Posterior Side -->
          <circle cx="65" cy="-50" r="10" fill="#a4843f" stroke="#ffffff" stroke-width="1.5"/>
          <text x="95" y="-46" font-family="'Manrope', sans-serif" font-size="9" font-weight="700" fill="#ffffff">Facet Joint</text>
        </g>
      `,
    },
  },

  // 53. Gout & High Uric Acid
  'gout-high-uric-acid': {
    primary: {
      subtitle: 'Monosodium Urate (MSU) Birefringent Needle Crystals, 1st MTP Joint Podagra & Tophus',
      badge: 'METABOLIC RHEUMATOLOGY',
      labels: [
        { x: 340, y: 310, text: 'First MTP Big Toe Joint (Podagra)', sub: 'Peripheral low-temperature crystal precipitation', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Monosodium Urate (MSU) Needles', sub: 'Negatively birefringent needle crystals', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'NLRP3 Inflammasome Cascade', sub: 'Neutrophil phagocytosis & interleukin-1beta', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Hyperuricemia Saturation (>6.8 mg/dL)', sub: 'Renal under-excretion vs purine overproduction', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Erythematous Tense Shiny Skin', sub: 'Extreme hypersensitivity even to bedsheet touch', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Uric Acid Metabolic Balance', sub: 'Gentle renal drainage & joint calm', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Big Toe First MTP Joint Cross-Section -->
          <ellipse cx="0" cy="0" rx="120" ry="85" fill="#1b4534" stroke="#d4af37" stroke-width="2"/>
          
          <!-- Intense Red Erythematous Flare Halo -->
          <circle cx="0" cy="0" r="65" fill="#c93838" fill-opacity="0.35" stroke="#e04848" stroke-width="2"/>

          <!-- Sharp Needle-Like Monosodium Urate (MSU) Crystals -->
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="-30" y1="-25" x2="30" y2="25"/>
            <line x1="-25" y1="20" x2="35" y2="-20"/>
            <line x1="-40" y1="0" x2="40" y2="0"/>
            <line x1="0" y1="-35" x2="0" y2="35"/>
            <line x1="-15" y1="-30" x2="15" y2="30"/>
            <line x1="20" y1="-25" x2="-20" y2="25"/>
          </g>
          <text x="0" y="50" font-family="'Manrope', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">MSU Needle Crystals (Podagra)</text>
        </g>
      `,
    },
  },

  // 54. Varicose Veins
  'varicose-veins': {
    primary: {
      subtitle: 'Saphenofemoral Incompetence, Venous Reflux Pooling & Tortuous Superficial Veins',
      badge: 'PHLEBOLOGY & VASCULAR SURGERY',
      labels: [
        { x: 340, y: 310, text: 'Incompetent Bicuspid Venous Valve', sub: 'Failure of valve cusps to coapt under load', targetX: 520, targetY: 340, align: 'left' },
        { x: 340, y: 440, text: 'Retrograde Hydrostatic Pooling', sub: 'High ambulatory venous pressure in calf', targetX: 500, targetY: 420, align: 'left' },
        { x: 340, y: 560, text: 'Elastin Degradation in Vein Wall', sub: 'Medial smooth muscle atrophy & tortuosity', targetX: 530, targetY: 530, align: 'left' },
        { x: 860, y: 320, text: 'Great Saphenous Vein (GSV) Reflux', sub: 'Superficial dilated serpentine leg bulging', targetX: 680, targetY: 320, align: 'right' },
        { x: 860, y: 450, text: 'Stasis Hyperpigmentation / Eczema', sub: 'Hemosiderin deposition from extravasated RBCs', targetX: 680, targetY: 450, align: 'right' },
        { x: 860, y: 580, text: 'Constitutional Vascular Toning', sub: 'Strengthening venous elasticity & relieving aching', targetX: 660, targetY: 570, align: 'right' },
      ],
      svg: `
        <g transform="translate(600, 420)">
          <!-- Normal Competent Valve (Left) vs Incompetent Varicose Valve (Right) -->
          <g transform="translate(-100, 0)">
            <!-- Straight Vein Walls -->
            <line x1="-30" y1="-120" x2="-30" y2="100" stroke="#2d6e53" stroke-width="4"/>
            <line x1="30" y1="-120" x2="30" y2="100" stroke="#2d6e53" stroke-width="4"/>
            <!-- Competent Valve Cusps Closed Upward Preventing Backflow -->
            <path d="M-30,-10 C-15,-10 -5,15 0,25 C5,15 15,-10 30,-10" fill="none" stroke="#d4af37" stroke-width="3"/>
            <text x="0" y="60" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#a4cebc" text-anchor="middle">Normal Valve</text>
            <text x="0" y="80" font-family="'Manrope', sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">No Reflux</text>
          </g>

          <g transform="translate(100, 0)">
            <!-- Dilated Tortuous Sinuous Vein Walls -->
            <path d="M-40,-120 C-60,-70 -30,-30 -55,20 C-75,70 -40,100 -40,100" fill="none" stroke="#b93b3b" stroke-width="5"/>
            <path d="M40,-120 C20,-70 50,-30 25,20 C5,70 40,100 40,100" fill="none" stroke="#b93b3b" stroke-width="5"/>
            
            <!-- Incompetent Gap between Cusps (Allowing Reflux Down) -->
            <path d="M-45,-20 C-30,-20 -25,-5 -20,10" fill="none" stroke="#d4af37" stroke-width="3"/>
            <path d="M45,-20 C30,-20 25,-5 20,10" fill="none" stroke="#d4af37" stroke-width="3"/>
            
            <!-- Reflux Arrows Downward -->
            <g stroke="#ffffff" stroke-width="2" stroke-dasharray="3,2">
              <line x1="0" y1="-30" x2="0" y2="30"/>
            </g>
            <text x="0" y="60" font-family="'Manrope', sans-serif" font-size="10" font-weight="700" fill="#e07272" text-anchor="middle">Incompetent Valve</text>
            <text x="0" y="80" font-family="'Manrope', sans-serif" font-size="8" fill="#ffffff" text-anchor="middle">Venous Reflux</text>
          </g>
        </g>
      `,
    },
  },
};

module.exports = {
  JOINTS_ARTWORKS,
};
