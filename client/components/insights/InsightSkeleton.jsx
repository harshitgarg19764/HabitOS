'use client';

import { motion } from 'framer-motion';

const shimmerKeyframes = {
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
};

export function InsightSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-5 border">
      <div className="flex items-start gap-4">
        <motion.div
          animate={shimmerKeyframes}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-xl bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
        />
        <div className="flex-1 space-y-3">
          <motion.div
            animate={shimmerKeyframes}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="h-5 w-3/4 rounded bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
          />
          <motion.div
            animate={shimmerKeyframes}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="h-4 w-full rounded bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
          />
          <motion.div
            animate={shimmerKeyframes}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="h-4 w-2/3 rounded bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
          />
          
          {/* Confidence bar skeleton */}
          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1">
              <motion.div
                animate={shimmerKeyframes}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="h-3 w-16 rounded bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
              />
              <motion.div
                animate={shimmerKeyframes}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="h-3 w-8 rounded bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
              />
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                animate={shimmerKeyframes}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-muted via-muted-foreground/20 to-muted bg-[length:200%_100%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
