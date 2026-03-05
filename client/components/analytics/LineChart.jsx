'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', completions: 4, target: 5 },
  { day: 'Tue', completions: 3, target: 5 },
  { day: 'Wed', completions: 5, target: 5 },
  { day: 'Thu', completions: 4, target: 5 },
  { day: 'Fri', completions: 2, target: 5 },
  { day: 'Sat', completions: 5, target: 5 },
  { day: 'Sun', completions: 4, target: 5 },
];

const CustomDot = (props) => {
  const { cx, cy, payload, active } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.g
      initial={{ scale: 1 }}
      animate={{ scale: isHovered ? 1.5 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={active ? '#6366f1' : '#a5b4fc'}
        stroke="#6366f1"
        strokeWidth={2}
      />
      {isHovered && (
        <motion.circle
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
          cx={cx}
          cy={cy}
          r={4}
          fill="#6366f1"
        />
      )}
    </motion.g>
  );
};

export function LineChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[280px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="completions"
            stroke="#6366f1"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: '#6366f1' }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
