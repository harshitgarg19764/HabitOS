'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { HabitCard } from '@/components/habits/HabitCard';
import { CreateHabitModal } from '@/components/habits/CreateHabitModal';

const mockHabits = [
  { id: 'h1', name: 'Morning Meditation', icon: '🧘', color: '#8b5cf6', type: 'boolean', streak: 12, completed: false },
  { id: 'h2', name: 'Drink Water (2L)', icon: '💧', color: '#3b82f6', type: 'numeric', goal: 2000, unit: 'ml', streak: 45, completed: true },
  { id: 'h3', name: 'Read 20 pages', icon: '📚', color: '#10b981', type: 'boolean', streak: 3, completed: false },
  { id: 'h4', name: 'Gym Session', icon: '🏋️', color: '#ef4444', type: 'boolean', streak: 0, completed: false },
  { id: 'h5', name: 'Journaling', icon: '✍️', color: '#f59e0b', type: 'boolean', streak: 8, completed: true },
  { id: 'h6', name: 'No Sugar', icon: '🚫', color: '#ec4899', type: 'boolean', streak: 21, completed: true },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HabitsPage() {
  const [habits, setHabits] = useState(mockHabits);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const handleCreateHabit = (habitData) => {
    const newHabit = {
      id: `h${Date.now()}`,
      ...habitData,
      streak: 0,
      completed: false,
    };
    setHabits([...habits, newHabit]);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleArchiveHabit = (habit) => {
    setHabits(habits.filter(h => h.id !== habit.id));
  };

  const handleDeleteHabit = (habit) => {
    if (confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      setHabits(habits.filter(h => h.id !== habit.id));
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">My Habits</h1>
            <p className="text-muted-foreground mt-1">
              {habits.length} habits · {habits.filter(h => h.completed).length} completed today
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingHabit(null);
              setIsModalOpen(true);
            }}
            className="relative"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Habit
            {habits.length === 0 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
              />
            )}
          </Button>
        </motion.div>

        {/* Empty State */}
        {habits.length === 0 && (
          <motion.div
            variants={item}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
            <p className="text-muted-foreground mb-6">
              Start building better habits today. Your first habit is just a click away.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Habit
            </Button>
          </motion.div>
        )}

        {/* Habits Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {habits.map((habit, index) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              index={index}
              onEdit={handleEditHabit}
              onArchive={handleArchiveHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Create/Edit Modal */}
      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHabit(null);
        }}
        onSubmit={handleCreateHabit}
        editHabit={editingHabit}
      />
    </DashboardLayout>
  );
}
