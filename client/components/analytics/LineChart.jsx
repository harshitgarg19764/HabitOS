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

const CustomDot = (props) => {
  const { cx, cy, active } = props;
  return (
    <motion.g
      initial={{ scale: 1 }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={active ? '#6366f1' : '#a5b4fc'}
        stroke="#6366f1"
        strokeWidth={2}
      />
    </motion.g>
  );
};

export function LineChart({ data = [] }) {
  const chartData = data.length > 0 ? data : [
    { day: 'Mon', completions: 0 },
    { day: 'Tue', completions: 0 },
    { day: 'Wed', completions: 0 },
    { day: 'Thu', completions: 0 },
    { day: 'Fri', completions: 0 },
    { day: 'Sat', completions: 0 },
    { day: 'Sun', completions: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[280px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="day"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            allowDecimals={false}
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
