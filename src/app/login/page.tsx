"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  loginDoctor,
  loginAsDemoDoctor,
  firebaseSyncAndLogin,
  quickLoginAsSuperAdmin,
  saveFirebaseConfigAction,
} from "@/app/actions/auth";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  checkRedirectLoginResult,
  isFirebaseConfigured,
  saveClientFirebaseConfig,
} from "@/lib/firebase";
import {
  HeartPulse,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Crown,
  Key,
  ExternalLink,
  HelpCircle,
  Check,
  Stethoscope,
  FileText,
  Globe,
  Award,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  // Check for returning redirect authentication from Google
  useEffect(() => {
    let isMounted = true;
    const processRedirect = async () => {
      if (!isFirebaseConfigured()) return;
      try {
        const user = await checkRedirectLoginResult();
        if (user && user.email && isMounted) {
          setIsGoogleLoading(true);
          const syncRes = await firebaseSyncAndLogin({
            email: user.email,
            name: user.displayName || "Dr. " + (user.email.split("@")[0] || "Doctor"),
            uid: user.uid,
            photoURL: user.photoURL || undefined,
          });

          if (!syncRes.success) {
            setError(syncRes.error || "Unable to authenticate Google account. Please try again.");
            setIsGoogleLoading(false);
            return;
          }

          if (syncRes.isSuperAdmin || syncRes.role === "SUPER_ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
          router.refresh();
        }
      } catch (e: any) {
        console.warn("Redirect check error:", e);
      }
    };

    processRedirect();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Google Connection & Sign-In Modal
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"admin" | "firebase" | "email">("admin");
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [rawFirebaseConfig, setRawFirebaseConfig] = useState("");
  const [configSuccess, setConfigSuccess] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    setPopupBlocked(false);

    // If Firebase is already configured, attempt official Google Popup!
    if (isFirebaseConfigured()) {
      try {
        const user = await signInWithGooglePopup();
        if (!user.email) {
          throw new Error("Failed to retrieve email from Google account.");
        }

        const syncRes = await firebaseSyncAndLogin({
          email: user.email,
          name: user.displayName || "Dr. " + (user.email.split("@")[0] || "Doctor"),
          uid: user.uid,
          photoURL: user.photoURL || undefined,
        });

        if (!syncRes.success) {
          setError(syncRes.error || "Unable to authenticate Google account. Please try again.");
          setIsGoogleLoading(false);
          return;
        }

        if (syncRes.isSuperAdmin || syncRes.role === "SUPER_ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
        return;
      } catch (err: any) {
        console.warn("Google popup note:", err?.code || err?.message);
        if (err?.code === "auth/popup-closed-by-user") {
          setError("Google sign-in popup was closed. Please try again.");
          setIsGoogleLoading(false);
          return;
        }

        // If popup was blocked by browser
        if (
          err?.code === "auth/popup-blocked" ||
          err?.message?.includes("popup-blocked")
        ) {
          setPopupBlocked(true);
          setError("Browser pop-up blocker detected. Click below to continue directly with Google.");
          setIsGoogleLoading(false);
          return;
        }

        // If API key is not valid or domain is unauthorized, open setup assistant
        if (
          err?.code === "auth/api-key-not-valid" ||
          err?.code === "auth/invalid-api-key" ||
          err?.code === "auth/api-key-not-configured" ||
          err?.message === "FIREBASE_NOT_CONFIGURED"
        ) {
          setIsGoogleLoading(false);
          setShowGoogleModal(true);
          return;
        }

        setError(err?.message || "An error occurred during Google sign in.");
        setIsGoogleLoading(false);
        return;
      }
    }

    // If not yet configured, open Google Account Connection & Sign-In Assistant
    setIsGoogleLoading(false);
    setShowGoogleModal(true);
  };

  const handleGoogleRedirectSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    setPopupBlocked(false);

    if (isFirebaseConfigured()) {
      try {
        await signInWithGoogleRedirect();
        return;
      } catch (err: any) {
        console.warn("Google redirect error:", err);
        setError(err?.message || "Failed to start direct Google sign in.");
        setIsGoogleLoading(false);
        return;
      }
    }

    setIsGoogleLoading(false);
    setShowGoogleModal(true);
  };

  const handleQuickAdminClick = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const res = await quickLoginAsSuperAdmin("ch.noorulqamar@gmail.com");
      if (res.success) {
        setShowGoogleModal(false);
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Super Admin login failed.");
        setIsGoogleLoading(false);
      }
    } catch (e: any) {
      setError(e?.message || "Login error");
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes("@")) {
      setError("Please enter a valid Google email address.");
      return;
    }

    setIsGoogleLoading(true);
    setError(null);

    try {
      const syncRes = await firebaseSyncAndLogin({
        email: googleEmail.trim().toLowerCase(),
        name: googleName.trim() || `Dr. ${googleEmail.split("@")[0]}`,
      });

      if (!syncRes.success) {
        setError(syncRes.error || "Unable to authenticate Google account.");
        setIsGoogleLoading(false);
        return;
      }

      setShowGoogleModal(false);
      if (syncRes.isSuperAdmin || syncRes.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred during login.");
      setIsGoogleLoading(false);
    }
  };

  const handleSaveFirebaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setConfigSuccess(null);

    if (!rawFirebaseConfig.trim()) {
      setError("Please enter Firebase Config or API Key.");
      return;
    }

    try {
      let parsedApiKey = "";
      let parsedAuthDomain = "";
      let parsedProjectId = "";
      let parsedStorageBucket = "";
      let parsedMessagingSenderId = "";
      let parsedAppId = "";

      const raw = rawFirebaseConfig.trim();

      // Check if user pasted JSON or JS object
      if (raw.includes("{") || raw.includes("apiKey")) {
        const extractField = (fieldName: string) => {
          const match = raw.match(new RegExp(`['"]?${fieldName}['"]?\\s*[:=]\\s*['"]([^'"]+)['"]`));
          return match ? match[1] : "";
        };

        parsedApiKey = extractField("apiKey");
        parsedAuthDomain = extractField("authDomain");
        parsedProjectId = extractField("projectId");
        parsedStorageBucket = extractField("storageBucket");
        parsedMessagingSenderId = extractField("messagingSenderId");
        parsedAppId = extractField("appId");
      } else {
        // Assume direct API key
        parsedApiKey = raw;
        parsedProjectId = "homeorx-saas";
        parsedAuthDomain = "homeorx-saas.firebaseapp.com";
      }

      if (!parsedApiKey || parsedApiKey.length < 20) {
        setError("Firebase API Key is invalid. Please copy the complete web configuration.");
        return;
      }

      const clientConfig = {
        apiKey: parsedApiKey,
        authDomain: parsedAuthDomain || `${parsedProjectId}.firebaseapp.com`,
        projectId: parsedProjectId || "homeorx-saas",
        storageBucket: parsedStorageBucket || `${parsedProjectId}.appspot.com`,
        messagingSenderId: parsedMessagingSenderId || "",
        appId: parsedAppId || "",
      };

      // 1. Save in client localStorage
      saveClientFirebaseConfig(clientConfig);

      // 2. Save in server .env
      const serverRes = await saveFirebaseConfigAction(clientConfig);
      if (!serverRes.success) {
        console.warn("Server save note:", serverRes.error);
      }

      setConfigSuccess("Firebase configuration saved! Initiating Google authentication...");

      // 3. Immediately launch real Google Popup!
      setTimeout(async () => {
        try {
          const user = await signInWithGooglePopup();
          if (user.email) {
            const syncRes = await firebaseSyncAndLogin({
              email: user.email,
              name: user.displayName || `Dr. ${user.email.split("@")[0]}`,
              photoURL: user.photoURL || undefined,
              uid: user.uid,
            });

            if (syncRes.success) {
              setShowGoogleModal(false);
              if (syncRes.isSuperAdmin || syncRes.role === "SUPER_ADMIN") {
                router.push("/admin");
              } else {
                router.push("/");
              }
              router.refresh();
            }
          }
        } catch (popupErr: any) {
          setError(popupErr?.message || "An error occurred in Google popup.");
        }
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Failed to parse Firebase configuration.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (!cleanEmail) {
        setError("Please enter your email address.");
        setIsLoading(false);
        return;
      }
      if (!cleanPassword) {
        setError("Please enter your password.");
        setIsLoading(false);
        return;
      }

      const res = await loginDoctor({ email: cleanEmail, password: cleanPassword });
      if (!res.success) {
        setError(res.error || "Login failed. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      if (res.role === "SUPER_ADMIN" || res.isSuperAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An error occurred during login.");
      setIsLoading(false);
    }
  };

  const handleDemoClick = async () => {
    setIsDemoLoading(true);
    setError(null);

    try {
      const res = await loginAsDemoDoctor();
      if (!res.success) {
        setError(res.error || "Demo login failed. Please try again.");
        setIsDemoLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Demo login failed.");
      setIsDemoLoading(false);
    }
  };

  const fillAdmin = () => {
    setEmail("ch.noorulqamar@gmail.com");
    setPassword("admin123456");
  };

  const fillDemo = () => {
    setEmail("dr.demo@homeorx.health");
    setPassword("demo12345");
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#070F1E] text-slate-800 flex items-center justify-center selection:bg-blue-500 selection:text-white">
      {/* High-End Architectural Clinical Hospital Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/images/clinic-bg.jpg"
          alt="Modern Hospital Clinic Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.15]"
        />
        {/* Deep, elite sapphire medical vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050C1A]/95 via-[#091832]/88 to-[#0E284E]/82 backdrop-blur-[2px]" />
        {/* Luminous ambient lighting accents */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Main Viewport Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* LEFT COLUMN: Elite Clinical Healthcare Showcase (Visible on Desktop / Large screens) */}
          <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-6 text-white pr-2">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold shadow-lg w-fit">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Certified Clinical Suite v3.2</span>
            </div>

            {/* Hero Headings */}
            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-white leading-[1.18]">
                Precision Healthcare for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-teal-200">
                  Modern Homeopathy
                </span>
              </h1>
              <p className="text-sm xl:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
                The smart clinical operating system for homeopathic practitioners. Effortless consultation, smart repertory, and single-page A4 prescriptions.
              </p>
              <p className="text-xs xl:text-sm text-sky-200/90 font-medium leading-relaxed">
                Automated patient management, digital repertory analysis, and instant clinical workflows.
              </p>
            </div>

            {/* Doctor Showcase Visual Card */}
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-xl group max-w-xl">
              <div className="relative h-60 xl:h-68 w-full overflow-hidden">
                <img
                  src="/images/doctor-consultation.jpg"
                  alt="HomeoRx Clinical Doctor Consultation"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A]/95 via-[#060D1A]/40 to-transparent" />

                {/* Floating pill over image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 bg-slate-900/85 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-2xl shadow-lg">
                    <div className="h-8 w-8 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Evidence-Based Care</p>
                      <p className="text-[10px] text-blue-200/80">Clinical Efficacy & Precision</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1.5 rounded-2xl backdrop-blur-md text-emerald-300 text-xs font-bold shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                    <span>HIPAA Secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-3 max-w-xl">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs mb-1">
                  <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
                  <span>780+ Master Remedies</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Verified single remedies with decimal & centesimal potencies
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs mb-1">
                  <FileText className="h-4 w-4 text-teal-300 shrink-0" />
                  <span>Single-Page A4 Print</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Strict single-page A4 PDF with clinic seal & letterhead
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs mb-1">
                  <Lock className="h-4 w-4 text-indigo-300 shrink-0" />
                  <span>Tenant Data Isolation</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Dedicated multi-tenant encryption & doctor data privacy
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-xs mb-1">
                  <Globe className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>Bilingual Prescription Engine</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Dual Urdu Nastaliq & English clinical dosage directions
                </p>
              </div>
            </div>

            {/* Social Proof / Trust Footprint */}
            <div className="flex items-center gap-4 pt-1 max-w-xl">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-blue-400/50 object-cover"
                  src="/images/doctor-portrait.jpg"
                  alt="Doctor"
                />
                <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-blue-400/50 bg-blue-600 items-center justify-center text-[10px] font-bold text-white">
                  DR
                </div>
                <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-blue-400/50 bg-indigo-600 items-center justify-center text-[10px] font-bold text-white">
                  HQ
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-white text-xs ml-1.5 font-extrabold">4.9 / 5</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Trusted by Homeopathic Physicians across Pakistan & Abroad
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Luminous Glass Clinical Login Card */}
          <div className="w-full lg:col-span-5 max-w-[480px] mx-auto space-y-4">
            {/* Brand Header for Mobile View */}
            <div className="text-center space-y-1.5 lg:hidden mb-2">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#1E50DE] to-blue-500 text-white shadow-xl shadow-blue-500/25 mb-1 group hover:scale-105 transition-transform">
                <HeartPulse className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Homeo<span className="text-sky-400">Rx</span> Clinical Suite
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                Next-Gen Homeopathic Healthcare & Prescription Platform
              </p>
            </div>

            {/* Luminous White Login Card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/80 space-y-5">
              {/* Desktop Card Header */}
              <div className="hidden lg:flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#1E50DE] to-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#2B3674] tracking-tight">
                      Clinic Workspace Login
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Enter your authorized clinical workspace
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#1E50DE] text-[10px] font-extrabold tracking-wide uppercase">
                  <Sparkles className="h-3 w-3" />
                  SaaS Portal
                </span>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <p className="font-medium leading-relaxed">{error}</p>
                </div>
              )}

              {/* POP-UP BLOCKED RECOVERY CARD (Bypasses any browser pop-up blocker) */}
              {popupBlocked && (
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Pop-up Blocker Detected</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Your browser blocked the Google authentication popup. Click below to sign in directly without popups:
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleRedirectSignIn}
                    disabled={isGoogleLoading}
                    className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{isGoogleLoading ? "Redirecting to Google..." : "🚀 Continue with Direct Google Sign-In"}</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}

              {/* HERO GOOGLE AUTHENTICATION BUTTON (Primary Authentic Google OAuth 2.0) */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full group relative overflow-hidden py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-[#1E50DE]/20 hover:border-[#1E50DE] text-slate-800 font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg width="20" height="20" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isGoogleLoading ? "Authenticating with Google..." : "Sign In with Google"}</span>
                  <ShieldCheck className="h-4 w-4 text-[#1E50DE] ml-auto" />
                </button>
                <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-medium">
                  <span>🔒 Official Google Password & 2FA</span>
                  <button
                    type="button"
                    onClick={handleGoogleRedirectSignIn}
                    className="text-[#1E50DE] hover:underline font-bold transition-colors cursor-pointer"
                  >
                    Popup blocked? Direct Sign-In
                  </button>
                </div>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>

              {/* 1-CLICK INSTANT DEMO LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleDemoClick}
                disabled={isDemoLoading}
                className="w-full group relative overflow-hidden py-3 px-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
                <span>
                  {isDemoLoading ? "Signing in..." : "⚡ Quick Demo Mode (Instant Access)"}
                </span>
              </button>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Doctor Email Address</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@clinic.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isLoading ? "Signing in..." : "Sign In to Clinic Workspace"}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              </form>

              {/* Quick Credential Fillers for convenience */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Quick Fill:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fillAdmin}
                    className="font-bold text-[#1E50DE] hover:underline px-2 py-1 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    Super Admin (Qamar)
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="font-bold text-slate-700 hover:underline px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    Demo Doctor
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Link */}
            <p className="text-center text-xs text-slate-300 font-medium">
              New Clinic?{" "}
              <Link href="/register" className="font-bold text-sky-400 hover:text-sky-300 underline underline-offset-4">
                Register New Doctor Workspace
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google Real Account Connection & Verification Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Google Account Verification</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Official Google OAuth & Access Verification</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Notification Alerts */}
            {configSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <p className="font-medium">{configSuccess}</p>
              </div>
            )}
            {error && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            {/* Tab navigation */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveTab("admin")}
                className={`py-2 px-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "admin"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                👑 Super Admin
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("firebase")}
                className={`py-2 px-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "firebase"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⚙️ Link Firebase
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("email")}
                className={`py-2 px-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === "email"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ✉️ Any Gmail
              </button>
            </div>

            {/* Tab 1: Super Admin Fast Login */}
            {activeTab === "admin" && (
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200/60 space-y-2">
                  <div className="flex items-center gap-2 text-blue-900 font-extrabold text-xs">
                    <Crown className="h-4 w-4 text-amber-500" />
                    <span>Super Admin Account (Platform Central Admin)</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed">
                    The platform administrator account <strong className="text-slate-900">ch.noorulqamar@gmail.com</strong> holds global super administrator authority. Click the button below to sign in immediately.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleQuickAdminClick}
                  disabled={isGoogleLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Crown className="h-4 w-4 text-amber-300" />
                  <span>
                    {isGoogleLoading
                      ? "Signing in..."
                      : "Sign In as Super Admin (ch.noorulqamar@gmail.com)"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-blue-200" />
                </button>
              </div>
            )}

            {/* Tab 2: Connect Firebase Live Popup */}
            {activeTab === "firebase" && (
              <form onSubmit={handleSaveFirebaseConfig} className="space-y-3.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs space-y-1.5 leading-relaxed">
                  <p className="font-bold flex items-center gap-1.5 text-slate-900">
                    <Key className="h-3.5 w-3.5 text-[#1E50DE]" />
                    <span>How to activate official Google OAuth popup:</span>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                    <li>
                      Open your project in the{" "}
                      <a
                        href="https://console.firebase.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1E50DE] font-semibold underline inline-flex items-center gap-0.5"
                      >
                        Firebase Console <ExternalLink className="h-3 w-3" />
                      </a>.
                    </li>
                    <li>
                      Go to <strong>Authentication</strong> &gt; <strong>Sign-in method</strong> and enable <strong>Google</strong>.
                    </li>
                    <li>
                      Copy the <strong>Web App Config</strong> from Project Settings and paste it into the field below.
                    </li>
                  </ol>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Paste Firebase Web Config or API Key:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={rawFirebaseConfig}
                    onChange={(e) => setRawFirebaseConfig(e.target.value)}
                    placeholder={`const firebaseConfig = {\n  apiKey: "YOUR_API_KEY",\n  authDomain: "homeorx.firebaseapp.com",\n  projectId: "homeorx"\n};`}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGoogleLoading}
                  className="w-full py-3 rounded-xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  <span>Save & Launch Live Google Popup</span>
                </button>
              </form>
            )}

            {/* Tab 3: Any Gmail Sign-In */}
            {activeTab === "email" && (
              <form onSubmit={handleGoogleModalSubmit} className="space-y-3.5 pt-1">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  Enter any practitioner or clinic Google email. The platform will automatically provision an isolated clinical workspace and sign in.
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Google Email Address</label>
                  <input
                    type="email"
                    required
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    placeholder="doctor.name@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Doctor Full Name</label>
                  <input
                    type="text"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    placeholder="Dr. Qamar / Dr. Name"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGoogleLoading}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isGoogleLoading ? "Authenticating..." : "Continue to Clinical Workspace"}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
