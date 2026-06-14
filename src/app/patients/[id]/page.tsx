import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  Stethoscope,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContentContainer,
  EmptyState,
  InfoCard,
  PageHeader,
  ResponsiveGrid,
  SectionHeader,
  Stack,
  StatusBadge,
} from "@/components/design-system";

import { MOCK_PATIENTS } from "@/data/mock-patients";
import { MOCK_ACTIVITY, type ActivityType } from "@/data/mock-activity";

export function generateStaticParams() {
  return MOCK_PATIENTS.map((p) => ({ id: p.id }));
}

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

const MOBILITY_LABEL = {
  independent: "Independent",
  assisted: "Assisted",
  dependent: "Dependent",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = MOCK_PATIENTS.find((p) => p.id === id);

  if (!patient) {
    notFound();
  }

  const patientLogs = MOCK_ACTIVITY.filter((a) => a.patientId === id);

  return (
    <ContentContainer maxWidth="xl" noPadding>
      <Stack gap="xl">
        {/* Page header */}
        <PageHeader
          eyebrow="Patient profile"
          title={patient.name}
          description={`${patient.condition} · ${patient.age} years old`}
          actions={
            <>
              <Button type="button" size="sm" variant="outline" asChild>
                <Link href="/patients">
                  <ArrowLeft />
                  All patients
                </Link>
              </Button>
              <Button type="button" size="sm">
                Add log
              </Button>
            </>
          }
        />

        {/* Patient overview */}
        <Stack gap="lg">
          <SectionHeader title="Patient overview" />
          <ResponsiveGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="md">
            <InfoCard
              label="Status"
              value={<StatusBadge status={patient.status} />}
              icon={HeartPulse}
            />
            <InfoCard
              label="Age"
              value={`${patient.age} years old`}
              icon={User}
            />
            <InfoCard
              label="Primary condition"
              value={patient.condition}
              icon={Stethoscope}
            />
            <InfoCard
              label="Address"
              value={patient.address}
              icon={MapPin}
            />
            <InfoCard
              label="Assigned caregiver"
              value={patient.assignedCaregiver}
              icon={Users}
            />
            <InfoCard
              label="Emergency contact"
              value={patient.emergencyContactName}
              description={patient.emergencyContactPhone}
              icon={Phone}
            />
          </ResponsiveGrid>
        </Stack>

        {/* Care summary */}
        <Stack gap="lg">
          <SectionHeader title="Care summary" />
          <ResponsiveGrid columns={{ base: 1, sm: 2 }} gap="md">
            <InfoCard
              label="Last check"
              value={patient.lastCheck}
              icon={Clock}
            />
            <InfoCard
              label="Next visit"
              value={patient.nextVisit}
              icon={Calendar}
            />
            <InfoCard
              label="Mobility level"
              value={MOBILITY_LABEL[patient.mobilityLevel]}
              icon={Activity}
            />
            <InfoCard
              label="Allergies"
              value={patient.allergies.join(" · ")}
              icon={AlertCircle}
            />
          </ResponsiveGrid>
          <InfoCard
            label="Medical summary"
            value={
              <span className="font-normal leading-relaxed">
                {patient.medicalSummary}
              </span>
            }
            icon={FileText}
          />
        </Stack>

        {/* Recent logs preview */}
        <Stack gap="lg">
          <SectionHeader
            title="Recent logs"
            description="Activity recorded for this patient during the current shift."
          />
          {patientLogs.length === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title="No logs yet"
              description="No activity has been recorded for this patient during this shift."
              action={<Button type="button">Add first log</Button>}
            />
          ) : (
            <ul
              aria-label="Recent logs"
              className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card"
            >
              {patientLogs.map((item) => {
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
                      <p className="text-sm leading-relaxed text-muted-foreground">
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
          )}
        </Stack>
      </Stack>
    </ContentContainer>
  );
}
