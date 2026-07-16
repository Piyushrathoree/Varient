'use client';

import {
  Children,
  forwardRef,
  isValidElement,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface OrbitProps extends HTMLAttributes<HTMLDivElement> {
  /** Orbiting items — each child is placed evenly around the circle. */
  children: ReactNode;
  /** Orbit radius in pixels. */
  radius?: number;
  /** Seconds for one full revolution. */
  duration?: number;
  /** Reverse the orbit direction. */
  isReverse?: boolean;
  /** Show a faint circular path behind the orbit. */
  showPath?: boolean;
  /**
   * Starting angle in degrees (0 = top, clockwise) applied to the whole ring,
   * before children are distributed evenly. Lets multiple orbits or a single
   * asymmetric composition offset where the first child begins.
   */
  startAngle?: number;
}

/**
 * Distributes children evenly around a circle and rotates the ring so items
 * orbit a central anchor. Each child counter-rotates to stay upright.
 * Under `prefers-reduced-motion`, items are statically placed with no spin.
 */
export const Orbit = forwardRef<HTMLDivElement, OrbitProps>(
  (
    {
      className,
      children,
      radius = 80,
      duration = 20,
      isReverse = false,
      showPath = true,
      startAngle = 0,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isViewportActive = useViewportActive(containerRef);
    const items = Children.toArray(children).filter(isValidElement);
    const count = items.length;
    const diameter = radius * 2;
    const orbitRotation = (isReverse ? -360 : 360) + startAngle;
    const counterRotation = isReverse ? 360 : -360;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
        }}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: diameter, height: diameter }}
        {...props}
      >
        {showPath ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-border opacity-40"
          />
        ) : null}

        {shouldReduceMotion ? (
          <>
            {items.map((child, index) => {
              const angle = (count > 0 ? (360 / count) * index : 0) + startAngle;
              return (
                <div
                  key={child.key ?? index}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  {child}
                </div>
              );
            })}
          </>
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ rotate: startAngle }}
            animate={isViewportActive ? { rotate: orbitRotation } : undefined}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {items.map((child, index) => {
              const angle = count > 0 ? (360 / count) * index : 0;
              return (
                <motion.div
                  key={child.key ?? index}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
                  }}
                  initial={{ rotate: -startAngle }}
                  animate={isViewportActive ? { rotate: counterRotation - startAngle } : undefined}
                  transition={{
                    duration,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {child}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    );
  },
);

Orbit.displayName = 'Orbit';
