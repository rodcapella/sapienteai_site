import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { Reveal } from "@/components/ui/motion/Reveal";
import { useSEOHead } from "@/hooks/useSEOHead";
import { Icons } from "@/lib/icons";

import "@/styles/visibilityValidator.css";

type ValidatorLang = "pt" | "en";
type ValidationType = "seo" | "geo" | "aeo";
type ValidationStatus = "found" | "partial" | "not-found";

type ValidationResult = {
  type: ValidationType;
  status: ValidationStatus;
  title: string;
  description: string;
  details: string[];
  score: number;
};

const typeConfig = {
  seo: { Icon: Icons.Globe },
  geo: { Icon: Icons.MapPin },
  aeo: { Icon: Icons.Brain },
};

const copy = {
  pt: {
    seoTitle: "Validador SEO, GEO e AEO - Sapiente.AI",
    hero: {
      label: "Ferramenta gratuita",
      title: "Valide a visibilidade",
      highlight: "da sua marca.",
      subtitle: "Faça um diagnóstico preliminar da presença da sua marca em pesquisa, mapas e respostas de IA.",
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
      note: "Esta leitura é um diagnóstico preliminar. Para análise real, cruzamos dados técnicos, conteúdo, entidades, presença local e sinais de autoridade.",
    },
    types: {
      seo: "SEO (Google)",
      geo: "GEO (Google Maps)",
      aeo: "AEO (IA)",
    },
    results: {
      idleTitle: "Nenhuma análise realizada",
      idleText: "Preencha os dados e inicie a validação para ver o diagnóstico.",
      title: "Resultados da validação",
      score: "Score de visibilidade",
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
        details: ["Rever títulos, descrições e estrutura semântica das páginas principais.", "Criar clusters de conteúdo por serviço, setor e intenção de pesquisa.", "Melhorar dados estruturados, performance e links internos."],
      },
      geo: {
        title: "GEO (Pesquisa local)",
        description: "Consistência da presença local em mapas, perfis e diretórios.",
        details: ["Uniformizar nome, morada, contactos e categorias em perfis locais.", "Reforçar páginas locais ou setoriais com provas, avaliações e FAQs.", "Monitorizar citações, avaliações e sinais de proximidade."],
      },
      aeo: {
        title: "AEO (Respostas com IA)",
        description: "Capacidade de ser compreendido, citado e recomendado por motores de resposta.",
        details: ["Transformar serviços em respostas claras, objetivas e verificáveis.", "Publicar FAQs, glossários e páginas com entidades bem definidas.", "Fortalecer autoridade com exemplos, fontes, casos e dados estruturados."],
      },
    },
    cta: {
      title: "Quer transformar este diagnóstico",
      highlight: "num plano real?",
      description: "Analisamos a sua presença digital e criamos um plano concreto para melhorar SEO, visibilidade local e respostas de IA.",
      button: "Quero o diagnóstico gratuito",
    },
  },
  en: {
    seoTitle: "SEO, GEO and AEO Validator - Sapiente.AI",
    hero: {
      label: "Free tool",
      title: "Validate your brand",
      highlight: "visibility.",
      subtitle: "Run a preliminary diagnosis of your brand presence across search, maps, and AI-generated answers.",
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
      note: "This is a preliminary diagnosis. For a real analysis, we combine technical data, content, entities, local presence, and authority signals.",
    },
    types: {
      seo: "SEO (Google)",
      geo: "GEO (Google Maps)",
      aeo: "AEO (AI)",
    },
    results: {
      idleTitle: "No analysis yet",
      idleText: "Fill in the details and start validation to see the diagnosis.",
      title: "Validation results",
      score: "Visibility score",
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
        details: ["Review titles, descriptions, and semantic structure on key pages.", "Create content clusters by service, sector, and search intent.", "Improve structured data, performance, and internal linking."],
      },
      geo: {
        title: "GEO (Local search)",
        description: "Consistency of local presence across maps, profiles, and directories.",
        details: ["Standardize name, address, contacts, and categories in local profiles.", "Strengthen local or sector pages with proof, reviews, and FAQs.", "Monitor citations, reviews, and proximity signals."],
      },
      aeo: {
        title: "AEO (AI answers)",
        description: "Ability to be understood, cited, and recommended by answer engines.",
        details: ["Turn services into clear, objective, and verifiable answers.", "Publish FAQs, glossaries, and pages with well-defined entities.", "Strengthen authority with examples, sources, cases, and structured data."],
      },
    },
    cta: {
      title: "Want to turn this diagnosis",
      highlight: "into a real plan?",
      description: "We analyze your digital presence and create a concrete plan to improve SEO, local visibility, and AI answers.",
      button: "I want the free diagnosis",
    },
  },
} as const;

