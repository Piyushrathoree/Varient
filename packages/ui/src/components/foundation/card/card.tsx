'use client';

import {
  forwardRef,
  useCallback,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../lib/utils';

export type CardVariant = 'default' | 'outline' | 'ghost';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Lifts + brightens the hairline on hover — for cards that sit in a browsable grid. */
  isHoverable?: boolean;
  /** Marks the card as an interactive target: pointer cursor, press feedback, keyboard-activatable. */
  isClickable?: boolean;
}

// Default card surface: bg-card + a 1px hairline + a soft ambient shadow (shadow-sm).
const variantStyles: Record<CardVariant, string> = {
  default: 'border border-border bg-card shadow-sm',
  outline: 'border border-border bg-transparent',
  ghost: 'border border-transparent bg-transparent',
};

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      isHoverable = false,
      isClickable = false,
      onKeyDown,
      children,
      ...props
    },
    ref,
  ) => {
    // Native <div role="button"> gets no free Enter/Space activation the way
    // a real <button> does, so we simulate it — dispatching a real click
    // keeps this in sync with whatever onClick the consumer passed via props.
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (!isClickable || event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      [isClickable, onKeyDown],
    );

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex flex-col rounded-xl text-card-foreground transition-shadow duration-300 ease-out motion-reduce:transition-none',
          variantStyles[variant],
          isHoverable && 'hover:border-foreground/20 hover:shadow-xl',
          isClickable && 'cursor-pointer active:scale-[0.99]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardRoot.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'Card.Header';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-display text-lg font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  ),
);
CardTitle.displayName = 'Card.Title';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
);
CardDescription.displayName = 'Card.Description';

// `first:pt-6` restores top padding when Body/Footer is used without a
// preceding Header, without double-stacking padding when it isn't.
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 px-6 pb-6 first:pt-6', className)} {...props} />
  ),
);
CardBody.displayName = 'Card.Body';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 px-6 pb-6 first:pt-6', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});
