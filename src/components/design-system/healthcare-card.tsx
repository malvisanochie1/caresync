import * as React from "react";

import { cn } from "@/lib/utils";
import type { CareStatus } from "./status-badge";

type StatusAccent = Exclude<CareStatus, "completed" | "pending" | "missed">;

const ACCENT_CLASSES: Record<StatusAccent, string> = {
  stable: "before:bg-success",
  attention: "before:bg-warning",
  critical: "before:bg-destructive",
};

interface HealthcareCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Adds a colored vertical accent stripe along the left edge to
   * signal patient state at a glance.
   */
  accent?: StatusAccent;
  /**
   * Allow the card itself to be a link target / button when interactive.
   * Renders semantic <article> by default; pass `as="section"` when used
   * as a region rather than a self-contained unit.
   */
  as?: "article" | "section" | "div";
}

export function HealthcareCard({
  className,
  accent,
  as: Component = "article",
  children,
  ...rest
}: HealthcareCardProps) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        accent &&
          "",
        accent && ACCENT_CLASSES[accent],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

interface HealthcareCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
}

export function HealthcareCardHeader({
  title,
  subtitle,
  icon,
  trailing,
  className,
  ...rest
}: HealthcareCardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 border-b border-border p-4 sm:p-5",
        className,
      )}
      {...rest}
    >
      {icon && (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="truncate text-base font-semibold leading-tight tracking-tight text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

export function HealthcareCardBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-4 text-sm sm:p-5", className)}
      {...rest}
    />
  );
}

export function HealthcareCardFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 border-t border-border bg-muted/30 p-4 sm:p-5",
        className,
      )}
      {...rest}
    />
  );
}
