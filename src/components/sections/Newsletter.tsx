import { motion } from 'motion/react';
import { Send, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export function Newsletter() {
  return (
    <section className="py-24 px-6 relative">
       <div className="max-w-5xl mx-auto glass-morphism rounded-[60px] p-8 md:p-20 text-center relative overflow-hidden backdrop-blur-3xl">
          {/* Animated Background Pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
             <div className="w-20 h-20 bg-brand-lime/20 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
                <Zap className="w-10 h-10 text-brand-lime fill-current" />
             </div>
             
             <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">Join the <br /><span className="text-gradient">Hill Squad</span></h2>
             <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">Get early access to secret Gisenyi menu drops, crazy Kigali midnight deals, and a free Volcano burger on your birthday.</p>

             <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                   <input 
                    type="email" 
                    placeholder="your-email@kigali.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-brand-green/50 transition-all font-bold placeholder:text-white/20"
                   />
                </div>
                <Button className="gap-2 h-[58px]">
                  Sign Me Up <Send className="w-4 h-4" />
                </Button>
             </form>
             <p className="mt-6 text-[10px] text-white/30 font-bold uppercase tracking-[3px]">Zero Spam. Only Heat.</p>
          </motion.div>
       </div>
    </section>
  );
}
