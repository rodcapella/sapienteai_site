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
            "mb-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-[12px] font-black uppercase tracking-[0.24em]",
            isLight
              ? "border border-[var(--brand-cyan)]/25 bg-[var(--brand-navy)]/10 text-[var(--brand-primary)] shadow-[0_14px_35px_color-mix(in_srgb,var(--brand-deep) 12%,transparent)] backdrop-blur-xl"
              : "border border-[var(--brand-cyan)]/25 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] shadow-[0_0_28px_color-mix(in_srgb,var(--brand-cyan-bright) 16%,transparent)]",
          )}
        >
          {label}
        </p>
      )}

      <h2
        className={cn(
          "mb-5 font-heading text-[40px] font-extrabold tracking-tight",
          isLight
            ? "[background:var(--brand-gradient-border)] bg-clip-text text-transparent drop-shadow-[0_12px_30px_color-mix(in_srgb,var(--brand-deep) 14%,transparent)]"
            : "text-[var(--brand-offwhite)] drop-shadow-[0_0_24px_color-mix(in_srgb,var(--brand-cyan-bright) 16%,transparent)]",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mx-auto max-w-2xl text-[14px] font-medium leading-relaxed",
            isLight ? "text-[var(--brand-blue-mid)]" : "text-[var(--brand-offwhite)]/72",
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}
