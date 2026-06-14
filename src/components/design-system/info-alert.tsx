import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type AlertTone = "info" | "success" | "warning" | "critical";

type ToneConfig = {
  container: string;
  iconWrap: string;
  icon: LucideIcon;
};

const TONE_CONFIG: Record<AlertTone, ToneConfig> = {
  info: {
    container: "border-primary/30 bg-primary/5 text-foreground",
    iconWrap: "bg-primary/10 text-primary",
    icon: Info,
  },
  success: {
    container: "border-success/40 bg-success/5 text-foreground",
    iconWrap: "bg-success/10 text-success",
    icon: CheckCircle2,
  },
  warning: {
    container: "border-warning/50 bg-warning/10 text-foreground",
    iconWrap: "bg-warning/20 text-warning-foreground",
    icon: AlertTriangle,
  },
  critical: {
    container: "border-destructive/40 bg-destructive/5 text-foreground",
    iconWrap: "bg-destructive/10 text-destructive",
    icon: ShieldAlert,
  },
};

export interface InfoAlertProps {
  tone?: AlertTone;
  title: string;
  description?: string;
  /**
   * Optional inline action (e.g. a Button). Stacks under the description
   * on mobile, aligns right on sm+.
   */
  action?: React.ReactNode;
  className?: string;
}

export function InfoAlert({
  tone = "info",
  title,
  description,
  action,
  className,
}: InfoAlertProps) {
  const config = TONE_CONFIG[tone];
  const Icon = config.icon;
  const role = tone === "critical" || tone === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start sm:p-5",
        config.container,
        className,
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md",
          config.iconWrap,
        )}
        aria-hidden="true"
      >
        <Icon className="size-5" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex shrink-0 sm:ml-2 sm:self-center">{action}</div>
      )}
    </div>
  );
}
