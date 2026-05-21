import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { TechBackdrop, TechParticleField } from "@/components/ui/tech/TechBackground";

type InternalHeroProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  label?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
};

export function InternalHero({
  title,
  subtitle,
  label,
  image = "/media/banners/hero-banner.webp",
  imageAlt = "Sapiente.AI",
  children,
  compact = false,
}: InternalHeroProps) {
  return (
    <Section
      className={[
        "relative flex items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines",
        compact ? "min-h-[58vh] pt-28 pb-16 md:min-h-[66vh] md:pt-36 md:pb-24" : "min-h-[68vh] pt-28 pb-20 md:min-h-[78vh] md:pt-36 md:pb-28",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-[0.24]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,27,0.97),rgba(26,31,46,0.88),rgba(10,138,255,0.48))]" />
      </div>

      <TechBackdrop intensity="strong" />
      <TechParticleField className="opacity-70" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,240,255,0.24),transparent_52%)]"
        animate={{ opacity: [0.15, 0.42, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {label && (
          <Reveal>
            <div className="glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] text-[var(--brand-cyan)] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_rgba(0,240,255,0.95)]" />
              {label}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <h1 className="mx-auto mt-10 max-w-5xl font-heading text-4xl font-extrabold leading-[0.95] text-[var(--brand-offwhite)] drop-shadow-[0_0_35px_rgba(0,240,255,0.25)] sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[var(--brand-offwhite)]/85 sm:text-xl md:text-2xl">
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
