import { initializeApp, getApps, getApp, FirebaseApp, deleteApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
  Auth,
} from "firebase/auth";

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

/**
 * In-memory runtime override cache for dynamic client updates without cleartext localStorage exposure
 */
let runtimeFirebaseConfig: FirebaseClientConfig | null = null;

/**
 * Retrieve active configuration safely from environment variables or in-memory runtime cache
 */
export function getActiveFirebaseConfig(): FirebaseClientConfig {
  if (runtimeFirebaseConfig && runtimeFirebaseConfig.apiKey) {
    return runtimeFirebaseConfig;
  }

  const apiKey = (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "").trim();
  const authDomain = (
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "homeorx-4d877.firebaseapp.com"
  ).trim();
  const projectId = (
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "homeorx-4d877"
  ).trim();
  const storageBucket = (
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "homeorx-4d877.firebasestorage.app"
  ).trim();
  const messagingSenderId = (
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "650516803516"
  ).trim();
  const appId = (
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:650516803516:web:13fc2a9068dbb1538f85b9"
  ).trim();

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
}

/**
 * Checks if a live Firebase API Key has been configured
 */
export function isFirebaseConfigured(): boolean {
  const config = getActiveFirebaseConfig();
  if (!config.apiKey) return false;
  if (
    config.apiKey === "NEXT_PUBLIC_FIREBASE_KEY_NOT_SET" ||
    config.apiKey.includes("DummyKey") ||
    config.apiKey.length < 20
  ) {
    return false;
  }
  return true;
}

/**
 * Update runtime client configuration in-memory without cleartext localStorage exposure
 */
export function saveClientFirebaseConfig(config: FirebaseClientConfig) {
  runtimeFirebaseConfig = {
    apiKey: (config.apiKey || "").trim(),
    authDomain: (config.authDomain || `${config.projectId}.firebaseapp.com`).trim(),
    projectId: (config.projectId || "homeorx-saas").trim(),
    storageBucket: (config.storageBucket || `${config.projectId}.appspot.com`).trim(),
    messagingSenderId: (config.messagingSenderId || "").trim(),
    appId: (config.appId || "").trim(),
  };
}

/**
 * Initialize or retrieve the active Firebase App singleton
 */
export function getOrInitFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  const config = getActiveFirebaseConfig();
  const safeApiKey = config.apiKey || "NEXT_PUBLIC_FIREBASE_KEY_NOT_SET";
  const baseConfig = {
    apiKey: safeApiKey,
    authDomain: config.authDomain || "homeorx-4d877.firebaseapp.com",
    projectId: config.projectId || "homeorx-4d877",
    storageBucket: config.storageBucket || "homeorx-4d877.firebasestorage.app",
    messagingSenderId: config.messagingSenderId || "650516803516",
    appId: config.appId || "1:650516803516:web:13fc2a9068dbb1538f85b9",
  };

  return initializeApp(baseConfig);
}

/**
 * Initialize Firebase Auth instance
 */
export function getFirebaseAuth(): Auth {
  const app = getOrInitFirebaseApp();
  return getAuth(app);
}

/**
 * Export default app and auth singletons for backward compatibility
 */
export const app: FirebaseApp = getOrInitFirebaseApp();
export const auth: Auth = getFirebaseAuth();

/**
 * Google Auth Provider configuration
 */
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Sign in with Google Popup via Firebase
 */
export async function signInWithGooglePopup(): Promise<User> {
  if (!isFirebaseConfigured()) {
    const error: any = new Error("FIREBASE_NOT_CONFIGURED");
    error.code = "auth/api-key-not-configured";
    throw error;
  }
  const authInstance = getFirebaseAuth();
  const result = await signInWithPopup(authInstance, googleProvider);
  return result.user;
}

/**
 * Sign in with Google Redirect (Bypasses all browser pop-up blockers)
 */
export async function signInWithGoogleRedirect(): Promise<void> {
  if (!isFirebaseConfigured()) {
    const error: any = new Error("FIREBASE_NOT_CONFIGURED");
    error.code = "auth/api-key-not-configured";
    throw error;
  }
  const authInstance = getFirebaseAuth();
  await signInWithRedirect(authInstance, googleProvider);
}

/**
 * Check if the user is returning from a Google Redirect authentication flow
 */
export async function checkRedirectLoginResult(): Promise<User | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const authInstance = getFirebaseAuth();
    const result = await getRedirectResult(authInstance);
    return result?.user || null;
  } catch (err: any) {
    console.warn("getRedirectResult note:", err?.code || err?.message);
    return null;
  }
}

/**
 * Sign in with Email and Password via Firebase
 */
export async function signInWithEmail(email: string, pass: string): Promise<User | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const authInstance = getFirebaseAuth();
    const result = await signInWithEmailAndPassword(authInstance, email, pass);
    return result.user;
  } catch (err: any) {
    if (err?.code === "auth/api-key-not-valid" || err?.code === "auth/invalid-api-key") {
      return null;
    }
    throw err;
  }
}

/**
 * Sign up with Email and Password via Firebase
 */
export async function signUpWithEmail(
  email: string,
  pass: string,
  displayName?: string
): Promise<User | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const authInstance = getFirebaseAuth();
    const result = await createUserWithEmailAndPassword(authInstance, email, pass);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    return result.user;
  } catch (err: any) {
    if (err?.code === "auth/api-key-not-valid" || err?.code === "auth/invalid-api-key") {
      return null;
    }
    throw err;
  }
}

/**
 * Sign out of Firebase Auth
 */
export async function signOutFirebaseUser(): Promise<void> {
  try {
    if (isFirebaseConfigured()) {
      const authInstance = getFirebaseAuth();
      await signOut(authInstance);
    }
  } catch (error) {
    console.error("Firebase signOut note:", error);
  }
}
