'use client';

import { forwardRef, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT } from '../../../lib/animation';

export interface DynamicIslandProps extends HTMLAttributes<HTMLDivElement> {
  /** Key into `views` selecting the currently displayed content — fully controlled. */
  state: string;
  /** Map of state key → the content rendered while that state is active. */
  views: Record<string, ReactNode>;
  /** Fires whenever the active state changes (including once on mount). */
  onStateChange?: (state: string) => void;
}

// A softer, lower-bounce sibling of SPRING_BOUNCE — enough overshoot for the
// pill's width/height resize to read as a physical "settle" without the
// fuller playful bounce reserved for drag interactions.
const ISLAND_SPRING = { type: 'spring' as const, duration: 0.35, bounce: 0.15 };

/**
 * iOS-style morphing status pill. The pill auto-sizes to whichever view is
 * active (`views[state]`) via motion's `layout` FLIP animation, and content
 * crossfades in/out via `AnimatePresence` `mode="popLayout"` so the exiting
 * view never fights the container for space while the new size is measured.
 *
 * The inner surface is deliberately wrapped in a `.dark`-classed subtree so
 * the island reads as a dark pill in both light and dark host themes —
 * semantic tokens (`bg-background`, `text-foreground`, `border-border`)
 * resolve against the dark palette inside that subtree only.
 *
 * Fully controlled: `state` selects the view, there is no internal state.
 * Interactive content placed inside a view (buttons, etc.) keeps its own
 * semantics — the root only announces that *something* changed via
 * `role="status"` + `aria-live="polite"`.
 */
export const DynamicIsland = forwardRef<HTMLDivElement, DynamicIslandProps>(
  ({ state, views, onStateChange, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const transition = shouldReduceMotion ? DURATION_INSTANT : ISLAND_SPRING;

    // Ref so the effect only depends on `state` — a fresh onStateChange
    // identity every render must not re-fire the "state changed" signal.
    const onStateChangeRef = useRef(onStateChange);
    onStateChangeRef.current = onStateChange;
    useEffect(() => {
      onStateChangeRef.current?.(state);
    }, [state]);

    const activeView = views[state] ?? null;

    return (
      <div ref={ref} className={cn('dark isolate inline-flex', className)} {...props}>
        <motion.div
          layout={!shouldReduceMotion}
          role="status"
          aria-live="polite"
          transition={transition}
          className="relative flex min-h-9 min-w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-background px-4 py-2 text-foreground shadow-lg"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={state}
              className="flex items-center justify-center"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0, transition: DURATION_INSTANT }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={transition}
            >
              {activeView}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    );
  },
);

DynamicIsland.displayName = 'DynamicIsland';
