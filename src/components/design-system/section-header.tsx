import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  /**
   * Defaults to "h2". Use "h3" when nested inside another section.
   */
  as?: "h2" | "h3";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  as: HeadingTag = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <HeadingTag className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          {title}
        </HeadingTag>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
