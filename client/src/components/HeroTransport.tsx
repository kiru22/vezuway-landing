import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { RegistrationModal } from "@/components/RegistrationModal";
import deliveryVan from "@/assets/delivery-van.png";

export function HeroTransport() {
  return (
    <section className="relative min-h-[calc(90vh+100px)] lg:min-h-[90vh] flex items-center overflow-hidden lg:overflow-visible lg:overflow-x-hidden pt-20 lg:pt-20 w-full">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-green-50 to-transparent -z-10 hidden lg:block" />
      {/* Mobile/Global Ambient Gradients - Green Theme */}
      <div className="absolute top-20 -right-20 w-[350px] h-[350px] lg:w-[600px] lg:h-[600px] bg-green-400/30 rounded-full blur-[80px] -z-10 animate-pulse-soft" />
      <div
        className="absolute bottom-20 -left-20 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-emerald-400/30 rounded-full blur-[80px] -z-10 animate-pulse-soft"
        style={{ animationDelay: "2s" }}
      />
      <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 overflow-hidden lg:overflow-visible lg:overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:max-w-xl relative z-10 mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h1 className="text-[clamp(40px,9vw,88px)] font-bold mb-6 text-slate-900 leading-tight w-full">
            Стань перевізником, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              якому довіряють
            </span>
          </h1>

          <p className="text-lg sm:text-lg text-slate-600 mb-8 max-w-md leading-relaxed mx-auto lg:mx-0">
            Твоя репутація працює на тебе — коли маршрути, замовлення й графік
            під контролем.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <RegistrationModal role="carrier">
              <Button
                size="lg"
                className="relative h-14 sm:h-16 px-4 sm:px-10 rounded-2xl text-[15px] sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.8)] transition-shadow duration-300 group border border-white/20 overflow-hidden hover:from-emerald-700 hover:to-teal-800"
              >
                Отримати 2 місяці Premium
                <ArrowRight className="ml-2 w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </Button>
            </RegistrationModal>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500">
            <span>🔥 Тільки для перших 50 водіїв</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative block min-h-[500px] lg:min-h-0 lg:aspect-square mt-12 lg:mt-0 overflow-visible"
        >
          {/* Delivery Van Image */}
          <motion.img
            src={deliveryVan}
            alt="Delivery Van"
            className="w-full h-full object-contain object-center rounded-3xl lg:rounded-none lg:translate-y-[30px]"
            animate={{ y: [-70, -50, -70] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating Driver Card - INTERACTIVE VERSION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { delay: 0, duration: 0.3 },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[100px] lg:top-2/3 lg:left-auto lg:right-10 lg:translate-x-0 lg:translate-y-[60px] scale-85 origin-center lg:origin-right bg-white p-6 lg:p-8 rounded-[2rem] shadow-xl border border-slate-100 max-w-[95%] w-full lg:max-w-md z-20 cursor-default mt-[-214px] mb-[-214px]"
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  П
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    Петро Р.
                  </div>
                  <div className="text-sm text-slate-400 font-medium whitespace-nowrap">
                    Львів • Малага
                  </div>
                </div>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 text-sm font-bold whitespace-nowrap ml-2">
                Перевірений
              </span>
            </div>

            {/* Card Body - Earnings Stats */}
            <div className="space-y-3">
              {/* Row 1 */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Дохід з рейсу
                  </span>
                </div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                  + 2640 €
                </div>
              </div>

              {/* Row 2 */}
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    Маршрут завтра
                  </span>
                </div>
                <div className="text-sm text-slate-500">
                  Київ → Варшава → Прага
                </div>
              </div>
            </div>

            {/* Floating Status Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                scale: { delay: 1.2, type: "spring" },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100"
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </motion.div>
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  СТАТУС
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Ефективність +25%
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
