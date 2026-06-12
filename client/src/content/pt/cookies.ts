export const cookiesPT = {
  // ── navegação lateral ────────────────────────────────────────────────────────
  sidebarTitle: "Secções",

  lastUpdated: "Última atualização: Junho de 2026",

  sections: [
    { id: "what",    navLabel: "O que são",     icon: "Info"        },
    { id: "use",     navLabel: "Que cookies",   icon: "List"        },
    { id: "manage",  navLabel: "Como gerir",    icon: "Settings"    },
    { id: "consent", navLabel: "Consentimento", icon: "ShieldCheck" },
    { id: "third",   navLabel: "Terceiros",     icon: "Share2"      },
    { id: "updates", navLabel: "Atualizações",  icon: "RefreshCw"   },
    { id: "contact", navLabel: "Contacto",      icon: "Mail"        },
  ],

  // ── cabeçalhos da tabela de cookies ─────────────────────────────────────────
  tableHeaders: {
    type:     "Tipo",
    purpose:  "Finalidade",
    required: "Obrigatório",
  },
  tableYes: "Sim",
  tableNo:  "Não",

  // ── hero ─────────────────────────────────────────────────────────────────────
  hero: {
    label:     "Política de Cookies",
    title:     "Transparência total sobre",
    highlight: "como usamos cookies.",
    subtitle:  "Informação clara e objetiva sobre os cookies utilizados neste website, como os gerir e os seus direitos ao abrigo do RGPD.",
  },

  // ── CTA final ────────────────────────────────────────────────────────────────
  cta: {
    title:       "Tem dúvidas sobre",
    highlight:   "privacidade ou cookies?",
    description: "A nossa equipa está disponível para esclarecer qualquer questão sobre o tratamento dos seus dados ou preferências de cookies.",
    button:      "Falar com a equipa",
  },

  // ── conteúdo de cada secção ──────────────────────────────────────────────────
  sectionContent: {
    what: {
      eyebrow:     "Cookies",
      title:       "O que são cookies?",
      description: "Os cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um website. Permitem que o site recorde as suas preferências e ações ao longo do tempo, melhorando a sua experiência de navegação e ajudando-nos a compreender como o nosso site é utilizado.",
    },

    use: {
      eyebrow:     "Transparência",
      title:       "Que cookies utilizamos?",
      description: "Utilizamos as seguintes categorias de cookies no nosso website:",
      table: [
        { type: "Essenciais", purpose: "Necessários para o funcionamento correto do website (navegação, segurança, gestão de sessão).", required: true  },
        { type: "Analytics",  purpose: "Ajudam-nos a compreender como os visitantes interagem com o site através de estatísticas anónimas.",  required: false },
        { type: "Marketing",  purpose: "Utilizados para exibir publicidade relevante e campanhas de remarketing.",                              required: false },
      ],
    },

    manage: {
      eyebrow:     "Controlo",
      title:       "Como gerir cookies",
      description: "Pode controlar e eliminar cookies através das definições do seu browser a qualquer momento. Abaixo encontram-se as instruções para os browsers mais comuns:",
      browsers: [
        { name: "Google Chrome",   steps: "Aceda a Definições → Privacidade e segurança → Cookies e outros dados de sites." },
        { name: "Microsoft Edge",  steps: "Aceda a Definições → Permissões de sites e cookies → Gerir e eliminar cookies."   },
        { name: "Mozilla Firefox", steps: "Aceda a Definições → Privacidade e Segurança → Cookies e dados de sites → Gerir Dados." },
        { name: "Safari",          steps: "Aceda a Preferências → Privacidade → Gerir Dados de Websites para remover cookies." },
      ],
    },

    consent: {
      eyebrow:     "RGPD",
      title:       "O seu consentimento",
      description: "Na primeira visita ao nosso website, será apresentado um banner a solicitar as suas preferências de cookies. Pode aceitar todos os cookies, rejeitar os opcionais ou personalizar as suas escolhas.",
      bullets: [
        "Aceitar todos os cookies (inclui analytics e marketing).",
        "Rejeitar opcionais — apenas os cookies essenciais ficam ativos.",
        "Personalizar — escolha categoria a categoria o que permite.",
        "Alterar as suas preferências a qualquer momento através do rodapé.",
      ],
      resetLabel: "Rever preferências de cookies",
    },

    third: {
      eyebrow:     "Parceiros",
      title:       "Cookies de terceiros",
      description: "Alguns cookies podem ser definidos por serviços de terceiros que utilizamos, como plataformas de analytics ou publicidade. Todos os parceiros com quem trabalhamos cumprem o RGPD e os seus dados permanecem dentro da União Europeia.",
      bullets: [
        "Plataformas de analytics (ex.: Google Analytics).",
        "Ferramentas de email marketing e automação.",
        "Plataformas de publicidade e remarketing.",
        "Todos os fornecedores são certificados RGPD.",
      ],
    },

    updates: {
      eyebrow:     "Revisões",
      title:       "Atualizações desta política",
      description: "Podemos atualizar esta Política de Cookies periodicamente para refletir alterações nas nossas práticas ou por motivos legais. A data no topo desta página indica a revisão mais recente.",
      bullets: [
        "Alterações relevantes serão comunicadas por email (se subscreveu a newsletter).",
        "A data de última atualização é sempre visível no topo da página.",
        "O histórico de versões está disponível mediante pedido.",
      ],
    },

    contact: {
      eyebrow:     "Suporte",
      title:       "Contacto",
      description: "Se tiver alguma questão sobre a nossa utilização de cookies ou esta política, contacte-nos. Responderemos o mais brevemente possível.",
      contact:     { company: "Sapiente.AI", email: "contato@sapienteai.com" },
      bullets: [
        "Envie um email com o assunto 'Política de Cookies'.",
        "Resposta garantida em até 5 dias úteis.",
        "Pode também exercer os seus direitos RGPD pelo mesmo canal.",
      ],
    },
  },
} as const;
