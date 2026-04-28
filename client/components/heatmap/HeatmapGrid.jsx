'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const colorThemes = {
  default: {
    bg: ['bg-muted/50', 'bg-indigo-200 dark:bg-indigo-900/60', 'bg-indigo-400 dark:bg-indigo-700', 'bg-indigo-500 dark:bg-indigo-500', 'bg-indigo-700 dark:bg-indigo-400'],
    glow: ['', '', '', 'shadow-indigo-500/30', 'shadow-indigo-500/50'],
    legend: 'from-indigo-200 via-indigo-400 to-indigo-700',
  },
  green: {
    bg: ['bg-muted/50', 'bg-emerald-200 dark:bg-emerald-900/60', 'bg-emerald-400 dark:bg-emerald-700', 'bg-emerald-500 dark:bg-emerald-500', 'bg-emerald-700 dark:bg-emerald-400'],
    glow: ['', '', '', 'shadow-emerald-500/30', 'shadow-emerald-500/50'],
    legend: 'from-emerald-200 via-emerald-400 to-emerald-700',
  },
  orange: {
    bg: ['bg-muted/50', 'bg-orange-200 dark:bg-orange-900/60', 'bg-orange-400 dark:bg-orange-700', 'bg-orange-500 dark:bg-orange-500', 'bg-orange-700 dark:bg-orange-400'],
    glow: ['', '', '', 'shadow-orange-500/30', 'shadow-orange-500/50'],
    legend: 'from-orange-200 via-orange-400 to-orange-700',
  },
  pink: {
    bg: ['bg-muted/50', 'bg-pink-200 dark:bg-pink-900/60', 'bg-pink-400 dark:bg-pink-700', 'bg-pink-500 dark:bg-pink-500', 'bg-pink-700 dark:bg-pink-400'],
    glow: ['', '', '', 'shadow-pink-500/30', 'shadow-pink-500/50'],
    legend: 'from-pink-200 via-pink-400 to-pink-700',
  },
};

function generateHeatmapData(year, habit, serverData = {}) {
  const data = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Adjust start to Monday
  let currentDate = new Date(startDate);
  const dayOfWeek = currentDate.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  currentDate.setDate(currentDate.getDate() - daysToMonday);

  while (currentDate <= endDate || data.length === 0) {
    const week = [];
    for (let day = 0; day < 7; day++) {
      if (currentDate < startDate || currentDate > endDate) {
        week.push(null);
      } else {
        const dateStr = new Date(currentDate).toISOString().split('T')[0];
        const count = serverData[dateStr] || 0;
        let intensity = 0;
        if (count > 0) intensity = 1;
        if (count > 2) intensity = 2;
        if (count > 4) intensity = 3;
        if (count > 6) intensity = 4;

        week.push({
          date: new Date(currentDate),
          intensity,
          completions: count,
          habit,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    data.push(week);
    if (currentDate > endDate) break;
  }

  return data;
}

function Tooltip({ data, position }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 5 }}
      className="fixed z-[100] px-4 py-3 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl shadow-black/20 pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%) translateY(-12px)',
      }}
    >
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <p className="text-sm font-bold text-foreground">
        {data.completions} completions
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {data.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
    </motion.div>
  );
}

export function HeatmapGrid({ year, habit, colorTheme, onCellClick, serverData = {} }) {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const heatmapData = useMemo(() => generateHeatmapData(year, habit, serverData), [year, habit, serverData]);
  const theme = colorThemes[colorTheme] || colorThemes.default;

  const handleMouseEnter = (e, cellData) => {
    if (cellData) {
      const rect = e.target.getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
      setHoveredCell(cellData);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.002,
      },
    },
  };

  const cell = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 20 } },
  };

  return (
    <div className="relative p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/8 backdrop-blur-md">
      {/* Month Labels */}
      <div className="flex ml-12 mb-2">
        {months.map((month) => (
          <span
            key={month}
            className="text-xs font-medium text-muted-foreground"
            style={{ width: `${100 / 12}%` }}
          >
            {month}
          </span>
        ))}
      </div>

      <div className="flex">
        {/* Day Labels — full 7 days */}
        <div className="flex flex-col mr-3 gap-[3px]">
          {days.map((day) => (
            <span key={day} className="text-[11px] font-medium text-muted-foreground h-[14px] leading-[14px] w-8 text-right pr-1">
              {day}
            </span>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-[3px] flex-1"
        >
          {heatmapData.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((cellData, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  variants={cell}
                  className={`w-[14px] h-[14px] rounded-[3px] cursor-pointer transition-all duration-200 ${cellData ? `${theme.bg[cellData.intensity]} ${cellData.intensity > 2 ? `shadow-sm ${theme.glow[cellData.intensity]}` : ''}` : 'bg-transparent'
                    }`}
                  whileHover={cellData ? { scale: 1.4, zIndex: 10 } : {}}
                  onMouseEnter={(e) => handleMouseEnter(e, cellData)}
                  onMouseLeave={() => setHoveredCell(null)}
                  onClick={() => cellData && onCellClick(cellData)}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Tooltip Portal */}
      <AnimatePresence>
        {hoveredCell && (
          <Tooltip data={hoveredCell} position={tooltipPos} />
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-end gap-3 mt-5">
        <span className="text-xs font-medium text-muted-foreground">Less</span>
        <div className={`w-20 h-3 rounded-full bg-gradient-to-r ${theme.legend}`}></div>
        <span className="text-xs font-medium text-muted-foreground">More</span>
      </div>
    </div>
  );
}
