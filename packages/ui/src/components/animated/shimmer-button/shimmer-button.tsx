'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export type ShimmerButtonSize = 'sm' | 'md' | 'lg';

export interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Highlight color for the sweeping shimmer overlay. Accepts any CSS color value. */
  shimmerColor?: string;
  /** Duration of one shimmer sweep, in seconds. */
  shimmerDuration?: number;
  /** Button fill — defaults to the brand candy gradient. Accepts any CSS background value. */
  background?: string;
  size?: ShimmerButtonSize;
  isDisabled?: boolean;
}

const DEFAULT_BACKGROUND =
  'linear-gradient(to bottom, var(--color-brand), var(--color-brand-secondary))';

const DEFAULT_SHIMMER_COLOR = 'color-mix(in oklab, white 55%, transparent)';

const sizeStyles: Record<ShimmerButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-8 text-base',
};

const buttonChassis =
  'relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-md font-medium whitespace-nowrap text-white ring-offset-background transition-transform duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-[0.5px] border-white/25 shadow-black/20 shadow-md ring-1 ring-(--ring-color) [--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-brand))] [&_svg]:drop-shadow-sm';

/**
 * Brand-gradient button with a continuous shimmer highlight clipped to its
 * surface. Under `prefers-reduced-motion` the shimmer loop is omitted — the
 * button renders as a static candy CTA with the same press/focus behavior.
 */
export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      className,
      children,
      shimmerColor = DEFAULT_SHIMMER_COLOR,
      shimmerDuration = 3,
      background = DEFAULT_BACKGROUND,
      size = 'md',
      isDisabled = false,
      type = 'button',
      style,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        className={cn(buttonChassis, sizeStyles[size], className)}
        style={{ background, ...style }}
        {...props}
      >
        {!shouldReduceMotion ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            initial={{ x: '-120%' }}
            animate={{ x: '120%' }}
            transition={{
              duration: shimmerDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span
              className="absolute inset-y-0 w-2/5 -skew-x-12 opacity-70"
              style={{
                background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
              }}
            />
          </motion.span>
        ) : null}
        <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';
