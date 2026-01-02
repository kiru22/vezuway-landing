import { motion } from "framer-motion";
import avatarImage from "@assets/generated_images/minimalist_futuristic_avatar.png";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Gemini has completely transformed how I brainstorm. It's like having a brilliant creative partner available 24/7.",
    author: "Sarah Chen",
    role: "Product Designer",
    delay: 0
  },
  {
    text: "The code generation capabilities of Nano Banana Pro are insane. It understands context better than any tool I've used.",
    author: "Marcus Rodriguez",
    role: "Senior Developer",
    delay: 0.1
  },
  {
    text: "I use it for everything from drafting emails to planning complex marketing campaigns. It just gets it.",
    author: "Elena Popov",
    role: "Marketing Director",
    delay: 0.2
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by creators</h2>
          <p className="text-slate-500">See how people are using Gemini to accelerate their workflows.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: t.delay }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100"
            >
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={avatarImage} 
                  alt={t.author} 
                  className="w-10 h-10 rounded-full object-cover bg-slate-200" 
                />
                <div>
                  <div className="font-semibold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}