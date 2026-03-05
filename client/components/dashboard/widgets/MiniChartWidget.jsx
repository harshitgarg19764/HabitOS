'use client';

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const data = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 78 },
  { day: 'Wed', score: 82 },
  { day: 'Thu', score: 70 },
  { day: 'Fri', score: 90 },
  { day: 'Sat', score: 85 },
  { day: 'Sun', score: 92 },
];

export function MiniChartWidget() {
  const avgScore = Math.round(data.reduce((sum, d) => sum + d.score, 0) / data.length);

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Weekly Progress</h3>
        <span className="text-sm font-bold text-primary">{avgScore}% avg</span>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
        {data.map((d, i) => (
          <span key={d.day} className="text-xs text-muted-foreground">
            {d.day.charAt(0)}
          </span>
        ))}
      </div>
    </div>
  );
}
