import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
  Auth,
} from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "";
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "";
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "";
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "";
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "";

const firebaseConfig = {
  apiKey: apiKey || "AIzaSyDummyKeyForHomeoRxSaaS2026ClientAuth",
  authDomain: authDomain || "homeorx-saas.firebaseapp.com",
  projectId: projectId || "homeorx-saas",
  storageBucket: storageBucket || "homeorx-saas.appspot.com",
  messagingSenderId: messagingSenderId || "100293847561",
  appId: appId || "1:100293847561:web:abcdef1234567890",
};

/**
 * Checks if a live Firebase API Key has been configured in environment variables
 */
export function isFirebaseConfigured(): boolean {
  if (!apiKey) return false;
  if (apiKey.includes("DummyKey") || apiKey.length < 20) return false;
  return true;
}

/**
 * Initialize Firebase App singleton safely
 */
export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Initialize Firebase Auth instance
 */
export const auth: Auth = getAuth(app);

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
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Sign in with Email and Password via Firebase
 */
export async function signInWithEmail(email: string, pass: string): Promise<User | null> {
  if (!isFirebaseConfigured()) {
    return null;
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
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
    const result = await createUserWithEmailAndPassword(auth, email, pass);
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
      await signOut(auth);
    }
  } catch (error) {
    console.error("Firebase signOut note:", error);
  }
}
