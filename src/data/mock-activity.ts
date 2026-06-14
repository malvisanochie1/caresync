export type ActivityType =
  | "log"
  | "visit_start"
  | "visit_complete"
  | "escalation"
  | "vitals"
  | "note";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  caregiver: string;
  patientName: string;
  description: string;
  time: string;
};

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "act1",
    type: "escalation",
    caregiver: "Chioma Eze",
    patientName: "Maria Santos",
    description: "Escalation raised — pain level 8/10. Supervisor notified.",
    time: "9:42 AM",
  },
  {
    id: "act2",
    type: "vitals",
    caregiver: "Bisi Adeyemi",
    patientName: "John Okafor",
    description: "Vitals logged: BP 158/96 mmHg, pulse 88 bpm.",
    time: "11:02 AM",
  },
  {
    id: "act3",
    type: "visit_complete",
    caregiver: "Ngozi Obi",
    patientName: "Adaeze Nwosu",
    description: "Morning visit completed. Mobility check passed.",
    time: "9:30 AM",
  },
  {
    id: "act4",
    type: "log",
    caregiver: "Bisi Adeyemi",
    patientName: "Emeka Eze",
    description: "Oxygen saturation logged: SpO₂ 97%. No intervention needed.",
    time: "10:00 AM",
  },
  {
    id: "act5",
    type: "note",
    caregiver: "Chioma Eze",
    patientName: "Tunde Adeyemi",
    description: "Fluid restriction note added. Family informed of dietary guidelines.",
    time: "11:52 AM",
  },
  {
    id: "act6",
    type: "visit_start",
    caregiver: "Ngozi Obi",
    patientName: "Maria Santos",
    description: "Home visit started. Patient anxious — requested pain relief.",
    time: "9:15 AM",
  },
];
