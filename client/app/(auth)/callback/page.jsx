'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const statusMessages = [
  'Authenticating with Google...',
  'Verifying your account...',
  'Setting up your profile...',
  'Almost there...',
];

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const error = searchParams.get('error');
    const token = searchParams.get('token');

    // Simulate loading states
    const statusInterval = setInterval(() => {
      setStatus((prev) => {
        if (prev < statusMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    // Check for errors from URL
    if (error) {
      clearInterval(statusInterval);
      setResult({ success: false, message: 'Authentication failed. Please try again.' });
      return;
    }

    // Simulate successful auth
    const timeout = setTimeout(() => {
      clearInterval(statusInterval);
      setStatus(statusMessages.length - 1);
      
      // For demo purposes, treat as success if no error
      // In production, you'd validate the token from URL
      setResult({ success: true });
      
      // Redirect after showing success
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }, 3500);

    return () => {
      clearInterval(statusInterval);
      clearTimeout(timeout);
    };
  }, [searchParams, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-heading font-bold">
          Habit<span className="text-primary">OS</span>
        </h1>
      </motion.div>

      {/* Status Icon */}
      <motion.div
        className="mb-8 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        {result ? (
          result.success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
            >
              <XCircle className="w-10 h-10 text-red-500" />
            </motion.div>
          )
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Loader2 className="w-10 h-10 text-primary" />
          </motion.div>
        )}
      </motion.div>

      {/* Status Message */}
      <div className="h-16 mb-8">
        {result ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-lg ${
              result.success 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}
          >
            {result.success 
              ? 'Welcome to HabitOS!' 
              : result.message}
          </motion.p>
        ) : (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-foreground"
          >
            {statusMessages[status]}
          </motion.p>
        )}
      </div>

      {/* Error Action */}
      {result && !result.success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => router.push('/login')}
            className="text-primary hover:underline"
          >
            Return to login
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Suspense fallback={
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }>
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}
