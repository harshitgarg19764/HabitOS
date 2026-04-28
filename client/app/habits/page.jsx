'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { HabitCard } from '@/components/habits/HabitCard';
import { CreateHabitModal } from '@/components/habits/CreateHabitModal';
import { habitsAPI } from '@/lib/api';
import { useToast } from '@/components/ui/Toast';

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
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const { success, error } = useToast();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      const response = await habitsAPI.getAll();
      setHabits(response.data || []);
    } catch (err) {
      console.error('Failed to load habits', err);
      error('Failed to load habits. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateHabit = async (habitData) => {
    try {
      if (editingHabit) {
        await habitsAPI.update(editingHabit._id || editingHabit.id, habitData);
        success('Habit updated successfully!');
      } else {
        await habitsAPI.create(habitData);
        success('New habit created!');
      }
      fetchHabits();
    } catch (err) {
      console.error('Failed to save habit', err);
      error('Failed to save habit.');
    }
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleArchiveHabit = async (habit) => {
    try {
      await habitsAPI.archive(habit._id || habit.id);
      success(`${habit.name} archived.`);
      fetchHabits();
    } catch (err) {
      console.error('Failed to archive habit', err);
      error('Failed to archive habit.');
    }
  };

  const handleDeleteHabit = async (habit) => {
    if (confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      try {
        await habitsAPI.delete(habit._id || habit.id);
        success('Habit deleted.');
        fetchHabits();
      } catch (err) {
        console.error('Failed to delete habit', err);
        error('Failed to delete habit.');
      }
    }
  };

  if (isLoading && habits.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Loading your habits...
        </div>
      </DashboardLayout>
    );
  }

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
              {habits.length} active habits
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
              key={habit._id || habit.id}
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
