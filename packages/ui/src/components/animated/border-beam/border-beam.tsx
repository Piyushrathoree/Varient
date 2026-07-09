'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion, type MotionStyle } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Beam length in pixels. */
  size?: number;
  /** Seconds for one full loop around the border. */
  duration?: number;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Start color of the beam gradient. */
  colorFrom?: string;
  /** End color of the beam gradient. */
  colorTo?: string;
  /** Border width in pixels. */
  borderWidth?: number;
}

/**
 * Wraps its children and draws an animated beam of light traveling along the
 * container border via CSS `offset-path`. Under `prefers-reduced-motion`,
 * renders a static subtle border with no travel.
 */
export const BorderBeam = forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      className,
      children,
      size = 150,
      duration = 15,
      delay = 0,
      colorFrom = 'var(--color-brand)',
      colorTo = 'var(--color-brand-secondary)',
      borderWidth = 1.5,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <div
        ref={ref}
        className={cn('relative rounded-[inherit]', className)}
        {...props}
      >
        {children}
        {shouldReduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-foreground/15"
            style={{ borderWidth }}
          />
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
            style={{
              borderWidth,
              WebkitMaskImage:
                'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
              maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
              WebkitMaskClip: 'padding-box, border-box',
              maskClip: 'padding-box, border-box',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          >
            <motion.div
              className="absolute aspect-square bg-gradient-to-l from-[var(--beam-from)] via-[var(--beam-to)] to-transparent"
              style={
                {
                  width: size,
                  offsetPath: `rect(0 auto auto 0 round ${size}px)`,
                  '--beam-from': colorFrom,
                  '--beam-to': colorTo,
                } as MotionStyle
              }
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: ['0%', '100%'] }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration,
                delay: -delay,
              }}
            />
          </div>
        )}
      </div>
    );
  },
);

BorderBeam.displayName = 'BorderBeam';
