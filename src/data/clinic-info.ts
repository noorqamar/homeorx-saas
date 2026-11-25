export interface ClinicInfo {
  brandName: string;
  doctorName: string;
  qualifications: string;
  experience: string;
  experienceYears: number;
  address: string;
  city: string;
  country: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  whatsappFormatted: string;
  whatsappDefaultUrl: string;
  clinicTimings: string;
  consultationDays: string;
  emergencyNotice: string;
  disclaimer: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
}

export const CLINIC_INFO: ClinicInfo = {
  brandName: "Dr. Noor ul Qamar Homeopathy Care",
  doctorName: "Dr. Noor ul Qamar",
  qualifications: "D.H.M.S, R.H.M.P",
  experience: "10 Years of Experience",
  experienceYears: 10,
  address: "Noor Street, LDA Avenue 1, Lahore, Pakistan",
  city: "Lahore",
  country: "Pakistan",
  phone: "03004627881",
  phoneFormatted: "+92 300 4627881",
  whatsapp: "923004627881",
  whatsappFormatted: "+92 300 4627881",
  whatsappDefaultUrl:
    "https://wa.me/923004627881?text=Hello%20Dr.%20Noor%20ul%20Qamar%2C%20I%20would%20like%20to%20book%20a%20consultation.",
  clinicTimings: "6:00 PM – 10:00 PM",
  consultationDays: "Monday to Saturday (6:00 PM – 10:00 PM PKT)",
  emergencyNotice:
    "For acute medical emergencies, sudden chest pain, severe breathlessness, uncontrolled bleeding, or loss of consciousness, please immediately visit the nearest hospital emergency room.",
  disclaimer:
    "Homeopathic supportive care is complementary and individualized. We never advise patients to discontinue their prescribed conventional medications without consulting their prescribing physician. Results vary from individual to individual.",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13626.331293375836!2d74.19561234999999!3d31.370597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391855a1215bb5a3%3A0x6b4999335ef0dd8c!2sLDA%20Avenue%201%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711200000000!5m2!1sen!2s",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/search/?api=1&query=Noor+Street+LDA+Avenue+1+Lahore+Pakistan",
};

export function getWhatsAppBookingUrl(details?: {
  name?: string;
  phone?: string;
  concern?: string;
  preferredTime?: string;
  consultationType?: string;
}): string {
  if (!details || (!details.name && !details.concern)) {
    return CLINIC_INFO.whatsappDefaultUrl;
  }

  const message = [
    `*Appointment Enquiry — Dr. Noor ul Qamar Homeopathy Care*`,
    ``,
    `*Patient Name:* ${details.name || "Not specified"}`,
    `*Contact Number:* ${details.phone || "Not specified"}`,
    `*Consultation Type:* ${details.consultationType || "Online Consultation"}`,
    `*Preferred Time:* ${details.preferredTime || "6:00 PM - 10:00 PM"}`,
    `*Health Concern:* ${details.concern || "General consultation"}`,
    ``,
    `_Sent from clinic website appointment form_`,
  ].join("\n");

  return `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}
