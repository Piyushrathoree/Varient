'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';
import { useFinePointer } from '../../../lib/use-fine-pointer';

export interface CursorSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** Content revealed under the cursor spotlight. */
  children: ReactNode;
  /** Spotlight radius in pixels. */
  size?: number;
}

/**
 * Cursor-tracking spotlight: `children` render exactly once, at full
 * brightness and fully interactive/keyboard-reachable. A decorative scrim
 * overlay dims and desaturates the surrounding area, punched through by a
 * circular hole that follows the pointer via a radial CSS mask, so the real
 * content underneath reads clearly inside the spotlight. Requires a fine
 * (hover-capable) pointer — touch devices and `prefers-reduced-motion`
 * render children plainly with no scrim and no pointer listeners.
 */
export const CursorSpotlight = forwardRef<HTMLDivElement, CursorSpotlightProps>(
  ({ children, size = 200, className, ...props }, ref) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const isFinePointer = useFinePointer();
    const isActive = isFinePointer && !shouldReduceMotion;

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const spotlightOpacity = useMotionValue(0);

    const x = useSpring(pointerX, SPRING_SNAPPY);
    const y = useSpring(pointerY, SPRING_SNAPPY);
    const revealOpacity = useSpring(spotlightOpacity, SPRING_SNAPPY);
    // Hole radius grows from 0 (fully dimmed, idle) to `size` (full reveal)
    // in lockstep with the same spring, so the punch-through animates
    // smoothly instead of popping to full size on the first pointer move.
    const holeRadius = useTransform(revealOpacity, [0, 1], [0, size]);

    const scrimMask = useMotionTemplate`radial-gradient(circle ${holeRadius}px at ${x}px ${y}px, transparent 0%, black 100%)`;

    useEffect(() => {
      const node = nodeRef.current;
      if (!node || !isActive) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        pointerX.set(event.clientX - rect.left);
        pointerY.set(event.clientY - rect.top);
        spotlightOpacity.set(1);
      };

      const handlePointerLeave = () => {
        spotlightOpacity.set(0);
      };

      node.addEventListener('pointermove', handlePointerMove);
      node.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        node.removeEventListener('pointermove', handlePointerMove);
        node.removeEventListener('pointerleave', handlePointerLeave);
      };
    }, [isActive, pointerX, pointerY, spotlightOpacity]);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <div
        ref={setRefs}
        className={cn('relative', isActive && 'overflow-hidden', className)}
        {...props}
      >
        {children}

        {isActive && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 select-none backdrop-brightness-50 backdrop-saturate-50"
            style={{
              maskImage: scrimMask,
              WebkitMaskImage: scrimMask,
            }}
          />
        )}
      </div>
    );
  },
);

CursorSpotlight.displayName = 'CursorSpotlight';
