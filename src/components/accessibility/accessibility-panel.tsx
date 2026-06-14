"use client";

import {
  AlignJustify,
  BookOpen,
  Crosshair,
  Eye,
  Layers,
  Palette,
  RotateCcw,
  Settings2,
  Sun,
  TriangleAlert,
  Type,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useAccessibility,
  DEFAULT_SETTINGS,
  type AccessibilitySettings,
  type BackgroundTheme,
} from "@/context/accessibility-context";

// ─── Option button ────────────────────────────────────────────────────────────

interface OptionButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

function OptionButton({ label, active, onClick, className }: OptionButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-2.5 text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
        className,
      )}
    >
      {label}
    </button>
  );
}

// ─── Panel section ────────────────────────────────────────────────────────────

interface PanelSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
}

function PanelSection({
  icon: Icon,
  title,
  description,
  children,
}: PanelSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        <p className="mt-0.5 pl-6 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pl-6">{children}</div>
    </div>
  );
}

// ─── Group divider ────────────────────────────────────────────────────────────

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Array<{
  label: string;
  description: string;
  settings: Partial<AccessibilitySettings>;
}> = [
  {
    label: "Low Vision",
    description: "Large text, dark contrast, strong focus",
    settings: { fontSize: "x-large", contrast: "dark", focus: "extra-strong", spacing: "spacious" },
  },
  {
    label: "Dyslexia",
    description: "Wider spacing, warm cream background",
    settings: { fontStyle: "dyslexia-friendly", fontSize: "large", spacing: "spacious", background: "warm-cream" },
  },
  {
    label: "Night Shift",
    description: "Dark background, reduced motion",
    settings: { background: "low-light", motion: "reduced" },
  },
  {
    label: "Senior",
    description: "Large readable text, spacious layout",
    settings: { fontSize: "x-large", fontStyle: "readable-sans", focus: "strong", spacing: "spacious" },
  },
];

interface PresetButtonProps {
  label: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function PresetButton({ label, description, active, onClick }: PresetButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex flex-col rounded-lg border px-3 py-2.5 text-left",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        active
          ? "border-primary bg-primary/10"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/30",
      )}
    >
      <span className={cn("text-xs font-semibold", active ? "text-primary" : "text-foreground")}>
        {label}
      </span>
      <span className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{description}</span>
    </button>
  );
}

// ─── Light backgrounds where Bright White text is unsafe ──────────────────────

