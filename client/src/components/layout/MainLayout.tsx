import { Suspense, useEffect } from "react";
import { useLocation } from "wouter";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="animate-pulse text-sm tracking-wide text-[var(--brand-offwhite)]/40">
        Loading...
      </div>
    </div>
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

      <main className="flex min-h-0 flex-1 w-full flex-col pt-16 md:pt-[68px]">
        <Suspense fallback={<PageFallback />}>
          <div
            key={location}
            className="flex min-h-full flex-1 flex-col animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {children}
          </div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
