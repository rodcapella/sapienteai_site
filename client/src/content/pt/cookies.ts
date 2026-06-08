// /content/pt/cookies.ts
import { Icons } from "@/lib/icons";

export const cookiesPT = {
  title: "Política de Cookies",
  subtitle: "Como utilizamos cookies neste website",
  highlight: "Transparente, minimalista e em conformidade com o RGPD.",
  lastUpdated: "Última atualização: Junho de 2026",

  // Texto do banner de consentimento
  banner: {
    message: "Utilizamos cookies para melhorar a experiência de navegação, analisar o tráfego e personalizar conteúdos.",
    acceptAll: "Aceitar todos",
    rejectOptional: "Rejeitar opcionais",
    customize: "Preferências",
  },

  // Labels das opções de consentimento
  consent: {
    acceptAll: "accepted",
    rejected: "rejected",
    custom: "custom",
    storageKey: "cookieConsent",
  },

  sections: [
    {
      id: "what-are-cookies",
      icon: Icons.Info,
      title: "1. O que são cookies?",
      content:
        "Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. Permitem que o site recorde as suas preferências e ações ao longo do tempo, melhorando a sua experiência de navegação e ajudando-nos a compreender como o nosso site é utilizado.",
    },
    {
      id: "cookies-we-use",
      icon: Icons.List,
      title: "2. Que cookies utilizamos?",
      content: "Utilizamos as seguintes categorias de cookies no nosso website:",
      table: [
        {
          type: "Essenciais",
          purpose: "Necessários para o funcionamento correto do website (navegação, segurança, gestão de sessão).",
          required: true,
        },
        {
          type: "Analytics",
          purpose: "Ajudam-nos a compreender como os visitantes interagem com o site através de estatísticas de utilização anónimas.",
          required: false,
        },
        {
          type: "Marketing",
          purpose: "Utilizados para exibir publicidade relevante e campanhas de remarketing.",
          required: false,
        },
      ],
    },
    {
      id: "manage-cookies",
      icon: Icons.Settings,
      title: "3. Como gerir cookies",
      content:
        "Pode controlar e eliminar cookies através das definições do seu browser a qualquer momento. Abaixo encontram-se as instruções para os browsers mais comuns:",
      browsers: [
        {
          name: "Google Chrome",
          steps:
            "Aceda a Definições → Privacidade e segurança → Cookies e outros dados de sites. Escolha a opção pretendida ou elimine os cookies existentes.",
        },
        {
          name: "Microsoft Edge",
          steps:
            "Aceda a Definições → Permissões de sites e cookies → Gerir e eliminar cookies e dados de sites.",
        },
        {
          name: "Mozilla Firefox",
          steps:
            "Aceda a Definições → Privacidade e Segurança → Cookies e dados de sites. Clique em 'Gerir Dados' para ver ou eliminar cookies.",
        },
        {
          name: "Safari",
          steps:
            "Aceda a Preferências → Privacidade → Gerir Dados de Websites. Pode remover cookies de sites específicos ou de todos os sites.",
        },
      ],
    },
    {
      id: "consent",
      icon: Icons.ShieldCheck,
      title: "4. O seu consentimento",
      content:
        "Na primeira visita ao nosso website, será apresentado um banner a solicitar as suas preferências de cookies. Pode aceitar todos os cookies, rejeitar os opcionais ou personalizar as suas escolhas. Pode alterar as suas preferências a qualquer momento através do link de definições de cookies no rodapé.",
    },
    {
      id: "third-parties",
      icon: Icons.Share2,
      title: "5. Cookies de terceiros",
      content:
        "Alguns cookies podem ser definidos por serviços de terceiros que utilizamos, como plataformas de analytics ou publicidade. Esses fornecedores possuem as suas próprias políticas de privacidade e encorajamos a sua consulta. Todos os parceiros terceiros com quem trabalhamos cumprem o RGPD.",
    },
    {
      id: "updates",
      icon: Icons.RefreshCw,
      title: "6. Atualizações desta política",
      content:
        "Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas nossas práticas ou por motivos legais. A data no topo desta página indica a revisão mais recente. Recomendamos que consulte esta página regularmente.",
    },
    {
      id: "contact",
      icon: Icons.Mail,
      title: "7. Contacto",
      content:
        "Se tiver alguma questão sobre a nossa utilização de cookies ou esta política, contacte-nos para contato@sapienteai.com com o assunto 'Cookies'. Responderemos o mais brevemente possível.",
      contact: {
        company: "Sapiente.AI",
        email: "contato@sapienteai.com",
      },
    },
  ],
};