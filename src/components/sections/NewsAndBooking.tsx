import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ArrowRight, BookOpen, CheckCircle2, MapPin, Truck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { OrderTrackingMap } from '../ui/OrderTrackingMap';

const NEWS = [
  {
    title: "The Gisenyi Herb Story",
    date: "May 12, 2026",
    tag: "Origins",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800",
    desc: "Aromatic marinated chicken with local hilltop spices."
  },
  {
    title: "100% Farm-to-Bun",
    date: "May 08, 2026",
    tag: "Quality",
    image: "https://images.unsplash.com/photo-1550317144-b38c270323ee?q=80&w=800",
    desc: "Sustainability meets the grill in our newest Kigali collective."
  }
];

export function NewsAndBooking() {
  const { isTrackingActive } = useCart();
  const [isBooked, setIsBooked] = useState(false);
  const [guestCount, setGuestCount] = useState(2);

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 5000);
  };

  return (
    <section id="bookings" className="py-24 px-6 relative bg-dark-card overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {isTrackingActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 h-[500px] lg:h-[600px]">
              <OrderTrackingMap />
            </div>
            <div className="glass-morphism rounded-[48px] p-8 border-brand-green/20 flex flex-col justify-between">
               <div>
                  <div className="flex items-center gap-3 text-brand-lime mb-8">
                     <Truck className="w-8 h-8" />
                     <h2 className="text-3xl font-black uppercase">On the Way</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                       <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Delivery Partner</p>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-zinc-800" />
                          <div>
                             <p className="font-bold">Jean Pierre K.</p>
                             <p className="text-[10px] text-brand-green font-black uppercase tracking-widest">4.9 ★ Superior Ranger</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                       <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Your Order</p>
                       <p className="font-bold italic">"Preparing the hills of flavor..."</p>
                    </div>
                  </div>
               </div>
               <div className="space-y-4 pt-8">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-white/40 uppercase font-black tracking-widest">Estimated Arrival</span>
                     <span className="text-white font-black">12:45 PM</span>
                  </div>
                  <Button className="w-full">Call Rider</Button>
                  <Button variant="ghost" className="w-full text-[10px] uppercase font-black tracking-widest opacity-40">Cancel Delivery</Button>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: News/Recipes */}
            <div>
              <div className="flex items-center gap-2 text-brand-lime mb-6">
                 <BookOpen className="w-5 h-5" />
                 <span className="font-black uppercase tracking-widest text-xs">The Green Journal</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-12">Latest From <br /><span className="text-gradient">The Garden</span></h2>
              
              <div className="space-y-8">
                {NEWS.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex gap-6 p-4 glass-morphism rounded-[32px] hover:border-brand-green/30 transition-all cursor-pointer"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 shadow-2xl shadow-black/40">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-brand-lime font-black uppercase tracking-widest">{item.tag}</span>
                        <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest">{item.date}</span>
                      </div>
                      <h4 className="text-lg font-black uppercase group-hover:text-brand-lime transition-colors leading-tight mb-2">{item.title}</h4>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-3">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Booking UI */}
            <div className="relative">
               <div className="lg:sticky lg:top-32">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-[420px] mx-auto bg-dark-surface border border-white/10 rounded-[48px] p-8 shadow-2xl shadow-brand-green/5 relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {isBooked ? (
                        <motion.div 
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="py-12 flex flex-col items-center text-center"
                        >
                          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-brand-green/40">
                            <CheckCircle2 className="w-10 h-10 text-dark-surface" />
                          </div>
                          <h4 className="text-2xl font-black uppercase mb-2">Spot Secured!</h4>
                          <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest italic">Prepare for the ultimate grill at Nyarutarama.</p>
                          <Button onClick={() => setIsBooked(false)} variant="outline" size="sm" className="mt-8">Close Confirmation</Button>
                        </motion.div>
                      ) : (
                        <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                          <div className="flex justify-between items-center mb-8">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center">
                                   <Calendar className="text-dark-surface w-6 h-6" />
                                </div>
                                <div>
                                   <h5 className="font-black uppercase text-sm leading-tight text-brand-lime">Reserve Order</h5>
                                   <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Kigali Flagship</p>
                                </div>
                             </div>
                             <MapPin className="text-white/10 w-6 h-6" />
                          </div>

                          <div className="space-y-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Guests</label>
                                <div className="grid grid-cols-4 gap-2">
                                   {[1, 2, 4, 6].map(c => (
                                     <button 
                                      key={c} 
                                      onClick={() => setGuestCount(Number(c))}
                                      className={`h-10 rounded-xl text-xs font-bold transition-all border ${guestCount === c ? 'bg-brand-green text-dark-surface border-brand-green' : 'bg-white/5 border-white/5 hover:border-brand-green/30'}`}
                                     >
                                        {c}
                                     </button>
                                   ))}
                                </div>
                             </div>

                             <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Schedule</label>
                                 <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold hover:border-brand-green/30 transition-colors">
                                       <Calendar className="w-4 h-4 text-brand-green" />
                                       Today
                                    </button>
                                    <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold hover:border-brand-green/30 transition-colors">
                                       <Clock className="w-4 h-4 text-brand-lime" />
                                       19:30
                                    </button>
                                 </div>
                             </div>

                             <div className="p-4 bg-white/5 border border-white/5 rounded-3xl">
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-lime mb-1 italic">Vibe Check</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-tight">Flame grilled perfection awaits. Free appetizers for early birds.</p>
                             </div>

                             <Button onClick={handleBooking} className="w-full gap-2 py-6 text-xs uppercase font-black tracking-widest">
                                Secure My Table
                                <ArrowRight className="w-4 h-4" />
                             </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
               </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
