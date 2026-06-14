import { cn } from "@/lib/utils";

interface FormFieldGroupProps {
  /**
   * Label text. Rendered as a <label> pointing at `htmlFor`.
   */
  label: string;
  htmlFor: string;
  required?: boolean;
  /**
   * Hint below the input — visible at all times.
   */
  helper?: string;
  /**
   * Error message — replaces helper text, applies error styling.
   */
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormFieldGroup({
  label,
  htmlFor,
  required,
  helper,
  error,
  children,
  className,
}: FormFieldGroupProps) {
  const helperId = `${htmlFor}-helper`;
  const errorId = `${htmlFor}-error`;
  const describedBy = error ? errorId : helper ? helperId : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium leading-none text-foreground"
      >
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only">(required)</span>}
      </label>

      <div
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
      >
        {children}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs leading-relaxed text-destructive"
        >
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs leading-relaxed text-muted-foreground">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
