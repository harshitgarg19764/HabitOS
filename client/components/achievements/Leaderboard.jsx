'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const row = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function useCountUp(end, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

function RankNumber({ rank, isUser }) {
  const count = useCountUp(rank, 800);

  const getRankStyle = (r) => {
    if (r === 1) return { bg: 'bg-yellow-400', text: 'text-yellow-900', icon: '🥇' };
    if (r === 2) return { bg: 'bg-gray-300', text: 'text-gray-700', icon: '🥈' };
    if (r === 3) return { bg: 'bg-amber-600', text: 'text-amber-900', icon: '🥉' };
    return { bg: 'bg-muted', text: 'text-muted-foreground', icon: null };
  };

  const style = getRankStyle(rank);

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${style.bg} ${style.text}`}>
      {style.icon || count}
    </div>
  );
}

export function Leaderboard({ data }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-card border rounded-2xl overflow-hidden"
    >
      {data.map((user, index) => (
        <motion.div
          key={user.rank}
          variants={row}
          className={`flex items-center gap-4 p-4 border-b last:border-b-0 transition-colors ${
            user.isUser ? 'bg-primary/5' : 'hover:bg-muted/30'
          }`}
        >
          <RankNumber rank={user.rank} isUser={user.isUser} />
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
            user.isUser 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
              : 'bg-muted'
          }`}>
            {user.avatar}
          </div>
          
          <div className="flex-1">
            <p className={`font-medium ${user.isUser ? 'text-primary' : ''}`}>
              {user.name}
              {user.isUser && <span className="ml-2 text-xs text-muted-foreground">(You)</span>}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.streak} day streak
            </p>
          </div>
          
          <div className="text-right">
            <p className="font-bold">{user.score.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
