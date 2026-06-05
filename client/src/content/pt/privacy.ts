// /content/pt/privacy.ts
import { Icons } from "@/lib/icons";

export const privacyPT = {
  title: "Política de Privacidade",
  subtitle: "A sua privacidade é importante para nós",
  highlight: "Simples, clara e em conformidade com o RGPD.",
  lastUpdated: "Última atualização: Maio de 2026",

  sections: [
    {
      id: "intro",
      icon: Icons.ShieldCheck,
      title: "1. Quem somos e o que fazemos",
      content: "A Sapiente.AI é uma empresa de consultoria em Inteligência Artificial, sediada em Aveiro, Portugal. Esta política explica como tratamos os seus dados pessoais quando visita o nosso site ou nos contacta."
    },
    {
      id: "data",
      icon: Icons.UserPlus,
      title: "2. Que dados recolhemos",
      content: [
        "Nome e e-mail profissional (quando preenche o formulário de contacto ou assina a newsletter).",
        "Telemóvel, empresa e cargo na empresa, quando estes dados são fornecidos nos formulários ou em comunicações comerciais.",
        "Mensagens que nos envia por e-mail, formulários do site ou outros canais de contacto.",
        "Preferências técnicas guardadas no navegador, como o tema escolhido para navegação, o idioma associado à URL e as escolhas do banner de cookies.",
        "No consentimento de cookies guardamos apenas a decisão do utilizador (accepted, rejected ou custom), as preferências por categoria (essential, analytics e marketing) e a versão do banner de cookies apresentada.",
        "Dados técnicos anónimos (endereço IP anonimizado, tipo de browser) – apenas para estatísticas internas."
      ]
    },
    {
      id: "purpose",
      icon: Icons.Target,
      title: "3. Para que usamos os seus dados",
      content: [
        "Responder às suas perguntas e enviar orçamentos.",
        "Enviar a nossa newsletter (apenas se autorizar).",
        "Melhorar o nosso site e serviços."
      ]
    },
    {
      id: "legal",
      icon: Icons.Gavel,
      title: "4. Base legal para o tratamento",
      content: "Tratamos os seus dados com base no seu consentimento (ex: newsletter) ou no nosso interesse legítimo em responder a contactos comerciais. Nunca vendemos ou partilhamos os seus dados com terceiros para marketing."
    },
    {
      id: "sharing",
      icon: Icons.Share2,
      title: "5. Partilha com terceiros",
      content: "Usamos apenas ferramentas essenciais para o funcionamento do site e gestão de contactos (ex: servidor de e-mail, plataforma de newsletter). Todos os nossos fornecedores respeitam o RGPD e os dados permanecem na União Europeia."
    },
    {
      id: "rights",
      icon: Icons.UserCog,
      title: "6. Os seus direitos",
      content: "Pode a qualquer momento pedir para ver, corrigir ou apagar os seus dados. Também pode cancelar a newsletter e opor-se ao uso dos seus dados. Basta enviar um e-mail para contato@sapienteai.com."
    },
    {
      id: "retention",
      icon: Icons.Hourglass,
      title: "7. Quanto tempo guardamos os dados",
      content: "Guardamos os seus dados enquanto mantivermos uma relação comercial ou enquanto for necessário para responder a obrigações legais. Depois disso, são eliminados ou anonimizados."
    },
    {
      id: "contact",
      icon: Icons.Mail,
      title: "8. Contacto para questões de privacidade",
      content: "Tem dúvidas ou quer exercer os seus direitos? Escreva para contato@sapienteai.com com o assunto 'Privacidade'. Responderemos o mais rápido possível."
    },
    {
      id: "gdpr-details",
      icon: Icons.Info,
      title: "9. Informação adicional para clientes (RGPD)",
      content: "Se for nosso cliente ou parceiro comercial e precisar de detalhes técnicos como subcontratantes, medidas de segurança ou cláusulas contratuais, solicite o nosso 'Anexo de Tratamento de Dados' através do e-mail contato@sapienteai.com."
    }
  ]
};
