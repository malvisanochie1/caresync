import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartPulse,
  MapPin,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContentContainer,
  HealthcareCard,
  HealthcareCardBody,
  HealthcareCardFooter,
  HealthcareCardHeader,
  InfoAlert,
  PageHeader,
  ResponsiveGrid,
  SectionHeader,
  Stack,
  StatCard,
  StatusBadge,
  type CareStatus,
} from "@/components/design-system";

import { MOCK_PATIENTS } from "@/data/mock-patients";
import { MOCK_ALERTS } from "@/data/mock-alerts";
import { MOCK_ACTIVITY, type ActivityType } from "@/data/mock-activity";

// ─── Activity feed helpers ────────────────────────────────────────────────────

type ActivityIconConfig = {
  icon: LucideIcon;
  wrapClass: string;
  iconClass: string;
};

const ACTIVITY_ICON: Record<ActivityType, ActivityIconConfig> = {
  escalation: {
    icon: AlertTriangle,
    wrapClass: "bg-destructive/10",
    iconClass: "text-destructive",
  },
  vitals: {
    icon: HeartPulse,
    wrapClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  visit_complete: {
    icon: CheckCircle2,
    wrapClass: "bg-success/10",
    iconClass: "text-success",
  },
  log: {
    icon: ClipboardCheck,
    wrapClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  note: {
    icon: FileText,
    wrapClass: "bg-muted",
    iconClass: "text-muted-foreground",
  },
  visit_start: {
    icon: MapPin,
    wrapClass: "bg-muted",
    iconClass: "text-muted-foreground",
  },
};

// ─── Patient card accent ──────────────────────────────────────────────────────

function toAccent(
  status: CareStatus,
): "stable" | "attention" | "critical" | undefined {
  if (status === "stable" || status === "attention" || status === "critical") {
    return status;
  }
  return undefined;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const criticalCount = MOCK_ALERTS.filter(
    (a) => a.severity === "critical",
  ).length;

  const pendingCount = MOCK_PATIENTS.filter(
    (p) => p.status === "pending",
  ).length;

  const completedCount = MOCK_PATIENTS.filter(
    (p) => p.status === "completed" || p.status === "stable",
  ).length;

  return (
    <ContentContainer maxWidth="xl" noPadding>
      <Stack gap="xl">
        {/* Page header */}
        <PageHeader
          eyebrow="Morning shift · Saturday, 14 June 2026"
          title="Shift Overview"
          description={`${MOCK_PATIENTS.length} active patients · ${criticalCount} critical alert${criticalCount !== 1 ? "s" : ""} requiring attention`}
        />

        {/* ── 1. Shift Summary Stat Cards ───────────────────────────────── */}
        <Stack gap="lg">
          <SectionHeader title="Shift summary" />
          <ResponsiveGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="md">
            <StatCard
              label="Active patients"
              value={MOCK_PATIENTS.length}
              icon={Users}
              trend={{ direction: "up", value: "+2" }}
              helper="vs. last shift"
            />
            <StatCard
              label="Visits completed"
              value={completedCount}
              unit={`of ${MOCK_PATIENTS.length}`}
              icon={ClipboardCheck}
              trend={{ direction: "up", value: "+4" }}
              helper="since 7:00 AM"
            />
            <StatCard
              label="Critical alerts"
              value={criticalCount}
              icon={Activity}
              helper="unresolved this shift"
            />
            <StatCard
              label="Pending visits"
              value={pendingCount}
              icon={HeartPulse}
              helper="yet to start"
            />
          </ResponsiveGrid>
        </Stack>

        {/* ── 2. Critical Alerts Panel ──────────────────────────────────── */}
        <Stack gap="lg">
          <SectionHeader
            title="Alerts"
            description="Critical and warning items require action before end of shift."
            action={
              <Button type="button" size="sm" variant="outline">
                Dismiss all
              </Button>
            }
          />
          <Stack gap="md">
            {MOCK_ALERTS.map((alert) => (
              <InfoAlert
                key={alert.id}
                tone={alert.severity}
                title={alert.title}
                description={alert.description}
                action={
                  alert.severity !== "info" ? (
                    <Button type="button" size="sm" asChild>
                      <Link href={`/patients/${alert.patientId}`}>
                        View patient
                      </Link>
                    </Button>
                  ) : undefined
                }
              />
            ))}
          </Stack>
        </Stack>

        {/* ── 3. Active Patients Grid ───────────────────────────────────── */}
        <Stack gap="lg">
          <SectionHeader
            title="Active patients"
            description="Sorted by visit start time. Accent colour reflects current care status."
            action={
              <Button type="button" size="sm" variant="outline">
                View all
              </Button>
            }
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
                    · Last check {patient.lastCheck}
                  </p>
                </HealthcareCardBody>
                <HealthcareCardFooter>
                  <Button type="button" size="sm" variant="outline" asChild>
                    <Link href={`/care-logs/new?patientId=${patient.id}`}>
                      Add log
                    </Link>
                  </Button>
                  <Button type="button" size="sm" variant="ghost" asChild>
                    <Link href={`/patients/${patient.id}`}>View patient</Link>
                  </Button>
                </HealthcareCardFooter>
              </HealthcareCard>
            ))}
          </ResponsiveGrid>
        </Stack>

        {/* ── 4. Recent Activity Feed ───────────────────────────────────── */}
        <Stack gap="lg">
          <SectionHeader
            title="Recent activity"
            description="All caregiver actions logged this shift."
            action={
              <Button type="button" size="sm" variant="outline" asChild>
                <Link href="/care-logs">View all logs</Link>
              </Button>
            }
          />
          <ul
            aria-label="Recent activity"
            className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card"
          >
            {MOCK_ACTIVITY.map((item) => {
              const config = ACTIVITY_ICON[item.type];
              const Icon = config.icon;
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-4 px-4 py-4 sm:px-5"
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-md ${config.wrapClass}`}
                    aria-hidden="true"
                  >
                    <Icon className={`size-4 ${config.iconClass}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {item.patientName}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.caregiver} · {item.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Stack>
      </Stack>
    </ContentContainer>
  );
}
