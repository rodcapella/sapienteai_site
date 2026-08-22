import { FormEvent, useState } from "react";

import TurnstileWidget from "@/components/TurnstileWidget";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { CheckCircle2, LoaderCircle, Mail, X } from "@/lib/icons";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function NewsletterUnsubscribe() {
  const { lang: rawLang } = useTranslation();
  const lang = rawLang === "en" ? "en" : "pt";
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [emailTouched, setEmailTouched] = useState(false);

  const copy = lang === "en"
    ? {
        eyebrow: "Newsletter preferences",
        title: "Unsubscribe from the newsletter",
        description: "Enter the email address used for your subscription. We will register your request and remove it from future newsletter communications.",
        label: "Subscription email",
        placeholder: "you@company.com",
        button: "Unsubscribe",
        processing: "Processing...",
        successTitle: "Request received",
        success: "If this email address is subscribed, it will be removed from future communications.",
        required: "Enter the email address used for your subscription.",
        invalid: "Enter a valid email address.",
        verification: "Complete the security verification before continuing.",
        rateLimited: "Too many attempts. Please wait a few minutes and try again.",
        error: "We couldn't register your request right now. Please try again shortly.",
      }
    : {
        eyebrow: "Preferências da newsletter",
        title: "Cancelar subscrição da newsletter",
        description: "Introduza o endereço de email utilizado na subscrição. Registaremos o pedido para o remover das próximas comunicações da newsletter.",
        label: "Email da subscrição",
        placeholder: "o-seu@empresa.com",
        button: "Cancelar subscrição",
        processing: "A processar...",
        successTitle: "Pedido recebido",
        success: "Se este endereço estiver inscrito, será removido das próximas comunicações.",
        required: "Introduza o endereço de email utilizado na subscrição.",
        invalid: "Introduza um endereço de email válido.",
        verification: "Conclua a verificação de segurança antes de continuar.",
        rateLimited: "Foram efetuadas demasiadas tentativas. Aguarde alguns minutos e tente novamente.",
        error: "Não foi possível registar o pedido agora. Tente novamente em instantes.",
      };

  useSEOHead({
    title: `${copy.title} · Sapiente.AI`,
    description: copy.description,
    url: `https://www.sapienteai.com/${lang}/newsletter/unsubscribe`,
    noindex: true,
  }, [lang]);

  const trimmedEmail = email.trim();
  const emailError = !trimmedEmail
    ? copy.required
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
      ? copy.invalid
      : "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "loading") return;
    setEmailTouched(true);
    if (emailError) {
      setSubmitState("error");
      return;
    }
    if (!turnstileToken && turnstileAvailable) {
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "unsubscribe",
          email: email.trim(),
          lang,
          turnstileToken: turnstileToken || "verification_unavailable",
          website,
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        if (result?.error === "turnstile_failed") {
          setTurnstileToken("");
          window.turnstile?.reset();
          throw new Error("turnstile_failed");
        }
        if (result?.error === "rate_limited") throw new Error("rate_limited");
        throw new Error("unsubscribe_failed");
      }
      setSubmitState("success");
      setTurnstileToken("");
    } catch (error) {
      setSubmitState("error");
      const reason = error instanceof Error ? error.message : "unsubscribe_failed";
      if (reason === "turnstile_failed") setRequestFeedback(copy.verification);
      else if (reason === "rate_limited") setRequestFeedback(copy.rateLimited);
      else setRequestFeedback(copy.error);
    }
  };

  const [requestFeedback, setRequestFeedback] = useState("");
  const feedback = submitState === "error" && !emailError
    ? requestFeedback || (!turnstileToken && turnstileAvailable ? copy.verification : copy.error)
    : "";

  return (
    <div className="standard-section-bg relative flex min-h-[720px] items-center justify-center overflow-hidden px-5 py-20 sm:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,color-mix(in_srgb,var(--brand-cyan)_18%,transparent),transparent_38%)]" />
      <section className="relative z-10 w-full max-w-2xl rounded-3xl border border-[var(--brand-cyan-bright)]/25 bg-[var(--brand-night)]/88 p-6 text-center shadow-[0_24px_80px_color-mix(in_srgb,var(--brand-night)_55%,transparent)] backdrop-blur-xl sm:p-10">
        {submitState === "success" ? (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/12">
              <CheckCircle2 className="h-9 w-9 text-emerald-300" />
            </div>
            <p className="type-label text-[var(--brand-cyan)]">{copy.eyebrow}</p>
            <h1 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">{copy.successTitle}</h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[var(--brand-offwhite)]/72">{copy.success}</p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-primary)]/16">
              <Mail className="h-9 w-9 text-[var(--brand-cyan)]" />
            </div>
            <p className="type-label text-[var(--brand-cyan)]">{copy.eyebrow}</p>
            <h1 className="mt-3 font-heading text-3xl font-black leading-tight !text-[var(--brand-offwhite)] sm:text-4xl">{copy.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--brand-offwhite)]/72">{copy.description}</p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg space-y-5 text-left" noValidate>
              <div className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="unsubscribe-website">Website</label>
                <input id="unsubscribe-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
              </div>
              <label htmlFor="unsubscribe-email" className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand-offwhite)]/80">{copy.label}</span>
                <input
                  id="unsubscribe-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setRequestFeedback(""); if (submitState === "error") setSubmitState("idle"); }}
                  onBlur={() => setEmailTouched(true)}
                  placeholder={copy.placeholder}
                  className="w-full rounded-xl border border-[var(--brand-cyan-bright)]/30 bg-[var(--brand-darkest)]/75 px-4 py-3.5 text-sm text-white outline-none placeholder:text-[var(--brand-offwhite)]/45 focus:border-[var(--brand-cyan)] focus:ring-2 focus:ring-[var(--brand-cyan)]/25"
                  aria-required="true"
                  aria-invalid={emailTouched && Boolean(emailError)}
                  aria-describedby={emailTouched && emailError ? "unsubscribe-email-error" : undefined}
                />
                {emailTouched && emailError && <p id="unsubscribe-email-error" className="mt-2 text-xs text-red-300">{emailError}</p>}
              </label>

              <TurnstileWidget
                theme="dark"
                showLoadError
                onVerify={(token) => { setTurnstileAvailable(true); setTurnstileToken(token); }}
                onExpire={() => setTurnstileToken("")}
                onError={() => { setTurnstileAvailable(false); setTurnstileToken(""); }}
              />

              {feedback && (
                <p role="alert" className="flex items-center gap-2 rounded-xl border border-red-300/35 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  <X className="h-4 w-4 shrink-0" />
                  {feedback}
                </p>
              )}

              <PremiumButton type="submit" className="w-full !rounded-xl !py-4" variant="primary">
                {submitState === "loading"
                  ? <><LoaderCircle className="h-4 w-4 animate-spin" />{copy.processing}</>
                  : copy.button}
              </PremiumButton>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
