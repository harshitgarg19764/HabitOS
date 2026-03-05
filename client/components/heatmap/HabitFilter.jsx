'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export function HabitFilter({ habits, selected, onSelect }) {
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
        className="flex items-center gap-2.5 px-4 py-2.5 bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 rounded-xl text-sm font-medium hover:bg-white/80 dark:hover:bg-white/[0.06] transition-all backdrop-blur-md"
        whileTap={{ scale: 0.98 }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: selectedHabit?.color }}
        />
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
            className="absolute top-full left-0 mt-2 w-full min-w-[220px] bg-white/90 dark:bg-card/95 backdrop-blur-xl border border-black/5 dark:border-white/8 rounded-xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden z-50"
          >
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => {
                  onSelect(habit.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-muted/50 ${selected === habit.id ? 'text-primary bg-primary/5 font-medium' : 'text-foreground'
                  }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
                <span className="flex-1 text-left">{habit.name}</span>
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
