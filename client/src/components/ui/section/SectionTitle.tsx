import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  title: string;
  description?: string;
  variant?: "dark" | "light";
}

export function SectionTitle({ label, title, description, variant = "dark" }: Props) {
  const isLight = variant === "light";

  return (
    <>
      {label && (
        <p
          className={cn(
            "mb-4 text-xs font-black uppercase tracking-[0.22em]",
            isLight ? "text-primary" : "text-[var(--brand-cyan)]/85",
          )}
        >
          {label}
        </p>
      )}

      <h2
        className={cn(
          "mb-4 font-heading text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl",
          isLight ? "text-foreground" : "text-[var(--brand-offwhite)]",
        )}
      >
        {title}
      </h2>

      {description && (
        <p className={cn("mx-auto max-w-2xl", isLight ? "text-foreground/70" : "text-[var(--brand-offwhite)]/72")}>{description}</p>
      )}
    </>
  );
}
