import { motion } from 'motion/react';
import { Instagram, Fullscreen } from 'lucide-react';

const IMAGES = [
  "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=800",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800",
  "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=800",
  "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800",
  "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800",
  "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800",
];

export function Gallery() {
  return (
    <section className="py-24 px-4">
       <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter">Food <span className="text-gradient">Gallery</span></h2>
            <p className="text-white/40 max-w-lg mb-8">Follow us for your daily dose of flame-grilled perfection.</p>
            <button className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors font-bold text-sm">
              <Instagram className="w-4 h-4 text-brand-orange" />
              @FlameGrillOfficial
            </button>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
             {IMAGES.map((src, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-3xl"
               >
                 <img 
                  src={src} 
                  alt="Food Gallery Item" 
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Fullscreen className="text-white w-8 h-8" />
                 </div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
