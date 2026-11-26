const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Ensure target directories exist
const DIRS = [
  'public/images/treatments',
  'public/images/categories',
  'public/images/kits',
  'public/images/blog',
  'public/images/womens-health',
];

DIRS.forEach((dir) => {
  fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
});

// 2. High-quality editorial SVG generator fallback
function createEditorialMedicalSvg(title, subtitle, category, iconType = 'leaf') {
  // Color themes by category
  const categoryPalettes = {
    "Women's Health": { primary: '#1e523e', accent: '#c5a059', soft: '#e8f0eb', light: '#fcfbf7' },
    "Skin & Hair": { primary: '#143e2e', accent: '#d4af37', soft: '#dfece3', light: '#faf8f2' },
    "Digestive Health": { primary: '#184735', accent: '#b89047', soft: '#e4eee7', light: '#fcfbf7' },
    "Respiratory Health": { primary: '#103828', accent: '#997334', soft: '#d8e7dc', light: '#faf9f5' },
    "Joint & Pain Care": { primary: '#164332', accent: '#c5a059', soft: '#e0ece3', light: '#fcfbf7' },
    "Men's Health": { primary: '#123728', accent: '#d4af37', soft: '#ddeae1', light: '#fbfaf6' },
    "Child Health": { primary: '#1a4c39', accent: '#c5a059', soft: '#e6efe9', light: '#fcfbf7' },
    "General Wellness": { primary: '#143e2e', accent: '#b89047', soft: '#e2ece5', light: '#faf8f2' },
  };

  const palette = categoryPalettes[category] || categoryPalettes["General Wellness"];

  // Medical / Botanical Icon SVG paths
  const icons = {
    leaf: `<path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7 9.5.5-1.5 1-3.5 1-6 0-3.5-1-6.5-2.5-9 3.5 1 6.5 3 8 6 1.5 3 2 6 1.5 8.5 2.5-1.5 4-4.2 4-7 0-6.6-4.5-12-10-12z" fill="${palette.accent}" opacity="0.9"/>`,
    dna: `<path d="M4 4c4 4 12 12 16 16M4 20c4-4 12-12 16-16M7 7l10 10M7 17L17 7" stroke="${palette.accent}" stroke-width="2.5" stroke-linecap="round"/>`,
    heart: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${palette.accent}" opacity="0.85"/>`,
    cross: `<path d="M19 105h-60V45c0-8.28-6.72-15-15-15s-15 6.72-15 15v60H15c-8.28 0-15 6.72-15 15s6.72 15 15 15h60v60c0 8.28 6.72 15 15 15s15-6.72 15-15v-60h60c8.28 0 15-6.72 15-15s-6.72-15-15-15z" transform="translate(535, 120) scale(0.65)" fill="${palette.accent}" opacity="0.8"/>`,
    bottle: `<path d="M8 2h8v3H8V2zm-2 5h12l1 14H5L6 7zm4 4v6m4-6v6" stroke="${palette.accent}" stroke-width="2.5" stroke-linecap="round" fill="none"/>`,
    sparkle: `<path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" fill="${palette.accent}" opacity="0.9"/>`,
  };

  const selectedIcon = icons[iconType] || icons.leaf;

  const safeCategory = (category || 'General Wellness').toUpperCase().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeTitle = (title || 'Clinical Care').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSubtitle = (subtitle || 'Individualised Homeopathic Support').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.primary}"/>
        <stop offset="50%" stop-color="#143e2e"/>
        <stop offset="100%" stop-color="#0b241b"/>
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="20%" r="60%">
        <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.22"/>
        <stop offset="60%" stop-color="${palette.primary}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="softGlow" cx="15%" cy="85%" r="55%">
        <stop offset="0%" stop-color="${palette.soft}" stop-opacity="0.15"/>
        <stop offset="70%" stop-color="${palette.primary}" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="800" fill="url(#bgGrad)"/>
    <rect width="1200" height="800" fill="url(#glow)"/>
    <rect width="1200" height="800" fill="url(#softGlow)"/>

    <!-- Subtle Geometric Botanical Waves -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="1.5" fill="none">
      <path d="M-100,500 C300,300 700,700 1300,400" />
      <path d="M-100,550 C300,350 700,750 1300,450" />
      <path d="M-100,600 C300,400 700,800 1300,500" />
      <circle cx="950" cy="250" r="180" stroke="${palette.accent}" stroke-width="2"/>
      <circle cx="950" cy="250" r="240" stroke="${palette.accent}" stroke-width="1"/>
      <circle cx="950" cy="250" r="300" stroke="${palette.accent}" stroke-width="0.75"/>
    </g>

    <!-- Central Decorative Crest -->
    <g transform="translate(600, 220)">
      <circle cx="0" cy="0" r="70" fill="#ffffff" fill-opacity="0.05" stroke="${palette.accent}" stroke-width="2" stroke-opacity="0.6"/>
      <circle cx="0" cy="0" r="58" fill="${palette.primary}" stroke="${palette.accent}" stroke-width="1" stroke-dasharray="4 4" stroke-opacity="0.8"/>
      <g transform="translate(-24, -24) scale(2)">
        ${selectedIcon}
      </g>
    </g>

    <!-- Category Eyebrow Pill -->
    <g transform="translate(600, 360)">
      <rect x="-160" y="-18" width="320" height="36" rx="18" fill="#ffffff" fill-opacity="0.08" stroke="${palette.accent}" stroke-width="1.2" stroke-opacity="0.5"/>
      <text x="0" y="5" font-family="'Manrope', -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="3" fill="${palette.accent}" text-anchor="middle">
        ${safeCategory} • CLINICAL CARE
      </text>
    </g>

    <!-- Main Title (DM Serif Display style) -->
    <text x="600" y="445" font-family="'DM Serif Display', Georgia, serif" font-size="46" font-weight="normal" fill="#ffffff" text-anchor="middle" letter-spacing="-0.5">
      ${safeTitle}
    </text>

    <!-- Subtitle (Manrope style) -->
    <text x="600" y="495" font-family="'Manrope', -apple-system, sans-serif" font-size="18" font-weight="400" fill="#d3e2d7" text-anchor="middle">
      ${safeSubtitle}
    </text>

    <!-- Practice Brand Watermark -->
    <g transform="translate(600, 720)">
      <line x1="-200" y1="0" x2="200" y2="0" stroke="${palette.accent}" stroke-width="1" stroke-opacity="0.3"/>
      <text x="0" y="25" font-family="'Manrope', -apple-system, sans-serif" font-size="13" font-weight="600" fill="#a3c4ae" text-anchor="middle" letter-spacing="1">
        DR. NOOR UL QAMAR HOMEOPATHY CARE • LAHORE &amp; ONLINE
      </text>
    </g>
  </svg>`;
}

// 3. Download or generate WebP asset
async function ensureWebPAsset(destPath, unsplashId, title, subtitle, category, iconType = 'leaf') {
  if (fs.existsSync(destPath)) {
    return;
  }

  // Attempt download from Unsplash
  if (unsplashId) {
    const url = `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=1200&h=800&q=82`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        await sharp(Buffer.from(arrayBuf))
          .resize(1200, 800, { fit: 'cover', position: 'center' })
          .webp({ quality: 85, effort: 4 })
          .toFile(destPath);
        return;
      }
    } catch {
      // Fall through to editorial SVG generation
    }
  }

  // Fallback: Generate pristine editorial SVG artwork converted to WebP
  const svg = createEditorialMedicalSvg(title, subtitle, category, iconType);
  await sharp(Buffer.from(svg))
    .webp({ quality: 90, effort: 4 })
    .toFile(destPath);
}

module.exports = {
  DIRS,
  createEditorialMedicalSvg,
  ensureWebPAsset,
};
