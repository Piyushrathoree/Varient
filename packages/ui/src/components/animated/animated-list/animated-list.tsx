'use client';

import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

const DEFAULT_INTERVAL_MS = 2500;
const MAX_VISIBLE_ITEMS = 5;

export interface AnimatedListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Milliseconds between each new item entering at the top. */
  interval?: number;
  /** When true, the cycling animation pauses. */
  isPaused?: boolean;
  /** Maximum stacked items before older entries are removed. */
  maxVisible?: number;
  children?: ReactNode;
}

export interface AnimatedListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: ReactNode;
}

interface VisibleEntry {
  entryId: number;
  childIndex: number;
}

function collectListItems(children: ReactNode): ReactElement<AnimatedListItemProps>[] {
  return Children.toArray(children).filter(
    (child): child is ReactElement<AnimatedListItemProps> =>
      isValidElement(child) &&
      (child.type as { displayName?: string }).displayName === 'AnimatedListItem',
  );
}

/**
 * Vertical list where items spring in one-by-one at the top — newest first,
 * older entries fade. Cycles through `AnimatedListItem` children on an interval.
 * Under `prefers-reduced-motion`, renders all items statically.
 */
export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      className,
      children,
      interval = DEFAULT_INTERVAL_MS,
      isPaused = false,
      maxVisible = MAX_VISIBLE_ITEMS,
      ...props
    },
    ref,
  ) => {
    const listId = useId();
    const entryCounter = useRef(0);
    const childItems = useMemo(() => collectListItems(children), [children]);
    const shouldReduceMotion = useReducedMotion();
    const [cycleIndex, setCycleIndex] = useState(0);
    const [visibleEntries, setVisibleEntries] = useState<VisibleEntry[]>([]);

    useEffect(() => {
      if (shouldReduceMotion || childItems.length === 0) return;

      const pushEntry = (childIndex: number) => {
        entryCounter.current += 1;
        setVisibleEntries((current) =>
          [{ entryId: entryCounter.current, childIndex }, ...current].slice(0, maxVisible),
        );
      };

      pushEntry(0);
      setCycleIndex(0);

      if (isPaused || childItems.length <= 1) return;

      const timer = window.setInterval(() => {
        setCycleIndex((previous) => {
          const nextIndex = (previous + 1) % childItems.length;
          pushEntry(nextIndex);
          return nextIndex;
        });
      }, interval);

      return () => window.clearInterval(timer);
    }, [childItems, interval, isPaused, maxVisible, shouldReduceMotion]);

    if (shouldReduceMotion) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col gap-3', className)}
          aria-live="polite"
          {...props}
        >
          {childItems.map((item, index) => (
            <div key={`${listId}-static-${index}`}>{item}</div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col gap-3', className)}
        aria-live="polite"
        aria-relevant="additions"
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visibleEntries.map((entry, stackIndex) => {
            const item = childItems[entry.childIndex];
            if (!item) return null;

            const fadeOpacity = Math.max(0.35, 1 - stackIndex * 0.18);

            return (
              <motion.div
                key={entry.entryId}
                layout
                initial={{ opacity: 0, scale: 0.92, y: -16 }}
                animate={{ opacity: fadeOpacity, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 8 }}
                transition={SPRING_DEFAULT}
              >
                {item}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {childItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">Add AnimatedListItem children.</p>
        ) : null}

        <span className="sr-only">
          Showing item {(cycleIndex % childItems.length) + 1} of {childItems.length}
        </span>
      </div>
    );
  },
);

AnimatedList.displayName = 'AnimatedList';

/** Single row/card inside `AnimatedList` — content is fully composable. */
export const AnimatedListItem = forwardRef<HTMLDivElement, AnimatedListItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-border bg-card p-4 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

AnimatedListItem.displayName = 'AnimatedListItem';
