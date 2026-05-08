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
    <section id="bookings" className="py-24 px-6 relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {isTrackingActive ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-center justify-center gap-16"
          >
            {/* Phone Frame Tracking UI */}
            <div className="relative w-full max-w-[320px] aspect-[9/19.5]">
               {/* Phone Case Image Overlay */}
               <div className="absolute inset-x-[-12%] inset-y-[-5%] pointer-events-none z-20">
                  <img 
                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800" 
                    alt="Phone Frame" 
                    className="w-full h-full object-contain opacity-40 group-hover:opacity-100 transition-opacity" 
                  />
                  {/* The dark notch/island */}
                  <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-1/4 h-6 bg-black rounded-full z-30" />
               </div>
               
               {/* Phone Content (The Screen) */}
               <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden border-8 border-black/90 shadow-2xl z-10">
                  <div className="h-full w-full relative">
                    <OrderTrackingMap />
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[48px] p-10 border border-black/5 flex flex-col justify-between shadow-2xl shadow-black/5 max-w-md w-full">
               <div>
                  <div className="flex items-center gap-3 text-brand-red mb-10">
                     <Truck className="w-8 h-8" />
                     <h2 className="text-3xl font-black uppercase text-black">In Transit</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="p-8 bg-zinc-50 rounded-[32px] border border-black/5 shadow-sm">
                       <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-4">Your Expert Courier</p>
                       <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="absolute inset-0 bg-brand-red/10 blur-xl rounded-full" />
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" 
                              alt="Rider" 
                              className="relative w-16 h-16 rounded-full object-cover border-4 border-white shadow-xl" 
                            />
                          </div>
                          <div>
                             <p className="font-black text-black">Marco S.</p>
                             <p className="text-[10px] text-brand-red font-black uppercase tracking-widest">4.9 ★ Gold Elite Rider</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-8 bg-zinc-50 rounded-[32px] border border-black/5 shadow-sm">
                       <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-2 text-brand-red">Real-time Note</p>
                       <p className="font-black text-[10px] text-black uppercase tracking-widest leading-relaxed italic">"Safely crossing the grid with your elite burger collection. Hot arrival guaranteed."</p>
                    </div>
                  </div>
               </div>
               <div className="space-y-4 pt-12">
                  <div className="flex justify-between items-center px-2">
                     <span className="text-[10px] text-black/40 uppercase font-black tracking-widest">Arrival Target</span>
                     <span className="text-xl font-black text-brand-red">20 MINS</span>
                  </div>
                  <Button className="w-full h-16 bg-brand-red text-white hover:bg-brand-red/90 font-black uppercase text-xs rounded-2xl shadow-xl shadow-brand-red/20">Call Rider</Button>
                  <Button variant="ghost" className="w-full text-[8px] uppercase font-black tracking-wider text-black/20 hover:text-brand-red transition-colors">Emergency: Cancel Delivery</Button>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: News/Recipes */}
            <div>
              <div className="flex items-center gap-2 text-brand-red mb-6">
                 <BookOpen className="w-5 h-5" />
                 <span className="font-black uppercase tracking-widest text-[10px]">The Grill Gazette</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-12 text-black">Latest From <br /><span className="text-gradient">The Burger Scene</span></h2>
              
              <div className="space-y-8">
                {NEWS.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group flex gap-6 p-6 bg-white border border-black/5 rounded-[40px] hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5 shadow-inner">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-brand-red font-black uppercase tracking-widest">{item.tag}</span>
                        <span className="text-[8px] text-black/20 font-bold uppercase tracking-widest">{item.date}</span>
                      </div>
                      <h4 className="text-lg font-black uppercase group-hover:text-brand-red transition-colors leading-tight mb-2 text-black">{item.title}</h4>
                      <p className="text-black/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-3">{item.desc}</p>
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
                    className="max-w-[420px] mx-auto bg-white border border-black/5 rounded-[48px] p-8 shadow-2xl shadow-black/5 relative overflow-hidden"
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
                          <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-brand-red/20 text-white">
                            <CheckCircle2 className="w-10 h-10" />
                          </div>
                          <h4 className="text-2xl font-black uppercase mb-2 text-black">Booking Secured!</h4>
                          <p className="text-black/40 text-[10px] uppercase font-black tracking-widest italic">We've saved a front-row seat for your global burger journey.</p>
                          <Button onClick={() => setIsBooked(false)} variant="outline" size="sm" className="mt-8 border-black/10 text-black/60">Close Confirmation</Button>
                        </motion.div>
                      ) : (
                        <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                          <div className="flex justify-between items-center mb-8">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center">
                                   <Calendar className="text-white w-6 h-6" />
                                </div>
                                <div>
                                   <h5 className="font-black uppercase text-sm leading-tight text-brand-red">Book a Table</h5>
                                   <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">Global Flagship</p>
                                </div>
                             </div>
                             <MapPin className="text-black/10 w-6 h-6" />
                          </div>

                          <div className="space-y-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Guests</label>
                                <div className="grid grid-cols-4 gap-2">
                                   {[1, 2, 4, 6].map(c => (
                                     <button 
                                      key={c} 
                                      onClick={() => setGuestCount(Number(c))}
                                      className={`h-10 rounded-xl text-xs font-black transition-all border ${guestCount === c ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20' : 'bg-black/[0.02] border-black/5 hover:border-brand-red/30'}`}
                                     >
                                        {c}
                                     </button>
                                   ))}
                                </div>
                             </div>

                             <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-black/40">Schedule</label>
                                 <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand-red/30 transition-colors text-black/60">
                                       <Calendar className="w-4 h-4 text-brand-red" />
                                       Today
                                    </button>
                                    <button className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-brand-red/30 transition-colors text-black/60">
                                       <Clock className="w-4 h-4 text-brand-yellow" />
                                       19:30
                                    </button>
                                 </div>
                             </div>

                             <div className="p-4 bg-black/[0.02] border border-black/5 rounded-[24px]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-red mb-1 italic">Atmosphere</p>
                                <p className="text-[10px] text-black/30 font-black uppercase tracking-widest leading-tight">Live grilling active. Premium sunset views available.</p>
                             </div>

                             <Button onClick={handleBooking} className="w-full gap-2 py-6 text-xs uppercase font-black tracking-widest bg-brand-red text-white hover:bg-brand-red/90">
                                Confirm Booking
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
