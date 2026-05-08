import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Home, Phone, ShoppingBag, ShieldCheck, Map as MapIcon, ChevronRight, CheckCircle2, Ticket } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { stripePromise } from '../../lib/stripe';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, total, clearCart, setIsTrackingActive } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    instructions: '',
    coupon: ''
  });

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleComplete = async (paymentMethod: string) => {
    setIsProcessing(true);
    
    try {
      // Create real order in Firestore for Admin Dashboard to see
      await addDoc(collection(db, 'orders'), {
        userId: user?.uid || 'anonymous',
        userEmail: user?.email || 'N/A',
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: item.customization || null
        })),
        total: total + 1500,
        status: 'PREPARING',
        paymentMethod,
        address: formData.address,
        phone: formData.phone,
        createdAt: serverTimestamp(),
      });

      setIsProcessing(false);
      setOrderComplete(true);
      
      setTimeout(() => {
        onClose();
        clearCart();
        setIsTrackingActive(true);
        setOrderComplete(false);
        setStep(1);
      }, 3000);
    } catch (error) {
      console.error("Error creating order:", error);
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center text-white shadow-xl shadow-brand-red/20">
                     <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-black">Checkout</h2>
                    <p className="text-[10px] text-black/40 font-black uppercase tracking-widest italic">Kigali Express Network</p>
                  </div>
               </div>
               <button onClick={onClose} className="p-3 border border-black/5 rounded-full hover:bg-brand-red hover:text-white transition-all">
                 <X className="w-6 h-6" />
               </button>
            </div>

            {orderComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                 <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl mb-8"
                 >
                   <CheckCircle2 className="w-16 h-16" />
                 </motion.div>
                 <h2 className="text-4xl font-black uppercase mb-4 text-black">Order Secured!</h2>
                 <p className="text-black/40 text-[10px] uppercase font-black tracking-widest max-w-sm italic mb-8">
                   Flame-grilled excellence is on the way. Redirecting to live tracking map across the hills...
                 </p>
                 <div className="flex gap-4">
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce" />
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce delay-100" />
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-bounce delay-200" />
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Main Flow */}
                <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 hide-scrollbar">
                   {step === 1 ? (
                     <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                        <section>
                           <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                             <Home className="w-3 h-3 text-brand-red" />
                             Delivery Destination
                           </h3>
                           <div className="space-y-4">
                              <div className="relative">
                                 <textarea 
                                  placeholder="Kigali Street Address, Apartment, Office Number..."
                                  value={formData.address}
                                  onChange={e => setFormData({...formData, address: e.target.value})}
                                  className="w-full bg-zinc-50 border border-black/5 rounded-2xl p-6 text-[11px] font-bold text-black focus:outline-none focus:border-brand-red/30 transition-all min-h-[100px] shadow-inner"
                                 />
                              </div>
                              <div className="relative">
                                 <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-black/20" />
                                 <input 
                                  type="tel"
                                  placeholder="Phone Number (e.g. 078...)"
                                  value={formData.phone}
                                  onChange={e => setFormData({...formData, phone: e.target.value})}
                                  className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-5 pl-14 pr-6 text-[11px] font-bold text-black focus:outline-none focus:border-brand-red/30 transition-all shadow-inner"
                                 />
                              </div>
                           </div>
                        </section>

                        <section>
                           <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                             <Ticket className="w-3 h-3 text-brand-red" />
                             Elite Coupons
                           </h3>
                           <div className="flex gap-4">
                              <input 
                                type="text"
                                placeholder="PROMO CODE"
                                value={formData.coupon}
                                onChange={e => setFormData({...formData, coupon: e.target.value})}
                                className="flex-1 bg-zinc-50 border border-black/5 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest text-black focus:outline-none focus:border-brand-red/30 transition-all shadow-inner"
                              />
                              <Button variant="secondary" className="px-8 h-14 rounded-2xl">Apply</Button>
                           </div>
                        </section>
                     </div>
                   ) : (
                     <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                        <section>
                           <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-6 flex items-center gap-3">
                             <CreditCard className="w-3 h-3 text-brand-red" />
                             Payment Method
                           </h3>
                           
                           <Elements stripe={stripePromise}>
                              <StripePaymentForm 
                                onCancel={handleBack} 
                                onComplete={() => handleComplete('stripe')}
                                isProcessing={isProcessing}
                                total={total}
                                 cart={cart}
                              />
                           </Elements>

                           <div className="mt-8 pt-8 border-t border-black/5 italic text-[8px] text-black/40 font-black uppercase tracking-[2px] flex items-center gap-2">
                             <ShieldCheck className="w-3 h-3 text-green-500" />
                             Military-grade encryption enabled for testing
                           </div>
                        </section>
                     </div>
                   )}
                </div>

                {/* Summary Sidebar */}
                <div className="w-full lg:w-96 bg-zinc-50 p-8 lg:p-12 border-l border-black/5 space-y-8">
                   <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 mb-8">Order Anatomy</h3>
                   
                   <div className="space-y-6 max-h-[300px] overflow-y-auto hide-scrollbar">
                      {cart.map(item => (
                        <div key={item.cartItemId} className="flex gap-4 group">
                           <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-black/5 flex-shrink-0">
                              <img src={item.image} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-[10px] font-black uppercase text-black/80">{item.name}</h4>
                              <p className="text-[9px] text-black/40 font-black">QTY: {item.quantity}</p>
                              <p className="text-[9px] text-brand-red font-black">{(item.price * item.quantity).toLocaleString()} FRW</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="pt-8 border-t border-black/10 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-black/40">
                         <span>Subtotal</span>
                         <span>{total.toLocaleString()} FRW</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-black/40">
                         <span>Delivery Fee</span>
                         <span>1,500 FRW</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-black/10">
                         <span className="text-xs font-black uppercase text-black">Total Investment</span>
                         <span className="text-2xl font-black text-brand-red">{(total + 1500).toLocaleString()} FRW</span>
                      </div>
                   </div>

                   {step === 1 && (
                     <Button 
                      onClick={handleNext}
                      disabled={!formData.address || !formData.phone}
                      className="w-full h-16 rounded-2xl bg-black text-white hover:bg-zinc-800 text-xs uppercase font-black tracking-widest shadow-xl gap-3"
                     >
                       Proceed to Payment <ChevronRight className="w-5 h-5" />
                     </Button>
                   )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function StripePaymentForm({ onCancel, onComplete, isProcessing, total, cart }: { 
  onCancel: () => void, 
  onComplete: () => void, 
  isProcessing: boolean,
  total: number,
  cart: any[]
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [localProcessing, setLocalProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLocalProcessing(true);
    setError(null);

    try {
      // 1. Create Payment Intent on the server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: total + 1500, // Matching the total in summary
          items: cart 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // 2. Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // @ts-ignore
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
        setLocalProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          onComplete();
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLocalProcessing(false);
    }
  };

  const combinedProcessing = isProcessing || localProcessing;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-white border border-black/5 rounded-[24px] shadow-xl">
        <label className="text-[8px] font-black uppercase tracking-widest text-black/40 mb-4 block">Test Card Information</label>
        <div className="py-4">
           <CardElement options={{
             style: {
               base: {
                 fontSize: '16px',
                 color: '#000',
                 '::placeholder': { color: '#ccc' },
                 fontFamily: 'Inter, sans-serif',
               }
             }
           }} />
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-500 text-[10px] font-bold uppercase rounded-lg border border-red-100">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div 
          onClick={() => !combinedProcessing && onComplete()}
          className="p-6 rounded-[24px] border border-black/5 bg-zinc-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-yellow transition-all"
         >
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
           <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Sandbox Mode</span>
         </div>
         <div 
          onClick={() => !combinedProcessing && onComplete()}
          className="p-6 rounded-[24px] border border-black/5 bg-zinc-50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-red transition-all"
         >
           <ShoppingBag className="w-6 h-6 text-brand-red" />
           <span className="text-[8px] font-black uppercase tracking-widest text-black/40">Cash on Delivery</span>
         </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={combinedProcessing}
          className="flex-1 h-16 rounded-2xl"
        >
          Back
        </Button>
        <Button 
          type="submit"
          disabled={combinedProcessing || !stripe}
          className="flex-1 h-16 rounded-2xl bg-brand-red text-white hover:bg-brand-red/90 shadow-xl shadow-brand-red/20 uppercase font-black tracking-widest gap-3"
        >
          {combinedProcessing ? 'Processing...' : `Pay ${(total + 1500).toLocaleString()} FRW`}
        </Button>
      </div>
    </form>
  );
}
