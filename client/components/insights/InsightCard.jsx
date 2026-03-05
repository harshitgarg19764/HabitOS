'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Info } from 'lucide-react';

const typeConfig = {
  positive: {
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  neutral: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function InsightCard({ insight }) {
  const config = typeConfig[insight.type] || typeConfig.neutral;
  const Icon = config.icon;

  return (
    <motion.div
      variants={item}
      className={`bg-card rounded-2xl p-5 border ${config.border} hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-xl ${config.bg}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">{insight.title}</h4>
          <p className="text-sm text-muted-foreground mb-3">
            {insight.description}
          </p>
          
          {/* Confidence Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium">{insight.confidence}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${insight.confidence}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${config.bg.replace('/10', '')}`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
