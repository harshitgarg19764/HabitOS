'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function MiniHeatmapWidget({ data = {} }) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const newCells = [];
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Calculate start date (12 weeks ago, starting from Monday)
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (12 * 7 - 1));
    
    let currentDate = new Date(startDate);
    
    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = data[dateStr] || 0;
        
        let intensity = 0;
        if (count > 0) intensity = 1;
        if (count > 2) intensity = 2;
        if (count > 4) intensity = 3;
        if (count > 5) intensity = 4;
        
        newCells.push({ week, day, intensity, date: dateStr });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    setCells(newCells);
  }, [data]);

  const getColor = (intensity) => {
    const colors = [
      'bg-muted/20',
      'bg-indigo-200 dark:bg-indigo-900/40',
      'bg-indigo-300 dark:bg-indigo-800/60',
      'bg-indigo-400 dark:bg-indigo-600/80',
      'bg-indigo-500',
    ];
    return colors[intensity] || colors[0];
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Activity</h3>
        <span className="text-xs text-muted-foreground">Last 12 weeks</span>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: 12 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-0.5">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const cell = cells.find(c => c.week === weekIndex && c.day === dayIndex);
              return (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: (weekIndex * 7 + dayIndex) * 0.005,
                    duration: 0.2 
                  }}
                  className={cn(
                    'w-2.5 h-2.5 rounded-sm',
                    getColor(cell?.intensity || 0)
                  )}
                  title={cell ? `${cell.intensity} activities` : 'No activity'}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <span className="text-xs text-muted-foreground">Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className={cn('w-2.5 h-2.5 rounded-sm', getColor(i))} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
}
