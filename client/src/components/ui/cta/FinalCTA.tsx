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
  variant?: "default" | "home" | "about";
};

export function FinalCTA({ title, title_highlight, description, description_highlight, button, href, variant = "default" }: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isHomeVariant = variant === "home";
  const titleFontSize = isHomeVariant ? "clamp(40px, 5vw, 56px)" : "40px";
  const descriptionFontSize = "clamp(15px, 1.4vw, 18px)";
  const backgroundSrc = variant === "home" ? "/media/bg/bg_finalCTA_home.png" : variant === "about" ? "/media/bg/final_CTA_sobre.png" : "/media/bg/bg_finalCTA.png";

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
          <img src={backgroundSrc} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
          <Reveal>
            <h2
              className="mx-auto max-w-4xl font-black leading-[1.08] tracking-normal"
              style={{ fontFamily: isHomeVariant ? "'Playfair Display', serif" : "'Inter', sans-serif", color: isHomeVariant ? "#FFFFFF" : "#000000", fontSize: titleFontSize }}
            >
              {title}
              {title_highlight && (
                <>
                  <br />
                  <span className={isHomeVariant ? "!text-white" : "!text-[#0A84FF]"} style={{ display: "inline", fontFamily: isHomeVariant ? "'Playfair Display', serif" : "'Inter', sans-serif", fontSize: titleFontSize, fontWeight: 900, lineHeight: 1.08 }}>
                    {title_highlight}
                  </span>
                </>
              )}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p
                className="mx-auto mt-7 max-w-5xl font-medium leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", color: isHomeVariant ? "#FFFFFF" : "#001547", fontSize: descriptionFontSize }}
              >
                {description}
                {description_highlight && (
                  <>
                    <br />
                    <span className={isHomeVariant ? "font-black text-white" : "font-black text-[#0A84FF]"} style={{ fontFamily: "'Inter', sans-serif", fontSize: descriptionFontSize, lineHeight: "inherit" }}>
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
