import Link from "next/link";
import { Activity, ClipboardCheck, Stethoscope, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContentContainer,
  HealthcareCard,
  HealthcareCardBody,
  HealthcareCardFooter,
  HealthcareCardHeader,
  PageHeader,
  ResponsiveGrid,
  SectionHeader,
  Stack,
  StatCard,
  StatusBadge,
  type CareStatus,
} from "@/components/design-system";

import { MOCK_PATIENTS } from "@/data/mock-patients";

function toAccent(
  status: CareStatus,
): "stable" | "attention" | "critical" | undefined {
  if (status === "stable" || status === "attention" || status === "critical") {
    return status;
  }
  return undefined;
}

export default function PatientsPage() {
  const criticalCount = MOCK_PATIENTS.filter(
    (p) => p.status === "critical",
  ).length;
  const attentionCount = MOCK_PATIENTS.filter(
    (p) => p.status === "attention",
  ).length;
  const stableCount = MOCK_PATIENTS.filter(
    (p) => p.status === "stable",
  ).length;
  const pendingCount = MOCK_PATIENTS.filter(
    (p) => p.status === "pending",
  ).length;

  return (
    <ContentContainer maxWidth="xl" noPadding>
      <Stack gap="xl">
        {/* Page header */}
        <PageHeader
          eyebrow="Morning shift · Saturday, 14 June 2026"
          title="Patients"
          description={`${MOCK_PATIENTS.length} patients assigned to this shift`}
        />

        {/* Shift stats */}
        <Stack gap="lg">
          <SectionHeader title="Shift breakdown" />
          <ResponsiveGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <StatCard
              label="Total patients"
              value={MOCK_PATIENTS.length}
              icon={Users}
            />
            <StatCard
              label="Critical"
              value={criticalCount}
              icon={Activity}
              helper="require immediate attention"
            />
            <StatCard
              label="Attention"
              value={attentionCount}
              icon={ClipboardCheck}
              helper="monitoring needed"
            />
            <StatCard
              label="Stable"
              value={stableCount}
              icon={Stethoscope}
              helper={`${pendingCount} pending visit${pendingCount !== 1 ? "s" : ""}`}
            />
          </ResponsiveGrid>
        </Stack>

        {/* Patient roster */}
        <Stack gap="lg">
          <SectionHeader
            title="Patient roster"
            description="Select a patient to view their full profile and care history."
          />
          <ResponsiveGrid columns={{ base: 1, md: 2, lg: 3 }} gap="md">
            {MOCK_PATIENTS.map((patient) => (
              <HealthcareCard key={patient.id} accent={toAccent(patient.status)}>
                <HealthcareCardHeader
                  title={patient.name}
                  subtitle={`${patient.location} · ${patient.visitTime}`}
                  icon={<Stethoscope className="size-4" />}
                  trailing={<StatusBadge status={patient.status} />}
                />
                <HealthcareCardBody>
                  <p className="text-sm text-muted-foreground">{patient.note}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {patient.condition}
                    </span>{" "}
                    · {patient.age} yrs · {patient.assignedCaregiver}
                  </p>
                </HealthcareCardBody>
                <HealthcareCardFooter>
                  <Button type="button" size="sm" variant="outline" asChild>
                    <Link href={`/patients/${patient.id}`}>View patient</Link>
                  </Button>
                </HealthcareCardFooter>
              </HealthcareCard>
            ))}
          </ResponsiveGrid>
        </Stack>
      </Stack>
    </ContentContainer>
  );
}
