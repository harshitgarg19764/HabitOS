'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function QuoteCard({ quotes, currentIndex, isLoading }) {
  const currentQuote = quotes[currentIndex];

  return (
    <div className="min-h-[140px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <p className="text-lg font-medium italic mb-3">
            "{currentQuote.text}"
          </p>
          <cite className="text-sm text-muted-foreground not-italic">
            — {currentQuote.author}
          </cite>
        </motion.blockquote>
      </AnimatePresence>
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-card/50"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-sm text-muted-foreground"
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
