import { useMemo, useState } from "react";
import { useLocation } from "wouter";

import ContactModal from "@/components/ContactModal";
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
  const [isContactOpen, setIsContactOpen] = useState(false);

  const content = quizContent[lang];
  const questions = content.questions;
  const question = questions[current];

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

    if (index === question.correct) {
      setScore((prev) => prev + 1);
    }
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
    <main className="quiz-ai-page tech-grid scanlines">
      <div className="quiz-bg-radials" />
      <div className="quiz-bg-dots dots-matrix" />

      {screen === "start" && (
        <section className="quiz-screen quiz-start anim-in">
          <div className="quiz-start-inner">
            <div className="quiz-badge anim-in anim-d1">
              <Icons.Zap size={14} />
              <span>{content.badge}</span>
            </div>

            <h1 className="quiz-title anim-in anim-d2">
              {content.title} <span className="neon-blue neon-text-glow">{content.highlight}</span>?
            </h1>

            <p className="quiz-subtitle anim-in anim-d3">{content.subtitle}</p>

            <button type="button" onClick={startQuiz} className="quiz-main-btn">
              {content.startButton}
              <Icons.ArrowRight size={18} />
            </button>

            <p className="quiz-duration">{content.duration}</p>
          </div>
        </section>
      )}

      {screen === "quiz" && (
        <section className="quiz-screen quiz-area">
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
                    <button
                      type="button"
                      key={option}
                      disabled={selected !== null}
                      onClick={() => selectAnswer(index)}
                      className={[
                        "quiz-option",
                        selected !== null && isCorrect ? "option-correct" : "",
                        isWrong ? "option-wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className={["quiz-feedback", selected === question.correct ? "is-correct" : "is-wrong"].join(" ")}>
                  <strong>
                    {selected === question.correct ? `✅ ${content.correctLabel}` : `❌ ${content.wrongLabel}`}
                  </strong>

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
        </section>
      )}

      {screen === "result" && (
        <section className="quiz-screen quiz-result anim-in">
          <div className="quiz-result-inner">
            <div className="quiz-score-ring">
              <svg viewBox="0 0 160 160" aria-hidden="true">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="8" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="440"
                  strokeDashoffset={circleOffset}
                  transform="rotate(-90 80 80)"
                  className="score-ring"
                />
              </svg>

              <div>
                <strong>{score}</strong>
                <span>/{questions.length}</span>
              </div>
            </div>

            <h2>{result.title}</h2>
            <p>{result.desc}</p>

            <div className="quiz-cta-card">
              <div className="quiz-cta-icon">
                <Icons.Rocket size={26} />
              </div>

              <h3>{content.ctaTitle}</h3>
              <p>{content.ctaText}</p>

              <button type="button" onClick={() => setIsContactOpen(true)} className="quiz-main-btn">
                {content.ctaButton}
              </button>
            </div>

            <button type="button" onClick={restartQuiz} className="quiz-restart">
              <Icons.RotateCcw size={16} />
              {content.restartButton}
            </button>
          </div>
        </section>
      )}

      {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
    </main>
  );
}
