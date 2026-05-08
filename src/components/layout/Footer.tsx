import { motion } from 'motion/react';
import { Flame, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

export function Footer({ onAdminToggle }: { onAdminToggle?: () => void }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#fcfcfc] pt-24 pb-12 px-6 border-t border-black/5 relative">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
           {/* Branding */}
           <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3 group">
                <div 
                  onClick={onAdminToggle}
                  className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center rotate-3 shadow-xl shadow-brand-red/20 cursor-help"
                >
                  <Flame className="text-white fill-current w-6 h-6" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase text-black">
                  Kigali<span className="text-brand-red">Grill</span>
                </span>
              </div>
              <p className="text-black/40 max-w-xs text-[11px] leading-relaxed italic uppercase font-black tracking-widest">
                 "Founded in the hills, obsessed with flavor. Sustaining Kigali's gourmet cravings with elite grills since 2012."
              </p>
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-black text-black">0786885185</p>
                <p className="text-[10px] font-black text-black">dushime dieudonne8@gmail.com</p>
              </div>
              <div className="flex gap-4">
                 {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                   <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-xl bg-black/[0.02] border border-black/5 flex items-center justify-center text-black/40 hover:bg-brand-red/10 hover:text-brand-red transition-all shadow-sm"
                   >
                     <Icon className="w-5 h-5" />
                   </a>
                 ))}
              </div>
           </div>

            {/* Links */}
            <div>
               <h5 className="font-black uppercase tracking-widest text-[10px] text-brand-red mb-8">The Menu</h5>
               <ul className="space-y-4 text-black/50 text-[10px] font-black uppercase tracking-widest">
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Elite Burgers</button></li>
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Global Sides</button></li>
                  <li><button onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Digital Drops</button></li>
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Group Combos</button></li>
               </ul>
            </div>

            <div>
               <h5 className="font-black uppercase tracking-widest text-[10px] text-brand-red mb-8">Experience</h5>
               <ul className="space-y-4 text-black/50 text-[10px] font-black uppercase tracking-widest">
                  <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Our Origin</button></li>
                  <li><button onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Global Map</button></li>
                  <li><button onClick={() => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Book A Table</button></li>
                  <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-brand-red transition-colors">Kitchen Tour</button></li>
               </ul>
            </div>

           <div>
              <h5 className="font-black uppercase tracking-widest text-[10px] text-brand-red mb-8">Support</h5>
              <ul className="space-y-4 text-black/50 text-[10px] font-black uppercase tracking-widest">
                 <li><a href="#" className="hover:text-brand-red transition-colors">Help Center</a></li>
                 <li><a href="#" className="hover:text-brand-red transition-colors">Trace Order</a></li>
                 <li><a href="#" className="hover:text-brand-red transition-colors">Privacy Hub</a></li>
                 <li><a href="#" className="hover:text-brand-red transition-colors">Legal Terms</a></li>
              </ul>
           </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] text-black/20 font-black uppercase tracking-[4px]">
             © 2026 KIGALI GRILL RESTAURANTS INC. ALL RIGHTS RESERVED.
           </p>
           <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-3"
           >
             <div className="w-12 h-12 rounded-full border border-black/5 bg-zinc-50 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-all shadow-sm">
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
             </div>
             <span className="text-[8px] font-black uppercase tracking-widest text-black/20">Back to Top</span>
           </button>
        </div>
      </div>
    </footer>
  );
}
