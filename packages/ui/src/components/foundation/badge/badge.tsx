'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_SNAPPY } from '../../../lib/animation';

// Semantic color — what the badge means. Unchanged union: additive-only.
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

// Visual style — how the color is applied. New axis, orthogonal to `variant`.
export type BadgeAppearance = 'soft' | 'solid' | 'outline' | 'dot';

export type BadgeSize = 'sm' | 'md' | 'lg';

// Pill reads as a tag/label; square reads as a compact status chip inline
// with other rounded-lg surfaces (cards, inputs).
export type BadgeShape = 'pill' | 'square';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /**
   * Visual style applied to the semantic color from `variant`. Defaults to
   * `'soft'` — except `variant="outline"`, which keeps resolving to the
   * `'outline'` appearance for backward compatibility with the original API.
   */
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  shape?: BadgeShape;
  /** Optional leading icon, rendered before the label (and after the status dot). */
  icon?: ReactNode;
}

// `variant` picks a semantic color; `default` and the legacy `outline` both
// resolve to the same neutral ink so they can share every appearance recipe.
type ColorRole = 'neutral' | 'brand' | 'secondary' | 'success' | 'warning' | 'destructive';

const colorRoleByVariant: Record<BadgeVariant, ColorRole> = {
  default: 'neutral',
  primary: 'brand',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'destructive',
  outline: 'neutral',
};

// Every {appearance × colorRole} pair below is a deliberate combination — no
// cell is a fallback. `success`/`warning` brighten in dark mode (see
// global.css) so `solid` pairs them with `text-background`, which flips
// light/dark in lockstep and always lands as the contrasting ink; `brand` and
// `destructive` stay a fixed hue in both themes, so `text-white` is stable.
const appearanceStyles: Record<BadgeAppearance, Record<ColorRole, string>> = {
  soft: {
    neutral: 'border-transparent bg-muted text-foreground',
    brand: 'border-transparent bg-muted text-brand',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    success: 'border-transparent bg-success/10 text-success',
    warning: 'border-transparent bg-warning/10 text-warning',
    destructive: 'border-transparent bg-destructive/10 text-destructive',
  },
  solid: {
    neutral: 'border-transparent bg-primary text-primary-foreground',
    brand: 'border-transparent bg-brand text-white',
    secondary: 'border-transparent bg-secondary-foreground text-secondary',
    success: 'border-transparent bg-success text-background',
    warning: 'border-transparent bg-warning text-background',
    destructive: 'border-transparent bg-destructive text-white',
  },
  outline: {
    neutral: 'border-border bg-transparent text-foreground',
    brand: 'border-brand/40 bg-transparent text-brand',
    secondary: 'border-secondary-foreground/25 bg-transparent text-secondary-foreground',
    success: 'border-success/40 bg-transparent text-success',
    warning: 'border-warning/40 bg-transparent text-warning',
    destructive: 'border-destructive/40 bg-transparent text-destructive',
  },
  // Color moves to the dot; label text stays neutral on a muted surface.
  dot: {
    neutral: 'border-transparent bg-muted text-foreground',
    brand: 'border-transparent bg-muted text-foreground',
    secondary: 'border-transparent bg-secondary text-foreground',
    success: 'border-transparent bg-success/10 text-foreground',
    warning: 'border-transparent bg-warning/10 text-foreground',
    destructive: 'border-transparent bg-destructive/10 text-foreground',
  },
};

const dotColorStyles: Record<ColorRole, string> = {
  neutral: 'bg-foreground',
  brand: 'bg-brand',
  secondary: 'bg-secondary-foreground',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-xs',
  md: 'gap-1.5 px-2.5 py-0.5 text-xs',
  lg: 'gap-1.5 px-3 py-1 text-sm',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
};

const shapeStyles: Record<BadgeShape, string> = {
  pill: 'rounded-full',
  square: 'rounded-md',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      appearance,
      size = 'md',
      shape = 'pill',
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const colorRole = colorRoleByVariant[variant];
    // `variant="outline"` has no color of its own — it's the pre-existing
    // "bordered, transparent" look, so it keeps resolving to that appearance
    // unless the caller opts into a different one explicitly.
    const resolvedAppearance: BadgeAppearance =
      appearance ?? (variant === 'outline' ? 'outline' : 'soft');

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap border font-medium leading-none',
          appearanceStyles[resolvedAppearance][colorRole],
          sizeStyles[size],
          shapeStyles[shape],
          className,
        )}
        {...props}
      >
        {resolvedAppearance === 'dot' && (
          <motion.span
            aria-hidden
            animate={{ scale: 1 }}
            className={cn('inline-block shrink-0 rounded-full', dotSizeStyles[size], dotColorStyles[colorRole])}
            initial={shouldReduceMotion ? false : { scale: 0 }}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
          />
        )}
        {icon}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
