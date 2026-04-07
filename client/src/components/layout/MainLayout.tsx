import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B0F1A] text-white overflow-x-hidden">

      {/* 🌌 BACKGROUND GLOW SYSTEM */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* 🧊 HEADER - Fixed by default in Header component, but here we provide the spacing */}
      <Header />

      {/* 🧠 MAIN CONTENT */}
      <main className="flex-1 w-full pt-20 md:pt-28">
        {children}
      </main>

      {/* 🧩 FOOTER */}
      <Footer />

    </div>
  );
}
