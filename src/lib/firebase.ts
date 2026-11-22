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
 * Retrieve active configuration from localStorage (runtime dynamic) or process.env (build/server)
 */
export function getActiveFirebaseConfig(): FirebaseClientConfig {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("homeorx_firebase_config");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.apiKey && parsed.apiKey.length > 20 && !parsed.apiKey.includes("DummyKey")) {
          return {
            apiKey: parsed.apiKey.trim(),
            authDomain: (parsed.authDomain || `${parsed.projectId}.firebaseapp.com`).trim(),
            projectId: (parsed.projectId || "homeorx-saas").trim(),
            storageBucket: (parsed.storageBucket || `${parsed.projectId}.appspot.com`).trim(),
            messagingSenderId: (parsed.messagingSenderId || "").trim(),
            appId: (parsed.appId || "").trim(),
          };
        }
      }
    } catch {}
  }

  const apiKey =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "YOUR_FIREBASE_API_KEY_PLACEHOLDER";
  const authDomain =
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "homeorx-4d877.firebaseapp.com";
  const projectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "homeorx-4d877";
  const storageBucket =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "homeorx-4d877.firebasestorage.app";
  const messagingSenderId =
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "650516803516";
  const appId =
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:650516803516:web:13fc2a9068dbb1538f85b9";

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
 * Checks if a live Firebase API Key has been configured in environment variables or localStorage
 */
export function isFirebaseConfigured(): boolean {
  const config = getActiveFirebaseConfig();
  if (!config.apiKey) return false;
  if (config.apiKey.includes("DummyKey") || config.apiKey.length < 20) return false;
  return true;
}

/**
 * Save Firebase Client config to browser localStorage
 */
export function saveClientFirebaseConfig(config: FirebaseClientConfig) {
  if (typeof window !== "undefined") {
    localStorage.setItem("homeorx_firebase_config", JSON.stringify(config));
  }
}

/**
 * Initialize or retrieve the active Firebase App singleton
 */
export function getOrInitFirebaseApp(): FirebaseApp {
  const config = getActiveFirebaseConfig();
  const baseConfig = {
    apiKey: config.apiKey || "YOUR_FIREBASE_API_KEY_PLACEHOLDER",
    authDomain: config.authDomain || "homeorx-4d877.firebaseapp.com",
    projectId: config.projectId || "homeorx-4d877",
    storageBucket: config.storageBucket || "homeorx-4d877.firebasestorage.app",
    messagingSenderId: config.messagingSenderId || "650516803516",
    appId: config.appId || "1:650516803516:web:13fc2a9068dbb1538f85b9",
  };

  if (getApps().length > 0) {
    return getApp();
  }
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
