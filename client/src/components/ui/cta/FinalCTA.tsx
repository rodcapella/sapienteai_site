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
  breakTitleHighlight?: boolean;
  backgroundSrc?: string;
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
  breakTitleHighlight = false,
  backgroundSrc,
}: FinalCTAProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const isHomeVariant = variant === "home";
  const isAboutVariant = variant === "about";
  const usesHeroTextPattern = isHomeVariant || isAboutVariant;
  const isCentered = align ? align === "center" : usesHeroTextPattern;

  const titleFontSize = usesHeroTextPattern
    ? "clamp(32px, 4vw, 44px)"
    : "32px";

  const descriptionFontSize = "clamp(13px, 1.2vw, 16px)";
  const titleColor = isAboutVariant ? "var(--brand-night)" : usesHeroTextPattern ? "#FFFFFF" : "#000000";
  const highlightColor = isAboutVariant ? "text-[var(--brand-night)]" : usesHeroTextPattern ? "text-[#00D1FF]" : "text-[#0A84FF]";
  const descriptionColor = isAboutVariant ? "var(--brand-night)" : usesHeroTextPattern ? "#FFFFFF" : "#001547";

  const getFallbackBackground = () => {
    switch (variant) {
      case "home":
        return "/media/bg/bg_finalCTA_home.png";
      case "about":
        return "/media/bg/final_CTA_sobre.png";
      default:
        return "/media/bg/bg_finalCTA.png";
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

  return (
    <>
      <Section
        className={cn(
          "final-cta relative overflow-hidden",
          isHomeVariant
            ? "min-h-[clamp(320px,36.5vw,700px)] py-0"
            : "min-h-[360px] py-8 md:min-h-[420px] md:py-12",
          isCentered ? "text-center" : "text-left"
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <img
            src={computedBackgroundSrc}
            alt=""
            className={cn(
              "h-full w-full",
              isHomeVariant ? "object-cover object-center" : "object-cover object-center"
            )}
          />
        </div>

        <div
          className={cn(
            "relative z-10 mx-auto w-full",
            isHomeVariant && "pt-10 md:pt-16 lg:pt-20",
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
                className="font-black leading-[1.08] tracking-normal"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: titleColor,
                  fontSize: titleFontSize,
                }}
              >
                {title}

                {title_highlight && (
                  <>
                    {breakTitleHighlight ? <br /> : " "}
                    <span
                      className={highlightColor}
                      style={{
                        font: "inherit",
                        lineHeight: "inherit",
                        letterSpacing: "inherit",
                      }}
                    >
                      {title_highlight}
                    </span>
                  </>
                )}
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
                  {description}

                  {description_highlight && (
                    <>
                      <br />
                      <span
                        className={highlightColor}
                        style={{
                          font: "inherit",
                          lineHeight: "inherit",
                          letterSpacing: "inherit",
                        }}
                      >
                        {description_highlight}
                      </span>
                    </>
                  )}
                </p>
              </Reveal>
            )}

            <Reveal delay={220} className={isCentered ? "mx-auto" : ""}>
              <div
                className={cn(
                  "mt-6 flex w-full",
                  isCentered ? "justify-center" : "justify-start"
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
