import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import { Icons } from "@/lib/icons";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { QuizCTA } from "@/components/ui/cta/QuizCTA";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { setSEOHead } from '@/components/SEOHead';
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

type Founder = {
  name: string;
  role: string;
  focus: string;
  bio: string;
  story?: string;
  stack: string[];
  badges?: string[];
  image: string;
  link: string;
};

type Highlight = {
  value: string;
  title: string;
  text: string;
};

type Capability = {
  value: string;
  label: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function FounderCard({ founder }: { founder: Founder }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current.style.setProperty("--x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={founder.link}
      target={founder.link === "#" ? undefined : "_blank"}
      rel={founder.link === "#" ? undefined : "noopener noreferrer"}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full"
    >
      <span
        className="absolute inset-0 rounded-[1.75rem] opacity-0 transition group-hover:opacity-100"
        style={{ background: "radial-gradient(300px circle at var(--x) var(--y), rgba(0,209,255,0.15), transparent 40%)" }}
      />

      <div className="founders-member-card flex h-full flex-col p-7 text-left transition-all duration-300 group-hover:-translate-y-2 md:p-9">
        <div className="relative z-10 mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="founders-avatar-frame">
            {founder.image ? <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" /> : <div className="relative z-10 text-4xl font-black">{getInitials(founder.name)}</div>}
          </div>

          <div className="min-w-0 pt-1">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-primary/70">{founder.role}</p>
            <h3 className="founders-member-name mb-4 text-3xl font-black leading-none md:text-4xl">{founder.name}</h3>
            <p className="founders-member-focus inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.14em]">{founder.focus}</p>
          </div>
        </div>

        <div className="founders-member-description relative z-10 mb-7 p-6">
          <p className="founders-member-bio text-2xl font-black leading-tight">{founder.bio}</p>
        </div>

        {founder.story && <p className="founders-member-story relative z-10 mb-8 text-lg font-medium leading-relaxed">{founder.story}</p>}

        {founder.badges && founder.badges.length > 0 && (
          <div className="founders-badges relative z-10 mb-8 flex flex-wrap gap-x-5 gap-y-3">
            {founder.badges.map((badge) => (
              <span key={badge} className="founders-badge">
                <span className="founders-badge-indicator" />
                {badge}
              </span>
            ))}
          </div>
        )}

        <div className="founders-stack-panel relative z-10 mt-auto">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-primary/70">Stack & foco</p>
          <div className="flex flex-wrap gap-3">
            {founder.stack.map((tech) => <span key={tech} className={`founders-stack-chip ${tech.toLowerCase().includes("ai") ? "founders-stack-chip-ai" : ""}`}>{tech}</span>)}
          </div>
        </div>

        {founder.link !== "#" && (
          <span className="founders-website-link relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em]">
            Website
            <Icons.ExternalLink className="h-4 w-4" />
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function About() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("about", lang);
  const founders = content.founders;
  const members: Founder[] = founders.members;

  useEffect(() => {
    setSEOHead({
      title: `${t('nav.about')} - SAPIENTE.AI`,
      description: content.hero.title,
      url: `https://sapienteai.com/${lang}/about`,
      type: 'website'
    });
  }, [lang, content, t]);

  return (
    <div className="flex flex-col">
      <InternalHero
        label={t("nav.about")}
        title={content.hero.title}
        highlight={content.hero.highlight}
        subtitle={content.hero.subtitle}
        image="/media/bg/sobre/bg_Sobre_nos.png"
        imageAlt="Sapiente.AI"
      />

      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="sticky top-28 hidden rounded-[2rem] border border-[var(--brand-purple)]/18 bg-[var(--card)] p-8 shadow-2xl lg:block">
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">SAPIENTE.AI</p>
                <div className="grid gap-4">
                  {content.proof.items.map((item: { value: string; title: string }) => (
                    <div key={item.value} className="flex items-center gap-4 rounded-2xl bg-foreground/[0.03] p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-[#EAF6FF]">{item.value}</span>
                      <span className="text-sm font-black tracking-tight text-foreground">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-8">
                {content.manifesto.map((line: string, i: number) => (
                  <p key={i} className={`text-2xl md:text-5xl font-black tracking-tight leading-tight ${line === "" ? "h-8" : "text-foreground"}`}>{line}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-[var(--section-ice)] py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <Reveal>
              <div>
                <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">{content.proof.eyebrow}</p>
                <h2 className="mb-8 text-4xl font-black leading-none tracking-tighter text-foreground md:text-7xl">{content.proof.title}</h2>
                <p className="text-lg font-medium leading-relaxed text-foreground/60 md:text-2xl">{content.proof.text}</p>
              </div>
            </Reveal>

            <div className="grid gap-5">
              {content.proof.items.map((item: { value: string; title: string; text: string }, i: number) => (
                <Reveal key={item.value} delay={i * 100}>
                  <div className="grid gap-5 rounded-[1.5rem] border border-foreground/5 bg-ice p-6 shadow-[0_18px_50px_rgba(5,8,22,0.04)] transition hover:-translate-y-1 hover:border-primary/20 md:grid-cols-[96px_1fr] md:p-8">
                    <div className="text-5xl font-black leading-none tracking-tighter text-primary/30">{item.value}</div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">{item.title}</h3>
                      <p className="text-base font-medium leading-relaxed text-foreground/60">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-blue-tint py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal><h2 className="text-4xl md:text-7xl font-black mb-20 text-foreground tracking-tighter leading-none">{content.shift.title}</h2></Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {content.shift.items.map((item: string, i: number) => (
                <Reveal key={i} delay={i * 100}>
                  <SectionCard className="min-h-[220px] bg-[var(--card)] border-[var(--brand-purple)]/18 p-7 shadow-xl hover:shadow-[0_20px_60px_rgba(5,8,22,0.1)] transition-all duration-700">
                    <p className="mb-8 text-sm font-black text-primary/50">{String(i + 1).padStart(2, "0")}</p>
                    <p className="text-xl font-black text-foreground tracking-tight leading-tight">
                      {item.split(' â†’ ').map((part, idx) => (
                        <span key={idx} className={idx === 1 ? "text-primary block mt-3" : "text-foreground/40 block"}>{idx === 1 ? `â†’ ${part}` : part}</span>
                      ))}
                    </p>
                  </SectionCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-24 md:py-48 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0A84FF]/5 blur-[120px] rounded-full -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="space-y-10">
                <h3 className="text-4xl md:text-7xl font-black text-foreground tracking-tighter leading-none">{content.problem.title}</h3>
                <p className="text-xl md:text-2xl text-foreground/60 font-medium leading-relaxed">{content.problem.text}</p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <SectionCard className="bg-[var(--card)] p-12 md:p-16 shadow-2xl border-[var(--brand-purple)]/20 relative group">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl rotate-[-12deg] group-hover:rotate-0 transition-all duration-500">
                  <Icons.Zap className="text-[#EAF6FF] w-10 h-10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none mb-10">{content.vision.title}</h3>
                <p className="text-xl md:text-2xl text-foreground/70 font-medium leading-relaxed">{content.vision.text}</p>
              </SectionCard>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="founders-section-shell founders-intro-section bg-ice py-24 md:py-40">
        <div className="container mx-auto px-6">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <Reveal>
              <div className="founders-intro-panel h-full p-7 md:p-9">
                <div className="relative z-10">
                  <p className="mb-6 text-sm font-black uppercase tracking-[0.24em] text-primary">{founders.intro.eyebrow}</p>
                  <h2 className="mb-8 text-4xl font-black leading-none text-foreground md:text-6xl">{founders.intro.title}</h2>
                  <p className="text-xl font-medium leading-relaxed !text-[#00D1FF] md:text-[26px]">{founders.intro.text}</p>
                  <div className="mt-10 grid grid-cols-2 gap-4 border-t border-primary/10 pt-8 sm:grid-cols-3">
                    {founders.intro.capabilities.map((item: Capability) => (
                      <div key={`${item.value}-${item.label}`}>
                        <p className="text-3xl font-black text-primary">{item.value}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-foreground/45">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-7 lg:content-between">
              {founders.intro.highlights.map((item: Highlight, index: number) => (
                <Reveal key={item.value} delay={index * 100}>
                  <div className="founders-highlight-card grid gap-5 p-6 transition duration-500 hover:-translate-y-1 hover:border-[#00D1FF]/40 hover:shadow-[0_24px_64px_rgba(0,209,255,0.16)] md:grid-cols-[80px_1fr] md:p-8">
                    <div className="text-[2.375rem] font-black leading-none text-[#0057FF]">{item.value}</div>
                    <div>
                      <h3 className="mb-3 text-2xl font-black text-[#0057FF]">{item.title}</h3>
                      <p className="text-base font-medium leading-relaxed text-[#0057FF]/75">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="founders-section-shell bg-blue-tint py-24 md:py-40">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="relative z-10 mx-auto mb-16 max-w-4xl text-center">
              <p className="mx-auto mb-7 inline-flex rounded-full border border-[#7861FF]/35 bg-white/80 px-5 py-2 text-sm font-black uppercase tracking-[0.24em] text-[#001547] shadow-[0_18px_40px_rgba(26,31,46,0.08)] backdrop-blur-xl dark:border-[#00D1FF]/35 dark:bg-[#001547]/75 dark:text-[#EAF6FF]">{founders.presentation.eyebrow}</p>
              <h2 className="founders-title mb-8 text-4xl font-black leading-none md:text-7xl">{founders.presentation.title}</h2>
              <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-[#0A84FF] md:text-2xl">{founders.presentation.text}</p>
            </div>
          </Reveal>

          <div className="relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {members.map((member) => (
              <Reveal key={member.name}><FounderCard founder={member} /></Reveal>
            ))}
          </div>
        </div>
      </Section>

      <QuizCTA />
      <FinalCTA
        title={founders.cta.title}
        title_highlight={founders.cta.title_highlight}
        description={founders.cta.description}
        description_highlight={founders.cta.description_highlight}
        button={founders.cta.button}
        align="left"
      />
    </div>
  );
}
