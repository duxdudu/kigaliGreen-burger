import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  {
    q: "How do I earn FirePoints?",
    a: "Every dollar spent on the app earns you 10 FirePoints. You can redeem them for free burgers, sides, and exclusive FlameGrill merch."
  },
  {
    q: "Do you have vegetarian options?",
    a: "Absolutely! Our 'Veggie King' line features 100% plant-based patties that are flame-grilled on separate surfaces to ensure pure taste."
  },
  {
    q: "What is the average delivery time?",
    a: "Our goal is 30 minutes or less. We have dedicated FireRiders at every location to ensure your feast arrives hot and fresh."
  },
  {
    q: "Can I customize my burger in the app?",
    a: "Yes! Our app features a 'Kitchen Mode' where you can add, remove, or swap any ingredient to build your perfect masterpiece."
  }
];

export function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-orange mb-4">
             <HelpCircle className="w-5 h-5" />
             <span className="font-black uppercase tracking-widest text-xs">Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase">Common <span className="text-gradient">Questions</span></h2>
        </div>

        <div className="space-y-4">
           {FAQS.map((faq, i) => (
             <div 
              key={i}
              className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors"
             >
               <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
               >
                 <span className="text-lg font-black uppercase tracking-tight">{faq.q}</span>
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    {active === i ? <Minus className="w-4 h-4 text-brand-red" /> : <Plus className="w-4 h-4 text-white" />}
                 </div>
               </button>
               <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-white/50 leading-relaxed font-medium italic">
                        "{faq.a}"
                      </div>
                    </motion.div>
                  )}
               </AnimatePresence>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
