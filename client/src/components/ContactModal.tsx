import { FormEvent, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  MessageSquareText,
  Sparkles,
  X,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const requiredFields: (keyof FormData)[] = ["name", "email", "message"];

const PARTICLES = [
  { left: "8%", top: "18%", size: 4, delay: 0.2 },
  { left: "20%", top: "72%", size: 3, delay: 1.3 },
  { left: "37%", top: "22%", size: 2, delay: 0.7 },
  { left: "56%", top: "81%", size: 4, delay: 1.9 },
  { left: "68%", top: "35%", size: 3, delay: 0.4 },
  { left: "79%", top: "12%", size: 2, delay: 1.1 },
  { left: "90%", top: "64%", size: 3, delay: 1.6 },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const validateField = (field: keyof FormData, value: string): string => {
    if (requiredFields.includes(field) && !value.trim()) {
      if (field === "name") return "Nome é obrigatório.";
      if (field === "email") return "Email é obrigatório.";
      if (field === "message") return "Mensagem é obrigatória.";
    }

    if (field === "email" && value.trim()) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValid) return "Insira um email válido.";
    }

    return "";
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true, company: true, message: true });

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
    setFormData(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitState("idle");
    setFeedbackMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState === "loading") return;

    if (!validateForm()) {
      setSubmitState("error");
      setFeedbackMessage("Revise os campos obrigatórios antes de enviar.");
      return;
    }

    setSubmitState("loading");
    setFeedbackMessage("A enviar mensagem...");

    try {
      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("phone", formData.phone.trim() || "Não informado");
      payload.append("company", formData.company.trim() || "Não informado");
      payload.append("message", formData.message.trim());
      payload.append("_subject", `Novo contato - ${formData.name.trim()}`);
      payload.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/sapiente.ai.oficial@gmail.com", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error("submit_failed");
      }

      setSubmitState("success");
      setFeedbackMessage("Mensagem enviada! Entraremos em contacto em breve.");
      setFormData(INITIAL_FORM);
      setErrors({});
      setTouched({});
    } catch {
      setSubmitState("error");
      setFeedbackMessage("Não foi possível enviar agora. Tente novamente em instantes.");
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
      "w-full rounded-xl border bg-[linear-gradient(145deg,rgba(5,8,27,0.86),rgba(16,24,46,0.62))] px-4 py-3 text-sm text-[var(--brand-offwhite)] placeholder:text-[rgba(0,209,255,0.62)] outline-none transition-all duration-300",
      "focus:shadow-[0_0_0_1px_rgba(0,209,255,0.7),0_0_26px_rgba(0,209,255,0.28)]",
      "hover:border-[rgba(0,209,255,0.58)] hover:shadow-[0_0_18px_rgba(0,209,255,0.2)]",
      hasError
        ? "border-red-400/90 shadow-[0_0_0_1px_rgba(248,113,113,0.45),0_0_18px_rgba(248,113,113,0.2)]"
        : isValid
          ? "border-emerald-300/85 shadow-[0_0_0_1px_rgba(52,211,153,0.45),0_0_18px_rgba(52,211,153,0.2)]"
          : "border-[rgba(0,209,255,0.28)]",
    ].join(" ");
  };

  const statusNode = useMemo(() => {
    if (submitState === "idle") return null;

    if (submitState === "loading") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl border border-[rgba(0,209,255,0.38)] bg-[rgba(5,8,27,0.7)] px-4 py-3 text-sm text-[var(--brand-offwhite)]"
          role="status"
          aria-live="polite"
        >
          <LoaderCircle className="h-4 w-4 animate-spin text-[var(--brand-cyan)]" />
          <span>{feedbackMessage}</span>
        </motion.div>
      );
    }

    if (submitState === "success") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-xl border border-emerald-300/50 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
          <span>{feedbackMessage}</span>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 rounded-xl border border-red-300/45 bg-red-500/10 px-4 py-3 text-sm text-red-100"
        role="alert"
        aria-live="assertive"
      >
        <AlertTriangle className="h-5 w-5 text-red-300" />
        <span>{feedbackMessage}</span>
      </motion.div>
    );
  }, [feedbackMessage, submitState]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[rgba(0,209,255,0.5)] bg-[linear-gradient(145deg,rgba(5,8,27,0.85),rgba(26,31,46,0.8))] p-0 shadow-[0_0_0_1px_rgba(0,209,255,0.32),0_0_60px_rgba(0,209,255,0.32),0_24px_90px_rgba(5,8,27,0.65)] backdrop-blur-2xl sm:max-w-2xl"
        aria-describedby="contact-modal-description"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative max-h-[92vh] overflow-y-auto p-5 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,209,255,0.06) 0px, rgba(0,209,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(10,138,255,0.05) 0px, rgba(10,138,255,0.05) 1px, transparent 1px, transparent 28px)",
              }}
            />
            <div className="absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,209,255,0.45)_0%,rgba(0,209,255,0)_70%)] blur-3xl" />
            {PARTICLES.map((particle, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full bg-[rgba(0,209,255,0.9)]"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: "0 0 16px rgba(0,209,255,0.85)",
                }}
                animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 3.4, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Fechar modal de contato"
            className="absolute right-4 top-4 z-20 rounded-full border border-[rgba(0,209,255,0.4)] bg-[rgba(5,8,27,0.85)] p-2 text-[var(--brand-offwhite)] transition-all duration-300 hover:border-[rgba(0,240,255,0.88)] hover:text-[var(--brand-cyan)] hover:shadow-[0_0_20px_rgba(0,209,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan)]"
          >
            <X className="h-4 w-4" />
          </button>

          <DialogHeader className="relative z-10 mb-7 space-y-3 text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(0,209,255,0.35)] bg-[rgba(5,8,27,0.65)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--brand-cyan)]">
              <Sparkles className="h-3.5 w-3.5" />
              Contato inteligente
            </div>

            <DialogTitle className="font-heading text-2xl font-extrabold tracking-tight text-[var(--brand-offwhite)] sm:text-3xl">
              <span className="inline-flex items-center gap-2">
                <MessageSquareText className="h-7 w-7 text-[var(--brand-cyan)]" />
                Vamos transformar o seu negócio juntos
              </span>
            </DialogTitle>

            <DialogDescription id="contact-modal-description" className="max-w-xl text-sm text-[rgba(234,246,255,0.76)] sm:text-base">
              Partilhe os seus objetivos e a nossa equipa vai desenhar uma estratégia com IA para acelerar os seus resultados.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="contact-name" className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]">
                  Nome *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Ex: Ana Silva"
                  className={fieldClass("name")}
                  aria-required="true"
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  disabled={submitState === "loading"}
                />
                {touched.name && errors.name && (
                  <p id="contact-name-error" className="text-xs text-red-300">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:col-span-1">
                <label htmlFor="contact-email" className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]">
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="exemplo@empresa.com"
                  className={fieldClass("email")}
                  aria-required="true"
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  disabled={submitState === "loading"}
                />
                {touched.email && errors.email && (
                  <p id="contact-email-error" className="text-xs text-red-300">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]">
                  Telefone (opcional)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="+351 9XX XXX XXX"
                  className={fieldClass("phone")}
                  aria-invalid={Boolean(touched.phone && errors.phone)}
                  disabled={submitState === "loading"}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-company" className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]">
                  Empresa (opcional)
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  placeholder="Nome da empresa"
                  className={fieldClass("company")}
                  aria-invalid={Boolean(touched.company && errors.company)}
                  disabled={submitState === "loading"}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]">
                Mensagem *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                placeholder="Conte-nos o que pretende transformar com IA..."
                className={`${fieldClass("message")} resize-none`}
                aria-required="true"
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                disabled={submitState === "loading"}
              />
              {touched.message && errors.message && (
                <p id="contact-message-error" className="text-xs text-red-300">
                  {errors.message}
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {statusNode && (
                <motion.div key={submitState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {statusNode}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2">
              <PremiumButton
                type="submit"
                variant="primary"
                size="md"
                className={`w-full !rounded-xl !px-6 !py-4 !text-sm !tracking-[0.16em] ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}
              >
                {submitState === "loading" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    A processar...
                  </>
                ) : submitState === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Transformação iniciada
                  </>
                ) : (
                  <>
                    <MessageSquareText className="h-4 w-4" />
                    Enviar mensagem
                  </>
                )}
              </PremiumButton>
            </div>

            <p className="text-center text-xs text-[rgba(234,246,255,0.65)]">
              Resposta média em menos de 24h úteis.
            </p>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
