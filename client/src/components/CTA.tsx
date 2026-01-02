import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift } from "lucide-react";
import { RegistrationModal } from "@/components/RegistrationModal";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute top-20 left-20 w-48 lg:w-64 h-48 lg:h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-20 w-64 lg:w-96 h-64 lg:h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4"
        >
          <h2 className="text-5xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-[1.1] mb-6 lg:mb-8 text-slate-900 tracking-tight">
            Готові змінити <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">правила гри?</span>
          </h2>
          <p className="text-xl sm:text-lg lg:text-2xl text-slate-500 mb-12 lg:mb-16 max-w-2xl mx-auto font-light">
            Долучайтесь до спільноти професійних перевізників. Жодних приховання комісій <br className="hidden md:block"/> на старті.
          </p>

          <div className="relative group">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[2rem] lg:rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-white p-6 sm:p-8 lg:p-16 rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 max-w-3xl mx-auto shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 w-max">
                <Gift className="w-4 h-4" />
                ТВОЯ ПРОПОЗИЦІЯ
              </div>

              <div className="text-4xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 lg:mb-4 leading-tight mt-4 lg:mt-0">
                2 Місяці Premium
              </div>
              <div className="text-slate-400 text-xl sm:text-lg mb-8">Звичайна ціна: €40/міс</div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <RegistrationModal role="carrier">
                  <Button size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-10 rounded-2xl text-base sm:text-lg lg:text-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 hover:shadow-emerald-600/40 whitespace-nowrap">
                    Забрати пропозицію
                  </Button>
                </RegistrationModal>
              </div>

              <p className="mt-8 text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
                *Пропозиція діє обмежений час. Реєстрація безкоштовна.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}