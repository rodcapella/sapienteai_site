// /content/pt/privacy.ts
import { createElement as h } from "react";
import { Gavel, Hourglass, Info, Mail, Share2, ShieldCheck, Target, UserCog, UserPlus } from "@/lib/icons";

const privacyMailtoPT = "mailto:contato@sapienteai.com?subject=Pol%C3%ADtica%20de%20Privacidade";

function createPrivacyContactBlockPT(text: string) {
  return h(
    "div",
    { className: "flex flex-col gap-4" },
    h("p", null, text),
    h(
      "div",
      { className: "pt-1" },
      h(
        "a",
        {
          href: privacyMailtoPT,
          className:
            "inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 py-3 text-center font-[var(--font-body)] text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_18px_42px_color-mix(in_srgb,var(--brand-cyan-mid)_24%,transparent)]",
        },
        "Falar connosco",
      ),
    ),
  );
}

export const privacyPT = {
  title: "Política de Privacidade",
  subtitle: "A sua privacidade é importante para nós",
  highlight: "Simples, clara e em conformidade com o RGPD.",
  lastUpdated: "Última atualização: Junho de 2026",

  sections: [
    {
      id: "intro",
      icon: ShieldCheck,
      title: "1. Quem somos e o que fazemos",
      content: "A Sapiente.AI é uma empresa de consultoria em Inteligência Artificial, sediada em Aveiro, Portugal. Esta política explica como tratamos os seus dados pessoais quando visita o nosso site ou nos contacta.",
    },
    {
      id: "data",
      icon: UserPlus,
      title: "2. Que dados recolhemos",
      content: [
        "Nome e e-mail profissional (quando preenche o formulário de contacto ou assina a newsletter).",
        "Telemóvel, empresa e cargo na empresa, quando estes dados são fornecidos nos formulários ou em comunicações comerciais.",
        "Mensagens que nos envia por e-mail, formulários do site ou outros canais de contacto.",
        "Preferências técnicas guardadas no navegador, como o tema escolhido para navegação, o idioma associado à URL e as escolhas do banner de cookies.",
        "No consentimento de cookies guardamos apenas a decisão do utilizador (accepted, rejected ou custom), as preferências por categoria (essential, analytics e marketing) e a versão do banner de cookies apresentada.",
        "Dados técnicos anónimos (endereço IP anonimizado, tipo de browser) - apenas para estatísticas internas.",
      ],
    },
    {
      id: "purpose",
      icon: Target,
      title: "3. Para que usamos os seus dados",
      content: [
        "Responder às suas perguntas e enviar orçamentos.",
        "Enviar a nossa newsletter (apenas se autorizar).",
        "Melhorar o nosso site e serviços.",
      ],
    },
    {
      id: "legal",
      icon: Gavel,
      title: "4. Base legal para o tratamento",
      content: "Tratamos os seus dados com base no seu consentimento (ex: newsletter) ou no nosso interesse legítimo em responder a contactos comerciais. Nunca vendemos ou partilhamos os seus dados com terceiros para marketing.",
    },
    {
      id: "sharing",
      icon: Share2,
      title: "5. Partilha com terceiros",
      content: "Usamos apenas ferramentas essenciais para o funcionamento do site e gestão de contactos (ex: servidor de e-mail, plataforma de newsletter). Todos os nossos fornecedores respeitam o RGPD e os dados permanecem na União Europeia.",
    },
    {
      id: "rights",
      icon: UserCog,
      title: "6. Os seus direitos",
      content: h(
        "p",
        null,
        "Pode a qualquer momento pedir para ver, corrigir ou apagar os seus dados. Também pode cancelar a newsletter e opor-se ao uso dos seus dados. Basta enviar um e-mail para ",
        h(
          "a",
          {
            href: privacyMailtoPT,
            className: "font-semibold text-[var(--brand-primary)] underline decoration-[var(--brand-primary)]/40 underline-offset-4",
          },
          "contato@sapienteai.com",
        ),
        ".",
      ),
    },
    {
      id: "retention",
      icon: Hourglass,
      title: "7. Quanto tempo guardamos os dados",
      content: "Guardamos os seus dados enquanto mantivermos uma relação comercial ou enquanto for necessário para responder a obrigações legais. Depois disso, são eliminados ou anonimizados.",
    },
    {
      id: "contact",
      icon: Mail,
      title: "8. Contacto para questões de privacidade",
      content: createPrivacyContactBlockPT("Tem dúvidas sobre a nossa Política de Privacidade ou quer exercer os seus direitos? Escreva para contato@sapienteai.com com o assunto 'Política de Privacidade'. Responderemos o mais rápido possível."),
    },
    {
      id: "gdpr-details",
      icon: Info,
      title: "9. Informação adicional para clientes (RGPD)",
      content: createPrivacyContactBlockPT("Se for nosso cliente ou parceiro comercial e precisar de detalhes técnicos como subcontratantes, medidas de segurança ou cláusulas contratuais, solicite o nosso 'Anexo de Tratamento de Dados' através do e-mail contato@sapienteai.com com o assunto 'Política de Privacidade'."),
    },
  ],
};
