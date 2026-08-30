"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPatient } from "@/app/actions/patients";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Save, Sparkles } from "lucide-react";

export default function NewPatientPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      fatherName: (formData.get("fatherName") as string) || null,
      gender: formData.get("gender") as "Male" | "Female" | "Other",
      age: formData.get("age") ? Number(formData.get("age")) : null,
      dateOfBirth: (formData.get("dateOfBirth") as string) || null,
      phone: (formData.get("phone") as string) || null,
      whatsapp: (formData.get("whatsapp") as string) || null,
      email: (formData.get("email") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      occupation: (formData.get("occupation") as string) || null,
      chiefComplaint: (formData.get("chiefComplaint") as string) || null,
      medicalHistory: (formData.get("medicalHistory") as string) || null,
      familyHistory: (formData.get("familyHistory") as string) || null,
      allergies: (formData.get("allergies") as string) || null,
      currentMedicines: (formData.get("currentMedicines") as string) || null,
      previousTreatment: (formData.get("previousTreatment") as string) || null,
      notes: (formData.get("notes") as string) || null,
    };

    try {
      if (!data.name || data.name.trim().length < 2) {
        throw new Error("Patient name is required (at least 2 characters).");
      }
      if (!data.gender) {
        throw new Error("Please select gender.");
      }

      const patient = await createPatient(data);
      router.push(`/patients/${patient.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to register patient. Please check the inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/patients"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Patient Directory
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Section 1: Basic Personal & Demographic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <UserPlus className="h-5 w-5 text-emerald-600" />
              1. Patient Demographics & Contact
            </CardTitle>
            <CardDescription>
              Basic identity information. Only Name and Gender are mandatory.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Full Patient Name"
                name="name"
                required
                placeholder="e.g. Muhammad Ali"
              />

              <Input
                label="Father / Husband Name"
                name="fatherName"
                placeholder="e.g. Ali Nawaz"
              />

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  defaultValue="Male"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                label="Age (Years)"
                name="age"
                type="number"
                min={0}
                max={130}
                placeholder="e.g. 35"
              />

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />

              <Input
                label="Occupation"
                name="occupation"
                placeholder="e.g. Software Engineer, Teacher"
              />

              <Input
                label="Phone Number"
                name="phone"
                placeholder="e.g. +1 (555) 301-4455"
              />

              <Input
                label="WhatsApp Number"
                name="whatsapp"
                placeholder="e.g. +1 (555) 301-4455"
              />

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="e.g. patient@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="sm:col-span-2">
                <Input
                  label="Residential Address"
                  name="address"
                  placeholder="Street address, apartment, locality..."
                />
              </div>
              <div>
                <Input
                  label="City"
                  name="city"
                  placeholder="e.g. New York, London, Lahore"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Clinical & Homeopathic Case Intake */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-slate-900">
              <Sparkles className="h-5 w-5 text-teal-600" />
              2. Clinical Case Details & Medical History
            </CardTitle>
            <CardDescription>
              Record the presenting complaints, modalities, constitutional notes, and previous treatments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Chief Complaint & Presenting Symptoms
              </label>
              <textarea
                name="chiefComplaint"
                rows={3}
                placeholder="Describe current issues, sensations, locations, aggravating and ameliorating factors..."
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Past Medical & Surgical History
                </label>
                <textarea
                  name="medicalHistory"
                  rows={2}
                  placeholder="Past illnesses, hospitalizations, surgeries..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Family History
                </label>
                <textarea
                  name="familyHistory"
                  rows={2}
                  placeholder="Chronic diseases, hypertension, diabetes, allergic diathesis in family..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Known Allergies
                </label>
                <textarea
                  name="allergies"
                  rows={2}
                  placeholder="Food, dust, medicine allergies..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Current Conventional Medicines
                </label>
                <textarea
                  name="currentMedicines"
                  rows={2}
                  placeholder="Ongoing allopathic/supplements..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Previous Homeopathic Treatment
                </label>
                <textarea
                  name="previousTreatment"
                  rows={2}
                  placeholder="Past remedies taken, responses observed..."
                  className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Doctor&apos;s Constitutional & General Notes
              </label>
              <textarea
                name="notes"
                rows={2}
                placeholder="Thermal state (chilly/hot), thirst, cravings, aversions, sleep patterns, emotional disposition..."
                className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit & Cancel Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/patients">
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="px-8 font-bold"
          >
            <Save className="h-4 w-4 mr-2" />
            Register & Open Patient Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
