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
  imageFit?: "cover" | "contain";
  imagePosition?: string;
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
  imageFit = "cover",
  imagePosition = "center top",
  children,
  compact = false,
}: InternalHeroProps) {
  return (
    <Section
      className={[
        "InternalHero hero relative flex items-start justify-start overflow-hidden",
        compact
          ? "min-h-[380px] pt-14 pb-8 md:min-h-[460px] md:pt-32 md:pb-16"
          : "min-h-[420px] pt-14 pb-10 md:min-h-[580px] md:pt-32 md:pb-20",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-[var(--brand-night)]" aria-hidden="true">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full"
          style={{ objectFit: imageFit, objectPosition: imagePosition }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35))] md:hidden" />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-5 text-left sm:px-10 md:ml-12 lg:ml-20 xl:ml-24">
        <div className="inline-block max-w-[min(100%,42rem)] rounded-3xl bg-[rgba(0,20,50,0.35)] px-4 py-4 backdrop-blur-[4px] sm:px-5 sm:py-5 md:max-w-none md:rounded-none md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
          {label && (
            <Reveal>
              <div
                className="inline-flex items-center rounded-xl border-2 bg-transparent px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white sm:rounded-full sm:px-6 sm:py-2.5 sm:text-xs sm:tracking-[0.28em]"
                style={{ borderColor: "var(--brand-primary)", fontFamily: "var(--font-detail)" }}
              >
                {label}
              </div>
            </Reveal>
          )}

          <Reveal delay={100}>
            <h1
              data-speakable
              className="mt-4 max-w-5xl whitespace-pre-line font-extrabold leading-[1.05] drop-shadow-[0_8px_32px_color-mix(in_srgb,black_58%,transparent)]"
              style={{ fontFamily: "var(--font-heading)", color: "white", fontSize: "clamp(26px, 6vw, 40px)" }}
            >
              {title}
              {highlight && (
                <>
                  <br />
                  <span
                    className="internal-hero-highlight"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--brand-primary)", WebkitTextFillColor: "var(--brand-primary)", fontSize: "clamp(26px, 6vw, 40px)" }}
                  >
                    {highlight}
                  </span>
                </>
              )}
            </h1>
          </Reveal>

          {subtitle && (
            <Reveal delay={200}>
              <p
                className="hero-subtitle mt-3 max-w-4xl whitespace-pre-line leading-relaxed drop-shadow-[0_4px_18px_color-mix(in_srgb,black_45%,transparent)]"
                style={{ fontFamily: "var(--font-body)", color: "white", fontSize: "clamp(13px, 2vw, 17px)" }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}

          {children && (
            <Reveal delay={280}>
              <div className="mt-8 w-full max-w-3xl">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
