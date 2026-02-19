/**
 * Footer Component - Institutional High-Tech Modern Design
 * Deep blue background with modern layout and newsletter integration
 */

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const event = new CustomEvent('openContactModal');
      window.dispatchEvent(event);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-slate-700">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Subscreva a nossa newsletter
            </h3>
            <p className="text-slate-300 mb-6 text-sm md:text-base">
              Receba insights sobre inovação tecnológica, transformação digital e boas práticas de engenharia aplicada diretamente na sua caixa de entrada.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <Button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {subscribeStatus === 'loading' ? 'Enviando...' : 'Subscrever'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            {subscribeStatus === 'success' && (
              <p className="text-green-400 text-sm mt-3">✓ Subscrição realizada com sucesso!</p>
            )}
            <p className="text-xs text-slate-400 mt-4">
              Ao subscrever, você concorda com a nossa <a href="/privacidade" className="text-blue-400 hover:text-blue-300">Política de Privacidade</a>
            </p>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Column 1: Identity */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663348112016/JsygqIGdbHNWJuIo.png"
                alt="SAPIENTE.AI"
                className="h-10 md:h-12 object-contain mb-4"
              />
            </div>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
              Laboratório de Inovação Tecnológica. Arquitetura digital, sistemas inteligentes e inteligência aplicada ao crescimento empresarial.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-6 uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="/#servicos" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/#portfolio" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="/blog" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <button
                  onClick={handleContactClick}
                  className="text-slate-300 hover:text-white transition-colors text-sm text-left"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-6 uppercase tracking-wider">Produtos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#simulador-ir" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Simulador IR
                </a>
              </li>
              <li>
                <a href="#cupaomania" className="text-slate-300 hover:text-white transition-colors text-sm">
                  CupãoMania
                </a>
              </li>
              <li>
                <a href="#scanmyname" className="text-slate-300 hover:text-white transition-colors text-sm">
                  ScanMyName
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-bold text-sm md:text-base mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/privacidade" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="/termos" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="/lgpd" className="text-slate-300 hover:text-white transition-colors text-sm">
                  LGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mb-12 border-b border-slate-700 pb-12">
          <a
            href="https://instagram.com/sapiente.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@sapiente.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="TikTok"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.88 2.88 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z" />
            </svg>
          </a>
          <a
            href="https://x.com/sapiente_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.165-6.75-5.868 6.75h-3.308l7.732-8.835L2.882 2.25h6.6l4.888 6.469L18.244 2.25zM17.41 20.452h1.828L6.63 3.75H4.676l12.734 16.702z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/company/sapiente-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.959-1.715 1.188 0 1.914.762 1.939 1.715 0 .953-.751 1.715-1.983 1.715zm1.946 11.019H3.391V9.724h3.892v10.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-950/50 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-400 text-xs md:text-sm">
            © 2026 Sapiente.AI — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
