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
import TurnstileWidget from "@/components/TurnstileWidget";
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
  source: string;
  accepted: boolean;
};

const INITIAL_FORM: NewsletterFormData = {
  name: "",
  email: "",
  role: "",
  company: "",
  source: "",
  accepted: false,
};

const requiredFields: (keyof NewsletterFormData)[] = ["name", "email", "accepted"];

const sourceOptions = {
  pt: ["Eventos", "Google", "Indicação", "Instagram", "LinkedIn", "Newsletter", "Pesquisa Orgânica", "Pinterest", "TikTok", "X", "Outros"],
  en: ["Events", "Google", "Instagram", "LinkedIn", "Newsletter", "Organic Search", "Pinterest", "Referral", "TikTok", "X", "Other"],
};

const modalText = {
  pt: {
    closeLabel: "Fechar modal da newsletter",
    badge: "Newsletter Sapiente.AI",
    title: "Registe-se na nossa newsletter",
    description:
      "Receba conteúdos sobre inteligência artificial, automação, marketing digital e formas práticas de tornar o seu negócio mais eficiente.",
    requiredFields: "Campos obrigatórios",
    optional: "(OPCIONAL)",
    labels: {
      name: "Nome",
      email: "Email",
      role: "Cargo",
      company: "Empresa",
      source: "Como nos encontrou?",
      accepted:
        "Li e compreendi a Política de Privacidade e autorizo o tratamento dos meus dados para receber comunicações da Sapiente.AI.",
    },
    placeholders: {
      name: "Ex: Ana Silva",
      email: "exemplo@empresa.com",
      role: "Ex: Diretora de Marketing",
      company: "Nome da empresa",
      source: "Selecione uma opção",
    },
    errors: {
      name: "Nome é obrigatório.",
      email: "Email é obrigatório.",
      invalidEmail: "Insira um email válido.",
      accepted: "Confirme a autorização para receber comunicações.",
      form: "Reveja os campos obrigatórios e conclua a verificação antes de enviar.",
      turnstile: "Conclua a verificação de segurança antes de enviar.",
      turnstileExpired: "A verificação expirou. Por favor, confirme novamente.",
      turnstileError: "Não foi possível validar a verificação. Tente novamente.",
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
    requiredFields: "Required fields",
    optional: "(OPTIONAL)",
    labels: {
      name: "Name",
      email: "Email",
      role: "Role",
      company: "Company",
      source: "How did you find us?",
      accepted:
        "I have read and understood the Privacy Policy and authorize the processing of my data to receive communications from Sapiente.AI.",
    },
    placeholders: {
      name: "Ex: Anna Smith",
      email: "example@company.com",
      role: "Ex: Marketing Director",
      company: "Company name",
      source: "Select an option",
    },
    errors: {
      name: "Name is required.",
      email: "Email is required.",
      invalidEmail: "Enter a valid email address.",
      accepted: "Confirm authorization to receive communications.",
      form: "Please review the required fields and complete verification before sending.",
      turnstile: "Complete the security verification before sending.",
      turnstileExpired: "The verification expired. Please confirm it again.",
      turnstileError: "We couldn't validate the verification. Please try again.",
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

const PARTICLES = [
  { left: "8%", top: "18%", size: 4, delay: 0.2 },
  { left: "20%", top: "72%", size: 3, delay: 1.3 },
  { left: "37%", top: "22%", size: 2, delay: 0.7 },
  { left: "56%", top: "81%", size: 4, delay: 1.9 },
  { left: "68%", top: "35%", size: 3, delay: 0.4 },
  { left: "79%", top: "12%", size: 2, delay: 1.1 },
  { left: "90%", top: "64%", size: 3, delay: 1.6 },
];

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [location] = useLocation();
  const lang: NewsletterLang = location.startsWith("/en") ? "en" : "pt";
  const text = modalText[lang];

  const [formData, setFormData] = useState<NewsletterFormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
    setTurnstileToken("");
    setTurnstileAvailable(true);
    setHasSubmitted(false);
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => resetModalState(), 200);
  };

  const getRequiredFieldLabel = (field: keyof NewsletterFormData) => {
    const labels: Partial<Record<keyof NewsletterFormData, string>> = {
      name: text.labels.name,
      email: text.labels.email,
      accepted: lang === "en" ? "Privacy authorization" : "Autorização de privacidade",
    };

    return labels[field] || String(field);
  };

  const buildMissingFieldsMessage = (fields: (keyof NewsletterFormData)[]) => {
    const fieldList = fields.map(getRequiredFieldLabel).join(", ");
    return lang === "en"
      ? `Please fill in the required fields before subscribing: ${fieldList}.`
      : `Preencha os campos obrigatórios antes de se registar: ${fieldList}.`;
  };

  const validateForm = () => {
    const missingFields = requiredFields.filter((field) => {
      const value = formData[field];
      return typeof value === "boolean" ? !value : !value.trim();
    });

    if (missingFields.length > 0) {
      return buildMissingFieldsMessage(missingFields);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return text.errors.invalidEmail;
    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    if (submitState === "loading") return;

    const validationError = validateForm();
    if (validationError) {
      setSubmitState("error");
      setFeedbackMessage(validationError || text.errors.form);
      return;
    }

    if (!turnstileToken && turnstileAvailable) {
      setSubmitState("error");
      setFeedbackMessage(text.errors.turnstile);
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
      payload.append("source", formData.source.trim() || "Not provided");
      payload.append("privacy_consent", formData.accepted ? "Accepted" : "Not accepted");
      payload.append("turnstile_token", turnstileToken || "verification_unavailable");
      payload.append("turnstile_status", turnstileToken ? "verified" : "unavailable");
      payload.append("_subject", text.subject);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const response = await fetch("https://formsubmit.co/contato@sapienteai.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) throw new Error("newsletter_submit_failed");

      setSubmitState("success");
      setFeedbackMessage(text.submit.success);
      setFormData(INITIAL_FORM);
      setTurnstileToken("");
      setTurnstileAvailable(true);
      setHasSubmitted(false);
    } catch {
      setSubmitState("error");
      setFeedbackMessage(text.errors.submit);
    }
  };

  const statusNode = useMemo(() => {
    if (submitState === "idle") return null;

    if (submitState === "loading") {
      return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-[rgba(0,209,255,0.38)] bg-[rgba(5,8,27,0.7)] px-4 py-3 text-sm text-[var(--brand-offwhite)]" role="status" aria-live="polite">
          <Icons.LoaderCircle className="h-4 w-4 animate-spin text-[var(--brand-cyan)]" />
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
    "w-full rounded-xl border border-[rgba(0,209,255,0.28)] bg-[linear-gradient(145deg,rgba(5,8,27,0.86),rgba(16,24,46,0.62))] px-4 py-3 font-[var(--font-body)] text-sm text-[var(--brand-offwhite)] placeholder:text-[rgba(0,209,255,0.62)] outline-none transition-all duration-300 hover:border-[rgba(0,209,255,0.58)] hover:shadow-[0_0_18px_rgba(0,209,255,0.2)] focus:shadow-[0_0_0_1px_rgba(0,209,255,0.7),0_0_26px_rgba(0,209,255,0.28)] focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan)]";

  const sourceSelectClass = `${inputClass} contact-modal-select ${formData.source ? "is-filled" : "is-placeholder"} cursor-pointer appearance-none pr-10`;

  const labelClass = "block font-[var(--font-detail)] text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]";
  const optionalClass = "ml-1.5 text-[rgba(234,246,255,0.85)]";
  const requiredMark = <span className="ml-1 text-[var(--brand-purple)]">*</span>;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent showCloseButton={false} className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[rgba(0,209,255,0.5)] bg-[linear-gradient(145deg,rgba(5,8,27,0.85),rgba(26,31,46,0.8))] p-0 shadow-[0_0_0_1px_rgba(0,209,255,0.32),0_0_60px_rgba(0,209,255,0.32),0_24px_90px_rgba(5,8,27,0.65)] backdrop-blur-2xl sm:max-w-2xl" aria-describedby="newsletter-modal-description">
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="relative max-h-[92vh] overflow-y-auto p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,209,255,0.06) 0px, rgba(0,209,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(10,132,255,0.05) 0px, rgba(10,132,255,0.05) 1px, transparent 1px, transparent 28px)" }} />
            <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.45)_0%,rgba(0,209,255,0)_70%)] blur-3xl" />
            {PARTICLES.map((particle, index) => (
              <motion.span key={index} className="absolute rounded-full bg-[rgba(0,209,255,0.9)]" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, boxShadow: "0 0 16px rgba(0,209,255,0.85)" }} animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }} transition={{ duration: 3.4, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </div>

          <button type="button" onClick={closeModal} aria-label={text.closeLabel} className="absolute right-4 top-4 z-20 rounded-full border border-[rgba(10,180,255,0.4)] bg-[var(--brand-primary)] p-2 text-white transition-all duration-300 hover:border-[rgba(10,180,255,0.88)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_20px_rgba(10,180,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]">
            <Icons.X className="h-4 w-4" />
          </button>

          <DialogHeader className="relative z-10 mb-7 space-y-3 pr-10 text-left">
            <DialogTitle className="font-heading text-2xl font-extrabold tracking-tight !text-white sm:text-3xl" style={{ color: "#FFFFFF" }}>
              <span className="inline-flex items-center gap-2 !text-white" style={{ color: "#FFFFFF" }}>
                <Icons.Mail className="h-7 w-7 text-[var(--brand-cyan)]" />
                {text.title}
              </span>
            </DialogTitle>
            <DialogDescription id="newsletter-modal-description" className="max-w-xl text-sm text-[rgba(234,246,255,0.76)] sm:text-base">
              {text.description}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
            <div className="space-y-4">
              <label className="block space-y-1.5">
                <span className={labelClass}>
                  {text.labels.name}
                  {requiredMark}
                </span>
                <input name="name" required type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder={text.placeholders.name} className={inputClass} disabled={submitState === "loading"} />
              </label>

              <label className="block space-y-1.5">
                <span className={labelClass}>
                  {text.labels.email}
                  {requiredMark}
                </span>
                <input name="email" required type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder={text.placeholders.email} className={inputClass} disabled={submitState === "loading"} />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className={labelClass}>
                    {text.labels.role}
                    <span className={optionalClass}>{text.optional}</span>
                  </span>
                  <input name="role" type="text" value={formData.role} onChange={(e) => updateField("role", e.target.value)} placeholder={text.placeholders.role} className={inputClass} disabled={submitState === "loading"} />
                </label>

                <label className="block space-y-1.5">
                  <span className={labelClass}>
                    {text.labels.company}
                    <span className={optionalClass}>{text.optional}</span>
                  </span>
                  <input name="company" type="text" value={formData.company} onChange={(e) => updateField("company", e.target.value)} placeholder={text.placeholders.company} className={inputClass} disabled={submitState === "loading"} />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className={labelClass}>
                  {text.labels.source}
                  <span className={optionalClass}>{text.optional}</span>
                </span>
                <div className="relative">
                  <select name="source" value={formData.source} onChange={(e) => updateField("source", e.target.value)} className={sourceSelectClass} disabled={submitState === "loading"}>
                    <option value="" disabled>{text.placeholders.source}</option>
                    {sourceOptions[lang].map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <Icons.ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-[var(--brand-primary)]/20 bg-[#050816]/40 p-4 text-sm leading-relaxed text-[rgba(234,246,255,0.72)]">
                <input type="checkbox" required checked={formData.accepted} onChange={(e) => updateField("accepted", e.target.checked)} className="mt-1 h-4 w-4 rounded border-[var(--brand-primary)]/40 bg-[#050816]" disabled={submitState === "loading"} />
                <span>{text.labels.accepted}</span>
              </label>

              <TurnstileWidget
                theme="dark"
                showLoadError
                onVerify={(token) => { setTurnstileAvailable(true); setTurnstileToken(token); if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); } }}
                onExpire={() => { setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileExpired); } }}
                onError={() => { setTurnstileAvailable(false); setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileError); } }}
              />

              <AnimatePresence mode="wait">
                {statusNode && (
                  <motion.div key={submitState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {statusNode}
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[11px] text-[rgba(234,246,255,0.4)]">
                <span className="text-[var(--brand-purple)]">*</span> {text.requiredFields}
              </p>

              <PremiumButton type="submit" variant="primary" size="md" className={`w-full !rounded-xl !bg-[var(--brand-primary)] !px-6 !py-4 !text-sm !text-white !tracking-[0.16em] hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}>
                {submitState === "loading"
                  ? <><Icons.LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.loading}</>
                  : submitState === "success"
                  ? <><Icons.CheckCircle2 className="h-4 w-4" />{text.submit.success}</>
                  : <><Icons.Mail className="h-4 w-4" />{text.submit.idle}</>}
              </PremiumButton>

            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
