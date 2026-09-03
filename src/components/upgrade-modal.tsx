"use client";

import { useState } from "react";
import { requestAccountUpgradeAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  QrCode,
  Palette,
  FileSpreadsheet,
} from "lucide-react";

export function UpgradeModal({
  isOpen,
  onClose,
  currentStatus = "demo",
  rejectionReason,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentStatus?: string;
  rejectionReason?: string | null;
  onSuccess?: () => void;
}) {
  const [paymentRef, setPaymentRef] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!paymentRef.trim()) {
      setError("براہ کرم ادائیگی کا حوالہ نمبر یا ٹرانزیکشن آئی ڈی درج کریں۔ (Please enter payment transaction reference.)");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await requestAccountUpgradeAction(paymentRef.trim(), notes.trim());
      if (!res.success) {
        setError(res.error || "درخواست جمع نہیں ہو سکی۔");
        setIsSubmitting(false);
        return;
      }

      setIsDone(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || "درخواست جمع کرنے میں خرابی۔");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-slate-900 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Zap className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-2">
                Upgrade to Full Clinic Account
              </h3>
              <p className="text-xs text-emerald-100 urdu-text">
                مکمل کلینک اکاؤنٹ حاصل کریں اور لامحدود فیچرز ان لاک کریں
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Rejection Alert if applicable */}
          {currentStatus === "rejected" && rejectionReason && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>پچھلی درخواست مسترد کی گئی تھی:</span>
              </div>
              <p className="pl-5 text-slate-700">{rejectionReason}</p>
            </div>
          )}

          {isDone ? (
            <div className="py-6 text-center space-y-3">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-black text-slate-900">
                درخواست کامیابی سے جمع ہو گئی ہے!
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                ہماری ٹیم آپ کے ٹرانزیکشن ریفرنس کو چیک کر کے آپ کا اکاؤنٹ <strong>ایکٹو (Active)</strong> کر دے گی، جس کے بعد تمام پابندیاں خودکار ختم ہو جائیں گی۔
              </p>
              <Button onClick={onClose} variant="primary" className="mt-2 font-bold">
                ٹھیک ہے (Close)
              </Button>
            </div>
          ) : (
            <>
              {/* Feature Comparison */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold text-[10px] uppercase text-slate-500 block">
                    موجودہ ڈیمو اکاؤنٹ
                  </span>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold">•</span> روزانہ 5 نسخے کی حد
                  </p>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold">•</span> پرنٹ پر واٹر مارک
                  </p>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold">•</span> صرف 1 ڈیفالٹ تھیم
                  </p>
                </div>

                <div className="space-y-1.5 border-l border-slate-200 pl-3">
                  <span className="font-bold text-[10px] uppercase text-emerald-700 block">
                    اپ گریڈ شدہ فل اکاؤنٹ
                  </span>
                  <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> لامحدود نسخہ جات
                  </p>
                  <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> بغیر واٹر مارک A4 پرنٹ
                  </p>
                  <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> لائیو QR EMR تصدیق
                  </p>
                  <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> ۴ خوبصورت تھیمز
                  </p>
                </div>
              </div>

              {/* Payment Bank Details Banner */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span>ادائیگی کی معلومات (Payment Details):</span>
                </div>
                <div className="text-[11px] text-slate-700 space-y-0.5 pl-6 font-mono">
                  <p><strong>Bank: </strong> Meezan Bank Ltd / JazzCash / EasyPaisa</p>
                  <p><strong>Account Title: </strong> HomeoRx Health Tech</p>
                  <p><strong>Account / IBAN: </strong> PK00 MEZN 0001 2345 6789 01</p>
                  <p><strong>JazzCash / EasyPaisa: </strong> 0300-1234567</p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submission Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Payment Transaction Reference / ID (<span className="urdu-text text-[11px]">ٹرانزیکشن آئی ڈی</span>) *
                  </label>
                  <input
                    type="text"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="e.g. TID-9847291 / Bank Transfer Ref"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Additional Doctor Note (<span className="urdu-text text-[11px]">اضافی پیغام / نوٹ</span>)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Annual Subscription via JazzCash"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <Button type="button" variant="outline" size="sm" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Submit Upgrade Request (درخواست بھیجیں)
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
