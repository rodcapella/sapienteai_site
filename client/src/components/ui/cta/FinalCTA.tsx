import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { useState } from "react";
import { Link } from "wouter";

type FinalCTAProps = {
  title: string;
  description?: string;
  button: string;
  href?: string;
};

export function FinalCTA({ title, description, button, href }: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const buttonElement = (
    <PremiumButton
      onClick={href ? undefined : () => setIsContactOpen(true)}
      className="!bg-[var(--brand-cyan-bright)] !text-[var(--brand-night)] hover:!bg-[var(--brand-primary)] hover:!text-[var(--brand-offwhite)] [&>span]:!text-[var(--brand-night)] hover:[&>span]:!text-[var(--brand-offwhite)]"
      size="lg"
    >
      {button}
    </PremiumButton>
  );

  return (
    <>
      <Section className="final-cta relative overflow-hidden py-24 text-center md:py-36 tech-grid scanlines [background:linear-gradient(135deg,#050816_0%,#1A1F2E_34%,#0A84FF_67%,#00F0FF_100%)] [background-size:260%_260%] [animation:mesh-gradient_14s_ease_infinite]">
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--brand-cyan-bright)_18%,transparent),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-heading text-[40px] font-black leading-[1.05] tracking-tight text-[var(--brand-offwhite)]">
              {title}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p className="mx-auto mt-8 max-w-3xl font-serif text-[14px] leading-relaxed text-[var(--brand-night)]">
                {description}
              </p>
            </Reveal>
          )}

          <Reveal delay={220}>
            <div className="mt-12 inline-block">
              {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
            </div>
          </Reveal>
        </div>
      </Section>

      {!href && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
