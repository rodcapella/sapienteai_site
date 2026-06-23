// /content/pt/iaGenerativaPolicy.ts
import { AlertTriangle, Ban, EyeOff, ShieldAlert, Tag, Trash2, UserCheck } from "@/lib/icons";

export const iaGenerativaPolicyPT = {
  label: "Política de IA Generativa",
  title: "Em conformidade com o RGPD e o Regulamento IA da UE",
  subtitle: "Regras claras para uma utilização responsável, transparente e segura da",
  highlight: "inteligência artificial generativa.",

  lastUpdated: "Última atualização: Junho de 2026",

  sections: [
    {
      id: "shadow-ai",
      icon: Ban,
      navLabel: "Shadow AI",
      title: "1. Proibição de Shadow AI (Ferramentas Não Autorizadas)",
      content:
        "A Sapiente.AI cumpre rigorosamente as melhores práticas de proteção de dados no uso de Inteligência Artificial. Garantimos que nenhum dado confidencial, pessoal ou propriedade intelectual da empresa e dos seus clientes é processado em contas pessoais ou versões gratuitas de ferramentas de IA (como ChatGPT, Gemini ou similares). Toda a nossa equipa atua exclusivamente através de ferramentas e subscrições empresariais autorizadas, as quais salvaguardam que os dados operacionais não são utilizados para treino de modelos públicos, assegurando total sigilo e conformidade.",
    },
    {
      id: "anonymization",
      icon: EyeOff,
      navLabel: "Anonimização",
      title: "2. Regras Obrigatórias de Anonimização para Prompts",
      content: [
        "Antes de introduzir qualquer informação em sistemas de IA generativa (incluindo soluções de IA local), o utilizador deve aplicar um processo de anonimização que inclua:",
        "Substituição de identificadores diretos (nomes, emails, NIF, moradas, números de telefone) por placeholders genéricos, por exemplo: [CLIENTE A], [FORNECEDOR X];",
        "Generalização de datas (por exemplo: 2025 em vez de 15/03/2025) e valores (por exemplo: acima de 1000 EUR);",
        "Remoção de metadados que possam permitir reidentificação indireta.",
        "É proibida a introdução de categorias especiais de dados (artigo 9.º do RGPD) em qualquer modelo de IA sem autorização expressa do Encarregado de Proteção de Dados e medidas técnicas de isolamento.",
      ],
    },
    {
      id: "human-oversight",
      icon: UserCheck,
      navLabel: "Supervisão humana",
      title: "3. Supervisão Humana com Poder de Veto",
      content:
        "Sempre que um sistema de IA generativa ou de apoio à decisão for utilizado para produzir recomendações, avaliações ou decisões que possam afetar direitos, interesses ou o estatuto jurídico de pessoas singulares (por exemplo, em recrutamento, avaliação de desempenho, acesso a benefícios ou análise de crédito), a decisão final será obrigatoriamente revista e validada por um humano qualificado. Esse revisor terá autoridade para rejeitar, modificar ou anular a proposta do algoritmo. A supervisão é documentada em registo de auditoria, incluindo a fundamentação da decisão humana, e a empresa disponibiliza um mecanismo de recurso para decisões automatizadas contestadas.",
    },
    {
      id: "transparency-labeling",
      icon: Tag,
      navLabel: "Transparência",
      title: "4. Transparência e Etiquetagem de Conteúdos Gerados por IA",
      content: [
        "Qualquer texto, imagem, áudio ou vídeo gerado ou substancialmente editado por inteligência artificial, e que seja publicado, partilhado externamente ou fornecido a clientes, será identificado de forma clara quando exista risco de o público acreditar que está perante conteúdo autêntico, humano ou não manipulado.",
        "Esta prática segue o princípio de transparência previsto no artigo 50.º do Regulamento IA da UE (AI Act), incluindo as orientações sobre marcação e rotulagem de conteúdos gerados ou manipulados por IA.",
        "A identificação deve ser percetível para um utilizador médio e, sempre que possível, acompanhar o próprio conteúdo para continuar visível quando este for descarregado, republicado ou partilhado.",
      ],
    },
    {
      id: "ai-content-labeling-rules",
      icon: Tag,
      navLabel: "Rotulagem",
      title: "5. Quando Identificamos Conteúdo Gerado por IA",
      content: [
        "Imagens, vídeos ou áudios realistas criados ou manipulados por IA que possam parecer uma pessoa, objeto, lugar, entidade ou acontecimento real.",
        "Deepfakes, avatares realistas, vozes sintéticas ou representações que possam levar alguém a acreditar que uma pessoa disse, fez ou participou em algo que não aconteceu dessa forma.",
        "Textos gerados ou manipulados por IA e publicados automaticamente para informar o público sobre temas de interesse público, sem revisão humana ou responsabilidade editorial assumida.",
        "Conteúdos de marketing, relatórios, resumos, chatbots, newsletters ou publicações sociais quando a utilização de IA possa influenciar a interpretação do destinatário.",
        "Quando a IA é usada apenas como apoio à escrita, estruturação, revisão ou geração de ideias, e o conteúdo final é revisto, validado e assumido editorialmente por uma pessoa, a rotulagem pode não ser obrigatória. Ainda assim, a Sapiente.AI poderá optar por informar o cliente ou o público por boa prática de transparência.",
        "Exemplos de avisos: Imagem gerada por Inteligência Artificial. Texto gerado por Inteligência Artificial, sem revisão editorial humana. Vídeo criado com avatar gerado por Inteligência Artificial. Conteúdo criado com recurso a IA generativa.",
      ],
    },
    {
      id: "ai-incidents",
      icon: AlertTriangle,
      navLabel: "Incidentes de IA",
      title: "6. Resposta a Incidentes de Segurança Específicos de IA",
      content: [
        "Para além dos incidentes clássicos de segurança, a Sapiente.AI monitoriza ativamente:",
        "Ataques de injeção de prompt: tentativas de manipular o comportamento do modelo através de entradas maliciosas;",
        "Ataques de extração: tentativas de obter dados de treino ou informações confidenciais a partir das respostas do modelo;",
        "Vazamento inadvertido de dados: quando o modelo reproduz informação sensível de interações anteriores.",
        "Qualquer colaborador que note respostas anómalas ou suspeite de alguma vulnerabilidade nos nossos sistemas deve reportar a situação imediatamente à gestão interna. Como medida de proteção, a empresa poderá suspender temporariamente o acesso às ferramentas de IA enquanto avalia a situação.",
      ],
    },
    {
      id: "right-to-be-forgotten",
      icon: Trash2,
      navLabel: "Direito ao esquecimento",
      title: "7. Direito ao Esquecimento e Limitação em Modelos de IA Treinados",
      content:
        "A Sapiente.AI cumpre integralmente o direito ao apagamento (artigo 17.º do RGPD) relativamente a todos os dados pessoais armazenados em bases de dados tradicionais. Contudo, quando um modelo de IA já foi treinado com determinados dados, a remoção completa desses dados do modelo (desaprendizagem) é tecnicamente complexa ou mesmo impossível em muitos casos. Para mitigar este risco, a empresa adota uma política de não utilização de dados pessoais para treino de modelos generalistas e, sempre que possível, opta por modelos de IA que suportem exclusão programada de dados ou ofereçam garantias contratuais de não memorização. Caso o titular exerça o direito ao apagamento sobre dados que tenham sido usados no treino, a Sapiente.AI documentará a impossibilidade técnica e aplicará medidas alternativas (anonimização irreversível do dado na fonte e supressão de logs de interação).",
    },
    {
      id: "high-risk-ia",
      icon: ShieldAlert,
      navLabel: "IA de risco elevado",
      title: "8. Avaliação de Impacto para IA de Risco Elevado (AIFR)",
      content:
        "Antes de utilizarmos ou implementarmos qualquer sistema de IA classificado como de risco elevado pela União Europeia (como ferramentas para recrutamento ou gestão de colaboradores), a Sapiente.AI realiza uma avaliação de impacto interna. Esta análise serve para garantir que a tecnologia respeita os direitos das pessoas, assegurando a transparência, a não discriminação e a supervisão humana em todo o processo. Os resultados são documentados internamente e ficam disponíveis para as autoridades sempre que exigido por lei.",
    },
  ],
};
