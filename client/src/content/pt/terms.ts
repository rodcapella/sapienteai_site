// /content/pt/terms.ts
import { 
  CheckCircle, 
  Cpu, 
  ShieldAlert, 
  FileText, 
  AlertTriangle, 
  RefreshCw, 
  Gavel, 
  Ban, 
  Handshake,
  Zap,
  Globe,
  Info
} from "lucide-react";

export const termsContentPT = {
  title: "Termos de Serviço",
  subtitle: "Condições padrão para a utilização dos serviços e plataformas SAPIENTE.AI.",
  lastUpdated: "Última atualização: 16 de Fevereiro de 2026",

  sections: [
    {
      id: "acceptance",
      icon: CheckCircle,
      title: "1. Aceitação dos Termos",
      content:
        "Ao aceder ou utilizar os serviços da SAPIENTE.AI, o utilizador declara ter lido, compreendido e concordado com os presentes termos. Caso utilize os serviços em nome de uma organização, declara possuir autoridade para vincular essa entidade a estas condições."
    },
    {
      id: "services",
      icon: Zap,
      title: "2. Descrição dos Serviços",
      content:
        "A SAPIENTE.AI disponibiliza soluções avançadas de inteligência artificial, automação e consultoria estratégica. Reservamos o direito de modificar ou atualizar funcionalidades para garantir a evolução tecnológica e segurança, desde que mantidas as obrigações contratuais base."
    },
    {
      id: "usage",
      icon: ShieldAlert,
      title: "3. Elegibilidade e Uso Proibido",
      content: [
        "Utilizar os serviços estritamente para fins lícitos, em conformidade com as leis da UE e internacionais.",
        "Proibição de 'Engenharia Reversa' ou tentativa de extração do código-fonte dos nossos modelos de IA.",
        "Proibição de utilizar os serviços para gerar conteúdo danoso, enviesado ou ilegal.",
        "Manutenção da confidencialidade das credenciais de acesso e reporte de qualquer falha de segurança."
      ]
    },
    {
      id: "ip",
      icon: FileText,
      title: "4. Propriedade Intelectual",
      content:
        "Todos os algoritmos, software, marcas e metodologias são propriedade exclusiva da SAPIENTE.AI. A utilização dos serviços não concede qualquer transferência de propriedade. Os outputs gerados podem estar sujeitos a licenças específicas definidas no contrato de serviço."
    },
    {
      id: "data",
      icon: Handshake,
      title: "5. Dados e Privacidade",
      content:
        "O tratamento de dados pessoais é realizado de acordo com a nossa Política de Privacidade e em estrita conformidade com o RGPD. Ao utilizar os serviços, consente nos fluxos de dados necessários para a execução do serviço digital."
    },
    {
      id: "ai",
      icon: Cpu,
      title: "6. Responsabilidade sobre IA",
      content:
        "Os nossos serviços utilizam Inteligência Artificial. Embora procuremos a precisão, os resultados da IA podem conter erros ou enviesamentos. É responsabilidade do utilizador validar decisões críticas e não depender exclusivamente de outputs automatizados para questões legais ou financeiras de alto risco."
    },
    {
      id: "availability",
      icon: RefreshCw,
      title: "7. Disponibilidade e Nível de Serviço",
      content:
        "Envidamos esforços para garantir a disponibilidade contínua; no entanto, não garantimos um serviço ininterrupto. Podem ocorrer suspensões para manutenção programada, atualizações de segurança ou devido a falhas de infraestrutura externa fora do nosso controlo."
    },
    {
      id: "liability",
      icon: AlertTriangle,
      title: "8. Limitação de Responsabilidade",
      content:
        "Na máxima extensão permitida pela lei aplicável, a SAPIENTE.AI não será responsável por danos indiretos, incidentais ou consequenciais, incluindo perda de lucros ou dados, resultantes do uso ou incapacidade de uso dos sistemas de IA."
    },
    {
      id: "changes",
      icon: Info,
      title: "9. Alterações aos Termos",
      content:
        "A SAPIENTE.AI poderá atualizar estes termos a qualquer momento. O uso continuado da plataforma após as alterações constitui a aceitação dos novos termos. Alterações significativas serão notificadas através da plataforma ou e-mail registado."
    },
    {
      id: "termination",
      icon: Ban,
      title: "10. Suspensão e Cancelamento",
      content:
        "Reservamos o direito de suspender ou cancelar o acesso imediatamente, sem aviso prévio, em caso de violação destes termos, suspeita de atividade fraudulenta ou por exigência das autoridades competentes."
    },
    {
      id: "law",
      icon: Globe,
      title: "11. Lei Aplicável e Jurisdição",
      content:
        "Estes termos são regidos pelas leis de Portugal e da União Europeia. Qualquer litígio será submetido à jurisdição exclusiva dos tribunais da comarca de Lisboa, Portugal."
    }
  ]
};