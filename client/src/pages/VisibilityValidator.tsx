import { useState } from "react";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { useSEOHead } from "@/hooks/useSEOHead";
import { AlertCircle, ArrowRight, Brain, Check, CheckCircle2, Globe, LoaderCircle, RotateCcw, Search } from "@/lib/icons";

import "@/styles/visibilityValidator.css";

type ValidatorLang = "pt" | "en";
type ValidationType = "seo" | "aeo";
type ValidationStatus = "found" | "partial" | "not-found";

type ValidationResult = {
  type: ValidationType;
  status: ValidationStatus;
  title: string;
  description: string;
  details?: string[];
  score: number;
  checks?: Array<{ label: string; passed: boolean; evidence: string; points: number; maxPoints: number; scored?: boolean }>;
};

const typeConfig = {
  seo: { Icon: Globe },
  aeo: { Icon: Brain },
};

const selectableTypes: ValidationType[] = ["seo", "aeo"];

const copy = {
  pt: {
    seoTitle: "Validador de SEO e AEO - Sapiente.AI",
    hero: {
      label: "Ferramenta gratuita",
      title: "Valide a visibilidade",
      highlight: "da sua marca.",
      subtitle: "Faça um diagnóstico preliminar da presença da sua marca nos motores de pesquisa e nas respostas de inteligência artificial.",
    },
    form: {
      title: "Informações da marca",
      brand: "Nome da marca",
      brandPlaceholder: "Ex: Sapiente.AI",
      website: "Website",
      websitePlaceholder: "Ex: sapienteai.com",
      types: "Tipos de validação",
      button: "Iniciar validação",
      loading: "A analisar...",
      required: "Preencha o nome da marca e o website.",
      emptyTypes: "Selecione pelo menos um tipo de validação.",
      requestError: "Não foi possível analisar este website. Confirme o endereço e tente novamente.",
      ownSite: "Este validador foi criado para analisar websites externos. Para manter o diagnóstico imparcial, o site da Sapiente.AI não pode ser validado por esta ferramenta.",
      rateLimited: "Foram realizadas várias análises. Aguarde alguns minutos antes de tentar novamente.",
      unavailable: "Em preparação",
      note: "Esta leitura é um diagnóstico preliminar. Para uma análise completa, cruzamos dados técnicos, conteúdo, entidades e sinais de autoridade.",
    },
    types: {
      seo: "SEO (Google)",
      aeo: "AEO (IA)",
    },
    results: {
      idleTitle: "Nenhuma análise realizada",
      idleText: "Preencha os dados e inicie a validação para ver o diagnóstico.",
      title: "Resultados da validação",
      score: "Score de visibilidade",
      performance: "Desempenho",
      scoreNote: "A pontuação é calculada diretamente a partir dos critérios técnicos analisados.",
      status: "Estado",
      reset: "Nova validação",
      found: "Detectado",
      partial: "Parcial",
      "not-found": "Não detectado",
      priority: "Prioridade sugerida",
    },
    resultCopy: {
      seo: {
        title: "SEO (Pesquisa)",
        description: "Presença em motores de busca e qualidade de sinais orgânicos.",
        details: [
          "Rever títulos, descrições e estrutura semântica das páginas principais.",
          "Criar clusters de conteúdo por serviço, setor e intenção de pesquisa.",
          "Melhorar dados estruturados, performance e links internos.",
        ],
      },
      aeo: {
        title: "AEO (Respostas com IA)",
        description: "Capacidade de ser compreendido, citado e recomendado por motores de resposta.",
        details: [
          "Transformar serviços em respostas claras, objetivas e verificáveis.",
          "Publicar FAQs, glossários e páginas com entidades bem definidas.",
          "Fortalecer autoridade com exemplos, fontes, casos e dados estruturados.",
        ],
      },
    },
    impact: {
      title: "O que um bom posicionamento pode fazer pelo seu negócio?",
      seoTitle: "SEO: aparecer melhor no Google",
      seoText: "Um SEO eficaz ajuda o seu site a surgir quando potenciais clientes procuram os seus serviços. Isso significa mais visitas qualificadas, mais oportunidades de contacto e menos dependência de anúncios para ser encontrado.",
      aeoTitle: "AEO: ser encontrado e recomendado pela IA",
      aeoText: "As pesquisas já não acontecem apenas no Google. Um AEO eficaz prepara o seu conteúdo para aparecer em respostas do ChatGPT, Google AI, Perplexity e outros assistentes, aumentando a visibilidade e a confiança na sua marca.",
    },
    cta: {
      title: "Quer transformar este diagnóstico",
      highlight: "num plano real?",
      description: "Analisamos a sua presença digital e criamos um plano concreto para melhorar SEO e visibilidade nas respostas de IA.",
      button: "Quero o diagnóstico gratuito",
    },
  },
  en: {
    seoTitle: "SEO and AEO Validator - Sapiente.AI",
    hero: {
      label: "Free tool",
      title: "Validate your brand",
      highlight: "visibility.",
      subtitle: "Run a preliminary assessment of your brand presence across search engines and AI-generated answers.",
    },
    form: {
      title: "Brand information",
      brand: "Brand name",
      brandPlaceholder: "Ex: Sapiente.AI",
      website: "Website",
      websitePlaceholder: "Ex: sapienteai.com",
      types: "Validation types",
      button: "Start validation",
      loading: "Analyzing...",
      required: "Fill in the brand name and website.",
      emptyTypes: "Select at least one validation type.",
      requestError: "We could not analyze this website. Check the address and try again.",
      ownSite: "This validator was designed to assess external websites. To keep the diagnosis impartial, the Sapiente.AI website cannot be assessed with this tool.",
      rateLimited: "Several analyses have been requested. Please wait a few minutes before trying again.",
      unavailable: "Coming soon",
      note: "This is a preliminary assessment. For a complete analysis, we combine technical data, content, entities, and authority signals.",
    },
    types: {
      seo: "SEO (Google)",
      aeo: "AEO (AI)",
    },
    results: {
      idleTitle: "No analysis yet",
      idleText: "Fill in the details and start validation to see the diagnosis.",
      title: "Validation results",
      score: "Visibility score",
      performance: "Performance",
      scoreNote: "The score is calculated directly from the technical criteria analyzed.",
      status: "Status",
      reset: "New validation",
      found: "Detected",
      partial: "Partial",
      "not-found": "Not detected",
      priority: "Suggested priority",
    },
    resultCopy: {
      seo: {
        title: "SEO (Search)",
        description: "Presence in search engines and quality of organic signals.",
        details: [
          "Review titles, descriptions, and semantic structure on key pages.",
          "Create content clusters by service, sector, and search intent.",
          "Improve structured data, performance, and internal linking.",
        ],
      },
      aeo: {
        title: "AEO (AI answers)",
        description: "Ability to be understood, cited, and recommended by answer engines.",
        details: [
          "Turn services into clear, objective, and verifiable answers.",
          "Publish FAQs, glossaries, and pages with well-defined entities.",
          "Strengthen authority with examples, sources, cases, and structured data.",
        ],
      },
    },
    impact: {
      title: "What can better positioning do for your business?",
      seoTitle: "SEO: rank higher on Google",
      seoText: "Effective SEO helps your website appear when potential customers search for your services. That means more qualified visitors, more opportunities to connect, and less reliance on paid ads to be found.",
      aeoTitle: "AEO: get found and recommended by AI",
      aeoText: "Search no longer happens only on Google. Effective AEO prepares your content to appear in answers from ChatGPT, Google AI, Perplexity, and other assistants, increasing your brand's visibility and credibility.",
    },
    cta: {
      title: "Want to turn this diagnosis",
      highlight: "into a real plan?",
      description: "We analyze your digital presence and create a concrete plan to improve SEO and visibility in AI-generated answers.",
      button: "I want the free diagnosis",
    },
  },
} as const;

