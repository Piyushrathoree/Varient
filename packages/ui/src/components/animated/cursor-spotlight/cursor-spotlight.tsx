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
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_SNAPPY } from '../../../lib/animation';

export interface CursorSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** Content revealed under the cursor spotlight. */
  children: ReactNode;
  /** Spotlight radius in pixels. */
  size?: number;
}

/**
 * Mask-reveal spotlight: children render dimmed, and a circular region around
 * the cursor reveals full brightness via a radial CSS mask. On pointer leave
 * the mask fades out. Under reduced motion renders children at full brightness.
 */
export const CursorSpotlight = forwardRef<HTMLDivElement, CursorSpotlightProps>(
  ({ children, size = 200, className, ...props }, ref) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const spotlightOpacity = useMotionValue(0);

    const x = useSpring(pointerX, SPRING_SNAPPY);
    const y = useSpring(pointerY, SPRING_SNAPPY);
    const revealOpacity = useSpring(spotlightOpacity, SPRING_SNAPPY);

    const maskImage = useMotionTemplate`radial-gradient(circle ${size}px at ${x}px ${y}px, black 0%, transparent 100%)`;

    useEffect(() => {
      const node = nodeRef.current;
      if (!node || shouldReduceMotion) return;

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
    }, [shouldReduceMotion, pointerX, pointerY, spotlightOpacity]);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (shouldReduceMotion) {
      return (
        <div ref={setRefs} className={cn('relative', className)} {...props}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={setRefs}
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none select-none opacity-35 saturate-50"
        >
          {children}
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            opacity: revealOpacity,
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  },
);

CursorSpotlight.displayName = 'CursorSpotlight';
