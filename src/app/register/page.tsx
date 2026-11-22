"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerDoctor, firebaseSyncAndLogin } from "@/app/actions/auth";
import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  checkRedirectLoginResult,
  signUpWithEmail,
  isFirebaseConfigured,
} from "@/lib/firebase";
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
  Eye,
  EyeOff,
  GraduationCap,
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
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
        }
      } catch (err: any) {
        console.warn("Redirect check error in register:", err);
      }
    };
    processRedirect();
    return () => {
      isMounted = false;
    };
  }, [router]);

  // Google Fast Sign-Up Modal
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
    setPopupBlocked(false);

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

      if (err?.code === "auth/popup-blocked" || err?.message?.includes("popup-blocked")) {
        setPopupBlocked(true);
        setError("آپ کے براؤزر کے پاپ اپ بلاکر نے رجسٹریشن ونڈو بلاک کی ہے۔ نیچے دیے گئے بٹن سے بغیر پاپ اپ براہ راست رجسٹر کریں۔");
      } else if (err?.code === "auth/popup-closed-by-user") {
        setError("گوگل رجسٹریشن ونڈو بند کر دی گئی۔ دوبارہ کوشش کریں۔");
      } else {
        setError(err?.message || "گوگل رجسٹریشن میں خرابی پیش آئی۔");
      }
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleRedirectSignUp = async () => {
    setIsGoogleLoading(true);
    setError(null);
    setPopupBlocked(false);

    if (!isFirebaseConfigured()) {
      setIsGoogleLoading(false);
      setShowGoogleModal(true);
      return;
    }

    try {
      await signInWithGoogleRedirect();
    } catch (err: any) {
      setError(err?.message || "براہ راست گوگل رجسٹریشن شروع کرنے میں خرابی پیش آئی۔");
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
      <div className="min-h-screen relative overflow-x-hidden bg-[#070F1E] text-slate-800 flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
        {/* High-End Architectural Clinical Hospital Backdrop */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img
            src="/images/clinic-bg.jpg"
            alt="Modern Hospital Clinic Interior"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#050C1A]/95 via-[#091832]/88 to-[#0E284E]/82 backdrop-blur-[2px]" />
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
        </div>

        <div className="w-full max-w-lg space-y-6 relative z-10 text-center">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/80 space-y-5">
            <div className="inline-flex h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 items-center justify-center border border-emerald-200 shadow-md mx-auto">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 animate-bounce" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2B3674]">
                رجسٹریشن کامیابی سے موصول ہو گئی!
              </h1>
              <p className="text-xs font-bold text-emerald-700 tracking-wide uppercase">
                Registration Submitted Successfully
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 text-right">
              <div className="flex items-center gap-2 text-[#1E50DE] font-bold justify-end">
                <span>سپر ایڈمن کی منظوری کے انتظار میں</span>
                <Clock className="h-4 w-4 shrink-0" />
              </div>
              <p>
                محترم ڈاکٹر <strong>{formData.name}</strong>، آپ کے کلینک <strong>({formData.clinicName})</strong> کا پورٹل رجسٹر ہو چکا ہے۔
              </p>
              <p className="text-slate-500 text-xs leading-relaxed">
                سیکورٹی اور تصدیق کے لیے، نیا اکاؤنٹ سپر ایڈمن کی منظوری کے بعد فعال ہوتا ہے۔ ایڈمن کی منظوری ملتے ہی آپ اپنے ای میل <strong>({formData.email})</strong> کے ذریعے لاگ ان کر سکیں گے۔
              </p>
            </div>

            <div className="pt-2">
              <Link href="/login">
                <button
                  type="button"
                  className="w-full py-3.5 px-4 rounded-xl font-bold bg-[#1E50DE] hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Go to Sign In (لاگ ان اسکرین پر جائیں)</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-xl relative z-10 space-y-5 my-8 px-4 sm:px-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-[#1E50DE] to-blue-500 text-white shadow-xl shadow-blue-500/25 mb-1 group hover:scale-105 transition-transform">
            <HeartPulse className="h-7 w-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Register Doctor Account (رجسٹریشن)
          </h1>
          <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
            Create your clinical workspace with personalized bilingual A4 prescription letterhead
          </p>
        </div>

        {/* Luminous Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/80 space-y-5">
          {/* Card Title Banner */}
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#2B3674]">
                New Doctor & Clinic Registration
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Every practitioner receives a completely isolated and secure clinical workspace
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#1E50DE] text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              SaaS Clinical Suite
            </span>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{error}</p>
            </div>
          )}

          {/* POP-UP BLOCKED RECOVERY CARD */}
          {popupBlocked && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-xs">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>پاپ اپ بلاکر نوٹس (Browser Pop-up Blocked)</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                آپ کے براؤزر کے پاپ اپ بلاکر نے گوگل رجسٹریشن ونڈو بلاک کی ہے۔ بغیر پاپ اپ کے براہ راست محفوظ گوگل رجسٹریشن کے لیے نیچے دیے گئے بٹن پر کلک کریں:
              </p>
              <button
                type="button"
                onClick={handleGoogleRedirectSignUp}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{isGoogleLoading ? "گوگل پر منتقل ہو رہے ہیں..." : "🚀 بغیر پاپ اپ براہ راست رجسٹر کریں (Direct Google Sign-Up)"}</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          )}

          {/* HERO GOOGLE SIGN UP BUTTON (Matching Behance Theme) */}
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading || isLoading}
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
              <span>{isGoogleLoading ? "گوگل سے رجسٹریشن ہو رہی ہے..." : "1-Click Register with Google (گوگل رجسٹریشن)"}</span>
              <ShieldCheck className="h-4 w-4 text-[#1E50DE] ml-auto" />
            </button>
            <div className="flex items-center justify-between px-1 text-[10px] text-slate-400 font-medium">
              <span>🔒 Instant Verified Doctor Setup</span>
              <button
                type="button"
                onClick={handleGoogleRedirectSignUp}
                className="text-[#1E50DE] hover:underline font-bold transition-colors cursor-pointer"
              >
                پاپ اپ مسئلہ؟ براہ راست رجسٹریشن
              </button>
            </div>
          </div>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              یا فارم کے ذریعے رجسٹریشن
            </span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Doctor Full Name <span className="text-rose-500">*</span></span>
                  <span className="text-[11px] text-slate-400 font-normal">ڈاکٹر کا مکمل نام</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Tariq Mahmood"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Qualifications</span>
                  <span className="text-[11px] text-slate-400 font-normal">طبی اسناد</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. MD (Hom), BHMS, DHMS"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Clinic / Centre Name <span className="text-rose-500">*</span></span>
                  <span className="text-[11px] text-slate-400 font-normal">کلینک یا سنٹر کا نام</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="clinicName"
                    required
                    value={formData.clinicName}
                    onChange={handleChange}
                    placeholder="e.g. Al-Shifa Homeopathic Clinic"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Medical Reg. Number</span>
                  <span className="text-[11px] text-slate-400 font-normal">رجسٹریشن نمبر</span>
                </label>
                <div className="relative">
                  <FileCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g. HOM-REG-2026-1049"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Official Email <span className="text-rose-500">*</span></span>
                  <span className="text-[11px] text-slate-400 font-normal">ای میل ایڈریس</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="doctor@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Phone / WhatsApp Number</span>
                  <span className="text-[11px] text-slate-400 font-normal">فون یا واٹس ایپ</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Create Password (کم از کم ۶ ہندسے) <span className="text-rose-500">*</span></span>
                <span className="text-[11px] text-slate-400 font-normal">پاس ورڈ</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:ring-2 focus:ring-blue-100 transition-all outline-none font-mono"
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
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? "رجسٹریشن جمع ہو رہی ہے..." : "Submit Registration for Approval (رجسٹریشن جمع کریں)"}</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              Already registered?{" "}
              <Link href="/login" className="font-bold text-[#1E50DE] hover:underline ml-1">
                Sign In to Existing Clinic (لاگ ان کریں)
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Google Fast Sign-Up Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4">
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
                  <h3 className="font-extrabold text-slate-900 text-sm">Google Account Registration</h3>
                  <p className="text-[11px] text-slate-500 font-medium urdu-inline">گوگل اکاؤنٹ سے کلینک رجسٹریشن</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleGoogleModalSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Doctor Name (ڈاکٹر کا نام)</label>
                <input
                  type="text"
                  required
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="e.g. Dr. Tariq Mahmood"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Clinic Name (کلینک کا نام)</label>
                <input
                  type="text"
                  value={googleClinic}
                  onChange={(e) => setGoogleClinic(e.target.value)}
                  placeholder="e.g. Al-Shifa Homeopathic Clinic"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Google Email ایڈریس</label>
                <input
                  type="email"
                  required
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  placeholder="doctor@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#1E50DE] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
                >
                  منسوخ (Cancel)
                </button>
                <button
                  type="submit"
                  disabled={isGoogleLoading}
                  className="flex-1 py-2.5 rounded-xl bg-[#1E50DE] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  {isGoogleLoading ? "رجسٹر ہو رہا ہے..." : "رجسٹر کریں (Register)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
