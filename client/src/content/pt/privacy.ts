// /content/pt/privacy.ts
import { Icons } from "@/lib/icons";

export const privacyPT = {
  title: "Política de Privacidade",
  subtitle: "Transparência, segurança e proteção dos seus dados",
  highlight: "Em conformidade com o RGPD da União Europeia.",
  lastUpdated: "Última atualização: 16 de fevereiro de 2026",

  sections: [
    {
      id: "overview",
      icon: Icons.ShieldCheck,
      title: "1. Visão Geral",
      content: "A Sapiente.AI atua como Responsável pelo Tratamento e Subcontratante sob o rigoroso enquadramento do Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679). A nossa arquitetura de privacidade foi desenhada para proteger os direitos e liberdades fundamentais das pessoas singulares, nomeadamente o seu direito à proteção de dados pessoais."
    },
    {
      id: "collection",
      icon: Icons.UserPlus,
      title: "2. Dados Pessoais Recolhidos",
      content: [
        "Identificação e contacto: nome completo, e-mail profissional e números de telefone verificados.",
        "Contexto Profissional: Afiliação organizacional, cargo e departamento.",
        "Metadados e Identificadores Técnicos: Endereços IP (hashed), impressões digitais de dispositivos (fingerprinting) e user-agents de navegadores.",
        "Dados de Interação: Telemetria granular sobre a utilização do serviço e envolvimento com funcionalidades através de registos (logs) seguros."
      ]
    },
    {
      id: "purpose",
      icon: Icons.Target,
      title: "3. Finalidade do Tratamento",
      content: [
        "Prestação de serviços baseados em IA e otimização algorítmica.",
        "Gestão da relação com o cliente e ciclo de vida do suporte técnico.",
        "Cumprimento estrito de obrigações legais, regulamentares e fiscais na UE.",
        "Deteção proativa de ameaças, monitorização de anomalias e prevenção de fraude."
      ]
    },
    {
      id: "legal-basis",
      icon: Icons.Gavel,
      title: "4. Fundamento Jurídico para o Tratamento",
      content: "Todas as atividades de tratamento estão ancoradas no Artigo 6.º do RGPD: consentimento explícito para finalidades específicas, execução de um contrato, cumprimento de obrigações jurídicas e interesses legítimos — desde que estes não prevaleçam sobre os direitos fundamentais do titular."
    },
    {
      id: "sharing",
      icon: Icons.Share2,
      title: "5. Subcontratantes e Partilha de Dados",
      content: "A Sapiente.AI adota uma política de seleção de fornecedores 'RGPD-first'. Os dados são partilhados apenas com subcontratantes terceiros que forneçam garantias de segurança de nível Tier-1, regidos por Acordos de Tratamento de Dados (DPA) que impõem o mesmo nível de proteção com que nos comprometemos perante os nossos utilizadores."
    },
    {
      id: "transfers",
      icon: Icons.Globe,
      title: "6. Transferências Internacionais de Dados",
      content: "Os dados são processados prioritariamente dentro do Espaço Económico Europeu (EEE). Quaisquer transferências transfronteiriças para países terceiros baseiam-se em Decisões de Adequação ou nas mais recentes Cláusulas Contratuais-Tipo (SCCs) da Comissão Europeia, complementadas por Avaliações de Impacto de Transferência (TIA), quando necessário."
    },
    {
      id: "security",
      icon: Icons.Lock,
      title: "7. Segurança Técnica e Organizativa",
      content: "Implementamos medidas de defesa em profundidade, incluindo criptografia AES-256 para dados em repouso e TLS 1.3 para dados em trânsito. O nosso stack de segurança inclui Controlo de Acesso Baseado em Funções (RBAC), autenticação multifator (MFA) e varredura automatizada de vulnerabilidades em todos os nossos ambientes de produção."
    },
    {
      id: "design",
      icon: Icons.Component,
      title: "8. Privacy by Design & Default",
      content: "A privacidade é um requisito central no nosso ciclo de vida de desenvolvimento de software (SDLC). Aplicamos a minimização de dados, garantindo que a recolha seja adequada, relevante e limitada ao estritamente necessário para o funcionamento dos nossos modelos de IA sem comprometer a privacidade do utilizador."
    },
    {
      id: "retention",
      icon: Icons.Hourglass,
      title: "9. Política de Retenção de Dados",
      content: "Os dados pessoais estão sujeitos a um cronograma de retenção definido. São armazenados apenas durante a vigência da relação comercial ativa ou conforme exigido por prazos legais de prescrição, seguidos de eliminação criptográfica segura ou anonimização irreversível."
    },
    {
      id: "rights",
      icon: Icons.UserCog,
      title: "10. Direitos dos Titulares dos Dados",
      content: [
        "Direito de acesso e portabilidade dos dados (formatos estruturados e legíveis por máquina).",
        "Direito de retificação e apagamento ('Direito ao Esquecimento').",
        "Direito à limitação do tratamento e oposição a decisões automatizadas.",
        "Direito de apresentar reclamação a uma Autoridade de Controlo (CNPD ou equivalente na UE)."
      ]
    },
    {
      id: "audit",
      icon: Icons.FileSearch,
      title: "11. Registo de Atividades de Tratamento (ROPA)",
      content: "Em conformidade com o Artigo 30.º do RGPD, mantemos registos internos de todas as atividades de tratamento. Isto garante a total rastreabilidade dos fluxos de dados, a vinculação à finalidade e fornece uma trilha de auditoria clara para solicitações regulatórias."
    },
    {
      id: "dpia",
      icon: Icons.Activity,
      title: "12. Avaliações de Impacto sobre a Proteção de Dados (DPIA)",
      content: "Para tratamentos de alto risco, particularmente os que envolvem IA e conjuntos de dados sensíveis, realizamos DPIAs formais. Estas avaliações analisam a necessidade, proporcionalidade e estratégias de mitigação de risco para proteger os indivíduos de enviesamentos algorítmicos ou exposição de dados."
    },
    {
      id: "accountability",
      icon: Icons.ClipboardCheck,
      title: "13. Responsabilidade e Governança (Accountability)",
      content: "A responsabilidade é o nosso padrão operacional. Implementamos políticas internas, formação de pessoal e auditorias periódicas de privacidade para demonstrar que as nossas atividades de tratamento não são apenas conformes no papel, mas seguras na prática."
    },
    {
      id: "infrastructure",
      icon: Icons.Server,
      title: "14. Infraestrutura Sediada na UE",
      content: "A Sapiente.AI prioriza a 'Soberania de Dados' ao utilizar fornecedores de cloud sediados na Europa ou zonas de dados específicas da UE. Isto minimiza a exposição legal a jurisdições fora da UE e reforça a conformidade com o RGPD."
    },
  ]
};
