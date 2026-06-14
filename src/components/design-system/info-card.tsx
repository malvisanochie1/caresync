import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface InfoCardProps {
  label: string;
  value: React.ReactNode;
  /**
   * Optional supporting sentence beneath the value.
   */
  description?: string;
  icon?: LucideIcon;
  /**
   * Render the card as a horizontal strip instead of stacked. Useful for
   * contact info rows or brief fact listings.
   */
  horizontal?: boolean;
  className?: string;
}

export function InfoCard({
  label,
  value,
  description,
  icon: Icon,
  horizontal = false,
  className,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-card p-4 sm:p-5",
        horizontal ? "flex-row items-start" : "flex-col",
        className,
      )}
    >
      {Icon && (
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold leading-snug text-foreground sm:text-base">
          {value}
        </p>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