const LIGHT_BACKGROUNDS: BackgroundTheme[] = ["default", "soft-blue", "warm-cream", "calm-green"];

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard() {
  return (
    <div
      aria-label="Live accessibility preview"
      aria-live="polite"
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Live preview
      </p>
      <p className="mt-2 text-base font-semibold text-foreground">
        Adaeze Nwosu
      </p>
      <p className="text-xs text-muted-foreground">
        Stable · Hypertension · Home visit 8:00 AM
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">
        Vitals within range. Medication administered at 8:15 AM. Mobility check
        completed without incident.
      </p>
      <div className="mt-3 flex gap-2">
        <span className="inline-flex items-center rounded-full border border-transparent bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
          Stable
        </span>
        <span className="inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          View patient
        </span>
      </div>
    </div>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────

function isPresetActive(
  presetSettings: Partial<AccessibilitySettings>,
  current: AccessibilitySettings,
): boolean {
  const target = { ...DEFAULT_SETTINGS, ...presetSettings };
  return (Object.keys(target) as (keyof AccessibilitySettings)[]).every(
    (key) => current[key] === target[key],
  );
}

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings, applyPreset } = useAccessibility();

  const activePresetLabel =
    PRESETS.find((p) => isPresetActive(p.settings, settings))?.label ?? null;

  const isCustom =
    activePresetLabel === null &&
    (Object.keys(DEFAULT_SETTINGS) as (keyof AccessibilitySettings)[]).some(
      (key) => settings[key] !== DEFAULT_SETTINGS[key],
    );

  const brightWhiteUnsafe =
    settings.textColor === "bright-white" &&
    LIGHT_BACKGROUNDS.includes(settings.background) &&
    settings.contrast === "off";

  function opt<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
    label: string,
  ) {
    return (
      <OptionButton
        key={String(value)}
        label={label}
        active={settings[key] === value}
        onClick={() => updateSetting(key, value)}
      />
    );
  }

  return (
    <Sheet>
      {/* ── Floating trigger button ──────────────────────────────────────── */}
      <div
        className="fixed z-40"
        style={{
          bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
          right: "calc(1.5rem + env(safe-area-inset-right, 0px))",
        }}
      >
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open accessibility settings"
            className={cn(
              "flex size-12 items-center justify-center rounded-full shadow-lg",
              "bg-primary text-primary-foreground",
              "transition-transform hover:scale-105 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            <Settings2 className="size-5" aria-hidden="true" />
          </button>
        </SheetTrigger>
      </div>

      {/* ── Settings panel ───────────────────────────────────────────────── */}
      <SheetContent
        side="right"
        className="flex w-full flex-col overflow-hidden p-0 sm:max-w-[420px]"
      >
        {/* Panel header */}
        <SheetHeader className="border-b border-border px-5 py-4 pr-12">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">Accessibility</SheetTitle>
            <button
              type="button"
              onClick={resetSettings}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5",
                "text-xs font-medium text-muted-foreground",
                "border border-border bg-card",
                "hover:border-border hover:text-foreground",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
              aria-label="Reset all accessibility settings to defaults"
            >
              <RotateCcw className="size-3" aria-hidden="true" />
              Reset all
            </button>
          </div>
          <SheetDescription className="text-xs">
            Preferences are saved automatically and persist across sessions.
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-5 py-5 pb-10">

            {/* Preview */}
            <PreviewCard />

            {/* ── Quick presets ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-foreground">Quick presets</h3>
                </div>
                <p className="mt-0.5 pl-6 text-xs leading-relaxed text-muted-foreground">
                  Apply a curated set of settings in one tap. Resets to defaults first.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-6">
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.label}
                    label={preset.label}
                    description={preset.description}
                    active={preset.label === activePresetLabel}
                    onClick={() => applyPreset(preset.settings)}
                  />
                ))}
              </div>
              {isCustom && (
                <p className="pl-6 text-[10px] font-medium text-muted-foreground">
                  Custom settings active
                </p>
              )}
            </div>

            {/* ── Text group ─────────────────────────────────────────────── */}
            <GroupLabel label="Text" />

            <PanelSection
              icon={Type}
              title="Font size"
              description="Scale all text up or down. Larger sizes also increase tap targets."
            >
              {opt("fontSize", "small", "Small")}
              {opt("fontSize", "default", "Default")}
              {opt("fontSize", "large", "Large")}
              {opt("fontSize", "x-large", "X-Large")}
              {opt("fontSize", "maximum", "Maximum")}
            </PanelSection>

            <PanelSection
              icon={BookOpen}
              title="Font style"
              description="Change typeface for easier reading. Dyslexia mode adds wider letter and word spacing."
            >
              {opt("fontStyle", "default", "Default")}
              {opt("fontStyle", "readable-sans", "Readable Sans")}
              {opt("fontStyle", "dyslexia-friendly", "Dyslexia")}
              {opt("fontStyle", "mono", "Monospace")}
            </PanelSection>

            {/* ── Colour group ────────────────────────────────────────────── */}
            <GroupLabel label="Colour" />

            <PanelSection
              icon={Sun}
              title="High contrast"
              description="Maximises colour contrast for low vision or bright environments."
            >
              {opt("contrast", "off", "Off")}
              {opt("contrast", "dark", "Dark")}
              {opt("contrast", "light", "Light")}
              {opt("contrast", "yellow", "Yellow")}
            </PanelSection>

            <PanelSection
              icon={Palette}
              title="Background"
              description="Reduce eye strain with a tinted or darker background."
            >
              {opt("background", "default", "Default")}
              {opt("background", "soft-blue", "Soft Blue")}
              {opt("background", "warm-cream", "Warm Cream")}
              {opt("background", "calm-green", "Calm Green")}
              {opt("background", "low-light", "Low Light")}
            </PanelSection>

            <PanelSection
              icon={Eye}
              title="Text colour"
              description="Adjust the body text colour. Pair with a matching background for best results."
            >
              {opt("textColor", "default", "Default")}
              {opt("textColor", "deep-black", "Deep Black")}
              {opt("textColor", "soft-navy", "Soft Navy")}
              {opt("textColor", "warm-brown", "Warm Brown")}
              {opt("textColor", "bright-white", "Bright White")}
            </PanelSection>

            {brightWhiteUnsafe && (
              <div
                role="alert"
                className="ml-6 flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 px-3 py-2.5 text-xs text-warning-foreground"
              >
                <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                <span>
                  Bright White on a light background is nearly invisible. Switch to{" "}
                  <strong className="font-semibold">Low Light</strong> background or a high-contrast mode.
                </span>
              </div>
            )}

            {/* ── Comfort group ───────────────────────────────────────────── */}
            <GroupLabel label="Comfort" />

            <PanelSection
              icon={Zap}
              title="Motion"
              description="Reduce or remove animations and transitions throughout the app."
            >
              {opt("motion", "normal", "Normal")}
              {opt("motion", "reduced", "Reduced")}
              {opt("motion", "none", "None")}
            </PanelSection>

            <PanelSection
              icon={Crosshair}
              title="Focus ring"
              description="Enhance the keyboard focus indicator for easier navigation."
            >
              {opt("focus", "default", "Default")}
              {opt("focus", "strong", "Strong")}
              {opt("focus", "extra-strong", "Maximum")}
            </PanelSection>

            <PanelSection
              icon={AlignJustify}
              title="Spacing"
              description="Adjust the density of cards and sections. Spacious mode adds breathing room."
            >
              {opt("spacing", "compact", "Compact")}
              {opt("spacing", "comfortable", "Comfortable")}
              {opt("spacing", "spacious", "Spacious")}
            </PanelSection>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
