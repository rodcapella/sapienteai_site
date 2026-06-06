import { FormEvent, useEffect, useMemo, useState } from "react";
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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

type SubmitState = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  topic: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type ModalLang = "pt" | "en";

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "",
  topic: "",
  message: "",
};

const requiredFields: (keyof FormData)[] = ["name", "email", "topic", "message"];

const sourceOptions = {
  pt: ["Eventos", "Google", "Indicação", "Instagram", "LinkedIn", "Newsletter", "Pesquisa Orgânica", "Pinterest", "TikTok", "X", "Outros"],
  en: ["Events", "Google", "Instagram", "LinkedIn", "Newsletter", "Organic Search", "Pinterest", "Referral", "TikTok", "X", "Other"],
};

const topicOptions = {
  pt: ["Automação", "Contacto", "Criação de conteúdo", "Dados & BI", "Diagnóstico de negócio", "Dúvidas", "Marketing e redes sociais", "Parcerias", "Projeto digital", "Serviços: IA", "Serviços: Automação", "Outros"],
  en: ["Automation", "Business diagnosis", "Contact", "Content creation", "Data & BI", "Digital project", "Marketing and social media", "Partnerships", "Questions", "Services: AI", "Services: Automation", "Other"],
};

const modalText = {
  pt: {
    closeLabel: "Fechar modal de contacto",
    title: "Vamos transformar o seu negócio juntos",
    description: "Partilhe os seus objetivos e a nossa equipa vai desenhar uma estratégia com IA para acelerar os seus resultados.",
    labels: {
      name: "Nome *",
      email: "Email *",
      phone: "Telefone (opcional)",
      company: "Empresa (opcional)",
      source: "Como nos encontrou? (opcional)",
      topic: "Tema *",
      message: "Mensagem *",
    },
    placeholders: {
      name: "Ex: Ana Silva",
      email: "exemplo@empresa.com",
      phone: "+351 9XX XXX XXX",
      company: "Nome da empresa",
      source: "Selecione uma opção",
      topic: "Selecione o tema",
      message: "Conte-nos o que pretende transformar com IA...",
    },
    errors: {
      name: "Nome é obrigatório.",
      email: "Email é obrigatório.",
      topic: "Tema é obrigatório.",
      message: "Mensagem é obrigatória.",
      invalidEmail: "Insira um email válido.",
      form: "Reveja os campos obrigatórios e conclua a verificação antes de enviar.",
      turnstile: "Conclua a verificação de segurança antes de enviar.",
      turnstileExpired: "A verificação expirou. Por favor, confirme novamente.",
      turnstileError: "Não foi possível validar a verificação. Tente novamente.",
      submit: "Não foi possível enviar agora. Tente novamente em instantes.",
    },
    submit: {
      loading: "A enviar mensagem...",
      processing: "A processar...",
      success: "Mensagem enviada! Entraremos em contacto em breve.",
      successButton: "Transformação iniciada",
      idle: "Enviar mensagem",
    },
    fallback: "Não informado",
    subject: "Novo contacto",
    averageResponse: "Resposta média em menos de 48 horas úteis.",
  },
  en: {
    closeLabel: "Close contact modal",
    title: "Let’s transform your business together",
    description: "Share your goals and our team will design an AI-powered strategy to accelerate your results.",
    labels: {
      name: "Name *",
      email: "Email *",
      phone: "Phone (optional)",
      company: "Company (optional)",
      source: "How did you find us? (optional)",
      topic: "Subject *",
      message: "Message *",
    },
    placeholders: {
      name: "Ex: Anna Smith",
      email: "example@company.com",
      phone: "+351 9XX XXX XXX",
      company: "Company name",
      source: "Select an option",
      topic: "Select a subject",
      message: "Tell us what you want to transform with AI...",
    },
    errors: {
      name: "Name is required.",
      email: "Email is required.",
      topic: "Subject is required.",
      message: "Message is required.",
      invalidEmail: "Enter a valid email address.",
      form: "Please review the required fields and complete verification before sending.",
      turnstile: "Complete the security verification before sending.",
      turnstileExpired: "The verification expired. Please confirm it again.",
      turnstileError: "We couldn’t validate the verification. Please try again.",
      submit: "We couldn’t send your message right now. Please try again shortly.",
    },
    submit: {
      loading: "Sending message...",
      processing: "Processing...",
      success: "Message sent! We’ll get back to you soon.",
      successButton: "Transformation started",
      idle: "Send message",
    },
    fallback: "Not provided",
    subject: "New contact",
    averageResponse: "Average response in less than 48 business hours.",
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

export default function ContactModal({ isOpen, onClose, initialTopic = "" }: ContactModalProps) {
  const [location] = useLocation();
  const lang: ModalLang = location.startsWith("/en") ? "en" : "pt";
  const text = modalText[lang];
  const initialForm = useMemo<FormData>(() => ({ ...INITIAL_FORM, topic: initialTopic }), [initialTopic]);

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setFormData(initialForm);
    setErrors({});
    setTouched({});
    setSubmitState("idle");
    setFeedbackMessage("");
    setTurnstileToken("");
    setHasSubmitted(false);
  }, [isOpen, initialForm]);

  const validateField = (field: keyof FormData, value: string): string => {
    if (requiredFields.includes(field) && !value.trim()) {
      if (field === "name") return text.errors.name;
      if (field === "email") return text.errors.email;
      if (field === "topic") return text.errors.topic;
      if (field === "message") return text.errors.message;
    }

    if (field === "email" && value.trim()) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValid) return text.errors.invalidEmail;
    }

    return "";
  };

  const getRequiredFieldLabel = (field: keyof FormData) => {
    const labels: Partial<Record<keyof FormData, string>> = {
      name: text.labels.name,
      email: text.labels.email,
      topic: text.labels.topic,
      message: text.labels.message,
    };

    return (labels[field] || String(field)).replace(" *", "");
  };

  const buildMissingFieldsMessage = (fields: (keyof FormData)[]) => {
    const fieldList = fields.map(getRequiredFieldLabel).join(", ");
    return lang === "en"
      ? `Please fill in the required fields before sending: ${fieldList}.`
      : `Preencha os campos obrigatórios antes de enviar: ${fieldList}.`;
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const missingFields = requiredFields.filter((field) => !formData[field].trim());

    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, company: true, source: true, topic: true, message: true });

    if (missingFields.length > 0) {
      setFeedbackMessage(buildMissingFieldsMessage(missingFields));
    } else if (nextErrors.email) {
      setFeedbackMessage(nextErrors.email);
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (submitState === "error") {
      setSubmitState("idle");
      setFeedbackMessage("");
    }

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const resetModalState = () => {
    setFormData(initialForm);
    setErrors({});
    setTouched({});
    setSubmitState("idle");
    setFeedbackMessage("");
    setTurnstileToken("");
    setHasSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (submitState === "loading") return;

    if (!validateForm()) {
      setSubmitState("error");
      return;
    }

    if (!turnstileToken) {
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
      payload.append("phone", formData.phone.trim() || text.fallback);
      payload.append("company", formData.company.trim() || text.fallback);
      payload.append("source", formData.source.trim() || text.fallback);
      payload.append("topic", formData.topic.trim());
      payload.append("message", formData.message.trim());
      payload.append("turnstile_token", turnstileToken);
      payload.append("_subject", `${text.subject} - ${formData.topic.trim()} - ${formData.name.trim()}`);
      payload.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/contato@sapienteai.com", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("submit_failed");

      setSubmitState("success");
      setFeedbackMessage(text.submit.success);
      setFormData(initialForm);
      setErrors({});
      setTouched({});
      setTurnstileToken("");
      setHasSubmitted(false);
    } catch {
      setSubmitState("error");
      setFeedbackMessage(text.errors.submit);
    }
  };

  const closeModal = () => {
    onClose();
    setTimeout(() => resetModalState(), 200);
  };

  const fieldClass = (field: keyof FormData) => {
    const hasError = Boolean(touched[field] && errors[field]);
    const isValid = Boolean(touched[field] && !errors[field] && formData[field].trim());

    return [
      "w-full rounded-xl border bg-[linear-gradient(145deg,rgba(5,8,27,0.86),rgba(16,24,46,0.62))] px-4 py-3 font-[var(--font-body)] text-sm text-[var(--brand-offwhite)] placeholder:text-[rgba(0,209,255,0.62)] outline-none transition-all duration-300",
      "focus:shadow-[0_0_0_1px_rgba(0,209,255,0.7),0_0_26px_rgba(0,209,255,0.28)] focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan)]",
      "hover:border-[rgba(0,209,255,0.58)] hover:shadow-[0_0_18px_rgba(0,209,255,0.2)]",
      hasError
        ? "border-red-400/90 shadow-[0_0_0_1px_rgba(248,113,113,0.45),0_0_18px_rgba(248,113,113,0.2)]"
        : isValid
          ? "border-emerald-300/85 shadow-[0_0_0_1px_rgba(52,211,153,0.45),0_0_18px_rgba(52,211,153,0.2)]"
          : "border-[rgba(0,209,255,0.28)]",
    ].join(" ");
  };

  const baseSelectClass = (field: keyof FormData, hasValue: boolean) =>
    `${fieldClass(field)} contact-modal-select ${hasValue ? "is-filled" : "is-placeholder"} cursor-pointer appearance-none pr-10`;

  const sourceSelectClass = baseSelectClass("source", Boolean(formData.source));
  const topicSelectClass = baseSelectClass("topic", Boolean(formData.topic));
  const labelClass = "font-[var(--font-detail)] text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]";
  const requiredMark = <span className="ml-1 text-[var(--brand-purple)]">*</span>;
  const requiredFieldsLabel = lang === "en" ? "Required fields" : "Campos obrigatórios";
  const requiredLabel = (label: string) => (
    <>
      {label.replace(" *", "")}
      {requiredMark}
    </>
  );

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent showCloseButton={false} className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[rgba(0,209,255,0.5)] bg-[linear-gradient(145deg,rgba(5,8,27,0.85),rgba(26,31,46,0.8))] p-0 shadow-[0_0_0_1px_rgba(0,209,255,0.32),0_0_60px_rgba(0,209,255,0.32),0_24px_90px_rgba(5,8,27,0.65)] backdrop-blur-2xl sm:max-w-2xl" aria-describedby="contact-modal-description">
        <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="relative max-h-[92vh] overflow-y-auto p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,209,255,0.06) 0px, rgba(0,209,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(10,132,255,0.05) 0px, rgba(10,132,255,0.05) 1px, transparent 1px, transparent 28px)" }} />
            <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.45)_0%,rgba(0,209,255,0)_70%)] blur-3xl" />
            {PARTICLES.map((particle, index) => <motion.span key={index} className="absolute rounded-full bg-[rgba(0,209,255,0.9)]" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, boxShadow: "0 0 16px rgba(0,209,255,0.85)" }} animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }} transition={{ duration: 3.4, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }} />)}
          </div>

          <button type="button" onClick={closeModal} aria-label={text.closeLabel} className="absolute right-4 top-4 z-20 rounded-full border border-[rgba(10,180,255,0.4)] bg-[var(--brand-primary)] p-2 text-white transition-all duration-300 hover:border-[rgba(10,180,255,0.88)] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_0_20px_rgba(10,180,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]">
            <Icons.X className="h-4 w-4" />
          </button>

          <DialogHeader className="relative z-10 mb-7 space-y-3 text-left">
            <DialogTitle className="font-heading text-2xl font-extrabold tracking-tight !text-white sm:text-3xl" style={{ color: "#FFFFFF" }}>
              <span className="inline-flex items-center gap-2 !text-white" style={{ color: "#FFFFFF" }}><Icons.MessageSquareText className="h-7 w-7 text-[var(--brand-cyan)]" />{text.title}</span>
            </DialogTitle>
            <DialogDescription id="contact-modal-description" className="max-w-xl text-sm text-[rgba(234,246,255,0.76)] sm:text-base">{text.description}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="contact-name" className={labelClass}>{requiredLabel(text.labels.name)}</label>
                <input id="contact-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")} placeholder={text.placeholders.name} className={fieldClass("name")} aria-required="true" aria-invalid={Boolean(touched.name && errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} disabled={submitState === "loading"} />
                {touched.name && errors.name && <p id="contact-name-error" className="text-xs text-red-300">{errors.name}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="contact-email" className={labelClass}>{requiredLabel(text.labels.email)}</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} placeholder={text.placeholders.email} className={fieldClass("email")} aria-required="true" aria-invalid={Boolean(touched.email && errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} disabled={submitState === "loading"} />
                {touched.email && errors.email && <p id="contact-email-error" className="text-xs text-red-300">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className={labelClass}>{requiredLabel(text.labels.topic)}</label>
                <div className="relative">
                  <select
                    id="contact-topic"
                    name="topic"
                    value={formData.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                    onBlur={() => handleBlur("topic")}
                    className={topicSelectClass}
                    aria-required="true"
                    aria-invalid={Boolean(touched.topic && errors.topic)}
                    aria-describedby={errors.topic ? "contact-topic-error" : undefined}
                    disabled={submitState === "loading"}
                  >
                    <option value="" disabled hidden>{text.placeholders.topic}</option>
                    {topicOptions[lang].map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <Icons.ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
                </div>
                {touched.topic && errors.topic && <p id="contact-topic-error" className="text-xs text-red-300">{errors.topic}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className={labelClass}>{text.labels.phone}</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} placeholder={text.placeholders.phone} className={fieldClass("phone")} aria-invalid={Boolean(touched.phone && errors.phone)} disabled={submitState === "loading"} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-company" className={labelClass}>{text.labels.company}</label>
                <input id="contact-company" name="company" type="text" autoComplete="organization" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} onBlur={() => handleBlur("company")} placeholder={text.placeholders.company} className={fieldClass("company")} aria-invalid={Boolean(touched.company && errors.company)} disabled={submitState === "loading"} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-source" className={labelClass}>{text.labels.source}</label>
                <div className="relative">
                  <select id="contact-source" name="source" value={formData.source} onChange={(e) => handleChange("source", e.target.value)} onBlur={() => handleBlur("source")} className={sourceSelectClass} disabled={submitState === "loading"}>
                    <option value="" disabled>{text.placeholders.source}</option>
                    {sourceOptions[lang].map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  <Icons.ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className={labelClass}>{requiredLabel(text.labels.message)}</label>
              <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} onBlur={() => handleBlur("message")} placeholder={text.placeholders.message} className={`${fieldClass("message")} resize-none`} aria-required="true" aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} disabled={submitState === "loading"} />
              {touched.message && errors.message && <p id="contact-message-error" className="text-xs text-red-300">{errors.message}</p>}
            </div>

            <TurnstileWidget theme="dark" showLoadError onVerify={(token) => { setTurnstileToken(token); if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); } }} onExpire={() => { setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileExpired); } }} onError={() => { setTurnstileToken(""); setSubmitState("error"); setFeedbackMessage(text.errors.turnstileError); }} />

            <AnimatePresence mode="wait">{statusNode && <motion.div key={submitState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{statusNode}</motion.div>}</AnimatePresence>

            <p className="text-[11px] text-[rgba(234,246,255,0.4)]">
              <span className="text-[var(--brand-purple)]">*</span> {requiredFieldsLabel}
            </p>

            <div className="pt-2">
              <PremiumButton type="submit" variant="primary" size="md" className={`w-full !rounded-xl !bg-[var(--brand-primary)] !px-6 !py-4 !text-sm !text-white !tracking-[0.16em] hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}>
                {submitState === "loading" ? <><Icons.LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.processing}</> : submitState === "success" ? <><Icons.CheckCircle2 className="h-4 w-4" />{text.submit.successButton}</> : <><Icons.MessageSquareText className="h-4 w-4" />{text.submit.idle}</>}
              </PremiumButton>
            </div>

            <p className="text-center text-xs text-[rgba(234,246,255,0.65)]">{text.averageResponse}</p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
