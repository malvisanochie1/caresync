import type { CareStatus } from "@/components/design-system";

export type MobilityLevel = "independent" | "assisted" | "dependent";

export type Patient = {
  id: string;
  name: string;
  age: number;
  location: string;
  address: string;
  visitTime: string;
  status: CareStatus;
  condition: string;
  note: string;
  lastCheck: string;
  nextVisit: string;
  assignedCaregiver: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalSummary: string;
  allergies: string[];
  mobilityLevel: MobilityLevel;
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Adaeze Nwosu",
    age: 62,
    location: "Home visit",
    address: "14 Adeola Close, Ikeja, Lagos",
    visitTime: "8:00 AM",
    status: "stable",
    condition: "Hypertension",
    note: "Vitals within range. Mobility check completed.",
    lastCheck: "Today · 9:15 AM",
    nextVisit: "Tuesday, 17 Jun 2026 · 8:00 AM",
    assignedCaregiver: "Ngozi Obi",
    emergencyContactName: "Chukwudi Nwosu (son)",
    emergencyContactPhone: "+234 803 456 7890",
    medicalSummary:
      "Diagnosed with hypertension in 2019. Currently on Amlodipine 5 mg and Lisinopril 10 mg. BP is generally well-controlled with dietary management and medication compliance.",
    allergies: ["Penicillin", "Sulfonamides"],
    mobilityLevel: "independent",
  },
  {
    id: "p2",
    name: "John Okafor",
    age: 57,
    location: "Home visit",
    address: "32 Bode Thomas Street, Surulere, Lagos",
    visitTime: "10:30 AM",
    status: "attention",
    condition: "Type 2 Diabetes",
    note: "Slight elevation in BP. Recheck scheduled in 30 minutes.",
    lastCheck: "Today · 11:02 AM",
    nextVisit: "Monday, 16 Jun 2026 · 10:30 AM",
    assignedCaregiver: "Bisi Adeyemi",
    emergencyContactName: "Amaka Okafor (wife)",
    emergencyContactPhone: "+234 806 789 0123",
    medicalSummary:
      "Type 2 Diabetes diagnosed 2016. On Metformin 1000 mg twice daily. Most recent HbA1c 7.8%. Foot care checks ongoing. BP trending slightly high this week.",
    allergies: ["Aspirin"],
    mobilityLevel: "independent",
  },
  {
    id: "p3",
    name: "Maria Santos",
    age: 74,
    location: "Home visit",
    address: "5 Marina Road, Lagos Island",
    visitTime: "9:15 AM",
    status: "critical",
    condition: "Post-op recovery",
    note: "Pain level 8/10. Awaiting nurse callback.",
    lastCheck: "Today · 9:42 AM",
    nextVisit: "Sunday, 15 Jun 2026 · 9:00 AM",
    assignedCaregiver: "Chioma Eze",
    emergencyContactName: "Carlos Santos (husband)",
    emergencyContactPhone: "+234 701 234 5678",
    medicalSummary:
      "Post-operative recovery following hip replacement surgery on 8 June 2026. Pain management in progress. Wound is healing with no signs of infection. Physiotherapy starts next week.",
    allergies: ["Codeine", "Latex"],
    mobilityLevel: "dependent",
  },
  {
    id: "p4",
    name: "Emeka Eze",
    age: 68,
    location: "Room 4B",
    address: "Lagos Community Care Centre, Yaba",
    visitTime: "7:30 AM",
    status: "stable",
    condition: "COPD",
    note: "Oxygen saturation 97%. No respiratory distress noted.",
    lastCheck: "Today · 10:00 AM",
    nextVisit: "Monday, 16 Jun 2026 · 7:30 AM",
    assignedCaregiver: "Bisi Adeyemi",
    emergencyContactName: "Obiageli Eze (daughter)",
    emergencyContactPhone: "+234 805 678 9012",
    medicalSummary:
      "COPD Stage II. On Tiotropium inhaler (18 mcg daily) and Salbutamol PRN. SpO₂ target ≥ 95%. Smoking cessation programme completed 2022. Stable on current regimen.",
    allergies: ["None documented"],
    mobilityLevel: "assisted",
  },
  {
    id: "p5",
    name: "Grace Afolabi",
    age: 66,
    location: "Home visit",
    address: "22 Allen Avenue, Ikeja, Lagos",
    visitTime: "1:00 PM",
    status: "pending",
    condition: "Stroke rehabilitation",
    note: "Visit not yet started. Speech therapy session follows at 2:00 PM.",
    lastCheck: "Yesterday · 3:00 PM",
    nextVisit: "Saturday, 14 Jun 2026 · 1:00 PM",
    assignedCaregiver: "Ngozi Obi",
    emergencyContactName: "Kolade Afolabi (husband)",
    emergencyContactPhone: "+234 802 345 6789",
    medicalSummary:
      "Recovering from ischaemic stroke (May 2026). Left-sided weakness with moderate speech impairment. Speech therapy is progressing well. Anticoagulation therapy closely monitored.",
    allergies: ["Warfarin sensitivity — dose carefully monitored"],
    mobilityLevel: "assisted",
  },
  {
    id: "p6",
    name: "Tunde Adeyemi",
    age: 71,
    location: "Home visit",
    address: "9 Glover Road, Ikoyi, Lagos",
    visitTime: "11:45 AM",
    status: "attention",
    condition: "Congestive heart failure",
    note: "Mild ankle oedema observed. Fluid intake restricted to 1.5 L per day.",
    lastCheck: "Today · 11:50 AM",
    nextVisit: "Monday, 16 Jun 2026 · 11:45 AM",
    assignedCaregiver: "Chioma Eze",
    emergencyContactName: "Folashade Adeyemi (daughter)",
    emergencyContactPhone: "+234 809 123 4567",
    medicalSummary:
      "Congestive heart failure, NYHA Class II. On Furosemide 40 mg, Carvedilol 6.25 mg, and Ramipril 5 mg. Fluid restriction 1.5 L/day. Daily weight monitoring in place.",
    allergies: ["ACE inhibitor cough — managed with dose adjustment"],
    mobilityLevel: "assisted",
  },
];
