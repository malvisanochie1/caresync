import {
  PrismaClient,
  UserRole,
  CareStatus,
  MobilityLevel,
  CareLogStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CareSync database...");

  // Clear in reverse dependency order before re-seeding
  await prisma.careLog.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  // ── Users / Caregivers ──────────────────────────────────────────────────────

  const ngozi = await prisma.user.create({
    data: {
      name: "Ngozi Obi",
      email: "ngozi.obi@caresync.ng",
      role: UserRole.PSW,
    },
  });

  const bisi = await prisma.user.create({
    data: {
      name: "Bisi Adeyemi",
      email: "bisi.adeyemi@caresync.ng",
      role: UserRole.PSW,
    },
  });

  const chioma = await prisma.user.create({
    data: {
      name: "Chioma Eze",
      email: "chioma.eze@caresync.ng",
      role: UserRole.NURSE,
    },
  });

  // ── Patients ────────────────────────────────────────────────────────────────

  const adaeze = await prisma.patient.create({
    data: {
      name: "Adaeze Nwosu",
      age: 62,
      location: "Home visit",
      address: "14 Adeola Close, Ikeja, Lagos",
      visitTime: "8:00 AM",
      status: CareStatus.STABLE,
      condition: "Hypertension",
      note: "Vitals within range. Mobility check completed.",
      lastCheck: "Today · 9:15 AM",
      nextVisit: "Tuesday, 17 Jun 2026 · 8:00 AM",
      emergencyContactName: "Chukwudi Nwosu (son)",
      emergencyContactPhone: "+234 803 456 7890",
      medicalSummary:
        "Diagnosed with hypertension in 2019. Currently on Amlodipine 5 mg and Lisinopril 10 mg. BP is generally well-controlled with dietary management and medication compliance.",
      allergies: ["Penicillin", "Sulfonamides"],
      mobilityLevel: MobilityLevel.INDEPENDENT,
      assignedCaregiverId: ngozi.id,
    },
  });

  const john = await prisma.patient.create({
    data: {
      name: "John Okafor",
      age: 57,
      location: "Home visit",
      address: "32 Bode Thomas Street, Surulere, Lagos",
      visitTime: "10:30 AM",
      status: CareStatus.ATTENTION,
      condition: "Type 2 Diabetes",
      note: "Slight elevation in BP. Recheck scheduled in 30 minutes.",
      lastCheck: "Today · 11:02 AM",
      nextVisit: "Monday, 16 Jun 2026 · 10:30 AM",
      emergencyContactName: "Amaka Okafor (wife)",
      emergencyContactPhone: "+234 806 789 0123",
      medicalSummary:
        "Type 2 Diabetes diagnosed 2016. On Metformin 1000 mg twice daily. Most recent HbA1c 7.8%. Foot care checks ongoing. BP trending slightly high this week.",
      allergies: ["Aspirin"],
      mobilityLevel: MobilityLevel.INDEPENDENT,
      assignedCaregiverId: bisi.id,
    },
  });

  const maria = await prisma.patient.create({
    data: {
      name: "Maria Santos",
      age: 74,
      location: "Home visit",
      address: "5 Marina Road, Lagos Island",
      visitTime: "9:15 AM",
      status: CareStatus.CRITICAL,
      condition: "Post-op recovery",
      note: "Pain level 8/10. Awaiting nurse callback.",
      lastCheck: "Today · 9:42 AM",
      nextVisit: "Sunday, 15 Jun 2026 · 9:00 AM",
      emergencyContactName: "Carlos Santos (husband)",
      emergencyContactPhone: "+234 701 234 5678",
      medicalSummary:
        "Post-operative recovery following hip replacement surgery on 8 June 2026. Pain management in progress. Wound is healing with no signs of infection. Physiotherapy starts next week.",
      allergies: ["Codeine", "Latex"],
      mobilityLevel: MobilityLevel.DEPENDENT,
      assignedCaregiverId: chioma.id,
    },
  });

  const emeka = await prisma.patient.create({
    data: {
      name: "Emeka Eze",
      age: 68,
      location: "Room 4B",
      address: "Lagos Community Care Centre, Yaba",
      visitTime: "7:30 AM",
      status: CareStatus.STABLE,
      condition: "COPD",
      note: "Oxygen saturation 97%. No respiratory distress noted.",
      lastCheck: "Today · 10:00 AM",
      nextVisit: "Monday, 16 Jun 2026 · 7:30 AM",
      emergencyContactName: "Obiageli Eze (daughter)",
      emergencyContactPhone: "+234 805 678 9012",
      medicalSummary:
        "COPD Stage II. On Tiotropium inhaler (18 mcg daily) and Salbutamol PRN. SpO₂ target ≥ 95%. Smoking cessation programme completed 2022. Stable on current regimen.",
      allergies: ["None documented"],
      mobilityLevel: MobilityLevel.ASSISTED,
      assignedCaregiverId: bisi.id,
    },
  });

  const grace = await prisma.patient.create({
    data: {
      name: "Grace Afolabi",
      age: 66,
      location: "Home visit",
      address: "22 Allen Avenue, Ikeja, Lagos",
      visitTime: "1:00 PM",
      status: CareStatus.PENDING,
      condition: "Stroke rehabilitation",
      note: "Visit not yet started. Speech therapy session follows at 2:00 PM.",
      lastCheck: "Yesterday · 3:00 PM",
      nextVisit: "Saturday, 14 Jun 2026 · 1:00 PM",
      emergencyContactName: "Kolade Afolabi (husband)",
      emergencyContactPhone: "+234 802 345 6789",
      medicalSummary:
        "Recovering from ischaemic stroke (May 2026). Left-sided weakness with moderate speech impairment. Speech therapy is progressing well. Anticoagulation therapy closely monitored.",
      allergies: ["Warfarin sensitivity — dose carefully monitored"],
      mobilityLevel: MobilityLevel.ASSISTED,
      assignedCaregiverId: ngozi.id,
    },
  });

  const tunde = await prisma.patient.create({
    data: {
      name: "Tunde Adeyemi",
      age: 71,
      location: "Home visit",
      address: "9 Glover Road, Ikoyi, Lagos",
      visitTime: "11:45 AM",
      status: CareStatus.ATTENTION,
      condition: "Congestive heart failure",
      note: "Mild ankle oedema observed. Fluid intake restricted to 1.5 L per day.",
      lastCheck: "Today · 11:50 AM",
      nextVisit: "Monday, 16 Jun 2026 · 11:45 AM",
      emergencyContactName: "Folashade Adeyemi (daughter)",
      emergencyContactPhone: "+234 809 123 4567",
      medicalSummary:
        "Congestive heart failure, NYHA Class II. On Furosemide 40 mg, Carvedilol 6.25 mg, and Ramipril 5 mg. Fluid restriction 1.5 L/day. Daily weight monitoring in place.",
      allergies: ["ACE inhibitor cough — managed with dose adjustment"],
      mobilityLevel: MobilityLevel.ASSISTED,
      assignedCaregiverId: chioma.id,
    },
  });

  // ── Care Logs ───────────────────────────────────────────────────────────────

  await prisma.careLog.create({
    data: {
      patientId: adaeze.id,
      caregiverId: ngozi.id,
      visitTime: "8:00 AM",
      medicationGiven: true,
      medicationTime: "8:15 AM",
      bloodPressure: "128/82 mmHg",
      bloodSugar: "5.1 mmol/L",
      temperature: "36.7 °C",
      mobilityNotes:
        "Patient walked to bathroom independently. No assistance required.",
      dietaryNotes: "Ate full breakfast. Good appetite. No nausea reported.",
      careNotes:
        "Vitals stable and within target range. Patient in good spirits. Medication compliance confirmed. No concerns.",
      status: CareLogStatus.SUBMITTED,
      createdAt: new Date("2026-06-14T09:30:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: john.id,
      caregiverId: bisi.id,
      visitTime: "10:30 AM",
      medicationGiven: true,
      medicationTime: "10:45 AM",
      bloodPressure: "158/96 mmHg",
      bloodSugar: "8.3 mmol/L",
      temperature: "37.1 °C",
      mobilityNotes:
        "Moving around home without difficulty. Wearing compression socks as instructed.",
      dietaryNotes:
        "Skipped breakfast. Encouraged fluid intake. Light snack provided at 10:00 AM.",
      careNotes:
        "BP elevated above target. Rechecked after 20 minutes — 154/94 mmHg. Supervisor informed. Medication reviewed. Recheck scheduled.",
      status: CareLogStatus.FLAGGED,
      createdAt: new Date("2026-06-14T11:02:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: maria.id,
      caregiverId: chioma.id,
      visitTime: "9:15 AM",
      medicationGiven: false,
      medicationTime: null,
      bloodPressure: "110/70 mmHg",
      bloodSugar: "",
      temperature: "37.5 °C",
      mobilityNotes:
        "Bedbound. Repositioned every 2 hours. Pressure area checks completed with no breakdown noted.",
      dietaryNotes:
        "Sips of water only. No solid food tolerated due to post-op nausea.",
      careNotes:
        "Patient in severe pain (8/10). Requested pain relief. Escalation raised and supervisor notified at 9:42 AM. Wound dressing intact and clean. Nurse callback pending.",
      status: CareLogStatus.FLAGGED,
      createdAt: new Date("2026-06-14T09:42:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: emeka.id,
      caregiverId: bisi.id,
      visitTime: "7:30 AM",
      medicationGiven: true,
      medicationTime: "7:35 AM",
      bloodPressure: "122/78 mmHg",
      bloodSugar: "",
      temperature: "36.9 °C",
      mobilityNotes:
        "Assisted transfer from bed to chair. Good balance with walking frame during short walk.",
      dietaryNotes:
        "Full breakfast eaten. Drinks adequately throughout morning. No dietary concerns.",
      careNotes:
        "SpO₂ 97% on room air. Tiotropium inhaler administered as scheduled. No respiratory distress observed. Patient cooperative and comfortable.",
      status: CareLogStatus.SUBMITTED,
      createdAt: new Date("2026-06-14T10:00:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: tunde.id,
      caregiverId: chioma.id,
      visitTime: "11:45 AM",
      medicationGiven: true,
      medicationTime: "11:55 AM",
      bloodPressure: "138/88 mmHg",
      bloodSugar: "",
      temperature: "36.6 °C",
      mobilityNotes:
        "Walked to kitchen with supervision. Mild bilateral ankle oedema noted.",
      dietaryNotes:
        "Fluid intake 600 mL so far today. Low sodium meal provided. Reminded of 1.5 L daily limit.",
      careNotes:
        "Oedema present in both ankles. Daily weight: 78.4 kg, up 0.6 kg from yesterday. Fluid restriction reinforced. Furosemide administered. Family informed of dietary guidelines.",
      status: CareLogStatus.PENDING_REVIEW,
      createdAt: new Date("2026-06-14T11:52:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: adaeze.id,
      caregiverId: ngozi.id,
      visitTime: "6:00 PM",
      medicationGiven: true,
      medicationTime: "6:10 PM",
      bloodPressure: "125/80 mmHg",
      bloodSugar: "4.9 mmol/L",
      temperature: "36.5 °C",
      mobilityNotes:
        "Evening walk completed without incident. No falls or near-misses.",
      dietaryNotes:
        "Good appetite at dinner. Hydration adequate throughout the day.",
      careNotes:
        "BP well controlled throughout the day. Evening medication administered on schedule. Patient reports feeling well. No concerns to flag.",
      status: CareLogStatus.SUBMITTED,
      createdAt: new Date("2026-06-14T18:15:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: grace.id,
      caregiverId: ngozi.id,
      visitTime: "3:00 PM",
      medicationGiven: true,
      medicationTime: "3:05 PM",
      bloodPressure: "132/84 mmHg",
      bloodSugar: "",
      temperature: "36.8 °C",
      mobilityNotes:
        "Assisted with standing exercises. Left-side weakness noted but improving. Used quad cane.",
      dietaryNotes:
        "Good appetite. Adequate hydration. No swallowing difficulties observed.",
      careNotes:
        "Anticoagulation medication administered. PT exercises completed per plan. Speech noticeably clearer than previous session.",
      status: CareLogStatus.SUBMITTED,
      createdAt: new Date("2026-06-13T15:00:00"),
    },
  });

  await prisma.careLog.create({
    data: {
      patientId: maria.id,
      caregiverId: chioma.id,
      visitTime: "2:00 PM",
      medicationGiven: true,
      medicationTime: "2:10 PM",
      bloodPressure: "108/68 mmHg",
      bloodSugar: "",
      temperature: "37.3 °C",
      mobilityNotes:
        "Repositioned. Wound checked and redressed. No signs of infection.",
      dietaryNotes: "Tolerated small amount of broth. Encouraged oral fluids.",
      careNotes:
        "Pain reduced to 5/10 following intervention. Nurse callback completed. Pain management plan reviewed and updated. Patient more settled.",
      status: CareLogStatus.PENDING_REVIEW,
      createdAt: new Date("2026-06-14T14:00:00"),
    },
  });

  console.log("Seed complete: 3 users, 6 patients, 8 care logs.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
