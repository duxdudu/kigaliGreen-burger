import { motion } from 'motion/react';
import { Smartphone, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function AppDownload() {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-white border border-black/5 rounded-[56px] p-8 md:p-20 relative shadow-2xl shadow-black/5">
        {/* Background Decor */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-brand-red mb-6">
              <Smartphone className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest text-[10px]">The Digital Grill</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-[0.9] text-black">
              Grill in Your <br />
              <span className="text-gradient hover:animate-pulse transition-all">Pocket</span>
            </h2>
            
            <div className="space-y-6 mb-12">
              {[
                "Exclusive global burger drops",
                "Real-time tracking across borders",
                "Earn FirePoints on every order",
                "One-tap repeat for your favorites"
              ].map((text, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-red transition-colors shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-black/60 font-black uppercase tracking-widest text-[10px]">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
               <Button variant="outline" className="h-20 px-10 gap-4 border-black/5 hover:border-brand-red/30 transition-all rounded-3xl bg-zinc-50 group shadow-sm hover:shadow-xl">
                  <div className="w-10 h-10 bg-brand-red text-white rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <Download className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[9px] uppercase font-black text-black/40 tracking-widest">Download on</span>
                    <span className="text-xl font-black text-black">App Store</span>
                  </div>
               </Button>
               <Button variant="outline" className="h-20 px-10 gap-4 border-black/5 hover:border-brand-red/30 transition-all rounded-3xl bg-zinc-50 group shadow-sm hover:shadow-xl">
                  <div className="w-10 h-10 bg-brand-yellow text-black rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[9px] uppercase font-black text-black/40 tracking-widest">Get it on</span>
                    <span className="text-xl font-black text-black">Google Play</span>
                  </div>
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 w-[300px] md:w-[340px] aspect-[9/19] bg-white rounded-[64px] border-[12px] border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
               {/* App UI Simulator */}
               <div className="w-full h-full p-8 flex flex-col gap-8 bg-zinc-50">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center shadow-lg shadow-brand-red/20">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-200 border-4 border-white shadow-sm" />
                  </div>
                  <div className="relative h-60 w-full rounded-[40px] overflow-hidden border-4 border-white group shadow-xl">
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="App Preview" />
                    <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-lg">
                       <p className="text-[8px] font-black uppercase text-brand-red tracking-widest">Global Drop</p>
                       <p className="text-xs font-black text-black leading-tight mt-1 truncate">30% OFF Tokyo Samurai</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-3/4 bg-zinc-200 rounded-full" />
                    <div className="h-2 w-1/2 bg-zinc-200 rounded-full opacity-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="h-36 bg-white rounded-[32px] border border-black/5 p-4 flex flex-col justify-end shadow-sm">
                       <div className="w-8 h-8 bg-brand-red/10 rounded-xl mb-3" />
                       <div className="h-2 w-full bg-zinc-100 rounded-full" />
                    </div>
                    <div className="h-36 bg-white rounded-[32px] border border-black/5 p-4 flex flex-col justify-end shadow-sm">
                       <div className="w-8 h-8 bg-brand-yellow/10 rounded-xl mb-3" />
                       <div className="h-2 w-full bg-zinc-100 rounded-full" />
                    </div>
                  </div>
                  {/* Fake Tab Bar */}
                  <div className="flex justify-around items-center pt-6 border-t border-black/5 mt-4">
                     <div className="w-2 h-2 bg-brand-red rounded-full shadow-[0_0_15px_rgba(230,30,42,0.5)]" />
                     <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                     <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                     <div className="w-2 h-2 bg-zinc-200 rounded-full" />
                  </div>
               </div>
            </div>
            {/* Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 to-transparent blur-[120px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
