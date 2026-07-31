import { FormEvent, useMemo, useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import { getContent } from "@/lib/content";

import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TurnstileWidget from "@/components/TurnstileWidget";
import { PremiumButton } from "@/components/ui/button/PremiumButton";
import { CheckCircle2, ChevronDown, LoaderCircle, Mail } from "@/lib/icons";
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


export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const { lang: rawLang } = useTranslation();
  const lang: NewsletterLang = rawLang === "en" ? "en" : "pt";
  const modals = getContent("modals", lang);
  const text = modals.newsletter;
  const sourceOptions = modals.sourceOptions;

  const [formData, setFormData] = useState<NewsletterFormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<ModalSubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileAvailable, setTurnstileAvailable] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [website, setWebsite] = useState("");

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
    setWebsite("");
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
    return `${text.errors.missingPrefix} ${fieldList}.`;
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
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
          company: formData.company.trim(),
          source: formData.source.trim(),
          accepted: formData.accepted,
          lang,
          turnstileToken: turnstileToken || "verification_unavailable",
          website,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null) as { error?: string } | null;
        if (result?.error === "disposable_email") {
          setSubmitState("error");
          setFeedbackMessage(text.errors.disposableEmail);
          return;
        }
        if (result?.error === "turnstile_failed") {
          setSubmitState("error");
          setFeedbackMessage(text.errors.turnstileError);
          setTurnstileToken("");
          window.turnstile?.reset();
          return;
        }
        if (result?.error === "rate_limited") {
          setSubmitState("error");
          setFeedbackMessage(text.errors.rateLimited);
          setTurnstileToken("");
          window.turnstile?.reset();
          return;
        }
        throw new Error("newsletter_submit_failed");
      }

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
  const optionalClass = "ml-1.5 text-[var(--brand-offwhite)]/[0.85]";

  const sourceSelectClass = useMemo(
    () => modalSelectClass(`${MODAL_INPUT_BASE} border-[var(--brand-cyan-bright)]/[0.28]`, Boolean(formData.source)),
    [formData.source],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      closeLabel={text.closeLabel}
      contentClassName="lg:max-w-[900px]"
      scrollAreaClassName="newsletter-modal-scrollarea lg:max-h-[calc(100vh-1rem)] lg:p-7 lg:pb-7"
    >
      <DialogHeader className="relative z-10 mb-7 space-y-3 pr-10 text-left lg:mb-5 lg:space-y-2">
        <DialogTitle className="font-heading text-2xl font-extrabold tracking-tight !text-white sm:text-3xl lg:text-[26px] lg:leading-[1.08]" style={{ color: "white" }}>
          <span className="inline-flex items-center gap-2 !text-white" style={{ color: "white" }}>
            <Mail className="h-7 w-7 text-[var(--brand-cyan)]" />
            {text.title}
          </span>
        </DialogTitle>
        <DialogDescription className="max-w-xl text-sm text-[var(--brand-offwhite)]/[0.76] sm:text-base lg:max-w-2xl lg:text-sm">
          {text.description}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-4 lg:space-y-3" noValidate>
        <div className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="newsletter-website">Website</label>
          <input
            id="newsletter-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.name}{requiredMark}</span>
            <input name="name" required type="text" maxLength={100} value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder={text.placeholders.name} className={`${MODAL_INPUT_BASE} border-[var(--brand-cyan-bright)]/[0.28]`} disabled={submitState === "loading"} />
          </label>

          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.email}{requiredMark}</span>
            <input name="email" required type="email" maxLength={254} value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder={text.placeholders.email} className={`${MODAL_INPUT_BASE} border-[var(--brand-cyan-bright)]/[0.28]`} disabled={submitState === "loading"} />
          </label>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.role}<span className={optionalClass}>{text.optional}</span></span>
            <input name="role" type="text" maxLength={120} value={formData.role} onChange={(e) => updateField("role", e.target.value)} placeholder={text.placeholders.role} className={`${MODAL_INPUT_BASE} border-[var(--brand-cyan-bright)]/[0.28]`} disabled={submitState === "loading"} />
          </label>

          <label className="block space-y-1.5">
            <span className={MODAL_LABEL_CLASS}>{text.labels.company}<span className={optionalClass}>{text.optional}</span></span>
            <input name="company" type="text" maxLength={160} value={formData.company} onChange={(e) => updateField("company", e.target.value)} placeholder={text.placeholders.company} className={`${MODAL_INPUT_BASE} border-[var(--brand-cyan-bright)]/[0.28]`} disabled={submitState === "loading"} />
          </label>
        </div>

        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <label className="block space-y-1.5">
            <span className={`${MODAL_LABEL_CLASS} lg:text-[10px]`}>{text.labels.source}<span className={optionalClass}>{text.optional}</span></span>
            <div className="relative">
              <select name="source" value={formData.source} onChange={(e) => updateField("source", e.target.value)} className={sourceSelectClass} disabled={submitState === "loading"}>
                <option value="" disabled>{text.placeholders.source}</option>
                {sourceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-cyan)]" />
            </div>
          </label>

          <label className="flex h-full items-start gap-3 rounded-xl border border-[var(--brand-primary)]/20 bg-[var(--brand-darkest)]/40 p-4 text-sm leading-relaxed text-[var(--brand-offwhite)]/[0.72] lg:items-center lg:py-3">
            <input type="checkbox" required checked={formData.accepted} onChange={(e) => updateField("accepted", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--brand-primary)]/40 bg-[var(--brand-darkest)] lg:mt-0" disabled={submitState === "loading"} />
            <span>{text.labels.accepted}</span>
          </label>
        </div>

        <TurnstileWidget
          theme="dark"
          showLoadError
          onVerify={(token) => { setTurnstileAvailable(true); setTurnstileToken(token); if (submitState === "error") { setSubmitState("idle"); setFeedbackMessage(""); } }}
          onExpire={() => { setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileExpired); } }}
          onError={() => { setTurnstileAvailable(false); setTurnstileToken(""); if (hasSubmitted) { setSubmitState("error"); setFeedbackMessage(text.errors.turnstileError); } }}
        />

        <AnimatedStatus submitState={submitState} feedbackMessage={feedbackMessage} focusOnSuccess />

        <p className="text-[11px] text-[var(--brand-offwhite)]/[0.4]">
          <span className="text-[var(--brand-purple)]">*</span> {text.requiredFields}
        </p>

        <PremiumButton
          type="submit"
          variant="primary"
          size="md"
          className={`w-full !rounded-xl !bg-[var(--brand-primary)] !px-6 !py-4 !text-sm !text-white !tracking-[0.16em] hover:!bg-[var(--brand-primary)] hover:!text-white [&>span]:!text-white ${submitState === "loading" ? "pointer-events-none opacity-80" : ""}`}
        >
          {submitState === "loading"
            ? <><LoaderCircle className="h-4 w-4 animate-spin" />{text.submit.loading}</>
            : submitState === "success"
            ? <><CheckCircle2 className="h-4 w-4" />{text.submit.success}</>
            : <><Mail className="h-4 w-4" />{text.submit.idle}</>}
        </PremiumButton>
      </form>
    </Modal>
  );
}
