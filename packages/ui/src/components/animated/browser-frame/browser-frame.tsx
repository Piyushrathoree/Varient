'use client';

import { forwardRef, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, EASE_OUT } from '../../../lib/animation';

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="M1.5 8h13M8 1.5c1.8 1.7 2.8 4 2.8 6.5s-1 4.8-2.8 6.5c-1.8-1.7-2.8-4-2.8-6.5S6.2 3.2 8 1.5Z" />
    </svg>
  );
}

export interface BrowserFrameProps {
  /** URL shown in the address bar. */
  url?: string;
  /** When true, chrome uses dark smooth tokens; otherwise light chrome. Default false. */
  isDark?: boolean;
  /** Whether the frame plays a subtle float/tilt entrance when scrolled into view. Default true. */
  isAnimated?: boolean;
  children?: ReactNode;
  className?: string;
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-destructive/90" />
      <span className="size-2.5 rounded-full bg-warning/90" />
      <span className="size-2.5 rounded-full bg-success/90" />
    </div>
  );
}

/**
 * Browser window mockup with traffic-light chrome, URL bar, and a composable
 * content slot. Optional whileInView float/tilt entrance. Under
 * `prefers-reduced-motion` renders a static frame with no transform animation.
 */
export const BrowserFrame = forwardRef<HTMLDivElement, BrowserFrameProps>(
  (
    {
      url = 'https://varient.dev',
      isDark = false,
      isAnimated = true,
      children,
      className,
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(localRef, { once: true, margin: '-60px' });
    const shouldAnimate = isAnimated && !shouldReduceMotion && isInView;

    const setRef = (node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const chromeClassName = isDark
      ? 'border-smooth-800 bg-smooth-900/90'
      : 'border-border bg-muted/80';

    const urlBarClassName = isDark
      ? 'border-smooth-800 bg-smooth-950 text-smooth-300'
      : 'border-border bg-background text-muted-foreground';

    const contentClassName = isDark ? 'bg-smooth-950' : 'bg-background';

    const frame = (
      <div
        className={cn(
          'overflow-hidden rounded-xl border shadow-lg',
          chromeClassName,
          className,
        )}
      >
        <div
          className={cn(
            'flex items-center gap-3 border-b px-3 py-2',
            isDark ? 'border-smooth-800' : 'border-border',
          )}
        >
          <TrafficLights />
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center gap-2 rounded-md border px-2.5 py-1',
              urlBarClassName,
            )}
          >
            <GlobeIcon className="size-3 shrink-0 opacity-60" />
            <span className="truncate font-mono text-[11px] sm:text-xs">{url}</span>
          </div>
        </div>
        <div className={cn('min-h-[120px]', contentClassName)}>{children}</div>
      </div>
    );

    if (shouldReduceMotion || !isAnimated) {
      return (
        <div ref={setRef} className="w-full">
          {frame}
        </div>
      );
    }

    return (
      <div ref={setRef} className="w-full [perspective:900px]">
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 8, rotateY: -6 }}
          animate={
            shouldAnimate
              ? { opacity: 1, y: 0, rotateX: 0, rotateY: 0 }
              : { opacity: 0, y: 24, rotateX: 8, rotateY: -6 }
          }
          transition={{ duration: DURATION.complex, ease: EASE_OUT }}
        >
          {frame}
        </motion.div>
      </div>
    );
  },
);

BrowserFrame.displayName = 'BrowserFrame';
