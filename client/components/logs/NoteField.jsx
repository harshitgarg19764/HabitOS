'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NoteField({ value, onChange, placeholder = 'Add a note...' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const charCount = value?.length || 0;
  const maxChars = 500;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {isExpanded || value ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className={cn(
              'relative rounded-xl border transition-all duration-200',
              isFocused ? 'border-primary ring-2 ring-primary/20' : 'border-border'
            )}>
              <textarea
                ref={textareaRef}
                value={value || ''}
                onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                rows={isExpanded ? 4 : 2}
                className="w-full p-4 bg-transparent resize-none focus:outline-none text-sm"
              />
              
              {/* Character Count */}
              <div className={cn(
                'absolute bottom-2 right-3 text-xs',
                charCount > maxChars * 0.9 ? 'text-red-500' : 'text-muted-foreground'
              )}>
                {charCount}/{maxChars}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Expand Button */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded) {
            setTimeout(() => textareaRef.current?.focus(), 100);
          }
        }}
        className={cn(
          'flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors',
          'py-2 px-3 rounded-lg hover:bg-muted/50'
        )}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            <span>Less</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            <span>{value ? 'Edit note' : 'Add note'}</span>
          </>
        )}
      </button>
    </div>
  );
}
