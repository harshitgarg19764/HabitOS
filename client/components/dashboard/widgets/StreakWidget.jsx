'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

export function StreakWidget({ streak = 14, longestStreak = 45 }) {
  const currentStreak = useCountUp(streak, 1500);
  const bestStreak = useCountUp(longestStreak, 1500);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Streaks</h3>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Flame className="w-6 h-6 text-orange-500" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-orange-500">{currentStreak}</span>
            <span className="text-lg text-muted-foreground">days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Current streak</p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold">{bestStreak}</span>
            <span className="text-sm text-muted-foreground">days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Best streak</p>
        </div>
      </div>
    </div>
  );
}
