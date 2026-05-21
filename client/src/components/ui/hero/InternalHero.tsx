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
  const titleClass = compact
    ? "text-[clamp(2.35rem,5.2vw,4.9rem)]"
    : "text-[clamp(2.5rem,6vw,5.6rem)]";

  return (
    <Section
      className={[
        "relative flex items-center justify-center overflow-hidden bg-modern-gradient tech-grid scanlines",
        compact ? "min-h-[58vh] pt-28 pb-16 md:min-h-[66vh] md:pt-36 md:pb-24" : "min-h-[68vh] pt-28 pb-20 md:min-h-[78vh] md:pt-36 md:pb-28",
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-[0.2]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,27,0.99),rgba(8,18,42,0.94),rgba(10,66,122,0.82))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(0,209,255,0.22),rgba(5,8,27,0.42)_52%,rgba(5,8,27,0.82)_100%)]" />
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
            <div className="internal-hero-label glass-panel cyber-border inline-flex items-center gap-3 rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-[0.32em] sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand-cyan-bright)] shadow-[0_0_20px_rgba(0,240,255,0.95)]" />
              {label}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <h1 className={`${titleClass} mx-auto mt-10 max-w-5xl font-heading font-extrabold leading-[1.02] text-[#F8FCFF] drop-shadow-[0_8px_32px_rgba(0,0,0,0.58)] [text-shadow:0_0_28px_rgba(0,209,255,0.22),0_2px_12px_rgba(5,8,27,0.78)]`}>
            {title}
          </h1>
        </Reveal>

        {subtitle && (
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-4xl text-lg font-medium leading-relaxed text-[#F8FCFF]/88 drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-xl md:text-2xl">
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
