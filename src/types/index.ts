export interface TenantInfo {
  id: string;
  name: string;
  clinicName: string | null;
  address: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  timings: string | null;
  logo: string | null;
  prescriptionHeader: string | null;
  prescriptionFooter: string | null;
}

export interface DoctorInfo {
  id: string;
  tenantId: string;
  name: string;
  qualification: string | null;
  registrationNumber: string | null;
  email: string;
  phone: string | null;
  role: string;
}

export interface PatientListItem {
  id: string;
  patientNumber: string;
  name: string;
  gender: string;
  age: number | null;
  phone: string | null;
  whatsapp: string | null;
  city: string | null;
  chiefComplaint: string | null;
  createdAt: Date | string;
  _count?: {
    prescriptions: number;
    visits: number;
  };
}

export interface PatientDetail extends PatientListItem {
  fatherName: string | null;
  dateOfBirth: Date | string | null;
  email: string | null;
  address: string | null;
  occupation: string | null;
  medicalHistory: string | null;
  familyHistory: string | null;
  allergies: string | null;
  currentMedicines: string | null;
  previousTreatment: string | null;
  notes: string | null;
  prescriptions: PrescriptionSummary[];
  visits: VisitItem[];
}

export interface PrescriptionItemModel {
  id?: string;
  medicineName: string;
  medicineId?: string | null;
  potency: string;
  form?: string | null;
  dose?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  notes?: string | null;
  sortOrder?: number;
}

export interface PrescriptionSummary {
  id: string;
  prescriptionNumber: string;
  prescriptionDate: Date | string;
  chiefComplaint: string | null;
  patientId: string;
  patient?: {
    id: string;
    name: string;
    patientNumber: string;
    gender: string;
    age: number | null;
    phone: string | null;
  };
  doctor?: {
    name: string;
    qualification: string | null;
    registrationNumber: string | null;
  };
  items: PrescriptionItemModel[];
  createdAt: Date | string;
}

export interface PrescriptionDetail extends PrescriptionSummary {
  symptoms: string | null;
  clinicalNotes: string | null;
  generalInstructions: string | null;
  followUpDays: number | null;
  followUpDate: Date | string | null;
  visitId: string | null;
  tenant?: TenantInfo;
}

export interface VisitItem {
  id: string;
  visitNumber: number;
  visitDate: Date | string;
  chiefComplaint: string | null;
  symptoms: string | null;
  diagnosis: string | null;
  notes: string | null;
}

export interface MedicineSuggestion {
  id: string;
  name: string;
  latinName: string | null;
  commonName: string | null;
  abbreviation: string | null;
  category: string | null;
}

export interface DashboardStats {
  totalPatients: number;
  newPatientsThisMonth: number;
  totalPrescriptions: number;
  todayVisits: number;
  recentPatients: PatientListItem[];
  recentPrescriptions: PrescriptionSummary[];
}
