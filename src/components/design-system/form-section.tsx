import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  /**
   * Renders as a <fieldset> by default so semantic groups read correctly to
   * assistive tech. Pass `as="section"` if the wrapped content isn't a form.
   */
  as?: "fieldset" | "section";
  className?: string;
}

export function FormSection({
  title,
  description,
  children,
  as = "fieldset",
  className,
}: FormSectionProps) {
  if (as === "fieldset") {
    return (
      <fieldset
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:p-6 a11y-card-pad",
          className,
        )}
      >
        <legend className="contents">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-foreground">
              {title}
            </span>
            {description && (
              <span className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        </legend>
        <div className="flex flex-col gap-4">{children}</div>
      </fieldset>
    );
  }

  return (
    <section
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:p-6 a11y-card-pad",
        className,
      )}
    >
      <header className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
