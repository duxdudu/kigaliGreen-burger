import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

const NEWS = [
  {
    title: "Secret Gisenyi Herb Recipe Revealed?",
    date: "May 12, 2026",
    tag: "Recipes",
    desc: "Dive into the aromatic world of our marinated chicken. Our chef shares the story behind our local spices."
  },
  {
    title: "Eco-Fresh: Our Sustainability Goal 2030",
    date: "May 08, 2026",
    tag: "Sustainability",
    desc: "How Kigali Greens is partnering with local co-operatives to ensure 100% farm-to-bun by 2030."
  }
];

export function NewsAndBooking() {
  return (
    <section className="py-24 px-6 relative bg-dark-card overflow-hidden">
      {/* Visual Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left: News/Recipes */}
        <div>
          <div className="flex items-center gap-2 text-brand-lime mb-6">
             <BookOpen className="w-5 h-5" />
             <span className="font-black uppercase tracking-widest text-xs">The Green Journal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">Latest From <br /><span className="text-gradient">The Garden</span></h2>
          
          <div className="space-y-8">
            {NEWS.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 glass-morphism rounded-[32px] hover:border-brand-green/30 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-[10px] font-black uppercase tracking-widest rounded-full">{item.tag}</span>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{item.date}</span>
                </div>
                <h4 className="text-xl font-black uppercase mb-2 group-hover:text-brand-lime transition-colors">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed italic mb-4">"{item.desc}"</p>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-green group-hover:translate-x-1 transition-all">
                  Read Full Recipe <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Booking UI (Mobile-App Style) */}
        <div className="relative">
           <div className="lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-[400px] mx-auto bg-dark-surface border border-white/10 rounded-[48px] p-8 shadow-2xl shadow-brand-green/10"
              >
                {/* Header App Style */}
                <div className="flex justify-between items-center mb-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20">
                         <Calendar className="text-dark-surface w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="font-black uppercase text-sm leading-tight">Book A Table</h5>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Kigali Flagship</p>
                      </div>
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">?</div>
                </div>

                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Select Guest Count</label>
                      <div className="grid grid-cols-4 gap-2">
                         {[1, 2, 4, '6+'].map(c => (
                           <button key={c} className="h-10 rounded-xl bg-white/5 border border-white/5 hover:border-brand-green/50 text-sm font-bold transition-all">{c}</button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Pick Date & Time</label>
                       <div className="grid grid-cols-2 gap-3">
                          <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold">
                             <Calendar className="w-4 h-4 text-brand-green" />
                             Today
                          </button>
                          <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold">
                             <Clock className="w-4 h-4 text-brand-lime" />
                             19:30
                          </button>
                       </div>
                   </div>

                   <div className="p-4 bg-brand-green/5 border border-brand-green/10 rounded-3xl space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">Booking Perk</p>
                      <p className="text-xs text-white/70 italic leading-relaxed">Book through our app-style system and get two complimentary 'Volcano' appetizers on arrival.</p>
                   </div>

                   <Button className="w-full gap-2 py-6 text-sm">
                      Secure My Spot
                      <ArrowRight className="w-4 h-4" />
                   </Button>
                </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
}
