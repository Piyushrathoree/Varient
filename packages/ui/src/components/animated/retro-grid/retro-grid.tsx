'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface RetroGridProps extends HTMLAttributes<HTMLDivElement> {
  /** Content rendered above the grid plane. */
  children?: ReactNode;
  /** Grid cell size in pixels. */
  cellSize?: number;
  /** Perspective depth in pixels. */
  perspective?: number;
  /** Tilt angle of the grid plane in degrees. */
  angle?: number;
  /** Seconds for one scroll loop. */
  speed?: number;
  /** When true, grid lines pick up a faint brand tint. */
  isBrandTinted?: boolean;
}

const GRID_LINE_NEUTRAL =
  'color-mix(in oklab, var(--color-border) 45%, transparent)';

const GRID_LINE_BRAND =
  'color-mix(in oklab, var(--color-brand) 18%, var(--color-border) 28%)';

/**
 * Scrolling perspective grid background — lines scroll toward the viewer on an
 * angled plane, fading into the canvas via a radial mask. Children render in a
 * relative overlay slot. Under `prefers-reduced-motion`, the grid is static.
 */
export const RetroGrid = forwardRef<HTMLDivElement, RetroGridProps>(
  (
    {
      className,
      children,
      cellSize = 48,
      perspective = 220,
      angle = 62,
      speed = 18,
      isBrandTinted = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const animationId = useId().replace(/:/g, '');
    const gridClass = `retro-grid-plane-${animationId}`;
    const lineColor = isBrandTinted ? GRID_LINE_BRAND : GRID_LINE_NEUTRAL;

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden bg-background', className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black_70%)]"
        >
          {!shouldReduceMotion ? (
            <style>
              {`
                @keyframes retro-grid-scroll-${animationId} {
                  from { transform: perspective(${perspective}px) rotateX(${angle}deg) translateY(0); }
                  to { transform: perspective(${perspective}px) rotateX(${angle}deg) translateY(${cellSize}px); }
                }
                .${gridClass} {
                  animation: retro-grid-scroll-${animationId} ${speed}s linear infinite;
                }
              `}
            </style>
          ) : null}

          <div
            className={cn(
              'absolute left-[-50%] top-[-50%] h-[200%] w-[200%] origin-top',
              !shouldReduceMotion && gridClass,
            )}
            style={{
              backgroundImage: `
                linear-gradient(to right, ${lineColor} 1px, transparent 1px),
                linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
              `,
              backgroundSize: `${cellSize}px ${cellSize}px`,
              transform: shouldReduceMotion
                ? `perspective(${perspective}px) rotateX(${angle}deg)`
                : undefined,
            }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
          />
        </div>

        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    );
  },
);

RetroGrid.displayName = 'RetroGrid';
