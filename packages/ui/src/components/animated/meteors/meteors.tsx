'use client';

import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface MeteorsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of meteor streaks to render. */
  number?: number;
  /** Meteor head and trail color — defaults to a neutral light streak. */
  color?: string;
}

interface MeteorConfig {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const DEFAULT_METEOR_COLOR = 'color-mix(in oklab, var(--color-background) 75%, transparent)';

/** Deterministic 0–1 float — stable across SSR and client for a given seed. */
function seededUnit(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function buildMeteorConfigs(count: number): MeteorConfig[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    top: `${seededUnit(id + 1) * 30 - 15}%`,
    left: `${seededUnit(id + 101) * 100}%`,
    delay: seededUnit(id + 201) * 1 + 0.2,
    duration: seededUnit(id + 301) * 6 + 3,
  }));
}

interface MeteorProps extends MeteorConfig {
  isAnimated: boolean;
  color: string;
}

function Meteor({ top, left, delay, duration, isAnimated, color }: MeteorProps) {
  if (!isAnimated) {
    return (
      <span
        aria-hidden
        className="absolute size-0.5 rotate-[-45deg] rounded-full opacity-60"
        style={{ top, left, backgroundColor: color }}
      >
        <span
          className="absolute top-1/2 h-px w-12 -translate-y-1/2"
          style={{ backgroundImage: `linear-gradient(to right, ${color}, transparent)` }}
        />
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden
      className="absolute size-0.5 rotate-[-45deg] rounded-full shadow-[0_0_0_1px] shadow-foreground/10"
      style={{ top, left, backgroundColor: color }}
      initial={{ x: 0, opacity: 0 }}
      animate={{ x: '-40vw', opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <span
        className="pointer-events-none absolute top-1/2 h-px w-12 -translate-y-1/2"
        style={{ backgroundImage: `linear-gradient(to right, ${color}, transparent)` }}
      />
    </motion.span>
  );
}

/**
 * Diagonal meteor streaks meant to sit inside a `relative overflow-hidden`
 * container. Renders `pointer-events-none absolute inset-0` so content layered
 * above stays interactive. Under `prefers-reduced-motion` a handful of static
 * meteors are shown instead of the looping animation.
 */
export const Meteors = forwardRef<HTMLDivElement, MeteorsProps>(
  ({ number = 20, color = DEFAULT_METEOR_COLOR, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const count = shouldReduceMotion ? Math.min(3, number) : number;
    const meteors = useMemo(() => buildMeteorConfigs(count), [count]);

    return (
      <div
        ref={ref}
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
        {...props}
      >
        {meteors.map((meteor) => (
          <Meteor key={meteor.id} {...meteor} isAnimated={!shouldReduceMotion} color={color} />
        ))}
      </div>
    );
  },
);

Meteors.displayName = 'Meteors';
