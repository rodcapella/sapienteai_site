import { useEffect, useState } from "react";

import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { InternalHero } from "@/components/ui/hero/InternalHero";
import { quizContentEn } from "@/content/en/quiz";
import { quizContentPt } from "@/content/pt/quiz";
import { ArrowLeft, ArrowRight, BarChart3, Clock, PanelLeft, RotateCcw, Send, Target, TrendingUp } from "@/lib/icons";

import "@/styles/quizAI.css";

type QuizLang = "pt" | "en";
type QuizScreen = "start" | "quiz" | "result";

const quizContent = {
  pt: quizContentPt,
  en: quizContentEn,
};

function getResultColor(percent: number) {
  if (percent <= 25) return "#ef4444";
  if (percent <= 49) return "#f97316";
  if (percent <= 75) return "#facc15";
  return "#22c55e";
}

export default function QuizAI() {
  const { lang: rawLang } = useTranslation();
  const lang: QuizLang = rawLang === "en" ? "en" : "pt";

  useSEOHead({
    title: lang === "en"
      ? "AI Readiness Quiz — Discover your business's AI potential · Sapiente.AI"
      : "Quiz IA — Descubra o potencial de Inteligência Artificial do seu negócio · Sapiente.AI",
    description: lang === "en"
      ? "Answer 10 quick questions and get a personalised report on where AI and automation can reduce costs, increase sales and save time in your business."
      : "Responda a 10 perguntas rápidas e receba um relatório personalizado sobre onde a IA e automação podem reduzir custos, aumentar vendas e poupar tempo no seu negócio.",
    url: `https://www.sapienteai.com/${lang}/${lang === "en" ? "quiz-ai" : "quiz-ia"}`,
  }, [lang]);

  const [screen, setScreen] = useState<QuizScreen>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);

  const content = quizContent[lang];
  const questions = content.questions;
  const question = questions[current];
  const selected = answers[current] ?? null;
  const score = answers.reduce<number>((total, answer, index) => {
    return answer === questions[index]?.correct ? total + 1 : total;
  }, 0);
  
  const startIntro = content.startIntro;

  const progress = ((current + 1) / questions.length) * 100;
  const resultPercent = Math.round((score / questions.length) * 100);
  const resultRingOffset = 314 - (314 * resultPercent) / 100;
  const resultColor = getResultColor(resultPercent);
  const servicesHref = `/${lang}/services`;
  
  const resultSummary =
    lang === "en"
      ? resultPercent >= 80
        ? {
            title: "Strong potential for AI acceleration",
            desc: "Your business already has solid foundations and can gain speed with intelligent automation and applied AI.",
          }
        : resultPercent >= 50
          ? {
              title: "Moderate potential for improvement",
              desc: "You already have some pieces in place, but there are clear opportunities to optimize with technology and intelligent automation.",
            }
          : {
              title: "High potential to unlock value",
              desc: "There are several opportunities to structure digital processes and use AI to create measurable business impact.",
            }
      : resultPercent >= 80
        ? {
            title: "Forte potencial de aceleração com IA",
            desc: "O seu negócio já tem bases sólidas e pode ganhar velocidade com automação inteligente e IA aplicada.",
          }
        : resultPercent >= 50
          ? {
              title: "Potencial moderado de melhoria",
              desc: "Já tem algumas peças no lugar, mas existem oportunidades claras de optimização com tecnologia e automação inteligente.",
            }
          : {
              title: "Alto potencial para desbloquear valor",
              desc: "Existem várias oportunidades para estruturar processos digitais e usar IA para gerar impacto mensurável no negócio.",
            };

  const resultCards =
    lang === "en"
      ? [
          {
            icon: TrendingUp,
            title: "Growth strategy",
            desc: "There is room to attract more clients with a digital strategy oriented to results and well-managed campaigns.",
          },
          {
            icon: Send,
            title: "Digital marketing",
            desc: "Your digital presence can be strengthened with consistent content and growth strategies with AI.",
          },
          {
            icon: PanelLeft,
            title: "Web development",
            desc: "Your website should be an active lead-generation tool, not just a static online presence.",
          },
        ]
      : [
          {
            icon: TrendingUp,
            title: "Estratégia de crescimento",
            desc: "Há oportunidade de atrair mais clientes com uma estratégia digital orientada a resultados e campanhas bem geridas.",
          },
          {
            icon: Send,
            title: "Marketing digital",
            desc: "A sua presença digital pode ser reforçada com conteúdo consistente e estratégias de crescimento com IA.",
          },
          {
            icon: PanelLeft,
            title: "Desenvolvimento web",
            desc: "O seu website precisa de ser uma ferramenta ativa de captação, não apenas uma presença online estática.",
          },
        ];

  const startQuiz = () => {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setScreen("quiz");
  };

  const selectAnswer = (index: number) => {
    setAnswers((currentAnswers) => {
      const nextAnswers = currentAnswers.length === questions.length ? [...currentAnswers] : Array(questions.length).fill(null);
      nextAnswers[current] = index;
      return nextAnswers;
    });
  };

  const nextQuestion = () => {
    if (selected === null) return;

    if (current + 1 >= questions.length) {
      setScreen("result");
      return;
    }
    setCurrent((prev) => prev + 1);
  };

  const previousQuestion = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const restartQuiz = () => {
    setCurrent(0);
    setAnswers([]);
    setScreen("start");
  };

  return (
    <main className="quiz-ai-page">
      <InternalHero
        label={startIntro.badge}
        title={startIntro.title}
        highlight={startIntro.highlight}
        subtitle={startIntro.subtitle}
        image="/media/bg/bg_Quiz.webp"
        imageAlt="Sapiente.AI"
        compact
      />

      {/* ── Intro section ── */}
      {screen === "start" && (
        <section className="quiz-intro-section flex flex-col items-center justify-center px-6 py-16 text-center md:py-20">
          <h2
            className="max-w-2xl font-black leading-[1.06]"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "var(--brand-night)" }}
          >
            {startIntro.title}{" "}
            <span className="quiz-text-gradient">{startIntro.highlight}</span>
          </h2>

          <p
            className="mt-5 max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.6vw, 17px)", color: "color-mix(in srgb, var(--brand-night) 65%, transparent)" }}
          >
            {startIntro.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--brand-night)]">
              <Clock size={18} className="text-[var(--brand-primary)]" />
              <span>{startIntro.stats[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--brand-night)]">
              <Target size={18} className="text-[var(--brand-primary)]" />
              <span>{startIntro.stats[1]}</span>
            </div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-[var(--brand-night)]">
              <BarChart3 size={18} className="text-[var(--brand-primary)]" />
              <span>{startIntro.stats[2]}</span>
            </div>
          </div>

          <div className="quiz-gradient-btn-wrapper mt-10">
            <button type="button" onClick={startQuiz}>
              <span>{content.startButton}</span>
              <ArrowRight size={18} className="animate-pulse" />
            </button>
          </div>
        </section>
      )}

      {screen !== "start" && (
      <section className="quiz-experience-container">
        <div className="quiz-bg-radials" />

        {screen === "quiz" && (
          <div className="quiz-screen quiz-area anim-in">
            <div className="quiz-container">
              <div className="quiz-question-progress" aria-label={`${current + 1}/${questions.length}`}>
                <div className="quiz-question-progress-track">
                  <div style={{ width: `${progress}%` }} className="quiz-progress-bar-fill" />
                </div>
                <span className="quiz-progress-text">{current + 1}/{questions.length}</span>
              </div>

              <article className="quiz-question-panel">
                <p className="quiz-question-kicker">
                  {lang === "en" ? `Question ${current + 1} of ${questions.length}` : `Pergunta ${current + 1} de ${questions.length}`}
                </p>
                <h2 className="quiz-question-text">{question.q}</h2>

                <div className="quiz-options">
                  {question.opts.map((option, index) => {
                    const isSelected = selected === index;

                    return (
                      <button 
                        type="button" 
                        key={option} 
                        onClick={() => selectAnswer(index)} 
                        className={["quiz-option-modern", isSelected ? "is-active-option" : ""].filter(Boolean).join(" ")} 
                        aria-pressed={isSelected}
                      >
                        <span className="quiz-option-checkbox" aria-hidden="true" />
                        <span className="quiz-option-label">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
              
              <div className="quiz-question-actions">
                <button type="button" onClick={previousQuestion} disabled={current === 0} className="quiz-nav-secondary-btn">
                  <ArrowLeft size={18} />
                  {lang === "en" ? "Previous" : "Anterior"}
                </button>
                <button type="button" onClick={nextQuestion} disabled={selected === null} className="quiz-nav-primary-btn">
                  {current + 1 >= questions.length ? content.resultButton : lang === "en" ? "Next" : "Próxima"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="quiz-screen quiz-result anim-in">
            <div className="quiz-result-inner">
              <div className="quiz-score-ring-container" style={{ "--quiz-result-color": resultColor } as React.CSSProperties}>
                <svg viewBox="0 0 120 120" className="quiz-svg-ring" aria-hidden="true">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="color-mix(in srgb,var(--quiz-result-color) 16%,transparent)" strokeWidth="6" />
                  <circle cx="60" cy="60" r="50" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="314" strokeDashoffset={resultRingOffset} transform="rotate(-90 60 60)" className="score-ring-gradient" />
                </svg>
                <div className="quiz-score-overlay-text">
                  <strong className="quiz-percentage-number">{resultPercent}%</strong>
                  <span className="quiz-percentage-label">{lang === "en" ? "potential" : "potencial"}</span>
                </div>
              </div>

              <h2 className="quiz-result-main-heading">{resultSummary.title}</h2>
              <p className="quiz-result-description">{resultSummary.desc}</p>

              <div className="quiz-result-cards-grid">
                {resultCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article className="quiz-result-modern-card" key={card.title}>
                      <div className="quiz-card-icon-container">
                        <Icon size={24} />
                      </div>
                      <h3 className="quiz-card-title">{card.title}</h3>
                      <p className="quiz-card-desc">{card.desc}</p>
                      <span className="quiz-card-priority-tag">{lang === "en" ? "High priority" : "Prioridade alta"}</span>
                    </article>
                  );
                })}
              </div>

              <div className="quiz-result-cta-box">
                <h3 className="quiz-cta-box-title">{lang === "en" ? "Want to know exactly how to improve these areas?" : "Quer saber exactamente como melhorar estas áreas?"}</h3>
                <p className="quiz-cta-box-text">
                  {lang === "en"
                    ? "We prepare a free diagnosis and present a concrete plan adapted to your business, with no commitment."
                    : "Fazemos um diagnóstico gratuito e apresentamos um plano concreto adaptado ao seu negócio, sem compromisso."}
                </p>
                <div className="quiz-result-footer-actions">
                  <a className="quiz-services-prime-link" href={servicesHref}>
                    {lang === "en" ? "View services" : "Ver serviços"}
                  </a>
                  <button type="button" onClick={restartQuiz} className="quiz-restart-action-btn">
                    <RotateCcw size={16} />
                    {content.restartButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      )}

      {screen === "result" && (
        <FinalCTA
          title={content.ctaTitle}
          title_highlight={content.ctaHighlight}
          description={content.ctaText}
          description_highlight={content.ctaTextHighlight}
          button={content.ctaButton}
          backgroundSrc="/media/bg/finalCTA/bg_finalCTA.webp"
        />
      )}
    </main>
  );
}
