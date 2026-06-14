import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  CircleX,
  Clock,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type CareStatus =
  | "stable"
  | "attention"
  | "critical"
  | "completed"
  | "pending"
  | "missed";

type StatusConfig = {
  label: string;
  icon: LucideIcon;
  classes: string;
};

const STATUS_CONFIG: Record<CareStatus, StatusConfig> = {
  stable: {
    label: "Stable",
    icon: HeartPulse,
    classes: "bg-success text-success-foreground border-transparent",
  },
  attention: {
    label: "Attention",
    icon: AlertCircle,
    classes: "bg-warning text-warning-foreground border-transparent",
  },
  critical: {
    label: "Critical",
    icon: AlertTriangle,
    classes: "bg-destructive text-destructive-foreground border-transparent",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    classes: "bg-transparent text-success border-success/50",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    classes: "bg-transparent text-muted-foreground border-border",
  },
  missed: {
    label: "Missed",
    icon: CircleX,
    classes: "bg-transparent text-destructive border-destructive/50",
  },
};

interface StatusBadgeProps {
  status: CareStatus;
  /**
   * Override the default label (e.g. "Stable since 8:00 AM").
   */
  label?: string;
  /**
   * Hide the leading icon. Defaults to visible — important for
   * color-vision-deficient users so status isn't conveyed by color alone.
   */
  showIcon?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  label,
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  const text = label ?? config.label;

  return (
    <span
      role="status"
      aria-label={`Status: ${text}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        config.classes,
        className,
      )}
    >
      {showIcon && <Icon className="size-3.5" aria-hidden="true" />}
      <span>{text}</span>
    </span>
  );
}
