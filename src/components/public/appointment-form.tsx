"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  User,
  Activity,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Send,
} from "lucide-react";
import { CLINIC_INFO, getWhatsAppBookingUrl } from "@/data/clinic-info";

interface AppointmentFormProps {
  defaultConcern?: string;
  defaultType?: "Online Consultation" | "In-Clinic Visit (Lahore)";
  compact?: boolean;
}

export function AppointmentForm({
  defaultConcern = "",
  defaultType = "Online Consultation",
  compact = false,
}: AppointmentFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState(defaultConcern);
  const [preferredTime, setPreferredTime] = useState("6:00 PM - 7:00 PM");
  const [consultationType, setConsultationType] = useState<string>(defaultType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = getWhatsAppBookingUrl({
      name,
      phone,
      concern,
      preferredTime,
      consultationType,
    });

    // Mark as submitted
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(url, "_blank", "noopener,noreferrer");
    }, 300);
  };

  return (
    <div
      id="book"
      className={`wellness-card overflow-hidden shadow-xl border border-sage-200/80 ${
        compact ? "p-6" : "p-6 sm:p-8 lg:p-10"
      }`}
    >
      <div className="space-y-3 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold border border-forest-200/60">
          <Calendar className="w-3.5 h-3.5 text-gold-500" />
          <span>Priority Consultation Booking</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-forest-950 tracking-tight">
          Book Your Consultation
        </h3>
        <p className="text-sm text-sage-700 leading-relaxed">
          Share your health details below to generate a pre-filled appointment enquiry directly to{" "}
          <strong className="text-forest-900">Dr. Noor ul Qamar&apos;s WhatsApp</strong>. Our clinic will
          promptly confirm your appointment slot.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-heading text-lg font-bold text-emerald-900">
            WhatsApp Enquiry Prepared!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            If WhatsApp did not open automatically, click the button below to send your details to{" "}
            <strong>+{CLINIC_INFO.whatsapp}</strong>.
          </p>
          <div className="pt-2">
            <a
              href={getWhatsAppBookingUrl({
                name,
                phone,
                concern,
                preferredTime,
                consultationType,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Open WhatsApp Message</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-sage-600 hover:text-forest-900 underline block mx-auto pt-2"
          >
            Edit enquiry details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Consultation Type Selector */}
          <div>
            <label className="block text-xs font-bold text-forest-950 uppercase tracking-wider mb-2">
              Select Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsultationType("Online Consultation")}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  consultationType === "Online Consultation"
                    ? "bg-forest-900 text-white border-forest-900 shadow-sm"
                    : "bg-sage-50 text-forest-900 border-sage-200 hover:bg-sage-100"
                }`}
              >
                <Activity className="w-4 h-4 text-gold-400" />
                <span>Online (Audio / Video)</span>
              </button>
              <button
                type="button"
                onClick={() => setConsultationType("In-Clinic Visit (Lahore)")}
                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  consultationType === "In-Clinic Visit (Lahore)"
                    ? "bg-forest-900 text-white border-forest-900 shadow-sm"
                    : "bg-sage-50 text-forest-900 border-sage-200 hover:bg-sage-100"
                }`}
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>In-Clinic (Lahore)</span>
              </button>
            </div>
          </div>

          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="patient-name"
                className="block text-xs font-semibold text-forest-900 mb-1"
              >
                Full Name *
              </label>
              <div className="relative">
                <input
                  id="patient-name"
                  type="text"
                  required
                  placeholder="e.g. Fatima Tariq / Ahmad Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-white"
                />
                <User className="w-4 h-4 text-sage-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label
                htmlFor="patient-phone"
                className="block text-xs font-semibold text-forest-900 mb-1"
              >
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <input
                  id="patient-phone"
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-white"
                />
                <Phone className="w-4 h-4 text-sage-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Preferred Time Slot */}
          <div>
            <label
              htmlFor="patient-time"
              className="block text-xs font-semibold text-forest-900 mb-1"
            >
              Preferred Appointment Slot (6:00 PM – 10:00 PM PKT)
            </label>
            <div className="relative">
              <select
                id="patient-time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-white"
              >
                <option value="6:00 PM - 7:00 PM">6:00 PM – 7:00 PM</option>
                <option value="7:00 PM - 8:00 PM">7:00 PM – 8:00 PM</option>
                <option value="8:00 PM - 9:00 PM">8:00 PM – 9:00 PM</option>
                <option value="9:00 PM - 10:00 PM">9:00 PM – 10:00 PM</option>
                <option value="Earliest Available">Earliest Available Slot</option>
              </select>
              <Clock className="w-4 h-4 text-sage-400 absolute right-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Health Concern */}
          <div>
            <label
              htmlFor="patient-concern"
              className="block text-xs font-semibold text-forest-900 mb-1"
            >
              Health Concern / Symptoms *
            </label>
            <textarea
              id="patient-concern"
              required
              rows={compact ? 2 : 3}
              placeholder="Briefly describe your symptoms, duration (e.g., hair fall since 3 months, PCOS, chronic acidity), and any previous treatments..."
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sage-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-99 focus:outline-hidden focus:ring-2 focus:ring-forest-700"
          >
            <Send className="w-4 h-4 text-gold-400" />
            <span>Send Enquiry on WhatsApp</span>
          </button>
        </form>
      )}

      {/* Direct Contact Bar */}
      <div className="mt-6 pt-5 border-t border-sage-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-sage-700">
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="inline-flex items-center gap-1.5 font-bold text-forest-900 hover:text-forest-700"
          >
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            <span>Call: {CLINIC_INFO.phone}</span>
          </a>
          <span className="text-sage-300">•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-500" />
            <span>Timings: {CLINIC_INFO.clinicTimings}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-sage-600">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Private & Confidential</span>
        </div>
      </div>
    </div>
  );
}
