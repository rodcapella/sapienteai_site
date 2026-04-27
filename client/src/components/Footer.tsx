import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocation, Link } from "wouter";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { NavLink } from "@/components/ui/navigation/NavLink";
import { Instagram, Linkedin, Music2, Twitter } from "lucide-react";

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const { t } = useTranslation();
  const [location] = useLocation();
  const lang = location.split("/")[1] || "pt";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus("loading");

    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1000);
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "TikTok", icon: Music2, url: "#" },
    { name: "X", icon: Twitter, url: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020612] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,102,255,0.2),transparent_42%),radial-gradient(circle_at_83%_88%,rgba(168,85,247,0.18),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.08]" />

      <div className="container relative z-10 mx-auto px-6 py-18 md:py-24">
        <div className="mb-20 grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="group mb-8 inline-block">
              <img
                src="/logo-black-bg.png"
                alt="SAPIENTE.AI"
                className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <p className="max-w-sm text-lg leading-relaxed text-white/60">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white/90">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-5">
              <li><NavLink href={`/${lang}`} variant="footer">{t("nav.home")}</NavLink></li>
              <li><NavLink href={`/${lang}/about`} variant="footer">{t("nav.about")}</NavLink></li>
              <li><NavLink href={`/${lang}/team`} variant="footer">{t("nav.team")}</NavLink></li>
              <li><NavLink href={`/${lang}/faq`} variant="footer">{t("nav.faq")}</NavLink></li>
              <li><NavLink href={`/${lang}/contact`} variant="footer">{t("nav.contact") || "Contact"}</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white/90">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-5">
              <li><NavLink href={`/${lang}/terms`} variant="footer">{t("footer.terms")}</NavLink></li>
              <li><NavLink href={`/${lang}/privacy`} variant="footer">{t("footer.privacy")}</NavLink></li>
              <li><NavLink href={`/${lang}/trust`} variant="footer">Trust</NavLink></li>
              <li><NavLink href={`/${lang}/lgpd`} variant="footer">{t("footer.lgpd")}</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-xs font-black uppercase tracking-[0.3em] text-white/90">
              {t("footer.newsletter")}
            </h4>

            <form onSubmit={handleSubscribe} className="space-y-4 rounded-3xl border border-white/15 bg-white/[0.03] p-4 backdrop-blur-2xl">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <PremiumButton
                type="submit"
                className="w-full rounded-2xl py-4 text-sm tracking-[0.16em]"
              >
                {subscribeStatus === "loading"
                  ? t("newsletter.subscribing")
                  : t("newsletter.subscribe")}
              </PremiumButton>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 md:flex-row">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/15 hover:text-white hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          <p className="text-center text-xs font-black uppercase tracking-[0.32em] text-white/30 md:text-right">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
