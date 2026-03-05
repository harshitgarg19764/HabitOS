'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const quotes = [
  { text: "We are what we repeatedly do.", author: "Aristotle" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
  { text: "Your habits will determine your future.", author: "Jack Canfield" },
  { text: "First we make our habits, then our habits make us.", author: "Charles Noble" },
];

export function QuoteWidget() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Daily Inspiration</h3>
        <button
          onClick={refreshQuote}
          className="p-2 rounded-lg hover:bg-indigo-500/10 transition-colors"
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
          key={quoteIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <p className="text-lg font-medium text-foreground italic">
            &ldquo;{quotes[quoteIndex].text}&rdquo;
          </p>
          <footer className="mt-3 text-sm text-muted-foreground">
            — {quotes[quoteIndex].author}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
