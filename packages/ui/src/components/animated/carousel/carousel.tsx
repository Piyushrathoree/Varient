'use client';

import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export type CarouselAlign = 'start' | 'center';

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** How each slide snaps against the viewport edge. `center` (default) centers the active slide. */
  align?: CarouselAlign;
  /** Gap between slides in pixels. */
  gap?: number;
  /** Controlled active slide index — pair with onIndexChange. */
  index?: number;
  /** Initial active slide index for uncontrolled usage. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Wraps Previous/Next/Dots navigation past the ends. Default false. */
  isLooping?: boolean;
  children?: ReactNode;
}

interface CarouselContextValue {
  index: number;
  count: number;
  isLooping: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  goTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  itemOrder: string[];
  idBase: string;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(component: string): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`Carousel.${component} must be rendered inside <Carousel>.`);
  }
  return ctx;
}

// A small forward-projection so a fast flick lands on the slide the user's
// velocity implies, not just whichever slide happened to be nearest when
// their finger lifted — same intent as embla's "friction" snap resolution.
const VELOCITY_PROJECTION = 0.18;

function measureSnapOffsets(
  viewport: HTMLDivElement,
  track: HTMLDivElement,
  align: CarouselAlign,
): number[] {
  const items = Array.from(track.querySelectorAll<HTMLElement>('[data-carousel-item]'));
  const viewportWidth = viewport.offsetWidth;
  return items.map((item) => {
    if (align === 'center') {
      return -(item.offsetLeft + item.offsetWidth / 2 - viewportWidth / 2);
    }
    return -item.offsetLeft;
  });
}

const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      align = 'center',
      gap = 16,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      isLooping = false,
      children,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const idBase = useId();
    const shouldReduceMotion = useReducedMotion();
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const x = useMotionValue(0);

    const [internalIndex, setInternalIndex] = useState(defaultIndex);
    const isControlled = indexProp !== undefined;
    const index = indexProp !== undefined ? indexProp : internalIndex;

    const [itemOrder, setItemOrder] = useState<string[]>([]);
    const registerItem = useCallback((id: string) => {
      setItemOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);
    const unregisterItem = useCallback((id: string) => {
      setItemOrder((prev) => prev.filter((existing) => existing !== id));
    }, []);
    const count = itemOrder.length;

    const [snapOffsets, setSnapOffsets] = useState<number[]>([]);
    const snapOffsetsRef = useRef<number[]>([]);
    useEffect(() => {
      snapOffsetsRef.current = snapOffsets;
    }, [snapOffsets]);

    const recalculate = useCallback(() => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setSnapOffsets(measureSnapOffsets(viewport, track, align));
    }, [align]);

    // Re-measure on mount, whenever the slide count changes, and whenever the
    // viewport or track resize (container width change, responsive item
    // widths, font-loading reflow, etc).
    useEffect(() => {
      recalculate();
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(() => recalculate());
      observer.observe(viewport);
      if (track) observer.observe(track);
      return () => observer.disconnect();
    }, [recalculate, count, gap]);

    const commitIndex = useCallback(
      (next: number) => {
        if (!isControlled) setInternalIndex(next);
        onIndexChange?.(next);
      },
      [isControlled, onIndexChange],
    );

    const snapVisualTo = useCallback(
      (targetIndex: number) => {
        const offsets = snapOffsetsRef.current;
        if (offsets.length === 0) return;
        const target = offsets[Math.max(0, Math.min(offsets.length - 1, targetIndex))] ?? 0;
        if (shouldReduceMotion) {
          x.set(target);
        } else {
          animate(x, target, SPRING_DEFAULT);
        }
      },
      [shouldReduceMotion, x],
    );

    // Single source of truth for the resting position: fires on mount, on
    // every index change (drag, buttons, dots, controlled prop), and on
    // re-measure (resize) — always settles `x` to the current slide's offset.
    useEffect(() => {
      if (snapOffsets.length === 0) return;
      snapVisualTo(index);
    }, [index, snapOffsets, snapVisualTo]);

    const scrollPrev = useCallback(() => {
      if (count === 0) return;
      let next = index - 1;
      if (next < 0) {
        if (!isLooping) return;
        next = count - 1;
      }
      commitIndex(next);
    }, [index, count, isLooping, commitIndex]);

    const scrollNext = useCallback(() => {
      if (count === 0) return;
      let next = index + 1;
      if (next >= count) {
        if (!isLooping) return;
        next = 0;
      }
      commitIndex(next);
    }, [index, count, isLooping, commitIndex]);

    const goTo = useCallback(
      (next: number) => {
        if (count === 0) return;
        commitIndex(Math.max(0, Math.min(count - 1, next)));
      },
      [count, commitIndex],
    );

    const handleDragEnd = useCallback(
      (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const offsets = snapOffsetsRef.current;
        if (offsets.length === 0) return;
        const projected = x.get() + info.velocity.x * VELOCITY_PROJECTION;

        let nearestIndex = 0;
        let nearestDistance = Infinity;
        offsets.forEach((offset, i) => {
          const distance = Math.abs(offset - projected);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = i;
          }
        });

        // Snap the visual position immediately — if the nearest slide is the
        // one we're already on, commitIndex won't produce a state change (and
        // therefore won't re-trigger the settle effect), so the drag release
        // still needs this direct call to spring back into place.
        snapVisualTo(nearestIndex);
        commitIndex(nearestIndex);
      },
      [x, snapVisualTo, commitIndex],
    );

    const dragConstraints = useMemo(() => {
      if (snapOffsets.length === 0) return { left: 0, right: 0 };
      return { left: Math.min(...snapOffsets), right: Math.max(...snapOffsets) };
    }, [snapOffsets]);

    const handleKeyDown = useCallback(
      (event: ReactKeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          scrollNext();
        }
      },
      [onKeyDown, scrollPrev, scrollNext],
    );

    const canScrollPrev = isLooping ? count > 1 : index > 0;
    const canScrollNext = isLooping ? count > 1 : index < count - 1;

    const contextValue = useMemo<CarouselContextValue>(
      () => ({
        index,
        count,
        isLooping,
        scrollPrev,
        scrollNext,
        goTo,
        canScrollPrev,
        canScrollNext,
        registerItem,
        unregisterItem,
        itemOrder,
        idBase,
      }),
      [
        index,
        count,
        isLooping,
        scrollPrev,
        scrollNext,
        goTo,
        canScrollPrev,
        canScrollNext,
        registerItem,
        unregisterItem,
        itemOrder,
        idBase,
      ],
    );

    // Items go inside the draggable track; anything else (Previous, Next,
    // Dots, or arbitrary consumer markup) renders as a sibling after the
    // viewport, in whatever order the consumer wrote it — this keeps the
    // track's flex children to exactly the slides motion needs to measure.
    const childArray = Children.toArray(children);
    const itemChildren = childArray.filter(
      (child) => isValidElement(child) && child.type === CarouselItem,
    );
    const controlChildren = childArray.filter(
      (child) => !(isValidElement(child) && child.type === CarouselItem),
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div ref={ref} className={cn('relative', className)} {...props}>
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <motion.div
              ref={trackRef}
              className="relative flex touch-pan-y"
              style={{ x, gap }}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.045}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
              onDragEnd={handleDragEnd}
            >
              {itemChildren}
            </motion.div>
          </div>
          {controlChildren}
        </div>
      </CarouselContext.Provider>
    );
  },
);
CarouselRoot.displayName = 'Carousel';

