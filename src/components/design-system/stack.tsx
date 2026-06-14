import { cn } from "@/lib/utils";

type Gap = "sm" | "md" | "lg" | "xl";

const GAP_CLASSES: Record<Gap, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stack direction. Mobile-first: defaults to vertical.
   */
  direction?: "vertical" | "horizontal";
  gap?: Gap;
  /**
   * For horizontal stacks: align items along the cross axis.
   */
  align?: "start" | "center" | "end" | "stretch";
}

export function Stack({
  direction = "vertical",
  gap = "md",
  align,
  className,
  ...rest
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        GAP_CLASSES[gap],
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        className,
      )}
      {...rest}
    />
  );
}
