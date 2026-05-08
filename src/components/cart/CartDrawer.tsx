import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';
import confetti from 'canvas-confetti';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, total, itemCount, clearCart, setIsTrackingActive } = useCart();
  const { user } = useAuth();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B00', '#FFC72C', '#FF9F1C', '#000000']
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      triggerConfetti();
    }
  }, [isConfirmed]);

  const handleConfirm = async () => {
    if (user) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'orders'), {
          userId: user.uid,
          items: cart.map(item => ({ 
            id: item.id, 
            name: item.name, 
            quantity: item.quantity, 
            price: item.price,
            customization: item.customization || null
          })),
          total: total,
          status: 'PREPARING',
          createdAt: serverTimestamp(),
          deliveryTime: '30-45 mins'
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/orders`);
      }
    }
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-black/5 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-red/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-brand-red w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase text-black">
                    {isConfirmed ? 'Order Confirmed' : 'Your Bag'}
                  </h2>
                  <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">
                    {isConfirmed ? 'Order #GG-8821' : `${itemCount} Global Flavors`}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black">
                <X className="w-6 h-6" />
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
                    <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-red/20">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black uppercase mb-4 text-black">Order Received!</h3>
                    <p className="text-black/60 text-sm mb-12 italic uppercase font-bold tracking-widest">
                      Our chefs are firing up the grill. Your global journey begins now!
                    </p>

                    <div className="w-full bg-black/[0.02] border border-black/5 rounded-[40px] p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-brand-red">
                          <Clock className="w-6 h-6" />
                          <span className="font-black uppercase text-[10px] tracking-widest">Est. Wait</span>
                        </div>
                        <span className="text-2xl font-black text-black">20-35 mins</span>
                      </div>
                      <div className="h-px bg-black/5 w-full" />
                      <div className="text-left space-y-2">
                        <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">Fast Delivery</p>
                        <p className="font-black text-xs text-black/80">Premium Hot & Ready Service</p>
                      </div>
                    </div>

                    <div className="w-full space-y-4 pt-12">
                      <Button 
                        onClick={() => {
                          setIsTrackingActive(true);
                          handleClose();
                        }} 
                        className="w-full gap-2 py-6 bg-brand-red text-white hover:bg-brand-red/90"
                      >
                        Track Progress
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                      <Button onClick={handleClose} variant="outline" className="w-full border-black/10 text-black/60">
                        Continue Exploring
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20 grayscale">
                        <ShoppingBag className="w-16 h-16 mb-4" />
                        <p className="text-lg font-black uppercase">Your bag is empty.</p>
                        <p className="text-[10px] italic font-bold tracking-widest uppercase">The grill is getting cold!</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <motion.div 
                          layout
                          key={item.cartItemId} 
                          className="flex gap-4 group"
                        >
                          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5 bg-zinc-100">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-black uppercase text-xs text-black/80 group-hover:text-brand-red transition-colors">{item.name}</h4>
                                <p className="text-[8px] text-black/40 font-black uppercase tracking-[2px]">{item.category}</p>
                                {item.customization && (
                                  <div className="mt-2 space-y-1">
                                    <p className="text-[7px] text-brand-red font-black uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded-full inline-block">Crafted Build</p>
                                    <div className="flex flex-wrap gap-1">
                                       <span className="text-[6px] px-1.5 py-0.5 bg-black/5 text-black/60 rounded-md font-black uppercase tracking-tight">{item.customization.bun}</span>
                                       {item.customization.toppings.map(t => (
                                         <span key={t} className="text-[6px] px-1.5 py-0.5 bg-brand-red/5 text-brand-red rounded-md font-black uppercase tracking-tight">{t}</span>
                                       ))}
                                    </div>
                                  </div>
                                )}
                                {!item.customization && item.ingredients && (
                                  <div className="mt-2">
                                    <p className="text-[6px] text-black/20 font-black uppercase tracking-widest mb-1">Standard Anatomy</p>
                                    <p className="text-[6px] text-black/40 font-black uppercase tracking-tight truncate max-w-[150px]">{item.ingredients.join(', ')}</p>
                                  </div>
                                )}
                              </div>
                              <span className="font-black text-brand-red text-sm">{(item.price * item.quantity).toLocaleString()} FRW</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3 bg-black/[0.04] rounded-xl p-1">
                                  <button 
                                    onClick={() => updateQuantity(item.cartItemId, -1)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
                                  >
                                    <Minus className="w-3 h-3 text-black/40" />
                                  </button>
                                  <span className="text-[10px] font-black min-w-[20px] text-center text-black">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.cartItemId, 1)}
                                    className="w-6 h-6 flex items-center justify-center hover:bg-black/10 rounded-full transition-colors"
                                  >
                                    <Plus className="w-3 h-3 text-black" />
                                  </button>
                               </div>
                               <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="p-1.5 text-black/20 hover:text-brand-red transition-colors"
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
              <div className="p-6 bg-white border-t border-black/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-black/40 font-black uppercase tracking-widest text-[10px]">Total Order</span>
                  <span className="text-2xl font-black text-brand-red">{total.toLocaleString()} FRW</span>
                </div>
                <Button size="lg" onClick={handleConfirm} className="w-full gap-2 mt-4 group bg-brand-red text-white hover:bg-brand-red/90 py-6 text-sm uppercase font-black tracking-widest">
                  Confirm Order
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[7px] text-black/20 font-black uppercase tracking-[3px]">Global Secure Payments</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
