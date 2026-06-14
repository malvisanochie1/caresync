import type { CareStatus } from "@/components/design-system";

export type Patient = {
  id: string;
  name: string;
  location: string;
  visitTime: string;
  status: CareStatus;
  condition: string;
  note: string;
  lastCheck: string;
};

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "p1",
    name: "Adaeze Nwosu",
    location: "Home visit",
    visitTime: "8:00 AM",
    status: "stable",
    condition: "Hypertension",
    note: "Vitals within range. Mobility check completed.",
    lastCheck: "9:15 AM",
  },
  {
    id: "p2",
    name: "John Okafor",
    location: "Home visit",
    visitTime: "10:30 AM",
    status: "attention",
    condition: "Type 2 Diabetes",
    note: "Slight elevation in BP. Recheck scheduled in 30 minutes.",
    lastCheck: "11:02 AM",
  },
  {
    id: "p3",
    name: "Maria Santos",
    location: "Home visit",
    visitTime: "9:15 AM",
    status: "critical",
    condition: "Post-op recovery",
    note: "Pain level 8/10. Awaiting nurse callback.",
    lastCheck: "9:42 AM",
  },
  {
    id: "p4",
    name: "Emeka Eze",
    location: "Room 4B",
    visitTime: "7:30 AM",
    status: "stable",
    condition: "COPD",
    note: "Oxygen saturation 97%. No respiratory distress noted.",
    lastCheck: "10:00 AM",
  },
  {
    id: "p5",
    name: "Grace Afolabi",
    location: "Home visit",
    visitTime: "1:00 PM",
    status: "pending",
    condition: "Stroke rehabilitation",
    note: "Visit not yet started. Speech therapy session follows at 2:00 PM.",
    lastCheck: "Yesterday",
  },
  {
    id: "p6",
    name: "Tunde Adeyemi",
    location: "Home visit",
    visitTime: "11:45 AM",
    status: "attention",
    condition: "Congestive heart failure",
    note: "Mild ankle oedema observed. Fluid intake restricted to 1.5 L per day.",
    lastCheck: "11:50 AM",
  },
];
