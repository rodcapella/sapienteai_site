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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-foreground">
      <Header />

      <main className="flex min-h-[calc(100svh-4rem)] flex-1 w-full flex-col pt-16 md:min-h-[calc(100svh-4.25rem)] md:pt-[68px]">
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
