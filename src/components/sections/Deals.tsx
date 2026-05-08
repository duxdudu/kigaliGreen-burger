import { motion } from 'motion/react';
import { Timer, Tag, Flame, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export function Deals() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 34, s: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deals" className="py-24 px-6 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full bg-brand-red/[0.02] skew-y-3 origin-left -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full text-brand-red text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
              <Tag className="w-3 h-3" />
              Limited Global Drops
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-[0.9] text-black">
              Weekend Fire <br />
              <span className="text-brand-red">Global Deals</span>
            </h2>
            <p className="text-black/40 text-[11px] uppercase font-black tracking-widest mb-10 max-w-sm leading-relaxed italic">
              Buy any Elite Burger and get a second one for 50% OFF. Exclusive access for our global rewards members.
            </p>

            <div className="flex gap-4 mb-12">
              {[
                { val: timeLeft.h, label: 'Hours' },
                { val: timeLeft.m, label: 'Mins' },
                { val: timeLeft.s, label: 'Secs' }
              ].map((time) => (
                <div key={time.label} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-50 border border-black/5 rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black text-brand-red shadow-sm">
                    {time.val.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-black/20">{time.label}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="group bg-brand-red text-white hover:bg-brand-red/90 h-16 px-10 rounded-2xl text-xs uppercase font-black tracking-widest shadow-xl shadow-brand-red/20"
              onClick={() => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get My Access
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="relative z-10 p-10 bg-white border border-black/5 rounded-[56px] shadow-2xl shadow-black/5">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow rounded-full flex flex-col items-center justify-center rotate-12 scale-110 shadow-2xl border-4 border-white z-20">
                  <span className="text-xs font-black uppercase tracking-tighter text-black">Save</span>
                  <span className="text-3xl font-black text-black">50%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 border-4 border-white">
                    <img 
                      src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800" 
                      alt="Grill Master" 
                      className="w-full h-56 md:h-72 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 border-4 border-white mt-12">
                    <img 
                      src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800" 
                      alt="Burger Masterpiece" 
                      className="w-full h-56 md:h-72 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="mt-12 flex items-center justify-between">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200 overflow-hidden shadow-sm">
                         <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                       </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-4 border-white bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white shadow-sm">+5k</div>
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Claiming right now</span>
                </div>
             </div>
             {/* Decor */}
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-red/10 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
