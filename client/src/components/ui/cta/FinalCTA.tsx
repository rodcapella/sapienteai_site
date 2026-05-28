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
  variant?: "default" | "home";
};

export function FinalCTA({ title, title_highlight, description, description_highlight, button, href, variant = "default" }: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isHomeVariant = variant === "home";
  const titleFontSize = isHomeVariant ? "clamp(40px, 5vw, 56px)" : "40px";
  const descriptionFontSize = isHomeVariant ? "clamp(15px, 1.4vw, 18px)" : "24px";

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

        <div className="relative z-10 w-full max-w-4xl px-6 text-center sm:px-10 md:ml-12 lg:ml-20">
          <Reveal>
            <h2
              className="mx-auto max-w-4xl font-black leading-[1.08] tracking-normal"
              style={{ fontFamily: isHomeVariant ? "'Playfair Display', serif" : "'Inter', sans-serif", color: isHomeVariant ? "#001547" : "#000000", fontSize: titleFontSize }}
            >
              {title}
              {title_highlight && (
                <>
                  <br />
                  <span className="!text-[#0A84FF]" style={{ display: "inline", fontFamily: isHomeVariant ? "'Playfair Display', serif" : "'Inter', sans-serif", fontSize: titleFontSize, fontWeight: 900, lineHeight: 1.08 }}>
                    {title_highlight}
                  </span>
                </>
              )}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p
                className={`mx-auto max-w-5xl leading-relaxed ${isHomeVariant ? "mt-7 font-medium" : "mt-8 max-w-3xl"}`}
                style={{ fontFamily: isHomeVariant ? "'Inter', sans-serif" : "'Playfair Display', serif", color: isHomeVariant ? "#001547" : "#000000", fontSize: descriptionFontSize }}
              >
                {description}
                {description_highlight && (
                  <>
                    <br />
                    <span className={`${isHomeVariant ? "font-black text-[#0A84FF]" : "text-[var(--brand-primary)]"}`} style={{ fontFamily: isHomeVariant ? "'Inter', sans-serif" : "'Playfair Display', serif", fontSize: descriptionFontSize, lineHeight: "inherit" }}>
                      {description_highlight}
                    </span>
                  </>
                )}
              </p>
            </Reveal>
          )}

          <Reveal delay={220}>
            <div className="mt-12 flex justify-center">
              {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
            </div>
          </Reveal>
        </div>
      </Section>

      {!href && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
