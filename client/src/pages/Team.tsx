import { Icons } from "@/lib/icons";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { Section } from "@/components/ui/section/Section";
import { setSEOHead } from "@/components/SEOHead";
import { getContent } from "@/lib/content";

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
        relative bg-white
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

        <h3 className="text-2xl font-bold mb-2 text-foreground">
          {member.name}
        </h3>

        <p className="text-lg text-primary font-bold mb-6">
          {member.role}
        </p>

        <p className="text-foreground/70 mb-8 leading-relaxed">
          {member.bio}
        </p>

        {/* STACK */}
        <div className="flex flex-wrap justify-center gap-3">
          {member.stack.map((tech, idx) => (
            <span
              key={idx}
              className="
                text-sm px-4 py-1.5 rounded-full
                bg-primary/5 text-primary font-medium
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
  const lang = location.split("/")[1] || "pt";

  const content = getContent("team", lang);

  useEffect(() => {
    setSEOHead({
      title: content.title,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/team`,
      type: "website"
    });
  }, [lang, content]);

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden">
        <img 
          src="/media/banners/hero-banner.webp" 
          alt="Sapiente AI Team Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
              {content.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mt-6 drop-shadow-md max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* TEAM - Ice White */}
      <Section className="bg-ice py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-10">
            {team.map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
