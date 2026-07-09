'use client';

import { forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';

export interface WordRotateProps {
  /** Words cycled in place, one at a time. */
  words: string[];
  /** Milliseconds between word swaps. Default 2500. */
  duration?: number;
  className?: string;
}

/**
 * Cycles through `words` in place with a rise-and-fade transition.
 * Under `prefers-reduced-motion` words swap instantly with no transform.
 *
 * Accessibility: the container is `aria-live="polite"` so assistive tech
 * announces each word change without interrupting the user.
 */
export const WordRotate = forwardRef<HTMLSpanElement, WordRotateProps>(
  ({ words, duration = 2500, className }, ref) => {
    const [index, setIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const safeWords = words.length > 0 ? words : [''];
    const currentWord = safeWords[index % safeWords.length] ?? '';

    useEffect(() => {
      if (safeWords.length <= 1) return;

      const interval = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % safeWords.length);
      }, duration);

      return () => window.clearInterval(interval);
    }, [safeWords, duration]);

    const motionTransition = shouldReduceMotion
      ? DURATION_INSTANT
      : { duration: DURATION.slow, ease: EASE_OUT };

    return (
      <span
        ref={ref}
        aria-live="polite"
        aria-atomic="true"
        className={cn('relative inline-block overflow-hidden text-brand', className)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${currentWord}-${index}`}
            className="inline-block"
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={motionTransition}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  },
);

WordRotate.displayName = 'WordRotate';
