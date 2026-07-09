'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
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
    const animatedValueRef = useRef(0);
    const displayValueRef = useRef(0);
    const isInView = useInView(containerRef, { once: true, margin: '-80px' });
    const shouldReduceMotion = useReducedMotion();

    const clampedValue = clampValue(value);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    const [animatedValue, setAnimatedValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      if (shouldReduceMotion) {
        animatedValueRef.current = clampedValue;
        displayValueRef.current = clampedValue;
        setAnimatedValue(clampedValue);
        setDisplayValue(clampedValue);
        return;
      }

      const arcControls = animate(animatedValueRef.current, clampedValue, {
        duration,
        ease: EASE_OUT,
        onUpdate: (latest) => {
          animatedValueRef.current = latest;
          setAnimatedValue(latest);
        },
      });

      const countControls = animate(displayValueRef.current, clampedValue, {
        duration,
        ease: EASE_OUT,
        onUpdate: (latest) => {
          displayValueRef.current = latest;
          setDisplayValue(Math.round(latest));
        },
      });

      return () => {
        arcControls.stop();
        countControls.stop();
      };
    }, [clampedValue, isInView, duration, shouldReduceMotion]);

    const strokeDashoffset = circumference * (1 - animatedValue / 100);
    const roundedDisplay = Math.round(displayValue);

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={roundedDisplay}
        aria-label={`Progress: ${roundedDisplay} percent`}
      >
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden={showValue}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {showValue ? (
          <span
            className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-foreground"
            aria-hidden="true"
          >
            {roundedDisplay}
            <span className="text-sm text-muted-foreground">%</span>
          </span>
        ) : null}
      </div>
    );
  },
);

AnimatedProgressRing.displayName = 'AnimatedProgressRing';
