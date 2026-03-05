'use client';

import { motion } from 'framer-motion';
import { X, Calendar, Target, Flame, TrendingUp } from 'lucide-react';

export function HeatmapSidebar({ cellData, isOpen, onClose }) {
  if (!cellData) return null;

  const date = cellData.date;
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const mockDetails = {
    totalHabits: cellData.completions,
    longestStreak: Math.floor(Math.random() * 10 + 1),
    completionRate: Math.floor(Math.random() * 30 + 70),
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-80 flex-shrink-0"
    >
      <div className="relative bg-white/70 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 rounded-2xl p-6 sticky top-6 backdrop-blur-xl overflow-hidden">
        {/* Gradient top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold font-heading text-lg gradient-text-warm">Day Details</h3>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 rounded-xl border border-indigo-500/10 dark:border-indigo-500/20">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-md shadow-indigo-500/20">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Date</p>
            <p className="font-semibold text-foreground">{formattedDate}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-sm shadow-indigo-500/20">
                <Target className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">Habits Done</span>
            </div>
            <span className="font-bold text-lg">{mockDetails.totalHabits}</span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm shadow-orange-500/20">
                <Flame className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">Streak</span>
            </div>
            <span className="font-bold text-lg">{mockDetails.longestStreak} days</span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm shadow-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">Completion</span>
            </div>
            <span className="font-bold text-lg">{mockDetails.completionRate}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground font-medium">Daily Goal</span>
            <span className="font-bold">{Math.floor((mockDetails.totalHabits / 6) * 100)}%</span>
          </div>
          <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((mockDetails.totalHabits / 6) * 100, 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
