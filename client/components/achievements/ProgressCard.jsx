'use client';

import { motion } from 'framer-motion';

export function ProgressCard({ label, current, max, suffix = '', color = 'indigo', delay = 0 }) {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    indigo: 'bg-indigo-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    purple: 'bg-purple-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border rounded-2xl p-4"
    >
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-end gap-2">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
          className="text-2xl font-bold"
        >
          {current.toLocaleString()}{suffix}
        </motion.span>
        <span className="text-sm text-muted-foreground mb-1">
          / {max.toLocaleString()}{suffix}
        </span>
      </div>
      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${colorClasses[color] || colorClasses.indigo} rounded-full`}
        />
      </div>
    </motion.div>
  );
}
