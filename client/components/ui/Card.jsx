'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Card = forwardRef(({
  children,
  className,
  hover = false,
  glow = false,
  ...props
}, ref) => {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(
        'rounded-2xl border border-black/5 dark:border-white/10',
        'bg-white/80 dark:bg-zinc-900/80',
        'backdrop-blur-xl',
        glow && 'shadow-lg shadow-primary/10',
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';
