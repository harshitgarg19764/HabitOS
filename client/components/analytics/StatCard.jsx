'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

const colorClasses = {
  indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/20',
  orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20',
  yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20',
  green: 'from-green-500/20 to-green-500/5 border-green-500/20',
};

const iconColors = {
  indigo: 'text-indigo-500',
  orange: 'text-orange-500',
  yellow: 'text-yellow-500',
  green: 'text-green-500',
};

function useCountUp(end, duration = 1500, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [end, duration, delay]);

  return count;
}

export function StatCard({ label, value, suffix = '', icon: Icon, color = 'indigo', delay = 0 }) {
  const count = useCountUp(value, 1500, delay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1">
            {count}
            {suffix && <span className="text-lg ml-0.5">{suffix}</span>}
          </p>
        </div>
        <div className={`p-2 rounded-xl bg-background/50 ${iconColors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}
