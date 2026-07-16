'use client';

import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion, type MotionStyle } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface MovingBorderProps {
  /** Wrapped content — typically a button or card. */
  children: ReactNode;
  /** Seconds for one full lap around the border track. */
  duration?: number;
  /** Corner radius in pixels — should match the inner content radius. */
  borderRadius?: number;
  /** Highlight blob size in pixels. */
  highlightSize?: number;
  /** Start color of the traveling highlight. */
  colorFrom?: string;
  /** End color of the traveling highlight. */
  colorTo?: string;
  /** Pauses the traveling highlight loop when true, regardless of viewport visibility. */
  isPaused?: boolean;
  className?: string;
}

export interface MovingBorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Seconds for one full lap around the border track. */
  duration?: number;
  /** Corner radius in pixels. */
  borderRadius?: number;
  isDisabled?: boolean;
  /** Pauses the traveling highlight loop when true, regardless of viewport visibility. */
  isPaused?: boolean;
}

const DEFAULT_COLOR_FROM = 'var(--color-brand)';
const DEFAULT_COLOR_TO = 'var(--color-brand-secondary)';

const BORDER_MASK_STYLE = {
  WebkitMaskImage:
    'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
  maskImage: 'linear-gradient(transparent, transparent), linear-gradient(#000, #000)',
  WebkitMaskClip: 'padding-box, border-box',
  maskClip: 'padding-box, border-box',
  WebkitMaskComposite: 'source-in',
  maskComposite: 'intersect',
} as const;

/**
 * Wrapper that draws a highlight traveling around the border perimeter via
 * CSS `offset-path`. Under `prefers-reduced-motion` renders a static gradient
 * border with no travel.
 */
export const MovingBorder = forwardRef<HTMLDivElement, MovingBorderProps>(
  (
    {
      children,
      duration = 8,
      borderRadius = 12,
      highlightSize = 80,
      colorFrom = DEFAULT_COLOR_FROM,
      colorTo = DEFAULT_COLOR_TO,
      isPaused = false,
      className,
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const isViewportActive = useViewportActive(containerRef);
    const isAnimating = !isPaused && isViewportActive;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('relative rounded-[inherit]', className)}
        style={{ borderRadius }}
      >
        {shouldReduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-brand/30"
          />
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
            style={{
              borderWidth: 1.5,
              ...BORDER_MASK_STYLE,
            }}
          >
            <motion.div
              className="absolute aspect-square rounded-full bg-gradient-to-l from-[var(--border-from)] via-[var(--border-to)] to-transparent"
              style={
                {
                  width: highlightSize,
                  offsetPath: `rect(0 auto auto 0 round ${borderRadius}px)`,
                  '--border-from': colorFrom,
                  '--border-to': colorTo,
                } as MotionStyle
              }
              initial={{ offsetDistance: '0%' }}
              animate={isAnimating ? { offsetDistance: ['0%', '100%'] } : {}}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration,
              }}
            />
          </div>
        )}

        <div className="relative z-10 rounded-[inherit]" style={{ borderRadius }}>
          {children}
        </div>
      </div>
    );
  },
);

MovingBorder.displayName = 'MovingBorder';

/**
 * Convenience button with a traveling border highlight baked in.
 */
export const MovingBorderButton = forwardRef<HTMLButtonElement, MovingBorderButtonProps>(
  (
    {
      children,
      className,
      duration = 8,
      borderRadius = 10,
      isDisabled = false,
      isPaused = false,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <MovingBorder duration={duration} borderRadius={borderRadius} isPaused={isPaused}>
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          aria-disabled={isDisabled || undefined}
          className={cn(
            'inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-[inherit] border border-border bg-card px-4 text-sm font-medium text-foreground transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            className,
          )}
          style={{ borderRadius }}
          {...props}
        >
          {children}
        </button>
      </MovingBorder>
    );
  },
);

MovingBorderButton.displayName = 'MovingBorderButton';
