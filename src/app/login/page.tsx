"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginDoctor, loginAsDemoDoctor, firebaseSyncAndLogin } from "@/app/actions/auth";
import { signInWithGooglePopup, isFirebaseConfigured } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
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
  Stethoscope,
  Activity,
  Zap,
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

  // Google Fast Sign-In Modal
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);

    if (!isFirebaseConfigured()) {
      setIsGoogleLoading(false);
      setShowGoogleModal(true);
      return;
    }

    try {
      const user = await signInWithGooglePopup();
      if (!user.email) {
        throw new Error("Google اکاؤنٹ سے ای میل حاصل نہیں ہو سکا۔");
      }

      const syncRes = await firebaseSyncAndLogin({
        email: user.email,
        name: user.displayName || "Dr. " + (user.email.split("@")[0] || "Doctor"),
        uid: user.uid,
        photoURL: user.photoURL || undefined,
      });

      if (!syncRes.success) {
        setError(syncRes.error || "گوگل لاگ ان کی توثیق میں مسئلہ پیش آیا۔");
        setIsGoogleLoading(false);
        return;
      }

      if (syncRes.isSuperAdmin || syncRes.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      console.warn("Google popup note:", err?.code || err?.message);
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

      if (err?.code === "auth/popup-closed-by-user") {
        setError("گوگل سائن ان ونڈو بند کر دی گئی۔ دوبارہ کوشش کریں۔");
      } else {
        setError(err?.message || "گوگل لاگ ان میں خرابی پیش آئی۔");
      }
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail || !googleEmail.includes("@")) {
      setError("براہ کرم درست گوگل ای میل ایڈریس درج کریں۔");
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
        setError(syncRes.error || "گوگل لاگ ان کی توثیق میں مسئلہ پیش آیا۔");
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
      setError(err?.message || "لاگ ان کے دوران خرابی پیش آئی۔");
      setIsGoogleLoading(false);
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
        setError("براہ کرم اپنا ای میل درج کریں۔");
        setIsLoading(false);
        return;
      }
      if (!cleanPassword) {
        setError("براہ کرم اپنا پاس ورڈ درج کریں۔");
        setIsLoading(false);
        return;
      }

      const res = await loginDoctor({ email: cleanEmail, password: cleanPassword });
      if (!res.success) {
        setError(res.error || "لاگ ان ناکام رہا۔ تفصیلات چیک کریں۔");
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
      setError(err?.message || "لاگ ان کے دوران مسئلہ پیش آیا۔");
      setIsLoading(false);
    }
  };

  const handleDemoClick = async () => {
    setIsDemoLoading(true);
    setError(null);

    try {
      const res = await loginAsDemoDoctor();
      if (!res.success) {
        setError(res.error || "ڈیمو لاگ ان میں خرابی پیش آئی۔");
        setIsDemoLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "ڈیمو لاگ ان میں خرابی پیش آئی۔");
      setIsDemoLoading(false);
    }
  };

  const fillAdmin = () => {
    setEmail("admin@homeorx.health");
    setPassword("admin123456");
  };

  const fillDemo = () => {
    setEmail("dr.demo@homeorx.health");
    setPassword("demo12345");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden bg-[#F4F7FC] text-slate-800">
      {/* Ambient Glowing Background Blobs */}
      <div className="absolute top-0 right-1/4 -mt-20 w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-20 w-[450px] h-[450px] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] rounded-full bg-cyan-100/30 blur-2xl pointer-events-none" />

      <div className="w-full max-w-[460px] relative z-10 space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#1E50DE] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-100 mb-1">
            <HeartPulse className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Homeo<span className="text-[#1E50DE]">Rx</span> Clinical Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Next-Gen Homeopathic Healthcare & Prescription Platform
          </p>
        </div>

        {/* Main Clean Card with Luminous Glow */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-white/80 shadow-[0_15px_45px_rgba(30,80,222,0.08)] space-y-5 relative">
          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* 1-CLICK INSTANT DEMO LOGIN BUTTON (Prominent, Glowing, Instant) */}
          <button
            type="button"
            onClick={handleDemoClick}
            disabled={isDemoLoading}
            className="w-full group relative overflow-hidden py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#1E50DE] via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-[0_6px_20px_rgba(30,80,222,0.35)] hover:shadow-[0_8px_25px_rgba(30,80,222,0.45)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
            <span>
              {isDemoLoading ? "لاگ ان ہو رہا ہے..." : "⚡ 1-Click Instant Demo Access (ڈیمو لاگ ان)"}
            </span>
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Or Sign In
            </span>
          </div>

          {/* Google Fast Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2.5"
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
            <span>{isGoogleLoading ? "Checking..." : "Continue with Google"}</span>
          </button>

          {/* Direct Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Doctor Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@clinic.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 focus:border-[#1E50DE] focus:bg-white rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">
                  Password
                </label>
                <span className="text-[11px] text-slate-400 font-medium">پاس ورڈ</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 focus:border-[#1E50DE] focus:bg-white rounded-xl text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "لاگ ان ہو رہا ہے..." : "Sign In to Clinic Workspace"}</span>
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
                className="font-bold text-[#1E50DE] hover:underline px-2 py-1 rounded-lg hover:bg-blue-50"
              >
                Super Admin
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={fillDemo}
                className="font-bold text-slate-700 hover:underline px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                Demo Doctor
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-500 font-medium">
          New Clinic?{" "}
          <Link href="/register" className="font-bold text-[#1E50DE] hover:underline">
            Register New Doctor Workspace
          </Link>
        </p>
      </div>

      {/* Google Fast Sign-In Fallback Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-blue-100 text-[#1E50DE] flex items-center justify-center font-bold">
                  G
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Google Account Fast Sign-In</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleGoogleModalSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Google Email</label>
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Doctor Name (Optional)</label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Dr. Your Name"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isGoogleLoading}
                className="w-full py-2.5 rounded-xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
              >
                {isGoogleLoading ? "Signing in..." : "Continue to Workspace"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
