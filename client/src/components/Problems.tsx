import { motion } from "framer-motion";
import { X, ShieldAlert, SearchX, HelpCircle } from "lucide-react";

const problems = [
  {
    title: "Ризик втрати",
    description: "Відправка через незнайомих водіїв без гарантій доставки.",
    icon: ShieldAlert,
    delay: 0
  },
  {
    title: "Складний пошук",
    description: "Години дзвінків, щоб знайти потрібного перевізника.",
    icon: SearchX,
    delay: 0.1
  },
  {
    title: "Хвилювання в дорозі",
    description: "Що з посилкою? Де вона? Коли буде? Немає зв'язку з водієм.",
    icon: HelpCircle,
    delay: 0.2
  }
];

export function Problems() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-red-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-slate-50/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            Чому старі методи <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">більше не працюють?</span>
          </h2>
          <p className="text-slate-500 text-lg lg:text-xl leading-relaxed">Ринок змінився, а інструменти — ні. <span className="font-bold text-slate-900">vezuway</span> пропонує нову екосистему замість хаосу.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative rounded-[2rem] lg:rounded-[2.5rem] bg-white transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gradient Border/Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-red-100 to-orange-100 rounded-[2rem] lg:rounded-[2.5rem] blur opacity-100 md:opacity-50 group-hover:opacity-100 md:group-hover:from-red-400 md:group-hover:to-orange-400 transition-all duration-500" />
              
              {/* Content Container */}
              <div className="relative h-full p-4 md:p-6 lg:p-8 bg-white rounded-[2rem] lg:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="mb-3 md:mb-8 flex justify-center">
                  <div className="relative w-14 h-14 md:w-24 md:h-24 flex items-center justify-center overflow-hidden">
                    <div className="hidden md:block absolute inset-0 bg-red-100 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                    <div className="hidden md:block absolute inset-0 bg-red-50 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                    <div className="relative w-12 h-12 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-red-100 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 md:w-10 md:h-10 text-red-500" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 
                    className="text-lg md:text-2xl font-bold mb-2 md:mb-4 text-slate-900 group-hover:text-red-600 transition-colors"
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Decorative X background */}
                <motion.div 
                  className="hidden md:block absolute bottom-4 right-4 opacity-[0.03] transform rotate-12 group-hover:scale-125 group-hover:rotate-45 transition-all duration-700"
                  initial={{ scale: 1, rotate: 12 }}
                  whileInView={{ scale: 1.25, rotate: 45 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <X className="w-24 h-24 text-red-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}