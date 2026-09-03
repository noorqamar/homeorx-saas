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

      // If /tmp/dev.db doesn't exist OR hash does not match current deployment bundle, write fresh DB
      const needsFreshCopy = !fs.existsSync(tmpDbPath) || (SEED_DB_HASH && currentHash !== SEED_DB_HASH);

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
          console.log(`[HomeoRx DB] Initialized /tmp/dev.db from embedded binary (${buffer.length} bytes, hash: ${SEED_DB_HASH})`);
        }
      }

      if (fs.existsSync(tmpDbPath)) {
        process.env.DATABASE_URL = `file:${tmpDbPath}`;
        return `file:${tmpDbPath}`;
      }
    } catch (err) {
      console.error("[HomeoRx DB] Vercel SQLite init notice:", err);
    }
  }
  return process.env.DATABASE_URL || "file:./prisma/dev.db";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDatabaseUrl(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
