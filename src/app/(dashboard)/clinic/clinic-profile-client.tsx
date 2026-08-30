"use client";

import { useState } from "react";
import { updateClinicProfile } from "@/app/actions/clinic";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Building2,
  User,
  Save,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Printer,
  Trash2,
  Palette,
  Check,
  FileSignature,
  QrCode,
} from "lucide-react";
import { TEMPLATE_PRESETS, type TemplatePresetId } from "@/components/prescription-templates/template-presets";

export function ClinicProfileClient({ initialData }: { initialData: any }) {
  const [formData, setFormData] = useState({
    name: initialData.doctorName || "Dr. Demo Hahnemann",
    qualification: initialData.qualification || "MD (Homeopathy), BHMS",
    registrationNumber: initialData.registrationNumber || "HOM-REG-2026-8942",
    clinicName: initialData.clinicName || "HomeoRx Wellness & Cure Clinic",
    tagline: initialData.tagline || "Holistic Homeopathic Health Care & Research",
    address: initialData.address || "Suite 402, Medical Arts Building, Health Avenue",
    phone: initialData.phone || "+1 (555) 234-5678",
    whatsapp: initialData.whatsapp || "+1 (555) 234-5678",
    email: initialData.email || "clinic@homeorx.health",
    website: initialData.website || "https://homeorx.health",
    timings: initialData.timings || "Mon - Sat: 9:00 AM - 6:00 PM",
    prescriptionHeader: initialData.prescriptionHeader || "HOLISTIC HOMEOPATHIC CARE & CURE",
    prescriptionFooter:
      initialData.prescriptionFooter ||
      "Similia Similibus Curentur • Classical Homeopathy: Safe, Gentle & Permanent Cure",
    logo: initialData.logo || "",
    digitalSignature: initialData.digitalSignature || "",
    templatePreset: (initialData.templatePreset as TemplatePresetId) || "sage",
    showQrCode: initialData.showQrCode ?? true,
    accentColor: initialData.accentColor || "#059669",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateClinicProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Logo file size must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Signature file size must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, digitalSignature: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-600" />
          Clinic & Doctor Profile (کلینک سیٹنگز و برانڈنگ)
        </h1>
        <p className="text-sm text-slate-500">
          Configure clinical credentials, branding themes, digital signature, and prescription letterhead styling
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span>Clinic branding, template preset, and credentials saved successfully!</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. TEMPLATE PRESETS SELECTOR (Section 5 Spec) */}
        <Card className="border-slate-200 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-600" />
              1. Prescription Letterhead Theme Preset (4 Selectable Styles)
            </CardTitle>
            <CardDescription>
              Select the visual style preset for all printed prescriptions and A4 records.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(Object.keys(TEMPLATE_PRESETS) as TemplatePresetId[]).map((presetKey) => {
                const preset = TEMPLATE_PRESETS[presetKey];
                const isSelected = formData.templatePreset === presetKey;

                return (
                  <div
                    key={presetKey}
                    onClick={() => setFormData((prev) => ({ ...prev, templatePreset: presetKey }))}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded-full ${
                            presetKey === "sage"
                              ? "bg-emerald-600"
                              : presetKey === "clinical"
                              ? "bg-blue-600"
                              : presetKey === "floral"
                              ? "bg-rose-700"
                              : "bg-slate-900"
                          }`}
                        />
                        <h4 className="font-bold text-sm text-slate-900">{preset.name}</h4>
                      </div>
                      {isSelected && (
                        <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{preset.subtitle}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {preset.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 2. Doctor Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-emerald-600" />
              2. Practitioner / Doctor Credentials
            </CardTitle>
            <CardDescription>
              These details appear on your printed prescriptions and digital records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Doctor Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Medical Qualifications"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. MD (Hom), BHMS, Gold Medalist"
              />

              <Input
                label="Medical Registration No."
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="e.g. HOM-REG-2026-8942"
              />
            </div>
          </CardContent>
        </Card>

        {/* 3. Clinic Details & Branding Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-teal-600" />
              3. Clinic Details & Letterhead Branding
            </CardTitle>
            <CardDescription>
              Clinic address, phone numbers, and customizable letterhead logo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Clinic / Centre Name"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleChange}
                required
              />

              <Input
                label="Clinic Tagline / Sub-heading"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="e.g. Holistic Homeopathic Health Care & Research"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Clinic Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <Input
                label="WhatsApp Number"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
              />

              <Input
                label="Official Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Clinic Physical Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <Input
                label="Clinic Timings"
                name="timings"
                value={formData.timings}
                onChange={handleChange}
                placeholder="e.g. Mon - Sat: 9:00 AM - 6:00 PM"
              />
            </div>

            {/* Clinic Logo Manager */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Clinic Letterhead Logo (Isolated Asset)
              </label>

              <div className="flex items-center gap-6">
                <div className="h-20 w-36 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Clinic Logo Preview"
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <ImageIcon className="h-6 w-6 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px]">No Logo</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="file"
                    id="logo-file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label htmlFor="logo-file">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("logo-file")?.click()}
                    >
                      <ImageIcon className="h-4 w-4 mr-1.5" />
                      Upload New Logo
                    </Button>
                  </label>

                  {formData.logo && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50 ml-2"
                      onClick={() => setFormData((prev) => ({ ...prev, logo: "" }))}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                  <p className="text-[11px] text-slate-400">
                    PNG, JPG or SVG. Max 2MB. Appears on the top of A4 prescription letterheads.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Doctor Signature */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Digital Doctor Signature / Stamp (Section 6 Spec)
              </label>

              <div className="flex items-center gap-6">
                <div className="h-16 w-36 rounded-xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.digitalSignature ? (
                    <img
                      src={formData.digitalSignature}
                      alt="Signature Preview"
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <FileSignature className="h-5 w-5 mx-auto mb-1 opacity-50" />
                      <span className="text-[10px]">No Signature</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="file"
                    id="sig-file"
                    accept="image/png,image/jpeg,image/svg+xml"
                    onChange={handleSignatureUpload}
                    className="hidden"
                  />
                  <label htmlFor="sig-file">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("sig-file")?.click()}
                    >
                      <FileSignature className="h-4 w-4 mr-1.5" />
                      Upload Signature Image
                    </Button>
                  </label>

                  {formData.digitalSignature && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50 ml-2"
                      onClick={() => setFormData((prev) => ({ ...prev, digitalSignature: "" }))}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  )}
                  <p className="text-[11px] text-slate-400">
                    Transparent PNG recommended. Auto-applies to all issued prescriptions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Letterhead Header, Footer & Verification QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Printer className="h-5 w-5 text-indigo-600" />
              4. Prescription Footer Quotes & Security QR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Prescription Bottom Footer Quote / Clinic Motto
              </label>
              <input
                type="text"
                name="prescriptionFooter"
                value={formData.prescriptionFooter}
                onChange={handleChange}
                placeholder="e.g. Similia Similibus Curentur • Classical Homeopathy"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="showQrCode"
                checked={formData.showQrCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, showQrCode: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="showQrCode" className="text-xs font-medium text-slate-800 cursor-pointer">
                Show Security & EMR Verification Badge on Printed Prescriptions
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="px-8 font-bold shadow-sm bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Clinic Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
