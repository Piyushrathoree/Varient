'use client';

import { forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';

export interface MorphingTextProps {
  /** Words cycled with a blur-crossfade morph. */
  words: string[];
  /** Milliseconds between word swaps. Default 2500. */
  interval?: number;
  /** When true, cycling pauses on the current word. Default false. */
  isPaused?: boolean;
  className?: string;
}

/**
 * Cycles through `words` with a blur-crossfade morph (opacity, filter blur,
 * slight y). Distinct from `WordRotate`, which slides vertically. Under
 * `prefers-reduced-motion` words swap instantly with no blur animation.
 */
export const MorphingText = forwardRef<HTMLSpanElement, MorphingTextProps>(
  ({ words, interval = 2500, isPaused = false, className }, ref) => {
    const [index, setIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const safeWords = words.length > 0 ? words : [''];
    const currentWord = safeWords[index % safeWords.length] ?? '';

    useEffect(() => {
      if (safeWords.length <= 1 || isPaused) return;

      const timer = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % safeWords.length);
      }, interval);

      return () => window.clearInterval(timer);
    }, [safeWords, interval, isPaused]);

    const motionTransition = shouldReduceMotion
      ? DURATION_INSTANT
      : { duration: DURATION.slow, ease: EASE_OUT };

    return (
      <span
        ref={ref}
        aria-live="polite"
        aria-atomic="true"
        className={cn('relative inline-block text-brand', className)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${currentWord}-${index}`}
            className="inline-block"
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 8, filter: 'blur(8px)' }
            }
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, filter: 'blur(8px)' }
            }
            transition={motionTransition}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  },
);

MorphingText.displayName = 'MorphingText';
