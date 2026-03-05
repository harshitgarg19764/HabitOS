'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TrendingUp, Target, Flame, Award, Calendar, ChevronDown } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/analytics/StatCard';
import { LineChart } from '@/components/analytics/LineChart';
import { BarChart } from '@/components/analytics/BarChart';
import { DonutChart } from '@/components/analytics/DonutChart';
import { StreakTimeline } from '@/components/analytics/StreakTimeline';
import { HabitSelector } from '@/components/analytics/HabitSelector';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'performance', label: 'Performance' },
  { id: 'trends', label: 'Trends' },
];

const mockStats = [
  { label: 'Total Completions', value: 847, icon: Target, color: 'indigo' },
  { label: 'Current Streak', value: 14, icon: Flame, color: 'orange' },
  { label: 'Best Streak', value: 45, icon: Award, color: 'yellow' },
  { label: 'Completion Rate', value: 92, suffix: '%', icon: TrendingUp, color: 'green' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHabit, setSelectedHabit] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    }, 1500);
  };

  const habits = [
    { id: 'all', name: 'All Habits' },
    { id: 'h1', name: 'Morning Meditation' },
    { id: 'h2', name: 'Drink Water (2L)' },
    { id: 'h3', name: 'Read 20 pages' },
    { id: 'h4', name: 'Gym Session' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and performance over time
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <HabitSelector
              habits={habits}
              selected={selectedHabit}
              onSelect={setSelectedHabit}
            />
            <motion.button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
            >
              {isExporting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
              ) : exportSuccess ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-300"
                >
                  ✓
                </motion.div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isExporting ? 'Exporting...' : exportSuccess ? 'Exported!' : 'Export CSV'}
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Filter */}
        <motion.div variants={item} className="border-b border-border">
          <div className="flex gap-1 relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div variants={item}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={item}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Completion Trend</h3>
              <LineChart />
            </div>
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Weekly Performance</h3>
              <BarChart />
            </div>
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div variants={item}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Habit Distribution</h3>
              <DonutChart />
            </div>
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4">Streak Timeline</h3>
              <StreakTimeline />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
