'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BooleanToggle({ value, onChange, color = '#8b5cf6' }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'relative w-14 h-8 rounded-full transition-colors duration-300',
        value ? 'bg-green-500' : 'bg-muted'
      )}
    >
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        initial={false}
        animate={{ left: value ? 'calc(100% - 28px)' : '4px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {value && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="w-4 h-4 text-green-500" />
          </motion.div>
        )}
      </motion.div>

      {/* Glow effect when on */}
      {value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 20px ${color}60`,
          }}
        />
      )}
    </button>
  );
}
