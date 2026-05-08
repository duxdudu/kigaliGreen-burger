import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { REVIEWS } from '../../constants';

export function Reviews() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="py-24 px-6 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Quote className="text-brand-orange w-12 h-12 mb-6 opacity-30" />
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Kigali <span className="text-gradient">Feedback</span></h2>
          <p className="text-white/40 max-w-lg">Hear what the Kigali community has to say about the freshest gourmet burgers in the Land of a Thousand Hills.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden px-4 py-12">
            <motion.div 
               animate={{ x: `-${active * 100}%` }}
               transition={{ type: 'spring', damping: 20, stiffness: 100 }}
               className="flex cursor-grab active:cursor-grabbing"
            >
              {REVIEWS.map((review) => (
                <div key={review.id} className="min-w-full px-4">
                  <div className="glass-morphism rounded-[40px] p-8 md:p-12 border-brand-green/10 scale-100 md:scale-95 hover:scale-100 transition-transform duration-500">
                     <div className="flex items-center gap-1 text-brand-lime mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'opacity-20'}`} />
                        ))}
                     </div>
                     <p className="text-xl md:text-3xl font-bold italic leading-relaxed mb-10 text-white/90">
                       "{review.comment}"
                     </p>
                     <div className="flex items-center gap-4">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-14 h-14 rounded-full border-2 border-brand-green p-1" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-black uppercase tracking-tight">{review.name}</span>
                          <span className="text-xs text-white/40 font-bold uppercase tracking-widest">{review.date}</span>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white/60 hover:text-white"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={next}
              className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white/60 hover:text-white"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
