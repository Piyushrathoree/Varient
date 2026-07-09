'use client';

import { forwardRef, useState, type RefObject } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';

export interface ScrollProgressBarProps {
  className?: string;
  /** Tailwind classes for the fill bar. Default neutral foreground fill. */
  color?: string;
  /** Bar thickness in pixels. Default 3. */
  height?: number;
  position?: 'top' | 'bottom';
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** When false, uses absolute positioning for in-frame demos. Default true. */
  isFixed?: boolean;
}

/**
 * Horizontal bar that tracks scroll progress via scaleX.
 * Uses a spring for smooth motion; under `prefers-reduced-motion` the fill
 * binds directly to scroll position (still functional, not decorative).
 */
export const ScrollProgressBar = forwardRef<HTMLDivElement, ScrollProgressBarProps>(
  (
    {
      className,
      color = 'bg-foreground/55',
      height = 3,
      position = 'top',
      scrollContainerRef,
      isFixed = true,
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [progressPercent, setProgressPercent] = useState(0);

    const { scrollYProgress } = useScroll({
      container: scrollContainerRef,
    });

    const scaleXSpring = useSpring(scrollYProgress, SPRING_SNAPPY);

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });

    const positioning = isFixed ? 'fixed' : 'absolute';

    return (
      <div
        ref={ref}
        className={cn(
          positioning,
          'inset-x-0 z-50 overflow-hidden',
          position === 'top' ? 'top-0' : 'bottom-0',
          className,
        )}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
        aria-label="Scroll progress"
      >
        <motion.div
          className={cn('h-full w-full origin-left', color)}
          style={{
            scaleX: prefersReducedMotion ? scrollYProgress : scaleXSpring,
          }}
        />
      </div>
    );
  },
);

ScrollProgressBar.displayName = 'ScrollProgressBar';
