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
              ? "border border-[var(--brand-cyan)]/25 bg-[#10266f]/10 text-[var(--brand-primary)] shadow-[0_14px_35px_rgba(1,32,80,0.12)] backdrop-blur-xl"
              : "border border-[var(--brand-cyan)]/25 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] shadow-[0_0_28px_rgba(0,209,255,0.16)]",
          )}
        >
          {label}
        </p>
      )}

      <h2
        className={cn(
          "mb-5 font-heading text-[40px] font-extrabold tracking-tight",
          isLight
            ? "[background:var(--brand-gradient-border)] bg-clip-text text-transparent drop-shadow-[0_12px_30px_rgba(1,32,80,0.14)]"
            : "text-[var(--brand-offwhite)] drop-shadow-[0_0_24px_rgba(0,209,255,0.16)]",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mx-auto max-w-2xl text-[14px] font-medium leading-relaxed",
            isLight ? "text-[#0A4F8F]" : "text-[var(--brand-offwhite)]/72",
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}
