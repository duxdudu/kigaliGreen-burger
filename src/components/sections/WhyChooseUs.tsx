import { motion } from 'motion/react';
import { Truck, Leaf, ShieldCheck, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

const FEATURES = [
  {
    icon: Truck,
    title: "Global Speed",
    desc: "Crossing borders in minutes.",
    color: "bg-brand-red"
  },
  {
    icon: Leaf,
    title: "Fresh Crops",
    desc: "100% Premium Ingredients.",
    color: "bg-brand-yellow text-black"
  },
  {
    icon: Zap,
    title: "Flame Pure",
    desc: "The authentic fire grill.",
    color: "bg-brand-red"
  },
  {
    icon: CreditCard,
    title: "Elite Pass",
    desc: "Exclusive global access.",
    color: "bg-brand-yellow text-black"
  }
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 px-6 bg-white border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-red/10 blur-[80px] -z-10" />
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black uppercase mt-4 mb-6 leading-[0.9] text-black"
          >
            The <span className="text-gradient">Red Standard.</span>
          </motion.h2>
          <p className="text-black/20 uppercase font-black text-[10px] tracking-[0.4em] leading-none">Built on quality. Driven by flavor.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 bg-black/[0.01] border border-black/5 rounded-[48px] hover:bg-white hover:border-brand-red/30 transition-all duration-500 flex flex-col items-center text-center shadow-sm hover:shadow-2xl hover:shadow-black/5"
            >
              <div className={`${feature.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xl shadow-brand-red/10`}>
                <feature.icon className={`w-8 h-8 ${feature.color.includes('yellow') ? 'text-black' : 'text-white'}`} />
              </div>
              <h3 className="text-lg font-black uppercase mb-3 tracking-tight text-black">{feature.title}</h3>
              <p className="text-black/40 text-[10px] uppercase font-black tracking-widest leading-relaxed mb-8 italic">{feature.desc}</p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-auto text-[8px] tracking-[0.3em] uppercase font-black text-black/40 hover:text-brand-red"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
