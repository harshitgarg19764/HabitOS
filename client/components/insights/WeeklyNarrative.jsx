'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const narrative = `This week showed strong consistency with your morning routine. You completed 85% of your meditation sessions and maintained perfect hydration on weekdays. 

However, your gym attendance dropped on weekends - consider scheduling workouts earlier in the day or setting reminders.

Your reading habit has improved significantly, with an average of 25 pages per day. The habit stacking with your evening routine seems to be working well.

Key wins: 14-day meditation streak, 92% water intake, improved sleep quality.
Focus areas: Weekend consistency, earlier bedtime.`;

export function WeeklyNarrative({ text, expanded, onToggle }) {
  const narrativeText = text || `This week showed strong consistency with your morning routine...`;
  return (
    <motion.div
      className="bg-card rounded-2xl border overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">Weekly Narrative</h3>
            <p className="text-sm text-muted-foreground">
              Your week at a glance
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          maxHeight: expanded ? 500 : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 10 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground leading-relaxed whitespace-pre-line"
          >
            {narrativeText}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
