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
  const titleClass = compact
    ? "text-[clamp(2.35rem,5.2vw,4.9rem)]"
    : "text-[clamp(2.5rem,6vw,5.6rem)]";

  return (
    <Section
      className={[
        "InternalHero relative flex items-center justify-center overflow-hidden",
        compact ? "min-h-[58vh] pt-28 pb-16 md:min-h-[66vh] md:pt-36 md:pb-24" : "min-h-[68vh] pt-28 pb-20 md:min-h-[78vh] md:pt-36 md:pb-28",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {label && (
          <Reveal>
            <div className="internal-hero-label glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_10px_rgba(85,212,242,0.45)]" />
              {label}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <h1 className={`${titleClass} mx-auto mt-10 max-w-5xl font-heading font-extrabold leading-[1.02] text-[#F8FCFF] drop-shadow-[0_8px_24px_rgba(0,0,0,0.34)] [text-shadow:0_0_14px_rgba(85,212,242,0.11),0_2px_10px_rgba(0,21,71,0.62)]`}>
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
            <p className="mx-auto mt-8 max-w-4xl text-lg font-medium leading-relaxed text-[#F8FCFF]/88 drop-shadow-[0_4px_14px_rgba(0,0,0,0.32)] sm:text-xl md:text-2xl">
              {subtitle}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={280}>
            <div className="mx-auto mt-10 max-w-3xl">{children}</div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
