'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const item = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

export function BadgeCard({ badge, onClick, unlocking = false, id }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = badge.icon;

  return (
    <motion.button
      id={id}
      variants={item}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group p-4 rounded-2xl border transition ${
        badge.earned
          ? 'bg-card hover:shadow-lg hover:shadow-primary/20'
          : 'bg-muted/30 opacity-60'
      }`}
      whileTap={{ scale: 0.95 }}
      animate={unlocking ? { 
        scale: [1, 1.2, 1.1, 1.2, 1],
        boxShadow: [
          '0 0 0 0 rgba(234, 179, 8, 0)',
          '0 0 30px 10px rgba(234, 179, 8, 0.6)',
          '0 0 0 0 rgba(234, 179, 8, 0)'
        ]
      } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Badge Icon */}
      <div className={`relative w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-all ${
        badge.earned
          ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
          : 'bg-muted'
      }`}>
        {badge.earned ? (
          <motion.div
            animate={isHovered ? {
              boxShadow: ['0 0 0 0 rgba(234, 179, 8, 0)', '0 0 20px 5px rgba(234, 179, 8, 0.5)', '0 0 0 0 rgba(234, 179, 8, 0)']
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        ) : (
          <>
            <Icon className="w-8 h-8 text-muted-foreground" />
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-2xl">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </>
        )}
      </div>

      {/* Badge Name */}
      <p className={`text-sm font-medium text-center ${
        badge.earned ? '' : 'text-muted-foreground'
      }`}>
        {badge.name}
      </p>

      {/* Progress indicator for in-progress badges */}
      {!badge.earned && badge.progress > 0 && (
        <div className="mt-2">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${badge.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-1">
            {badge.progress}%
          </p>
        </div>
      )}

      {/* Earned glow effect */}
      {badge.earned && isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: '0 0 20px 5px rgba(234, 179, 8, 0.3)',
          }}
        />
      )}
    </motion.button>
  );
}
