'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import { aiAPI } from '@/lib/api';

export function QuoteWidget() {
  const [quote, setQuote] = useState({ text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setIsRefreshing(true);
    try {
      const response = await aiAPI.getQuote();
      if (response.data) {
        setQuote(response.data);
      }
    } catch (err) {
      console.warn('Failed to fetch AI quote', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Daily Inspiration</h3>
          <Sparkles className="w-3 h-3 text-indigo-500" />
        </div>
        <button
          onClick={fetchQuote}
          disabled={isRefreshing}
          className="p-2 rounded-lg hover:bg-indigo-500/10 transition-colors disabled:opacity-50"
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-4 h-4 text-indigo-500" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={quote.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <p className="text-lg font-medium text-foreground italic">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="mt-3 text-sm text-muted-foreground">
            — {quote.author || 'AI Wisdom'}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
