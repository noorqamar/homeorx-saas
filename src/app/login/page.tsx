"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginDoctor } from "@/app/actions/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!email) {
        throw new Error("Please enter your doctor email address.");
      }
      await loginDoctor({ email, password });
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("dr.demo@homeorx.health");
    setPassword("demo12345");
    setIsLoading(true);
    setError(null);

    try {
      await loginDoctor({
        email: "dr.demo@homeorx.health",
        password: "demo12345",
      });
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in as demo doctor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-emerald-600 items-center justify-center text-white shadow-xl ring-4 ring-emerald-500/20 mb-2">
            <HeartPulse className="h-8 w-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Homeo<span className="text-emerald-500">Rx</span> Portal
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Professional Homeopathic Prescription & Multi-Tenant Patient Management Suite
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-900/90 border-slate-800 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg text-white font-bold">
              Doctor Sign In (لاگ ان)
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Enter your clinic credentials to access your isolated patient database
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
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Doctor Official Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. dr.demo@homeorx.health"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold shadow-lg text-sm bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Sign In to Clinic Workspace
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>

            {/* Quick Demo Access Button */}
            <div className="pt-2 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleDemoLogin}
                className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                1-Click Sign In as Demo Doctor (Dr. Demo Hahnemann)
              </Button>
            </div>
          </CardContent>

          <CardFooter className="pt-0 border-t border-slate-800 justify-center">
            <p className="text-xs text-slate-400 pt-3">
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

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Tenant Isolated • HIPAA & Data Safety Ready</span>
        </div>
      </div>
    </div>
  );
}
