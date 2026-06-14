"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormFieldGroup,
  FormSection,
  ResponsiveGrid,
  Stack,
  SuccessAlert,
} from "@/components/design-system";

import { MOCK_PATIENTS } from "@/data/mock-patients";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormValues = {
  patientId: string;
  visitTime: string;
  medicationGiven: boolean;
  medicationTime: string;
  bloodPressure: string;
  bloodSugar: string;
  temperature: string;
  mobilityNotes: string;
  dietaryNotes: string;
  careNotes: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  patientId: "",
  visitTime: "",
  medicationGiven: false,
  medicationTime: "",
  bloodPressure: "",
  bloodSugar: "",
  temperature: "",
  mobilityNotes: "",
  dietaryNotes: "",
  careNotes: "",
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.patientId) {
    errors.patientId = "Please select a patient.";
  }
  if (!values.visitTime.trim()) {
    errors.visitTime = "Visit time is required.";
  }
  if (!values.bloodPressure.trim()) {
    errors.bloodPressure = "Blood pressure is required.";
  }
  if (!values.temperature.trim()) {
    errors.temperature = "Temperature is required.";
  }
  if (!values.careNotes.trim()) {
    errors.careNotes = "Care notes are required.";
  }

  return errors;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface CareLogFormProps {
  initialPatientId: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CareLogForm({ initialPatientId }: CareLogFormProps) {
  const validInitial = MOCK_PATIENTS.some((p) => p.id === initialPatientId)
    ? initialPatientId
    : "";

  const [values, setValues] = useState<FormValues>({
    ...EMPTY_FORM,
    patientId: validInitial,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validate(values);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorId = Object.keys(newErrors)[0];
      const el = document.getElementById(`clf-${firstErrorId === "patientId" ? "patient" : firstErrorId.replace(/([A-Z])/g, "-$1").toLowerCase()}`);
      el?.focus();
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  function handleReset() {
    setValues({ ...EMPTY_FORM, patientId: validInitial });
    setErrors({});
    setSubmitted(false);
  }

  // ── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    const patient = MOCK_PATIENTS.find((p) => p.id === values.patientId);
    return (
      <Stack gap="lg">
        <SuccessAlert
          title="Care log submitted"
          description={`Log recorded for ${patient?.name ?? "patient"} at ${values.visitTime}. It will appear in the care logs list.`}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" asChild variant="outline">
            <Link href="/care-logs">Back to care logs</Link>
          </Button>
          {patient && (
            <Button type="button" asChild variant="outline">
              <Link href={`/patients/${patient.id}`}>View patient</Link>
            </Button>
          )}
          <Button type="button" onClick={handleReset}>
            Log another
          </Button>
        </div>
      </Stack>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="New care log form">
      <Stack gap="lg">

        {/* Patient & visit */}
        <FormSection
          title="Patient & visit"
          description="Select the patient and record when the visit took place."
        >
          <FormFieldGroup
            label="Patient"
            htmlFor="clf-patient"
            required
            error={errors.patientId}
          >
            <Select
              value={values.patientId}
              onValueChange={(v) => set("patientId", v)}
            >
              <SelectTrigger
                id="clf-patient"
                aria-invalid={!!errors.patientId}
                aria-describedby={
                  errors.patientId ? "clf-patient-error" : undefined
                }
              >
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PATIENTS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — {p.condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormFieldGroup>

          <FormFieldGroup
            label="Visit time"
            htmlFor="clf-visitTime"
            required
            helper="Use the actual start time of the visit."
            error={errors.visitTime}
          >
            <Input
              id="clf-visitTime"
              type="time"
              value={values.visitTime}
              onChange={(e) => set("visitTime", e.target.value)}
              aria-invalid={!!errors.visitTime}
              aria-describedby={
                errors.visitTime ? "clf-visitTime-error" : "clf-visitTime-helper"
              }
            />
          </FormFieldGroup>
        </FormSection>

        {/* Medication */}
        <FormSection
          title="Medication"
          description="Record whether medication was administered during this visit."
        >
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              id="clf-medicationGiven"
              checked={values.medicationGiven}
              onChange={(e) => set("medicationGiven", e.target.checked)}
              className="size-4 cursor-pointer accent-primary"
            />
            <span className="text-sm font-medium text-foreground">
              Medication given during this visit
            </span>
          </label>

          {values.medicationGiven && (
            <FormFieldGroup
              label="Medication time"
              htmlFor="clf-medicationTime"
              helper="Time the medication was administered."
            >
              <Input
                id="clf-medicationTime"
                type="time"
                value={values.medicationTime}
                onChange={(e) => set("medicationTime", e.target.value)}
                aria-describedby="clf-medicationTime-helper"
              />
            </FormFieldGroup>
          )}
        </FormSection>

        {/* Vitals */}
        <FormSection
          title="Vitals"
          description="Record measured values. Blood pressure and temperature are required."
        >
          <ResponsiveGrid columns={{ base: 1, sm: 2 }} gap="md">
            <FormFieldGroup
              label="Blood pressure"
              htmlFor="clf-bloodPressure"
              required
              helper="e.g. 120/80 mmHg"
              error={errors.bloodPressure}
            >
              <Input
                id="clf-bloodPressure"
                type="text"
                inputMode="text"
                placeholder="120/80 mmHg"
                value={values.bloodPressure}
                onChange={(e) => set("bloodPressure", e.target.value)}
                aria-invalid={!!errors.bloodPressure}
                aria-describedby={
                  errors.bloodPressure
                    ? "clf-bloodPressure-error"
                    : "clf-bloodPressure-helper"
                }
              />
            </FormFieldGroup>

            <FormFieldGroup
              label="Blood sugar"
              htmlFor="clf-bloodSugar"
              helper="e.g. 5.4 mmol/L — leave blank if not measured"
            >
              <Input
                id="clf-bloodSugar"
                type="text"
                inputMode="decimal"
                placeholder="5.4 mmol/L"
                value={values.bloodSugar}
                onChange={(e) => set("bloodSugar", e.target.value)}
                aria-describedby="clf-bloodSugar-helper"
              />
            </FormFieldGroup>

            <FormFieldGroup
              label="Temperature"
              htmlFor="clf-temperature"
              required
              helper="e.g. 36.8 °C"
              error={errors.temperature}
            >
              <Input
                id="clf-temperature"
                type="text"
                inputMode="decimal"
                placeholder="36.8 °C"
                value={values.temperature}
                onChange={(e) => set("temperature", e.target.value)}
                aria-invalid={!!errors.temperature}
                aria-describedby={
                  errors.temperature
                    ? "clf-temperature-error"
                    : "clf-temperature-helper"
                }
              />
            </FormFieldGroup>
          </ResponsiveGrid>
        </FormSection>

        {/* Care notes */}
        <FormSection
          title="Care notes"
          description="Document observations and interventions made during the visit."
        >
          <FormFieldGroup
            label="Mobility notes"
            htmlFor="clf-mobilityNotes"
            helper="Describe the patient's mobility and any assistance provided."
          >
            <Textarea
              id="clf-mobilityNotes"
              rows={3}
              placeholder="e.g. Patient walked to bathroom independently."
              value={values.mobilityNotes}
              onChange={(e) => set("mobilityNotes", e.target.value)}
              aria-describedby="clf-mobilityNotes-helper"
            />
          </FormFieldGroup>

          <FormFieldGroup
            label="Dietary intake"
            htmlFor="clf-dietaryNotes"
            helper="Note what the patient ate and drank, and any concerns."
          >
            <Textarea
              id="clf-dietaryNotes"
              rows={3}
              placeholder="e.g. Full breakfast eaten. Adequate hydration."
              value={values.dietaryNotes}
              onChange={(e) => set("dietaryNotes", e.target.value)}
              aria-describedby="clf-dietaryNotes-helper"
            />
          </FormFieldGroup>

          <FormFieldGroup
            label="Care notes"
            htmlFor="clf-careNotes"
            required
            helper="Summary of the visit, interventions, and any concerns to escalate."
            error={errors.careNotes}
          >
            <Textarea
              id="clf-careNotes"
              rows={4}
              placeholder="e.g. Vitals stable. Patient cooperative. No concerns to flag."
              value={values.careNotes}
              onChange={(e) => set("careNotes", e.target.value)}
              aria-invalid={!!errors.careNotes}
              aria-describedby={
                errors.careNotes
                  ? "clf-careNotes-error"
                  : "clf-careNotes-helper"
              }
            />
          </FormFieldGroup>
        </FormSection>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" asChild>
            <Link href="/care-logs">Cancel</Link>
          </Button>
          <Button type="submit">Submit care log</Button>
        </div>

      </Stack>
    </form>
  );
}
