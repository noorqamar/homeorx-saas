const fs = require('fs');

const fileContent = fs.readFileSync('src/data/treatments.ts', 'utf8');
const regex = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;
let match;
const list = [];
while ((match = regex.exec(fileContent)) !== null) {
  list.push({ slug: match[1], title: match[2], category: match[3] });
}

console.log(`Found ${list.length} treatments.`);
fs.writeFileSync('scripts/treatments-meta.json', JSON.stringify(list, null, 2), 'utf8');
console.log('Saved to scripts/treatments-meta.json');