export type CarouselItemProps = HTMLAttributes<HTMLDivElement>;

export const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    const { registerItem, unregisterItem, itemOrder } = useCarouselContext('Item');
    const id = useId();

    useEffect(() => {
      registerItem(id);
      return () => unregisterItem(id);
    }, [id, registerItem, unregisterItem]);

    const itemIndex = itemOrder.indexOf(id);
    const count = itemOrder.length;

    return (
      <div
        ref={ref}
        data-carousel-item
        role="group"
        aria-roledescription="slide"
        aria-label={itemIndex >= 0 ? `${itemIndex + 1} of ${count}` : undefined}
        className={cn('w-full shrink-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CarouselItem.displayName = 'Carousel.Item';

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M12.5 4.5 7 10l5.5 5.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M7.5 4.5 13 10l-5.5 5.5" />
    </svg>
  );
}

const navButtonClassName =
  'absolute top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40';

export type CarouselPreviousProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, onClick, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarouselContext('Previous');
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Previous slide"
        disabled={!canScrollPrev}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) scrollPrev();
        }}
        className={cn(navButtonClassName, 'left-2', className)}
        {...props}
      >
        <ChevronLeftIcon />
      </button>
    );
  },
);
CarouselPrevious.displayName = 'Carousel.Previous';

export type CarouselNextProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const CarouselNext = forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, onClick, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarouselContext('Next');
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Next slide"
        disabled={!canScrollNext}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) scrollNext();
        }}
        className={cn(navButtonClassName, 'right-2', className)}
        {...props}
      >
        <ChevronRightIcon />
      </button>
    );
  },
);
CarouselNext.displayName = 'Carousel.Next';

export type CarouselDotsProps = HTMLAttributes<HTMLDivElement>;

export const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { index, count, goTo, idBase } = useCarouselContext('Dots');
    if (count === 0) return null;

    return (
      <div
        ref={ref}
        className={cn('mt-4 flex items-center justify-center gap-2', className)}
        {...props}
      >
        {Array.from({ length: count }, (_, i) => {
          const isActive = i === index;
          return (
            <button
              key={`${idBase}-dot-${i}`}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200 motion-reduce:transition-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                isActive ? 'w-5 bg-brand' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50',
              )}
            />
          );
        })}
      </div>
    );
  },
);
CarouselDots.displayName = 'Carousel.Dots';

export const Carousel = Object.assign(CarouselRoot, {
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Dots: CarouselDots,
});
