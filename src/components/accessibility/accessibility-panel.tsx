"use client";

import {
  AlignJustify,
  BookOpen,
  Crosshair,
  Eye,
  Palette,
  RotateCcw,
  Settings2,
  Sun,
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
  type AccessibilitySettings,
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
        "rounded-full border px-3 py-1.5 text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
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
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard() {
  return (
    <div
      aria-label="Live accessibility preview"
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

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings } = useAccessibility();

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
      <div className="fixed bottom-6 right-6 z-40">
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