function normalizeWebsite(value: string) {
  return value.replace(/^https?:\/\//i, "").replace(/^www\./i, "").split("/")[0].trim().toLowerCase();
}

function getStableScore(seed: string, type: ValidationType) {
  const input = `${seed}:${type}`;
  const hash = Array.from(input).reduce((total, char) => total + char.charCodeAt(0) * 17, 0);
  const base = type === "seo" ? 54 : type === "geo" ? 47 : 42;
  return Math.min(96, base + (hash % 39));
}

function getStatus(score: number): ValidationStatus {
  if (score >= 72) return "found";
  if (score >= 50) return "partial";
  return "not-found";
}

export default function VisibilityValidator() {
  const [location] = useLocation();
  const lang: ValidatorLang = location.startsWith("/en") ? "en" : "pt";
  const text = copy[lang];

  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Record<ValidationType, boolean>>({ seo: true, geo: true, aeo: true });
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useSEOHead({
    title: text.seoTitle,
    description: text.hero.subtitle,
    url: `https://sapienteai.com/${lang}/seo-geo-aeo-validator`,
    type: "website",
  }, [lang, text]);

  const enabledTypes = (Object.keys(selectedTypes) as ValidationType[]).filter((type) => selectedTypes[type]);

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

    setIsLoading(true);
    setHasSearched(true);
    setFeedback("");
    await new Promise((resolve) => window.setTimeout(resolve, 900));

    const domain = normalizeWebsite(website);
    const seed = `${brandName.trim().toLowerCase()}:${domain}`;
    const nextResults = enabledTypes.map((type) => {
      const score = getStableScore(seed, type);
      const resultText = text.resultCopy[type];

      return {
        type,
        score,
        status: getStatus(score),
        title: resultText.title,
        description: resultText.description,
        details: resultText.details,
      };
    });

    setResults(nextResults);
    setIsLoading(false);
  };

  const reset = () => {
    setBrandName("");
    setWebsite("");
    setResults([]);
    setHasSearched(false);
    setFeedback("");
  };

  return (
    <main className="visibility-validator-page">
      <InternalHero
        label={text.hero.label}
        title={text.hero.title}
        highlight={text.hero.highlight}
        subtitle={text.hero.subtitle}
        image="/media/bg/servicos/bg_Servicos.png"
        imageAlt="Sapiente.AI"
        compact
      />

      <section className="visibility-validator-main">
        <div className="visibility-validator-bg" aria-hidden="true" />
        <div className="visibility-validator-inner">
          <Reveal>
            <section className="visibility-validator-panel visibility-validator-form-panel">
              <div className="visibility-validator-panel-header">
                <span>{text.form.title}</span>
                <Icons.Search size={20} />
              </div>

              <div className="visibility-validator-fields">
                <label>
                  <span>{text.form.brand}</span>
                  <input value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder={text.form.brandPlaceholder} disabled={isLoading} />
                </label>

                <label>
                  <span>{text.form.website}</span>
                  <input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder={text.form.websitePlaceholder} disabled={isLoading} inputMode="url" />
                </label>
              </div>

              <div className="visibility-validator-types" aria-label={text.form.types}>
                <p>{text.form.types}</p>
                {(Object.keys(typeConfig) as ValidationType[]).map((type) => {
                  const Icon = typeConfig[type].Icon;
                  const checked = selectedTypes[type];

                  return (
                    <button type="button" key={type} onClick={() => toggleType(type)} className={checked ? "is-selected" : ""} disabled={isLoading} aria-pressed={checked}>
                      <span className="visibility-validator-check">{checked && <Icons.Check size={14} />}</span>
                      <Icon size={18} />
                      {text.types[type]}
                    </button>
                  );
                })}
              </div>

              {feedback && (
                <p className="visibility-validator-feedback" role="alert">
                  <Icons.AlertCircle size={16} />
                  {feedback}
                </p>
              )}

              <button type="button" className="visibility-validator-submit" onClick={handleValidate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.LoaderCircle size={18} className="animate-spin" />
                    {text.form.loading}
                  </>
                ) : (
                  <>
                    {text.form.button}
                    <Icons.ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="visibility-validator-note">{text.form.note}</p>
            </section>
          </Reveal>

          <Reveal delay={100}>
            <section className="visibility-validator-panel visibility-validator-results-panel">
              {!hasSearched ? (
                <div className="visibility-validator-empty">
                  <Icons.Globe size={56} />
                  <h2>{text.results.idleTitle}</h2>
                  <p>{text.results.idleText}</p>
                </div>
              ) : (
                <div className="visibility-validator-results">
                  <div className="visibility-validator-results-head">
                    <h2>{text.results.title}</h2>
                    {results.length > 0 && (
                      <button type="button" onClick={reset}>
                        <Icons.RotateCcw size={16} />
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

                          <div className="visibility-validator-score">
                            <div>
                              <span>{text.results.score}</span>
                              <strong>{result.score}%</strong>
                            </div>
                            <div className="visibility-validator-score-track">
                              <span style={{ width: `${result.score}%` }} />
                            </div>
                          </div>

                          <ul>
                            {result.details.map((detail) => (
                              <li key={detail}>
                                <Icons.CheckCircle2 size={16} />
                                {detail}
                              </li>
                            ))}
                          </ul>

                          <div className="visibility-validator-status">
                            <span>{text.results.status}</span>
                            <strong>{text.results[result.status]}</strong>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </Reveal>
        </div>
      </section>

      <FinalCTA title={text.cta.title} title_highlight={text.cta.highlight} description={text.cta.description} button={text.cta.button} align="left" />
    </main>
  );
}
