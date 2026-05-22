import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";

type InternalHeroProps = {
  title: ReactNode;
  highlight?: ReactNode;
  subtitle?: ReactNode;
  label?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function InternalHero({
  title,
  highlight,
  subtitle,
  label,
  image = "/media/bg/bg_hero.jpeg",
  imageAlt = "Sapiente.AI",
  children,
  compact = false,
}: InternalHeroProps) {
  const titleClass = "text-[40px]";

  return (
    <Section
      className={[
        "InternalHero hero relative flex items-center justify-start overflow-hidden",
        compact ? "min-h-[68vh] pt-28 pb-20 md:pt-40 md:pb-24" : "min-h-[90vh] pt-28 pb-20 md:pt-40 md:pb-28",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-8 text-left sm:px-10 md:ml-12 lg:ml-20 xl:ml-24">
        {label && (
          <Reveal>
            <div className="internal-hero-label glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_10px_rgba(85,212,242,0.45)]" />
              {label}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <h1 className={`${titleClass} mt-10 max-w-5xl font-heading font-extrabold leading-[1.02] text-[var(--brand-offwhite)] drop-shadow-[0_8px_32px_rgba(0,0,0,0.58)] [text-shadow:0_0_28px_rgba(0,209,255,0.22),0_2px_12px_rgba(5,8,27,0.78)]`}>
            {title}
            {highlight && (
              <>
                <br />
                <span className="internal-hero-highlight">{highlight}</span>
              </>
            )}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={200}>
            <p className="mt-8 max-w-4xl font-[var(--font-body)] text-[14px] font-medium leading-relaxed text-[var(--brand-offwhite)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
              {subtitle}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={280}>
            <div className="mt-10 max-w-3xl">{children}</div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
