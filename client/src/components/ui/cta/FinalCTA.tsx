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

        <div className={`relative z-10 mx-auto max-w-5xl px-6 ${isHomeVariant ? "text-center" : "pl-8 text-left"}`}>
          <Reveal>
            <h2
              className={`mx-auto max-w-4xl font-black leading-[1.08] tracking-normal ${isHomeVariant ? "text-[40px] md:text-[56px]" : ""}`}
              style={{ fontFamily: isHomeVariant ? "'Playfair Display', serif" : "'Inter', sans-serif", color: isHomeVariant ? "#001547" : "#000000", fontSize: isHomeVariant ? undefined : "40px" }}
            >
              {title}
              {title_highlight && (
                <>
                  <br />
                  <span className="!text-[#0A84FF]" style={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit" }}>
                    {title_highlight}
                  </span>
                </>
              )}
            </h2>
          </Reveal>

          {description && (
            <Reveal delay={110}>
              <p
                className={`mx-auto max-w-5xl leading-relaxed ${isHomeVariant ? "mt-7 text-[15px] font-medium md:text-[18px]" : "mt-8 max-w-3xl"}`}
                style={{ fontFamily: isHomeVariant ? "'Inter', sans-serif" : "'Playfair Display', serif", color: isHomeVariant ? "#001547" : "#000000", fontSize: isHomeVariant ? undefined : "24px" }}
              >
                {description}
                {description_highlight && (
                  <span className={`${isHomeVariant ? "font-black text-[#0A84FF]" : "block text-[var(--brand-primary)]"}`} style={{ fontFamily: "inherit", fontSize: "inherit", lineHeight: "inherit" }}>
                    {isHomeVariant ? ` ${description_highlight}` : description_highlight}
                  </span>
                )}
              </p>
            </Reveal>
          )}

          <Reveal delay={220}>
            <div className={`mt-12 flex ${isHomeVariant ? "justify-center" : "justify-start"}`}>
              {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
            </div>
          </Reveal>
        </div>
      </Section>

      {!href && isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </>
  );
}
