import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { Features } from "@/components/Features";
import { Roadmap } from "@/components/Roadmap";
import { CTA } from "@/components/CTA";
import { CTATransport } from "@/components/CTATransport";
import { Footer } from "@/components/Footer";
import { HeroTransport } from "@/components/HeroTransport";
import { ProblemsTransport } from "@/components/ProblemsTransport";
import { FeaturesTransport } from "@/components/FeaturesTransport";
import { RoadmapTransport } from "@/components/RoadmapTransport";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { RegistrationModal } from "@/components/RegistrationModal";
import { Package, Truck } from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState<"sender" | "carrier">("sender");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-vezu-blue/20">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`text-xl font-display font-bold transition-colors ${role === "sender" ? "text-vezu-blue" : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700"}`}>vezuway.</div>
          </div>

          {/* Role Toggle - Desktop: Two buttons, Mobile: Single button */}
          {/* Desktop Toggle */}
          <div className="hidden md:flex bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setRole("sender")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                role === "sender"
                  ? "bg-white shadow-sm text-vezu-blue"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Package className="w-4 h-4" />
              Відправник
            </button>
            <button
              onClick={() => setRole("carrier")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                role === "carrier"
                  ? "bg-white shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Truck className={`w-4 h-4 ${role === "carrier" ? "text-emerald-600" : ""}`} />
              Перевізник
            </button>
          </div>

          {/* Mobile Toggle - Icon only for inactive, text for active */}
          <div className="md:hidden flex items-center bg-slate-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setRole("sender")}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                role === "sender"
                  ? "bg-white shadow-sm text-vezu-blue text-xs font-medium"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              data-testid="button-toggle-sender-mobile"
            >
              <Package className="w-4 h-4" />
              {role === "sender" && <span>Відправник</span>}
            </button>
            <button
              onClick={() => setRole("carrier")}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                role === "carrier"
                  ? "bg-white shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 text-xs font-medium"
                  : "text-slate-400 hover:text-slate-600"
              }`}
              data-testid="button-toggle-carrier-mobile"
            >
              <Truck className={`w-4 h-4 ${role === "carrier" ? "text-emerald-600" : ""}`} />
              {role === "carrier" && <span>Перевізник</span>}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <RegistrationModal role={role}>
              <Button
                className={`rounded-full text-white px-6 ${
                  role === "sender"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800"
                }`}
              >
                Записатися
              </Button>
            </RegistrationModal>
          </div>
        </div>
      </nav>
      <main className="pt-20">
        {role === "sender" ? (
          <>
            <Hero />
            <Problems />
            <Features />
            <Roadmap />
            <CTATransport />
          </>
        ) : (
          <>
            <HeroTransport />
            <ProblemsTransport />
            <FeaturesTransport />
            <RoadmapTransport />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
