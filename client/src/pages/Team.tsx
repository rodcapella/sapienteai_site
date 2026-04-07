import { Icons } from "@/lib/icons";
import { useEffect, useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

const team = [
  {
    name: "Rodrigo Póvoa",
    role: "Founder & Tech Lead",
    bio: "Building intelligent systems focused on clarity, speed, and decision-making.",
    stack: ["AI", "Automation", "Data Analytics Engineer", "Product Strategy"],
    image: "/media/photos/tati.jpg",
    link: "https://www.rpovoadata.tech",
  },
  {
    name: "Tatiane Gomes",
    role: "Marketing",
    bio: "Turning complex ideas into scalable and efficient systems.",
    stack: ["Marketing", "SEO", "GEO", "AEO", "AI"],
    image: "/media/photos/member.jpg",
    link: "#",
  },
];

type Member = typeof team[number];

// CARD
function TeamCard({ member }: { member: Member }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 10 });
  const springY = useSpring(y, { stiffness: 120, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.08);
    y.set(dy * 0.08);

    ref.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={member.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="group relative w-full md:w-[420px]"
    >
      {/* 🌌 GLOW */}
      <span
        className="
          absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition
        "
        style={{
          background: `
            radial-gradient(
              300px circle at var(--x) var(--y),
              rgba(34,211,238,0.15),
              transparent 40%
            )
          `
        }}
      />

      {/* CARD */}
      <div className="
        relative bg-white/80 backdrop-blur-xl
        border border-foreground/5
        rounded-2xl p-10 text-center
        transition-all duration-300
        group-hover:-translate-y-2
        group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]
      ">

        {/* IMAGE */}
        <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/10">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>

        <h3 className="text-2xl font-black mb-2 text-foreground tracking-tight">
          {member.name}
        </h3>

        <p className="text-lg text-primary font-black mb-6 uppercase tracking-widest">
          {member.role}
        </p>

        <p className="text-foreground/60 mb-8 leading-relaxed font-medium">
          {member.bio}
        </p>

        {/* STACK */}
        <div className="flex flex-wrap justify-center gap-3">
          {member.stack.map((tech, idx) => (
            <span
              key={idx}
              className="
                text-xs px-4 py-2 rounded-full
                bg-primary/5 text-primary font-black uppercase tracking-widest
                hover:bg-primary/10
                transition
              "
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </motion.a>
  );
}

export default function Team() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("team", lang);

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - SAPIENTE.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/team`,
      type: "website"
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER - Modern Gradient */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-modern-gradient flex items-center justify-center">
        {/* DECORATIVE ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="container max-w-5xl text-center px-6">
          <Reveal>
            <Link 
              href={`/${lang}`}
              className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest mb-8 hover:opacity-70 transition-opacity"
            >
              <Icons.ArrowLeft className="h-4 w-4" />
              {t('nav.home')}
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-8xl font-black text-foreground tracking-tighter leading-[0.9] mb-10">
              {content.title}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl md:text-3xl text-foreground/60 font-black uppercase tracking-[0.2em] drop-shadow-md">
              {content.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* TEAM - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-10">
            {team.map((member, i) => (
              <Reveal key={i} delay={i * 200}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
