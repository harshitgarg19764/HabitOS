'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GreetingWidget } from '@/components/dashboard/widgets/GreetingWidget';
import { ScoreRingWidget } from '@/components/dashboard/widgets/ScoreRingWidget';
import { StreakWidget } from '@/components/dashboard/widgets/StreakWidget';
import { HabitTogglesWidget } from '@/components/dashboard/widgets/HabitTogglesWidget';
import { QuoteWidget } from '@/components/dashboard/widgets/QuoteWidget';
import { MiniChartWidget } from '@/components/dashboard/widgets/MiniChartWidget';
import { ActivityFeedWidget } from '@/components/dashboard/widgets/ActivityFeedWidget';
import { MiniHeatmapWidget } from '@/components/dashboard/widgets/MiniHeatmapWidget';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Greeting */}
        <motion.div variants={item}>
          <GreetingWidget />
        </motion.div>

        {/* Top Row - Score & Streak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={item}>
            <ScoreRingWidget score={85} />
          </motion.div>
          <motion.div variants={item}>
            <StreakWidget streak={14} longestStreak={45} />
          </motion.div>
          <motion.div variants={item} className="lg:col-span-2">
            <MiniChartWidget />
          </motion.div>
        </div>

        {/* Middle Row - Habits & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2">
            <HabitTogglesWidget />
          </motion.div>
          <motion.div variants={item}>
            <ActivityFeedWidget />
          </motion.div>
        </div>

        {/* Bottom Row - Quote & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <QuoteWidget />
          </motion.div>
          <motion.div variants={item}>
            <MiniHeatmapWidget />
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
