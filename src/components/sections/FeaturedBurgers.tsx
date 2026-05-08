import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../../constants';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function FeaturedBurgers() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Burgers');
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite, user, signIn } = useAuth();

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-lime font-bold uppercase tracking-widest text-sm"
            >
              Masterpieces of Kigali
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black uppercase mt-2"
            >
              Choose Your <br />
              <span className="text-gradient">Green Grill</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4 scrollbar-hide overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-brand-green text-dark-surface shadow-lg shadow-brand-green/20" 
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-dark-card rounded-[32px] overflow-hidden border border-white/5 hover:border-brand-green/30 transition-all duration-500"
            >
              {/* Badge */}
              {item.badge && (
                <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-brand-lime text-dark-surface text-[10px] font-black uppercase tracking-widest rounded-full">
                  {item.badge}
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />
                
                {/* Overlay Actions */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => user ? toggleFavorite(item.id) : signIn()}
                    className={cn(
                      "w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300",
                      isFavorite(item.id)
                        ? "bg-brand-green text-dark-surface border-brand-green scale-110 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                        : "bg-white/10 border-white/10 hover:bg-brand-green hover:text-dark-surface"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite(item.id) && "fill-current")} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-green hover:text-dark-surface transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black uppercase mb-1 tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-brand-lime">
                         <Star className="w-3 h-3 fill-current" />
                         <span className="text-xs font-bold">{item.rating}</span>
                       </div>
                       <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">({item.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-brand-green">{(item.price).toLocaleString()} <span className="text-[10px] text-white/40">FRW</span></div>
                </div>

                <p className="text-white/30 text-xs mb-8 line-clamp-2 uppercase font-bold tracking-widest italic">
                  {item.description}
                </p>

                <Button 
                  onClick={() => addToCart(item)}
                  className="w-full gap-2 group-hover:bg-brand-lime group-hover:text-dark-surface transition-all duration-300 py-6"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Customize & Add
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('bookings')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Reserve Your Table
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
