import { motion } from 'motion/react';
import { ArrowRight, Play, Star, MapPin, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-brand-lime text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Star className="w-3 h-3 fill-current" />
            Voted #1 Burger in Kigali
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] leading-[0.9] font-black uppercase mb-6">
            Hill-to <br />
            <span className="text-gradient">Bun Fresh</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl max-w-lg mb-8 font-medium">
            Experience the genuine taste of flame-grilled perfection. Local Akagera beef, farm-fresh Nyabugogo veggies, and 100% natural heat.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button 
              size="xl" 
              className="group"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order in Kigali
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="gap-2"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 fill-current" />
              View Menu
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8">
             {[
               { icon: MapPin, label: "Fast Cities", sub: "Kigali Wide" },
               { icon: Star, label: "Fresh Daily", sub: "Rwandan Local" },
               { icon: Zap, label: "Hot & Ready", sub: "24/7 Service" }
             ].map((item, idx) => (
               <motion.div 
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex flex-col gap-1"
               >
                 <item.icon className="text-brand-lime w-5 h-5 mb-1" />
                 <span className="text-sm font-bold">{item.label}</span>
                 <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{item.sub}</span>
               </motion.div>
             ))}
          </div>
        </motion.div>

        {/* Hero Image / Floating Burger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'backOut' }}
          className="relative lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-20"
          >
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000" 
              alt="Premium Beast Burger" 
              className="w-full max-w-[500px] drop-shadow-[0_20px_50px_rgba(225,29,72,0.4)]"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Food Tags */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 glass-morphism p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center text-black font-black">
                9.8
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase">Customer Score</span>
                <span className="text-[10px] text-white/60">From 50k+ reviews</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -left-20 glass-morphism p-4 rounded-2xl flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-black">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase">Fresh From Fire</span>
                <span className="text-[10px] text-white/60">Flame Grilled Daily</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 via-transparent to-brand-lime/20 rounded-full blur-[150px] scale-150 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
import { Flame } from 'lucide-react';
