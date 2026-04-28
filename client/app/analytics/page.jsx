'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, Target, Flame, Award } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/analytics/StatCard';
import { LineChart } from '@/components/analytics/LineChart';
import { BarChart } from '@/components/analytics/BarChart';
import { DonutChart } from '@/components/analytics/DonutChart';
import { StreakTimeline } from '@/components/analytics/StreakTimeline';
import { analyticsAPI } from '@/lib/api';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState([
    { label: 'Total Completions', value: 0, icon: Target, color: 'indigo' },
    { label: 'Current Streak', value: 0, icon: Flame, color: 'orange' },
    { label: 'Active Habits', value: 0, icon: Award, color: 'yellow' },
    { label: 'Completion Rate', value: 0, suffix: '%', icon: TrendingUp, color: 'green' },
  ]);
  const [trendData, setTrendData] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});

  useEffect(() => {
    async function loadStats() {
       try {
         const [dashRes, summaryRes] = await Promise.all([
           analyticsAPI.getDashboard(),
           analyticsAPI.getSummary()
         ]);

         const data = dashRes.data;
         if (data) {
           setStats([
             { label: 'Total Completions', value: data.completedToday || 0, icon: Target, color: 'indigo' },
             { label: 'Current Streak', value: data.currentStreak || 0, icon: Flame, color: 'orange' },
             { label: 'Active Habits', value: data.activeHabits || 0, icon: Award, color: 'yellow' },
             { label: 'Completion Rate', value: data.score || 0, suffix: '%', icon: TrendingUp, color: 'green' }
           ]);
           setTrendData(data.trend || []);
           setHeatmapData(data.activity || {});
         }

         if (summaryRes.data?.distribution) {
           setDistribution(summaryRes.data.distribution);
         }
       } catch(err) {
         console.warn(err);
       }
    }
    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={item} className="flex justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your progress and performance over time</p>
          </div>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div variants={item}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={item}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Completion Trend</h3>
              <LineChart data={trendData} />
            </div>
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Weekly Performance</h3>
              <BarChart data={trendData} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Habit Distribution</h3>
              <DonutChart data={distribution} />
            </div>
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Streak Timeline</h3>
              <StreakTimeline data={heatmapData} />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
