'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DateBar } from '@/components/logs/DateBar';
import { LogItem } from '@/components/logs/LogItem';
import { AutoSaveToast } from '@/components/logs/AutoSaveToast';
import { habitsAPI, logsAPI } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

export default function LogsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeHabits, setActiveHabits] = useState([]);
  const [logs, setLogs] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { success, error: toastError } = useToast();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [habitsRes, logsRes] = await Promise.all([
        habitsAPI.getAll(),
        logsAPI.getByDate(selectedDate.toISOString())
      ]);
      
      setActiveHabits(habitsRes.data || []);
      
      const logsMap = {};
      if (logsRes.data) {
        logsRes.data.forEach(log => {
          logsMap[log.habitId] = log;
        });
      }
      setLogs(logsMap);
      setHasTriggeredConfetti(false);
    } catch (err) {
      console.error('Failed to load logs', err);
      toastError('Failed to load daily logs.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, toastError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate progress
  const totalHabits = activeHabits.length;
  const completedHabits = activeHabits.filter((habit) => {
    const log = logs[habit._id || habit.id];
    if (!log) return false;
    return habit.type === 'boolean' ? log.value === true || log.value === 'true' : Number(log.value) > 0;
  }).length;
  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

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
      success('Fantastic! All habits completed for today! 🎉');
    }
  }, [completedHabits, totalHabits, hasTriggeredConfetti, success]);

  // Auto-save toast
  const handleUpdate = useCallback(async (habitId, data) => {
    setLogs((prev) => ({
      ...prev,
      [habitId]: {
        ...prev[habitId],
        ...data,
      },
    }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    try {
      await logsAPI.create({
        habitId,
        date: selectedDate.toISOString(),
        value: data.value,
        note: data.note || ''
      });
      // success('Progress auto-saved.');
    } catch (err) {
      console.error('Failed to save log to backend', err);
      toastError('Connection error: local changes not synced.');
    }
  }, [selectedDate, toastError]);

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
            {completedHabits === totalHabits && totalHabits > 0 && (
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
          {isLoading ? (
             <div className="py-10 text-center text-muted-foreground">Loading habits...</div>
          ) : activeHabits.length === 0 ? (
             <div className="py-10 text-center text-muted-foreground">No active habits found. Create one in the Habits tab!</div>
          ) : activeHabits.map((habit, index) => (
            <LogItem
              key={habit._id || habit.id}
              habit={habit}
              log={logs[habit._id || habit.id]}
              onUpdate={handleUpdate}
              index={index}
            />
          ))}
        </div>
      </div>

      <AutoSaveToast show={showToast} />
    </DashboardLayout>
  );
}
