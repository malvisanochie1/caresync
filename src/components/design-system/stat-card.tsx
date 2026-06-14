import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "flat";

interface StatCardProps {
  label: string;
  value: string | number;
  /**
   * Optional unit (e.g. "bpm", "mmHg", "logs"). Rendered smaller next to value.
   */
  unit?: string;
  /**
   * Optional helper text underneath (e.g. "vs. last shift").
   */
  helper?: string;
  trend?: {
    direction: Trend;
    /** Short value, e.g. "+2", "-3%", "0". */
    value: string;
  };
  icon?: LucideIcon;
  className?: string;
}

const TREND_COLOR: Record<Trend, string> = {
  up: "text-success",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

const TREND_ICON: Record<Trend, LucideIcon | null> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  flat: null,
};

export function StatCard({
  label,
  value,
  unit,
  helper,
  trend,
  icon: Icon,
  className,
}: StatCardProps) {
  const TrendIcon = trend ? TREND_ICON[trend.direction] : null;

  return (
    <div
      className={cn(
        "flex min-h-[7.5rem] flex-col justify-between gap-3 rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
            aria-hidden="true"
          >
            <Icon className="size-4" />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-1.5">
        <span className="text-3xl font-semibold leading-none tracking-tight text-foreground sm:text-4xl">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-muted-foreground">
            {unit}
          </span>
        )}
      </div>

      {(trend || helper) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                TREND_COLOR[trend.direction],
              )}
            >
              {TrendIcon && (
                <TrendIcon className="size-3.5" aria-hidden="true" />
              )}
              {trend.value}
            </span>
          )}
          {helper && <span className="text-muted-foreground">{helper}</span>}
        </div>
      )}
    </div>
  );
}
