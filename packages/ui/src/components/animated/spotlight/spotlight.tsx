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

const DEFAULT_SIZE = 350;
const DEFAULT_COLOR =
  'color-mix(in oklab, var(--color-foreground) 14%, transparent)';

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** Radius of the radial glow in pixels. */
  size?: number;
  /** Spotlight tint — defaults to neutral foreground at low alpha. */
  color?: string;
  /** Optional override for the gradient fill color (takes precedence over `color`). */
  fill?: string;
}

/**
 * Cursor-following radial glow meant to sit inside a `relative` parent.
 * Fades in on pointer enter and out on leave. Under `prefers-reduced-motion`
 * renders a static centered soft glow with no tracking.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      className,
      size = DEFAULT_SIZE,
      color,
      fill,
      ...props
    },
    ref,
  ) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const [isActive, setIsActive] = useState(false);

    const pointerX = useMotionValue(size);
    const pointerY = useMotionValue(size);
    const x = useSpring(pointerX, SPRING_SNAPPY);
    const y = useSpring(pointerY, SPRING_SNAPPY);
    const glowX = useTransform(x, (value) => value - size);
    const glowY = useTransform(y, (value) => value - size);

    const spotlightColor = fill ?? color ?? DEFAULT_COLOR;
    const diameter = size * 2;

    useEffect(() => {
      const node = nodeRef.current;
      const parent = node?.parentElement;
      if (!parent || shouldReduceMotion) return;

      const centerFallback = () => {
        const rect = parent.getBoundingClientRect();
        pointerX.set(rect.width / 2);
        pointerY.set(rect.height / 2);
      };

      centerFallback();

      const handlePointerMove = (event: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        pointerX.set(event.clientX - rect.left);
        pointerY.set(event.clientY - rect.top);
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
    }, [shouldReduceMotion, pointerX, pointerY]);

    if (shouldReduceMotion) {
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
