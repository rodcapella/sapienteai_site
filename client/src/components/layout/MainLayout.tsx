import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-foreground">

      {/* 🌌 HIGH-TECH BACKGROUND GLOW SYSTEM */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2563EB]/10 blur-[130px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00D4FF]/10 blur-[130px] rounded-full animate-pulse-slow" />
      </div>

      <Header />

      {/* 🧠 MAIN CONTENT WITH TRANSITION */}
      <main className="flex-1 w-full pt-20 md:pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

    </div>
  );
}
