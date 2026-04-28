'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const generateStreakData = (serverData = {}) => {
  const weeks = 12;
  const data = [];
  
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  
  // Start from 12 weeks ago (aligned to Monday)
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * 7 - 1));
  
  let currentDate = new Date(startDate);
  
  for (let week = 0; week < weeks; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = serverData[dateStr] || 0;
      
      let intensity = 0;
      if (count > 0) intensity = 1;
      if (count > 2) intensity = 2;
      if (count > 4) intensity = 3;
      if (count > 5) intensity = 4;
      
      weekData.push({ day, intensity, week, date: dateStr, count });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    data.push(weekData);
  }
  
  return data;
};

const intensityColors = [
  'bg-muted',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/60',
  'bg-primary',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
};

const cell = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function StreakTimeline({ data = {} }) {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    setStreakData(generateStreakData(data));
  }, [data]);

  if (streakData.length === 0) {
    return (
      <div className="flex gap-1 animate-pulse ml-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((_, j) => (
              <div key={j} className="w-6 h-6 rounded-md bg-muted" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-1 mb-2 ml-6">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <span key={i} className="text-xs text-muted-foreground w-6 text-center">
            {day}
          </span>
        ))}
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-1"
      >
        {streakData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((cellData, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                variants={cell}
                className={`w-6 h-6 rounded-md ${intensityColors[cellData.intensity]} transition-colors`}
                whileHover={{ scale: 1.3, zIndex: 10 }}
              />
            ))}
          </div>
        ))}
      </motion.div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-xs text-muted-foreground">Less</span>
        {intensityColors.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
        ))}
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
}
