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
            "mb-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.24em]",
            isLight
              ? "border border-[var(--brand-primary)]/25 bg-white/70 text-[var(--brand-primary)] shadow-[0_14px_35px_rgba(10,138,255,0.14)] backdrop-blur-xl"
              : "border border-[var(--brand-cyan)]/25 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] shadow-[0_0_28px_rgba(0,209,255,0.16)]",
          )}
        >
          {label}
        </p>
      )}

      <h2
        className={cn(
          "mb-5 font-heading text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl",
          isLight
            ? "bg-[linear-gradient(110deg,#05081B_0%,#0A8AFF_48%,#7B81FF_100%)] bg-clip-text text-transparent drop-shadow-[0_12px_30px_rgba(10,138,255,0.14)]"
            : "text-[var(--brand-offwhite)] drop-shadow-[0_0_24px_rgba(0,209,255,0.16)]",
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mx-auto max-w-2xl text-base font-medium leading-relaxed md:text-lg",
            isLight ? "text-[#0A4F8F]" : "text-[var(--brand-offwhite)]/72",
          )}
        >
          {description}
        </p>
      )}
    </>
  );
}
