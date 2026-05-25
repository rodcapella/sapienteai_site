import { FormEvent, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Icons } from "@/lib/icons";

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NewsletterLang = "pt" | "en";
type SubmitState = "idle" | "loading" | "success" | "error";

type NewsletterFormData = {
  name: string;
  email: string;
  role: string;
  company: string;
  accepted: boolean;
};

const INITIAL_FORM: NewsletterFormData = {
  name: "",
  email: "",
  role: "",
  company: "",
  accepted: false,
};

const modalText = {
  pt: {
    closeLabel: "Fechar modal da newsletter",
    badge: "Newsletter Sapiente.AI",
    title: "Registe-se na nossa newsletter",
    description:
      "Receba conteúdos sobre inteligência artificial, automação, marketing digital e formas práticas de tornar o seu negócio mais eficiente.",
    formTitle: "Registo na newsletter",
    formDescription: "Preencha os dados abaixo para receber novidades.",
    labels: {
      name: "Nome",
      email: "E-mail",
      role: "Cargo",
      company: "Empresa",
      accepted:
        "Li e compreendi a Política de Privacidade e autorizo o tratamento dos meus dados para receber comunicações da Sapiente.AI.",
    },
    placeholders: {
      name: "Ex: Ana Silva",
      email: "exemplo@empresa.com",
      role: "Ex: Diretora de Marketing",
      company: "Nome da empresa",
    },
    benefits: ["IA aplicada ao negócio", "Automação inteligente", "Marketing e crescimento", "Dicas práticas"],
    errors: {
      name: "Nome é obrigatório.",
      email: "Email é obrigatório.",
      invalidEmail: "Insira um email válido.",
      accepted: "Confirme a autorização para receber comunicações.",
      submit: "Não foi possível concluir o registo. Tente novamente em instantes.",
    },
    submit: {
      idle: "Registar",
      loading: "A registar...",
      success: "Registo confirmado! Obrigado por se juntar a nós.",
    },
    subject: "Novo registo na newsletter - Sapiente.AI",
  },
  en: {
    closeLabel: "Close newsletter modal",
    badge: "Sapiente.AI Newsletter",
    title: "Subscribe to our newsletter",
    description:
      "Get insights on artificial intelligence, automation, digital marketing, and practical ways to make your business more efficient.",
    formTitle: "Newsletter sign-up",
    formDescription: "Fill in the details below to receive updates.",
    labels: {
      name: "Name",
      email: "Email",
      role: "Role",
      company: "Company",
      accepted:
        "I have read and understood the Privacy Policy and authorize the processing of my data to receive communications from Sapiente.AI.",
    },
    placeholders: {
      name: "Ex: Anna Smith",
      email: "example@company.com",
      role: "Ex: Marketing Director",
      company: "Company name",
    },
    benefits: ["Business AI", "Smart automation", "Marketing and growth", "Practical insights"],
    errors: {
      name: "Name is required.",
      email: "Email is required.",
      invalidEmail: "Enter a valid email address.",
      accepted: "Confirm authorization to receive communications.",
      submit: "We could not complete your subscription. Please try again shortly.",
    },
    submit: {
      idle: "Subscribe",
      loading: "Subscribing...",
      success: "Subscription confirmed! Thank you for joining us.",
    },
    subject: "New newsletter subscription - Sapiente.AI",
  },
} as const;

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [location] = useLocation();
  const lang: NewsletterLang = location.startsWith("/en") ? "en" : "pt";
  const text = modalText[lang];

  const [formData, setFormData] = useState<NewsletterFormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const updateField = <K extends keyof NewsletterFormData>(field: K, value: NewsletterFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitState === "error") {
      setSubmitState("idle");
      setFeedbackMessage("");
    }
  };

  const resetModalState = () => {
    setFormData(INITIAL_FORM);
    setSubmitState("idle");
    setFeedbackMessage("");
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => resetModalState(), 200);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return text.errors.name;
    if (!formData.email.trim()) return text.errors.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return text.errors.invalidEmail;
    if (!formData.accepted) return text.errors.accepted;
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "loading") return;

    const validationError = validateForm();
    if (validationError) {
      setSubmitState("error");
      setFeedbackMessage(validationError);
      return;
    }

    setSubmitState("loading");
    setFeedbackMessage(text.submit.loading);

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("role", formData.role.trim() || "Not provided");
      payload.append("company", formData.company.trim() || "Not provided");
      payload.append("privacy_consent", formData.accepted ? "Accepted" : "Not accepted");
      payload.append("_subject", text.subject);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const response = await fetch("https://formsubmit.co/sapiente.ai.oficial@gmail.com", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("newsletter_submit_failed");

      setSubmitState("success");
      setFeedbackMessage(text.submit.success);
      setFormData(INITIAL_FORM);
    } catch {
      setSubmitState("error");
      setFeedbackMessage(text.errors.submit);
    }
  };

  const statusNode = useMemo(() => {
    if (submitState === "idle") return null;

    if (submitState === "loading") {
      return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-[rgba(10,180,255,0.38)] bg-[rgba(5,8,27,0.7)] px-4 py-3 text-sm text-[var(--brand-offwhite)]" role="status" aria-live="polite">
          <Icons.LoaderCircle className="h-4 w-4 animate-spin text-[var(--brand-primary)]" />
          <span>{feedbackMessage}</span>
        </motion.div>
      );
    }

    if (submitState === "success") {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 rounded-xl border border-emerald-300/50 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100" role="status" aria-live="polite">
          <Icons.CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <span>{feedbackMessage}</span>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-red-300/45 bg-red-500/10 px-4 py-3 text-sm text-red-100" role="alert" aria-live="assertive">
        <Icons.AlertTriangle className="h-5 w-5 text-red-300" />
        <span>{feedbackMessage}</span>
      </motion.div>
    );
  }, [feedbackMessage, submitState]);

  const inputClass =
    "w-full rounded-xl border border-[rgba(10,180,255,0.28)] bg-[linear-gradient(145deg,rgba(5,8,27,0.86),rgba(16,24,46,0.62))] px-4 py-3 text-sm text-[var(--brand-offwhite)] placeholder:text-[rgba(10,180,255,0.62)] outline-none transition-all duration-300 hover:border-[rgba(85,212,242,0.58)] focus:border-[var(--brand-primary)] focus:shadow-[0_0_0_1px_rgba(10,180,255,0.7),0_0_26px_rgba(10,180,255,0.28)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent showCloseButton={false} className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[rgba(10,180,255,0.5)] bg-[linear-gradient(145deg,rgba(5,8,27,0.9),rgba(1,32,80,0.84))] p-0 shadow-[0_0_0_1px_rgba(10,180,255,0.32),0_0_60px_rgba(10,180,255,0.28),0_24px_90px_rgba(5,8,27,0.65)] backdrop-blur-2xl sm:max-w-4xl" aria-describedby="newsletter-modal-description">
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="relative max-h-[92vh] overflow-y-auto p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(10,180,255,0.06) 0px, rgba(10,180,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(85,212,242,0.05) 0px, rgba(85,212,242,0.05) 1px, transparent 1px, transparent 28px)" }} />
            <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,180,255,0.42)_0%,rgba(10,180,255,0)_70%)] blur-3xl" />
          </div>

          <button type="button" onClick={closeModal} aria-label={text.closeLabel} className="absolute right-4 top-4 z-20 rounded-full border border-[rgba(10,180,255,0.4)] bg-[var(--brand-primary)] p-2 text-white transition-all duration-300 hover:border-[rgba(85,212,242,0.88)] hover:text-white hover:shadow-[0_0_20px_rgba(10,180,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]">
            <Icons.X className="h-4 w-4" />
          </button>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center pt-8 lg:pt-0">
              <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-[var(--brand-primary)]/45 bg-[#050816]/70 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[var(--brand-primary)] backdrop-blur-xl">
                <Icons.Mail className="h-4 w-4" />
                {text.badge}
              </div>

              <DialogHeader className="mb-7 space-y-4 text-left">
                <DialogTitle className="font-heading text-3xl font-extrabold leading-tight tracking-tight !text-[var(--brand-offwhite)] sm:text-4xl">
                  {text.title}
                </DialogTitle>
                <DialogDescription id="newsletter-modal-description" className="max-w-xl text-sm leading-relaxed text-[rgba(234,246,255,0.76)] sm:text-base">
                  {text.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 text-sm text-[rgba(234,246,255,0.76)] sm:grid-cols-2">
                {text.benefits.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--brand-primary)]/20 bg-[#050816]/55 px-4 py-3 backdrop-blur-xl">
                    <Icons.CheckCircle className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--brand-primary)]/30 bg-[#050816]/72 p-5 shadow-[0_0_42px_rgba(10,180,255,0.16)] backdrop-blur-2xl sm:p-7" noValidate>
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--brand-primary)]/40 bg-[var(--brand-primary)]/12 text-[var(--brand-primary)]">
                  <Icons.Send className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-2xl font-black text-[var(--brand-offwhite)]">{text.formTitle}</h2>
                <p className="mt-2 text-sm text-[rgba(234,246,255,0.62)]">{text.formDescription}</p>
              </div>

              <div className="space-y-4">
                <label className="block space-y-1.5">
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">{text.labels.name}</span>
                  <input name="name" required type="text" value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder={text.placeholders.name} className={inputClass} disabled={submitState === "loading"} />
                </label>

                <label className="block space-y-1.5">
                  <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">{text.labels.email}</span>
                  <input name="email" required type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder={text.placeholders.email} className={inputClass} disabled={submitState === "loading"} />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">{text.labels.role}</span>
                    <input name="role" type="text" value={formData.role} onChange={(event) => updateField("role", event.target.value)} placeholder={text.placeholders.role} className={inputClass} disabled={submitState === "loading"} />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">{text.labels.company}</span>
                    <input name="company" type="text" value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder={text.placeholders.company} className={inputClass} disabled={submitState === "loading"} />
                  </label>
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-[var(--brand-primary)]/20 bg-[#050816]/40 p-4 text-sm leading-relaxed text-[rgba(234,246,255,0.72)]">
                  <input type="checkbox" required checked={formData.accepted} onChange={(event) => updateField("accepted", event.target.checked)} className="mt-1 h-4 w-4 rounded border-[var(--brand-primary)]/40 bg-[#050816]" disabled={submitState === "loading"} />
                  <span>{text.labels.accepted}</span>
                </label>

                <AnimatePresence mode="wait">{statusNode && <motion.div key={submitState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{statusNode}</motion.div>}</AnimatePresence>

                <PremiumButton type="submit" variant="primary" className={`w-full rounded-2xl py-5 text-sm tracking-[0.18em] ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}>
                  {submitState === "loading" ? <><Icons.LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.loading}</> : text.submit.idle}
                </PremiumButton>
              </div>
            </form>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
