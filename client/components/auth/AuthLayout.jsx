'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Zap } from 'lucide-react';

const quotes = [
  { text: "We are what we repeatedly do.", author: "Aristotle" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
];

const brandElements = [
  { icon: Target, delay: 0, x: '10%', y: '20%', size: 'w-12 h-12' },
  { icon: TrendingUp, delay: 0.2, x: '80%', y: '30%', size: 'w-16 h-16' },
  { icon: Zap, delay: 0.4, x: '20%', y: '70%', size: 'w-10 h-10' },
  { icon: Sparkles, delay: 0.6, x: '75%', y: '75%', size: 'w-14 h-14' },
];

export function AuthLayout({ children }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      targetY: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
    
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 aurora-gradient opacity-90" />
        
        {/* Animated Brand Elements */}
        {brandElements.map((el, i) => (
          <motion.div
            key={i}
            className={`absolute ${el.size} text-white/20`}
            style={{ left: el.x, top: el.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              delay: el.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <el.icon className="w-full h-full" />
          </motion.div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              initial={{
                x: p.x,
                y: p.y,
              }}
              animate={{
                y: [null, p.targetY],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Brand Text */}
        <motion.div 
          className="relative z-10 text-center px-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl font-heading font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Habit<span className="text-white/80">OS</span>
          </motion.h1>
          
          {/* Quote Cycling */}
          <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-white/80 italic max-w-md"
              >
                &ldquo;{quotes[quoteIndex].text}&rdquo;
                <span className="block text-sm text-white/60 mt-2 not-italic">
                  — {quotes[quoteIndex].author}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-heading font-bold">
              Habit<span className="text-primary">OS</span>
            </h1>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
