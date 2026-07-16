'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface AnimatedProgressRingProps {
  /** Progress value from 0 to 100. */
  value: number;
  /** Outer diameter in pixels. */
  size?: number;
  /** Ring stroke width in pixels. */
  strokeWidth?: number;
  /** Show an animated count-up in the center. */
  showValue?: boolean;
  /** Progress arc color — any CSS color value. */
  color?: string;
  /** Track ring color — any CSS color value. */
  trackColor?: string;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
}

const DEFAULT_SIZE = 120;
const DEFAULT_STROKE_WIDTH = 8;
const DEFAULT_DURATION = 1.2;
const DEFAULT_COLOR = 'var(--color-brand)';
const DEFAULT_TRACK_COLOR = 'var(--color-muted)';

function clampValue(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/**
 * Circular SVG progress ring with an animated sweep and optional center
 * count-up. Animates once when scrolled into view and again on value change.
 * Under `prefers-reduced-motion` the ring jumps directly to the target value.
 */
export const AnimatedProgressRing = forwardRef<SVGSVGElement, AnimatedProgressRingProps>(
  (
    {
      value,
      size = DEFAULT_SIZE,
      strokeWidth = DEFAULT_STROKE_WIDTH,
      showValue = true,
      color = DEFAULT_COLOR,
      trackColor = DEFAULT_TRACK_COLOR,
      duration = DEFAULT_DURATION,
      className,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-80px' });
    const shouldReduceMotion = useReducedMotion();

    const clampedValue = clampValue(value);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    // Single motion value drives both the arc's stroke-dashoffset and the
    // center count-up — no second parallel animate() loop to keep in sync.
    const progress = useMotionValue(0);
    const strokeDashoffset = useTransform(
      progress,
      (latest) => circumference * (1 - latest / 100),
    );
    const roundedDisplay = useTransform(progress, (latest) => Math.round(latest));

    const [ariaValueNow, setAriaValueNow] = useState(0);
    useMotionValueEvent(progress, 'change', (latest) => {
      setAriaValueNow(Math.round(latest));
    });

    useEffect(() => {
      if (!isInView) return;

      if (shouldReduceMotion) {
        progress.jump(clampedValue);
        return;
      }

      const controls = animate(progress, clampedValue, {
        duration,
        ease: EASE_OUT,
      });

      return () => controls.stop();
    }, [clampedValue, isInView, duration, shouldReduceMotion, progress]);

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={ariaValueNow}
        aria-label={`Progress: ${ariaValueNow} percent`}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Decorative — the accessible value lives on the progressbar's
            aria-valuenow/aria-label above, regardless of showValue. */}
        {showValue ? (
          <span
            className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-foreground"
            aria-hidden="true"
          >
            <motion.span>{roundedDisplay}</motion.span>
            <span className="text-sm text-muted-foreground">%</span>
          </span>
        ) : null}
      </div>
    );
  },
);

AnimatedProgressRing.displayName = 'AnimatedProgressRing';
