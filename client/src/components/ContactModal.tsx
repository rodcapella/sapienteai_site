import { FormEvent, useEffect, useMemo, useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TurnstileWidget from "@/components/TurnstileWidget";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { Icons } from "@/lib/icons";
import {
  AnimatedStatus,
  Modal,
  MODAL_LABEL_CLASS,
  modalFieldClass,
  modalSelectClass,
  type ModalSubmitState,
} from "@/components/ui/modal/Modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

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


export default function ContactModal({ isOpen, onClose, initialTopic = "" }: ContactModalProps) {
  const { lang: rawLang } = useTranslation();
  const lang: ModalLang = rawLang === "en" ? "en" : "pt";
  const modals = getContent("modals", lang);
  const text = modals.contact;
  const sourceOptions = modals.sourceOptions;
  const topicOptions = text.topicOptions;

  const initialForm = useMemo<FormData>(() => ({ ...INITIAL_FORM, topic: initialTopic }), [initialTopic]);

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitState, setSubmitState] = useState<ModalSubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData(initialForm);
    setErrors({});
    setTouched({});
    setSubmitState("idle");
    setFeedbackMessage("");
    setTurnstileToken("");
    setTurnstileAvailable(true);
    setHasSubmitted(false);
  }, [isOpen, initialForm]);

  const validateField = (field: keyof FormData, value: string): string => {
    if (requiredFields.includes(field) && !value.trim()) {
      if (field === "name") return text.errors.name;
      if (field === "email") return text.errors.email;
      if (field === "topic") return text.errors.topic;
      if (field === "message") return text.errors.message;
    }
    if (field === "email" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return text.errors.invalidEmail;
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
    return `${text.errors.missingPrefix} ${fieldList}.`;
  };

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const missingFields = requiredFields.filter((f) => !formData[f].trim());

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
    if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); }
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
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
    setTurnstileAvailable(true);
    setHasSubmitted(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (submitState === "loading") return;

    if (!validateForm()) { setSubmitState("error"); return; }

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
      payload.append("phone", formData.phone.trim() || text.fallback);
      payload.append("company", formData.company.trim() || text.fallback);
      payload.append("source", formData.source.trim() || text.fallback);
      payload.append("topic", formData.topic.trim());
      payload.append("message", formData.message.trim());
      payload.append("turnstile_token", turnstileToken || "verification_unavailable");
      payload.append("turnstile_status", turnstileToken ? "verified" : "unavailable");
      payload.append("_subject", `${text.subject} - ${formData.topic.trim()} - ${formData.name.trim()}`);
      payload.append("_captcha", "false");

      const response = await fetch("https://formsubmit.co/contato@sapienteai.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) throw new Error("submit_failed");

      setSubmitState("success");
      setFeedbackMessage(text.submit.success);
      setFormData(initialForm);
      setErrors({});
      setTouched({});
      setTurnstileToken("");
      setTurnstileAvailable(true);
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

  const fieldClass = (field: keyof FormData) =>
    modalFieldClass(
      Boolean(touched[field] && errors[field]),
      Boolean(touched[field] && !errors[field] && formData[field].trim()),
    );

  const requiredMark = <span className="ml-1 text-[var(--brand-purple)]">*</span>;
  const requiredLabel = (label: string) => <>{label.replace(" *", "")}{requiredMark}</>;
  const requiredFieldsLabel = text.requiredFields;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} closeLabel={text.closeLabel} ariaDescribedBy="contact-modal-description">
      <DialogHeader className="relative z-10 mb-7 space-y-3 text-left">
        <DialogTitle className="font-heading text-2xl font-extrabold tracking-tight !text-white sm:text-3xl" style={{ color: "#FFFFFF" }}>
          <span className="inline-flex items-center gap-2 !text-white" style={{ color: "#FFFFFF" }}>
            <Icons.MessageSquareText className="h-7 w-7 text-[var(--brand-cyan)]" />
            {text.title}
          </span>
        </DialogTitle>
        <DialogDescription id="contact-modal-description" className="max-w-xl text-sm text-[rgba(234,246,255,0.76)] sm:text-base">
          {text.description}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className={MODAL_LABEL_CLASS}>{requiredLabel(text.labels.name)}</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} onBlur={() => handleBlur("name")} placeholder={text.placeholders.name} className={fieldClass("name")} aria-required="true" aria-invalid={Boolean(touched.name && errors.name)} disabled={submitState === "loading"} />
            {touched.name && errors.name && <p className="text-xs text-red-300">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className={MODAL_LABEL_CLASS}>{requiredLabel(text.labels.email)}</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} onBlur={() => handleBlur("email")} placeholder={text.placeholders.email} className={fieldClass("email")} aria-required="true" aria-invalid={Boolean(touched.email && errors.email)} disabled={submitState === "loading"} />
            {touched.email && errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contact-topic" className={MODAL_LABEL_CLASS}>{requiredLabel(text.labels.topic)}</label>
            <div className="relative">
              <select
                id="contact-topic"
                name="topic"
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                onBlur={() => handleBlur("topic")}
                className={modalSelectClass(fieldClass("topic"), Boolean(formData.topic))}
                aria-required="true"
                aria-invalid={Boolean(touched.topic && errors.topic)}
                disabled={submitState === "loading"}
              >
                <option value="" disabled hidden>{text.placeholders.topic}</option>
                {topicOptions[lang].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Icons.ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
            </div>
            {touched.topic && errors.topic && <p className="text-xs text-red-300">{errors.topic}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className={MODAL_LABEL_CLASS}>{text.labels.phone}</label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} onBlur={() => handleBlur("phone")} placeholder={text.placeholders.phone} className={fieldClass("phone")} disabled={submitState === "loading"} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="contact-company" className={MODAL_LABEL_CLASS}>{text.labels.company}</label>
            <input id="contact-company" name="company" type="text" autoComplete="organization" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} onBlur={() => handleBlur("company")} placeholder={text.placeholders.company} className={fieldClass("company")} disabled={submitState === "loading"} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-source" className={MODAL_LABEL_CLASS}>{text.labels.source}</label>
            <div className="relative">
              <select
                id="contact-source"
                name="source"
                value={formData.source}
                onChange={(e) => handleChange("source", e.target.value)}
                onBlur={() => handleBlur("source")}
                className={modalSelectClass(fieldClass("source"), Boolean(formData.source))}
                disabled={submitState === "loading"}
              >
                <option value="" disabled>{text.placeholders.source}</option>
                {sourceOptions[lang].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Icons.ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-message" className={MODAL_LABEL_CLASS}>{requiredLabel(text.labels.message)}</label>
          <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={(e) => handleChange("message", e.target.value)} onBlur={() => handleBlur("message")} placeholder={text.placeholders.message} className={`${fieldClass("message")} resize-none`} aria-required="true" aria-invalid={Boolean(touched.message && errors.message)} disabled={submitState === "loading"} />
          {touched.message && errors.message && <p className="text-xs text-red-300">{errors.message}</p>}
        </div>

        <TurnstileWidget
          theme="dark"
          showLoadError
          onVerify={(token) => { setTurnstileAvailable(true); setTurnstileToken(token); if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); } }}
          onExpire={() => { setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileExpired); } }}
          onError={() => { setTurnstileAvailable(false); setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileError); } }}
        />

        <AnimatedStatus submitState={submitState} feedbackMessage={feedbackMessage} />

        <p className="text-[11px] text-[rgba(234,246,255,0.4)]">
          <span className="text-[var(--brand-purple)]">*</span> {requiredFieldsLabel}
        </p>

        <div className="pt-2">
          <PremiumButton
            type="submit"
            variant="primary"
            size="md"
            className={`w-full !rounded-xl !bg-[var(--brand-primary)] !px-6 !py-4 !text-sm !text-white !tracking-[0.16em] hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}
          >
            {submitState === "loading"
              ? <><Icons.LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.processing}</>
              : submitState === "success"
              ? <><Icons.CheckCircle2 className="h-4 w-4" />{text.submit.successButton}</>
              : <><Icons.MessageSquareText className="h-4 w-4" />{text.submit.idle}</>}
          </PremiumButton>
        </div>

        <p className="text-center text-xs text-[rgba(234,246,255,0.65)]">{text.averageResponse}</p>
      </form>
    </Modal>
  );
}
