import ContactModal from "@/components/ContactModal";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Reveal } from "@/components/ui/motion/Reveal";
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
  variant?: "default" | "home" | "about" | "services";
  align?: "left" | "center";
  backgroundSrc?: string;
};

function renderTitle(title: string, highlight?: string, highlightClass?: string) {
  return (
    <>
      {title}
      {highlight && (
        <>
          <br />
          <span className={highlightClass} style={{ font: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}>
            {highlight}
          </span>
        </>
      )}
    </>
  );
}

function renderDescription(description?: string, highlight?: string, highlightClass?: string) {
  if (!description) return null;

  return (
    <>
      {description}
      {highlight && (
        <>
          <br />
          <span className={highlightClass} style={{ font: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}>
            {highlight}
          </span>
        </>
      )}
    </>
  );
}

export function FinalCTA({
  title,
  title_highlight,
  description,
  description_highlight,
  button,
  href,
  variant = "default",
  align,
  backgroundSrc,
}: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isHomeVariant = variant === "home";
  const isAboutVariant = variant === "about";
  const isServicesVariant = variant === "services";

  const isCentered = align ? align === "center" : isHomeVariant || isAboutVariant || isServicesVariant;

  const titleFontSize = isHomeVariant || isAboutVariant || isServicesVariant
    ? "clamp(28px, 5vw, 44px)"
    : "clamp(22px, 4vw, 32px)";

  const descriptionFontSize = "clamp(15px, 1.6vw, 16px)";

  const titleColor = isAboutVariant || isServicesVariant
    ? "var(--brand-night)"
    : isHomeVariant
      ? "white"
      : "black";

  const descriptionColor = isAboutVariant || isServicesVariant
    ? "var(--brand-night)"
    : isHomeVariant
      ? "white"
      : "var(--brand-night)";

  const highlightColor = isAboutVariant || isServicesVariant
    ? "text-[var(--brand-night)]"
    : "text-[var(--brand-primary)]";

  const getFallbackBackground = () => {
    switch (variant) {
      case "home":
        return "/media/bg/bg_finalCTA_home.webp";
      case "about":
        return "/media/bg/final_CTA_sobre.webp";
      case "services":
        // TODO: substituir por imagem própria de serviços quando disponível
        return "/media/bg/final_CTA_sobre.webp";
      default:
        return "/media/bg/bg_finalCTA.webp";
    }
  };

  const computedBackgroundSrc = backgroundSrc || getFallbackBackground();

  const buttonElement = (
    <PremiumButton
      onClick={href ? undefined : () => setIsContactOpen(true)}
      className="!bg-[var(--brand-primary)] !text-white hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white"
      size="lg"
    >
      {button}
    </PremiumButton>
  );

  if (isHomeVariant) {
    return (
      <>
        <section className="final-cta relative w-full overflow-hidden bg-[var(--section-ice)]">
          <img
            src={computedBackgroundSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-8 text-center md:absolute md:inset-0 md:py-0">
            <Reveal>
              <h2
                className="font-black leading-[1.08]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "white",
                  fontSize: titleFontSize,
                }}
              >
                {renderTitle(title, title_highlight, highlightColor)}
              </h2>
            </Reveal>

            {description && (
              <Reveal delay={110}>
                <p
                  className="font-medium leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "white",
                    fontSize: descriptionFontSize,
                  }}
                >
                  {renderDescription(description, description_highlight, highlightColor)}
                </p>
              </Reveal>
            )}

            <Reveal delay={220}>
              {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
            </Reveal>
          </div>
        </section>

        {!href && isContactOpen && (
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <section
        className={cn(
          "final-cta relative overflow-hidden py-10 md:py-16 px-6",
          isCentered ? "text-center" : "text-left"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={computedBackgroundSrc}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto w-full",
            isCentered
              ? "max-w-3xl px-6 sm:px-10 text-center"
              : "max-w-7xl px-6 sm:px-8 text-left"
          )}
        >
          <div
            className={cn(
              "w-full flex flex-col",
              !isCentered
                ? "max-w-[580px] items-start text-left"
                : "max-w-3xl mx-auto items-center text-center"
            )}
          >
            <Reveal className={isCentered ? "mx-auto" : "w-full"}>
              <h2
                className="font-black leading-[1.08]"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: titleColor,
                  fontSize: titleFontSize,
                }}
              >
                {renderTitle(title, title_highlight, highlightColor)}
              </h2>
            </Reveal>

            {description && (
              <Reveal delay={110} className={isCentered ? "mx-auto" : "w-full"}>
                <p
                  className="mt-3 font-medium leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: descriptionColor,
                    fontSize: descriptionFontSize,
                  }}
                >
                  {renderDescription(description, description_highlight, highlightColor)}
                </p>
              </Reveal>
            )}

            <Reveal delay={220} className={isCentered ? "mx-auto" : ""}>
              <div className={cn("mt-6 flex w-full", isCentered ? "justify-center" : "justify-start")}>
                {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {!href && isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
    </>
  );
}
