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
    <section id="deals" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-brand-green/5 skew-y-3 origin-left -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 border border-brand-green/20 rounded-full text-brand-green text-xs font-bold uppercase tracking-widest mb-6">
              <Tag className="w-3 h-3" />
              Limited Kigali Drops
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-tight">
              Friday Fire <br />
              <span className="text-brand-lime">BOGO Deals</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Buy any Masterpiece Burger and get a second one for 50% OFF. Exclusive to our Kigali rewards members.
            </p>

            <div className="flex gap-4 mb-10">
              {[
                { val: timeLeft.h, label: 'Hours' },
                { val: timeLeft.m, label: 'Mins' },
                { val: timeLeft.s, label: 'Secs' }
              ].map((time) => (
                <div key={time.label} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 glass-morphism rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black text-brand-lime">
                    {time.val.toString().padStart(2, '0')}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-2 text-white/40">{time.label}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Exclusive Access
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="relative z-10 p-8 glass-morphism rounded-[40px] border-brand-green/20 shadow-2xl shadow-brand-green/10">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-lime rounded-full flex flex-col items-center justify-center rotate-12 scale-110 shadow-xl border-4 border-dark-surface z-20">
                  <span className="text-xs font-black uppercase tracking-tighter text-dark-surface">Save</span>
                  <span className="text-3xl font-black text-dark-surface">25%</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800" 
                    alt="Grill Master" 
                    className="w-full h-48 md:h-64 object-cover rounded-3xl"
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800" 
                    alt="Volcano Burger" 
                    className="w-full h-48 md:h-64 object-cover rounded-3xl mt-8"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-8 flex items-center justify-between">
                   <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-surface bg-brand-green overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Avatar" referrerPolicy="no-referrer" />
                       </div>
                     ))}
                     <div className="w-10 h-10 rounded-full border-2 border-dark-surface bg-zinc-800 flex items-center justify-center text-[10px] font-bold">+2k</div>
                   </div>
                   <span className="text-xs font-bold text-white/60">People claimed in the last hour</span>
                </div>
             </div>
             {/* Decor */}
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-green/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
