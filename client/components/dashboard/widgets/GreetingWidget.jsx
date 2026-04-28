'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useTypewriter } from '@/hooks/useTypewriter';

export function GreetingWidget() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  const firstName = user?.name?.split(' ')[0] || 'Member';
  const fullText = `${greeting}, ${firstName} 👋`;
  const { text } = useTypewriter(fullText, 50);

  return (
    <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-1 translate-y-[2px] animate-pulse" />
    </div>
  );
}
