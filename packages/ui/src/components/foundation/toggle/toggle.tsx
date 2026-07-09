'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../../lib/utils';

export type ToggleVariant = 'default' | 'outline';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps
  extends Omit<
    ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    'pressed' | 'defaultPressed' | 'onPressedChange' | 'disabled'
  > {
  isPressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  isDisabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
}

const variantStyles: Record<ToggleVariant, string> = {
  default: '',
  outline: 'border border-input bg-background shadow-xs',
};

const sizeStyles: Record<ToggleSize, string> = {
  sm: 'h-9 gap-1.5 px-4 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-8 text-base',
};

export function toggleVariants({
  variant = 'default',
  size = 'md',
  className,
}: {
  variant?: ToggleVariant;
  size?: ToggleSize;
  className?: string;
}) {
  return cn(
    'inline-flex cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap text-muted-foreground ring-offset-background transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none',
    'hover:bg-muted hover:text-foreground',
    'data-[state=on]:bg-muted data-[state=on]:text-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      isPressed,
      defaultPressed,
      onPressedChange,
      isDisabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <TogglePrimitive.Root
        ref={ref}
        className={toggleVariants({ variant, size, className })}
        pressed={isPressed}
        defaultPressed={defaultPressed}
        onPressedChange={onPressedChange}
        disabled={isDisabled}
        {...props}
      >
        {children}
      </TogglePrimitive.Root>
    );
  },
);

Toggle.displayName = 'Toggle';
