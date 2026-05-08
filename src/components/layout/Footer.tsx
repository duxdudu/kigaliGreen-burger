import { motion } from 'motion/react';
import { Flame, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark-surface pt-24 pb-12 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
           {/* Branding */}
           <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-brand-green/30">
                  <Flame className="text-dark-surface fill-current w-6 h-6" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase">
                  Kigali<span className="text-brand-green">Greens</span>
                </span>
              </div>
              <p className="text-white/40 max-w-xs text-sm leading-relaxed italic">
                 "Founded in the hills, obsessed with flavor. Sustaining Kigali's gourmet cravings with eco-fresh fire since 2012."
              </p>
              <div className="flex gap-4">
                 {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                   <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-green/10 hover:text-brand-green transition-all"
                   >
                     <Icon className="w-5 h-5" />
                   </a>
                 ))}
              </div>
           </div>

            {/* Links */}
            <div>
               <h5 className="font-black uppercase tracking-widest text-xs text-brand-lime mb-6">Menu</h5>
               <ul className="space-y-4 text-white/50 text-sm font-bold">
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Volcano Burgers</button></li>
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Gisenyi Chicken</button></li>
                  <li><button onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Digital Drops</button></li>
                  <li><button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Kigali Combos</button></li>
               </ul>
            </div>

            <div>
               <h5 className="font-black uppercase tracking-widest text-xs text-brand-green mb-6">Experience</h5>
               <ul className="space-y-4 text-white/50 text-sm font-bold">
                  <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">The Green Story</button></li>
                  <li><button onClick={() => document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Live Map</button></li>
                  <li><button onClick={() => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Book A Table</button></li>
                  <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Sustainability</button></li>
               </ul>
            </div>

           <div>
              <h5 className="font-black uppercase tracking-widest text-xs text-brand-yellow mb-6">Support</h5>
              <ul className="space-y-4 text-white/50 text-sm font-bold">
                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Delivery Trace</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                 <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
           </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-[10px] text-white/20 font-bold uppercase tracking-[4px]">
             © 2026 FLAMEGRILL GLOBAL RESTAURANTS INC. ALL RIGHTS RESERVED.
           </p>
           <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2"
           >
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-green group-hover:text-dark-surface transition-all">
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
             </div>
             <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Back to Top</span>
           </button>
        </div>
      </div>
    </footer>
  );
}
