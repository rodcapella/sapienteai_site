import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Icons } from "@/lib/icons";

import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { setSEOHead } from "@/components/SEOHead";

import { getContent } from "@/lib/content";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from '@/hooks/useTranslation';

const CheckCircle = Icons.CheckCircle;
const AlertCircle = Icons.AlertCircle;
const ArrowLeft = Icons.ArrowLeft;

export default function Contact() {
  const [location] = useLocation();
  const { t } = useTranslation();
  const lang = location.split("/")[1] || "pt";

  const content = getContent("contact", lang);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setSEOHead({
      title: `${content.title} - Sapiente.AI`,
      description: content.subtitle,
      url: `https://sapienteai.com/${lang}/contact`,
      type: 'website'
    });
  }, [lang, content]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("_captcha", "false");

      const res = await fetch("https://formsubmit.co/sapiente.ai.oficial@gmail.com", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error();
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col">
      <InternalHero label={lang === "pt" ? "Contacto" : "Contact"} title={content.title} subtitle={content.subtitle}>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-cyan)]/35 bg-[#08112a]/70 px-5 py-3 text-sm font-black uppercase tracking-[0.2em] text-[var(--brand-cyan)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-cyan)] hover:bg-[var(--brand-cyan)]/15 hover:text-white hover:shadow-[0_0_38px_rgba(0,209,255,0.35)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('nav.home')}
        </Link>
      </InternalHero>

      {/* FORM SECTION - Solid Ice White */}
      <Section className="bg-ice py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <SectionCard className="p-10 md:p-16 bg-white/80 backdrop-blur-2xl shadow-2xl border-foreground/5">
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* NAME */}
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 block">
                      {content.form.name}
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="
                        w-full px-8 py-5 rounded-2xl
                        bg-white border border-foreground/10
                        text-xl text-foreground
                        focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                        transition-all duration-500
                      "
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 block">
                      {content.form.email}
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      className="
                        w-full px-8 py-5 rounded-2xl
                        bg-white border border-foreground/10
                        text-xl text-foreground
                        focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                        transition-all duration-500
                      "
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 block">
                      {content.form.message}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="
                        w-full px-8 py-5 rounded-2xl
                        bg-white border border-foreground/10
                        text-xl text-foreground
                        focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary
                        transition-all duration-500
                      "
                    />
                  </div>

                  {/* STATUS */}
                  {status === "success" && (
                    <Reveal>
                      <div className="flex items-center gap-4 text-green-500 font-black uppercase tracking-widest bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
                        <CheckCircle className="w-6 h-6" />
                        {content.success}
                      </div>
                    </Reveal>
                  )}

                  {status === "error" && (
                    <Reveal>
                      <div className="flex items-center gap-4 text-red-500 font-black uppercase tracking-widest bg-red-500/10 p-6 rounded-2xl border border-red-500/20">
                        <AlertCircle className="w-6 h-6" />
                        {content.error}
                      </div>
                    </Reveal>
                  )}

                  {/* CTA */}
                  <div className="pt-6">
                    <PremiumButton className="w-full py-8 text-xl">
                      {status === "loading" ? content.sending : content.button}
                    </PremiumButton>
                  </div>
                </form>
              </SectionCard>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
