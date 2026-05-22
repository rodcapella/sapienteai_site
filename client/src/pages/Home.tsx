REPLACE_EXACT:       <Section className={homeSectionClass}>
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal>
            <img
              src="/media/banners/home_marketing_digital_ia.jpeg"
              alt={content.marketingAI.title}
              className="w-full rounded-[2rem] border border-[var(--brand-cyan)]/20 object-cover shadow-[0_24px_70px_rgba(1,32,80,0.16)]"
            />
          </Reveal>
        </div>
      </Section> =>       <Section
        className="relative min-h-[700px] overflow-hidden bg-[url('/media/banners/home_marketing_digital_ia.jpeg')] bg-cover bg-center bg-no-repeat py-24 md:min-h-[760px] md:py-36"
        aria-label={content.marketingAI.title}
      >
        <Reveal>
          <div className="relative z-10 mx-auto max-w-7xl px-6" />
        </Reveal>
      </Section>