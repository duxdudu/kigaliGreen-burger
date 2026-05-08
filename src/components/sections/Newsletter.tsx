import { motion } from 'motion/react';
import { Send, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export function Newsletter() {
  return (
    <section className="py-24 px-6 relative">
       <div className="max-w-5xl mx-auto bg-white border border-black/5 rounded-[64px] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-black/5">
          {/* Animated Background Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
             <div className="w-16 h-16 bg-brand-yellow rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-12 shadow-xl shadow-brand-yellow/30">
                <Zap className="w-8 h-8 text-black" />
             </div>
             
             <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-black leading-[0.9]">Join the <br /><span className="text-gradient">Grill Squad</span></h2>
             <p className="text-black/40 text-[10px] uppercase font-black tracking-widest mb-12 max-w-sm mx-auto leading-relaxed italic">Get early access to Kigali burger drops, secret midnight deals, and a free Elite burger on your birthday.</p>

             <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                   <input 
                    type="email" 
                    placeholder="CHEF@GRILL.COM" 
                    className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-6 px-8 focus:outline-none focus:border-brand-red/30 transition-all font-black uppercase text-[10px] tracking-widest placeholder:text-black/10 shadow-inner"
                   />
                </div>
                <Button className="gap-3 h-20 px-10 bg-brand-red text-white hover:bg-brand-red/90 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-red/20">
                  Secure Access <Send className="w-4 h-4" />
                </Button>
             </form>
             <p className="mt-8 text-[8px] text-black/20 font-black uppercase tracking-[5px] leading-none">Zero Spam. Pure Fire.</p>
          </motion.div>
       </div>
    </section>
  );
}
