'use client';

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

export function MiniChartWidget({ data = [] }) {
  const chartData = data.length > 0 ? data.map(d => ({ ...d, score: d.completions * 20 })) : [
    { day: 'Mon', score: 0 },
    { day: 'Tue', score: 0 },
    { day: 'Wed', score: 0 },
    { day: 'Thu', score: 0 },
    { day: 'Fri', score: 0 },
    { day: 'Sat', score: 0 },
    { day: 'Sun', score: 0 },
  ];

  const avgScore = Math.round(chartData.reduce((sum, d) => sum + d.score, 0) / chartData.length);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Weekly Progress</h3>
        <span className="text-sm font-bold text-primary">{avgScore}% avg</span>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <YAxis domain={[0, 100]} hide />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: '#8b5cf6' }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-2">
        {chartData.map((d, i) => (
          <span key={i} className="text-xs text-muted-foreground">
            {d.day.charAt(0)}
          </span>
        ))}
      </div>
    </div>
  );
}
