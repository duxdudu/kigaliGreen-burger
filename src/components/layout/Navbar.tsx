import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, User, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ProfileModal } from '../ui/ProfileModal';

export function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, signIn, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: 'Locations', href: '#locations' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass-morphism py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-brand-green/30">
            <Flame className="text-dark-surface fill-current w-6 h-6" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">
            Kigali<span className="text-brand-green">Greens</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onCartClick} className="gap-2 relative">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-brand-green text-dark-surface text-[10px] absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          
          {user ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 pl-4 rounded-full">
              <span className="text-xs font-black uppercase tracking-widest">{user.displayName?.split(' ')[0]}</span>
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="w-8 h-8 rounded-full overflow-hidden border border-brand-green/30 hover:border-brand-green transition-colors"
              >
                <img src={user.photoURL || ''} alt="User" className="w-full h-full object-cover" />
              </button>
            </div>
          ) : (
            <Button onClick={signIn} variant="primary" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="lg:hidden flex items-center gap-4">
           <Button variant="ghost" size="sm" onClick={onCartClick} className="p-2 relative">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {itemCount > 0 && (
                <span className="bg-brand-green text-dark-surface text-[10px] absolute -top-0 -right-0 w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </AnimatePresence>
          </Button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-dark-card border-b border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold hover:text-brand-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5" />
              <Button variant="primary" className="w-full">Order Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </nav>
  );
}
