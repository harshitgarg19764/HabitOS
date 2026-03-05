'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockHabits = [
  { id: 'h1', name: 'Morning Meditation', icon: '🧘', color: '#8b5cf6', completed: true },
  { id: 'h2', name: 'Drink Water (2L)', icon: '💧', color: '#3b82f6', completed: false },
  { id: 'h3', name: 'Read 20 pages', icon: '📚', color: '#10b981', completed: false },
  { id: 'h4', name: 'Gym Session', icon: '🏋️', color: '#ef4444', completed: false },
];

export function HabitTogglesWidget() {
  const [habits, setHabits] = useState(mockHabits);
  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  const toggleHabit = (id) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Quick Habits</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="space-y-3">
        {habits.map((habit) => (
          <motion.button
            key={habit.id}
            onClick={() => toggleHabit(habit.id)}
            className={cn(
              'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              habit.completed 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-muted/30 border border-transparent hover:border-border'
            )}
            whileTap={{ scale: 0.98 }}
          >
            {/* Checkbox */}
            <div 
              className={cn(
                'w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200',
                habit.completed 
                  ? 'bg-green-500 text-white' 
                  : 'border-2 border-muted-foreground/30'
              )}
            >
              {habit.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </div>

            {/* Icon */}
            <span className="text-xl">{habit.icon}</span>

            {/* Name */}
            <span className={cn(
              'flex-1 text-left font-medium',
              habit.completed ? 'text-green-500' : 'text-foreground'
            )}>
              {habit.name}
            </span>

            {/* Color indicator */}
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
