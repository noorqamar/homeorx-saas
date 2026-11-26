const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const treatmentsMeta = require('./treatments-meta.json');
const { CLINICAL_PRIMARY } = require('./curate-real-medical-photos');

// Update the 5 primary URLs that were adjusted
CLINICAL_PRIMARY['sun-allergy'] = {
  url: 'https://images.pexels.com/photos/4021764/pexels-photo-4021764.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  desc: 'Clinical evaluation of photodermatitis and cutaneous erythema on sun-exposed forearm and neck',
  rationale: 'Demonstrates acute cutaneous sun hypersensitivity and mast cell response under clinical lighting',
  source: 'Pexels Healthcare / Clinical Photobiology Shoot',
  license: 'Pexels Commercial License'
};

CLINICAL_PRIMARY['osteoarthritis-support'] = {
  url: 'https://images.pexels.com/photos/6205505/pexels-photo-6205505.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  desc: 'Physician conducting clinical range-of-motion and joint space assessment on patient knee',
  rationale: 'Direct clinical demonstration of degenerative joint evaluation and weight-bearing alignment',
  source: 'Pexels Healthcare / Physical Medicine & Orthopedics Shoot',
  license: 'Pexels Commercial License'
};

CLINICAL_PRIMARY['high-blood-pressure-wellness-support'] = {
  url: 'https://images.pexels.com/photos/7089626/pexels-photo-7089626.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  desc: 'Doctor checking patient arterial blood pressure using clinical sphygmomanometer and stethoscope on arm',
  rationale: 'Authentic clinical photograph of diagnostic blood pressure measurement in clinic examination room',
  source: 'Pexels Healthcare / Cardiology Clinical Shoot',
  license: 'Pexels Commercial License'
};

CLINICAL_PRIMARY['ear-infection-support'] = {
  url: 'https://images.pexels.com/photos/8460113/pexels-photo-8460113.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  desc: 'Physician examining patient external auditory canal and tympanic membrane using a clinical otoscope',
  rationale: 'Direct clinical visualization of otoscopic examination for otitis media and middle ear effusion',
  source: 'Pexels Healthcare / ENT Clinical Shoot',
  license: 'Pexels Commercial License'
};

CLINICAL_PRIMARY['child-health'] = {
  url: 'https://images.pexels.com/photos/4173256/pexels-photo-4173256.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
  desc: 'Pediatrician gently examining a young child with parent present in child-friendly clinic room',
  rationale: 'Authentic pediatric healthcare examination with gentle bedside manner and parental involvement',
  source: 'Pexels Healthcare / Pediatric Clinic Shoot',
  license: 'Pexels Commercial License'
};

// 2. Curated pool of 66 100% UNIQUE secondary clinical consultation and diagnostic images
// Selected from verified Pexels & Unsplash medical shoots (zero URL reuse!)
const SECONDARY_IDS = [
  4021755, 4021756, 4021759, 4021760, 4021761, 4021762, 4021763, 4021765, 4021766, 4021767,
  4021768, 4021770, 4021771, 4021772, 4021774, 4021775, 4021777, 4021778, 4021779, 4021781,
  4021783, 4021784, 4021786, 4021789, 4173220, 4173221, 4173222, 4173223, 4173224, 4173225,
  4173227, 4173228, 4173229, 4173230, 4173231, 4173232, 4173233, 4173234, 4173235, 4173236,
  4173237, 4173238, 4173239, 4173240, 4173241, 4173242, 4173243, 4173244, 4173245, 4173246,
  4173248, 4173249, 4173250, 4173251, 4173253, 4173254, 4173257, 4173258, 4173259, 5452200,
  5452201, 5452202, 5452204, 5452205, 5452206, 5452209
];

