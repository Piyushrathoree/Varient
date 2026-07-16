'use client';

import { forwardRef, useId, useMemo, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

const DEFAULT_COLORS = [
  'var(--color-foreground)',
  'var(--color-muted-foreground)',
  'var(--color-foreground)',
] as const;

export interface GradientTextProps {
  /** Headline text rendered with an animated gradient fill. */
  children: string;
  /** Gradient stop colors — use semantic CSS variables. */
  colors?: string[];
  /** Sweep cycle duration in seconds. Default 6. */
  duration?: number;
  className?: string;
}

/**
 * Animated gradient fill sweeping across headline text via `background-position`.
 * Under `prefers-reduced-motion` the gradient renders statically with no sweep.
 */
export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ children, colors = [...DEFAULT_COLORS], duration = 6, className }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const reactId = useId();
    const animationName = useMemo(
      () => `varient-gradient-sweep-${reactId.replace(/:/g, '')}`,
      [reactId],
    );

    const internalRef = useRef<HTMLSpanElement>(null);
    const isViewportActive = useViewportActive(internalRef);
    const isAnimating = !shouldReduceMotion && isViewportActive;

    const gradientStops = colors.length > 0 ? colors : [...DEFAULT_COLORS];
    const backgroundImage = `linear-gradient(90deg, ${gradientStops.join(', ')})`;

    return (
      <>
        {!shouldReduceMotion ? (
          <style>{`
            @keyframes ${animationName} {
              0% { background-position: 0% 50%; }
              100% { background-position: 200% 50%; }
            }
          `}</style>
        ) : null}
        <span
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(
            'inline-block bg-clip-text text-transparent',
            'bg-[length:200%_auto]',
            className,
          )}
          style={{
            backgroundImage,
            backgroundPosition: shouldReduceMotion ? '0% 50%' : undefined,
            animation: shouldReduceMotion
              ? undefined
              : `${animationName} ${duration}s linear infinite`,
            animationPlayState: isAnimating ? 'running' : 'paused',
          }}
        >
          {children}
        </span>
      </>
    );
  },
);

GradientText.displayName = 'GradientText';
