type DirectAnswer = {
  question: string;
  answer: string;
};

type DirectAnswerSectionProps = {
  label: string;
  title: string;
  answers: readonly DirectAnswer[];
};

export function DirectAnswerSection({ label, title, answers }: DirectAnswerSectionProps) {
  return (
    <section
      className="content-atmosphere relative overflow-hidden bg-[linear-gradient(145deg,var(--section-ice)_0%,white_52%,color-mix(in_srgb,var(--brand-primary)_6%,white)_100%)] px-5 py-12 sm:px-8 md:py-16"
      aria-labelledby="direct-answers-title"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[var(--brand-cyan)]/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[var(--brand-primary)]/7 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <div className="relative max-w-4xl">
          <p className="inline-flex items-center gap-2 font-[var(--font-detail)] text-[11px] font-black uppercase tracking-[0.18em] text-[var(--brand-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-cyan)] shadow-[0_0_12px_var(--brand-cyan)]" aria-hidden="true" />
            {label}
          </p>
          <h2 id="direct-answers-title" className="mt-3 max-w-3xl font-[var(--font-heading)] text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-[1.1] text-[var(--brand-night)]">
            {title}
          </h2>
          <span className="mt-5 block h-1 w-16 rounded-full bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan))]" aria-hidden="true" />
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {answers.map((item, index) => (
            <article
              key={item.question}
              data-speakable
              className="group relative overflow-hidden rounded-[24px] border border-[var(--brand-primary)]/18 bg-white/92 p-5 shadow-[0_16px_38px_color-mix(in_srgb,var(--brand-deep)_8%,transparent)] transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/35 hover:shadow-[0_22px_50px_color-mix(in_srgb,var(--brand-primary)_13%,transparent)] sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/7 px-2 font-[var(--font-detail)] text-[11px] font-black tracking-[0.12em] text-[var(--brand-primary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px w-12 bg-[linear-gradient(90deg,transparent,var(--brand-cyan))] transition-all duration-300 group-hover:w-20" aria-hidden="true" />
              </div>
              <h3
                className="font-black leading-[1.2]"
                style={{
                  color: "var(--brand-primary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(18px, 1.7vw, 21px)",
                }}
              >
                {item.question}
              </h3>
              <p className="mt-4 font-[var(--font-body)] text-[14px] font-medium leading-7 text-[var(--brand-night)]/74 sm:text-[15px]">
                {item.answer}
              </p>
              <span className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--brand-primary),var(--brand-cyan))] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
