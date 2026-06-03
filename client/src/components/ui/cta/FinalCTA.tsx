import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type FinalCTAProps = {
  title: string;
  title_highlight?: string;
  description?: string;
  description_highlight?: string;
  button: string;
  href?: string;
  variant?: "default" | "home" | "about";
  align?: "left" | "center";
};

export function FinalCTA({
  title,
  title_highlight,
  description,
  description_highlight,
  button,
  href,
  variant = "default",
  align,
}: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isHomeVariant = variant === "home";
  const isCentered = align ? align === "center" : isHomeVariant;

  const titleFontSize = isHomeVariant
    ? "clamp(40px, 5vw, 56px)"
    : "40px";

  const descriptionFontSize = "clamp(15px, 1.4vw, 18px)";

  const backgroundSrc =
    variant === "home"
      ? "/media/bg/bg_finalCTA_home.png"
      : variant === "about"
      ? "/media/bg/final_CTA_sobre.png"
      : "/media/bg/bg_finalCTA.png";

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
      <Section
        className={cn(
          "final-cta relative overflow-hidden py-24 md:py-36",
          isCentered ? "text-center" : "text-left"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={backgroundSrc}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto w-full",
            isCentered
              ? "max-w-4xl px-6 sm:px-10 text-center"
              : "max-w-5xl px-0 text-left"
          )}
        >
          <div
            className={cn(
              !isCentered
                ? "max-w-[840px]"
                : "max-w-4xl mx-auto"
            )}
          >
            <Reveal>
              <h2
                className={cn(
                  "font-black leading-[1.08] tracking-normal",
                  isCentered && "mx-auto"
                )}
                style={{
                  fontFamily: "var(--font-heading)",
                  color: isHomeVariant ? "#FFFFFF" : "#000000",
                  fontSize: titleFontSize,
                }}
              >
                {title}

                {title_highlight && (
                  <>
                    <br />
                    <span
                      className={
                        isHomeVariant
                          ? "text-[#00D1FF]"
                          : "text-[#0A84FF]"
                      }
                    >
                      {title_highlight}
                    </span>
                  </>
                )}
              </h2>
            </Reveal>

            {description && (
              <Reveal delay={110}>
                <p
                  className={cn(
                    "mt-7 font-medium leading-relaxed",
                    isCentered && "mx-auto"
                  )}
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isHomeVariant ? "#FFFFFF" : "#001547",
                    fontSize: descriptionFontSize,
                  }}
                >
                  {description}

                  {description_highlight && (
                    <>
                      <br />
                      <span
                        className={
                          isHomeVariant
                            ? "text-[#00D1FF]"
                            : "text-[#0A84FF]"
                        }
                      >
                        {description_highlight}
                      </span>
                    </>
                  )}
                </p>
              </Reveal>
            )}

            <Reveal delay={220}>
              <div
                className={cn(
                  "mt-12 flex",
                  isCentered
                    ? "justify-center"
                    : "justify-start"
                )}
              >
                {href ? (
                  <Link href={href}>{buttonElement}</Link>
                ) : (
                  buttonElement
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {!href && isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </>
  );
}