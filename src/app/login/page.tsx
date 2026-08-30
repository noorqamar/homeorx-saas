"use client";

import { useState } from "react";
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
  Check,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim();
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

  const handleDemoLogin = async () => {
    setEmail("dr.demo@homeorx.health");
    setPassword("demo12345");
    setIsLoading(true);
    setError(null);

    const res = await loginDoctor({
      email: "dr.demo@homeorx.health",
      password: "demo12345",
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
    setEmail("admin@homeorx.health");
    setPassword("admin123456");
    setIsLoading(true);
    setError(null);

    const res = await loginDoctor({
      email: "admin@homeorx.health",
      password: "admin123456",
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Dynamic Animated Ambient Glows */}
      <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-600/25 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />

      {/* Central 2-Column Responsive Layout Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* ================= LEFT COLUMN: COLORFUL HOMEOPATHY HERO BANNER ================= */}
        <div className="lg:col-span-7 space-y-6 text-white pr-0 lg:pr-4">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide shadow-xs">
            <Leaf className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Holistic Homeopathic Clinical Management SaaS</span>
          </div>

          {/* Main Title & Motto */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Homeo<span className="text-emerald-400">Rx</span> Cloud Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              &ldquo;Similia Similibus Curentur&rdquo; — قدرتی، محفوظ، مستقل اور جدید ترین ہومیوپیتھک کلینیکل سسٹم
            </p>
          </div>

          {/* Colorful Information Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {/* Card 1: 1-Page A4 Precision */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-emerald-500/25 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Stethoscope className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-emerald-300">Single A4 Letterhead</strong>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                سنگل A4 پیج پر متوازن کالمز، اردو نوری نستعلیق ہدایات اور لائیو پرنٹنگ۔
              </p>
            </div>

            {/* Card 2: 780+ Master Remedies */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-teal-500/25 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-teal-300">780+ Master Remedies</strong>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                مکمل کینٹ و بوگر رپریٹری، پوٹینسیز اور تیز رفتار لائیو ایرو کی سرچنگ۔
              </p>
            </div>

            {/* Card 3: Doctor Approval & Security */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-amber-500/25 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-amber-300">Admin Control & Security</strong>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                ڈاکٹرز کی رجسٹریشن کی منظوری، محفوظ ورک اسپیس اور ملٹی ٹیننٹ الگ ڈیٹا بیس۔
              </p>
            </div>

            {/* Card 4: QR Verification & Branding */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-indigo-500/25 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Award className="h-4 w-4" />
                </div>
                <strong className="text-xs font-bold text-indigo-300">QR EMR Verification</strong>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                ۴ خوبصورت رنگین تھیمز، ڈیجیٹل دستخط اور ای ایم آر تصدیقی بارکوڈ بیج۔
              </p>
            </div>
          </div>

          {/* Inspiring Classical Quote */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-200/90 italic flex items-center gap-3">
            <Flame className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>
              &ldquo;The physician&apos;s highest and only calling is to make the sick healthy, to heal, as it is termed.&rdquo; — <strong>Dr. Samuel Hahnemann</strong>
            </span>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE SIGN-IN CARD ================= */}
        <div className="lg:col-span-5 w-full">
          <Card className="bg-slate-900/95 border-slate-800 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <CardHeader className="space-y-1 pb-4 bg-gradient-to-b from-slate-800/40 to-transparent border-b border-slate-800/80">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white font-black flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-emerald-400" />
                  Doctor / Admin Sign In
                </CardTitle>
                <span className="urdu-text font-bold text-emerald-400 text-sm">
                  لاگ ان پورٹل
                </span>
              </div>
              <CardDescription className="text-slate-400 text-xs">
                Enter your credentials to access your isolated workspace
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Error Alert Display */}
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 shadow-sm">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
                  <div className="leading-snug">
                    <strong>توجہ فرمائیں: </strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Email Address (<span className="urdu-text text-[11px]">ای میل</span>)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@homeorx.health"
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field with Eye Show/Hide Toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Password (<span className="urdu-text text-[11px]">پاس ورڈ</span>)
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-11 py-2.5 text-sm bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-emerald-400" />
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
                  className="w-full font-bold shadow-lg text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl h-11"
                >
                  Sign In to Workspace (داخل ہوں)
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </form>

              {/* Quick 1-Click Access Buttons */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                {/* 1-Click Super Admin Login */}
                <button
                  type="button"
                  onClick={handleSuperAdminLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-950/20 hover:bg-amber-500/15 text-amber-300 transition-all text-xs font-bold shadow-xs group"
                >
                  <span className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>1-Click Super Admin Login (سپر ایڈمن لاگ ان)</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-200 border border-amber-500/30">
                    Authority
                  </span>
                </button>

                {/* 1-Click Demo Doctor Login */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 hover:bg-emerald-500/15 text-emerald-300 transition-all text-xs font-semibold shadow-xs group"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>1-Click Doctor Login (Dr. Demo Hahnemann)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/30">
                    Clinic
                  </span>
                </button>
              </div>
            </CardContent>

            <CardFooter className="pt-0 border-t border-slate-800 justify-center bg-slate-950/50">
              <p className="text-xs text-slate-400 py-3">
                Don&apos;t have a clinic account?{" "}
                <Link
                  href="/register"
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline ml-1"
                >
                  Register New Doctor / Clinic
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
