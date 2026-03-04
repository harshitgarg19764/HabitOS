"use client";

import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

export function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !animatedRef.current) {
      animatedRef.current = true;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setCount(Math.floor(easeProgress * target));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isVisible, target, duration]);

  return { ref, count };
}
