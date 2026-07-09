'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type SVGAttributes,
} from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { cn } from '../../../lib/utils';

const GRADIENT_SEGMENT = 0.25;

export interface AnimatedBeamProps extends SVGAttributes<SVGSVGElement> {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Quadratic curve offset — 0 is a straight line. */
  curvature?: number;
  /** Seconds for one gradient pass along the path. */
  duration?: number;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
  /** Base path stroke color. */
  pathColor?: string;
  /** Base path stroke width in pixels. */
  pathWidth?: number;
  /** Traveling gradient start color. */
  gradientStartColor?: string;
  /** Traveling gradient end color. */
  gradientStopColor?: string;
  /** Reverse the gradient travel direction. */
  isReverse?: boolean;
}

interface BeamCoords {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
}

function getQuadraticPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  curvature: number,
): string {
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const controlX = midX - deltaY * curvature;
  const controlY = midY + deltaX * curvature;
  return `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
}

function measureBeamCoords(
  container: HTMLElement,
  from: HTMLElement,
  to: HTMLElement,
): BeamCoords {
  const containerRect = container.getBoundingClientRect();
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  return {
    startX: fromRect.left + fromRect.width / 2 - containerRect.left,
    startY: fromRect.top + fromRect.height / 2 - containerRect.top,
    endX: toRect.left + toRect.width / 2 - containerRect.left,
    endY: toRect.top + toRect.height / 2 - containerRect.top,
    width: containerRect.width,
    height: containerRect.height,
  };
}

/**
 * Draws a traveling light beam along a quadratic path between two elements
 * inside a shared container. Positions stay in sync via ResizeObserver.
 * Under `prefers-reduced-motion`, renders a static path with no traveling
 * gradient.
 */
export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      duration = 5,
      delay = 0,
      pathColor = 'var(--color-border)',
      pathWidth = 2,
      gradientStartColor = 'var(--color-foreground)',
      gradientStopColor = 'var(--color-muted-foreground)',
      isReverse = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const gradientId = useId().replace(/:/g, '');
    const progress = useMotionValue(isReverse ? 1 : 0);
    const coordsRef = useRef<BeamCoords>({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      width: 0,
      height: 0,
    });

    const [coords, setCoords] = useState<BeamCoords>(coordsRef.current);

    const pathD = useMemo(
      () =>
        getQuadraticPath(
          coords.startX,
          coords.startY,
          coords.endX,
          coords.endY,
          curvature,
        ),
      [coords, curvature],
    );

    useEffect(() => {
      coordsRef.current = coords;
    }, [coords]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const updateCoords = () => {
        const from = fromRef.current;
        const to = toRef.current;
        if (!from || !to) return;
        const next = measureBeamCoords(container, from, to);
        coordsRef.current = next;
        setCoords(next);
      };

      updateCoords();

      const resizeObserver = new ResizeObserver(updateCoords);
      resizeObserver.observe(container);
      if (fromRef.current) resizeObserver.observe(fromRef.current);
      if (toRef.current) resizeObserver.observe(toRef.current);

      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateCoords);
        window.removeEventListener('scroll', updateCoords, true);
      };
    }, [containerRef, fromRef, toRef]);

    useEffect(() => {
      if (shouldReduceMotion) return;

      progress.set(isReverse ? 1 : 0);
      const controls = animate(progress, isReverse ? [1, 0] : [0, 1], {
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      });

      return () => controls.stop();
    }, [shouldReduceMotion, duration, delay, isReverse, progress]);

    const gradientX1 = useTransform(progress, (value) => {
      const { startX, endX } = coordsRef.current;
      const deltaX = endX - startX;
      return startX + deltaX * Math.max(0, value - GRADIENT_SEGMENT);
    });

    const gradientY1 = useTransform(progress, (value) => {
      const { startY, endY } = coordsRef.current;
      const deltaY = endY - startY;
      return startY + deltaY * Math.max(0, value - GRADIENT_SEGMENT);
    });

    const gradientX2 = useTransform(progress, (value) => {
      const { startX, endX } = coordsRef.current;
      const deltaX = endX - startX;
      return startX + deltaX * Math.min(1, value + GRADIENT_SEGMENT);
    });

    const gradientY2 = useTransform(progress, (value) => {
      const { startY, endY } = coordsRef.current;
      const deltaY = endY - startY;
      return startY + deltaY * Math.min(1, value + GRADIENT_SEGMENT);
    });

    if (coords.width === 0 && coords.height === 0) {
      return null;
    }

    return (
      <svg
        ref={ref}
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0', className)}
        width={coords.width}
        height={coords.height}
        viewBox={`0 0 ${coords.width} ${coords.height}`}
        fill="none"
        {...props}
      >
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeLinecap="round"
        />

        {!shouldReduceMotion ? (
          <>
            <defs>
              <motion.linearGradient
                id={gradientId}
                gradientUnits="userSpaceOnUse"
                x1={gradientX1}
                y1={gradientY1}
                x2={gradientX2}
                y2={gradientY2}
              >
                <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
                <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
                <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
              </motion.linearGradient>
            </defs>
            <path
              d={pathD}
              stroke={`url(#${gradientId})`}
              strokeWidth={pathWidth}
              strokeLinecap="round"
            />
          </>
        ) : null}
      </svg>
    );
  },
);

AnimatedBeam.displayName = 'AnimatedBeam';
