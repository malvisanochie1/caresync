import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  HeartPulse,
  Plus,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContentContainer,
  EmptyState,
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

import {
  MOCK_CARE_LOGS,
  type CareLogStatus,
} from "@/data/mock-care-logs";

function toLogAccent(
  status: CareLogStatus,
): "stable" | "attention" | "critical" | undefined {
  if (status === "flagged") return "critical";
  if (status === "pending_review") return "attention";
  return undefined;
}

function toLogBadgeStatus(status: CareLogStatus): CareStatus {
  if (status === "flagged") return "critical";
  if (status === "pending_review") return "pending";
  return "completed";
}

function formatCreatedAt(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CareLogsPage() {
  const totalLogs = MOCK_CARE_LOGS.length;
  const medicationCount = MOCK_CARE_LOGS.filter((l) => l.medicationGiven).length;
  const pendingCount = MOCK_CARE_LOGS.filter(
    (l) => l.status === "pending_review",
  ).length;
  const flaggedCount = MOCK_CARE_LOGS.filter(
    (l) => l.status === "flagged",
  ).length;

  return (
    <ContentContainer maxWidth="xl" noPadding>
      <Stack gap="xl">
        {/* Page header */}
        <PageHeader
          eyebrow="Morning shift · Saturday, 14 June 2026"
          title="Care Logs"
          description="Vitals, medication records, and care notes logged this shift."
          actions={
            <Button type="button" size="sm" asChild>
              <Link href="/care-logs/new">
                <Plus />
                New care log
              </Link>
            </Button>
          }
        />

        {/* Stats */}
        <Stack gap="lg">
          <SectionHeader title="Shift summary" />
          <ResponsiveGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <StatCard
              label="Total logs"
              value={totalLogs}
              icon={ClipboardCheck}
              helper="recorded this shift"
            />
            <StatCard
              label="Medication given"
              value={medicationCount}
              unit={`of ${totalLogs}`}
              icon={CheckCircle2}
              trend={{ direction: "up", value: `${medicationCount}` }}
              helper="visits with medication"
            />
            <StatCard
              label="Pending review"
              value={pendingCount}
              icon={Clock}
              helper="awaiting supervisor sign-off"
            />
            <StatCard
              label="Flagged"
              value={flaggedCount}
              icon={AlertTriangle}
              helper="require follow-up"
            />
          </ResponsiveGrid>
        </Stack>

        {/* Log list */}
        <Stack gap="lg">
          <SectionHeader
            title="All logs"
            description="Most recent entries first. Flagged logs require follow-up before shift end."
            action={
              <Button type="button" size="sm" asChild>
                <Link href="/care-logs/new">
                  <Plus />
                  New log
                </Link>
              </Button>
            }
          />

          {MOCK_CARE_LOGS.length === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title="No logs yet"
              description="Start your shift by adding the first care log."
              action={
                <Button type="button" asChild>
                  <Link href="/care-logs/new">Add first log</Link>
                </Button>
              }
            />
          ) : (
            <ResponsiveGrid columns={{ base: 1, md: 2 }} gap="md">
              {MOCK_CARE_LOGS.map((log) => (
                <HealthcareCard key={log.id} accent={toLogAccent(log.status)}>
                  <HealthcareCardHeader
                    title={log.patientName}
                    subtitle={`${log.caregiver} · ${log.visitTime}`}
                    icon={<Stethoscope className="size-4" />}
                    trailing={
                      <StatusBadge status={toLogBadgeStatus(log.status)} />
                    }
                  />
                  <HealthcareCardBody>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {log.bloodPressure && (
                        <span>
                          <HeartPulse
                            className="mr-1 inline size-3.5"
                            aria-hidden="true"
                          />
                          {log.bloodPressure}
                        </span>
                      )}
                      {log.temperature && (
                        <span>Temp {log.temperature}</span>
                      )}
                      {log.medicationGiven && log.medicationTime && (
                        <span>Meds · {log.medicationTime}</span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {log.careNotes}
                    </p>
                  </HealthcareCardBody>
                  <HealthcareCardFooter>
                    <p className="mr-auto text-xs text-muted-foreground">
                      Logged at {formatCreatedAt(log.createdAt)}
                    </p>
                    <Button type="button" size="sm" variant="ghost" asChild>
                      <Link href={`/patients/${log.patientId}`}>
                        View patient
                      </Link>
                    </Button>
                    <Button type="button" size="sm" variant="outline">
                      View log
                    </Button>
                  </HealthcareCardFooter>
                </HealthcareCard>
              ))}
            </ResponsiveGrid>
          )}
        </Stack>
      </Stack>
    </ContentContainer>
  );
}
