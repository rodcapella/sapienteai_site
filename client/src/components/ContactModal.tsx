/**
 * Contact Modal Component
 * Displays contact form in a modal dialog with mobile responsiveness
 */

import { useState } from 'react';
import { X } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0">
        <div className="bg-background border-2 md:border-4 border-foreground p-6 md:p-12 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg md:rounded-none">
          {/* Header */}
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl font-black mb-2">
                Entre em <span className="text-primary">Contato</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Fale com nossos especialistas sobre seu projeto
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted transition-colors flex-shrink-0 ml-2"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
