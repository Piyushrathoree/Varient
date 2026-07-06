import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// Tinted wash + matching ink per variant — never a solid fill, so the badge
// never competes with the brand signal reserved for focus/active/CTA moments.
const variantStyles: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  primary: 'border-transparent bg-brand/10 text-brand',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  success: 'border-transparent bg-success/10 text-success',
  warning: 'border-transparent bg-warning/10 text-warning',
  danger: 'border-transparent bg-destructive/10 text-destructive',
  outline: 'border-border bg-transparent text-foreground',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-xs',
  md: 'gap-1 px-2.5 py-0.5 text-xs',
  lg: 'gap-1.5 px-3 py-1 text-sm',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-full border font-medium leading-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
