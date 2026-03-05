'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export function HabitSelector({ habits, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const selectedHabit = habits.find(h => h.id === selected);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <span>{selectedHabit?.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8, transformOrigin: 'top' }}
            animate={{ opacity: 1, scaleY: 1, transformOrigin: 'top' }}
            exit={{ opacity: 0, scaleY: 0.8, transformOrigin: 'top' }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-card border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => {
                  onSelect(habit.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-muted/50 ${
                  selected === habit.id ? 'text-primary bg-primary/5' : 'text-foreground'
                }`}
              >
                <span>{habit.name}</span>
                {selected === habit.id && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
