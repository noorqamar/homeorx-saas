/**
 * Master Generator for 100% Clinically Relevant Medical Illustrations
 * Renders all 66 conditions (132 unique WebP images) with precise anatomical artwork
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const { createClinicalFrame } = require('./theme');
const { SKIN_HAIR_ARTWORKS } = require('./skin-hair');
const { WOMENS_HEALTH_ARTWORKS } = require('./womens-health');
const { DIGESTIVE_ARTWORKS } = require('./digestive');
const { RESPIRATORY_ARTWORKS } = require('./respiratory');
const { JOINTS_ARTWORKS } = require('./joints');
const { GENERAL_WELLNESS_ARTWORKS } = require('./general-wellness');
const { SPECIALTIES_ARTWORKS } = require('./specialties');
const { generateSecondaryProtocolSvg, getSecondaryLabels } = require('./protocol');

const ALL_ARTWORKS = {
  ...SKIN_HAIR_ARTWORKS,
  ...WOMENS_HEALTH_ARTWORKS,
  ...DIGESTIVE_ARTWORKS,
  ...RESPIRATORY_ARTWORKS,
  ...JOINTS_ARTWORKS,
  ...GENERAL_WELLNESS_ARTWORKS,
  ...SPECIALTIES_ARTWORKS,
};

const treatmentsMeta = require('../treatments-meta.json');
const targetDir = path.join(process.cwd(), 'public/images/treatments');

async function generateAll() {
  console.log(`Starting clinical medical illustration generation for ${treatmentsMeta.length} conditions...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const t of treatmentsMeta) {
    const artwork = ALL_ARTWORKS[t.slug];
    if (!artwork || !artwork.primary) {
      console.error(`Missing artwork definition for slug: ${t.slug}`);
      errorCount++;
      continue;
    }

    try {
      // 1. Generate Primary Anatomical/Pathology Image
      const primarySvg = createClinicalFrame({
        category: t.category,
        title: t.title,
        subtitle: artwork.primary.subtitle || `${t.category} • Diagnostic Assessment`,
        badge: artwork.primary.badge || 'CLINICAL PATHOLOGY & ANATOMY',
        clinicalLabels: artwork.primary.labels || [],
        centerContent: artwork.primary.svg,
        isSecondary: false,
      });

      const primaryDest = path.join(targetDir, `${t.slug}-primary.webp`);
      await sharp(Buffer.from(primarySvg))
        .webp({ quality: 90, effort: 4 })
        .toFile(primaryDest);

      // 2. Generate Secondary Constitutional Protocol Image
      const secondarySvg = createClinicalFrame({
        category: t.category,
        title: `${t.title} Protocol`,
        subtitle: `Constitutional Case-Taking & Holistic Pacing Framework`,
        badge: 'CONSTITUTIONAL PROTOCOL',
        clinicalLabels: getSecondaryLabels(t.title),
        centerContent: generateSecondaryProtocolSvg({
          slug: t.slug,
          title: t.title,
          category: t.category,
          primaryArtwork: artwork,
        }),
        isSecondary: true,
      });

      const secondaryDest = path.join(targetDir, `${t.slug}-secondary.webp`);
      await sharp(Buffer.from(secondarySvg))
        .webp({ quality: 90, effort: 4 })
        .toFile(secondaryDest);

      successCount += 2;
      process.stdout.write(`✓ [${t.category}] ${t.title} (Primary + Secondary)\n`);
    } catch (err) {
      console.error(`Error generating visuals for ${t.slug}:`, err);
      errorCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Total generated successfully: ${successCount} images`);
  console.log(`Errors: ${errorCount}`);
  console.log(`========================================`);
}

generateAll().catch(console.error);
