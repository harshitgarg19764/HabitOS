'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Check } from 'lucide-react';
import { BooleanToggle } from './BooleanToggle';
import { NumericStepper } from './NumericStepper';
import { NoteField } from './NoteField';
import { cn } from '@/lib/utils';

export function LogItem({ habit, log, onUpdate, index }) {
  const [value, setValue] = useState(log?.value ?? (habit.type === 'boolean' ? false : 0));
  const [note, setNote] = useState(log?.note || '');

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onUpdate(habit.id, { value: newValue, note });
  };

  const handleNoteChange = (newNote) => {
    setNote(newNote);
    onUpdate(habit.id, { value, note: newNote });
  };

  const isCompleted = habit.type === 'boolean' ? value : value > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        'bg-card rounded-2xl border border-border p-5 transition-all',
        isCompleted && 'border-green-500/30 bg-green-500/5'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon & Info */}
        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${habit.color}20` }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold">{habit.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{habit.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Toggle / Stepper */}
        <div className="flex-shrink-0">
          {habit.type === 'boolean' ? (
            <BooleanToggle
              value={value}
              onChange={handleValueChange}
              color={habit.color}
            />
          ) : (
            <div className="w-40">
              <NumericStepper
                value={value}
                onChange={handleValueChange}
                min={0}
                max={habit.goal || 100}
                step={1}
                unit={habit.unit}
              />
            </div>
          )}
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 pt-4 border-t border-border">
        <NoteField
          value={note}
          onChange={handleNoteChange}
          placeholder={`How did "${habit.name}" go today?`}
        />
      </div>

      {/* Completion Indicator */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-4 right-4"
        >
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
