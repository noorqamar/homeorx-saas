"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerDoctor } from "@/app/actions/auth";
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
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    </div>
  );
}
