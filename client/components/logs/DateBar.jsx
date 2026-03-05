'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DateBar({ selectedDate, onDateChange }) {
  const [direction, setDirection] = useState(0);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateDate = (direction) => {
    setDirection(direction);
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    onDateChange(newDate);
  };

  const goToToday = () => {
    setDirection(0);
    onDateChange(new Date());
  };

  // Generate dates for the week view
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateDate(-1)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={selectedDate.toDateString()}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
            {isToday(selectedDate) && (
              <span className="text-xs text-primary font-medium">Today</span>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => navigateDate(1)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week View */}
      <div className="flex justify-between">
        {getWeekDates().map((date) => (
          <button
            key={date.toDateString()}
            onClick={() => {
              setDirection(date > selectedDate ? 1 : -1);
              onDateChange(date);
            }}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted',
              isToday(date) && date.toDateString() !== selectedDate.toDateString() &&
                'ring-2 ring-primary ring-inset'
            )}
          >
            <span className="text-xs opacity-70">
              {date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
            </span>
            <span className="text-sm font-medium">{date.getDate()}</span>
          </button>
        ))}
      </div>

      {/* Today Button */}
      {!isToday(selectedDate) && (
        <button
          onClick={goToToday}
          className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-colors"
        >
          Go to Today
        </button>
      )}
    </div>
  );
}
