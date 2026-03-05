'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Trophy, Star, Medal, Crown, Zap, Flame, Target, BookOpen, Brain, Heart, Sun, Moon, Cloud, Sparkles, Calendar, Play } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BadgeCard } from '@/components/achievements/BadgeCard';
import { Leaderboard } from '@/components/achievements/Leaderboard';
import { ProgressCard } from '@/components/achievements/ProgressCard';

const badges = [
  { id: 1, name: 'First Step', description: 'Complete your first habit', icon: Star, earned: true, progress: 100, requirement: 1, category: 'milestone' },
  { id: 2, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: Flame, earned: true, progress: 100, requirement: 7, category: 'streak' },
  { id: 3, name: 'Century Club', description: 'Complete 100 habits', icon: Target, earned: true, progress: 100, requirement: 100, category: 'milestone' },
  { id: 4, name: 'Month Master', description: 'Maintain a 30-day streak', icon: Calendar, earned: true, progress: 100, requirement: 30, category: 'streak' },
  { id: 5, name: 'Bookworm', description: 'Read for 50 hours total', icon: BookOpen, earned: true, progress: 100, requirement: 50, category: 'habit' },
  { id: 6, name: 'Early Bird', description: 'Complete 50 habits before 8 AM', icon: Sun, earned: false, progress: 72, requirement: 50, category: 'time' },
  { id: 7, name: 'Night Owl', description: 'Complete 50 habits after 10 PM', icon: Moon, earned: false, progress: 35, requirement: 50, category: 'time' },
  { id: 8, name: 'Perfect Week', description: 'Complete all habits for 7 consecutive days', icon: Trophy, earned: false, progress: 85, requirement: 7, category: 'streak' },
  { id: 9, name: 'Hydration Hero', description: 'Meet water goal for 30 days', icon: Cloud, earned: true, progress: 100, requirement: 30, category: 'habit' },
  { id: 10, name: 'Mindful Master', description: 'Meditate for 100 hours', icon: Brain, earned: false, progress: 45, requirement: 100, category: 'habit' },
  { id: 11, name: 'Heart Hero', description: 'Maintain a healthy habit for 100 days', icon: Heart, earned: false, progress: 28, requirement: 100, category: 'streak' },
  { id: 12, name: 'Champion', description: 'Earn all other badges', icon: Crown, earned: false, progress: 42, requirement: 12, category: 'special' },
];

const leaderboardData = [
  { rank: 1, name: 'Alex Chen', score: 12450, avatar: 'A', streak: 156 },
  { rank: 2, name: 'Sarah Miller', score: 11820, avatar: 'S', streak: 89 },
  { rank: 3, name: 'James Wilson', score: 10560, avatar: 'J', streak: 67 },
  { rank: 4, name: 'Emily Davis', score: 9870, avatar: 'E', streak: 45 },
  { rank: 5, name: 'Michael Brown', score: 8920, avatar: 'M', streak: 34 },
  { rank: 6, name: 'Harshit (You)', score: 7650, avatar: 'H', streak: 14, isUser: true },
];

const progressData = [
  { label: 'Total Points', current: 7650, max: 15000, color: 'indigo' },
  { label: 'Badges Earned', current: 4, max: 12, color: 'yellow' },
  { label: 'Current Streak', current: 14, max: 30, color: 'orange' },
  { label: 'Completion Rate', current: 92, max: 100, suffix: '%', color: 'green' },
];

const categories = ['All', 'Streak', 'Milestone', 'Habit', 'Time', 'Special'];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [unlockingBadge, setUnlockingBadge] = useState(null);

  const triggerUnlock = (badgeId) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge || badge.earned) return;
    
    setUnlockingBadge(badgeId);
    
    const rect = document.getElementById(`badge-${badgeId}`)?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#fbbf24', '#f59e0b', '#fcd34d', '#ef4444', '#22c55e'],
      disableForReducedMotion: true,
    });
    
    setTimeout(() => setUnlockingBadge(null), 2000);
  };

  const filteredBadges = selectedCategory === 'All' 
    ? badges 
    : badges.filter(b => b.category === selectedCategory.toLowerCase());

  return (
    <DashboardLayout>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item}>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" />
            Achievements
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your milestones and compete with others
          </p>
        </motion.div>

        {/* Progress Cards */}
        <motion.div variants={item}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {progressData.map((progress, index) => (
              <ProgressCard key={progress.label} {...progress} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={item} className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Badge Grid */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Badges</h3>
            <button
              onClick={() => triggerUnlock(6)}
              className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full text-sm hover:bg-yellow-500/20 transition-colors"
            >
              <Play className="w-4 h-4" />
              Demo Unlock
            </button>
          </div>
          <motion.div
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                unlocking={unlockingBadge === badge.id}
                id={`badge-${badge.id}`}
                onClick={() => setSelectedBadge(badge)}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </h3>
          <Leaderboard data={leaderboardData} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
