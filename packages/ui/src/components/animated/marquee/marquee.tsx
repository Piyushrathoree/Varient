'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  direction?: MarqueeDirection;
  /** Seconds for one full loop. */
  speed?: number;
  isPaused?: boolean;
  pauseOnHover?: boolean;
  isReverse?: boolean;
  /** Gap between items in pixels. */
  gap?: number;
}

function resolveDirection(
  direction: MarqueeDirection,
  isReverse: boolean,
): MarqueeDirection {
  if (!isReverse) return direction;
  const flipped: Record<MarqueeDirection, MarqueeDirection> = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up',
  };
  return flipped[direction];
}

function getKeyframeTransforms(direction: MarqueeDirection): { from: string; to: string } {
  switch (direction) {
    case 'right':
      return { from: 'translateX(-50%)', to: 'translateX(0)' };
    case 'up':
      return { from: 'translateY(0)', to: 'translateY(-50%)' };
    case 'down':
      return { from: 'translateY(-50%)', to: 'translateY(0)' };
    case 'left':
    default:
      return { from: 'translateX(0)', to: 'translateX(-50%)' };
  }
}

/**
 * Infinitely scrolling strip of children. Duplicates content for a seamless
 * loop and animates with transform-only CSS keyframes. Edge fade masks soften
 * the overflow. Under `prefers-reduced-motion`, renders a static row with no
 * animation.
 */
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      children,
      direction = 'left',
      speed = 20,
      isPaused = false,
      pauseOnHover = true,
      isReverse = false,
      gap = 16,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const animationId = useId().replace(/:/g, '');
    const resolvedDirection = resolveDirection(direction, isReverse);
    const isVertical = resolvedDirection === 'up' || resolvedDirection === 'down';
    const keyframes = getKeyframeTransforms(resolvedDirection);
    const trackClass = `marquee-track-${animationId}`;

    const basePlayState = isPaused ? 'paused' : 'running';
    const hoverPlayState = isPaused || pauseOnHover ? 'paused' : 'running';

    return (
      <div
        ref={ref}
        className={cn(
          'group/marquee relative flex overflow-hidden',
          isVertical ? 'max-h-full flex-col' : 'w-full flex-row',
          className,
        )}
        aria-live="off"
        {...props}
      >
        {isVertical ? (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-background to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-background to-transparent"
            />
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
            />
          </>
        )}

        {shouldReduceMotion ? (
          <div
            className={cn('flex shrink-0', isVertical ? 'flex-col' : 'flex-row')}
            style={{ gap }}
          >
            {children}
          </div>
        ) : (
          <>
            <style>
              {`
                @keyframes marquee-${animationId} {
                  from { transform: ${keyframes.from}; }
                  to { transform: ${keyframes.to}; }
                }
                .${trackClass} {
                  animation: marquee-${animationId} ${speed}s linear infinite;
                  animation-play-state: ${basePlayState};
                }
                .group\\/marquee:hover .${trackClass} {
                  animation-play-state: ${hoverPlayState};
                }
              `}
            </style>
            <div
              className={cn(
                trackClass,
                'flex shrink-0',
                isVertical ? 'h-max flex-col' : 'w-max flex-row',
              )}
              style={{ gap }}
            >
              {[0, 1].map((index) => (
                <div
                  key={index}
                  className={cn('flex shrink-0', isVertical ? 'flex-col' : 'flex-row')}
                  style={{ gap }}
                  aria-hidden={index > 0 ? true : undefined}
                >
                  {children}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  },
);

Marquee.displayName = 'Marquee';
