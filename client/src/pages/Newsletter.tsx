import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { setSEOHead } from "@/components/SEOHead";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Icons } from "@/lib/icons";

export default function Newsletter() {
  const [location] = useLocation();
  const lang = location.split("/")[1] === "en" ? "en" : "pt";
  const isPT = lang === "pt";

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setSEOHead({
      title: isPT ? "Newsletter - Sapiente.AI" : "Newsletter - Sapiente.AI",
      description: isPT
        ? "Registe-se na newsletter da Sapiente.AI para receber insights sobre IA, automação e crescimento digital."
        : "Subscribe to the Sapiente.AI newsletter for insights on AI, automation and digital growth.",
      url: `https://sapienteai.com/${lang}/newsletter`,
      type: "website",
    });
  }, [isPT, lang]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05081B] pt-28 text-[var(--brand-offwhite)] tech-grid scanlines md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,209,255,0.22),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(123,129,255,0.18),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 dots-matrix opacity-20" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--brand-cyan)]/35 bg-[#071129]/70 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[var(--brand-cyan)] backdrop-blur-xl">
            <Icons.Mail className="h-4 w-4" />
            {isPT ? "Newsletter Sapiente.AI" : "Sapiente.AI Newsletter"}
          </div>

          <h1 className="font-heading text-4xl font-black leading-[0.95] tracking-tight text-[var(--brand-offwhite)] sm:text-6xl md:text-7xl">
            {isPT ? "Registe-se na nossa newsletter" : "Subscribe to our newsletter"}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--brand-offwhite)]/75 sm:text-xl">
            {isPT
              ? "Receba conteúdos sobre inteligência artificial, automação, marketing digital e formas práticas de tornar o seu negócio mais eficiente."
              : "Get insights on artificial intelligence, automation, digital marketing and practical ways to make your business more efficient."}
          </p>

          <div className="mt-8 grid gap-3 text-sm text-[var(--brand-offwhite)]/72 sm:grid-cols-2">
            {[isPT ? "IA aplicada ao negócio" : "Business AI", isPT ? "Automação inteligente" : "Smart automation", isPT ? "Marketing e crescimento" : "Marketing and growth", isPT ? "Dicas práticas" : "Practical insights"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[var(--brand-cyan)]/20 bg-[#071129]/55 px-4 py-3 backdrop-blur-xl">
                <Icons.CheckCircle className="h-4 w-4 shrink-0 text-[var(--brand-cyan)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--brand-cyan)]/30 bg-[#071129]/72 p-6 shadow-[0_0_60px_rgba(0,209,255,0.18)] backdrop-blur-2xl sm:p-8 md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--brand-cyan)]/40 bg-[var(--brand-cyan)]/12 text-[var(--brand-cyan)]">
              <Icons.Send className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-black text-[var(--brand-offwhite)]">
              {isPT ? "Registo na newsletter" : "Newsletter sign-up"}
            </h2>
            <p className="mt-2 text-sm text-[var(--brand-offwhite)]/62">
              {isPT ? "Preencha os dados abaixo para receber novidades." : "Fill in the details below to receive updates."}
            </p>
          </div>

          <form className="space-y-5" action="https://formsubmit.co/sapiente.ai.oficial@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="Novo registo na newsletter - Sapiente.AI" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">{isPT ? "Nome" : "Name"}</span>
              <input name="name" required type="text" className="w-full rounded-2xl border border-[var(--brand-cyan)]/24 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-cyan)] focus:ring-2 focus:ring-[var(--brand-cyan)]/30" />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">E-mail</span>
              <input name="email" required type="email" className="w-full rounded-2xl border border-[var(--brand-cyan)]/24 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-cyan)] focus:ring-2 focus:ring-[var(--brand-cyan)]/30" />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">{isPT ? "Cargo" : "Role"}</span>
                <input name="role" type="text" className="w-full rounded-2xl border border-[var(--brand-cyan)]/24 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-cyan)] focus:ring-2 focus:ring-[var(--brand-cyan)]/30" />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-cyan)]">{isPT ? "Empresa" : "Company"}</span>
                <input name="company" type="text" className="w-full rounded-2xl border border-[var(--brand-cyan)]/24 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--brand-cyan)] focus:ring-2 focus:ring-[var(--brand-cyan)]/30" />
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-[var(--brand-cyan)]/18 bg-black/28 p-4 text-sm leading-relaxed text-[var(--brand-offwhite)]/70">
              <input type="checkbox" required checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-4 w-4 rounded border-[var(--brand-cyan)]/40 bg-black" />
              <span>
                {isPT
                  ? "Li e compreendi a Política de Privacidade e autorizo o tratamento dos meus dados para receber comunicações da Sapiente.AI."
                  : "I have read and understood the Privacy Policy and authorize the processing of my data to receive communications from Sapiente.AI."}
              </span>
            </label>

            <PremiumButton type="submit" disabled={!accepted} variant="primary" className="w-full rounded-2xl py-5 text-sm tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-50">
              {isPT ? "Registar" : "Subscribe"}
            </PremiumButton>
          </form>
        </div>
      </section>
    </main>
  );
}
