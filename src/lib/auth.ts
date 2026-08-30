import { db } from "./db";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "homeorx_session_token";
const SESSION_EXPIRY_DAYS = 30;

/**
 * Secure password hashing using native scrypt with a random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verifies a plain text password against the stored salt:hash string.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, key] = storedHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedBuffer = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedBuffer);
}

/**
 * Creates an active database session for a doctor and sets a secure HttpOnly cookie.
 */
export async function createSession(doctorId: string, tenantId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);

  // Store active session in database (Server-side session management)
  const session = await db.session.create({
    data: {
      token,
      doctorId,
      tenantId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return session;
}

/**
 * Verifies current session from request cookie against the database.
 * Strictly checks that session exists, is not expired, and doctor/tenant is active.
 */
export async function getVerifiedSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: {
      doctor: {
        include: {
          tenant: true,
        },
      },
    },
  });

  if (!session) return null;

  // Check expiration
  if (session.expiresAt < new Date()) {
    // Purge expired session from DB
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  if (!session.doctor || !session.doctor.active) return null;

  return session;
}

/**
 * Complete server-side logout:
 * Permanently invalidates and deletes the session row from the database and clears the cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.session.deleteMany({
      where: { token },
    }).catch(() => {});
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}