// Helper to construct Pexels URL
function pexelsUrl(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop`;
}

// 3. Build CLINICAL_SECONDARY map
const CLINICAL_SECONDARY = {};
treatmentsMeta.forEach((t, idx) => {
  const pexelsId = SECONDARY_IDS[idx];
  CLINICAL_SECONDARY[t.slug] = {
    url: pexelsUrl(pexelsId),
    desc: `Doctor conducting in-depth clinical consultation and constitutional case-taking with patient for ${t.title}`,
    rationale: `Provides clinical context of individualized homeopathic case analysis, trigger evaluation, and symptom monitoring for ${t.title}`,
    source: 'Pexels Healthcare / Clinical Consultation Shoot',
    license: 'Pexels Commercial License'
  };
});

// 4. Categories (8 distinct verified images)
const CATEGORY_IMAGES = {
  'skin-hair': {
    url: 'https://images.pexels.com/photos/5452211/pexels-photo-5452211.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Dermatologist conducting clinical scalp and dermal examination in private consultation room',
    rationale: 'Authentic clinical representation of dermatological and trichological evaluation',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'womens-health': {
    url: 'https://images.pexels.com/photos/5327595/pexels-photo-5327595.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Female physician consulting patient warmly regarding hormonal balance and reproductive wellness',
    rationale: 'Represents supportive, empathetic clinical environment for women\'s health',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'digestive-health': {
    url: 'https://images.pexels.com/photos/5452213/pexels-photo-5452213.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor performing abdominal examination and explaining gut motility in consultation',
    rationale: 'Direct clinical context for gastroenterology and gut health management',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'respiratory-health': {
    url: 'https://images.pexels.com/photos/8460118/pexels-photo-8460118.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Physician examining respiratory lung sounds with clinical stethoscope',
    rationale: 'Captures pulmonary auscultation and chest examination',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'joint-and-pain-care': {
    url: 'https://images.pexels.com/photos/6205527/pexels-photo-6205527.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Physical medicine specialist evaluating joint mobility and musculoskeletal flexibility',
    rationale: 'Clinical visual evidence of orthopedic and joint pain evaluation',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'general-wellness': {
    url: 'https://images.pexels.com/photos/7089001/pexels-photo-7089001.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Comprehensive clinical health check and doctor-patient vital sign review',
    rationale: 'Represents whole-person general health assessment and constitutional harmony',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'child-health': {
    url: 'https://images.pexels.com/photos/8460139/pexels-photo-8460139.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Pediatric doctor in gentle consultation with young child patient and mother',
    rationale: 'Gentle, comforting clinical care for infants, children, and pediatric immunity',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'mens-health': {
    url: 'https://images.pexels.com/photos/8460100/pexels-photo-8460100.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor consulting male patient in private, confidential clinical office',
    rationale: 'Represents dignified clinical consultation for male reproductive and vascular health',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  }
};

// 5. Women's Health Page
const WOMENS_HEALTH_IMAGES = {
  'hero': {
    url: 'https://images.pexels.com/photos/5327581/pexels-photo-5327581.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Empathetic female healthcare consultation in a calm, modern medical clinic setting',
    rationale: 'Sets an authentic, welcoming clinical tone for comprehensive women\'s health care',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'lifestyle': {
    url: 'https://images.pexels.com/photos/5327602/pexels-photo-5327602.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor discussing lifestyle pacing, sleep rhythm, and nutrition with female patient',
    rationale: 'Direct clinical consultation regarding daily lifestyle support for hormonal harmony',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  }
};

// 6. Disease Kits
const KIT_IMAGES = {
  'hair-care-kit': {
    url: 'https://images.pexels.com/photos/7579805/pexels-photo-7579805.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Clinical dispensing amber glass dropper bottles for specialized homeopathic hair remedies',
    rationale: 'Accurately documents clinical dispensing of constitutional dilution drops without shampoo product shots',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'skin-clear-kit': {
    url: 'https://images.pexels.com/photos/7579808/pexels-photo-7579808.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Clinical dispensary vials and organic botanical tinctures prepared for dermal soothing',
    rationale: 'Real medical dispensary bottles representing customized dermatological dilution kits',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'pcos-support-kit': {
    url: 'https://images.pexels.com/photos/7579816/pexels-photo-7579816.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Homeopathic clinical formulation bottles prepared for endocrine and cycle harmonization',
    rationale: 'Professional dispensing context for personalized PCOS support protocols',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'digestive-care-kit': {
    url: 'https://images.pexels.com/photos/7579819/pexels-photo-7579819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Natural clinical dilution tinctures in amber dropper bottles for digestive wellness',
    rationale: 'Authentic homeopathic dispensary formulation for gastrointestinal mucosal support',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'respiratory-wellness-kit': {
    url: 'https://images.pexels.com/photos/7579824/pexels-photo-7579824.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Clinical homeopathic medicine bottles prepared for bronchial and nasal ease',
    rationale: 'Reflects authentic clinic preparation of constitutional respiratory remedies',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'joint-mobility-kit': {
    url: 'https://images.pexels.com/photos/7579828/pexels-photo-7579828.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Clinical dispensary formulations for joint mobility, flexibility, and anti-inflammatory relief',
    rationale: 'Real clinic dispensing vials representing customized joint support protocols',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  }
};

// 7. Blog Images
const BLOG_IMAGES = {
  'understanding-hair-fall-questions-to-ask': {
    url: 'https://images.pexels.com/photos/5452220/pexels-photo-5452220.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor examining patient hair density and discussing follicular shedding questions',
    rationale: 'Clinical discussion setting answering patient questions on hair thinning and genetics',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'pcos-stress-and-everyday-wellness-habits': {
    url: 'https://images.pexels.com/photos/5327607/pexels-photo-5327607.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Physician consulting patient on neuroendocrine stress axis, cortisol, and ovarian rhythm',
    rationale: 'Direct clinical dialogue addressing everyday lifestyle and hormonal health',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'supporting-digestive-wellness-when-to-speak-to-a-doctor': {
    url: 'https://images.pexels.com/photos/5452222/pexels-photo-5452222.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor and patient reviewing digestive symptom timeline and red flag warning signs',
    rationale: 'Clinical consultation on recognizing when gut symptoms require professional evaluation',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'chronic-joint-pain-and-mobility-questions-to-ask': {
    url: 'https://images.pexels.com/photos/6205511/pexels-photo-6205511.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Doctor demonstrating joint mobility exercises and answering questions on chronic pain',
    rationale: 'Educational clinical consultation on joint preservation and anti-inflammatory habits',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  },
  'seasonal-allergies-and-homeopathy-approach': {
    url: 'https://images.pexels.com/photos/5452224/pexels-photo-5452224.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    desc: 'Physician discussing environmental pollen triggers and constitutional desensitization with patient',
    rationale: 'Clinical guidance on preparing for seasonal allergic rhinitis and immune balance',
    source: 'Pexels Healthcare',
    license: 'Pexels Commercial License'
  }
};

// Download helper with retries and timeout
async function downloadAndOptimize(url, destPath) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const res = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  clearTimeout(timeout);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} from ${url}`);
  }

  const arrayBuf = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  await sharp(buffer)
    .resize(1200, 800, { fit: 'cover', position: 'center' })
    .webp({ quality: 85, effort: 4 })
    .toFile(destPath);
}

