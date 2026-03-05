'use client';

import { cn } from '@/lib/utils';

export function Skeleton({ 
  className, 
  variant = 'text',
  width,
  height,
  ...props 
}) {
  const baseStyles = 'animate-pulse bg-muted';
  
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 w-2/3 rounded',
    avatar: 'rounded-full',
    card: 'rounded-2xl',
    button: 'rounded-xl',
    image: 'rounded-xl',
    heatmap: 'rounded-sm',
  };

  const style = {
    width: width || (variants[variant] === 'rounded-full' ? '48px' : '100%'),
    height: height || (variant === 'text' ? '16px' : variant === 'avatar' ? '48px' : '100%'),
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
      {...props}
    />
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('bg-card border rounded-2xl p-6 space-y-4', className)}>
      <Skeleton variant="title" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex gap-2">
        <Skeleton variant="button" width={80} height={32} />
        <Skeleton variant="button" width={80} height={32} />
      </div>
    </div>
  );
}

export function SkeletonHeatmap({ rows = 7, cols = 52, className }) {
  return (
    <div 
      className={cn('flex gap-1', className)}
      style={{ 
        display: 'grid',
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridAutoFlow: 'column'
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="heatmap" 
          width={12} 
          height={12}
          className="w-3 h-3"
        />
      ))}
    </div>
  );
}

export function SkeletonChart({ className }) {
  return (
    <div className={cn('bg-card border rounded-2xl p-6', className)}>
      <Skeleton variant="title" className="mb-4" />
      <div className="flex items-end gap-2 h-40">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="flex-1 rounded-t-lg"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3, className }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-card border rounded-xl">
          <Skeleton variant="avatar" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      ))}
    </div>
  );
}
