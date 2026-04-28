'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, Target, TrendingUp, Calendar } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { HeatmapGrid } from '@/components/heatmap/HeatmapGrid';
import { HeatmapSidebar } from '@/components/heatmap/HeatmapSidebar';
import { HabitFilter } from '@/components/heatmap/HabitFilter';
import { analyticsAPI, habitsAPI } from '@/lib/api';
import { useEffect } from 'react';

const years = [2026, 2025, 2024];

export default function HeatmapPage() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedHabit, setSelectedHabit] = useState('all');
  const [selectedCell, setSelectedCell] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState('default');
  const [serverData, setServerData] = useState({});
  const [habitsList, setHabitsList] = useState([{ id: 'all', name: 'All Habits', color: '#6366f1' }]);
  const [stats, setStats] = useState({
    totalCompletions: 0,
    bestStreak: 0,
    consistency: 0,
    activeDays: 0
  });

  useEffect(() => {
    async function loadHeatmapData() {
      try {
        const [heatmapRes, dashboardRes, habitsRes] = await Promise.all([
          analyticsAPI.getHeatmap(selectedYear),
          analyticsAPI.getDashboard(),
          habitsAPI.getAll()
        ]);

        // Process heatmap
        const dataArr = heatmapRes.data || [];
        const map = {};
        dataArr.forEach(item => { map[item.date] = item.count; });
        setServerData(map);

        // Process habits list for filter
        const fetchedHabits = habitsRes.data || [];
        setHabitsList([
          { id: 'all', name: 'All Habits', color: '#6366f1' },
          ...fetchedHabits.map(h => ({ id: h._id, name: h.name, color: h.color }))
        ]);

        // Process stats
        const d = dashboardRes.data || {};
        setStats({
          totalCompletions: dataArr.reduce((acc, curr) => acc + curr.count, 0),
          bestStreak: d.bestStreak || 0,
          consistency: Math.round((dataArr.length / 365) * 100), // Simple consistency metric
          activeDays: dataArr.length
        });

      } catch (err) {
        console.error(err);
      }
    }
    loadHeatmapData();
  }, [selectedYear]);

  const handleYearChange = (direction) => {
    const currentIndex = years.indexOf(selectedYear);
    if (direction === 'prev' && currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1]);
    }
  };

  const handleCellClick = (cellData) => {
    setSelectedCell(cellData);
    setIsSidebarOpen(true);
  };

  const colorThemes = {
    default: { name: 'Indigo', primary: '#6366f1' },
    green: { name: 'Forest', primary: '#10b981' },
    orange: { name: 'Sunset', primary: '#f97316' },
    pink: { name: 'Rose', primary: '#ec4899' },
  };

  const summaryStats = [
    { label: 'Total Completions', value: stats.totalCompletions, icon: Target, gradient: 'from-indigo-500 to-blue-500', shadow: 'shadow-indigo-500/20' },
    { label: 'Best Streak', value: `${stats.bestStreak} days`, icon: Flame, gradient: 'from-orange-500 to-amber-500', shadow: 'shadow-orange-500/20' },
    { label: 'Consistency', value: `${stats.consistency}%`, icon: TrendingUp, gradient: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-500/20' },
    { label: 'Active Days', value: stats.activeDays, icon: Calendar, gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-500/20' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold">
                <span className="gradient-text-warm">Heatmap</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Visualize your consistency over time
              </p>
            </div>

            <div className="flex items-center gap-3">
              <HabitFilter
                habits={habitsList}
                selected={selectedHabit}
                onSelect={setSelectedHabit}
              />

              {/* Color Theme Picker */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 rounded-xl backdrop-blur-md">
                {Object.entries(colorThemes).map(([key, ct]) => (
                  <button
                    key={key}
                    onClick={() => setColorTheme(key)}
                    className={`w-7 h-7 rounded-lg transition-all duration-200 ${colorTheme === key
                        ? 'ring-2 ring-offset-2 ring-offset-background ring-primary scale-110 shadow-md'
                        : 'hover:scale-110'
                      }`}
                    style={{ backgroundColor: ct.primary }}
                    title={ct.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 backdrop-blur-md shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md ${stat.shadow}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-bold font-heading text-foreground">{stat.value}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Year Navigation */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={() => handleYearChange('prev')}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 hover:bg-muted/80 transition-colors backdrop-blur-md"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait">
              <motion.span
                key={selectedYear}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-2xl font-bold font-heading gradient-text-warm min-w-[80px] text-center"
              >
                {selectedYear}
              </motion.span>
            </AnimatePresence>

            <motion.button
              onClick={() => handleYearChange('next')}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 hover:bg-muted/80 transition-colors backdrop-blur-md"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Heatmap Grid */}
          <HeatmapGrid
            year={selectedYear}
            habit={selectedHabit}
            colorTheme={colorTheme}
            onCellClick={handleCellClick}
            serverData={serverData}
          />
        </motion.div>

        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <HeatmapSidebar
              cellData={selectedCell}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
