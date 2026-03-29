import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import TurnstileWidget from './TurnstileWidget';
import CountryPhoneSelector from './CountryPhoneSelector';

interface FormData {
  name: string;
  email: string;
  phone: string;
  phonePrefix: string;
  company: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

interface CaptchaStatus {
  verified: boolean;
  token: string | null;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    phonePrefix: '+351',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [captcha, setCaptcha] = useState<CaptchaStatus>({ verified: false, token: null });
  const turnstileRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // 💎 limpa erro ao digitar
    if (status.type === 'error') {
      setStatus({ type: 'idle' });
    }
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
    if (!formData.phone.trim()) {
      setStatus({ type: 'error', message: 'Telefone é obrigatório' });
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

    if (!validateForm()) return;

    setStatus({ type: 'loading' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', `${formData.phonePrefix} ${formData.phone}`);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', `Nova Mensagem - ${formData.name}`);
      formDataToSend.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/sapiente.ai.oficial@gmail.com', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Mensagem enviada com sucesso!',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          phonePrefix: '+351',
          company: '',
          message: '',
        });

        setTimeout(() => setStatus({ type: 'idle' }), 5000);
      } else {
        throw new Error();
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Erro ao enviar. Tente novamente.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* STATUS */}
      {status.type === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-green-700 text-sm">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-700 text-sm">{status.message}</p>
        </div>
      )}

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome *
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Seu nome"
          disabled={status.type === 'loading'}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          disabled={status.type === 'loading'}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Telefone *
        </label>
        <CountryPhoneSelector
          value={formData.phone}
          onChange={(prefix, phone) =>
            setFormData(prev => ({ ...prev, phonePrefix: prefix, phone }))
          }
          disabled={status.type === 'loading'}
        />
      </div>

      {/* COMPANY */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Empresa
        </label>
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Sua empresa"
          disabled={status.type === 'loading'}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Conte-nos sobre seu projeto..."
          disabled={status.type === 'loading'}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={status.type === 'loading'}
        className="
        w-full
        bg-primary text-white
        rounded-xl
        px-6 py-3
        font-medium
        shadow-soft
        hover:shadow-medium
        hover:-translate-y-[1px]
        transition-all
        "
      >
        {status.type === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Respondemos em até 24h
      </p>

    </form>
  );
}