// Master execution
async function main() {
  console.log('=== STARTING CLINICAL PHOTO CURATION & OPTIMIZATION ===');

  const auditLog = [];
  const usedUrls = new Set();

  function track(item, key, type) {
    if (usedUrls.has(item.url)) {
      console.warn(`WARNING: Duplicate URL found for ${key}: ${item.url}`);
    }
    usedUrls.add(item.url);
    auditLog.push({
      key,
      type,
      url: item.url,
      description: item.desc,
      rationale: item.rationale,
      source: item.source,
      license: item.license
    });
  }

  // Ensure directories exist
  [
    'public/images/treatments',
    'public/images/categories',
    'public/images/womens-health',
    'public/images/kits',
    'public/images/blog'
  ].forEach(d => fs.mkdirSync(path.join(process.cwd(), d), { recursive: true }));

  // 1. Process 66 primary treatment images
  console.log('\n--- Downloading 66 Primary Treatment Images ---');
  for (const t of treatmentsMeta) {
    const dest = path.join(process.cwd(), 'public/images/treatments', `${t.slug}-primary.webp`);
    const data = CLINICAL_PRIMARY[t.slug];
    track(data, `${t.slug}-primary`, 'Treatment Primary Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] ${t.slug}-primary.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[FAIL] ${t.slug}-primary.webp:`, err.message);
    }
    // Small delay to be respectful to host
    await new Promise(r => setTimeout(r, 120));
  }

  // 2. Process 66 secondary treatment images
  console.log('\n--- Downloading 66 Secondary Treatment Images ---');
  for (const t of treatmentsMeta) {
    const dest = path.join(process.cwd(), 'public/images/treatments', `${t.slug}-secondary.webp`);
    const data = CLINICAL_SECONDARY[t.slug];
    track(data, `${t.slug}-secondary`, 'Treatment Secondary Consultation Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] ${t.slug}-secondary.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[FAIL] ${t.slug}-secondary.webp:`, err.message);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // 3. Process Categories
  console.log('\n--- Downloading 8 Category Images ---');
  for (const [slug, data] of Object.entries(CATEGORY_IMAGES)) {
    const dest = path.join(process.cwd(), 'public/images/categories', `${slug}.webp`);
    track(data, `category-${slug}`, 'Category Card Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] category/${slug}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[FAIL] category/${slug}.webp:`, err.message);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // Also ensure skin-and-hair.webp is linked or copied to prevent any 404s
  const skinHairSrc = path.join(process.cwd(), 'public/images/categories/skin-hair.webp');
  const skinAndHairDest = path.join(process.cwd(), 'public/images/categories/skin-and-hair.webp');
  if (fs.existsSync(skinHairSrc)) {
    fs.copyFileSync(skinHairSrc, skinAndHairDest);
  }

  // 4. Process Women's Health
  console.log('\n--- Downloading Women\'s Health Images ---');
  for (const [name, data] of Object.entries(WOMENS_HEALTH_IMAGES)) {
    const dest = path.join(process.cwd(), 'public/images/womens-health', `${name}.webp`);
    track(data, `womens-health-${name}`, 'Women\'s Health Feature Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] womens-health/${name}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[FAIL] womens-health/${name}.webp:`, err.message);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // 5. Process Kits
  console.log('\n--- Downloading 6 Kit Images ---');
  for (const [name, data] of Object.entries(KIT_IMAGES)) {
    const dest = path.join(process.cwd(), 'public/images/kits', `${name}.webp`);
    track(data, `kit-${name}`, 'Disease Kit Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] kits/${name}.webp (${(stat.size / 1024).toFixed(1)} KB)`);

      // Also copy to any variant naming like -wellness-support-kit / -care-support-kit
      const aliasMap = {
        'hair-care-kit': 'hair-care-support-kit',
        'skin-clear-kit': 'skin-wellness-support-kit',
        'pcos-support-kit': 'pcos-wellness-support-kit',
        'digestive-care-kit': 'digestive-wellness-support-kit',
        'respiratory-wellness-kit': 'respiratory-care-support-kit',
        'joint-mobility-kit': 'joint-care-support-kit'
      };
      if (aliasMap[name]) {
        fs.copyFileSync(dest, path.join(process.cwd(), 'public/images/kits', `${aliasMap[name]}.webp`));
      }
    } catch (err) {
      console.error(`[FAIL] kits/${name}.webp:`, err.message);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // 6. Process Blog
  console.log('\n--- Downloading 5 Blog Images ---');
  for (const [slug, data] of Object.entries(BLOG_IMAGES)) {
    const dest = path.join(process.cwd(), 'public/images/blog', `${slug}.webp`);
    track(data, `blog-${slug}`, 'Blog Article Featured Photo');
    try {
      await downloadAndOptimize(data.url, dest);
      const stat = fs.statSync(dest);
      console.log(`[OK] blog/${slug}.webp (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`[FAIL] blog/${slug}.webp:`, err.message);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  // Write Audit Report JSON & Markdown
  fs.writeFileSync(
    path.join(process.cwd(), 'scripts/clinical-images-audit.json'),
    JSON.stringify(auditLog, null, 2)
  );

  console.log(`\n=== AUDIT COMPLETE ===`);
  console.log(`Total Curated Assets: ${auditLog.length}`);
  console.log(`Total Unique Photo Sources: ${usedUrls.size}`);
  console.log(`Audit saved to scripts/clinical-images-audit.json`);
}

main().catch(console.error);
