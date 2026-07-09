'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type KbdSize = 'sm' | 'md';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: KbdSize;
}

const sizeStyles: Record<KbdSize, string> = {
  sm: 'min-h-5 px-1.5 text-[10px] leading-none',
  md: 'min-h-6 px-2 text-xs leading-none',
};

// SmoothUI-style key chip — hairline border with a subtle bottom edge for depth.
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-muted font-mono font-medium text-muted-foreground shadow-[0_1px_0_0_var(--color-border)]',
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
);

Kbd.displayName = 'Kbd';

export interface KbdGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Keys to render — joined with `+` separators. */
  keys: ReactNode[];
  size?: KbdSize;
}

export const KbdGroup = forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ className, keys, size = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('inline-flex items-center gap-1', className)}
      role="group"
      {...props}
    >
      {keys.map((key, index) => (
        <span key={index} className="inline-flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden className="text-xs text-muted-foreground">
              +
            </span>
          )}
          <Kbd size={size}>{key}</Kbd>
        </span>
      ))}
    </div>
  ),
);

KbdGroup.displayName = 'KbdGroup';