function normalizeWebsite(value: string) {
  return value.trim().replace(/\s+/g, "").replace(/\/$/, "");
}

function isSapienteWebsite(value: string) {
  try {
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const hostname = new URL(normalized).hostname.toLowerCase().replace(/\.$/, "");
    return hostname === "sapienteai.com" || hostname.endsWith(".sapienteai.com");
  } catch {
    return false;
  }
}

export default function VisibilityValidator() {
  const { lang: rawLang } = useTranslation();
  const lang: ValidatorLang = rawLang === "en" ? "en" : "pt";
  const text = copy[lang];

  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Record<ValidationType, boolean>>({ seo: true, aeo: true });
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [analysisMeta, setAnalysisMeta] = useState<{ analyzedUrl: string; analyzedAt: string } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useSEOHead({
    title: text.seoTitle,
    description: text.hero.subtitle,
    url: `https://www.sapienteai.com/${lang}/seo-aeo-validator`,
    type: "website",
    noindex: false,
  }, [lang, text]);

  const enabledTypes = (Object.keys(selectedTypes) as ValidationType[]).filter((type) => selectedTypes[type]);
  const averageScore = results.length
    ? Math.round(results.reduce((total, result) => total + result.score, 0) / results.length)
    : null;
  const weakestResult = results.length
    ? results.reduce((weakest, result) => result.score < weakest.score ? result : weakest)
    : null;
  const weakestLabel = weakestResult ? weakestResult.type.toUpperCase() : undefined;
  const resultCTA = (() => {
    if (averageScore === null || !weakestLabel) return text.cta;
    if (averageScore >= 75) {
      return lang === "pt"
        ? {
            title: "O seu resultado já é sólido.",
            highlight: "Vamos levá-lo mais longe?",
            description: `A avaliação alcançou ${averageScore}/100. Podemos aperfeiçoar os sinais de ${weakestLabel} e transformar uma boa base em maior visibilidade e autoridade.`,
            button: "Quero melhorar este resultado",
          }
        : {
            title: "Your result is already strong.",
            highlight: "Ready to take it further?",
            description: `Your assessment reached ${averageScore}/100. We can strengthen the ${weakestLabel} signals and turn a solid foundation into greater visibility and authority.`,
            button: "Improve this result",
          };
    }
    if (averageScore >= 50) {
      return lang === "pt"
        ? {
            title: "Existe uma boa base.",
            highlight: "Vamos corrigir os pontos críticos?",
            description: `A avaliação alcançou ${averageScore}/100 e indica maior margem de evolução em ${weakestLabel}. Criamos um plano objetivo para corrigir as falhas e consolidar o que já funciona.`,
            button: "Quero um plano de melhoria",
          }
        : {
            title: "There is a solid foundation.",
            highlight: "Shall we fix the critical gaps?",
            description: `Your assessment reached ${averageScore}/100 and shows the greatest opportunity in ${weakestLabel}. We can create a focused plan to fix the gaps and reinforce what already works.`,
            button: "Build my improvement plan",
          };
    }
    return lang === "pt"
      ? {
          title: "A sua visibilidade precisa de atenção.",
          highlight: "Comecemos pelas prioridades certas.",
          description: `A avaliação alcançou ${averageScore}/100, com ${weakestLabel} como principal prioridade. Podemos transformar este diagnóstico num roteiro claro, seguro e mensurável.`,
          button: "Quero corrigir este resultado",
        }
      : {
          title: "Your visibility needs attention.",
          highlight: "Let’s start with the right priorities.",
          description: `Your assessment reached ${averageScore}/100, with ${weakestLabel} as the main priority. We can turn this diagnosis into a clear, safe, and measurable roadmap.`,
          button: "Fix this result",
        };
  })();

  const toggleType = (type: ValidationType) => {
    setSelectedTypes((current) => ({ ...current, [type]: !current[type] }));
    setFeedback("");
  };

  const handleValidate = async () => {
    if (!brandName.trim() || !website.trim()) {
      setFeedback(text.form.required);
      return;
    }

    if (enabledTypes.length === 0) {
      setFeedback(text.form.emptyTypes);
      return;
    }

    if (isSapienteWebsite(website)) {
      setResults([]);
      setAnalysisMeta(null);
      setHasSearched(false);
      setFeedback(text.form.ownSite);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setFeedback("");
    try {
      const response = await fetch("/api/visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName: brandName.trim(),
          website: normalizeWebsite(website),
          types: enabledTypes,
          lang,
        }),
      });
      const payload = await response.json() as { results?: ValidationResult[]; analyzedUrl?: string; analyzedAt?: string; error?: string };
      if (!response.ok || !payload.results) throw new Error(payload.error || "request_failed");
      setResults(payload.results);
      setAnalysisMeta({ analyzedUrl: payload.analyzedUrl || website, analyzedAt: payload.analyzedAt || new Date().toISOString() });
    } catch (error) {
      setResults([]);
      setAnalysisMeta(null);
      setHasSearched(false);
      setFeedback(error instanceof Error && error.message === "self_validation_not_allowed"
        ? text.form.ownSite
        : error instanceof Error && error.message === "rate_limited"
          ? text.form.rateLimited
          : text.form.requestError);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setBrandName("");
    setWebsite("");
    setResults([]);
    setAnalysisMeta(null);
    setHasSearched(false);
    setFeedback("");
  };

  return (
    <div className="visibility-validator-page">
      <InternalHero
        label={text.hero.label}
        title={text.hero.title}
        highlight={text.hero.highlight}
        subtitle={text.hero.subtitle}
        image="/media/bg/bg_validador-1600.webp"
        imageSrcSet="/media/bg/bg_validador-768.webp 768w, /media/bg/bg_validador-1600.webp 1600w"
        imageAlt="Sapiente.AI"
        compact
      />

      <section className="visibility-validator-main">
        <div className="visibility-validator-bg" aria-hidden="true" />
        <div className="visibility-validator-inner">
          <Reveal className="visibility-validator-form-wrap">
            <section className="visibility-validator-panel visibility-validator-form-panel">
              <div className="visibility-validator-panel-header">
                <span>{text.form.title}</span>
                <Search size={20} />
              </div>

              <div className="visibility-validator-fields">
                <label htmlFor="visibility-brand-name">
                  <span>{text.form.brand}</span>
                  <input id="visibility-brand-name" name="brandName" type="text" autoComplete="organization" value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder={text.form.brandPlaceholder} disabled={isLoading} />
                </label>

                <label htmlFor="visibility-website">
                  <span>{text.form.website}</span>
                  <input id="visibility-website" name="website" type="url" autoComplete="url" value={website} onChange={(event) => setWebsite(event.target.value)} placeholder={text.form.websitePlaceholder} disabled={isLoading} inputMode="url" />
                </label>
              </div>

              <div className="visibility-validator-types" aria-label={text.form.types}>
                <p>{text.form.types}</p>
                {selectableTypes.map((type) => {
                  const Icon = typeConfig[type].Icon;
                  const checked = selectedTypes[type];
                  return (
                    <button type="button" key={type} onClick={() => toggleType(type)} className={checked ? "is-selected" : "is-inactive"} disabled={isLoading} aria-pressed={checked}>
                      <span className="visibility-validator-check">{checked && <Check size={14} />}</span>
                      <Icon size={18} />
                      <span className="visibility-validator-type-label">{text.types[type]}</span>
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <p className="visibility-validator-feedback" role="alert">
                  <AlertCircle size={16} />
                  {feedback}
                </p>
              )}

              <button type="button" className="visibility-validator-submit" onClick={handleValidate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    {text.form.loading}
                  </>
                ) : (
                  <>
                    {text.form.button}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="visibility-validator-note">{text.form.note}</p>
            </section>
          </Reveal>

          <Reveal delay={100} className="visibility-validator-results-wrap">
            <section className="visibility-validator-panel visibility-validator-results-panel">
              {!hasSearched ? (
                <div className="visibility-validator-empty">
                  <Globe size={56} />
                  <h2>{text.results.idleTitle}</h2>
                  <p>{text.results.idleText}</p>
                </div>
              ) : (
                <div className="visibility-validator-results">
                  <div className="visibility-validator-results-head">
                    <h2>{text.results.title}</h2>
                    {results.length > 0 && (
                      <button type="button" onClick={reset}>
                        <RotateCcw size={16} />
                        {text.results.reset}
                      </button>
                    )}
                  </div>

                  <div className="visibility-validator-result-list">
                    {results.map((result) => {
                      const Icon = typeConfig[result.type].Icon;

                      return (
                        <article key={result.type} className={`visibility-validator-result-card status-${result.status}`}>
                          <div className="visibility-validator-result-top">
                            <div className="visibility-validator-result-icon">
                              <Icon size={22} />
                            </div>
                            <div>
                              <h3>{result.title}</h3>
                              <p>{result.description}</p>
                            </div>
                          </div>

                          <div className={`visibility-validator-score status-${result.status}`}>
                            <div
                              className="visibility-validator-score-ring"
                              role="progressbar"
                              aria-label={`${result.title}: ${result.score} ${lang === "pt" ? "pontos" : "points"}`}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={result.score}
                            >
                              <svg viewBox="0 0 120 120" aria-hidden="true">
                                <circle className="score-ring-background" cx="60" cy="60" r="48" />
                                <circle
                                  className="score-ring-value"
                                  cx="60"
                                  cy="60"
                                  r="48"
                                  pathLength="100"
                                  strokeDasharray="100"
                                  strokeDashoffset={100 - result.score}
                                />
                              </svg>
                              <strong>{result.score}</strong>
                            </div>
                            <h4>{text.results.performance} {result.type.toUpperCase()}</h4>
                            <p>{text.results.scoreNote}</p>
                            <div className="visibility-validator-score-legend" aria-label={lang === "pt" ? "Escala da pontuação" : "Score scale"}>
                              <span className="is-poor"><i />0–49</span>
                              <span className="is-partial"><i />50–74</span>
                              <span className="is-good"><i />75–100</span>
                            </div>
                          </div>

                          {result.details && result.details.length > 0 && (
                            <ul>
                              {result.details.map((detail) => (
                                <li key={detail}>
                                  <CheckCircle2 size={16} />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          )}

                          {result.checks && (
                            <details className="visibility-validator-checks">
                              <summary>{lang === "pt" ? "Ver todos os critérios" : "View all criteria"}</summary>
                              <ul>
                                {result.checks.map((check) => (
                                  <li key={check.label} className={check.passed ? "is-passed" : "is-failed"}>
                                    {check.passed ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                    <span>
                                      <strong>
                                        {check.label}{check.scored === false ? (lang === "pt" ? " (diagnóstico)" : " (diagnostic)") : ` (${check.points}/${check.maxPoints})`}:
                                      </strong>{" "}{check.evidence}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          )}

                          <div className="visibility-validator-status">
                            <span>{text.results.status}</span>
                            <strong>{text.results[result.status]}</strong>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  {results.length > 0 && (
                    <aside className="visibility-validator-impact" aria-labelledby="visibility-validator-impact-title">
                      <h2 id="visibility-validator-impact-title">{text.impact.title}</h2>
                      <div>
                        <article>
                          <Globe size={21} aria-hidden="true" />
                          <h3>{text.impact.seoTitle}</h3>
                          <p>{text.impact.seoText}</p>
                        </article>
                        <article>
                          <Brain size={21} aria-hidden="true" />
                          <h3>{text.impact.aeoTitle}</h3>
                          <p>{text.impact.aeoText}</p>
                        </article>
                      </div>
                    </aside>
                  )}
                </div>
              )}
            </section>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title={resultCTA.title}
        title_highlight={resultCTA.highlight}
        description={resultCTA.description}
        button={resultCTA.button}
        align="center"
        initialTopic={lang === "pt" ? "Projeto: Validador SEO e AEO" : "Project: SEO and AEO Validator"}
        analysisSummary={analysisMeta && results.length ? {
          ...analysisMeta,
          results: results.map((result) => ({
            title: result.title,
            score: result.score,
            status: result.status,
            priorities: (result.checks || []).filter((check) => !check.passed).slice(0, 3).map((check) => check.label),
          })),
        } : undefined}
      />
    </div>
  );
}
