import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { SEED_DB_BASE64, SEED_DB_HASH } from "./db-seed-binary";

function resolveDatabaseUrl(): string {
  if (process.env.VERCEL) {
    try {
      const tmpDbPath = path.join("/tmp", "dev.db");
      const tmpHashPath = path.join("/tmp", "dev.db.hash");

      let currentHash = "";
      if (fs.existsSync(tmpHashPath)) {
        try {
          currentHash = fs.readFileSync(tmpHashPath, "utf8").trim();
        } catch {
          currentHash = "";
        }
      }

      // Check if fresh copy is required
      const needsFreshCopy =
        !fs.existsSync(tmpDbPath) ||
        !currentHash ||
        (SEED_DB_HASH && currentHash !== SEED_DB_HASH);

      if (needsFreshCopy) {
        const localDbPath = path.join(process.cwd(), "prisma", "dev.db");
        if (fs.existsSync(localDbPath)) {
          fs.copyFileSync(localDbPath, tmpDbPath);
          if (SEED_DB_HASH) fs.writeFileSync(tmpHashPath, SEED_DB_HASH, "utf8");
          console.log(`[HomeoRx DB] Copied local prisma/dev.db to /tmp/dev.db`);
        } else if (SEED_DB_BASE64) {
          const buffer = Buffer.from(SEED_DB_BASE64, "base64");
          fs.writeFileSync(tmpDbPath, buffer);
          if (SEED_DB_HASH) fs.writeFileSync(tmpHashPath, SEED_DB_HASH, "utf8");
          console.log(`[HomeoRx DB] Wrote /tmp/dev.db from embedded base64 (${buffer.length} bytes, hash: ${SEED_DB_HASH})`);
        }
      }

      if (fs.existsSync(tmpDbPath)) {
        const fullUrl = `file:${tmpDbPath}`;
        process.env.DATABASE_URL = fullUrl;
        return fullUrl;
      }
    } catch (err) {
      console.error("[HomeoRx DB] Vercel SQLite init notice:", err);
    }
  }

  const defaultUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";
  process.env.DATABASE_URL = defaultUrl;
  return defaultUrl;
}

const activeDbUrl = resolveDatabaseUrl();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  schemaMigrated: boolean | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: activeDbUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/**
 * Self-healing runtime schema migrator:
 * Executes safe ALTER TABLE commands to ensure all required columns exist in SQLite database.
 */
export async function ensureDbSchema() {
  if (globalForPrisma.schemaMigrated) return;

  try {
    const migrations = [
      `ALTER TABLE "Doctor" ADD COLUMN "accountStatus" TEXT DEFAULT 'active'`,
      `ALTER TABLE "Doctor" ADD COLUMN "accountStatusUpdatedAt" DATETIME`,
      `ALTER TABLE "Doctor" ADD COLUMN "accountStatusUpdatedBy" TEXT`,
      `ALTER TABLE "Doctor" ADD COLUMN "demoStartedAt" DATETIME`,
      `ALTER TABLE "Doctor" ADD COLUMN "demoExpiresAt" DATETIME`,
      `ALTER TABLE "Doctor" ADD COLUMN "paymentReference" TEXT`,
      `ALTER TABLE "Doctor" ADD COLUMN "upgradeRequestedAt" DATETIME`,
      `ALTER TABLE "Doctor" ADD COLUMN "rejectionReason" TEXT`,
      `ALTER TABLE "Tenant" ADD COLUMN "accountStatus" TEXT DEFAULT 'active'`,
      `ALTER TABLE "Tenant" ADD COLUMN "accountStatusUpdatedAt" DATETIME`,
      `ALTER TABLE "Tenant" ADD COLUMN "accountStatusUpdatedBy" TEXT`,
      `ALTER TABLE "Tenant" ADD COLUMN "demoStartedAt" DATETIME`,
      `ALTER TABLE "Tenant" ADD COLUMN "demoExpiresAt" DATETIME`,
      `ALTER TABLE "Tenant" ADD COLUMN "paymentReference" TEXT`,
      `ALTER TABLE "Tenant" ADD COLUMN "upgradeRequestedAt" DATETIME`,
      `ALTER TABLE "Tenant" ADD COLUMN "rejectionReason" TEXT`,
    ];

    for (const sql of migrations) {
      try {
        await db.$executeRawUnsafe(sql);
      } catch {
        // Ignored: Column already exists in SQLite
      }
    }

    globalForPrisma.schemaMigrated = true;
  } catch (err) {
    console.error("[HomeoRx DB] Schema self-healing notice:", err);
  }
}
