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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-brand-red mb-4">
             <HelpCircle className="w-5 h-5" />
             <span className="font-black uppercase tracking-widest text-[10px]">Burger Intel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-black">Common <span className="text-gradient">Questions</span></h2>
          <p className="text-black/40 text-[10px] uppercase font-black tracking-widest mt-4">Everything you need to know about the global grill experience.</p>
        </div>

        <div className="space-y-4">
           {FAQS.map((faq, i) => (
             <div 
              key={i}
              className={`border rounded-[32px] overflow-hidden transition-all duration-300 ${active === i ? 'bg-zinc-50 border-brand-red/30 shadow-xl shadow-black/5' : 'bg-white border-black/5 hover:border-black/10 shadow-sm'}`}
             >
                <button 
                 onClick={() => setActive(active === i ? null : i)}
                 className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className="text-lg font-black uppercase tracking-tight text-black group-hover:text-brand-red transition-colors">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${active === i ? 'bg-brand-red text-white' : 'bg-black/[0.02] text-black/40'}`}>
                     {active === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                   {active === i && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                     >
                       <div className="px-8 pb-8 pt-0 text-black/40 text-[10px] font-black uppercase tracking-widest leading-relaxed italic">
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
