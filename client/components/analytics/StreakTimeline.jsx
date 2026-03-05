'use client';

import { motion } from 'framer-motion';

const generateStreakData = () => {
  const weeks = 12;
  const data = [];
  
  for (let week = 0; week < weeks; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      const random = Math.random();
      let intensity = 0;
      if (random > 0.3) intensity = 1;
      if (random > 0.5) intensity = 2;
      if (random > 0.7) intensity = 3;
      if (random > 0.85) intensity = 4;
      weekData.push({ day, intensity, week });
    }
    data.push(weekData);
  }
  
  return data;
};

const streakData = generateStreakData();

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

export function StreakTimeline() {
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
