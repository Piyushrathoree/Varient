'use client';

import { forwardRef, useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, EASE_OUT } from '../../../lib/animation';

export interface LampProps extends HTMLAttributes<HTMLDivElement> {
  /** Headline or hero content below the lamp glow. */
  children?: ReactNode;
  /** Horizontal bar glow color — defaults to brand. */
  accentColor?: string;
}

const CONE_LEFT =
  'conic-gradient(from 70deg at center top, color-mix(in oklab, var(--lamp-accent) 55%, transparent), transparent 55%)';
const CONE_RIGHT =
  'conic-gradient(from 290deg at center top, color-mix(in oklab, var(--lamp-accent) 55%, transparent), transparent 55%)';

/**
 * Aceternity-style lamp hero effect: a glowing horizontal light bar with conic
 * gradient cones above content. The bar widens on entrance. Under
 * `prefers-reduced-motion` renders a fully lit static state with no entrance.
 */
export const Lamp = forwardRef<HTMLDivElement, LampProps>(
  ({ className, children, accentColor = 'var(--color-brand)', ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const localRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(localRef, { once: true, margin: '-80px' });
    const shouldAnimate = !shouldReduceMotion && isInView;

    const barWidth = shouldReduceMotion ? '100%' : '0%';
    const barAnimate = shouldAnimate ? { width: ['0%', '100%'] } : undefined;
    const barTransition = shouldAnimate
      ? { duration: DURATION.complex, ease: EASE_OUT }
      : undefined;

    return (
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          'relative flex w-full flex-col items-center justify-center overflow-hidden bg-background',
          className,
        )}
        style={{ '--lamp-accent': accentColor } as CSSProperties}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none relative isolate flex w-full flex-col items-center justify-center"
        >
          <motion.div
            className="absolute inset-auto top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--lamp-accent)] to-transparent opacity-80"
            initial={shouldReduceMotion ? false : { width: barWidth }}
            animate={barAnimate}
            transition={barTransition}
          />

          <div
            className="absolute inset-auto top-0 h-40 w-full bg-background"
            style={{ maskImage: 'radial-gradient(ellipse 50% 50% at 50% 0%, black 70%, transparent 100%)' }}
          />

          <motion.div
            className="absolute inset-auto top-0 h-36 w-[30rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, color-mix(in oklab, var(--lamp-accent) 40%, transparent), transparent 70%)',
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.2 }}
            animate={shouldAnimate ? { opacity: 0.5, scaleX: 1 } : undefined}
            transition={{ duration: DURATION.complex, ease: EASE_OUT }}
          />

          <motion.div
            className="absolute inset-auto top-0 h-44 w-full -translate-y-1/2 opacity-40 blur-2xl"
            style={{ background: CONE_LEFT }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldAnimate ? { opacity: 0.4 } : undefined}
            transition={{ duration: DURATION.complex, delay: 0.1, ease: EASE_OUT }}
          />
          <motion.div
            className="absolute inset-auto top-0 h-44 w-full -translate-y-1/2 opacity-40 blur-2xl"
            style={{ background: CONE_RIGHT }}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldAnimate ? { opacity: 0.4 } : undefined}
            transition={{ duration: DURATION.complex, delay: 0.15, ease: EASE_OUT }}
          />

          <motion.div
            className="absolute inset-auto top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--lamp-accent)] to-transparent"
            initial={shouldReduceMotion ? false : { width: barWidth, opacity: 0 }}
            animate={shouldAnimate ? { width: '100%', opacity: 1 } : undefined}
            transition={{ duration: DURATION.complex, ease: EASE_OUT }}
          />
        </div>

        {children ? (
          <div className="relative z-10 mt-8 w-full">{children}</div>
        ) : null}
      </div>
    );
  },
);

Lamp.displayName = 'Lamp';
