/**
 * Newsletter Form Component
 * Captures email subscriptions for newsletter
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<NewsletterStatus>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: 'error', message: 'Email inválido' });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('_subject', 'Nova Inscrição na Newsletter - SAPIENTE.AI');
      formData.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/sapiente.ai.oficial@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Inscrição confirmada! Obrigado por se juntar a nós.',
        });
        setEmail('');

        setTimeout(() => {
          setStatus({ type: 'idle' });
        }, 5000);
      } else {
        throw new Error('Erro ao inscrever');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro ao inscrever. Tente novamente.',
      });
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {status.type === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border-2 border-green-500 rounded text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-green-700 font-medium">{status.message}</p>
          </div>
        )}

        {status.type === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-500 rounded text-sm">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="text-red-700 font-medium">{status.message}</p>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="flex-1 px-3 py-2 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
            disabled={status.type === 'loading'}
          />
          <Button
            type="submit"
            disabled={status.type === 'loading'}
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary px-4 py-2 h-auto font-medium text-sm"
          >
            {status.type === 'loading' ? '...' : 'Inscrever'}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label htmlFor="newsletter-email" className="block text-sm font-medium mb-2">
          Email para Newsletter
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full pl-10 pr-4 py-3 border-2 border-foreground bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              disabled={status.type === 'loading'}
            />
          </div>
          <Button
            type="submit"
            disabled={status.type === 'loading'}
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary px-6 py-3 h-auto font-medium"
          >
            {status.type === 'loading' ? 'Inscrevendo...' : 'Inscrever'}
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Receba insights sobre IA, tendências tecnológicas e atualizações da SAPIENTE.AI. Sem spam, apenas conteúdo de valor.
      </p>
    </form>
  );
}
