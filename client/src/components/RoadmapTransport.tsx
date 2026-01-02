import { motion } from "framer-motion";
import { Users, Zap, Award, ArrowRight } from "lucide-react";

const roadmapItems = [
  {
    title: "Пасажирські квитки",
    description: "Продавай вільні місця в салоні офіційно через додаток.",
    icon: Award,
    tag: "СКОРО",
    color: "text-emerald-400",
    glow: "shadow-emerald-500/20"
  },
  {
    title: "Фінансовий менеджер",
    description: "Автоматичний підрахунок доходів та витрат за рейс.",
    icon: Zap,
    tag: "СКОРО",
    color: "text-green-400",
    glow: "shadow-green-500/20"
  },
  {
    title: "CRM клієнтів",
    description: "Твоя база постійних клієнтів з історією поїздок та відправок.",
    icon: Users,
    tag: "СКОРО",
    color: "text-teal-400",
    glow: "shadow-teal-500/20"
  }
];

export function RoadmapTransport() {
  return (
    <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] lg:w-[1000px] h-[400px] lg:h-[600px] bg-emerald-600/10 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] lg:w-[800px] h-[300px] lg:h-[600px] bg-teal-600/10 blur-[80px] lg:blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-emerald-300 text-xs font-bold mb-8 border border-white/10 backdrop-blur-sm tracking-widest"
          >
            ROADMAP 2025
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
            Більше ніж <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">просто доставка</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed">Ми будуємо платформу, яка насправді цінує водіїв. Реєструйся зараз і будь першим, хто скористається цими перевагами.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />
          {/* Connecting Line (Mobile) */}
          <div className="md:hidden absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 z-0" />

          {roadmapItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative z-10 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 group"
            >
              {/* Gradient Glow Border - Always visible on mobile, hover on desktop */}
              <div className={`absolute -inset-0.5 rounded-[2rem] blur opacity-100 md:opacity-40 group-hover:opacity-100 transition-all duration-500 ${item.glow.replace('shadow-', 'bg-')}`} style={{
                backgroundImage: item.color === 'text-emerald-400' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(34, 197, 94, 0.2) 100%)'
                  : item.color === 'text-green-400'
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(74, 222, 128, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(45, 212, 191, 0.2) 100%)'
              }} />
              
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/5 p-6 lg:p-8 rounded-[2rem] hover:bg-slate-800/80 hover:border-white/20 transition-all duration-500">
                <div className={`absolute inset-0 rounded-[2rem] shadow-2xl ${item.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/5 text-slate-300 border border-white/5 tracking-wider">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 text-sm font-medium">Більше оновлень кожен тиждень</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
