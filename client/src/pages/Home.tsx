/**
 * SAPIENTE.AI Homepage
 * Design Philosophy: Neo-Brutalism meets Swiss Modernism
 * - Raw geometric shapes with precise mathematical grids
 * - Stark contrast between heavy black typography and electric blue accents
 * - Asymmetric layouts that break conventional centering
 * - Bold, unapologetic use of negative space as a structural element
 * - Diagonal clip-path cuts between sections creating dynamic transitions
 * - Oversized numbers for process steps
 * - Thick border frames around key sections (8px solid borders)
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Cpu, Zap, Target, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-8 border-foreground">
        <div className="container">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv_1770834590282_na1fn_YWktYnJhaW4taWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnZfMTc3MDgzNDU5MDI4Ml9uYTFmbl9ZV2t0WW5KaGFXNHRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hfGYbahKLZwroXxLYQBzMZRAubEOFKVF2unb1YZg4iP8DzF4hOGvNEOmKGsno1gOaFYYziP1xG5sC1HnN0CYlA9zhtCXfeU9EwpSlbk9bpX5Lqfg9AX8D7oLKzDMckczvu-YDOsY3j0ta4~n~oFcEJjhdxn7duPbcpEC7ucGRvq91jofH7a5bvDZkfinyXJzT2XfNpmWjdqdU561Y5fNdIquDclpTpRcAdd12TU7UQsWNQNZIqhDvjd6-zYac6XVQ0QRR1FT67-AV9zLQdzFlGuibt2Jvk1bOCTf3RVvyTUUvZGZgUSUwTCUtROR4RJKPpcJ1jFaQzuBZmVgbhXYDA__" 
                alt="SAPIENTE.AI" 
                className="h-12 w-12"
              />
              <span className="text-2xl font-bold tracking-tight">SAPIENTE<span className="text-primary">.AI</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">Serviços</a>
              <a href="#processo" className="text-sm font-medium hover:text-primary transition-colors">Processo</a>
              <a href="#diferenciais" className="text-sm font-medium hover:text-primary transition-colors">Diferenciais</a>
              <Button className="bg-foreground text-background hover:bg-foreground/90 border-4 border-foreground">
                Contactar
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-1_1770834578000_na1fn_aGVyby1haS1uZXVyYWwtbmV0d29yaw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTFfMTc3MDgzNDU3ODAwMF9uYTFmbl9hR1Z5YnkxaGFTMXVaWFZ5WVd3dGJtVjBkMjl5YXcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kkFL2bME1W03EgNa0Ch89mci1--7j2nmTVHh0~vxD4SIlukD3AaB9lDxtYAzLUcLabcDvZIueX~uk-ztc6RsBiCuhRcO6Ig2YC4gNOHK1g52KjzvWWPNFOZMTLjrSk-hsgZ698hERdM1AfM~m7HIeGMBb-k15THRn17iJjjmCFFieAtXRBGjE-JmFv1iclpitB~vpZfmsldhEdCYKGGYOiNQT3NM-sp~bRbDCO2h~xIqvFMY7~QVp6EKImKroxrb7XqQV-HvlhbJhrjOTepZ~AdT5mgziU8b627v4qstbl0nJhAbkr6687t2jAMqKg4RWNs4qYhW6cZLhOZtVL5TRw__" 
            alt="AI Neural Network" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground mb-6 uppercase">
              Inteligência Artificial Aplicada // 2026
            </p>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8">
              O Futuro da <span className="text-primary">Inteligência</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 text-muted-foreground">
              Soluções de IA Aplicada • Transformação Digital • Resultados Mensuráveis
            </p>
            <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto">
              Tecnologia de ponta para empresas que pensam no amanhã
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-4 border-foreground text-lg px-8 py-6 h-auto"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-4 border-foreground text-lg px-8 py-6 h-auto hover:bg-foreground hover:text-background"
              >
                Conhecer Soluções
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - O Que Fazemos */}
      <section id="servicos" className="py-24 md:py-32 bg-foreground text-background clip-diagonal-top">
        <div className="container">
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.3em] text-primary mb-4 uppercase">
              O Que Fazemos
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Soluções de IA<br />para o seu negócio
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="border-4 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
              <Brain className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Consultoria em IA</h3>
              <p className="text-background/80 leading-relaxed">
                Estratégia e implementação de soluções de inteligência artificial personalizadas para transformar o seu negócio.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="border-4 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
              <Cpu className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Desenvolvimento Customizado</h3>
              <p className="text-background/80 leading-relaxed">
                Modelos e aplicações sob medida para seu negócio, desenvolvidos com as tecnologias mais avançadas do mercado.
              </p>
            </div>
            
            {/* Service 3 */}
            <div className="border-4 border-background p-8 hover:bg-primary hover:border-primary transition-all duration-150">
              <Zap className="h-16 w-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Automação Inteligente</h3>
              <p className="text-background/80 leading-relaxed">
                Processos otimizados com machine learning e IA generativa para aumentar eficiência e reduzir custos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Como Funciona */}
      <section id="processo" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-4_1770834586000_na1fn_cHJvY2Vzcy1hdXRvbWF0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTRfMTc3MDgzNDU4NjAwMF9uYTFmbl9jSEp2WTJWemN5MWhkWFJ2YldGMGFXOXUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=i38YIwFvJre4D31xIuRrk87os1YLeuvqRUvNgxsZaNQS-wAtU4xUpo7iSb3jfrienkS3SOargcfC07yNS1PIflFOOOHI09DiJ3Ubb98BIft~0WYkNaHNc4wMdvhE-S9F7RfenmN0X0o1JpAUXvaZSRPs8mU62kW8CYuFeAQ0KB8uUB1bDW~2j2AdyHNEJtO25OH6fuVPFGAxdAhWfGpC8fAObjYf8V1CipRluOMECGS89S73Yw6JGmkLkW6ej6hk6vsrc~WcPf7LO7Q8QV38rTh3dqePJhz0IYeElhdeh5EO05ewSAF20-pOPzY1nWOSomfgswr9Xib0gvzEJQs9Bw__" 
            alt="Process" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="mb-16 text-center">
            <p className="text-sm font-medium tracking-[0.3em] text-primary mb-4 uppercase">
              Como Funciona
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Processo em 4 Etapas
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="text-[120px] font-black leading-none text-primary mb-4">01</div>
              <h3 className="text-2xl font-bold mb-3">Diagnóstico</h3>
              <p className="text-muted-foreground">
                Análise profunda das necessidades e oportunidades do seu negócio
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="text-[120px] font-black leading-none text-primary mb-4">02</div>
              <h3 className="text-2xl font-bold mb-3">Estratégia</h3>
              <p className="text-muted-foreground">
                Planejamento da solução ideal alinhada aos seus objetivos
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="text-[120px] font-black leading-none text-primary mb-4">03</div>
              <h3 className="text-2xl font-bold mb-3">Implementação</h3>
              <p className="text-muted-foreground">
                Desenvolvimento e integração das soluções de IA
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="text-center">
              <div className="text-[120px] font-black leading-none text-primary mb-4">04</div>
              <h3 className="text-2xl font-bold mb-3">Evolução</h3>
              <p className="text-muted-foreground">
                Monitoramento e otimização contínua dos resultados
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="diferenciais" className="py-24 md:py-32 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-5_1770834589000_na1fn_c3RyYXRlZ2ljLWNvbnN1bHRpbmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTVfMTc3MDgzNDU4OTAwMF9uYTFmbl9jM1J5WVhSbFoybGpMV052Ym5OMWJIUnBibWMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pz3N7d9LBoPpP96S9ju43X7WGs5t39w0qKlBbGodRIIbGAIYz7F-HVZvwpNS8AB4tPGJrtph9e7GLT4Yk8YKjTCGcrK2YYjaAbpacv1N5t6n4EE0kgsWoWZMifUMsmfWxP3FyACxF8ks37u--KgEXCoUhh1W~JufUaxQIHK43zHfcEWFuz6V7OvDBFg0zZrNhMUjpTH2kqg3kQzsXQgNthvWff5mzus1E55FUlqIuE7mcurMQjru938FtKd4FvBScV4LrOtFILvuyexSpRe04BWbAl~OU-V6BORCoKj4nr6JN7QOLk~BZuXzIlRrYQSVZKV0amS13mBfxKByDK~jVA__" 
            alt="Strategic" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="mb-16">
            <p className="text-sm font-medium tracking-[0.3em] text-primary mb-4 uppercase">
              Diferenciais
            </p>
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Por que escolher<br />a SAPIENTE.AI
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Expertise Técnica de Ponta</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Equipe especializada com experiência em projetos de IA de grande escala, utilizando as tecnologias mais avançadas do mercado.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Foco em Resultados Mensuráveis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todas as nossas soluções são desenvolvidas com métricas claras de sucesso e ROI comprovado.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Soluções Escaláveis e Seguras</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Arquiteturas robustas que crescem com o seu negócio, mantendo os mais altos padrões de segurança.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <Brain className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Suporte Dedicado</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Acompanhamento contínuo e suporte especializado para garantir o sucesso da implementação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-24 md:py-32 bg-foreground text-background clip-diagonal-top relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv-img-3_1770834577000_na1fn_YWJzdHJhY3QtZGF0YS1mbG93.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnYtaW1nLTNfMTc3MDgzNDU3NzAwMF9uYTFmbl9ZV0p6ZEhKaFkzUXRaR0YwWVMxbWJHOTMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=eL15Qn22ScG4XAbBqvDZ8f7LhpiD9ZlO860bQTuBSPLpPHL51fBEsFu4F2lQHM6W9BerRQEbCZ4k7nJpSdjIFnfoz3xqeIIAVpni2sGHkT6VAMFcRtH9DyqnCo~hAMih7BFW071UOPwiy3L-KRRE-e1j7DXgVTycBB2vr9RSf6skFFyov0FTC0myAhQ~o-pwv~QtIW8JVHUAyVQlNHsctyIKdxrX5zt9d0wz3b1Z4zXTHe1U7JkHXOgWsbLp2frN-k1Ei7Yp2qcutLlYNoGwRo6uR2sri9kk2F7MKeAmW0Pc6dG0ciW0JUY3kWoyc25wagt9SSseQYiAq1oHqEYV8w__" 
            alt="Data Flow" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              Pronto para transformar<br />seu negócio com <span className="text-primary">IA</span>?
            </h2>
            <p className="text-xl mb-12 text-background/80">
              Fale com nossos especialistas e descubra como a inteligência artificial pode revolucionar seus processos.
            </p>
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 border-4 border-background text-lg px-12 py-6 h-auto"
            >
              Falar com Especialista
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t-8 border-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/NuGUnsTwRF2n5w3zll2JwB/sandbox/n8cDBWcmW4T1QcNf8XA0nv_1770834590282_na1fn_YWktYnJhaW4taWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTnVHVW5zVHdSRjJuNXczemxsMkp3Qi9zYW5kYm94L244Y0RCV2NtVzRUMVFjTmY4WEEwbnZfMTc3MDgzNDU5MDI4Ml9uYTFmbl9ZV2t0WW5KaGFXNHRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hfGYbahKLZwroXxLYQBzMZRAubEOFKVF2unb1YZg4iP8DzF4hOGvNEOmKGsno1gOaFYYziP1xG5sC1HnN0CYlA9zhtCXfeU9EwpSlbk9bpX5Lqfg9AX8D7oLKzDMckczvu-YDOsY3j0ta4~n~oFcEJjhdxn7duPbcpEC7ucGRvq91jofH7a5bvDZkfinyXJzT2XfNpmWjdqdU561Y5fNdIquDclpTpRcAdd12TU7UQsWNQNZIqhDvjd6-zYac6XVQ0QRR1FT67-AV9zLQdzFlGuibt2Jvk1bOCTf3RVvyTUUvZGZgUSUwTCUtROR4RJKPpcJ1jFaQzuBZmVgbhXYDA__" 
                alt="SAPIENTE.AI" 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold">SAPIENTE<span className="text-primary">.AI</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 SAPIENTE.AI • Inteligência Artificial Aplicada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
