'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import type { NumberTickerProps } from './types';

/**
 * Counts up to `value` once it enters the viewport. Respects
 * `prefers-reduced-motion` by jumping straight to the final value.
 *
 * Accessibility: the animating digits are `aria-hidden` — a live-updating
 * number is not announced mid-count. The final value is always present in
 * the accessible tree via a visually-hidden span, so screen readers read it
 * once, correctly, without narrating every tick.
 */
export function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  duration = 1.2,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [isInView, value, duration, prefersReducedMotion]);

  const formatted = display.toFixed(decimalPlaces);

  return (
    <span
      ref={ref}
      className={cn('relative inline-block font-semibold tabular-nums text-foreground', className)}
    >
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
