'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, Crown, Zap, Flame, Target, BookOpen, Brain, Heart, Sun, Moon, Cloud, Sparkles, Calendar, Play, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BadgeCard } from '@/components/achievements/BadgeCard';
import { Leaderboard } from '@/components/achievements/Leaderboard';
import { ProgressCard } from '@/components/achievements/ProgressCard';
import { achievementsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const iconMap = {
  'First Step': Star,
  'Week Warrior': Flame,
  'Century Club': Target,
  'Month Master': Calendar,
  'Bookworm': BookOpen,
  'Hydration Hero': Cloud,
};

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
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const [achRes, leadRes] = await Promise.all([
          achievementsAPI.getAll(),
          achievementsAPI.getLeaderboard()
        ]);
        setData(achRes.data);
        setLeaderboard(leadRes.data);
      } catch (err) {
        console.error('Failed to load achievements', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Calculating your milestones...</p>
        </div>
      </DashboardLayout>
    );
  }

  const badges = (data?.badges || []).map(b => ({
    ...b,
    icon: iconMap[b.name] || Award
  }));

  const progressData = [
    { label: 'Total Points', current: data?.stats.totalPoints || 0, max: 15000, color: 'indigo' },
    { label: 'Badges Earned', current: data?.stats.badgesEarned || 0, max: badges.length, color: 'yellow' },
    { label: 'Best Streak', current: data?.stats.bestStreak || 0, max: 30, color: 'orange' },
    { label: 'Total habits', current: data?.stats.totalCompletions || 0, max: 100, color: 'green' },
  ];

  const categories = ['All', 'Streak', 'Milestone', 'Habit', 'Time', 'Special'];
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
        <motion.div variants={item}>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" />
            Achievements
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time milestones based on your habit journey
          </p>
        </motion.div>

        <motion.div variants={item}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {progressData.map((progress, index) => (
              <ProgressCard key={progress.label} {...progress} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

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

        <motion.div variants={item}>
          <h3 className="font-semibold text-lg mb-4">Your Badges</h3>
          <motion.div
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                id={`badge-${badge.id}`}
              />
            ))}
          </motion.div>
        </motion.div>

        {leaderboard.length > 0 && (
          <motion.div variants={item}>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Community Leaderboard
            </h3>
            <Leaderboard 
              data={[
                ...leaderboard,
                { rank: '?', name: `${user?.name} (You)`, score: data?.stats.totalPoints || 0, streak: data?.stats.bestStreak || 0, isUser: true }
              ]} 
            />
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
