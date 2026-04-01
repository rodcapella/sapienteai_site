import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B0F1A] text-white overflow-hidden">

      {/* 🌌 BACKGROUND GLOW SYSTEM */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* 🧊 HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/5">
        <Header />
      </div>

      {/* 🧠 MAIN CONTENT */}
      <main className="
        flex-1
        w-full
        max-w-7xl
        mx-auto
        px-4 md:px-6 lg:px-8
        py-10 md:py-16
      ">
        {children}
      </main>

      {/* ⚡ DIVIDER SUAVE */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 🧩 FOOTER */}
      <Footer />

    </div>
  );
}