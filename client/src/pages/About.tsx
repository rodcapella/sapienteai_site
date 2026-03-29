import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section } from "@/components/ui/section/Section";
import { SectionCard } from "@/components/ui/section/SectionCard";

export default function About() {
    useEffect(() => {
    setSEOHead({
      title: 'Sobre Nós - SAPIENTE.AI',
      description: 'Sobre nós, SAPIENTE.AI.',
      url: 'https://sapiente-ai.manus.space/about',
      type: 'website'
    });

  return (
    <div className="min-h-screen bg-background text-foreground">

      <Header />

      {/* HERO */}
      <Section className="pt-32 pb-20 text-center">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            This didn’t start as a company.
          </h1>

          <p className="text-lg text-muted-foreground">
            It started as a question: why is making decisions still so hard?
          </p>

        </div>
      </Section>

      {/* STORY */}
      <Section>
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground leading-relaxed">

          <p>
            Sapiente AI was born from a simple frustration: businesses have more data than ever,
            but still struggle to make clear, fast decisions.
          </p>

          <p>
            Tools became more complex. Dashboards multiplied. But clarity didn’t.
          </p>

          <p className="text-foreground font-medium">
            So we asked a different question:
            what if systems could think with you?
          </p>

          <p>
            Not just automate tasks — but help you decide better, faster, and with confidence.
          </p>

        </div>
      </Section>

      {/* IDEA */}
      <Section>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

          <SectionCard>
            <h3 className="text-xl font-semibold mb-4">
              The Problem
            </h3>
            <p className="text-muted-foreground">
              Decision-making is fragmented. Tools are reactive. Teams waste time interpreting instead of acting.
            </p>
          </SectionCard>

          <SectionCard variant="highlight">
            <h3 className="text-xl font-semibold mb-4">
              The Vision
            </h3>
            <p className="text-muted-foreground">
              Build intelligent systems that don’t just show data — but guide action.
            </p>
          </SectionCard>

        </div>
      </Section>

      {/* LOGO STORY (🔥 DIFERENCIAL) */}
      <Section>
        <div className="max-w-3xl mx-auto text-center space-y-6">

          <h2 className="text-3xl font-semibold">
            The logo wasn’t random.
          </h2>

          <p className="text-muted-foreground">
            It represents structure, intelligence, and evolution.
          </p>

          <p className="text-muted-foreground">
            Every line, every shape was designed to reflect clarity emerging from complexity.
          </p>

          <p className="text-muted-foreground">
            Not just artificial intelligence — but structured thinking.
          </p>

          <p className="text-foreground font-medium">
            Sapiente means “to be wise”.
          </p>

        </div>
      </Section>

      {/* FUTURE */}
      <Section className="text-center">
        <div className="max-w-2xl mx-auto">

          <h2 className="text-3xl font-semibold mb-6">
            We’re just getting started.
          </h2>

          <p className="text-muted-foreground">
            The future belongs to companies that make better decisions faster.
          </p>

        </div>
      </Section>

      <Footer />
    </div>
  );
}