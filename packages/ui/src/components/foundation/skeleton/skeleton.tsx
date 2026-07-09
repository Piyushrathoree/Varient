'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

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

    if (shouldReduceMotion) {
      return (
        <div
          ref={ref}
          aria-hidden
          className={cn('bg-muted', shapeStyles[shape], className)}
          {...props}
        />
      );
    }

    if (variant === 'pulse') {
      return (
        <div
          ref={ref}
          aria-hidden
          className={cn('animate-pulse bg-muted', shapeStyles[shape], className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        aria-hidden
        className={cn('relative overflow-hidden bg-muted', shapeStyles[shape], className)}
        {...props}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  },
);

Skeleton.displayName = 'Skeleton';
