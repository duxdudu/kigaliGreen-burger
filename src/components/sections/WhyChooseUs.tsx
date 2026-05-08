import { motion } from 'motion/react';
import { Truck, Leaf, ShieldCheck, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

const FEATURES = [
  {
    icon: Truck,
    title: "Rocket Ops",
    desc: "Precision timing city-wide.",
    color: "bg-brand-green"
  },
  {
    icon: Leaf,
    title: "Eco Fresh",
    desc: "Hill-to-bun Rwandan craft.",
    color: "bg-emerald-600"
  },
  {
    icon: Zap,
    title: "Premium Grade",
    desc: "Only elite Akagera cuts.",
    color: "bg-brand-lime"
  },
  {
    icon: CreditCard,
    title: "Smart Rewards",
    desc: "Exclusive digital drops.",
    color: "bg-brand-green"
  }
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 px-6 bg-dark-surface border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-green/20 blur-[80px] -z-10" />
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black uppercase mt-4 mb-6 leading-[0.9]"
          >
            The <span className="text-gradient">Green Standard.</span>
          </motion.h2>
          <p className="text-white/20 uppercase font-bold text-[10px] tracking-[0.4em]">Built on quality. Driven by Kigali energy.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white/5 border border-white/5 rounded-[40px] hover:bg-brand-green/5 hover:border-brand-green/30 transition-all duration-500 flex flex-col items-center text-center backdrop-blur-sm"
            >
              <div className={`${feature.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-2xl shadow-brand-green/20`}>
                <feature.icon className="text-dark-surface w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-8 italic">{feature.desc}</p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-auto text-[8px] tracking-[0.3em] uppercase font-black"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Deep Dive <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
