/**
 * Theme & Layout Engine for Clinically Accurate Medical Illustrations
 * HomeoRx / Dr. Noor ul Qamar Homeopathy Care
 */

const PALETTES = {
  "Skin & Hair": {
    bgFrom: "#0f2e21",
    bgMid: "#164230",
    bgTo: "#091c14",
    accent: "#c5a059",
    accentLight: "#dfc17b",
    glow: "#2d7054",
    labelBg: "#0d291e",
    border: "#295b45",
    textWhite: "#ffffff",
    textMuted: "#b3cebf",
    badgeBg: "rgba(197, 160, 89, 0.15)",
  },
  "Women's Health": {
    bgFrom: "#172b22",
    bgMid: "#1f3b2f",
    bgTo: "#0d1a14",
    accent: "#d4af37",
    accentLight: "#ebd57b",
    glow: "#366e55",
    labelBg: "#13261e",
    border: "#2d5e48",
    textWhite: "#ffffff",
    textMuted: "#b8d1c4",
    badgeBg: "rgba(212, 175, 55, 0.15)",
  },
  "Digestive Health": {
    bgFrom: "#133324",
    bgMid: "#1b4834",
    bgTo: "#0b1f16",
    accent: "#b89047",
    accentLight: "#d8b674",
    glow: "#307a58",
    labelBg: "#112e20",
    border: "#2b674b",
    textWhite: "#ffffff",
    textMuted: "#b1cbbe",
    badgeBg: "rgba(184, 144, 71, 0.15)",
  },
  "Respiratory Health": {
    bgFrom: "#0d271c",
    bgMid: "#153d2d",
    bgTo: "#071711",
    accent: "#c5a059",
    accentLight: "#dfc17b",
    glow: "#256349",
    labelBg: "#0b2319",
    border: "#21533e",
    textWhite: "#ffffff",
    textMuted: "#b0ccbe",
    badgeBg: "rgba(197, 160, 89, 0.15)",
  },
  "Joint & Pain Care": {
    bgFrom: "#143727",
    bgMid: "#1d4e38",
    bgTo: "#0b2017",
    accent: "#d4af37",
    accentLight: "#ebd57b",
    glow: "#337f5d",
    labelBg: "#123022",
    border: "#2a6a4d",
    textWhite: "#ffffff",
    textMuted: "#b6d0c2",
    badgeBg: "rgba(212, 175, 55, 0.15)",
  },
  "General Wellness": {
    bgFrom: "#113022",
    bgMid: "#1a4632",
    bgTo: "#091e15",
    accent: "#c5a059",
    accentLight: "#dfc17b",
    glow: "#2d7554",
    labelBg: "#102c1f",
    border: "#286347",
    textWhite: "#ffffff",
    textMuted: "#b3cebf",
    badgeBg: "rgba(197, 160, 89, 0.15)",
  },
  "Men's Health": {
    bgFrom: "#0e291d",
    bgMid: "#153c2b",
    bgTo: "#081811",
    accent: "#b89047",
    accentLight: "#d8b674",
    glow: "#27684b",
    labelBg: "#0c2419",
    border: "#23583f",
    textWhite: "#ffffff",
    textMuted: "#afd0c0",
    badgeBg: "rgba(184, 144, 71, 0.15)",
  },
  "Child Health": {
    bgFrom: "#153a2a",
    bgMid: "#1f533d",
    bgTo: "#0c2219",
    accent: "#d4af37",
    accentLight: "#ebd57b",
    glow: "#388c67",
    labelBg: "#133426",
    border: "#2f7556",
    textWhite: "#ffffff",
    textMuted: "#b8d7c8",
    badgeBg: "rgba(212, 175, 55, 0.15)",
  },
};

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Creates the base clinical frame with gridlines, gradients, medical headers, and footer
 */
