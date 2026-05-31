import { useState } from "react";
import { useLocation } from "wouter";

import { FinalCTA } from "@/components/ui/cta/FinalCTA";
import { quizContentEn } from "@/content/en/quiz";
import { quizContentPt } from "@/content/pt/quiz";
import { Icons } from "@/lib/icons";

import "@/styles/quizAI.css";

type QuizLang = "pt" | "en";
type QuizScreen = "start" | "quiz" | "result";

const quizContent = {
  pt: quizContentPt,
  en: quizContentEn,
};

export default function QuizAI() {
  const [location] = useLocation();
  const lang: QuizLang = location.startsWith("/en") ? "en" : "pt";

  const [screen, setScreen] = useState<QuizScreen>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);

  const content = quizContent[lang];
  const questions = content.questions;
  const question = questions[current];
  const selected = answers[current] ?? null;
  const score = answers.reduce((total, answer, index) => (answer === questions[index]?.correct ? total + 1 : total), 0);
  const startIntro =
    lang === "en"
      ? {
          badge: "Free quiz · 3 minutes",
          title: "What is the AI potential",
          highlight: "in your business?",
          subtitle: "Answer 10 questions about your business and discover where artificial intelligence can have the biggest impact, with a personalized report at the end.",
          stats: ["3 minutes", "10 questions", "Instant result"],
        }
      : {
          badge: "Quiz gratuito · 3 minutos",
          title: "Qual o potencial de IA",
          highlight: "no seu negócio?",
          subtitle: "Responda a 10 perguntas sobre o seu negócio e descubra em que áreas a inteligência artificial pode ter mais impacto — com um relatório personalizado no final.",
          stats: ["3 minutos", "10 perguntas", "Resultado imediato"],
        };

  const progress = ((current + 1) / questions.length) * 100;
  const resultPercent = Math.round((score / questions.length) * 100);
  const resultRingOffset = 314 - (314 * resultPercent) / 100;
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
            icon: Icons.TrendingUp,
            title: "Growth strategy",
            desc: "There is room to attract more clients with a digital strategy oriented to results and well-managed campaigns.",
          },
          {
            icon: Icons.Send,
            title: "Digital marketing",
            desc: "Your digital presence can be strengthened with consistent content and growth strategies with AI.",
          },
          {
            icon: Icons.PanelLeft,
            title: "Web development",
            desc: "Your website should be an active lead-generation tool, not just a static online presence.",
          },
        ]
      : [
          {
            icon: Icons.TrendingUp,
            title: "Estratégia de crescimento",
            desc: "Há oportunidade de atrair mais clientes com uma estratégia digital orientada a resultados e campanhas bem geridas.",
          },
          {
            icon: Icons.Send,
            title: "Marketing digital",
            desc: "A sua presença digital pode ser reforçada com conteúdo consistente e estratégias de crescimento com IA.",
          },
          {
            icon: Icons.PanelLeft,
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
      <section className="quiz-experience">
        <div className="quiz-bg-radials" />

        {screen === "start" && (
          <div className="quiz-screen quiz-start anim-in">
            <div className="quiz-start-inner">
              <div className="quiz-badge anim-in anim-d1">
                <span className="quiz-badge-dot" aria-hidden="true" />
                <span>{startIntro.badge}</span>
              </div>

              <h2 className="quiz-title anim-in anim-d2">
                <span>{startIntro.title}</span>
                <span className="quiz-title-highlight">{startIntro.highlight}</span>
              </h2>

              <p className="quiz-subtitle anim-in anim-d3">{startIntro.subtitle}</p>

              <div className="quiz-start-stats anim-in anim-d3" aria-label={content.duration}>
                <span>
                  <Icons.Clock size={18} />
                  {startIntro.stats[0]}
                </span>
                <span>
                  <Icons.Target size={18} />
                  {startIntro.stats[1]}
                </span>
                <span>
                  <Icons.BarChart3 size={18} />
                  {startIntro.stats[2]}
                </span>
              </div>

              <button type="button" onClick={startQuiz} className="quiz-main-btn">
                {content.startButton}
                <Icons.ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {screen === "quiz" && (
          <div className="quiz-screen quiz-area">
            <div className="quiz-container">
              <div className="quiz-question-progress" aria-label={`${current + 1}/${questions.length}`}>
                <div className="quiz-question-progress-track">
                  <div style={{ width: `${progress}%` }} />
                </div>
                <span>{current + 1}/{questions.length}</span>
              </div>

              <article className="quiz-question-panel anim-in">
                <p className="quiz-question-kicker">
                  {lang === "en" ? `Question ${current + 1} of ${questions.length}` : `Pergunta ${current + 1} de ${questions.length}`}
                </p>
                <h2>{question.q}</h2>

                <div className="quiz-options">
                  {question.opts.map((option, index) => {
                    const isSelected = selected === index;

                    return (
                      <button type="button" key={option} onClick={() => selectAnswer(index)} className={["quiz-option", isSelected ? "is-selected" : ""].filter(Boolean).join(" ")} aria-pressed={isSelected}>
                        <span aria-hidden="true" />
                        {option}
                      </button>
                    );
                  })}
                </div>
              </article>
              <div className="quiz-question-actions">
                <button type="button" onClick={previousQuestion} disabled={current === 0} className="quiz-prev-btn">
                  <Icons.ArrowLeft size={18} />
                  {lang === "en" ? "Previous" : "Anterior"}
                </button>
                <button type="button" onClick={nextQuestion} disabled={selected === null} className="quiz-next-btn">
                  {current + 1 >= questions.length ? content.resultButton : lang === "en" ? "Next" : "Próxima"}
                  <Icons.ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="quiz-screen quiz-result anim-in">
            <div className="quiz-result-inner">
              <div className="quiz-score-ring">
                <svg viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(10,132,255,0.1)" strokeWidth="8" />
                  <circle cx="60" cy="60" r="50" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="314" strokeDashoffset={resultRingOffset} transform="rotate(-90 60 60)" className="score-ring" />
                </svg>
                <div>
                  <strong>{resultPercent}%</strong>
                  <span>{lang === "en" ? "potential" : "potencial"}</span>
                </div>
              </div>

              <h2>{resultSummary.title}</h2>
              <p>{resultSummary.desc}</p>

              <div className="quiz-result-cards">
                {resultCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <article className="quiz-result-card" key={card.title}>
                      <Icon size={26} />
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                      <span>{lang === "en" ? "High priority" : "Prioridade alta"}</span>
                    </article>
                  );
                })}
              </div>

              <div className="quiz-result-cta">
                <h3>{lang === "en" ? "Want to know exactly how to improve these areas?" : "Quer saber exactamente como melhorar estas áreas?"}</h3>
                <p>
                  {lang === "en"
                    ? "We prepare a free diagnosis and present a concrete plan adapted to your business, with no commitment."
                    : "Fazemos um diagnóstico gratuito e apresentamos um plano concreto adaptado ao seu negócio, sem compromisso."}
                </p>
                <a className="quiz-services-link" href={servicesHref}>
                  {lang === "en" ? "View services" : "Ver serviços"}
                </a>
                <button type="button" onClick={restartQuiz} className="quiz-restart">
                  <Icons.RotateCcw size={16} />
                  {content.restartButton}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <FinalCTA title={content.ctaTitle} title_highlight={content.ctaHighlight} description={content.ctaText} button={content.ctaButton} />
    </main>
  );
}
