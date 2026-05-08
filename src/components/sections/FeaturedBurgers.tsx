import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart, Hammer } from 'lucide-react';
import { useState } from 'react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '../../constants';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { BurgerCustomizationModal } from '../ui/BurgerCustomizationModal';

export function FeaturedBurgers() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Burgers');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite, user, signIn } = useAuth();

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-brand-red font-bold uppercase tracking-widest text-[10px]"
            >
              World-Class Grills
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black uppercase mt-2 leading-[0.9]"
            >
              Explore the <br />
              <span className="text-gradient">Burger Globe</span>
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4 scrollbar-hide overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
                  activeCategory === cat 
                    ? "bg-brand-red text-white shadow-lg shadow-brand-red/20" 
                    : "bg-black/5 text-black/40 hover:bg-black/10"
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
              className="group relative bg-white rounded-[40px] overflow-hidden border border-black/5 hover:border-brand-red/30 transition-all duration-500 shadow-sm hover:shadow-2xl"
            >
              {/* Badge & Country */}
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {item.badge && (
                  <div className="px-3 py-1 bg-brand-yellow text-black text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    {item.badge}
                  </div>
                )}
                <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-black text-[8px] font-black uppercase tracking-widest rounded-full shadow-sm border border-black/5">
                  {item.country}
                </div>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-zinc-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-80" />
                
                {/* Overlay Actions */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={() => user ? toggleFavorite(item.id) : signIn()}
                    className={cn(
                      "w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300",
                      isFavorite(item.id)
                        ? "bg-brand-red text-white border-brand-red scale-110 shadow-lg"
                        : "bg-white/80 border-black/5 hover:bg-brand-red hover:text-white"
                    )}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite(item.id) && "fill-current")} />
                  </button>
                  {item.category === 'Burgers' && (
                    <button 
                      onClick={() => setCustomizingItem(item)}
                      className="w-10 h-10 rounded-full backdrop-blur-md border border-black/5 bg-white/80 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-300"
                    >
                      <Hammer className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black uppercase mb-1 tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-brand-orange">
                         <Star className="w-3 h-3 fill-current" />
                         <span className="text-xs font-bold">{item.rating}</span>
                       </div>
                       <span className="text-[10px] text-black/40 font-bold uppercase tracking-widest leading-none">({item.reviews})</span>
                    </div>
                  </div>
                  <div className="text-xl font-black text-brand-red">{(item.price).toLocaleString()} <span className="text-[8px] text-black/40">FRW</span></div>
                </div>

                <p className="text-black/40 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-6 line-clamp-2 italic">
                  {item.description}
                </p>

                {/* Ingredient Anatomy */}
                {item.ingredients && (
                  <div className="mb-8">
                    <p className="text-[7px] text-black/20 font-black uppercase tracking-[3px] mb-3">Ingredient Anatomy</p>
                    <div className="flex flex-wrap gap-1.5">
                       {item.ingredients.map((ing) => (
                         <span 
                          key={ing} 
                          className="px-2 py-1 bg-zinc-50 border border-black/5 rounded-md text-[7px] font-black uppercase tracking-tight text-black/40 hover:border-brand-red/30 transition-colors cursor-default"
                         >
                           {ing}
                         </span>
                       ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={() => addToCart(item)}
                    className="flex-1 gap-2 group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300 py-6 text-xs uppercase font-black"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add
                  </Button>
                  {item.category === 'Burgers' && (
                    <Button 
                      variant="outline"
                      onClick={() => setCustomizingItem(item)}
                      className="px-6 py-6 border-black/10 hover:border-brand-red hover:bg-brand-red hover:text-white text-black/40 transition-all duration-300"
                    >
                      <Hammer className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {customizingItem && (
          <BurgerCustomizationModal
            isOpen={!!customizingItem}
            onClose={() => setCustomizingItem(null)}
            item={customizingItem}
            onConfirm={(customization) => addToCart(customizingItem, customization)}
          />
        )}
      </div>
    </section>
  );
}
