'use client';

import { forwardRef, useRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export type SkeletonVariant = 'shimmer' | 'pulse';
export type SkeletonShape = 'rect' | 'circle';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  shape?: SkeletonShape;
}

const shapeStyles: Record<SkeletonShape, string> = {
  rect: 'rounded-md',
  circle: 'rounded-full',
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'shimmer', shape = 'rect', ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();
    const innerRef = useRef<HTMLDivElement>(null);
    const isActive = useViewportActive(innerRef);

    const setRefs = (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (shouldReduceMotion) {
      return (
        <div
          ref={setRefs}
          aria-hidden
          className={cn('bg-muted', shapeStyles[shape], className)}
          {...props}
        />
      );
    }

    if (variant === 'pulse') {
      return (
        <div
          ref={setRefs}
          aria-hidden
          className={cn(
            isActive ? 'animate-pulse' : '',
            'bg-muted',
            shapeStyles[shape],
            className,
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={setRefs}
        aria-hidden
        className={cn('relative overflow-hidden bg-muted', shapeStyles[shape], className)}
        {...props}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ x: '-100%' }}
          animate={isActive ? { x: '100%' } : { x: '-100%' }}
          transition={
            isActive ? { duration: 1.5, repeat: Infinity, ease: 'linear' } : { duration: 0 }
          }
        />
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';
