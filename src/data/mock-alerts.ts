import type { AlertTone } from "@/components/design-system";

export type AlertSeverity = Extract<AlertTone, "critical" | "warning" | "info">;

export type CareAlert = {
  id: string;
  severity: AlertSeverity;
  patientName: string;
  title: string;
  description: string;
  time: string;
};

export const MOCK_ALERTS: CareAlert[] = [
  {
    id: "a1",
    severity: "critical",
    patientName: "Maria Santos",
    title: "Pain level 8/10 — Maria Santos",
    description:
      "Patient reported severe pain at 9:42 AM. Nurse callback is pending. Immediate escalation required.",
    time: "9:42 AM",
  },
  {
    id: "a2",
    severity: "critical",
    patientName: "John Okafor",
    title: "Elevated blood pressure — John Okafor",
    description:
      "BP reading 158/96 mmHg recorded at 11:02 AM. Recheck scheduled. Medication review may be needed.",
    time: "11:02 AM",
  },
  {
    id: "a3",
    severity: "warning",
    patientName: "Tunde Adeyemi",
    title: "Ankle oedema observed — Tunde Adeyemi",
    description:
      "Mild bilateral ankle swelling noted at 11:50 AM. Fluid intake restricted. Family notified.",
    time: "11:50 AM",
  },
  {
    id: "a4",
    severity: "info",
    patientName: "Grace Afolabi",
    title: "Upcoming visit — Grace Afolabi",
    description:
      "Home visit scheduled for 1:00 PM. Speech therapy session follows at 2:00 PM. No prep notes on file.",
    time: "12:30 PM",
  },
];
