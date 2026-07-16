'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '../../../lib/animation';
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
export const NumberTicker = forwardRef<HTMLSpanElement, NumberTickerProps>(
  ({ value, prefix = '', suffix = '', decimalPlaces = 0, duration = 1.2, className }, ref) => {
    const localRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(localRef, { once: true, margin: '-80px' });
    const prefersReducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    const setRef = (node: HTMLSpanElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!isInView) return;

      if (prefersReducedMotion) {
        setDisplay(value);
        return;
      }

      const controls = animate(0, value, {
        duration,
        ease: EASE_OUT,
        onUpdate: (latest) => setDisplay(latest),
      });

      return () => controls.stop();
    }, [isInView, value, duration, prefersReducedMotion]);

    const formatted = display.toFixed(decimalPlaces);

    return (
      <span
        ref={setRef}
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
  },
);

NumberTicker.displayName = 'NumberTicker';
