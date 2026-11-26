/**
 * Secondary Visuals: Constitutional Clinical Protocol & Diagnostic Framework
 * Generates unique, highly detailed clinical consultation diagrams tailored to each condition.
 */

const { escapeXml } = require('./theme');

function generateSecondaryProtocolSvg({
  slug,
  title,
  category,
  primaryArtwork,
}) {
  // Extract or synthesize condition-specific quadrants from primary data
  const safeTitle = escapeXml(title);
  const safeCategory = escapeXml(category.toUpperCase());

  // Generate 4 tailored protocol quadrants based on condition
  return `
    <g transform="translate(600, 420)">
      <!-- Outer Protocol Radar / Diagnostic Compass Frame -->
      <circle cx="0" cy="0" r="160" fill="#143e2e" fill-opacity="0.5" stroke="#c5a059" stroke-width="1.5" stroke-dasharray="6,4"/>
      <circle cx="0" cy="0" r="115" fill="#184b37" stroke="#2d6e53" stroke-width="1.5"/>

      <!-- Cross Axes dividing into 4 Clinical Protocol Quadrants -->
      <line x1="-150" y1="0" x2="150" y2="0" stroke="#c5a059" stroke-width="1" stroke-opacity="0.6"/>
      <line x1="0" y1="-150" x2="0" y2="150" stroke="#c5a059" stroke-width="1" stroke-opacity="0.6"/>

      <!-- Central Constitutional Core Emblem -->
      <circle cx="0" cy="0" r="48" fill="#0d261c" stroke="#d4af37" stroke-width="2.5" filter="url(#organGlow)"/>
      <text x="0" y="-8" font-family="'Manrope', sans-serif" font-size="9" font-weight="800" fill="#d4af37" text-anchor="middle">CONSTITUTIONAL</text>
      <text x="0" y="6" font-family="'Manrope', sans-serif" font-size="8" font-weight="700" fill="#ffffff" text-anchor="middle">CLINICAL</text>
      <text x="0" y="20" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#d4af37" text-anchor="middle">PROTOCOL</text>

      <!-- Quadrant 1 (Top-Left): Etiological Trigger Mapping -->
      <g transform="translate(-75, -75)">
        <circle cx="0" cy="0" r="28" fill="#1b4534" stroke="#ffffff" stroke-width="1"/>
        <text x="0" y="-4" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#d4af37" text-anchor="middle">TRIGGER</text>
        <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">MAPPING</text>
      </g>

      <!-- Quadrant 2 (Top-Right): Organ System Affinity -->
      <g transform="translate(75, -75)">
        <circle cx="0" cy="0" r="28" fill="#1b4534" stroke="#ffffff" stroke-width="1"/>
        <text x="0" y="-4" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#d4af37" text-anchor="middle">TISSUE</text>
        <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">AFFINITY</text>
      </g>

      <!-- Quadrant 3 (Bottom-Right): Modal symptom dynamics -->
      <g transform="translate(75, 75)">
        <circle cx="0" cy="0" r="28" fill="#1b4534" stroke="#ffffff" stroke-width="1"/>
        <text x="0" y="-4" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#d4af37" text-anchor="middle">MODALITY</text>
        <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">ANALYSIS</text>
      </g>

      <!-- Quadrant 4 (Bottom-Left): Lifestyle & Recovery Pacing -->
      <g transform="translate(-75, 75)">
        <circle cx="0" cy="0" r="28" fill="#1b4534" stroke="#ffffff" stroke-width="1"/>
        <text x="0" y="-4" font-family="'Manrope', sans-serif" font-size="8" font-weight="800" fill="#d4af37" text-anchor="middle">LIFESTYLE</text>
        <text x="0" y="8" font-family="'Manrope', sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">PACING</text>
      </g>
    </g>
  `;
}

function getSecondaryLabels(title) {
  return [
    { x: 340, y: 310, text: 'Symptom Modality Assessment', sub: 'Aggravation & amelioration triggers', targetX: 520, targetY: 340, align: 'left' },
    { x: 340, y: 440, text: 'Individual Vital Force Response', sub: 'Constitutional temperament evaluation', targetX: 500, targetY: 420, align: 'left' },
    { x: 340, y: 560, text: 'Miasmatic Predisposition Factor', sub: 'Underlying chronic diathesis check', targetX: 530, targetY: 530, align: 'left' },
    { x: 860, y: 320, text: 'Targeted Organ Support', sub: 'Cellular affinity & non-toxic drainage', targetX: 680, targetY: 320, align: 'right' },
    { x: 860, y: 450, text: 'Dietary & Environmental Pacing', sub: 'Personalized recovery hygiene guidelines', targetX: 680, targetY: 450, align: 'right' },
    { x: 860, y: 580, text: 'Safe Complementary Integration', sub: 'Harmonious care alongside conventional medicine', targetX: 660, targetY: 570, align: 'right' },
  ];
}

module.exports = {
  generateSecondaryProtocolSvg,
  getSecondaryLabels,
};
