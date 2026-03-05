'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { MoreVertical, Flame, Check, Archive, Trash2, Pencil, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountUp } from '@/hooks/useCountUp';

export function HabitCard({ habit, index, onEdit, onArchive, onDelete, onDragEnd }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isCompleted, setIsCompleted] = useState(habit.completed || false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const streakCount = useCountUp(habit.streak || 0, 1000 + index * 200);

  // Drag functionality
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(239, 68, 68, 0.1)', 'transparent', 'rgba(59, 130, 246, 0.1)']
  );

  const menuItems = [
    { icon: Pencil, label: 'Edit', onClick: () => onEdit?.(habit) },
    { icon: Archive, label: 'Archive', onClick: () => {
      setIsArchived(true);
      setTimeout(() => onArchive?.(habit), 300);
    }},
    { icon: Trash2, label: 'Delete', onClick: () => setShowDeleteConfirm(true), danger: true },
  ];

  // Archive animation
  if (isArchived) {
    return (
      <motion.div
        initial={{ opacity: 1, x: 0, height: 'auto' }}
        animate={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      />
    );
  }

  return (
    <>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = Math.abs(offset.x) * velocity.x;
          if (swipe < -10000) {
            setIsArchived(true);
            setTimeout(() => onArchive?.(habit), 300);
          } else if (swipe > 10000) {
            // Could implement something on swipe right
          }
          if (onDragEnd) onDragEnd(habit, index);
        }}
        style={{ x, background }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="relative bg-card rounded-2xl border border-border overflow-hidden group cursor-grab active:cursor-grabbing"
        whileHover={{ y: -6 }}
        whileDrag={{ scale: 1.02, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.2)' }}
      >
        {/* Drag Handle */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity z-10">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Color Accent Bar */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: habit.color }}
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
        />

        <div className="p-5 pl-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{habit.icon}</span>
              <div>
                <h3 className="font-semibold text-foreground">{habit.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {habit.type === 'numeric' ? `${habit.goal} ${habit.unit}` : 'Yes/No'}
                </p>
              </div>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 top-full mt-1 w-40 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  >
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          item.onClick();
                          setShowMenu(false);
                        }}
                        className={cn(
                          'w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors',
                          item.danger ? 'text-red-500' : 'text-foreground'
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <Flame className="w-5 h-5 text-orange-500" />
              </motion.div>
              <span className="text-2xl font-bold text-orange-500">{streakCount}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>

            <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: habit.color }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((streakCount / 30) * 100, 100)}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            </div>
          </div>

          {/* Complete Toggle */}
          <motion.button
            onClick={() => setIsCompleted(!isCompleted)}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all',
              isCompleted
                ? 'bg-green-500/10 text-green-500 border border-green-500/30'
                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
            )}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ scale: isCompleted ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Check className={cn('w-5 h-5', isCompleted && 'text-green-500')} />
            </motion.div>
            {isCompleted ? 'Completed!' : 'Mark Complete'}
          </motion.button>
        </div>

        {/* Hover Glow Effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            boxShadow: `0 0 30px -10px ${habit.color}40`,
          }}
        />
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Trash2 className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Delete Habit?</h3>
                <p className="text-muted-foreground mb-6">
                  Are you sure you want to delete &ldquo;{habit.name}&rdquo;? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      onDelete?.(habit);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
