'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { habitsAPI, logsAPI } from '@/lib/api';
import confetti from 'canvas-confetti';

export function HabitTogglesWidget() {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [habitsRes, logsRes] = await Promise.all([
        habitsAPI.getAll(),
        logsAPI.getByDate(new Date().toISOString())
      ]);

      const activeHabits = (habitsRes.data || []).filter(h => !h.archived);
      setHabits(activeHabits);

      const logsMap = {};
      (logsRes.data || []).forEach(log => {
        logsMap[log.habitId] = log;
      });
      setLogs(logsMap);
    } catch (err) {
      console.error('Failed to fetch dashboard habits', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHabit = async (habitId) => {
    const isCompleted = !!logs[habitId];
    
    // Optimistic UI
    const prevLogs = { ...logs };
    if (isCompleted) {
       const newLogs = { ...logs };
       delete newLogs[habitId];
       setLogs(newLogs);
    } else {
       setLogs({ ...logs, [habitId]: { habitId, value: 1 } });
    }

    try {
      if (isCompleted) {
        // Find log ID to delete
        const logId = logs[habitId]._id || logs[habitId].id;
        if (logId) await logsAPI.delete(logId);
        else await fetchData(); // Fallback if no ID yet
      } else {
        await logsAPI.create({
          habitId,
          date: new Date().toISOString(),
          value: 1
        });
        
        // Celebration!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#10b981', '#f59e0b']
        });
      }
      // Re-fetch to ensure sync with server
      fetchData();
    } catch (err) {
      console.error('Failed to toggle habit', err);
      setLogs(prevLogs); // Rollback
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const completedCount = Object.keys(logs).length;
  const totalCount = habits.length;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Quick Daily habits</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            No active habits. Go to Habits page to create one!
          </div>
        ) : (
          habits.map((habit) => {
            const isCompleted = !!logs[habit._id || habit.id];
            return (
              <motion.button
                key={habit._id || habit.id}
                onClick={() => toggleHabit(habit._id || habit.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  isCompleted 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-muted/30 border border-transparent hover:border-border'
                )}
                whileTap={{ scale: 0.98 }}
              >
                <div 
                  className={cn(
                    'w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200',
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-muted-foreground/30'
                  )}
                >
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>

                <span className="text-xl">{habit.icon}</span>

                <span className={cn(
                  'flex-1 text-left font-medium',
                  isCompleted ? 'text-green-500' : 'text-foreground'
                )}>
                  {habit.name}
                </span>

                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
              </motion.button>
            );
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: habits.length > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
