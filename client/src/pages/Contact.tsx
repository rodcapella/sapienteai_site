/*
 * Contact Page - SAPIENTE.AI
 * Design: Matches SAPIENTE.AI visual identity with dark header and footer
 */

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/hooks/useTranslation';
import TurnstileWidget from '@/components/TurnstileWidget';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-white/70">
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <main className="flex-grow py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-cyan-500 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Email</h3>
                    <p className="text-slate-600 text-sm">Use o formulário abaixo</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-cyan-500 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Telefone</h3>
                    <p className="text-slate-600 text-sm">Disponível em breve</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-cyan-500 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Localização</h3>
                    <p className="text-slate-600 text-sm">Portugal & Brasil</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection className="max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                {t('contact.form.title')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="seu.email@empresa.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="+351 XXX XXX XXX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                    placeholder="Assunto da sua mensagem"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Sua mensagem aqui..."
                  />
                </div>

                {/* Turnstile CAPTCHA */}
                <TurnstileWidget onVerify={setCaptchaToken} />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
                    Mensagem enviada com sucesso! Entraremos em contacto em breve.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                    Erro ao enviar mensagem. Por favor, complete o CAPTCHA e tente novamente.
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className="w-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
}
