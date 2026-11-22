import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedClinicalCases() {
  console.log("🌱 Seeding realistic clinical cases & demo appointments...");

  const tenants = await prisma.tenant.findMany({ select: { id: true } });
  if (tenants.length === 0) {
    console.log("No tenants found.");
    return;
  }

  for (const tenant of tenants) {
    const doctor = await prisma.doctor.findFirst({ where: { tenantId: tenant.id } });
    if (!doctor) continue;

    // 1. Sanath Deo
    const pat1 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0001",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0001",
        name: "Sanath Deo",
        gender: "Male",
        age: 35,
        dateOfBirth: new Date("1989-01-15"),
        phone: "(308) 555-0102",
        whatsapp: "+92 308 5550102",
        city: "Lahore",
        address: "Gulberg III, Main Boulevard",
        occupation: "Software Architect",
        medicalHistory: "Asthma, Hypertension, Seasonal Allergies",
        chiefComplaint: "Health Checkup & Asthmatic Cough (دمہ اور سانس کی تکلیف)",
        notes: "Weight: 59 Kg • Height: 172 cm • Asthmatic wheezing worse at night",
      },
    });

    // 2. Maria Sarafat
    const pat2 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0002",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0002",
        name: "Maria Sarafat",
        gender: "Female",
        age: 28,
        dateOfBirth: new Date("1996-04-12"),
        phone: "(301) 555-0144",
        whatsapp: "+92 301 5550144",
        city: "Islamabad",
        occupation: "Graphic Designer",
        medicalHistory: "Sinusitis, Migraine",
        chiefComplaint: "Cold & Profuse Sneezing (شدید نزلہ، زکام اور چھینکیں)",
      },
    });

    // 3. M.J. Mical
    const pat3 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0003",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0003",
        name: "M.J. Mical",
        gender: "Male",
        age: 44,
        dateOfBirth: new Date("1982-08-20"),
        phone: "(312) 555-0189",
        city: "Karachi",
        occupation: "Business Executive",
        medicalHistory: "Gastric Hyperacidity, Insomnia",
        chiefComplaint: "Health Checkup & Chronic Dyspepsia (معدے کی جلن اور بدہضمی)",
      },
    });

    // 4. Jhon Deo
    const pat4 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0004",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0004",
        name: "Jhon Deo",
        gender: "Male",
        age: 32,
        dateOfBirth: new Date("1994-03-10"),
        phone: "(333) 555-0199",
        city: "Rawalpindi",
        occupation: "Teacher",
        medicalHistory: "Hyperhidrosis, Palpitations",
        chiefComplaint: "Over sweating & Palpitations (زیادہ پسینہ اور گھبراہٹ)",
      },
    });

    // 5. Loeara Phanj
    const pat5 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0005",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0005",
        name: "Loeara Phanj",
        gender: "Female",
        age: 39,
        dateOfBirth: new Date("1987-11-05"),
        phone: "(321) 555-0177",
        city: "Lahore",
        occupation: "Professor",
        medicalHistory: "Hypothyroidism, Fatigue",
        chiefComplaint: "Thyroid Lab Report Review (رپورٹ معائنہ)",
      },
    });

    // 6. Komola Haris
    const pat6 = await prisma.patient.upsert({
      where: {
        tenantId_patientNumber: {
          tenantId: tenant.id,
          patientNumber: "PAT-2026-0006",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientNumber: "PAT-2026-0006",
        name: "Komola Haris",
        gender: "Female",
        age: 50,
        dateOfBirth: new Date("1976-06-18"),
        phone: "(345) 555-0166",
        city: "Faisalabad",
        occupation: "Homemaker",
        medicalHistory: "Cervical Spondylosis",
        chiefComplaint: "Common Cold & Neck Pain (سردی اور گردن کا درد)",
      },
    });

    // Seed Prescriptions
    const rx1 = await prisma.prescription.upsert({
      where: {
        tenantId_prescriptionNumber: {
          tenantId: tenant.id,
          prescriptionNumber: "RX-2026-000001",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientId: pat1.id,
        doctorId: doctor.id,
        prescriptionNumber: "RX-2026-000001",
        prescriptionDate: new Date(),
        chiefComplaint: "Asthmatic Wheezing & Spasmodic Night Cough (دمہ)",
        symptoms: "Worse 1 AM - 3 AM, extreme thirst for small sips of water, anxiety",
        clinicalNotes: "Classical Arsenicum constitution. Maintain warm drinks, avoid cold exposure.",
        generalInstructions: "تلی ہوئی اور ٹھنڈی اشیاء سے پرہیز کریں۔ دوا کھانے سے آدھا گھنٹہ قبل یا بعد لیں۔",
        followUpDays: 14,
        followUpDate: new Date(Date.now() + 14 * 86400000),
        items: {
          create: [
            {
              medicineName: "Arsenicum Album",
              potency: "30C",
              form: "Globules",
              dose: "4 pills",
              frequency: "Three times daily (TDS)",
              duration: "7 days",
              instructions: "Dissolve on tongue before meals (کھانے سے قبل)",
              sortOrder: 0,
            },
            {
              medicineName: "Bryonia Alba",
              potency: "200C",
              form: "Liquid",
              dose: "10 drops",
              frequency: "Morning & Evening (BD)",
              duration: "7 days",
              instructions: "In half cup of lukewarm water (نیم گرم پانی میں)",
              sortOrder: 1,
            },
            {
              medicineName: "Ipecacuanha",
              potency: "30C",
              form: "Globules",
              dose: "4 pills",
              frequency: "As needed during cough",
              duration: "5 days",
              instructions: "Dissolve in mouth",
              sortOrder: 2,
            },
          ],
        },
      },
    });

    const rx2 = await prisma.prescription.upsert({
      where: {
        tenantId_prescriptionNumber: {
          tenantId: tenant.id,
          prescriptionNumber: "RX-2026-000002",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientId: pat2.id,
        doctorId: doctor.id,
        prescriptionNumber: "RX-2026-000002",
        prescriptionDate: new Date(Date.now() - 86400000),
        chiefComplaint: "Acute Coryza, Sneezing & Lachrymation (چھینکیں اور نزلہ)",
        generalInstructions: "بھاپ لیں اور ٹھنڈے پانی سے پرہیز کریں۔",
        followUpDays: 7,
        items: {
          create: [
            {
              medicineName: "Allium Cepa",
              potency: "30C",
              form: "Globules",
              dose: "4 pills",
              frequency: "Three times daily (TDS)",
              duration: "5 days",
              instructions: "Take before meals",
              sortOrder: 0,
            },
            {
              medicineName: "Euphrasia",
              potency: "30C",
              form: "Globules",
              dose: "4 pills",
              frequency: "BD",
              duration: "5 days",
              instructions: "Dissolve under tongue",
              sortOrder: 1,
            },
          ],
        },
      },
    });

    const rx3 = await prisma.prescription.upsert({
      where: {
        tenantId_prescriptionNumber: {
          tenantId: tenant.id,
          prescriptionNumber: "RX-2026-000003",
        },
      },
      update: {},
      create: {
        tenantId: tenant.id,
        patientId: pat3.id,
        doctorId: doctor.id,
        prescriptionNumber: "RX-2026-000003",
        prescriptionDate: new Date(Date.now() - 2 * 86400000),
        chiefComplaint: "Dyspepsia & Hyperacidity after spicy food (تیزابیت)",
        items: {
          create: [
            {
              medicineName: "Nux Vomica",
              potency: "200C",
              form: "Globules",
              dose: "4 pills",
              frequency: "At bedtime (HS)",
              duration: "10 days",
              instructions: "Take before going to sleep (سوتے وقت)",
              sortOrder: 0,
            },
            {
              medicineName: "Lycopodium Clavatum",
              potency: "30C",
              form: "Globules",
              dose: "4 pills",
              frequency: "Once daily in evening (OD)",
              duration: "10 days",
              instructions: "Before evening tea",
              sortOrder: 1,
            },
          ],
        },
      },
    });
  }

  console.log("✅ Seeded clinical cases for all tenants successfully!");
}

seedClinicalCases()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
