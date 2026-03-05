'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DateBar } from '@/components/logs/DateBar';
import { LogItem } from '@/components/logs/LogItem';
import { AutoSaveToast } from '@/components/logs/AutoSaveToast';

const mockHabits = [
  { id: 'h1', name: 'Morning Meditation', icon: '🧘', color: '#8b5cf6', type: 'boolean', streak: 12 },
  { id: 'h2', name: 'Drink Water (2L)', icon: '💧', color: '#3b82f6', type: 'numeric', goal: 2000, unit: 'ml', streak: 45 },
  { id: 'h3', name: 'Read 20 pages', icon: '📚', color: '#10b981', type: 'boolean', streak: 3 },
  { id: 'h4', name: 'Gym Session', icon: '🏋️', color: '#ef4444', type: 'boolean', streak: 0 },
  { id: 'h5', name: 'Journaling', icon: '✍️', color: '#f59e0b', type: 'boolean', streak: 8 },
];

export default function LogsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [logs, setLogs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  // Calculate progress
  const totalHabits = mockHabits.length;
  const completedHabits = mockHabits.filter((habit) => {
    const log = logs[habit.id];
    if (!log) return false;
    return habit.type === 'boolean' ? log.value : log.value > 0;
  }).length;
  const progress = (completedHabits / totalHabits) * 100;

  // Trigger confetti when all done
  useEffect(() => {
    if (completedHabits === totalHabits && totalHabits > 0 && !hasTriggeredConfetti) {
      setHasTriggeredConfetti(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      });
    }
  }, [completedHabits, totalHabits, hasTriggeredConfetti]);

  // Auto-save toast
  const handleUpdate = useCallback((habitId, data) => {
    setLogs((prev) => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        ...data,
      },
    }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-heading font-bold">Daily Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track your habits for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Date Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DateBar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </motion.div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Today&apos;s Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedHabits} of {totalHabits} habits completed
              </p>
            </div>
            {completedHabits === totalHabits && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-4 py-2 rounded-full bg-green-500/10 text-green-500 font-medium"
              >
                All Done! 🎉
              </motion.div>
            )}
          </div>
          
          <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Log List */}
        <div className="space-y-4">
          {mockHabits.map((habit, index) => (
            <LogItem
              key={habit.id}
              habit={habit}
              log={logs[habit.id]}
              onUpdate={handleUpdate}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Auto-Save Toast */}
      <AutoSaveToast show={showToast} />
    </DashboardLayout>
  );
}
