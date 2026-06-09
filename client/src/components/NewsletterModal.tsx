import { FormEvent, useMemo, useState } from "react";
import { useLocation } from "wouter";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TurnstileWidget from "@/components/TurnstileWidget";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Icons } from "@/lib/icons";
import {
  AnimatedStatus,
  Modal,
  MODAL_INPUT_BASE,
  MODAL_LABEL_CLASS,
  modalSelectClass,
  type ModalSubmitState,
} from "@/components/ui/modal/Modal";

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NewsletterLang = "pt" | "en";

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
    description: "Receba conteúdos sobre inteligência artificial, automação, marketing digital e formas práticas de tornar o seu negócio mais eficiente.",
    requiredFields: "Campos obrigatórios",
    optional: "(OPCIONAL)",
    labels: {
      name: "Nome",
      email: "Email",
      role: "Cargo",
      company: "Empresa",
      source: "Como nos encontrou?",
      accepted: "Li e compreendi a Política de Privacidade e autorizo o tratamento dos meus dados para receber comunicações da Sapiente.AI.",
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
    description: "Get insights on artificial intelligence, automation, digital marketing, and practical ways to make your business more efficient.",
    requiredFields: "Required fields",
    optional: "(OPTIONAL)",
    labels: {
      name: "Name",
      email: "Email",
      role: "Role",
      company: "Company",
      source: "How did you find us?",
      accepted: "I have read and understood the Privacy Policy and authorize the processing of my data to receive communications from Sapiente.AI.",
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

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [location] = useLocation();
  const lang: NewsletterLang = location.startsWith("/en") ? "en" : "pt";
  const text = modalText[lang];

  const [formData, setFormData] = useState<NewsletterFormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<ModalSubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateField = <K extends keyof NewsletterFormData>(field: K, value: NewsletterFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); }
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
    if (missingFields.length > 0) return buildMissingFieldsMessage(missingFields);
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
        headers: { Accept: "application/json" },
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

  const requiredMark = <span className="ml-1 text-[var(--brand-purple)]">*</span>;
  const optionalClass = "ml-1.5 text-[rgba(234,246,255,0.85)]";

  const sourceSelectClass = useMemo(
    () => modalSelectClass(`${MODAL_INPUT_BASE} border-[rgba(0,209,255,0.28)]`, Boolean(formData.source)),
    [formData.source],
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeLabel={text.closeLabel} ariaDescribedBy="newsletter-modal-description">
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
        <label className="block space-y-1.5">
          <span className={MODAL_LABEL_CLASS}>{text.labels.name}{requiredMark}</span>
          <input name="name" required type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder={text.placeholders.name} className={`${MODAL_INPUT_BASE} border-[rgba(0,209,255,0.28)]`} disabled={submitState === "loading"} />
        </label>

        <label className="block space-y-1.5">
          <span className={MODAL_LABEL_CLASS}>{text.labels.email}{requiredMark}</span>
          <input name="email" required type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder={text.placeholders.email} className={`${MODAL_INPUT_BASE} border-[rgba(0,209,255,0.28)]`} disabled={submitState === "loading"} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.role}<span className={optionalClass}>{text.optional}</span></span>
            <input name="role" type="text" value={formData.role} onChange={(e) => updateField("role", e.target.value)} placeholder={text.placeholders.role} className={`${MODAL_INPUT_BASE} border-[rgba(0,209,255,0.28)]`} disabled={submitState === "loading"} />
          </label>

          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.company}<span className={optionalClass}>{text.optional}</span></span>
            <input name="company" type="text" value={formData.company} onChange={(e) => updateField("company", e.target.value)} placeholder={text.placeholders.company} className={`${MODAL_INPUT_BASE} border-[rgba(0,209,255,0.28)]`} disabled={submitState === "loading"} />
          </label>
        </div>

        <label className="block space-y-1.5">
          <span className={MODAL_LABEL_CLASS}>{text.labels.source}<span className={optionalClass}>{text.optional}</span></span>
          <div className="relative">
            <select name="source" value={formData.source} onChange={(e) => updateField("source", e.target.value)} className={sourceSelectClass} disabled={submitState === "loading"}>
              <option value="" disabled>{text.placeholders.source}</option>
              {sourceOptions[lang].map((o) => <option key={o} value={o}>{o}</option>)}
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

        <AnimatedStatus submitState={submitState} feedbackMessage={feedbackMessage} />

        <p className="text-[11px] text-[rgba(234,246,255,0.4)]">
          <span className="text-[var(--brand-purple)]">*</span> {text.requiredFields}
        </p>

        <PremiumButton
          type="submit"
          variant="primary"
          size="md"
          className={`w-full !rounded-xl !bg-[var(--brand-primary)] !px-6 !py-4 !text-sm !text-white !tracking-[0.16em] hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}
        >
          {submitState === "loading"
            ? <><Icons.LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.loading}</>
            : submitState === "success"
            ? <><Icons.CheckCircle2 className="h-4 w-4" />{text.submit.success}</>
            : <><Icons.Mail className="h-4 w-4" />{text.submit.idle}</>}
        </PremiumButton>
      </form>
    </Modal>
  );
}
