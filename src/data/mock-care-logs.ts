export type CareLogStatus = "submitted" | "pending_review" | "flagged";

export type CareLog = {
  id: string;
  patientId: string;
  patientName: string;
  caregiver: string;
  visitTime: string;
  medicationGiven: boolean;
  medicationTime: string | null;
  bloodPressure: string;
  bloodSugar: string;
  temperature: string;
  mobilityNotes: string;
  dietaryNotes: string;
  careNotes: string;
  status: CareLogStatus;
  createdAt: string;
};

export const MOCK_CARE_LOGS: CareLog[] = [
  {
    id: "cl1",
    patientId: "p1",
    patientName: "Adaeze Nwosu",
    caregiver: "Ngozi Obi",
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
    status: "submitted",
    createdAt: "2026-06-14T09:30:00",
  },
  {
    id: "cl2",
    patientId: "p2",
    patientName: "John Okafor",
    caregiver: "Bisi Adeyemi",
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
    status: "flagged",
    createdAt: "2026-06-14T11:02:00",
  },
  {
    id: "cl3",
    patientId: "p3",
    patientName: "Maria Santos",
    caregiver: "Chioma Eze",
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
    status: "flagged",
    createdAt: "2026-06-14T09:42:00",
  },
  {
    id: "cl4",
    patientId: "p4",
    patientName: "Emeka Eze",
    caregiver: "Bisi Adeyemi",
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
    status: "submitted",
    createdAt: "2026-06-14T10:00:00",
  },
  {
    id: "cl5",
    patientId: "p6",
    patientName: "Tunde Adeyemi",
    caregiver: "Chioma Eze",
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
    status: "pending_review",
    createdAt: "2026-06-14T11:52:00",
  },
  {
    id: "cl6",
    patientId: "p1",
    patientName: "Adaeze Nwosu",
    caregiver: "Ngozi Obi",
    visitTime: "6:00 PM",
    medicationGiven: true,
    medicationTime: "6:10 PM",
    bloodPressure: "125/80 mmHg",
    bloodSugar: "4.9 mmol/L",
    temperature: "36.5 °C",
    mobilityNotes: "Evening walk completed without incident. No falls or near-misses.",
    dietaryNotes: "Good appetite at dinner. Hydration adequate throughout the day.",
    careNotes:
      "BP well controlled throughout the day. Evening medication administered on schedule. Patient reports feeling well. No concerns to flag.",
    status: "submitted",
    createdAt: "2026-06-14T18:15:00",
  },
];
