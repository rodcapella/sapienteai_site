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
      className="!bg-[var(--brand-primary)] !text-white hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white"
      size="lg"
    >
      {button}
    </PremiumButton>
  );

  return (
    <>
      <Section className="final-cta relative overflow-hidden bg-modern-gradient py-24 text-center md:py-36 tech-grid scanlines">
        <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(85,212,242,0.16),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-black leading-[1.05] tracking-tight" style={{ fontFamily: "'Inter', sans-serif", color: "#EAF6FF", fontSize: "40px" }}>
              {title}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p className="mx-auto mt-8 max-w-3xl leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: "#00F0FF", fontSize: "24px" }}>
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
