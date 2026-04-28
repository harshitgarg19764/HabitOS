'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NumericStepper({ value, onChange, min = 0, max = 100, step = 1, unit = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    animateChange(newValue);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    animateChange(newValue);
    onChange(newValue);
  };

  const animateChange = (newValue) => {
    setIsAnimating(true);
    setDisplayValue(newValue);
    setTimeout(() => setIsAnimating(false), 200);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <motion.button
          onClick={handleDecrement}
          disabled={value <= min}
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
            'bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed',
            'active:scale-95'
          )}
          whileTap={{ scale: 0.95 }}
        >
          <Minus className="w-5 h-5" />
        </motion.button>

        <div className="flex-1 relative h-12 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ y: value > displayValue ? -20 : 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: value > displayValue ? 20 : -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className={cn(
                'text-3xl font-bold tabular-nums',
                isAnimating && 'text-primary'
              )}>
                {value}
              </span>
              {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleIncrement}
          disabled={value >= max}
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
            'bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed',
            'active:scale-95'
          )}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
