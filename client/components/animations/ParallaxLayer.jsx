'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function ParallaxLayer({ 
  children, 
  speed = 0.3, 
  className = '' 
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div 
      style={{ y }} 
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MouseParallax({ 
  children, 
  strength = 20, 
  className = '' 
}) {
  const { x, y } = useMousePosition();
  
  return (
    <motion.div 
      style={{ 
        x: x * strength,
        y: y * strength 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
