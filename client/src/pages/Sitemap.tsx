import { useEffect, useState } from "react";
import type { ElementType } from "react";
import { Link, useLocation } from "wouter";

import NewsletterModal from "@/components/NewsletterModal";
import { setSEOHead } from "@/components/SEOHead";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { Section } from "@/components/ui/section/Section";
import { Icons } from "@/lib/icons";

type SitemapLink = {
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

type SitemapGroup = {
  label: string;
  title: string;
  links: SitemapLink[];
};

const copy = {
  pt: {
    label: "Mapa do Site",
    title: "Todas as páginas",
    highlight: "num só lugar.",
    subtitle: "Navegue facilmente por todas as secções do site da Sapiente.AI.",
    sections: {
      main: "Páginas principais",
      mainTitle: "Navegação principal",
      resources: "Recursos e ferramentas",
      resourcesTitle: "Conteúdos úteis",
      legal: "Informação legal",
      legalTitle: "Transparência e confiança",
    },
    links: {
      home: ["Início", "Visão geral das soluções, serviços e proposta de valor."],
      about: ["Sobre Nós", "A nossa visão, método de trabalho e forma de aplicar IA."],
      services: ["Serviços", "Soluções digitais, automação, marketing e IA aplicada ao crescimento."],
      faq: ["FAQ", "Respostas às perguntas mais frequentes sobre os nossos serviços."],
      quiz: ["Quiz IA", "Diagnóstico inicial para identificar oportunidades de automação."],
      newsletter: ["Newsletter", "Conteúdo prático sobre IA, automação e crescimento."],
      terms: ["Termos de Serviço", "Condições de utilização do site e dos nossos serviços."],
      privacy: ["Política de Privacidade", "Como recolhemos, tratamos e protegemos dados pessoais."],
      trust: ["Confiança & Segurança", "Princípios de segurança, ética e responsabilidade."],
      policy: ["Política de IA Generativa", "Como enquadramos o uso responsável de IA generativa."],
    },
  },
  en: {
    label: "Sitemap",
    title: "All pages",
    highlight: "in one place.",
    subtitle: "Easily navigate all sections of the Sapiente.AI website.",
    sections: {
      main: "Main pages",
      mainTitle: "Main navigation",
      resources: "Resources and tools",
      resourcesTitle: "Useful content",
      legal: "Legal information",
      legalTitle: "Transparency and trust",
    },
    links: {
      home: ["Home", "Overview of our solutions, services, and value proposition."],
      about: ["About us", "Our vision, working method, and approach to applied AI."],
      services: ["Services", "Digital solutions, automation, marketing and applied AI for growth."],
      faq: ["FAQ", "Quick answers to the most common questions about our services."],
      quiz: ["AI Quiz", "Initial diagnosis to identify automation opportunities."],
      newsletter: ["Newsletter", "Practical content on AI, automation, and growth."],
      terms: ["Terms of Service", "Terms of use for the website and services."],
      privacy: ["Privacy Policy", "How we collect, process, and protect personal data."],
      trust: ["Trust & Security", "Security, ethics, and accountability principles."],
      policy: ["Generative AI Policy", "How we frame responsible use of generative AI."],
    },
  },
} as const;

function makeLink(lang: string, path = "") {
  return `/${lang}${path}`;
}

function makeAnchorId(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function SitemapGroupBlock({ group, icon: Icon }: { group: SitemapGroup; icon: ElementType }) {
  const linkClass =
    "group grid gap-2 border-t border-[color-mix(in_srgb,var(--brand-primary)_14%,transparent)] px-5 py-5 text-left transition first:border-t-0 hover:bg-[color-mix(in_srgb,var(--brand-purple)_6%,transparent)]";

  const renderLinkContent = (link: SitemapLink, IconComponent: ElementType) => (
    <>
      <span className="flex items-center justify-between gap-4 font-[var(--font-heading)] text-[18px] font-black leading-snug text-[var(--brand-night)]">
        {link.title}
        <IconComponent className="h-4 w-4 shrink-0 text-[var(--brand-primary)] transition group-hover:translate-x-1" />
      </span>
      <span className="font-[var(--font-body)] text-sm font-medium leading-relaxed text-[var(--brand-night)]">
        {link.description}
      </span>
    </>
  );

  return (
    <article id={makeAnchorId(group.label)} className="overflow-hidden rounded-[18px] border-[6px] border-[color-mix(in_srgb,var(--brand-purple)_72%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] shadow-[0_18px_38px_rgba(1,32,80,0.06)]">
      <div className="flex items-start gap-4 border-b border-[color-mix(in_srgb,var(--brand-primary)_16%,transparent)] px-5 py-5 md:px-7">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand-purple)_72%,transparent)] bg-[#00D1FF] text-[var(--brand-night)] shadow-[0_8px_18px_color-mix(in_srgb,#00D1FF_18%,transparent)]">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="font-[var(--font-detail)] text-[12px] font-black uppercase tracking-[0.18em] text-[var(--brand-night)]">
            {group.label}
          </p>
          <h2 className="font-[var(--font-heading)] text-[28px] font-black leading-tight text-[var(--brand-night)]">
            {group.title}
          </h2>
        </div>
      </div>

      <ul>
        {group.links.map((link) => (
          <li key={link.href || link.title}>
            {link.href ? (
              <Link href={link.href} className={linkClass}>
                {renderLinkContent(link, Icons.ArrowRight)}
              </Link>
            ) : (
              <a
                href="#newsletter"
                onClick={(event) => {
                  event.preventDefault();
                  link.onClick?.();
                }}
                className={linkClass}
              >
                {renderLinkContent(link, Icons.Mail)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Sitemap() {
  const [location] = useLocation();
  const lang = location.split("/")[1] === "en" ? "en" : "pt";
  const content = copy[lang];
  const l = content.links;
  const quizHref = lang === "pt" ? makeLink(lang, "/quiz-ia") : makeLink(lang, "/quiz-ai");
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups: SitemapGroup[] = [
    {
      label: content.sections.main,
      title: content.sections.mainTitle,
      links: [
        { title: l.home[0], description: l.home[1], href: makeLink(lang) },
        { title: l.about[0], description: l.about[1], href: makeLink(lang, "/about") },
        { title: l.services[0], description: l.services[1], href: makeLink(lang, "/services") },
      ],
    },
    {
      label: content.sections.resources,
      title: content.sections.resourcesTitle,
      links: [
        { title: l.faq[0], description: l.faq[1], href: makeLink(lang, "/faq") },
        { title: l.quiz[0], description: l.quiz[1], href: quizHref },
        { title: l.newsletter[0], description: l.newsletter[1], onClick: () => setIsNewsletterOpen(true) },
      ],
    },
    {
      label: content.sections.legal,
      title: content.sections.legalTitle,
      links: [
        { title: l.terms[0], description: l.terms[1], href: makeLink(lang, "/terms") },
        { title: l.privacy[0], description: l.privacy[1], href: makeLink(lang, "/privacy") },
        { title: l.trust[0], description: l.trust[1], href: makeLink(lang, "/trust") },
        { title: l.policy[0], description: l.policy[1], href: makeLink(lang, "/generative-ai-policy") },
      ],
    },
  ];

  useEffect(() => {
    setSEOHead({
      title: `${content.label} — Sapiente.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/sitemap`,
      type: "website",
    });
  }, [content, lang]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={content.label}
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        compact
      />

      <Section className="bg-[var(--section-ice)] py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mb-4 font-[var(--font-detail)] text-[16px] font-black uppercase tracking-[0.18em] text-[var(--brand-night)] dark:text-[var(--brand-offwhite)]">
                {content.label}
              </p>
              <nav className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {groups.map((group, index) => {
                  const isActive = activeGroup ? activeGroup === group.label : index === 0;

                  return (
                    <a
                      key={group.label}
                      href={`#${makeAnchorId(group.label)}`}
                      onClick={() => setActiveGroup(group.label)}
                      className={[
                        "min-w-max rounded-[10px] border px-3.5 py-2.5 text-left font-[var(--font-body)] text-[18px] font-bold leading-tight transition-all duration-200",
                        isActive
                          ? "border-[color-mix(in_srgb,#00D1FF_58%,transparent)] bg-[color-mix(in_srgb,#00D1FF_22%,var(--brand-offwhite))] text-[var(--brand-night)] dark:bg-[color-mix(in_srgb,#00D1FF_72%,var(--brand-offwhite))] dark:text-[var(--brand-night)]"
                          : "border-transparent bg-transparent text-[var(--brand-night)] hover:bg-[color-mix(in_srgb,#00D1FF_16%,var(--brand-offwhite))] dark:text-[var(--brand-offwhite)] dark:hover:bg-[color-mix(in_srgb,#00D1FF_72%,var(--brand-offwhite))] dark:hover:text-[var(--brand-night)]",
                      ].join(" ")}
                    >
                      {group.label}
                    </a>
                  );
                })}
              </nav>
            </aside>

            <div className="grid gap-8">
              {groups.map((group, index) => {
                const Icon = [Icons.Home, Icons.Sparkles, Icons.ShieldCheck][index];
                return (
                  <Reveal key={group.label} delay={index * 100}>
                    <SitemapGroupBlock group={group} icon={Icon} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
}
