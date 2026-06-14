import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ContentContainer,
  PageHeader,
  Stack,
} from "@/components/design-system";

import { CareLogForm } from "@/components/care-logs/care-log-form";

export default async function NewCareLogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { patientId } = await searchParams;
  const initialPatientId = typeof patientId === "string" ? patientId : "";

  return (
    <ContentContainer maxWidth="lg" noPadding>
      <Stack gap="xl">
        <PageHeader
          eyebrow="Care logs"
          title="New care log"
          description="Record vitals, medication, and care notes for this visit."
          actions={
            <Button type="button" size="sm" variant="outline" asChild>
              <Link href="/care-logs">All logs</Link>
            </Button>
          }
        />

        <CareLogForm initialPatientId={initialPatientId} />
      </Stack>
    </ContentContainer>
  );
}
