import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card/50 px-6 py-10 text-center sm:py-14",
        className,
      )}
    >
      {Icon && (
        <div
          className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          <Icon className="size-6" />
        </div>
      )}
      <div className="flex max-w-md flex-col gap-1">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </p>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2 flex flex-wrap gap-2">{action}</div>}
    </div>
  );
}
