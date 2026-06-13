import { useState } from "react";
import type { ElementType } from "react";
import { Link } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";
import { ArrowRight, Home, Mail, ShieldCheck, Sparkles } from "@/lib/icons";
import "@/styles/faq_legal.css";

type SitemapLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

type SitemapGroup = {
  label: string;
  title: string;
  icon: ElementType;
  links: SitemapLink[];
};


function makeLink(lang: string, path = "") {
  return `/${lang}${path}`;
}

function SitemapCard({ group }: { group: SitemapGroup }) {
  const Icon = group.icon;

  const itemClass =
    "legal-item group flex items-center justify-between gap-4 px-6 py-4 no-underline transition hover:bg-[color-mix(in_srgb,var(--brand-primary)_5%,transparent)]";

  const renderItem = (link: SitemapLink, ArrowIcon: ElementType) => (
    <>
      <div className="min-w-0">
        <p className="legal-q-text mb-0.5 text-[15px] !text-[var(--brand-deep)]">{link.title}</p>
        <p className="text-[13px] font-medium leading-relaxed text-[color-mix(in_srgb,var(--brand-night)_55%,transparent)]">
          {link.description}
        </p>
      </div>
      <ArrowIcon className="h-4 w-4 shrink-0 text-[var(--brand-primary)] transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );

  return (
    <div className="legal-document-card !p-0 overflow-hidden">
      {/* Cabeçalho do card */}
      <div className="flex items-center gap-4 border-b border-[color-mix(in_srgb,var(--brand-mid)_40%,transparent)] px-6 py-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)]">
          <Icon className="h-5 w-5 text-[var(--brand-primary)]" />
        </div>
        <div>
          <p className="legal-sidebar-label !mb-0 !text-[var(--brand-deep)]">{group.label}</p>
          <h2 className="font-[var(--font-heading)] text-[20px] font-black leading-tight text-[var(--brand-deep)]">
            {group.title}
          </h2>
        </div>
      </div>

      {/* Lista de links */}
      <ul className="legal-list !rounded-none !border-0">
        {group.links.map((link) => (
          <li key={link.href || link.title}>
            {link.href ? (
              <Link href={link.href} className={itemClass}>
                {renderItem(link, ArrowRight)}
              </Link>
            ) : (
              <a
                href="#newsletter"
                onClick={(e) => { e.preventDefault(); link.onClick?.(); }}
                className={itemClass}
              >
                {renderItem(link, Mail)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sitemap() {
  const { lang } = useTranslation();
  const content = getContent("sitemap", lang);
  const l = content.links;
  const quizHref = lang === "pt" ? makeLink(lang, "/quiz-ia") : makeLink(lang, "/quiz-ai");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(content.sections.main);

  const groups: SitemapGroup[] = [
    {
      label: content.sections.main,
      title: content.sections.mainTitle,
      icon: Home,
      links: [
        { title: l.home[0], description: l.home[1], href: makeLink(lang) },
        { title: l.about[0], description: l.about[1], href: makeLink(lang, "/about") },
        { title: l.services[0], description: l.services[1], href: makeLink(lang, "/services") },
      ],
    },
    {
      label: content.sections.resources,
      title: content.sections.resourcesTitle,
      icon: Sparkles,
      links: [
        { title: l.faq[0], description: l.faq[1], href: makeLink(lang, "/faq") },
        { title: l.quiz[0], description: l.quiz[1], href: quizHref },
        { title: l.newsletter[0], description: l.newsletter[1], onClick: () => setIsNewsletterOpen(true) },
      ],
    },
    {
      label: content.sections.legal,
      title: content.sections.legalTitle,
      icon: ShieldCheck,
      links: [
        { title: l.trust[0],   description: l.trust[1],   href: makeLink(lang, "/trust") },
        { title: l.cookies[0], description: l.cookies[1], href: makeLink(lang, "/cookies") },
        { title: l.policy[0],  description: l.policy[1],  href: makeLink(lang, "/generative-ai-policy") },
        { title: l.privacy[0], description: l.privacy[1], href: makeLink(lang, "/privacy") },
        { title: l.terms[0],   description: l.terms[1],   href: makeLink(lang, "/terms") },
      ].sort((a, b) => a.title.localeCompare(b.title, lang === "pt" ? "pt" : "en")),
    },
  ];

  useSEOHead({
    title: `${content.label} - Sapiente.AI`,
    description: content.subtitle,
    url: `https://www.sapienteai.com/${lang}/sitemap`,
    type: "website",
  }, [content, lang]);

  return (
    <div className="legal-page flex flex-col">
      <InternalHero
        label={content.label}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        image="/media/bg/bg_Mapa_Site.webp"
        imageAlt={content.imageAlt}
        compact
      />

      <section className="legal-main">
        <div className="legal-inner">

          {/* Sidebar */}
          <aside id="sitemap-menu" className="legal-sidebar">
            <div className="legal-sidebar-label">{content.label}</div>
            <div className="legal-cats">
              {groups.map((group) => {
                const Icon = group.icon;
                const isActive = activeGroup === group.label;
                return (
                  <a
                    key={group.label}
                    href={`#sitemap-${group.label}`}
                    onClick={() => setActiveGroup(group.label)}
                    className={`legal-cat ${isActive ? "active" : ""}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{group.label}</span>
                  </a>
                );
              })}
            </div>
          </aside>

          {/* Cards */}
          <div className="flex flex-col gap-7">
            {groups.map((group, index) => (
              <Reveal key={group.label} delay={index * 80}>
                <div id={`sitemap-${group.label}`}>
                  <SitemapCard group={group} />
                  <a
                    href="#sitemap-menu"
                    className="md:hidden mt-3 flex items-center justify-center gap-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-[var(--brand-primary)] opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {content.backToMenu}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
}
