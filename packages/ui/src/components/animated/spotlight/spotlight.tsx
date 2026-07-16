'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';
import { useFinePointer } from '../../../lib/use-fine-pointer';

const DEFAULT_SIZE = 350;
const DEFAULT_BORDER_SIZE = 220;
const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_COLOR =
  'color-mix(in oklab, var(--color-foreground) 14%, transparent)';

export type SpotlightVariant = 'default' | 'border';

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** Radius of the radial glow in pixels. */
  size?: number;
  /** Spotlight tint — defaults to neutral foreground at low alpha. */
  color?: string;
  /** Optional override for the gradient fill color (takes precedence over `color`). */
  fill?: string;
  /**
   * `'default'` is a free-floating radial glow that follows the pointer anywhere
   * inside the surface. `'border'` clips the same glow to a thin ring that hugs
   * the container's edge, projecting the pointer onto the nearest border point.
   */
  variant?: SpotlightVariant;
  /** Ring thickness in pixels, only used when `variant="border"`. */
  borderWidth?: number;
}

/**
 * Nearest point on the container's perimeter to a local (x, y) coordinate,
 * clamped to the container bounds. Used by `variant="border"` to make the
 * glow hug the edge instead of floating freely.
 */
function projectToPerimeter(x: number, y: number, width: number, height: number) {
  const clampedX = Math.min(Math.max(x, 0), width);
  const clampedY = Math.min(Math.max(y, 0), height);

  const distanceToLeft = clampedX;
  const distanceToRight = width - clampedX;
  const distanceToTop = clampedY;
  const distanceToBottom = height - clampedY;

  const minDistance = Math.min(
    distanceToLeft,
    distanceToRight,
    distanceToTop,
    distanceToBottom,
  );

  if (minDistance === distanceToLeft) return { x: 0, y: clampedY };
  if (minDistance === distanceToRight) return { x: width, y: clampedY };
  if (minDistance === distanceToTop) return { x: clampedX, y: 0 };
  return { x: clampedX, y: height };
}

/**
 * Cursor-following radial glow meant to sit inside a `relative` parent.
 * Fades in on pointer enter and out on leave. Under `prefers-reduced-motion`
 * renders a static centered soft glow with no tracking.
 *
 * `variant="border"` clips the glow to a thin ring that travels the
 * container's edge, projecting the pointer onto the nearest border point.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      className,
      size,
      color,
      fill,
      variant = 'default',
      borderWidth = DEFAULT_BORDER_WIDTH,
      ...props
    },
    ref,
  ) => {
    const isBorder = variant === 'border';
    const resolvedSize = size ?? (isBorder ? DEFAULT_BORDER_SIZE : DEFAULT_SIZE);

    const nodeRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const isFinePointer = useFinePointer();
    const [isActive, setIsActive] = useState(false);

    const pointerX = useMotionValue(resolvedSize);
    const pointerY = useMotionValue(resolvedSize);
    const x = useSpring(pointerX, SPRING_SNAPPY);
    const y = useSpring(pointerY, SPRING_SNAPPY);
    const glowX = useTransform(x, (value) => value - resolvedSize);
    const glowY = useTransform(y, (value) => value - resolvedSize);

    const spotlightColor = fill ?? color ?? DEFAULT_COLOR;
    const diameter = resolvedSize * 2;

    useEffect(() => {
      const node = nodeRef.current;
      const parent = node?.parentElement;
      if (!parent || shouldReduceMotion || !isFinePointer) return;

      const centerFallback = () => {
        const rect = parent.getBoundingClientRect();
        if (isBorder) {
          const projected = projectToPerimeter(
            rect.width / 2,
            0,
            rect.width,
            rect.height,
          );
          pointerX.set(projected.x);
          pointerY.set(projected.y);
        } else {
          pointerX.set(rect.width / 2);
          pointerY.set(rect.height / 2);
        }
      };

      centerFallback();

      const handlePointerMove = (event: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;

        if (isBorder) {
          const projected = projectToPerimeter(
            localX,
            localY,
            rect.width,
            rect.height,
          );
          pointerX.set(projected.x);
          pointerY.set(projected.y);
        } else {
          pointerX.set(localX);
          pointerY.set(localY);
        }
      };

      const handlePointerEnter = () => setIsActive(true);

      const handlePointerLeave = () => {
        setIsActive(false);
        centerFallback();
      };

      parent.addEventListener('pointermove', handlePointerMove);
      parent.addEventListener('pointerenter', handlePointerEnter);
      parent.addEventListener('pointerleave', handlePointerLeave);

      const resizeObserver = new ResizeObserver(centerFallback);
      resizeObserver.observe(parent);

      return () => {
        parent.removeEventListener('pointermove', handlePointerMove);
        parent.removeEventListener('pointerenter', handlePointerEnter);
        parent.removeEventListener('pointerleave', handlePointerLeave);
        resizeObserver.disconnect();
      };
    }, [shouldReduceMotion, isFinePointer, isBorder, pointerX, pointerY]);

    const ringMaskStyle = isBorder
      ? {
          padding: borderWidth,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor' as const,
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude' as const,
        }
      : undefined;

    const showStatic = shouldReduceMotion || !isFinePointer;

    if (showStatic) {
      return (
        <div
          ref={(node) => {
            nodeRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 overflow-hidden',
            className,
          )}
          style={ringMaskStyle}
          {...props}
        >
          <div
            className="absolute left-1/2 top-1/2 opacity-50"
            style={{
              width: diameter,
              height: diameter,
              translate: '-50% -50%',
              background: `radial-gradient(circle at center, ${spotlightColor} 0%, transparent 70%)`,
            }}
          />
        </div>
      );
    }

    return (
      <div
        ref={(node) => {
          nodeRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 overflow-hidden',
          className,
        )}
        style={ringMaskStyle}
        {...props}
      >
        <motion.div
          className="absolute left-0 top-0"
          style={{
            width: diameter,
            height: diameter,
            x: glowX,
            y: glowY,
            background: `radial-gradient(circle at center, ${spotlightColor} 0%, transparent 70%)`,
          }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: SPRING_SNAPPY.duration, ease: 'easeOut' }}
        />
      </div>
    );
  },
);

Spotlight.displayName = 'Spotlight';
