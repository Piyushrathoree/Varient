'use client';

import { forwardRef, useMemo, useRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { seededUnit } from '../../../lib/random';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of meteor streaks to render. */
  number?: number;
  /** Meteor head and trail color — defaults to a neutral light streak. */
  color?: string;
  /**
   * Travel angle in degrees (CSS `rotate()` convention). Meteors always
   * travel toward `-x`, so this controls the diagonal — defaults to -45
   * (top-right to bottom-left).
   */
  angle?: number;
  /** Fastest loop duration in seconds — lower bound of the randomized range. */
  minSpeed?: number;
  /** Slowest loop duration in seconds — upper bound of the randomized range. */
  maxSpeed?: number;
}

interface MeteorConfig {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const DEFAULT_METEOR_COLOR = 'color-mix(in oklab, var(--color-background) 75%, transparent)';
const DEFAULT_ANGLE = -45;
const DEFAULT_MIN_SPEED = 3;
const DEFAULT_MAX_SPEED = 9;

function buildMeteorConfigs(count: number, minSpeed: number, maxSpeed: number): MeteorConfig[] {
  const speedRange = Math.max(0, maxSpeed - minSpeed);
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: `${seededUnit(id + 1) * 30 - 15}%`,
    left: `${seededUnit(id + 101) * 100}%`,
    delay: seededUnit(id + 201) * 1 + 0.2,
    duration: seededUnit(id + 301) * speedRange + minSpeed,
  }));
}

interface MeteorProps extends MeteorConfig {
  isAnimated: boolean;
  isActive: boolean;
  color: string;
  angle: number;
}

function Meteor({ top, left, delay, duration, isAnimated, isActive, color, angle }: MeteorProps) {
  if (!isAnimated) {
    return (
      <span
        aria-hidden
        className="absolute size-[3px] rounded-full opacity-80"
        style={{
          top,
          left,
          transform: `rotate(${angle}deg)`,
          backgroundColor: color,
          boxShadow: `0 0 6px 1px ${color}`,
        }}
      >
        <span
          className="absolute top-1/2 h-px w-16 -translate-y-1/2"
          style={{ backgroundImage: `linear-gradient(to right, ${color}, transparent)` }}
        />
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden
      className="absolute size-[3px] rounded-full"
      style={{
        top,
        left,
        rotate: angle,
        backgroundColor: color,
        boxShadow: `0 0 8px 2px ${color}, 0 0 2px 1px ${color}`,
      }}
      initial={{ x: 0, opacity: 0 }}
      animate={isActive ? { x: '-40vw', opacity: [0, 1, 1, 0] } : { x: 0, opacity: 0 }}
      transition={{
        duration,
        delay,
        repeat: isActive ? Infinity : 0,
        ease: 'linear',
      }}
    >
      <span
        className="pointer-events-none absolute top-1/2 h-[2px] w-16 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${color}, color-mix(in oklab, ${color} 35%, transparent), transparent)`,
        }}
      />
    </motion.span>
  );
}

/**
 * Diagonal meteor streaks meant to sit inside a `relative overflow-hidden`
 * container. Renders `pointer-events-none absolute inset-0` so content layered
 * above stays interactive. Under `prefers-reduced-motion` a handful of static
 * meteors are shown instead of the looping animation, and the loop pauses
 * automatically while the layer is scrolled offscreen.
 */
export const Meteors = forwardRef<HTMLDivElement, MeteorsProps>(
  (
    {
      number = 20,
      color = DEFAULT_METEOR_COLOR,
      angle = DEFAULT_ANGLE,
      minSpeed = DEFAULT_MIN_SPEED,
      maxSpeed = DEFAULT_MAX_SPEED,
      className,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const isActive = useViewportActive(containerRef);
    const count = shouldReduceMotion ? Math.min(3, number) : number;
    const meteors = useMemo(
      () => buildMeteorConfigs(count, minSpeed, maxSpeed),
      [count, minSpeed, maxSpeed],
    );

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
        {...props}
      >
        {meteors.map((meteor) => (
          <Meteor
            key={meteor.id}
            {...meteor}
            isAnimated={!shouldReduceMotion}
            isActive={isActive}
            color={color}
            angle={angle}
          />
        ))}
      </div>
    );
  },
);

Meteors.displayName = 'Meteors';
