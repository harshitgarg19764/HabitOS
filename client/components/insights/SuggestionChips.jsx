'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const container = {
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const chip = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export function SuggestionChips({ suggestions }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-wrap gap-3"
    >
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={index}
          variants={chip}
          className="group flex items-center gap-2 px-4 py-2.5 bg-card border rounded-full text-sm font-medium hover:bg-muted/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-primary/30"
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
}
