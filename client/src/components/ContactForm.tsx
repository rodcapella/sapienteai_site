/**
 * Contact Form Component
 * Features: Form validation, email submission, success/error handling
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Nome é obrigatório' });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Email inválido' });
      return false;
    }
    if (!formData.company.trim()) {
      setStatus({ type: 'error', message: 'Empresa é obrigatória' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Mensagem é obrigatória' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus({ type: 'loading' });

    try {
      // Simulate email sending - in production, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success response
      setStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 5000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages */}
      {status.type === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-500 rounded">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-green-700 font-medium">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-500 rounded">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-700 font-medium">{status.message}</p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nome Completo *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          disabled={status.type === 'loading'}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          disabled={status.type === 'loading'}
        />
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Empresa *
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Nome da sua empresa"
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
          disabled={status.type === 'loading'}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Conte-nos sobre seu projeto..."
          rows={5}
          className="w-full px-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          disabled={status.type === 'loading'}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary text-lg px-6 py-3 h-auto font-medium"
      >
        {status.type === 'loading' ? (
          <>
            <span className="inline-block animate-spin mr-2">⏳</span>
            Enviando...
          </>
        ) : (
          <>
            Enviar Mensagem
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        * Campos obrigatórios. Responderemos em até 24 horas.
      </p>
    </form>
  );
}
