import { cn } from "@/lib/utils";

type Cols = 1 | 2 | 3 | 4;
type Gap = "sm" | "md" | "lg";

const BASE_COLS: Record<Cols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const SM_COLS: Record<Cols, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const MD_COLS: Record<Cols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const LG_COLS: Record<Cols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const GAP_CLASSES: Record<Gap, string> = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Column counts per breakpoint. Mobile-first: `base` is always required,
   * larger breakpoints inherit if omitted.
   */
  columns?: {
    base?: Cols;
    sm?: Cols;
    md?: Cols;
    lg?: Cols;
  };
  gap?: Gap;
}

export function ResponsiveGrid({
  columns = { base: 1, md: 2, lg: 3 },
  gap = "md",
  className,
  ...rest
}: ResponsiveGridProps) {
  const base = columns.base ?? 1;
  return (
    <div
      className={cn(
        "grid",
        BASE_COLS[base],
        columns.sm && SM_COLS[columns.sm],
        columns.md && MD_COLS[columns.md],
        columns.lg && LG_COLS[columns.lg],
        GAP_CLASSES[gap],
        className,
      )}
      {...rest}
    />
  );
}
