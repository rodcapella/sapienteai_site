import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

import Header from "@/components/Header";

const Footer = lazy(() => import("@/components/Footer"));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="animate-pulse text-sm tracking-wide text-[var(--brand-offwhite)]/40">
        Loading...
      </div>
    </div>
  );
}

function DeferredFooter() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender || !sentinelRef.current) return;

    let observer: IntersectionObserver | null = null;
    let delayId: number | undefined;
    let idleId: number | undefined;

    const observeFooter = () => {
      if (!sentinelRef.current || shouldRender) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setShouldRender(true);
          observer?.disconnect();
        },
        { rootMargin: "0px" },
      );

      observer.observe(sentinelRef.current);
    };

    const scheduleObservation = () => {
      delayId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(observeFooter, { timeout: 1200 });
          return;
        }

        observeFooter();
      }, 1200);
    };

    if (document.readyState === "complete") scheduleObservation();
    else window.addEventListener("load", scheduleObservation, { once: true });

    return () => {
      window.removeEventListener("load", scheduleObservation);
      if (delayId !== undefined) window.clearTimeout(delayId);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      observer?.disconnect();
    };
  }, [shouldRender]);

  return (
    <>
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />
      {shouldRender && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const skipLabel = location.startsWith("/en") ? "Skip to main content" : "Saltar para o conteúdo principal";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-[var(--brand-night)] px-4 py-3 font-[var(--font-body)] font-bold text-white shadow-xl focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cyan-bright)]"
      >
        {skipLabel}
      </a>
      <Header />

      <main id="main-content" tabIndex={-1} className="flex min-h-[calc(100svh-4rem)] flex-1 w-full flex-col pt-16 outline-none md:min-h-[calc(100svh-4.25rem)] md:pt-[68px]">
        <Suspense fallback={<PageFallback />}>
          <div
            key={location}
            className="flex min-h-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {children}
          </div>
        </Suspense>
      </main>

      <DeferredFooter />
    </div>
  );
}
