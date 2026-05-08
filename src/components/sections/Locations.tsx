import { motion } from 'motion/react';
import { MapPin, Phone, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { InteractiveMap } from '../ui/Map';

export function Locations() {
  return (
    <section id="locations" className="py-24 px-6 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 text-black">Find Your <span className="text-brand-red">Kigali Spot</span></h2>
            <p className="text-black/40 text-[11px] uppercase font-black tracking-widest mb-10 leading-relaxed italic">
              "From the heights of Rebero to the heart of Nyarutarama, the best grill in Rwanda is always a quick hill away."
            </p>

            <div className="relative mb-12">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
               <input 
                type="text" 
                placeholder="Search Kigali areas..." 
                className="w-full bg-zinc-50 border border-black/5 rounded-3xl py-5 pl-14 pr-6 focus:outline-none focus:border-brand-red/30 transition-all font-black uppercase text-[10px] tracking-widest shadow-inner shadow-black/5"
               />
            </div>

            <div className="space-y-4">
               {[
                 { name: "Nyarutarama Flagship", address: "MTN Center Rd, Kigali", phone: "0786885185", hours: "Open 24/7" },
                 { name: "Kimironko Express", address: "KG 11 Ave, Kigali", phone: "0786885185", hours: "08:00 - 04:00" },
                 { name: "Kiyovu Gourmet", address: "KN 31 St, Kigali", phone: "0786885185", hours: "10:00 - 02:00" }
               ].map((loc, i) => (
                 <motion.div 
                    key={loc.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-8 bg-zinc-50 rounded-[40px] border border-black/5 hover:border-brand-red/30 hover:bg-white transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-black/5"
                 >
                   <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-black uppercase group-hover:text-brand-red transition-colors text-black">{loc.name}</h4>
                      <span className="text-[10px] px-3 py-1 bg-brand-red/10 text-brand-red font-black rounded-full uppercase tracking-widest">{loc.hours}</span>
                   </div>
                   <div className="space-y-3">
                       <div className="flex items-center gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest italic">
                         <MapPin className="w-4 h-4 text-brand-red" /> {loc.address}
                       </div>
                       <div className="flex items-center gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest">
                         <Phone className="w-4 h-4 text-brand-yellow" /> {loc.phone}
                       </div>
                   </div>
                 </motion.div>
               ))}
            </div>
            
            <Button size="lg" className="w-full mt-10 h-16 rounded-2xl bg-brand-red text-white hover:bg-brand-red/90 text-xs uppercase font-black tracking-widest shadow-xl shadow-brand-red/20">Explore Kigali Network</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full shadow-2xl shadow-black/10 rounded-[64px] overflow-hidden border-[12px] border-zinc-100"
          >
            <InteractiveMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
