'use client';

import { forwardRef, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';

export interface FlipWordsProps {
  /** Words rotated with a 3D flip transition, one at a time. */
  words: string[];
  /** Milliseconds between word flips. Default 2500. */
  duration?: number;
  className?: string;
}

/**
 * Cycles through `words` with a perspective rotateX flip. Under
 * `prefers-reduced-motion` words still rotate on the same interval but swap
 * instantly with no 3D transform.
 *
 * Accessibility: the wrapper is `aria-live="polite"` and `aria-atomic="true"`
 * so each word change is announced without interrupting the user — chosen over
 * a static sr-only list because the visible word is the meaningful live content.
 */
export const FlipWords = forwardRef<HTMLSpanElement, FlipWordsProps>(
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
        className={cn(
          'relative inline-block [perspective:800px] text-brand',
          className,
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${currentWord}-${index}`}
            className="inline-block origin-center"
            initial={
              shouldReduceMotion
                ? { opacity: 1, rotateX: 0 }
                : { opacity: 0, rotateX: 90 }
            }
            animate={{ opacity: 1, rotateX: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, rotateX: -90 }
            }
            transition={motionTransition}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  },
);

FlipWords.displayName = 'FlipWords';
