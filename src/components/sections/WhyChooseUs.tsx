import { motion } from 'motion/react';
import { Truck, Leaf, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: "Rocket Delivery",
    desc: "We prioritize timing across Kigali. Your hunger doesn't wait, and neither do we.",
    color: "bg-brand-green"
  },
  {
    icon: Leaf,
    title: "Eco Fresh Only",
    desc: "100% farm-to-bun Rwandan ingredients. No frozen patties, no shortcuts.",
    color: "bg-emerald-600"
  },
  {
    icon: ShieldCheck,
    title: "Premium Grade",
    desc: "Only the highest quality cuts of Akagera beef receive the Kigali Greens seal.",
    color: "bg-brand-lime"
  },
  {
    icon: CreditCard,
    title: "Smart Rewards",
    desc: "Earn FirePoints on every bite and redeem for exclusive digital drops in our app.",
    color: "bg-brand-green"
  }
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-24 px-6 bg-dark-surface border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-lime font-bold uppercase tracking-[0.2em] text-xs"
          >
            The Kigali Greens Standard
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase mt-4 mb-6"
          >
            We Don't Just Make Food. <br />
            We Build <span className="text-brand-green">Kigali Masterpieces.</span>
          </motion.h2>
          <p className="text-white/40 font-medium">Focused on quality, driven by flavor. Our commitment to excellence is what keeps the fire burning 24/7 across Kigali.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 glass-morphism rounded-[32px] hover:bg-brand-red/5 transition-all duration-500 border-white/5"
            >
              <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
                <feature.icon className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-black uppercase mb-3">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6 italic">"{feature.desc}"</p>
              
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange group-hover:text-brand-yellow transition-colors mt-auto">
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
