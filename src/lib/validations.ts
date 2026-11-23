import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(2, "Patient name must be at least 2 characters"),
  fatherName: z.string().optional().nullable(),
  gender: z.enum(["Male", "Female", "Other"] as const, {
    message: "Please select gender",
  }),
  dateOfBirth: z.string().optional().nullable(),
  age: z.coerce.number().min(0).max(130).optional().nullable(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")).nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  chiefComplaint: z.string().optional().nullable(),
  medicalHistory: z.string().optional().nullable(),
  familyHistory: z.string().optional().nullable(),
  allergies: z.string().optional().nullable(),
  currentMedicines: z.string().optional().nullable(),
  previousTreatment: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export const prescriptionItemSchema = z.object({
  medicineName: z.string().min(1, "Medicine name is required"),
  medicineId: z.string().optional().nullable(),
  potency: z.string().min(1, "Potency is required"),
  form: z.string().optional().nullable(),
  dose: z.string().optional().nullable(),
  frequency: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  instructions: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  sortOrder: z.number().default(0),
});

export type PrescriptionItemFormData = z.infer<typeof prescriptionItemSchema>;

export const prescriptionSchema = z.object({
  patientId: z.string().min(1, "Please select a patient"),
  prescriptionDate: z.string().min(1, "Prescription date is required"),
  chiefComplaint: z.string().optional().nullable(),
  symptoms: z.string().optional().nullable(),
  clinicalNotes: z.string().optional().nullable(),
  generalInstructions: z.string().optional().nullable(),
  followUpDays: z.coerce.number().min(0).optional().nullable(),
  items: z.array(prescriptionItemSchema).min(1, "Add at least one medicine to the prescription"),
});

export type PrescriptionFormData = z.infer<typeof prescriptionSchema>;

export const clinicProfileSchema = z.object({
  name: z.string().min(2, "Doctor name is required"),
  qualification: z.string().optional().nullable(),
  registrationNumber: z.string().optional().nullable(),
  clinicName: z.string().min(2, "Clinic name is required"),
  tagline: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")).nullable(),
  website: z.string().optional().nullable(),
  timings: z.string().optional().nullable(),
  prescriptionHeader: z.string().optional().nullable(),
  prescriptionFooter: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  digitalSignature: z.string().optional().nullable(),
  accentColor: z.string().optional().nullable(),
  templatePreset: z.string().optional().default("sage"),
  showQrCode: z.boolean().optional().default(true),
});

export type ClinicProfileFormData = z.infer<typeof clinicProfileSchema>;
