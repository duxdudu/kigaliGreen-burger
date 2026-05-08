import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export function Locations() {
  return (
    <section id="locations" className="py-24 px-6 bg-dark-card border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8">Find Your <span className="text-brand-lime">Kigali Spot</span></h2>
            <p className="text-white/40 text-lg mb-10 leading-relaxed italic">
              "From the heights of Rebero to the heart of Nyarutarama, the best grill in Rwanda is always a quick hill away."
            </p>

            <div className="relative mb-12">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
               <input 
                type="text" 
                placeholder="Nyarutarama, Kiyovu, Kimironko..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-green/50 transition-colors font-bold"
               />
            </div>

            <div className="space-y-6">
               {[
                 { name: "Nyarutarama Flagship", address: "MTN Center Rd, Kigali", phone: "+250 788 123 456", hours: "Open 24/7" },
                 { name: "Kimironko Express", address: "KG 11 Ave, near Market", phone: "+250 788 654 321", hours: "08:00 - 02:00" }
               ].map((loc, i) => (
                 <motion.div 
                    key={loc.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-6 bg-white/5 rounded-[32px] border border-white/5 hover:border-brand-green/30 transition-all cursor-pointer group"
                 >
                   <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-black uppercase group-hover:text-brand-green transition-colors">{loc.name}</h4>
                      <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-500 font-black rounded-full uppercase tracking-widest">{loc.hours}</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-3 text-white/50 text-sm">
                        <MapPin className="w-4 h-4" /> {loc.address}
                      </div>
                      <div className="flex items-center gap-3 text-white/50 text-sm">
                        <Phone className="w-4 h-4" /> {loc.phone}
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
            
            <Button size="lg" className="w-full mt-10">View All 150 Locations</Button>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square lg:aspect-auto lg:h-[600px] bg-zinc-900 rounded-[48px] overflow-hidden border border-white/10"
          >
             {/* Simulating a dark map */}
             <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-brand-red rounded-full animate-ping" />
                <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-brand-red rounded-full" />
                <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-brand-red rounded-full" />
                {/* SVG Map Lines */}
                <svg className="w-full h-full stroke-white/5" viewBox="0 0 400 400">
                   <path d="M0,50 L400,150 M100,0 L150,400 M0,300 L400,250" strokeWidth="1" fill="none" />
                   <path d="M200,0 L200,400 M0,200 L400,200" strokeWidth="2" fill="none" />
                </svg>
             </div>
             <div className="absolute inset-x-8 bottom-8 glass-morphism p-6 rounded-[32px] flex items-center justify-between">
                <div>
                   <h5 className="font-black uppercase text-sm mb-1">Your Closest Grill</h5>
                   <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Calculated from IP: 2.4 miles</p>
                </div>
                <Button size="sm">Get Directions</Button>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
