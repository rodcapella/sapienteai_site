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
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
        <div className="bg-background border-t-2 md:border-2 md:border-foreground p-4 md:p-8 w-full md:max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-t-lg md:rounded-lg md:shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div className="flex-1">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">
                Entre em <span className="text-blue-600">Contato</span>
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Fale com nossos especialistas sobre seu projeto
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 md:p-2 hover:bg-muted transition-colors flex-shrink-0 ml-2"
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
