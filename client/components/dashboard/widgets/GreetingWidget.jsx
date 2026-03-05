'use client';

import { useTypewriter } from '@/hooks/useTypewriter';

export function GreetingWidget() {
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  const fullText = `${greeting}, Harshit 👋`;
  const { text } = useTypewriter(fullText, 50);

  return (
    <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">
      {text}
      <span className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-1 translate-y-[2px] animate-pulse" />
    </div>
  );
}
