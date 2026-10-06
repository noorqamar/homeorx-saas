"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerDoctor, firebaseSyncAndLogin } from "@/app/actions/auth";
import { signInWithGooglePopup, signUpWithEmail, isFirebaseConfigured } from "@/lib/firebase";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Lock,
  Mail,
  User,
  Building2,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Clock,
  LogIn,
  Sparkles,
  X,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    registrationNumber: "",
    clinicName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Google Fast Sign-Up Modal (when Firebase live API key is not yet configured in .env)
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmail, setGoogleEmail] = useState("");
  const [googleName, setGoogleName] = useState("");
  const [googleClinic, setGoogleClinic] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setError(null);

    // If Firebase API key is not yet set in .env, open instant Google Sign-Up dialog
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
        clinicName: `${user.displayName || "Doctor"}'s Homeopathic Clinic`,
      });

      if (!syncRes.success) {
        setError(syncRes.error || "گوگل رجسٹریشن میں خرابی پیش آئی۔");
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
      console.warn("Google signup note:", err?.code || err?.message);
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
        setError("گوگل رجسٹریشن ونڈو بند کر دی گئی۔ براہ کرم دوبارہ کوشش کریں۔");
      } else {
        setError(err?.message || "گوگل رجسٹریشن میں خرابی پیش آئی۔");
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
        clinicName: googleClinic.trim() || `${googleName.trim() || "Doctor"}'s Clinic`,
      });

      if (!syncRes.success) {
        setError(syncRes.error || "گوگل رجسٹریشن میں خرابی پیش آئی۔");
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
      setError(err?.message || "رجسٹریشن کے دوران خرابی پیش آئی۔");
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.name || formData.name.trim().length < 2) {
        throw new Error("براہ کرم ڈاکٹر کا مکمل نام درج کریں۔");
      }
      if (!formData.clinicName || formData.clinicName.trim().length < 2) {
        throw new Error("براہ کرم کلینک یا ہسپتال کا نام درج کریں۔");
      }
      if (!formData.email) {
        throw new Error("براہ کرم درست ای میل ایڈریس درج کریں۔");
      }
      if (!formData.password || formData.password.length < 6) {
        throw new Error("پاس ورڈ کم از کم ۶ ہندسوں کا ہونا چاہیے۔");
      }

      // Safe Firebase registration if API key is live
      if (isFirebaseConfigured()) {
        try {
          await signUpWithEmail(formData.email.trim().toLowerCase(), formData.password.trim(), formData.name.trim());
        } catch (fbErr: any) {
          console.log("Firebase signup note:", fbErr?.code || fbErr?.message);
        }
      }

      const res = await registerDoctor(formData);
      if (!res.success) {
        throw new Error(res.error || "رجسٹریشن میں خرابی پیش آئی۔");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "اکاؤنٹ بنانے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg space-y-6 relative z-10 text-center">
          <div className="inline-flex h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 items-center justify-center border border-emerald-500/30 shadow-2xl mb-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-400 animate-bounce" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              رجسٹریشن کامیابی سے موصول ہو گئی!
            </h1>
            <p className="text-sm font-semibold text-emerald-300">
              Registration Submitted Successfully
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3 text-right">
            <div className="flex items-center gap-2 text-amber-400 font-bold justify-end">
              <span>سپر ایڈمن کی منظوری کے انتظار میں</span>
              <Clock className="h-4 w-4 shrink-0" />
            </div>
            <p>
              محترم ڈاکٹر <strong>{formData.name}</strong>، آپ کے کلینک <strong>({formData.clinicName})</strong> کا پورٹل رجسٹر ہو چکا ہے۔
            </p>
            <p className="text-slate-400 text-xs">
              سیکورٹی اور تصدیق کے لیے، نیا اکاؤنٹ سپر ایڈمن کی منظوری کے بعد فعال ہوتا ہے۔ ایڈمن کی جانب سے منظوری ملتے ہی آپ اپنے درج کردہ ای میل <strong>({formData.email})</strong> اور پاس ورڈ کے ذریعے سسٹم میں داخل ہو سکیں گے۔
            </p>
          </div>

          <div className="pt-2">
            <Link href="/login">
              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Go to Sign In (لاگ ان اسکرین پر جائیں)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10 my-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-emerald-600 items-center justify-center text-white shadow-xl ring-4 ring-emerald-500/20 mb-2">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Register Doctor Account (رجسٹریشن)
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Create your clinical workspace with personalized bilingual A4 prescription letterhead
          </p>
        </div>

        {/* Registration Card */}
        <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg text-white font-bold">
              New Doctor & Clinic Registration
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Every practitioner receives a completely isolated and secure clinical workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* 🚀 QUICK GOOGLE SIGN UP */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading || isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700/90 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              {isGoogleLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  Registering with Google...
                </span>
              ) : (
                <>
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
                  <span>1-Click Sign Up with Google (گوگل رجسٹریشن)</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800" />
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                or complete registration form
              </span>
              <div className="flex-grow border-t border-slate-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Doctor Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Tariq Mahmood"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Qualifications
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MD (Hom), BHMS, DHMS"
                    className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Clinic / Centre Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="clinicName"
                      value={formData.clinicName}
                      onChange={handleChange}
                      placeholder="e.g. Al-Shifa Homeopathic Clinic"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Medical Reg. Number
                  </label>
                  <div className="relative">
                    <FileCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      placeholder="e.g. HOM-REG-2026-1049"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Official Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="doctor@example.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Create Password (کم از کم ۶ ہندسے) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold shadow-lg text-sm bg-emerald-600 hover:bg-emerald-500 text-white mt-2"
              >
                Submit Registration for Approval
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="pt-0 border-t border-slate-800 justify-center">
            <p className="text-xs text-slate-400 pt-3">
              Already registered?{" "}
              <Link
                href="/login"
                className="text-emerald-400 hover:text-emerald-300 font-bold underline ml-1"
              >
                Sign In to Existing Clinic (لاگ ان کریں)
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* ================= GOOGLE FAST SIGN-UP MODAL ================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-white relative">
            <button
              type="button"
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
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
                <h3 className="font-bold text-base">Google Account Registration</h3>
                <p className="text-xs text-slate-400">گوگل اکاؤنٹ کے ذریعے کلینک رجسٹر کریں</p>
              </div>
            </div>

            <form onSubmit={handleGoogleModalSubmit} className="space-y-3.5 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Doctor Name (ڈاکٹر کا نام) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="e.g. Dr. Tariq Mahmood"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Clinic Name (کلینک کا نام)
                </label>
                <input
                  type="text"
                  value={googleClinic}
                  onChange={(e) => setGoogleClinic(e.target.value)}
                  placeholder="e.g. Al-Shifa Homeopathic Clinic"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Google Email Address (گوگل ای میل ایڈریس) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="e.g. doctor@gmail.com"
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1"
                >
                  Cancel (منسوخ)
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isGoogleLoading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Register Clinic (رجسٹر کریں)
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
