'use client';

import { useState, useEffect } from 'react';
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
import { Skeleton } from '@/components/ui/Skeleton';
import { analyticsAPI } from '@/lib/api';

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
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setIsLoading(true);
      try {
        const response = await analyticsAPI.getDashboard();
        setDashboardData(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard summary', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

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
            {isLoading ? <Skeleton className="h-[180px] rounded-2xl" /> : <ScoreRingWidget score={dashboardData?.score || 0} />}
          </motion.div>
          <motion.div variants={item}>
            {isLoading ? <Skeleton className="h-[180px] rounded-2xl" /> : (
              <StreakWidget 
                streak={dashboardData?.currentStreak || 0} 
                longestStreak={dashboardData?.bestStreak || 0} 
              />
            )}
          </motion.div>
          <motion.div variants={item} className="lg:col-span-2">
            {isLoading ? <Skeleton className="h-[180px] rounded-2xl" /> : <MiniChartWidget data={dashboardData?.trend || []} />}
          </motion.div>
        </div>

        {/* Middle Row - Habits & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={item} className="lg:col-span-2">
            {isLoading ? <Skeleton className="h-[400px] rounded-2xl" /> : <HabitTogglesWidget />}
          </motion.div>
          <motion.div variants={item}>
            {isLoading ? <Skeleton className="h-[400px] rounded-2xl" /> : <ActivityFeedWidget />}
          </motion.div>
        </div>

        {/* Bottom Row - Quote & Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={item}>
            {isLoading ? <Skeleton className="h-[300px] rounded-2xl" /> : <QuoteWidget />}
          </motion.div>
          <motion.div variants={item}>
            {isLoading ? <Skeleton className="h-[300px] rounded-2xl" /> : <MiniHeatmapWidget data={dashboardData?.activity || {}} />}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
