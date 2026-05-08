import { motion } from 'motion/react';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function AppDownload() {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto glass-morphism rounded-[48px] border-white/10 p-8 md:p-16 relative">
        {/* Background Decor */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-brand-lime mb-6">
              <Smartphone className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest text-xs">The Digital Garden</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-tight">
              Order Faster <br />
              <span className="text-gradient hover:animate-pulse transition-all">Green Rewards</span>
            </h2>
            
            <div className="space-y-6 mb-10">
              {[
                "Exclusive Kigali-only app deals",
                "Live order tracking across the hills",
                "Earn GreenPoints for every Frw spent",
                "One-tap repeat of your Gisenyi favorites"
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center group-hover:bg-brand-green transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-brand-green group-hover:text-dark-surface transition-colors" />
                  </div>
                  <span className="text-white/70 font-semibold">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
               <Button variant="outline" className="h-16 px-8 gap-3 border-white/10 hover:border-white/40">
                  <div className="w-8 h-8 bg-brand-green text-dark-surface rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-white/40 mb-1">Download on the</span>
                    <span className="text-lg font-bold">App Store</span>
                  </div>
               </Button>
               <Button variant="outline" className="h-16 px-8 gap-3 border-white/10 hover:border-white/40">
                  <div className="w-8 h-8 bg-brand-lime text-dark-surface rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] uppercase font-bold text-white/40 mb-1">Get it on</span>
                    <span className="text-lg font-bold">Google Play</span>
                  </div>
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-[300px] md:w-[350px] aspect-[9/19.5] bg-dark-surface rounded-[40px] border-[8px] border-white/10 shadow-2xl overflow-hidden">
               {/* App UI Simulator */}
               <div className="w-full h-full p-6 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 bg-brand-green rounded-lg" />
                    <div className="flex gap-2">
                       <div className="w-8 h-8 rounded-full bg-white/5" />
                       <div className="w-8 h-8 rounded-full bg-white/5" />
                    </div>
                  </div>
                  <div className="h-40 w-full bg-brand-green/20 rounded-3xl animate-pulse" />
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="h-24 bg-white/5 rounded-2xl" />
                    <div className="h-24 bg-white/5 rounded-2xl" />
                  </div>
               </div>
            </div>
            {/* Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-lime/20 to-transparent blur-[100px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
