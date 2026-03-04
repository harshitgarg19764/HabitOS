"use client";

import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';

export function useTypewriter(text: string, speed: number = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const { ref, isVisible } = useScrollReveal();
  const animatedRef = useRef(false);

  useEffect(() => {
    if (isVisible && !animatedRef.current) {
      setIsTyping(true);
      animatedRef.current = true;
      let i = 0;

      const typeNextChar = () => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          setTimeout(typeNextChar, speed + (Math.random() * 30)); // Add slight randomness for natural feel
        } else {
          setIsTyping(false);
        }
      };

      typeNextChar();
    }
  }, [isVisible, text, speed]);

  return { ref, text: displayedText, isTyping };
}
