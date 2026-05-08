import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { CheckoutModal } from './CheckoutModal';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';
import confetti from 'canvas-confetti';

function StripeLogo() {
  return (
    <svg viewBox="0 0 60 25" width="40" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M59.64 14.28c0-4.59-2.28-6.87-6.12-6.87-4.11 0-6.81 3.09-6.81 7.29 0 4.74 2.82 7.35 7.17 7.35 2.19 0 3.93-.57 5.1-1.29l-.93-2.1c-1.02.54-2.34.93-3.9.93-2.19 0-3.87-1.05-3.99-3.21h9.33c.03-.39.15-1.11.15-2.1zm-9.39-1.5c.12-1.92 1.44-3.03 3.12-3.03 1.62 0 2.82 1.08 2.82 3.03h-5.94zm-14.22-.39c0-1.35-.93-1.92-2.16-1.92-1.68 0-3.33.72-4.47 1.47l-.93-2.13c1.38-1.02 3.51-1.89 6.06-1.89 3.06 0 5.07 1.56 5.07 4.65v8.13h-3.09v-1.29c-.93.87-2.31 1.59-4.23 1.59-2.91 0-4.83-1.65-4.83-4.14 0-2.88 2.43-4.08 6.78-4.08h1.8v-.39zm-1.8 2.25c-2.43 0-3.75.69-3.75 1.89 0 1.02.84 1.62 2.07 1.62 1.35 0 2.58-.69 2.58-1.74v-1.77h-.9zm-16.71-4.2c-1.35-.6-1.98-.9-1.98-1.62 0-1.02 1.02-1.35 2.37-1.35 1.23 0 2.46.33 3.39.81l.93-2.22c-1.08-.6-2.67-1.02-4.74-1.02-3.15 0-5.28 1.65-5.28 4.29 0 4.14 5.67 2.4 5.67 5.16 0 1.11-1.14 1.5-2.67 1.5-1.53 0-3.18-.54-4.29-1.26l-.96 2.28c1.32.84 3.48 1.41 5.7 1.41 3.54 0 5.49-1.65 5.49-4.5.03-4.56-5.63-2.73-5.63-5.58zM17.43 8.35L17.43 5.47 13.92 5.47 13.92 2.41 10.83 3.22 10.83 5.47 8.34 5.47 8.34 8.35 10.83 8.35 10.83 18.25c0 2.79 1.47 4.23 4.26 4.23.99 0 1.83-.15 2.37-.36l-.3-2.67c-.24.09-.6.15-1.08.15-.96 0-1.17-.48-1.17-1.44V8.35H17.43zM3.48 14.5c0 2.2 1.69 3.02 3.65 3.02 1.08 0 1.9-.22 2.5-.5V14.5c-.65.26-1.4.45-2.25.45-1 0-1.6-.45-1.6-1.25V5.47H2.69v9.03z"/></svg>
  );
}

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, total, itemCount, clearCart, setIsTrackingActive } = useCart();
  const { user } = useAuth();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
                      <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-20">
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
              <div className="p-8 border-t border-black/5 bg-zinc-50/50 space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] text-black/40 font-black uppercase tracking-widest leading-none">Subtotal</span>
                      <span className="text-xl font-black text-black leading-none">{total.toLocaleString()} FRW</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] text-black/20 font-black uppercase tracking-widest leading-none">Delivery Fee</span>
                      <span className="text-[10px] font-black text-black/20 leading-none">1,500 FRW</span>
                   </div>
                </div>
                
                <Button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full h-16 rounded-2xl bg-[#635BFF] text-white hover:bg-[#5851E0] shadow-xl shadow-indigo-500/20 uppercase font-black text-xs tracking-widest flex items-center justify-center gap-4 transition-all group"
                >
                  <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[8px] opacity-70 font-black tracking-widest">Pay With</span>
                    <StripeLogo />
                  </div>
                  <div className="h-8 w-px bg-white/20 mx-1" />
                  <span className="text-sm font-black tracking-tighter">{(total + 1500).toLocaleString()} FRW</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center justify-center gap-4 py-2 opacity-50">
                   <ShieldCheck className="w-3 h-3 text-black/40" />
                   <p className="text-[7px] text-black/40 font-black uppercase tracking-[3px]">Secure Checkout Process</p>
                </div>
              </div>
            )}

            <CheckoutModal 
              isOpen={isCheckoutOpen} 
              onClose={() => setIsCheckoutOpen(false)} 
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
