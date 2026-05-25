import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { useState } from "react";
import { Link } from "wouter";

type FinalCTAProps = {
  title: string;
  title_highlight?: string;
  description?: string;
  description_highlight?: string;
  button: string;
  href?: string;
};

export function FinalCTA({ title, title_highlight, description, description_highlight, button, href }: FinalCTAProps) {
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
    <Section className="final-cta relative overflow-hidden py-24 text-center md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <img src="/media/bg/bg_finalCTA.png" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pl-8 text-left">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-black leading-[1.05] tracking-tight" style={{ fontFamily: "'Inter', sans-serif", color: "#000000", fontSize: "40px" }}>
              {title}
              {title_highlight && (
                <>
                  <br />
                  <span className="!text-[#0057FF]" style={{ fontFamily: "'Inter', sans-serif", fontSize: "40px" }}>
                    {title_highlight}
                  </span>
                </>
              )}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p className="mx-auto mt-8 max-w-3xl leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", color: "#000000", fontSize: "24px" }}>
                {description}
                {description_highlight && (
                  <>
                    <br />
                    <span className="text-[var(--brand-primary)]">{description_highlight}</span>
                  </>
                )}
              </p>
            </Reveal>
          )}

          <Reveal delay={220}>
           <div className="mt-12 flex justify-start">
             {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
           </div>
         </Reveal>
        </div>
      </Section>

      {!href && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
