import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand-red text-white hover:bg-brand-red/90 shadow-lg shadow-brand-red/20 font-black',
    secondary: 'bg-brand-yellow text-black hover:bg-brand-yellow/90 shadow-lg shadow-brand-yellow/20 font-black',
    outline: 'border-2 border-brand-red/20 bg-transparent hover:bg-brand-red/5 text-brand-red',
    ghost: 'bg-transparent hover:bg-black/5 text-black/60',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg font-bold',
    xl: 'px-10 py-5 text-xl font-black uppercase tracking-tight',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:ring-offset-2 focus:ring-offset-dark-surface disabled:opacity-50 disabled:pointer-events-none active:scale-95',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
