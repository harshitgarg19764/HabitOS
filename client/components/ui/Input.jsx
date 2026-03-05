'use client';

import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <div className={cn('relative', className)}>
      <motion.input
        ref={ref}
        type={inputType}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        onChange={handleChange}
        className={cn(
          'peer w-full h-14 px-4 pt-6 pb-2 rounded-xl bg-background border border-input',
          'text-sm md:text-base transition-all duration-200',
          'placeholder-transparent',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500'
        )}
        placeholder={label}
        {...props}
      />
      <label
        className={cn(
          'absolute left-4 transition-all duration-200 pointer-events-none',
          focused || hasValue
            ? 'top-2 text-xs text-muted-foreground'
            : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground/70',
          focused && 'text-primary',
          error && 'text-red-500'
        )}
      >
        {label}
      </label>

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <AnimatePresence mode="wait">
            {showPassword ? (
              <motion.div
                key="eye-off"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <EyeOff className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="eye"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Eye className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -bottom-5 left-0 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
