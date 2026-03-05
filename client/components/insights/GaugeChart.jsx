'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function GaugeChart({ score = 0 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.floor(eased * score));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score]);

  const rotation = -90 + (animatedScore / 100) * 180;
  
  const getScoreColor = (s) => {
    if (s >= 80) return '#10b981';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="relative w-48 h-24 overflow-hidden">
      <svg className="w-48 h-24" viewBox="0 0 200 100">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="16"
          strokeLinecap="round"
        />
        
        {/* Score arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={getScoreColor(animatedScore)}
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: animatedScore / 100 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: 251,
            strokeDashoffset: 251 * (1 - animatedScore / 100),
          }}
        />
        
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="hsl(var(--foreground))"
          />
        </motion.g>
      </svg>
      
      {/* Score display */}
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <motion.span
          key={animatedScore}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
          style={{ color: getScoreColor(animatedScore) }}
        >
          {animatedScore}
        </motion.span>
        <p className="text-sm text-muted-foreground mt-1">
          {getScoreLabel(animatedScore)}
        </p>
      </div>
    </div>
  );
}
