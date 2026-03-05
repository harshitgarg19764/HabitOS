'use client';

import { motion } from 'framer-motion';
import { Target, Flame, Award, TrendingUp } from 'lucide-react';

const activities = [
  { id: 1, type: 'habit', icon: Target, message: 'Completed "Morning Meditation"', time: '2 hours ago', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  { id: 2, type: 'streak', icon: Flame, message: '7-day streak on "Drink Water"', time: '4 hours ago', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  { id: 3, type: 'achievement', icon: Award, message: 'Earned "Early Bird" badge', time: 'Yesterday', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
  { id: 4, type: 'progress', icon: TrendingUp, message: 'Weekly score improved by 12%', time: 'Yesterday', color: 'text-green-500', bgColor: 'bg-green-500/10' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

export function ActivityFeedWidget() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Activity</h3>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <motion.div
              key={activity.id}
              variants={item}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
