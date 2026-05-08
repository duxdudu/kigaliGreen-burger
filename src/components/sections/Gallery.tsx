import { motion } from 'motion/react';
import { Instagram, Fullscreen, Image as ImageIcon } from 'lucide-react';

const IMAGES = [
  { url: "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?q=80&w=800", size: "lg" },
  { url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=800", size: "sm" },
  { url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800", size: "sm" },
  { url: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=800", size: "sm" },
  { url: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=800", size: "lg" },
  { url: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800", size: "sm" },
];

export function Gallery() {
  return (
    <section className="py-24 px-4 bg-white">
       <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-2 text-brand-red mb-4">
              <ImageIcon className="w-5 h-5" />
              <span className="font-black uppercase tracking-widest text-[10px]">#GlobalGrill</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter text-black">Flame <span className="text-gradient">Gallery</span></h2>
            <p className="text-black/20 max-w-lg mb-8 uppercase font-black text-[10px] tracking-[0.2em]">Visual proof of our global obsession with flavor.</p>
            <button 
              onClick={() => window.open('https://instagram.com', '_blank')}
              className="group flex items-center gap-2 px-8 py-3 bg-zinc-50 border border-black/5 rounded-full hover:bg-brand-red hover:text-white transition-all font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-xl hover:shadow-brand-red/20"
            >
              <Instagram className="w-4 h-4 text-brand-red group-hover:text-white transition-colors" />
              Join the Feed
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[200px]">
             {IMAGES.map((img, i) => (
                <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 viewport={{ once: true }}
                 className={`relative group overflow-hidden rounded-[40px] border border-black/5 ${
                   img.size === 'lg' ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                 }`}
                >
                  <img 
                   src={img.url} 
                   alt="Food Gallery Item" 
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 shadow-inner" 
                   referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <Fullscreen className="text-brand-red w-6 h-6" />
                     </div>
                  </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}
