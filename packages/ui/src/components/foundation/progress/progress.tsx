'use client';

import { forwardRef, useMemo, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps
  extends Omit<ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'> {
  value?: number;
  max?: number;
  size?: ProgressSize;
  isIndeterminate?: boolean;
  /** Renders the numeric percentage beside the track. */
  showValueLabel?: boolean;
}

const trackSizeStyles: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
};

function formatPercent(value: number, max: number): string {
  if (max <= 0) return '0%';
  return `${Math.round((value / max) * 100)}%`;
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      max = 100,
      size = 'md',
      isIndeterminate = false,
      showValueLabel = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = !!useReducedMotion();

    const clampedValue = useMemo(() => {
      if (isIndeterminate) return null;
      return Math.min(max, Math.max(0, value));
    }, [isIndeterminate, max, value]);

    const percent = clampedValue === null ? 50 : max > 0 ? (clampedValue / max) * 100 : 0;

    const indicator = isIndeterminate ? (
      shouldReduceMotion ? (
        <ProgressPrimitive.Indicator
          className="h-full w-1/2 rounded-full bg-brand"
          style={{ transform: 'translateX(50%)' }}
        />
      ) : (
        <motion.div
          className="absolute inset-y-0 w-1/3 rounded-full bg-brand"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )
    ) : (
      <ProgressPrimitive.Indicator
        className="h-full rounded-full bg-brand transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    );

    const track = (
      <ProgressPrimitive.Root
        ref={ref}
        value={clampedValue ?? undefined}
        max={max}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-muted',
          trackSizeStyles[size],
          className,
        )}
        {...props}
      >
        {indicator}
      </ProgressPrimitive.Root>
    );

    if (!showValueLabel) return track;

    return (
      <div className="flex w-full items-center gap-3">
        {track}
        <span
          className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground"
          aria-hidden={isIndeterminate}
        >
          {isIndeterminate ? '…' : formatPercent(clampedValue ?? 0, max)}
        </span>
      </div>
    );
  },
);

Progress.displayName = 'Progress';

export interface ProgressLabelProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
}

/** Standalone percentage label for custom progress layouts. */
export const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(
  ({ className, value, max = 100, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('text-xs font-medium tabular-nums text-muted-foreground', className)}
      {...props}
    >
      {formatPercent(value, max)}
    </span>
  ),
);

ProgressLabel.displayName = 'ProgressLabel';
