import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Plus, Minus, Flame } from 'lucide-react';
import { MenuItem } from '../../constants';
import { Button } from './Button';
import { BurgerCustomization } from '../../context/CartContext';
import { cn } from '../../lib/utils';

const TOPPINGS = [
  'Extra Cheese', 'Bacon', 'Caramelized Onions', 'Jalapeños', 
  'Fried Egg', 'Pickles', 'Avocado', 'Mushrooms'
];

const SAUCES = [
  'Signature Lava', 'Smoky BBQ', 'Wasabi Mayo', 'Garlic Aioli', 
  'Honey Mustard', 'Truffle Oil', 'Chimichurri'
];

const BUNS = [
  'Brioche', 'Sesame', 'Gluten-Free', 'Lettuce Wrap'
];

interface BurgerCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  onConfirm: (customization: BurgerCustomization) => void;
}

const INGREDIENT_ASSETS: Record<string, string> = {
  'Extra Cheese': 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=100',
  'Bacon': 'https://images.unsplash.com/photo-1606851682841-a880ff0ad2d3?q=80&w=100',
  'Caramelized Onions': 'https://images.unsplash.com/photo-1518977676601-b53f02ac10d7?q=80&w=100',
  'Jalapeños': 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=100',
  'Fried Egg': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=100',
  'Pickles': 'https://images.unsplash.com/photo-1589135398305-590fb6ce551e?q=80&w=100',
  'Avocado': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=100',
  'Mushrooms': 'https://images.unsplash.com/photo-1563201502-364273b75416?q=80&w=100',
  'Brioche': 'https://images.unsplash.com/photo-1621255015250-760883626359?q=80&w=100',
  'Sesame': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=100',
  'Gluten-Free': 'https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=100',
  'Lettuce Wrap': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=100'
};

