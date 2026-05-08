import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { REVIEWS } from '../../constants';

export function Reviews() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Quote className="text-brand-red w-12 h-12 mb-6 opacity-10" />
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-black">Global <span className="text-gradient">Feedback</span></h2>
          <p className="text-black/40 max-w-lg text-[10px] uppercase font-black tracking-widest leading-relaxed">Hear what our global community of burger enthusiasts has to say about the most authentic grills on the planet.</p>
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
                  <div className="bg-white rounded-[48px] p-8 md:p-16 border border-black/5 scale-100 md:scale-[0.98] transition-all duration-500 shadow-xl shadow-black/5">
                     <div className="flex items-center gap-1 text-brand-red mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'opacity-10'}`} />
                        ))}
                     </div>
                     <p className="text-xl md:text-2xl font-black italic leading-tight mb-12 text-black/80">
                       "{review.comment}"
                     </p>
                     <div className="flex items-center gap-6">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="w-16 h-16 rounded-full border-4 border-white shadow-xl" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="text-lg font-black uppercase tracking-tight text-black">{review.name}</span>
                          <span className="text-[10px] text-brand-red font-black uppercase tracking-widest opacity-60">Verified Diner • {review.date}</span>
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
              className="p-5 rounded-full border border-black/5 bg-zinc-50 hover:bg-white hover:border-brand-red/30 transition-all text-black shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="p-5 rounded-full border border-black/5 bg-zinc-50 hover:bg-white hover:border-brand-red/30 transition-all text-black shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
