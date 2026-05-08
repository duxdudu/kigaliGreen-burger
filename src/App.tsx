/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { FeaturedBurgers } from './components/sections/FeaturedBurgers';
import { NewsAndBooking } from './components/sections/NewsAndBooking';
import { Deals } from './components/sections/Deals';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { AppDownload } from './components/sections/AppDownload';
import { Reviews } from './components/sections/Reviews';
import { Gallery } from './components/sections/Gallery';
import { Locations } from './components/sections/Locations';
import { FAQ } from './components/sections/FAQ';
import { Newsletter } from './components/sections/Newsletter';
import { Footer } from './components/layout/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { Toaster } from 'react-hot-toast';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OrderTrackingMap } from './components/ui/OrderTrackingMap';
import { Button } from './components/ui/Button';
import { X } from 'lucide-react';

function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { itemCount, isTrackingActive, setIsTrackingActive } = useCart();

  if (isAdmin) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="fixed top-4 right-4 z-[200]">
           <Button onClick={() => setIsAdmin(false)} variant="secondary" className="rounded-full px-8 shadow-2xl">
              Exit Command Center
           </Button>
        </div>
        <AdminDashboard />
      </>
    );
  }

  return (
    <div className="relative selection:bg-brand-red selection:text-white">
      <Toaster position="bottom-right" />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-green z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar onCartClick={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        
        {/* Live Tracking Active Mode */}
        {isTrackingActive && (
          <section className="py-24 bg-zinc-50 border-y border-black/5 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16 relative">
              <button 
                onClick={() => setIsTrackingActive(false)}
                className="absolute right-6 top-0 p-3 bg-white border border-black/5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-black mb-4">
                In-Route: <span className="text-brand-red">Express Delivery</span>
              </h2>
              <p className="text-[10px] text-black/40 font-black uppercase tracking-[6px] italic">Live Logistics Stream from Command Center</p>
            </div>
            <div className="max-w-7xl mx-auto px-6 h-[600px]">
              <OrderTrackingMap />
            </div>
          </section>
        )}

        <FeaturedBurgers />
        <NewsAndBooking />
        <Deals />
        <WhyChooseUs />
        <AppDownload />
        <Reviews />
        <Gallery />
        <Locations />
        <FAQ />
        <Newsletter />
      </main>

      <Footer onAdminToggle={() => setIsAdmin(true)} />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Order Button (Mobile) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[40]"
      >
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-brand-green text-dark-surface rounded-full font-black uppercase tracking-tighter shadow-2xl shadow-brand-green/40 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-6 h-6" />
          Kigali Order {itemCount > 0 && `(${itemCount})`}
        </button>
      </motion.div>

      {/* Custom Glow Follower (Optional Decor) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

