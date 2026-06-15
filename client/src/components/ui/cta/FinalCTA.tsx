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
        <span className={cn("block", highlightClass)} style={{ fontFamily: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}>
          {highlight}
        </span>
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
        <span className={cn("block", highlightClass)} style={{ fontFamily: "inherit", lineHeight: "inherit", letterSpacing: "inherit" }}>
          {highlight}
        </span>
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

  const isCentered = align ? align === "center" : isHomeVariant;
  const isRightAligned = isAboutVariant || isServicesVariant;

  const titleFontSize = isHomeVariant || isAboutVariant || isServicesVariant
    ? "clamp(22px, 4.5vw, 44px)"
    : "clamp(18px, 3.5vw, 32px)";

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

  const highlightColor = "text-[var(--brand-primary)]";
  const descriptionHighlightColor = isHomeVariant
    ? "font-extrabold text-[var(--brand-cyan)]"
    : "font-extrabold text-[var(--brand-night)]";

  const getFallbackBackground = () => {
    switch (variant) {
      case "home":
        return "/media/bg/finalCTA/bg_finalCTA_home.webp";
      case "about":
        return "/media/bg/finalCTA/final_CTA_sobre.webp";
      case "services":
        return "/media/bg/finalCTA/final_CTA_sobre.webp";
      default:
        return "/media/bg/finalCTA/bg_finalCTA.webp";
    }
  };

  const computedBackgroundSrc = backgroundSrc || getFallbackBackground();
  const usesDefaultFinalCtaBackground = /\/bg_finalCTA\.(webp|png)$/.test(computedBackgroundSrc);

  const buttonElement = (
    <PremiumButton
      onClick={href ? undefined : () => setIsContactOpen(true)}
      className="opacity-50 hover:opacity-100 sm:opacity-100 !bg-[var(--brand-primary)] !text-white hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white"
      size="lg"
    >
      {button}
    </PremiumButton>
  );

  if (isHomeVariant) {
    return (
      <>
        <section className="final-cta relative min-h-[252px] w-full overflow-hidden bg-[var(--section-ice)] md:h-[450px]">
          <img
            src={computedBackgroundSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-left md:object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--brand-night)_82%,transparent)_0%,color-mix(in_srgb,var(--brand-night)_62%,transparent)_42%,color-mix(in_srgb,var(--brand-night)_22%,transparent)_100%)] md:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--brand-night)_72%,transparent)_0%,color-mix(in_srgb,var(--brand-night)_44%,transparent)_48%,transparent_100%)]"
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
                  className="hidden font-medium leading-relaxed sm:block"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "white",
                    fontSize: descriptionFontSize,
                  }}
                >
                  {renderDescription(description, description_highlight, descriptionHighlightColor)}
                </p>
              </Reveal>
            )}

            <Reveal delay={220}>
              <div className="rounded-full bg-[color-mix(in_srgb,var(--brand-night)_20%,transparent)] p-1 backdrop-blur-[2px]">
                {href ? <Link href={href}>{buttonElement}</Link> : buttonElement}
              </div>
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
          "final-cta relative overflow-hidden min-h-[224px] py-8 md:py-16 px-6 flex items-center",
          "bg-[var(--brand-night)] -mb-px",
          isAboutVariant || isServicesVariant ? "md:h-[310px] md:min-h-0" : "md:min-h-[380px]",
          isCentered ? "text-center" : "text-left"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={computedBackgroundSrc}
            alt=""
            className={cn(
              "block w-full object-cover",
              "h-full",
              isAboutVariant
                ? "object-[left_bottom]"
                : usesDefaultFinalCtaBackground || isServicesVariant
                  ? "object-right"
                  : "object-left md:object-center"
            )}
          />
        </div>
        {(isAboutVariant || isServicesVariant) && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,color-mix(in_srgb,white_34%,transparent)_42%,color-mix(in_srgb,white_88%,transparent)_70%,white_100%)]"
          />
        )}

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
              isRightAligned
                ? "max-w-[760px] items-end text-right ml-auto"
                : !isCentered
                  ? "max-w-[760px] items-start text-left"
                  : "max-w-3xl mx-auto items-center text-center",
              (isAboutVariant || isServicesVariant) && "rounded-2xl bg-white/70 p-5 shadow-[0_18px_46px_color-mix(in_srgb,var(--brand-night)_9%,transparent)] backdrop-blur-[2px] sm:p-6 md:bg-white/62 md:p-7"
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
                  className="mt-3 hidden font-medium leading-relaxed sm:block"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: descriptionColor,
                    fontSize: descriptionFontSize,
                  }}
                >
                  {renderDescription(description, description_highlight, descriptionHighlightColor)}
                </p>
              </Reveal>
            )}

            <Reveal delay={220} className={isCentered ? "mx-auto" : ""}>
              <div className={cn("mt-6 flex w-full", isCentered ? "justify-center" : isRightAligned ? "justify-end" : "justify-start")}>
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
