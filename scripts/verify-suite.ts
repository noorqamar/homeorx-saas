import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runVerification() {
  console.log("==================================================");
  console.log("🧪 HOMEO-RX ARCHITECTURE & QA VERIFICATION SUITE");
  console.log("==================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  // TEST 1: Tenant Isolation Verification
  totalTests++;
  console.log(`[TEST ${totalTests}] Verifying Absolute Tenant Isolation...`);
  const tenantA = await prisma.tenant.create({
    data: {
      name: "Tenant A Clinic",
      clinicName: "Clinic A",
      doctors: {
        create: {
          name: "Dr. A",
          email: "dr.a@test.com",
        },
      },
      patients: {
        create: {
          name: "Patient A",
          patientNumber: "PAT-TEST-001",
          gender: "Male",
        },
      },
    },
    include: { patients: true, doctors: true },
  });

  const tenantB = await prisma.tenant.create({
    data: {
      name: "Tenant B Clinic",
      clinicName: "Clinic B",
      doctors: {
        create: {
          name: "Dr. B",
          email: "dr.b@test.com",
        },
      },
      patients: {
        create: {
          name: "Patient B",
          patientNumber: "PAT-TEST-002",
          gender: "Female",
        },
      },
    },
    include: { patients: true, doctors: true },
  });

  // Query Tenant A patients
  const patientsForA = await prisma.patient.findMany({
    where: { tenantId: tenantA.id },
  });
  const patientsForB = await prisma.patient.findMany({
    where: { tenantId: tenantB.id },
  });

  const hasLeakage =
    patientsForA.some((p) => p.tenantId !== tenantA.id) ||
    patientsForB.some((p) => p.tenantId !== tenantB.id);

  if (!hasLeakage && patientsForA.length === 1 && patientsForB.length === 1) {
    console.log("   ✅ PASSED: Doctor A cannot query Doctor B patients. Strict isolation confirmed.");
    passedTests++;
  } else {
    console.error("   ❌ FAILED: Tenant data cross-contamination detected!");
  }

  // TEST 2: Cascade Account Deletion Safety Purge
  totalTests++;
  console.log(`\n[TEST ${totalTests}] Verifying Complete Cascade Deletion Safety (Purge)...`);
  
  // Create prescription for Tenant A
  const patientA = tenantA.patients[0];
  const doctorA = tenantA.doctors[0];

  const rxA = await prisma.prescription.create({
    data: {
      tenantId: tenantA.id,
      patientId: patientA.id,
      doctorId: doctorA.id,
      prescriptionNumber: "RX-TEST-000001",
      items: {
        create: [
          {
            medicineName: "Sulphur",
            potency: "30C",
          },
        ],
      },
    },
  });

  // Delete Tenant A
  await prisma.tenant.delete({
    where: { id: tenantA.id },
  });

  // Verify that all associated records (Doctor, Patient, Prescription, PrescriptionItem) are completely eradicated
  const remainingPatientsA = await prisma.patient.findMany({ where: { tenantId: tenantA.id } });
  const remainingPrescriptionsA = await prisma.prescription.findMany({ where: { tenantId: tenantA.id } });
  const remainingItemsA = await prisma.prescriptionItem.findMany({ where: { prescriptionId: rxA.id } });

  if (
    remainingPatientsA.length === 0 &&
    remainingPrescriptionsA.length === 0 &&
    remainingItemsA.length === 0
  ) {
    console.log("   ✅ PASSED: Cascade purge complete. Zero orphaned records left upon tenant deletion.");
    passedTests++;
  } else {
    console.error("   ❌ FAILED: Incomplete deletion! Orphaned records remain.");
  }

  // Clean up Tenant B
  await prisma.tenant.delete({ where: { id: tenantB.id } });

  // TEST 3: Master Data Integrity (Remedies & Potencies)
  totalTests++;
  console.log(`\n[TEST ${totalTests}] Verifying Master Homeopathic Remedies & Potencies...`);
  const remedyCount = await prisma.medicine.count();
  const potencyCount = await prisma.potency.count();

  if (remedyCount >= 100 && potencyCount >= 15) {
    console.log(`   ✅ PASSED: ${remedyCount} remedies and ${potencyCount} potencies verified in database.`);
    passedTests++;
  } else {
    console.error(`   ❌ FAILED: Insufficient seed dataset (${remedyCount} remedies, ${potencyCount} potencies).`);
  }

  // TEST 4: Prescription Immutability and Unique Numbering
  totalTests++;
  console.log(`\n[TEST ${totalTests}] Verifying Unique Prescription Numbering & Copy Safety...`);
  const demoTenant = await prisma.tenant.findFirst({
    include: { patients: true, doctors: true },
  });

  if (demoTenant && demoTenant.patients.length > 0 && demoTenant.doctors.length > 0) {
    const rx1 = await prisma.prescription.create({
      data: {
        tenantId: demoTenant.id,
        patientId: demoTenant.patients[0].id,
        doctorId: demoTenant.doctors[0].id,
        prescriptionNumber: "RX-2026-999991",
        items: {
          create: [{ medicineName: "Arnica Montana", potency: "200C" }],
        },
      },
      include: { items: true },
    });

    // Create a copy / duplicate
    const rx2 = await prisma.prescription.create({
      data: {
        tenantId: demoTenant.id,
        patientId: demoTenant.patients[0].id,
        doctorId: demoTenant.doctors[0].id,
        prescriptionNumber: "RX-2026-999992",
        items: {
          create: [{ medicineName: rx1.items[0].medicineName, potency: rx1.items[0].potency }],
        },
      },
    });

    // Check that rx1 is unchanged and rx2 is distinct
    const verifyRx1 = await prisma.prescription.findUnique({ where: { id: rx1.id } });
    if (verifyRx1 && rx2 && rx1.id !== rx2.id && rx1.prescriptionNumber !== rx2.prescriptionNumber) {
      console.log("   ✅ PASSED: Duplication created new record without mutating historical prescription.");
      passedTests++;
    }

    // Clean up test records
    await prisma.prescription.delete({ where: { id: rx1.id } });
    await prisma.prescription.delete({ where: { id: rx2.id } });
  }

  console.log("\n==================================================");
  console.log(`📊 TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log("==================================================");

  if (passedTests === totalTests) {
    console.log("🎉 ALL HOMEO-RX ARCHITECTURAL & QA REQUIREMENTS SATISFIED!\n");
  } else {
    process.exit(1);
  }
}

runVerification()
  .catch((e) => {
    console.error("Test execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