function createClinicalFrame({
  category = "General Wellness",
  title = "Clinical Evaluation",
  subtitle = "Medical Condition Overview",
  badge = "CLINICAL PATHOLOGY & ANATOMY",
  clinicalLabels = [], // Array of { x, y, text, align: 'left'|'right', sub: '' }
  centerContent = "", // SVG elements for the central anatomical or clinical diagram
  isSecondary = false,
}) {
  const p = PALETTES[category] || PALETTES["General Wellness"];

  const safeCategory = escapeXml(category.toUpperCase());
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeBadge = escapeXml(badge);

  // Generate callout pins & labels
  const calloutsSvg = clinicalLabels
    .map((lbl, idx) => {
      const isRight = lbl.align === "right";
      const boxW = 260;
      const boxH = lbl.sub ? 46 : 34;
      const boxX = isRight ? lbl.x : lbl.x - boxW;
      const boxY = lbl.y - boxH / 2;
      const textX = isRight ? boxX + 16 : boxX + boxW - 16;
      const textAnchor = isRight ? "start" : "end";

      return `
      <!-- Callout ${idx + 1} -->
      <g class="callout-node" transform="translate(0, 0)">
        <!-- Pointer line -->
        <polyline points="${lbl.targetX || (isRight ? boxX : boxX + boxW)},${lbl.targetY || lbl.y} ${isRight ? boxX : boxX + boxW},${lbl.y}" 
                  stroke="${p.accent}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.8" fill="none"/>
        <circle cx="${lbl.targetX || (isRight ? boxX : boxX + boxW)}" cy="${lbl.targetY || lbl.y}" r="4.5" fill="${p.accent}" stroke="#ffffff" stroke-width="1.5"/>

        <!-- Label Card -->
        <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="8" 
              fill="${p.labelBg}" fill-opacity="0.92" stroke="${p.border}" stroke-width="1.2"/>
        <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="8" 
              fill="none" stroke="${p.accent}" stroke-width="0.8" stroke-opacity="0.4"/>
        
        <!-- Indicator Dot -->
        <circle cx="${isRight ? boxX + 8 : boxX + boxW - 8}" cy="${lbl.y}" r="3" fill="${p.accentLight}"/>

        <!-- Text -->
        <text x="${textX}" y="${lbl.sub ? lbl.y - 4 : lbl.y + 4}" 
              font-family="'Manrope', -apple-system, sans-serif" font-size="12" font-weight="700" 
              fill="${p.textWhite}" text-anchor="${textAnchor}" letter-spacing="0.3">
          ${escapeXml(lbl.text)}
        </text>
        ${
          lbl.sub
            ? `<text x="${textX}" y="${lbl.y + 13}" 
                     font-family="'Manrope', -apple-system, sans-serif" font-size="10" font-weight="500" 
                     fill="${p.accentLight}" text-anchor="${textAnchor}">
                 ${escapeXml(lbl.sub)}
               </text>`
            : ""
        }
      </g>
    `;
    })
    .join("\n");

  const rawSvg = `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="mainBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bgFrom}"/>
      <stop offset="50%" stop-color="${p.bgMid}"/>
      <stop offset="100%" stop-color="${p.bgTo}"/>
    </linearGradient>

    <radialGradient id="centerGlow" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="${p.glow}" stop-opacity="0.35"/>
      <stop offset="70%" stop-color="${p.glow}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${p.bgTo}" stop-opacity="0"/>
    </radialGradient>

    <!-- Medical Grid Pattern -->
    <pattern id="medGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.75" stroke-opacity="0.04"/>
    </pattern>

    <!-- Drop Shadows -->
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5"/>
    </filter>

    <filter id="organGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="800" fill="url(#mainBg)"/>
  <rect width="1200" height="800" fill="url(#centerGlow)"/>
  <rect width="1200" height="800" fill="url(#medGrid)"/>

  <!-- Clinical Coordinate Rings -->
  <g opacity="0.08" stroke="${p.accent}" fill="none">
    <circle cx="600" cy="410" r="190" stroke-width="1.5" stroke-dasharray="4,6"/>
    <circle cx="600" cy="410" r="270" stroke-width="1"/>
    <circle cx="600" cy="410" r="340" stroke-width="0.75" stroke-dasharray="2,8"/>
    <!-- Crosshairs -->
    <line x1="220" y1="410" x2="980" y2="410" stroke-width="0.75"/>
    <line x1="600" y1="140" x2="600" y2="680" stroke-width="0.75"/>
  </g>

  <!-- Top Clinical Header Banner -->
  <g transform="translate(60, 42)">
    <!-- Category & Scope Pill -->
    <rect x="0" y="0" width="340" height="30" rx="15" fill="${p.badgeBg}" stroke="${p.accent}" stroke-width="1"/>
    <circle cx="15" cy="15" r="4" fill="${p.accent}"/>
    <text x="28" y="19" font-family="'Manrope', -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5" fill="${p.accentLight}">
      ${safeCategory} • ${safeBadge}
    </text>

    <!-- Main Medical Title -->
    <text x="0" y="68" font-family="'DM Serif Display', Georgia, serif" font-size="34" font-weight="normal" fill="${p.textWhite}" letter-spacing="-0.3">
      ${safeTitle}
    </text>

    <!-- Subtitle / Clinical Scope -->
    <text x="0" y="96" font-family="'Manrope', -apple-system, sans-serif" font-size="14" font-weight="500" fill="${p.textMuted}">
      ${safeSubtitle}
    </text>
  </g>

  <!-- Top Right Practice Watermark -->
  <g transform="translate(1140, 48)" text-anchor="end">
    <text x="0" y="18" font-family="'DM Serif Display', Georgia, serif" font-size="16" fill="${p.accent}">
      Dr. Noor ul Qamar
    </text>
    <text x="0" y="36" font-family="'Manrope', -apple-system, sans-serif" font-size="10" font-weight="700" fill="${p.textMuted}" letter-spacing="1">
      D.H.M.S, R.H.M.P • CLINICAL SUITE
    </text>
  </g>

  <!-- Central Anatomical Artwork -->
  <g id="anatomical-display" transform="translate(0, 0)">
    ${centerContent}
  </g>

  <!-- Clinical Callouts & Anatomical Pointers -->
  ${calloutsSvg}

  <!-- Bottom Medical Footer Bar -->
  <g transform="translate(60, 742)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="${p.border}" stroke-width="1" stroke-opacity="0.8"/>
    <line x1="0" y1="0" x2="280" y2="0" stroke="${p.accent}" stroke-width="2"/>
    
    <text x="0" y="24" font-family="'Manrope', -apple-system, sans-serif" font-size="11" font-weight="700" fill="${p.accentLight}" letter-spacing="1">
      ${isSecondary ? "CONSTITUTIONAL CLINICAL PROTOCOL" : "DIAGNOSTIC ANATOMY &amp; PATHOLOGY SPECIFICATION"}
    </text>
    
    <text x="1080" y="24" font-family="'Manrope', -apple-system, sans-serif" font-size="11" font-weight="500" fill="${p.textMuted}" text-anchor="end">
      Individualised Homeopathic Assessment • Noor Street, LDA Avenue 1, Lahore
    </text>
  </g>
</svg>`;

  return rawSvg.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
}

module.exports = {
  PALETTES,
  escapeXml,
  createClinicalFrame,
};
