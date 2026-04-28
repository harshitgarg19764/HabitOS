'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ChevronDown, ChevronUp, Lightbulb, TrendingUp, Target, Zap } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InsightCard } from '@/components/insights/InsightCard';
import { GaugeChart } from '@/components/insights/GaugeChart';
import { InsightSkeleton } from '@/components/insights/InsightSkeleton';
import { QuoteCard } from '@/components/insights/QuoteCard';
import { SuggestionChips } from '@/components/insights/SuggestionChips';
import { WeeklyNarrative } from '@/components/insights/WeeklyNarrative';
import { aiAPI } from '@/lib/api';
import { useEffect } from 'react';

const mockInsights = [
  {
    id: 1,
    title: 'Morning Routine Optimization',
    description: 'Your meditation habit shows strong correlation with improved sleep quality. Consider extending it by 5 minutes.',
    confidence: 87,
    type: 'positive',
  },
  {
    id: 2,
    title: 'Consistency Alert',
    description: 'Water intake has dropped 30% this week. Setting reminders could help maintain your 2L daily goal.',
    confidence: 92,
    type: 'warning',
  },
  {
    id: 3,
    title: 'Peak Performance Time',
    description: 'You complete 80% of habits before 10 AM. Morning is your most productive window.',
    confidence: 78,
    type: 'neutral',
  },
  {
    id: 4,
    title: 'Habit Stacking Opportunity',
    description: 'Reading consistently follows your gym session. Consider pairing them for a stronger routine.',
    confidence: 85,
    type: 'positive',
  },
];

const suggestions = [
  'Add 10 min meditation before breakfast',
  'Set water reminder every 2 hours',
  'Try habit stacking with gym + reading',
  'Increase sleep goal to 8 hours',
  'Add weekend workout variation',
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

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isNarrativeExpanded, setIsNarrativeExpanded] = useState(false);
  const [insightsList, setInsightsList] = useState([]);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState('');
  const [quotes, setQuotes] = useState([
    { text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' }
  ]);

  useEffect(() => {
    async function initAI() {
      setIsLoading(true);
      try {
        const [insightsRes, quoteRes, suggestionsRes, summaryRes] = await Promise.all([
          aiAPI.getInsights(),
          aiAPI.getQuote({ moodScore: 7 }),
          aiAPI.getSuggestions(),
          aiAPI.getSummary()
        ]);
        
        if (insightsRes.data) setInsightsList(insightsRes.data);
        if (quoteRes.data) setQuotes([{ text: quoteRes.data.quote, author: quoteRes.data.author }]);
        if (suggestionsRes.data) setSuggestionsList(suggestionsRes.data);
        if (summaryRes.data?.summary) setWeeklySummary(summaryRes.data.summary);
      } catch (err) {
        console.warn(err);
      } finally {
        setIsLoading(false);
      }
    }
    initAI();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const quoteRes = await aiAPI.getQuote({ moodScore: Math.floor(Math.random() * 10) });
      if (quoteRes.data) setQuotes([{ text: quoteRes.data.quote, author: quoteRes.data.author }]);
      setCurrentQuote(0);
    } catch(err) {}
    setIsLoading(false);
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
            <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              AI Insights
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalized intelligence to optimize your habits
            </p>
          </div>
        </motion.div>

        {/* Top Row - Gauge & Quote */}
        <motion.div variants={item}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Overall Score */}
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Overall Habit Score
              </h3>
              <div className="flex items-center justify-center">
                <GaugeChart score={78} />
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-card rounded-2xl p-6 border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Daily Motivation
                </h3>
                <motion.button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isLoading ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
              <QuoteCard
                quotes={quotes}
                currentIndex={currentQuote}
                isLoading={isLoading}
              />
            </div>
          </div>
        </motion.div>

        {/* Weekly Narrative */}
        <motion.div variants={item}>
          <WeeklyNarrative
            text={weeklySummary}
            expanded={isNarrativeExpanded}
            onToggle={() => setIsNarrativeExpanded(!isNarrativeExpanded)}
          />
        </motion.div>

        {/* Insight Cards */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Insights
          </h3>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightSkeleton />
              <InsightSkeleton />
            </div>
          ) : insightsList.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground bg-muted/20 rounded-2xl border border-dashed">
              No insights available yet. Track more habits to unlock intelligence!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insightsList.map((insight, idx) => (
                <InsightCard key={insight.id || idx} insight={insight} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Suggestion Chips */}
        <motion.div variants={item}>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Suggestions
          </h3>
          <SuggestionChips suggestions={suggestionsList} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
