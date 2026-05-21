// Section.tsx

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  const classes = className || "";
  const shouldUseStandardBackground =
    !classes.includes("bg-modern-gradient") &&
    !classes.includes("team-cta-panel") &&
    !classes.includes("final-cta") &&
    !classes.includes("hero") &&
    !classes.includes("InternalHero") &&
    !classes.includes("bg-[linear-gradient") &&
    !classes.includes("quiz-experience");

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
