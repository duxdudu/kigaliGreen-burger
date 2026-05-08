import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, total, itemCount, clearCart } = useCart();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleClose = () => {
    if (isConfirmed) {
      clearCart();
    }
    setIsConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-card border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green/20 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-brand-green w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase">
                    {isConfirmed ? 'Booking Confirmed' : 'Your Feast'}
                  </h2>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    {isConfirmed ? 'Order #KG-1234' : `${itemCount} Items Ready`}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/60" />
              </button>
            </div>

            {/* Items List / Success Message */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar relative">
              <AnimatePresence mode="wait">
                {isConfirmed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-4"
                  >
                    <div className="w-24 h-24 bg-brand-green rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-green/40">
                      <CheckCircle2 className="w-12 h-12 text-dark-surface" />
                    </div>
                    <h3 className="text-3xl font-black uppercase mb-4">You're All Set!</h3>
                    <p className="text-white/60 text-lg mb-12 italic">
                      Our kitchen is firing up your order. Get ready for the best grill in Kigali!
                    </p>

                    <div className="w-full bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-brand-lime">
                          <Clock className="w-6 h-6" />
                          <span className="font-black uppercase text-sm">Est. Delivery</span>
                        </div>
                        <span className="text-2xl font-black text-white">30-45 mins</span>
                      </div>
                      <div className="h-px bg-white/10 w-full" />
                      <div className="text-left space-y-2">
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Delivery Address</p>
                        <p className="font-bold">Nyarutarama Highlands, Kigali</p>
                      </div>
                    </div>

                    <Button onClick={handleClose} variant="outline" className="mt-12 w-full">
                      Back to Menu
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                        <ShoppingBag className="w-16 h-16 mb-4" />
                        <p className="text-lg font-bold">Your cart is empty.</p>
                        <p className="text-sm italic">The hills are calling for a burger!</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <motion.div 
                          layout
                          key={item.id} 
                          className="flex gap-4 group"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold uppercase text-sm group-hover:text-brand-green transition-colors">{item.name}</h4>
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{item.category}</p>
                              </div>
                              <span className="font-black text-brand-lime">{(item.price * item.quantity).toLocaleString()} Frw</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                                  <button 
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                                  >
                                    <Minus className="w-3 h-3 text-white/40" />
                                  </button>
                                  <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                                  >
                                    <Plus className="w-3 h-3 text-white" />
                                  </button>
                               </div>
                               <button 
                                onClick={() => removeFromCart(item.id)}
                                className="p-1.5 text-white/20 hover:text-red-500 transition-colors"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && !isConfirmed && (
              <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-black text-brand-green">{total.toLocaleString()} Frw</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/20 font-bold uppercase tracking-widest">
                  <span>Delivery Fee</span>
                  <span>Calculated at checkout</span>
                </div>
                <Button size="lg" onClick={handleConfirm} className="w-full gap-2 mt-4 group">
                  Confirm Booking 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[8px] text-white/20 font-bold uppercase tracking-[2px]">Secured by Kigali Pay</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
