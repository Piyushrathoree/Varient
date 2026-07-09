'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export type BlurFadeDirection = 'up' | 'down' | 'left' | 'right';

export interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  /** Slide distance in pixels along the chosen axis. */
  yOffset?: number;
  /** Initial blur amount, e.g. `6px`. */
  blur?: string;
  /** When true (default), reveal triggers once the wrapper scrolls into view. */
  inView?: boolean;
  /** Slide direction for the entrance. */
  direction?: BlurFadeDirection;
}

function getAxisOffset(
  direction: BlurFadeDirection,
  offset: number,
): { x: number; y: number } {
  switch (direction) {
    case 'down':
      return { x: 0, y: -offset };
    case 'left':
      return { x: offset, y: 0 };
    case 'right':
      return { x: -offset, y: 0 };
    case 'up':
    default:
      return { x: 0, y: offset };
  }
}

/**
 * Fades, de-blurs, and slides children into view on mount or scroll.
 * Respects `prefers-reduced-motion` by rendering children immediately.
 */
export const BlurFade = forwardRef<HTMLDivElement, BlurFadeProps>(
  (
    {
      children,
      className,
      delay = 0,
      duration = 0.4,
      yOffset = 24,
      blur = '6px',
      inView = true,
      direction = 'up',
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: true, margin: '-80px' });
    const shouldReveal = inView ? isInView : true;
    const axisOffset = getAxisOffset(direction, yOffset);

    if (shouldReduceMotion) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(className)}
        initial={{
          opacity: 0,
          filter: `blur(${blur})`,
          x: axisOffset.x,
          y: axisOffset.y,
        }}
        animate={
          shouldReveal
            ? {
                opacity: 1,
                filter: 'blur(0px)',
                x: 0,
                y: 0,
              }
            : {
                opacity: 0,
                filter: `blur(${blur})`,
                x: axisOffset.x,
                y: axisOffset.y,
              }
        }
        transition={{
          duration,
          delay,
          ease: EASE_OUT,
        }}
      >
        {children}
      </motion.div>
    );
  },
);

BlurFade.displayName = 'BlurFade';
