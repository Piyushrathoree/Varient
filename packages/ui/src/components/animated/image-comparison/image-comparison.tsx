'use client';

import {
  forwardRef,
  isValidElement,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export type ImageComparisonMode = 'drag' | 'hover';

/** Shorthand for a plain `<img>` side — pass a full `ReactNode` instead for anything richer. */
export interface ImageComparisonSource {
  src: string;
  alt: string;
}

export type ImageComparisonMedia = ReactNode | ImageComparisonSource;

export interface ImageComparisonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Bottom layer, always fully visible. Either a `{src,alt}` shorthand or any ReactNode. */
  before: ImageComparisonMedia;
  /** Top layer, revealed left→right up to the divider position. */
  after: ImageComparisonMedia;
  /** Initial divider position, 0–100 (percent from the left). */
  defaultPosition?: number;
  /** `drag` (default) requires press+drag; `hover` follows the pointer without pressing. */
  mode?: ImageComparisonMode;
  /** Quiet chip in the top-left corner labeling the `before` layer. */
  beforeLabel?: string;
  /** Quiet chip in the top-right corner labeling the `after` layer. */
  afterLabel?: string;
  /** Smooth the divider toward its target with a spring. Default true. */
  isSpring?: boolean;
  /** Fires whenever the divider position changes (drag, hover, or keyboard). */
  onPositionChange?: (position: number) => void;
}

function clampPosition(value: number) {
  return Math.min(100, Math.max(0, value));
}

function isImageSource(media: ImageComparisonMedia): media is ImageComparisonSource {
  return typeof media === 'object' && media !== null && !isValidElement(media) && 'src' in media;
}

function MediaLayer({ media }: { media: ImageComparisonMedia }) {
  if (isImageSource(media)) {
    return (
      <img
        src={media.src}
        alt={media.alt}
        draggable={false}
        className="pointer-events-none size-full select-none object-cover"
      />
    );
  }
  return <>{media}</>;
}

function GripIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden
    >
      <path d="M8 5 4 10l4 5" />
      <path d="m12 5 4 5-4 5" />
    </svg>
  );
}

function LabelChip({ side, children }: { side: 'left' | 'right'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'pointer-events-none absolute top-3 z-10 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm',
        side === 'left' ? 'left-3' : 'right-3',
      )}
    >
      {children}
    </span>
  );
}

/**
 * Before/after reveal slider. The `after` layer sits on top of `before` and
 * is clipped with `clip-path: inset(0 0 0 X%)`, so it stays fully visible
 * from the divider to the right edge while the region to the left of the
 * divider lets the `before` layer underneath show through.
 *
 * The divider position is driven by a single motion value: `mode="drag"`
 * updates it on pointer drag, `mode="hover"` follows the pointer passively,
 * and the grip is a real `role="slider"` with Arrow/Home/End keyboard
 * support, so the comparison is fully usable without a mouse.
 */
export const ImageComparison = forwardRef<HTMLDivElement, ImageComparisonProps>(
  (
    {
      className,
      before,
      after,
      defaultPosition = 50,
      mode = 'drag',
      beforeLabel,
      afterLabel,
      isSpring = true,
      onPositionChange,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onPointerLeave,
      ...props
    },
    forwardedRef,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(() => clampPosition(defaultPosition));
    const [isDragging, setIsDragging] = useState(false);

    // rawPosition is the source of truth fed into the spring; the plain
    // `position` state exists only so aria-valuenow re-renders (motion
    // values don't trigger React renders on their own).
    const rawPosition = useMotionValue(clampPosition(defaultPosition));
    // A single follow-value whose spring config swaps to an effectively
    // instant one when smoothing is off — dynamic (JSON-diffed) config
    // updates are exactly what motion's useSpring/useFollowValue supports,
    // so this stays one continuous motion value rather than juggling two.
    const activePosition = useSpring(
      rawPosition,
      isSpring && !shouldReduceMotion ? SPRING_DEFAULT : { duration: 0 },
    );
    const clipPath = useTransform(activePosition, (value) => `inset(0 0 0 ${value}%)`);
    const dividerLeft = useTransform(activePosition, (value) => `${value}%`);

    const setContainerRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const updatePosition = useCallback(
      (next: number) => {
        const clamped = clampPosition(next);
        setPosition(clamped);
        rawPosition.set(clamped);
        onPositionChange?.(clamped);
      },
      [rawPosition, onPositionChange],
    );

    const updateFromClientX = useCallback(
      (clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) return;
        updatePosition(((clientX - rect.left) / rect.width) * 100);
      },
      [updatePosition],
    );

    const handlePointerDown = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || mode !== 'drag') return;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        updateFromClientX(event.clientX);
      },
      [mode, onPointerDown, updateFromClientX],
    );

    const handlePointerMove = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event);
        if (event.defaultPrevented) return;
        if (mode === 'hover' || isDragging) updateFromClientX(event.clientX);
      },
      [isDragging, mode, onPointerMove, updateFromClientX],
    );

    const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setIsDragging(false);
    }, []);

    const handlePointerUp = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerUp?.(event);
        if (event.defaultPrevented) return;
        endDrag(event);
      },
      [endDrag, onPointerUp],
    );

    const handlePointerCancel = useCallback(
      (event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerCancel?.(event);
        if (event.defaultPrevented) return;
        endDrag(event);
      },
      [endDrag, onPointerCancel],
    );

    const handleGripKeyDown = useCallback(
      (event: ReactKeyboardEvent<HTMLDivElement>) => {
        let next: number | undefined;
        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowDown':
            next = position - 5;
            break;
          case 'ArrowRight':
          case 'ArrowUp':
            next = position + 5;
            break;
          case 'Home':
            next = 0;
            break;
          case 'End':
            next = 100;
            break;
          default:
            return;
        }
        event.preventDefault();
        updatePosition(next);
      },
      [position, updatePosition],
    );

    return (
      <div
        {...props}
        ref={setContainerRef}
        className={cn(
          'relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl border border-border bg-muted',
          mode === 'drag' ? 'cursor-ew-resize' : 'cursor-default',
          className,
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={onPointerLeave}
      >
        <div className="pointer-events-none absolute inset-0">
          <MediaLayer media={before} />
        </div>

        <motion.div className="pointer-events-none absolute inset-0" style={{ clipPath }}>
          <MediaLayer media={after} />
        </motion.div>

        {beforeLabel && <LabelChip side="left">{beforeLabel}</LabelChip>}
        {afterLabel && <LabelChip side="right">{afterLabel}</LabelChip>}

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-brand"
          style={{ left: dividerLeft }}
        />

        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Comparison position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-orientation="horizontal"
          onKeyDown={handleGripKeyDown}
          style={{ left: dividerLeft }}
          className={cn(
            'absolute top-1/2 z-20 flex size-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/40 bg-brand text-white shadow-[var(--shadow-custom)] transition-transform duration-150 ease-out motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            isDragging && 'scale-110',
          )}
        >
          <GripIcon />
        </motion.div>
      </div>
    );
  },
);

ImageComparison.displayName = 'ImageComparison';
