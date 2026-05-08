import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../constants';

export interface BurgerCustomization {
  toppings: string[];
  sauces: string[];
  bun: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  customization?: BurgerCustomization;
  cartItemId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: BurgerCustomization) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isTrackingActive: boolean;
  setIsTrackingActive: (active: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isTrackingActive, setIsTrackingActive] = useState(false);

  const addToCart = (item: MenuItem, customization?: BurgerCustomization) => {
    setCart(prev => {
      const customizationKey = customization ? JSON.stringify(customization) : '';
      const cartItemId = `${item.id}-${customizationKey}`;
      
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, customization, cartItemId }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.cartItemId === cartItemId) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      total, 
      itemCount,
      isTrackingActive,
      setIsTrackingActive
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
