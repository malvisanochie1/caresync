import { cn } from "@/lib/utils";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const MAX_WIDTH_CLASSES: Record<MaxWidth, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: MaxWidth;
  /**
   * Removes the horizontal padding. Useful when nesting inside another container.
   */
  noPadding?: boolean;
}

export function ContentContainer({
  maxWidth = "xl",
  noPadding = false,
  className,
  ...rest
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        MAX_WIDTH_CLASSES[maxWidth],
        !noPadding && "px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...rest}
    />
  );
}
