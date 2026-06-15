import { CheckCircle2, Cpu, Lock, Scale, ShieldCheck, UserCheck } from "@/lib/icons";

export const trustContentPT = {
  label: "Confiança & Segurança",
  highlight: "Projetado para confiança.",
  subtitle:
    "A Sapiente.AI foi desenhada para operar com segurança, transparência e consistência em ambientes críticos.",
  lastUpdated: "Última atualização: Junho de 2026",

  sections: [
    {
      title: "Segurança",
      icon: ShieldCheck,
      content: [
        "Criptografia de dados em trânsito e em repouso",
        "Arquitetura Zero Trust",
        "Controlo de acesso baseado em privilégio mínimo",
      ],
    },
    {
      title: "Proteção de Dados",
      icon: Scale,
      content: [
        "Conformidade com RGPD e legislação aplicável",
        "Processamento de dados com minimização por design",
        "Anonimização sempre que aplicável",
        "Políticas rigorosas de retenção de dados",
      ],
    },
    {
      title: "Infraestrutura",
      icon: Lock,
      content: [
        "Infraestrutura baseada na União Europeia (UE/EEA)",
        "Provedores com compliance GDPR nativo",
        "Alta disponibilidade e redundância",
        "Escalabilidade orientada a performance",
      ],
    },
    {
      title: "Confiabilidade",
      icon: CheckCircle2,
      content: [
        "Monitorização contínua de sistemas",
        "Arquitetura resiliente",
        "Deploys controlados e auditáveis",
        "Foco em estabilidade e previsibilidade",
      ],
    },
    {
      title: "IA Responsável",
      icon: UserCheck,
      content: [
        "Human-in-the-loop em decisões críticas",
        "Mitigação de vieses algorítmicos",
        "Explicabilidade quando aplicável",
        "Uso controlado de automação",
        "Rotulagem e transparência para conteúdos gerados ou manipulados por IA, conforme descrito na nossa Política de IA Generativa",
      ],
    },
    {
      title: "Governança",
      icon: Cpu,
      content: [
        "Rastreabilidade de operações",
        "Auditorias internas periódicas",
        "Gestão de risco contínua",
        "Documentação técnica estruturada",
      ],
    },
  ],
};
