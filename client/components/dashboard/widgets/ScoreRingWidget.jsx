'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScoreRingWidget({ score = 85 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Keep going';
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Daily Score</h3>
      
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 -rotate-90">
          {/* Background Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        
        {/* Score Text */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="text-4xl font-bold"
            style={{ color: getScoreColor(score) }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </motion.div>
      </div>

      <motion.p
        className="text-center mt-4 font-medium"
        style={{ color: getScoreColor(score) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {getScoreLabel(score)}
      </motion.p>
    </div>
  );
}
