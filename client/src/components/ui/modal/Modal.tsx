/**
 * Modal
 * Shared shell for ContactModal and NewsletterModal.
 * Provides the Dialog wrapper, background decorations, particles, and close button.
 */

import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle2, LoaderCircle, X } from "@/lib/icons";

import "@/styles/modal.css";

const PARTICLES = [
  { left: "8%", top: "18%", size: 4, delay: 0.2 },
  { left: "20%", top: "72%", size: 3, delay: 1.3 },
  { left: "37%", top: "22%", size: 2, delay: 0.7 },
  { left: "56%", top: "81%", size: 4, delay: 1.9 },
  { left: "68%", top: "35%", size: 3, delay: 0.4 },
  { left: "79%", top: "12%", size: 2, delay: 1.1 },
  { left: "90%", top: "64%", size: 3, delay: 1.6 },
];

export const MODAL_LABEL_CLASS =
  "font-[var(--font-detail)] text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(234,246,255,0.85)]";

export const MODAL_INPUT_BASE =
  "w-full rounded-xl border bg-[linear-gradient(145deg,rgba(5,8,27,0.86),rgba(16,24,46,0.62))] px-4 py-3 font-[var(--font-body)] text-sm text-[var(--brand-offwhite)] placeholder:text-[rgba(0,209,255,0.62)] outline-none transition-all duration-300 " +
  "hover:border-[rgba(0,209,255,0.58)] hover:shadow-[0_0_18px_rgba(0,209,255,0.2)] " +
  "focus:shadow-[0_0_0_1px_rgba(0,209,255,0.7),0_0_26px_rgba(0,209,255,0.28)] focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan)]";

export function modalFieldClass(hasError: boolean, isValid: boolean): string {
  return [
    MODAL_INPUT_BASE,
    hasError
      ? "border-red-400/90 shadow-[0_0_0_1px_rgba(248,113,113,0.45),0_0_18px_rgba(248,113,113,0.2)]"
      : isValid
        ? "border-emerald-300/85 shadow-[0_0_0_1px_rgba(52,211,153,0.45),0_0_18px_rgba(52,211,153,0.2)]"
        : "border-[rgba(0,209,255,0.28)]",
  ].join(" ");
}

export function modalSelectClass(fieldClass: string, hasValue: boolean): string {
  return `${fieldClass} modal-select ${hasValue ? "is-filled" : "is-placeholder"} cursor-pointer appearance-none pr-10`;
}

export type ModalSubmitState = "idle" | "loading" | "success" | "error";

interface ModalStatusNodeProps {
  submitState: ModalSubmitState;
  feedbackMessage: string;
}

export function ModalStatusNode({ submitState, feedbackMessage }: ModalStatusNodeProps) {
  if (submitState === "idle" || !feedbackMessage) return null;

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
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  ariaDescribedBy: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, closeLabel, ariaDescribedBy, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[rgba(0,209,255,0.5)] bg-[linear-gradient(145deg,rgba(5,8,27,0.85),rgba(26,31,46,0.8))] p-0 shadow-[0_0_0_1px_rgba(0,209,255,0.32),0_0_60px_rgba(0,209,255,0.32),0_24px_90px_rgba(5,8,27,0.65)] backdrop-blur-2xl sm:max-w-2xl"
        aria-describedby={ariaDescribedBy}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="modal-scrollarea relative max-h-[92vh] overflow-y-auto p-5 sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,209,255,0.06) 0px, rgba(0,209,255,0.06) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, rgba(10,132,255,0.05) 0px, rgba(10,132,255,0.05) 1px, transparent 1px, transparent 28px)",
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
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-20 rounded-full border border-[rgba(10,180,255,0.4)] bg-[var(--brand-primary)] p-2 text-white transition-all duration-300 hover:border-[rgba(10,180,255,0.88)] hover:bg-[var(--brand-primary)] hover:shadow-[0_0_20px_rgba(10,180,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
          >
            <X className="h-4 w-4" />
          </button>

          {children}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

interface AnimatedStatusProps {
  submitState: ModalSubmitState;
  feedbackMessage: string;
}

export function AnimatedStatus({ submitState, feedbackMessage }: AnimatedStatusProps) {
  const node = <ModalStatusNode submitState={submitState} feedbackMessage={feedbackMessage} />;

  return (
    <AnimatePresence mode="wait">
      {node && (
        <motion.div key={submitState} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {node}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
