'use client';

import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_BOUNCE } from '../../../lib/animation';

// motion.button redefines these DOM event handlers with its own gesture/
// animation signatures, so the native React ones must be omitted to spread
// ButtonHTMLAttributes onto it without a type conflict.
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

export interface MagneticButtonProps extends NativeButtonProps {
  /** Pull intensity, roughly 0–1. Higher values track the cursor more closely. */
  strength?: number;
  /** Radius in pixels, measured from the button's center, within which the pull is active. */
  distance?: number;
}

// SmoothUI's drag-language spring — the one case where SPRING_BOUNCE's
// overshoot reads as physical rather than sloppy.
const springConfig = { duration: SPRING_BOUNCE.duration, bounce: SPRING_BOUNCE.bounce };

/**
 * Wraps its children in a button that drifts toward the pointer when it
 * comes within `distance` pixels of center, then springs back on leave.
 * Tracking only engages for fine pointers (`hover: hover`, `pointer: fine`)
 * and is disabled entirely under `prefers-reduced-motion` — no listeners
 * are attached, the button just renders static.
 */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, children, strength = 0.3, distance = 100, style, ...props }, ref) => {
    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const [isFinePointer, setIsFinePointer] = useState(false);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setIsFinePointer(mediaQuery.matches);
      const handleChange = (event: MediaQueryListEvent) => setIsFinePointer(event.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const isEnabled = isFinePointer && !shouldReduceMotion;

    useEffect(() => {
      if (!isEnabled) return;
      const node = nodeRef.current;
      if (!node) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const pointerDistance = Math.hypot(deltaX, deltaY);

        if (pointerDistance < distance) {
          rawX.set(deltaX * strength);
          rawY.set(deltaY * strength);
        } else {
          rawX.set(0);
          rawY.set(0);
        }
      };

      const handlePointerLeave = () => {
        rawX.set(0);
        rawY.set(0);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerleave', handlePointerLeave);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerleave', handlePointerLeave);
        rawX.set(0);
        rawY.set(0);
      };
    }, [isEnabled, distance, strength, rawX, rawY]);

    return (
      <motion.button
        ref={(node) => {
          nodeRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center rounded-md transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        style={isEnabled ? { ...style, x, y } : style}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

MagneticButton.displayName = 'MagneticButton';
