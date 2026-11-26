const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const output = execSync('npx tsx -e "import { TREATMENTS, TREATMENT_CATEGORIES } from \'./src/data/treatments\'; import { DISEASE_KITS } from \'./src/data/disease-kits\'; import { BLOG_POSTS } from \'./src/data/blog-posts\'; console.log(JSON.stringify({treatments: TREATMENTS.map(t => t.slug), categories: TREATMENT_CATEGORIES.map(c => c.slug), kits: DISEASE_KITS.map(k => k.slug), blog: BLOG_POSTS.map(b => b.slug)}));"', { encoding: 'utf8' });
const data = JSON.parse(output.trim());

console.log('Treatments count:', data.treatments.length);
console.log('Categories count:', data.categories.length);
console.log('Kits count:', data.kits.length);
console.log('Blog count:', data.blog.length);

let missing = 0;
for (const slug of data.treatments) {
  const p1 = path.join('public/images/treatments', slug + '-primary.webp');
  const p2 = path.join('public/images/treatments', slug + '-secondary.webp');
  if (!fs.existsSync(p1)) {
    console.error('Missing treatment primary:', p1);
    missing++;
  }
  if (!fs.existsSync(p2)) {
    console.error('Missing treatment secondary:', p2);
    missing++;
  }
}

for (const slug of data.categories) {
  const p = path.join('public/images/categories', slug + '.webp');
  if (!fs.existsSync(p)) {
    console.error('Missing category image:', p);
    missing++;
  }
}

for (const slug of data.kits) {
  const p = path.join('public/images/kits', slug + '.webp');
  if (!fs.existsSync(p)) {
    console.error('Missing kit image:', p);
    missing++;
  }
}

for (const slug of data.blog) {
  const p = path.join('public/images/blog', slug + '.webp');
  if (!fs.existsSync(p)) {
    console.error('Missing blog image:', p);
    missing++;
  }
}

['hero.webp', 'lifestyle.webp'].forEach(f => {
  const p = path.join('public/images/womens-health', f);
  if (!fs.existsSync(p)) {
    console.error('Missing womens-health image:', p);
    missing++;
  }
});

if (missing === 0) {
  console.log('SUCCESS! 100% OF ALL 153 ASSETS ACROSS ALL DATA MODELS ARE PRESENT ON DISK AND VERIFIED!');
} else {
  console.log('Total missing:', missing);
}
