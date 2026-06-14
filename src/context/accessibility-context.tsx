"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// ─── Setting types ────────────────────────────────────────────────────────────

export type FontSize = "small" | "default" | "large" | "x-large" | "maximum";
export type FontStyle = "default" | "readable-sans" | "dyslexia-friendly" | "mono";
export type ContrastMode = "off" | "dark" | "light" | "yellow";
export type BackgroundTheme =
  | "default"
  | "soft-blue"
  | "warm-cream"
  | "calm-green"
  | "low-light";
export type TextColor =
  | "default"
  | "deep-black"
  | "soft-navy"
  | "warm-brown"
  | "bright-white";
export type MotionSetting = "normal" | "reduced" | "none";
export type FocusSetting = "default" | "strong" | "extra-strong";
export type SpacingSetting = "compact" | "comfortable" | "spacious";

export interface AccessibilitySettings {
  fontSize: FontSize;
  fontStyle: FontStyle;
  contrast: ContrastMode;
  background: BackgroundTheme;
  textColor: TextColor;
  motion: MotionSetting;
  focus: FocusSetting;
  spacing: SpacingSetting;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: "default",
  fontStyle: "default",
  contrast: "off",
  background: "default",
  textColor: "default",
  motion: "normal",
  focus: "default",
  spacing: "comfortable",
};

const STORAGE_KEY = "caresync-a11y-v1";

// ─── Context ──────────────────────────────────────────────────────────────────

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  resetSettings: () => void;
  applyPreset: (partial: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...(JSON.parse(stored) as Partial<AccessibilitySettings>) };
      }
    } catch {
      // ignore parse errors
    }
    // No stored preference — honour system motion preference as initial default
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return { ...DEFAULT_SETTINGS, motion: prefersReduced ? "reduced" : DEFAULT_SETTINGS.motion };
  });

  // Apply data attributes to <html> whenever settings change
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.fontSize = settings.fontSize;
    root.dataset.fontStyle = settings.fontStyle;
    root.dataset.contrast = settings.contrast;
    root.dataset.background = settings.background;
    root.dataset.text = settings.textColor;
    root.dataset.motion = settings.motion;
    root.dataset.focus = settings.focus;
    root.dataset.spacing = settings.spacing;
  }, [settings]);

  // Persist to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors (private browsing, quota)
    }
  }, [settings]);

  function updateSetting<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function resetSettings() {
    setSettings(DEFAULT_SETTINGS);
  }

  function applyPreset(partial: Partial<AccessibilitySettings>) {
    setSettings({ ...DEFAULT_SETTINGS, ...partial });
  }

  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, resetSettings, applyPreset }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within <AccessibilityProvider>",
    );
  }
  return ctx;
}
