// /content/pt/RGPD.ts
import { 
  ShieldCheck, 
  Globe, 
  Database, 
  Lock, 
  UserCheck, 
  Cpu, 
  History, 
  Mail,
  Scale
} from "lucide-react";

export const RGPDContentPT = {
  label: "Documento Legal",
  title: "GDPR Compliance",
  subtitle: "Conformidade rigorosa com o Regulamento Geral sobre a Proteção de Dados da União Europeia.",

  sections: [
    {
      id: "compliance",
      icon: Scale, // Representa a balança da justiça/conformidade legal
      title: "1. Conformidade Integral com o GDPR",
      content:
        "A SAPIENTE.AI opera em total conformidade com o Regulamento (UE) 2016/679 (GDPR). Nossa estrutura de governança de dados foi desenhada para atender aos mais altos padrões de privacidade e segurança exigidos pelas autoridades de proteção de dados da União Europeia, garantindo um tratamento lícito, leal e transparente."
    },
    {
      id: "infrastructure-eu",
      icon: Globe, // Representa a atuação internacional/europeia
      title: "2. Ecossistema de Ferramentas Homologadas",
      content:
        "Trabalhamos exclusivamente com fornecedores de tecnologia e parceiros de infraestrutura que demonstram conformidade comprovada com o GDPR. Todo o fluxo de dados é mantido dentro do Espaço Económico Europeu (EEE) ou em jurisdições que oferecem um nível de proteção equivalente, assegurando a integridade da cadeia de custódia."
    },
    {
      id: "local-repository",
      icon: Database, // Representa o repositório de dados/código
      title: "3. Segurança do Repositório Local e Ativos de Projeto",
      content:
        "Mantemos um ambiente de desenvolvimento altamente seguro e controlado. Nossos repositórios locais de projetos utilizam criptografia de disco e sistemas de versionamento com registos de auditoria completos (logs). O acesso ao código-fonte e às configurações dos projetos é restrito através de autenticação forte e limitado apenas aos membros da equipa diretamente envolvidos."
    },
    {
      id: "local-ai-sovereignty",
      icon: Cpu, // Representa o processamento local/IA
      title: "4. IA Local e Soberania de Dados Sensíveis",
      content:
        "Para cenários que envolvem o tratamento de categorias especiais de dados (dados sensíveis), a SAPIENTE.AI implementa arquiteturas de IA Local. Tecnicamente, esta abordagem utiliza ambientes isolados ou instâncias dedicadas (VPC), garantindo que o processamento ocorra sem comunicação com APIs externas de terceiros."
    },
    {
      id: "privacy-by-design",
      icon: ShieldCheck, // Representa proteção desde a concepção
      title: "5. Privacy by Design & by Default",
      content:
        "A proteção de dados é integrada na arquitetura de todos os nossos sistemas desde a sua conceção. Aplicamos medidas técnicas para garantir a minimização de dados, assegurando que apenas as informações estritamente necessárias para cada finalidade específica sejam tratadas por defeito."
    },
    {
      id: "security-measures",
      icon: Lock, // Representa criptografia e trancas de segurança
      title: "6. Segurança e Proteção Técnica",
      content: [
        "Criptografia avançada em trânsito e em repouso para todos os conjuntos de dados.",
        "Controlo de acesso granular baseado em perfis (RBAC).",
        "Isolamento lógico e físico de ambientes de desenvolvimento, teste e produção.",
        "Sistemas de monitorização ativa para deteção de anomalias."
      ]
    },
    {
      id: "data-subject-rights",
      icon: UserCheck, // Representa o titular do dado e seus direitos
      title: "7. Direitos dos Titulares dos Dados",
      content:
        "Respeitamos integralmente os direitos conferidos pelo GDPR, incluindo o direito de acesso, retificação, apagamento ('direito ao esquecimento'), portabilidade e o direito de oposição. Disponibilizamos canais diretos para que estas solicitações sejam atendidas sem demora injustificada."
    },
    {
      id: "ai-ethics-eu",
      icon: ShieldCheck, // Ou use "Brain" se preferir reforçar a parte de IA ética
      title: "8. Governança Ética e IA Responsável",
      content:
        "Alinhados com as diretrizes europeias para uma IA fiável, garantimos que os nossos modelos operem com transparência. Nas implementações de IA Local, o cliente retém o controlo total sobre a lógica de processamento, permitindo auditorias técnicas."
    },
    {
      id: "retention",
      icon: History, // Representa o ciclo de vida/tempo de retenção
      title: "9. Conservação e Eliminação Segura",
      content:
        "Os dados pessoais são conservados apenas durante o período necessário para as finalidades para as quais são tratados. Findo este prazo, aplicamos procedimentos de eliminação definitiva ou anonimização irreversível."
    },
    {
      id: "dpo-contact",
      icon: Mail, // Representa o canal de comunicação/DPO
      title: "10. Contacto e Proteção de Dados",
      content:
        "A SAPIENTE.AI mantém processos internos de supervisão para garantir a conformidade contínua. Para questões relacionadas com a proteção de dados ou detalhes técnicos sobre a segurança dos nossos repositórios, utilize os nossos canais de contacto oficiais."
    }
  ]
};
