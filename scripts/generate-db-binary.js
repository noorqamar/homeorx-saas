const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dbPath = path.join(__dirname, "..", "prisma", "dev.db");
const targetTsPath = path.join(__dirname, "..", "src", "lib", "db-seed-binary.ts");

if (fs.existsSync(dbPath)) {
  const dbBuffer = fs.readFileSync(dbPath);
  const base64 = dbBuffer.toString("base64");
  const hash = crypto.createHash("md5").update(dbBuffer).digest("hex");
  const timestamp = Date.now();

  const content = `// Auto-generated SQLite binary bundle for 100% serverless portability
export const SEED_DB_BASE64 = "${base64}";
export const SEED_DB_HASH = "${hash}";
export const SEED_DB_TIMESTAMP = ${timestamp};
`;
  fs.writeFileSync(targetTsPath, content, "utf8");
  console.log(`✅ Successfully generated db-seed-binary.ts (${(dbBuffer.length / 1024).toFixed(1)} KB, hash: ${hash})`);
} else {
  console.warn("⚠️ prisma/dev.db not found to generate binary bundle.");
}
