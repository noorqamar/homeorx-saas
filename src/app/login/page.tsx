"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginDoctor } from "@/app/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Leaf,
  Stethoscope,
  BookOpen,
  Award,
  Flame,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const cleanPassword = password.trim();

      if (!cleanEmail) {
        setError("براہ کرم اپنا ای میل درج کریں۔ (Please enter your email address.)");
        setIsLoading(false);
        return;
      }
      if (!cleanPassword) {
        setError("براہ کرم اپنا پاس ورڈ درج کریں۔ (Please enter your password.)");
        setIsLoading(false);
        return;
      }

      const res = await loginDoctor({ email: cleanEmail, password: cleanPassword });
      if (!res.success) {
        setError(res.error || "لاگ ان ناکام رہا۔ براہ کرم تفصیلات چیک کریں۔");
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

      {/* Dynamic Ambient Background Glows */}
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

      {/* Central 2-Column Responsive Layout */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* ================= LEFT COLUMN: COLORFUL HOMEOPATHY HERO BANNER ================= */}
        <div className="lg:col-span-7 space-y-5 pr-0 lg:pr-4">
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

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
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

          {/* Inspiring Quote */}
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

        {/* ================= RIGHT COLUMN: CLEAN DIRECT SIGN-IN CARD ================= */}
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
                Sign in with your registered email and password
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-5">
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

              {/* Clean Single Email & Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      className={`w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
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
                      className={`w-full pl-9 pr-11 py-2.5 text-xs sm:text-sm rounded-xl border focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors ${
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
                  className="w-full font-black shadow-lg text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl h-11 mt-2"
                >
                  Sign In to Workspace (داخل ہوں)
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>
            </CardContent>

            <CardFooter
              className={`pt-3 pb-4 border-t justify-center ${
                isDarkMode
                  ? "border-slate-800 bg-slate-950/50 text-slate-400"
                  : "border-slate-100 bg-slate-50/80 text-slate-600"
              }`}
            >
              <p className="text-xs">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold ml-1"
                >
                  Register New Doctor / Clinic (نیا ڈاکٹر رجسٹر کریں)
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
