// Section.tsx

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  const classes = className || "";
  const shouldUseStandardBackground =
    !classes.includes("final-cta") &&
    !classes.includes("hero") &&
    !classes.includes("InternalHero");

  return (
    <section
      className={cn(
        "py-16 md:py-32 px-6",
        shouldUseStandardBackground && "standard-section-bg",
        className,
      )}
      {...props}
    />
  );
}
