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
  image = "/media/bg/bg_hero.webp",
  imageAlt = "Sapiente.AI",
  children,
  compact = false,
}: InternalHeroProps) {
  return (
    <Section
      className={[
        "InternalHero hero relative flex items-center justify-start overflow-hidden",
        compact ? "min-h-[520px] pt-24 pb-16 md:min-h-[580px] md:pt-40 md:pb-24" : "min-h-[520px] pt-24 pb-16 md:min-h-[720px] md:pt-40 md:pb-28",
      ].join(" ")}
    >
      <div
        className="absolute inset-0 bg-[var(--brand-night)] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: "center top" }}
        role="img"
        aria-label={imageAlt}
      />

      <div className="relative z-10 w-full max-w-6xl px-8 text-left sm:px-10 md:ml-12 lg:ml-20 xl:ml-24">
        {label && (
          <Reveal>
            <div className="inline-flex items-center rounded-xl border-2 bg-transparent px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white sm:rounded-full sm:px-6 sm:py-2.5 sm:text-xs sm:tracking-[0.32em]" style={{ borderColor: "var(--brand-primary)", fontFamily: "var(--font-detail)" }}>
              {label}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <h1 className="mt-10 max-w-5xl font-extrabold leading-[1.02] drop-shadow-[0_8px_32px_color-mix(in_srgb,black 58%,transparent)]" style={{ fontFamily: "var(--font-heading)", color: "white", fontSize: "clamp(26px, 5.5vw, 40px)" }}>
            {title}
            {highlight && (
              <>
                <br />
                <span className="internal-hero-highlight" style={{ fontFamily: "var(--font-heading)", color: "var(--brand-primary)", WebkitTextFillColor: "var(--brand-primary)", fontSize: "clamp(26px, 5.5vw, 40px)" }}>
                  {highlight}
                </span>
              </>
            )}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={200}>
            <p className="mt-8 max-w-4xl leading-relaxed drop-shadow-[0_4px_18px_color-mix(in_srgb,black 45%,transparent)]" style={{ fontFamily: "var(--font-body)", color: "white", fontSize: "18px" }}>
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
