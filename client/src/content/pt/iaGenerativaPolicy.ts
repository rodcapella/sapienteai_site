// /content/pt/iaGenerativaPolicy.ts
import { Icons } from "@/lib/icons";

export const iaGenerativaPolicyPT = {
  label: "IA Generativa",
  title: "Política de Utilização de IA Generativa",
  subtitle:
    "Regras claras para uma utilização responsável, transparente e segura da inteligência artificial generativa, em conformidade com o RGPD e o Regulamento IA da UE.",

  sections: [
    {
      id: "shadow-ai",
      icon: Icons.Ban,
      title: "1. Proibição de Shadow AI (Ferramentas Não Autorizadas)",
      content:
        "É expressamente proibido aos colaboradores, parceiros e prestadores de serviço da Sapiente.AI utilizar contas pessoais ou versões gratuitas de ferramentas de IA generativa (como ChatGPT, Gemini, DeepSeek, Copilot pessoal ou similares) para processar, armazenar ou analisar qualquer dado confidencial, pessoal ou propriedade intelectual da empresa ou dos seus clientes. Apenas as ferramentas de IA previamente homologadas pelo departamento de Segurança e Proteção de Dados, que garantam contratualmente a não retenção de dados para treino de modelos, estão autorizadas. O incumprimento constitui violação disciplinar grave e pode implicar responsabilização individual."
    },
    {
      id: "anonymization",
      icon: Icons.EyeOff,
      title: "2. Regras Obrigatórias de Anonimização para Prompts",
      content: [
        "Antes de introduzir qualquer informação em sistemas de IA generativa (incluindo soluções de IA local), o utilizador deve aplicar um processo de anonimização que inclua:",
        "• Substituição de identificadores diretos (nomes, emails, NIF, moradas, números de telefone) por placeholders genéricos, ex: «[CLIENTE A]», «[FORNECEDOR X]»;",
        "• Generalização de datas (ex: «2025» em vez de «15/03/2025») e valores (ex: «acima de 1000€»);",
        "• Remoção de metadados que possam permitir reidentificação indireta.",
        "É proibida a introdução de categorias especiais de dados (artigo 9.º do RGPD) em qualquer modelo de IA sem autorização expressa do Encarregado de Proteção de Dados e medidas técnicas de isolamento."
      ]
    },
    {
      id: "human-oversight",
      icon: Icons.UserCheck,
      title: "3. Supervisão Humana com Poder de Veto",
      content:
        "Sempre que um sistema de IA generativa ou de apoio à decisão for utilizado para produzir recomendações, avaliações ou decisões que possam afetar direitos, interesses ou o estatuto jurídico de pessoas singulares (por exemplo, em recrutamento, avaliação de desempenho, acesso a benefícios ou análise de crédito), a decisão final será obrigatoriamente revista e validada por um humano qualificado. Esse revisor terá autoridade para rejeitar, modificar ou anular a proposta do algoritmo. A supervisão é documentada em registo de auditoria, incluindo a fundamentação da decisão humana, e a empresa disponibiliza um mecanismo de recurso para decisões automatizadas contestadas."
    },
    {
      id: "transparency-labeling",
      icon: Icons.Tag,
      title: "4. Transparência e Etiquetagem de Conteúdos Gerados por IA",
      content:
        "Qualquer texto, imagem, áudio ou vídeo gerado ou substancialmente editado por inteligência artificial, e que seja publicado, partilhado externamente ou fornecido a clientes, será claramente identificado como «conteúdo gerado por IA» ou «com recurso a IA generativa». A identificação será percetível para um utilizador médio, em conformidade com o artigo 50.º do Regulamento IA da UE (AI Act). Esta obrigação aplica-se nomeadamente a relatórios automáticos, chatbots, imagens sintéticas, resumos gerados por IA e comunicações de marketing assistidas por IA."
    },
    {
      id: "ai-incidents",
      icon: Icons.AlertTriangle,
      title: "5. Resposta a Incidentes de Segurança Específicos de IA",
      content: [
        "Para além dos incidentes clássicos de segurança, a Sapiente.AI monitoriza ativamente:",
        "• Ataques de injeção de prompt – tentativas de manipular o comportamento do modelo através de entradas maliciosas;",
        "• Ataques de extração – tentativas de obter dados de treino ou informações confidenciais a partir das respostas do modelo;",
        "• Vazamento inadvertido de dados – quando o modelo reproduz informação sensível de interações anteriores.",
        "Qualquer colaborador que detete um comportamento anómalo, respostas com dados aparentemente confidenciais ou indícios de extração deve reportar imediatamente à equipa de Segurança/DLP. A empresa reserva-se o direito de suspender o uso do sistema de IA durante a investigação."
      ]
    },
    {
      id: "right-to-be-forgotten",
      icon: Icons.Trash2,
      title: "6. Direito ao Esquecimento e Limitação em Modelos de IA Treinados",
      content:
        "A Sapiente.AI cumpre integralmente o direito ao apagamento (artigo 17.º do RGPD) relativamente a todos os dados pessoais armazenados em bases de dados tradicionais. Contudo, quando um modelo de IA já foi treinado com determinados dados, a remoção completa desses dados do modelo (desaprendizagem) é tecnicamente complexa ou mesmo impossível em muitos casos. Para mitigar este risco, a empresa adota uma política de não utilização de dados pessoais para treino de modelos generalistas e, sempre que possível, opta por modelos de IA que suportem exclusão programada de dados ou ofereçam garantias contratuais de não memorização. Caso o titular exerça o direito ao apagamento sobre dados que tenham sido usados no treino, a Sapiente.AI documentará a impossibilidade técnica e aplicará medidas alternativas (anonimização irreversível do dado na fonte e supressão de logs de interação)."
    },
    {
      id: "high-risk-ia",
      icon: Icons.ShieldAlert,
      title: "7. Avaliação de Impacto para IA de Risco Elevado (AIFR)",
      content:
        "Antes da implementação de qualquer sistema de IA classificado como de «risco elevado» ao abrigo do Regulamento IA da UE (ex: recrutamento, avaliação de crédito, gestão de trabalhadores), a Sapiente.AI realiza uma Avaliação de Impacto sobre os Direitos Fundamentais (AIFR). Esta análise identifica, documenta e mitiga os riscos para os direitos dos cidadãos, incluindo a não discriminação, a transparência e a supervisão humana. As conclusões são revistas pelo Comité de Governança de IA e disponibilizadas às autoridades competentes quando exigido."
    }
  ]
};