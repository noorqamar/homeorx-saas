"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginDoctor, loginWithGoogle, loginWithPersonalEmail } from "@/app/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Crown,
  Eye,
  EyeOff,
  Leaf,
  Stethoscope,
  BookOpen,
  Award,
  Flame,
  Sun,
  Moon,
  AtSign,
  UserCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark, togglable to bright
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState("");
  const [googleNameInput, setGoogleNameInput] = useState("");

  // Personal Email Modal State
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [personalEmailInput, setPersonalEmailInput] = useState("");
  const [personalPassInput, setPersonalPassInput] = useState("");
  const [personalDoctorName, setPersonalDoctorName] = useState("");

  // Load theme preference if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("homeorx_theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem("homeorx_theme", nextMode ? "dark" : "light");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) {
        setError("براہ کرم اپنا ای میل درج کریں۔ (Please enter your email address.)");
        setIsLoading(false);
        return;
      }

      const res = await loginDoctor({ email: cleanEmail, password });
      if (!res.success) {
        setError(res.error || "لاگ ان ناکام رہا۔ براہ کرم تفصیلات چیک کریں۔");
        setIsLoading(false);
        return;
      }

      if (res.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "لاگ ان کے دوران مسئلہ پیش آیا۔");
      setIsLoading(false);
    }
  };

  const handleGoogleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = (googleEmailInput || "dr.homeo.user@gmail.com").trim().toLowerCase();
      const cleanName = googleNameInput.trim() || undefined;

      const res = await loginWithGoogle({
        email: cleanEmail,
        name: cleanName,
      });

      if (!res.success) {
        setError(res.error || "گوگل لاگ ان ناکام رہا۔");
        setIsLoading(false);
        return;
      }

      setShowGoogleModal(false);
      router.push(res.role === "SUPER_ADMIN" ? "/admin" : "/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "گوگل لاگ ان کے دوران مسئلہ پیش آیا۔");
      setIsLoading(false);
    }
  };

  const handlePersonalSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = personalEmailInput.trim().toLowerCase();
      if (!cleanEmail) {
        setError("براہ کرم پرسنل ای میل درج کریں۔");
        setIsLoading(false);
        return;
      }

      const res = await loginWithPersonalEmail({
        email: cleanEmail,
        name: personalDoctorName.trim() || undefined,
        password: personalPassInput || undefined,
      });

      if (!res.success) {
        setError(res.error || "پرسنل ای میل لاگ ان ناکام رہا۔");
        setIsLoading(false);
        return;
      }

      setShowPersonalModal(false);
      router.push(res.role === "SUPER_ADMIN" ? "/admin" : "/");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "پرسنل ای میل لاگ ان میں خرابی۔");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    const demoEmail = "dr.demo@homeorx.health";
    const demoPass = "demo12345";
    setEmail(demoEmail);
    setPassword(demoPass);
    setIsLoading(true);
    setError(null);

    const res = await loginDoctor({
      email: demoEmail,
      password: demoPass,
    });

    if (res.success) {
      router.push("/");
      router.refresh();
    } else {
      setError(res.error || "ڈیمو ڈاکٹر لاگ ان ناکام رہا۔");
      setIsLoading(false);
    }
  };

  const handleSuperAdminLogin = async () => {
    const adminEmail = "admin@homeorx.health";
    const adminPass = "admin123456";
    setEmail(adminEmail);
    setPassword(adminPass);
    setIsLoading(true);
    setError(null);

    const res = await loginDoctor({
      email: adminEmail,
      password: adminPass,
    });

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "سپر ایڈمن لاگ ان ناکام رہا۔");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-950 text-white"
          : "bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-100 text-slate-900"
      }`}
    >
      {/* Top Floating Theme Switcher Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md ${
            isDarkMode
              ? "bg-slate-800/90 text-amber-300 border border-slate-700 hover:bg-slate-700"
              : "bg-white/90 text-slate-800 border border-slate-300 hover:bg-white"
          }`}
          title="Toggle Bright / Dark Mode"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 text-amber-400" />
              <span>☀️ Bright Mode (دن کی روشنی)</span>
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-indigo-600" />
              <span>🌙 Dark Mode (نائٹ موڈ)</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Animated Ambient Glows */}
      <div
        className={`absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity ${
          isDarkMode ? "bg-emerald-600/25 opacity-100" : "bg-emerald-300/40 opacity-70"
        }`}
      />
      <div
        className={`absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[120px] pointer-events-none transition-opacity ${
          isDarkMode ? "bg-teal-500/20 opacity-100" : "bg-teal-300/30 opacity-70"
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[140px] pointer-events-none ${
          isDarkMode ? "bg-indigo-600/10" : "bg-indigo-200/20"
        }`}
      />

      {/* Central 2-Column Responsive Layout Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* ================= LEFT COLUMN: COLORFUL HOMEOPATHY HERO BANNER ================= */}
        <div className="lg:col-span-7 space-y-5 pr-0 lg:pr-4">
          {/* Top Pill */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs border ${
              isDarkMode
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-emerald-100/90 border-emerald-300 text-emerald-900"
            }`}
          >
            <Leaf className="h-4 w-4 text-emerald-500 animate-pulse" />
            <span>Holistic Homeopathic Clinical Management SaaS</span>
          </div>

          {/* Main Title & Motto */}
          <div className="space-y-1.5">
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Homeo<span className="text-emerald-500">Rx</span> Cloud Portal
            </h1>
            <p
              className={`text-sm sm:text-base font-semibold leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              &ldquo;Similia Similibus Curentur&rdquo; — قدرتی، محفوظ، مستقل اور جدید ترین ہومیوپیتھک کلینیکل سسٹم
            </p>
          </div>

          {/* 4 Colorful Information Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Card 1: 1-Page A4 Precision */}
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md shadow-md space-y-1 transition-all ${
                isDarkMode
                  ? "bg-slate-900/80 border-emerald-500/30 text-slate-200"
                  : "bg-white/90 border-emerald-200 text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Single A4 Letterhead
                </strong>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                سنگل A4 پیج پر متوازن کالمز، اردو نوری نستعلیق ہدایات اور لائیو پرنٹنگ۔
              </p>
            </div>

            {/* Card 2: 780+ Master Remedies */}
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md shadow-md space-y-1 transition-all ${
                isDarkMode
                  ? "bg-slate-900/80 border-teal-500/30 text-slate-200"
                  : "bg-white/90 border-teal-200 text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  <BookOpen className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-teal-800 dark:text-teal-300">
                  780+ Master Remedies
                </strong>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                مکمل کینٹ و بوگر رپریٹری، پوٹینسیز اور تیز رفتار لائیو ایرو کی سرچنگ۔
              </p>
            </div>

            {/* Card 3: Doctor Approval & Security */}
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md shadow-md space-y-1 transition-all ${
                isDarkMode
                  ? "bg-slate-900/80 border-amber-500/30 text-slate-200"
                  : "bg-white/90 border-amber-200 text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  Admin Control & Security
                </strong>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                ڈاکٹرز کی رجسٹریشن کی منظوری، محفوظ ورک اسپیس اور ملٹی ٹیننٹ الگ ڈیٹا بیس۔
              </p>
            </div>

            {/* Card 4: QR Verification & Branding */}
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md shadow-md space-y-1 transition-all ${
                isDarkMode
                  ? "bg-slate-900/80 border-indigo-500/30 text-slate-200"
                  : "bg-white/90 border-indigo-200 text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Award className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                  QR EMR Verification
                </strong>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                ۴ خوبصورت رنگین تھیمز، ڈیجیٹل دستخط اور ای ایم آر تصدیقی بارکوڈ بیج۔
              </p>
            </div>
          </div>

          {/* Inspiring Classical Quote */}
          <div
            className={`p-3.5 rounded-2xl border text-xs italic flex items-center gap-3 shadow-xs ${
              isDarkMode
                ? "bg-emerald-950/50 border-emerald-500/20 text-emerald-200"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
            }`}
          >
            <Flame className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>
              &ldquo;The physician&apos;s highest and only calling is to make the sick healthy, to heal, as it is termed.&rdquo; — <strong>Dr. Samuel Hahnemann</strong>
            </span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE SIGN-IN CARD ================= */}
        <div className="lg:col-span-5 w-full">
          <Card
            className={`border shadow-2xl overflow-hidden backdrop-blur-2xl transition-all ${
              isDarkMode
                ? "bg-slate-900/95 border-slate-800 text-white"
                : "bg-white/95 border-slate-200 text-slate-900"
            }`}
          >
            <CardHeader
              className={`space-y-1 pb-4 border-b ${
                isDarkMode
                  ? "bg-slate-800/40 border-slate-800 text-white"
                  : "bg-slate-50 border-slate-100 text-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <CardTitle
                  className={`text-lg font-black flex items-center gap-2 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  <HeartPulse className="h-5 w-5 text-emerald-500" />
                  Doctor / Admin Sign In
                </CardTitle>
                <span className="urdu-text font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  لاگ ان پورٹل
                </span>
              </div>
              <CardDescription
                className={`text-xs ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Sign in with Google, Personal Email, or Administrator Credentials
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Error Alert Display */}
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5 shadow-sm">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                  <div className="leading-snug">
                    <strong>توجہ فرمائیں: </strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* 🌟 1. GOOGLE AUTHENTICATION BUTTON */}
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm group ${
                  isDarkMode
                    ? "bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-white"
                    : "bg-white hover:bg-slate-50 border-slate-300 text-slate-800"
                }`}
              >
                {/* Official Multi-color Google SVG Icon */}
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
                <span>Continue with Google (<span className="urdu-text font-bold">گوگل سے لاگ ان</span>)</span>
              </button>

              {/* 🌟 2. PERSONAL EMAIL AUTHENTICATION BUTTON */}
              <button
                type="button"
                onClick={() => setShowPersonalModal(true)}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                  isDarkMode
                    ? "bg-indigo-950/40 hover:bg-indigo-900/40 border-indigo-500/40 text-indigo-300"
                    : "bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200 text-indigo-900"
                }`}
              >
                <AtSign className="h-4 w-4 text-indigo-500 shrink-0" />
                <span>Sign in with Personal Email (<span className="urdu-text font-bold">پرسنل ای میل</span>)</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className={`flex-grow border-t ${isDarkMode ? "border-slate-800" : "border-slate-200"}`} />
                <span className={`flex-shrink mx-3 text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  or standard sign in
                </span>
                <div className={`flex-grow border-t ${isDarkMode ? "border-slate-800" : "border-slate-200"}`} />
              </div>

              {/* Standard Credentials Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Email Field */}
                <div className="space-y-1">
                  <label
                    className={`block text-[11px] font-bold uppercase tracking-wider ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Email Address (<span className="urdu-text text-[11px]">ای میل</span>)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@homeorx.health"
                      className={`w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? "bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-500"
                          : "bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Password Field with Eye Show/Hide Toggle */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      className={`block text-[11px] font-bold uppercase tracking-wider ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Password (<span className="urdu-text text-[11px]">پاس ورڈ</span>)
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-11 py-2 text-xs sm:text-sm rounded-xl border focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
                        isDarkMode
                          ? "bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-500"
                          : "bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 p-1 transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  className="w-full font-black shadow-lg text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl h-10"
                >
                  Sign In to Workspace (داخل ہوں)
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>

              {/* Quick 1-Click Access Buttons */}
              <div
                className={`pt-2.5 border-t space-y-2 ${
                  isDarkMode ? "border-slate-800" : "border-slate-100"
                }`}
              >
                {/* 1-Click Super Admin Login */}
                <button
                  type="button"
                  onClick={handleSuperAdminLogin}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border transition-all text-xs font-bold shadow-xs group ${
                    isDarkMode
                      ? "border-amber-500/40 bg-amber-950/30 hover:bg-amber-500/20 text-amber-300"
                      : "border-amber-300 bg-amber-50/80 hover:bg-amber-100/80 text-amber-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span>1-Click Super Admin Login (سپر ایڈمن لاگ ان)</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                      isDarkMode
                        ? "bg-amber-500/20 text-amber-200 border-amber-500/30"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}
                  >
                    Authority
                  </span>
                </button>

                {/* 1-Click Demo Doctor Login */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border transition-all text-xs font-bold shadow-xs group ${
                    isDarkMode
                      ? "border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-500/20 text-emerald-300"
                      : "border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <span>1-Click Doctor Login (Dr. Demo Hahnemann)</span>
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                      isDarkMode
                        ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                        : "bg-emerald-100 text-emerald-800 border-emerald-300"
                    }`}
                  >
                    Clinic
                  </span>
                </button>
              </div>
            </CardContent>

            <CardFooter
              className={`pt-0 border-t justify-center ${
                isDarkMode
                  ? "border-slate-800 bg-slate-950/50 text-slate-400"
                  : "border-slate-100 bg-slate-50/80 text-slate-600"
              }`}
            >
              <p className="text-xs py-2.5">
                Don&apos;t have a clinic account?{" "}
                <Link
                  href="/register"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold ml-1"
                >
                  Register New Doctor / Clinic
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* ================= GOOGLE AUTHENTICATION MODAL ================= */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2.5">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
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
                <strong className="text-sm font-bold">Google Authentication (گوگل اکاؤنٹ)</strong>
              </div>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGoogleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Google Email Address (<span className="urdu-text text-[11px]">گوگل ای میل</span>)
                </label>
                <input
                  type="email"
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Doctor / Clinic Name (اختیاری نام)
                </label>
                <input
                  type="text"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  placeholder="e.g. Dr. Muhammad Ali"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGoogleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isLoading}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Sign In with Google
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= PERSONAL EMAIL AUTHENTICATION MODAL ================= */}
      {showPersonalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-4 ${
              isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div className="flex items-center gap-2.5">
                <AtSign className="h-5 w-5 text-indigo-400 shrink-0" />
                <strong className="text-sm font-bold">Personal Email Sign In (پرسنل ای میل)</strong>
              </div>
              <button
                type="button"
                onClick={() => setShowPersonalModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePersonalSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Personal Email (Yahoo, Outlook, Gmail, Clinic Email)
                </label>
                <input
                  type="email"
                  value={personalEmailInput}
                  onChange={(e) => setPersonalEmailInput(e.target.value)}
                  placeholder="e.g. dr.tariq@yahoo.com"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Doctor Name (<span className="urdu-text text-[11px]">ڈاکٹر کا نام</span>)
                </label>
                <input
                  type="text"
                  value={personalDoctorName}
                  onChange={(e) => setPersonalDoctorName(e.target.value)}
                  placeholder="e.g. Dr. Tariq Mahmood"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Password (<span className="urdu-text text-[11px]">پاس ورڈ</span>)
                </label>
                <input
                  type="password"
                  value={personalPassInput}
                  onChange={(e) => setPersonalPassInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border bg-slate-950/70 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPersonalModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Sign In / Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
