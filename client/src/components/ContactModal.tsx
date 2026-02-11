/**
 * Contact Modal Component
 * Displays contact form in a modal dialog
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
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4">
        <div className="bg-background border-4 border-foreground p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">
                Entre em <span className="text-primary">Contato</span>
              </h2>
              <p className="text-muted-foreground">
                Fale com nossos especialistas sobre seu projeto
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Fechar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </>
  );
}