export function BurgerCustomizationModal({ isOpen, onClose, item, onConfirm }: BurgerCustomizationModalProps) {
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedBun, setSelectedBun] = useState<string>(BUNS[0]);

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  const toggleSauce = (sauce: string) => {
    setSelectedSauces(prev => 
      prev.includes(sauce) ? prev.filter(s => s !== sauce) : [...prev, sauce]
    );
  };

  const handleConfirm = () => {
    onConfirm({
      toppings: selectedToppings,
      sauces: selectedSauces,
      bun: selectedBun
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-[48px] overflow-hidden z-[111] shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="relative h-64 flex-shrink-0">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
               <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full border border-black/5 hover:bg-brand-red hover:text-white transition-all shadow-xl"
               >
                 <X className="w-6 h-6" />
               </button>
               <div className="absolute bottom-8 left-8">
                  <h2 className="text-5xl font-black uppercase tracking-tighter text-black">{item.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-[10px] text-black/40 font-black uppercase tracking-widest italic font-display">Crafted in {item.country}</p>
                    <div className="w-1 h-1 rounded-full bg-brand-red" />
                    <p className="text-[10px] text-brand-red font-black uppercase tracking-widest italic">{item.badge || 'Flame Grilled'}</p>
                  </div>
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
               {/* Left: Customization Options */}
               <div className="flex-1 overflow-y-auto p-8 space-y-12 hide-scrollbar border-r border-black/5">
                  {/* Bun Selection */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-black/5" />
                      1. Choose Your Foundation (Bun)
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {BUNS.map(bun => (
                        <button
                          key={bun}
                          onClick={() => setSelectedBun(bun)}
                          className={cn(
                            "group relative overflow-hidden rounded-[24px] border transition-all p-4 flex items-center gap-4",
                            selectedBun === bun 
                              ? "bg-brand-red text-white border-brand-red shadow-xl shadow-brand-red/20" 
                              : "bg-zinc-50 border-black/5 text-black/60 hover:border-brand-red/30"
                          )}
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                            <img src={INGREDIENT_ASSETS[bun]} alt={bun} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{bun}</span>
                          {selectedBun === bun && (
                            <div className="ml-auto w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-brand-red" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toppings Selection */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-black/5" />
                      2. Add Elite Toppings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {TOPPINGS.map(topping => (
                        <button
                          key={topping}
                          onClick={() => toggleTopping(topping)}
                          className={cn(
                            "group relative overflow-hidden rounded-[24px] border transition-all p-4 flex items-center gap-4",
                            selectedToppings.includes(topping) 
                              ? "bg-black text-white border-black shadow-xl" 
                              : "bg-zinc-50 border-black/5 text-black/60 hover:border-brand-red/30"
                          )}
                        >
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                            <img src={INGREDIENT_ASSETS[topping]} alt={topping} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{topping}</span>
                          <div className={cn(
                            "ml-auto w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                            selectedToppings.includes(topping) 
                              ? "bg-brand-red border-brand-red" 
                              : "bg-white/10 border-white/20"
                          )}>
                            {selectedToppings.includes(topping) && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sauces Selection */}
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-black/5" />
                      3. Sign off with Sauce
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {SAUCES.map(sauce => (
                        <button
                          key={sauce}
                          onClick={() => toggleSauce(sauce)}
                          className={cn(
                            "px-6 py-4 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedSauces.includes(sauce) 
                              ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20" 
                              : "bg-zinc-50 border-black/5 text-black/60 hover:border-brand-red/30"
                          )}
                        >
                          {sauce}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>

               {/* Right: Preview & Summary */}
               <div className="w-full lg:w-80 bg-zinc-50 p-8 flex flex-col border-l border-black/5">
                  <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-8">Your Burger Build</h3>
                    
                    {/* Visual Stack */}
                    <div className="mb-12 relative flex flex-col items-center">
                       <div className="w-full max-w-[120px] space-y-1 relative">
                          {/* Top Bun */}
                          <motion.div 
                            layout
                            className="h-7 w-full bg-[#E6A04D] rounded-t-[200px] border-b border-black/10 shadow-[0_2px_4px_rgba(0,0,0,0.1)] relative"
                          >
                             <div className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-1">
                                {[1, 2, 3].map(i => <div key={i} className="w-0.5 h-1 bg-white/40 rounded-full rotate-12" />)}
                             </div>
                          </motion.div>
                          
                          {/* Sauces */}
                          <AnimatePresence>
                            {selectedSauces.map((s, idx) => (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 4 }}
                                exit={{ opacity: 0, height: 0 }}
                                key={s} 
                                className="w-full bg-brand-red rounded-full opacity-90 shadow-sm" 
                                style={{ transform: `scaleX(${1 - idx * 0.03})` }}
                              />
                            ))}
                          </AnimatePresence>

                          {/* Toppings */}
                          <AnimatePresence>
                            {selectedToppings.map((t, idx) => (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                key={t} 
                                className={cn(
                                  "h-3 w-[105%] -ml-[2.5%] rounded-md border border-white/20 shadow-sm",
                                  t === 'Extra Cheese' ? 'bg-yellow-400' :
                                  t === 'Bacon' ? 'bg-[#7B352A]' :
                                  t === 'Jalapeños' ? 'bg-green-600' :
                                  t === 'Avocado' ? 'bg-[#98BF64]' : 'bg-zinc-800'
                                )} 
                                style={{ 
                                  transform: `rotate(${idx % 2 === 0 ? 0.5 : -0.5}deg)`,
                                  zIndex: 10 + idx 
                                }}
                              />
                            ))}
                          </AnimatePresence>

                          {/* Base Patty */}
                          <div className="h-10 w-[95%] mx-auto bg-[#4A2C10] rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] flex items-center justify-center border-y border-white/5 relative overflow-hidden">
                             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
                             <span className="text-[6px] font-black text-white/40 uppercase tracking-[2px] relative z-10">Flame Grilled Base</span>
                          </div>

                          {/* Bottom Bun */}
                          <motion.div 
                            layout
                            className="h-5 w-full bg-[#E6A04D] rounded-b-2xl border-t border-black/10 shadow-sm"
                          />
                       </div>
                       
                       <p className="mt-4 text-[7px] text-black/20 font-black uppercase tracking-[2px]">Vertical Anatomy Preview</p>
                    </div>

                    <div className="space-y-4">
                       <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                          <p className="text-[8px] text-black/20 font-black uppercase tracking-widest mb-1">Base Bun</p>
                          <p className="text-xs font-black text-black uppercase">{selectedBun}</p>
                       </div>

                       <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                          <p className="text-[8px] text-black/20 font-black uppercase tracking-widest mb-2">Selected Toppings</p>
                          <div className="flex flex-wrap gap-2">
                             {selectedToppings.length > 0 ? selectedToppings.map(t => (
                               <span key={t} className="text-[8px] font-black uppercase px-2 py-1 bg-black text-white rounded-md">{t}</span>
                             )) : <p className="text-[10px] italic text-black/20 uppercase font-black">No extra toppings</p>}
                          </div>
                       </div>

                       <div className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                          <p className="text-[8px] text-black/20 font-black uppercase tracking-widest mb-2">Signature Sauces</p>
                          <div className="flex flex-wrap gap-2">
                             {selectedSauces.length > 0 ? selectedSauces.map(s => (
                               <span key={s} className="text-[8px] font-black uppercase px-2 py-1 bg-brand-red text-white rounded-md">{s}</span>
                             )) : <p className="text-[10px] italic text-black/20 uppercase font-black">No extra sauces</p>}
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-black/5 space-y-4">
                    <div className="flex justify-between items-end">
                       <p className="text-[10px] text-black/20 font-black uppercase tracking-widest">Total Investment</p>
                       <p className="text-2xl font-black text-black">{(item.price).toLocaleString()} FRW</p>
                    </div>
                    <Button 
                      size="lg" 
                      onClick={handleConfirm}
                      className="w-full h-16 rounded-2xl bg-brand-red text-white hover:bg-brand-red/90 text-xs uppercase font-black tracking-widest shadow-xl shadow-brand-red/20 gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingCart({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </svg>
  );
}
