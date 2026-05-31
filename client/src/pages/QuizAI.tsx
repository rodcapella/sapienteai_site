import { useMemo, useState } from "react";
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
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const content = quizContent[lang];
  const questions = content.questions;
  const question = questions[current];
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

  const result = useMemo(() => {
    return content.results.find((item) => score <= item.max) ?? content.results[content.results.length - 1];
  }, [content.results, score]);

  const progress = ((current + 1) / questions.length) * 100;
  const circleOffset = 440 - (440 * score) / questions.length;

  const startQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setScreen("quiz");
  };

  const selectAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      setScreen("result");
      return;
    }
    setCurrent((prev) => prev + 1);
    setSelected(null);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
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
              <div className="quiz-topline">
                <span>{String(current + 1).padStart(2, "0")}/{questions.length}</span>
                <span>{content.scoreLabel}: {score}</span>
              </div>

              <div className="quiz-progress">
                <div style={{ width: `${progress}%` }} />
              </div>

              <article className="quiz-card anim-in">
                <p className="quiz-category">{question.cat}</p>
                <h2>{question.q}</h2>

                <div className="quiz-options">
                  {question.opts.map((option, index) => {
                    const isCorrect = index === question.correct;
                    const isWrong = selected === index && !isCorrect;

                    return (
                      <button type="button" key={option} disabled={selected !== null} onClick={() => selectAnswer(index)} className={["quiz-option", selected !== null && isCorrect ? "option-correct" : "", isWrong ? "option-wrong" : ""].filter(Boolean).join(" ")}>
                        <span>{String.fromCharCode(65 + index)}</span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div className={["quiz-feedback", selected === question.correct ? "is-correct" : "is-wrong"].join(" ")}>
                    <strong>{selected === question.correct ? `✅ ${content.correctLabel}` : `❌ ${content.wrongLabel}`}</strong>
                    <p>{question.explain}</p>
                  </div>
                )}
              </article>

              {selected !== null && (
                <div className="quiz-next-wrap">
                  <button type="button" onClick={nextQuestion} className="quiz-main-btn">
                    {current + 1 >= questions.length ? content.resultButton : content.nextButton}
                    <Icons.ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="quiz-screen quiz-result anim-in">
            <div className="quiz-result-inner">
              <div className="quiz-score-ring">
                <svg viewBox="0 0 160 160" aria-hidden="true">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(0,209,255,0.1)" strokeWidth="8" />
                  <circle cx="80" cy="80" r="70" fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="440" strokeDashoffset={circleOffset} transform="rotate(-90 80 80)" className="score-ring" />
                </svg>
                <div>
                  <strong>{score}</strong>
                  <span>/{questions.length}</span>
                </div>
              </div>

              <h2>{result.title}</h2>
              <p>{result.desc}</p>

              <button type="button" onClick={restartQuiz} className="quiz-restart">
                <Icons.RotateCcw size={16} />
                {content.restartButton}
              </button>
            </div>
          </div>
        )}
      </section>

      <FinalCTA title={content.ctaTitle} title_highlight={content.ctaHighlight} description={content.ctaText} button={content.ctaButton} />
    </main>
  );
}
