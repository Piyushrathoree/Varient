'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'frame';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  size?: InputSize;
  variant?: InputVariant;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-11 px-4 text-base',
};

const addonSizeStyles: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

// One clear focus signal per variant: the border shifts to a solid accent
// color, backed by a soft low-opacity glow (never a hard, opaque second
// ring stacked on top of the border — that reads as a double outline).
const containerVariantStyles: Record<InputVariant, string> = {
  default:
    'border border-input hover:border-input/70 focus-within:border-ring focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-ring)_16%,transparent)]',
  // Soft filled surface at rest — no visible border until focused, so the
  // fill itself signals "this is editable" without adding a second line.
  filled:
    'border border-transparent bg-muted hover:bg-muted/70 focus-within:border-ring focus-within:bg-background focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-ring)_16%,transparent)]',
  // Gradient-frame glow — pairs with Button variant="frame".
  frame:
    'border-2 border-transparent [background:linear-gradient(var(--color-background),var(--color-background))_padding-box,linear-gradient(135deg,var(--color-brand),var(--color-brand-secondary))_border-box] hover:shadow-xs focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand)_16%,transparent)]',
};

// Error takes over the container look entirely regardless of variant — same
// soft-glow treatment as focus, just in the destructive hue, and always on
// (not gated to focus-within) so the problem stays visible at a glance.
const errorStyles =
  'border border-destructive shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-destructive)_16%,transparent)]';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      errorText,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      leftAddon,
      rightAddon,
      size = 'md',
      variant = 'default',
      id: idProp,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = errorText ? `${inputId}-error` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(errorText);

    return (
      <div className={cn('flex w-full flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className="font-medium text-foreground text-sm leading-none">
            {label}
            {isRequired && (
              <span className="ml-0.5 text-destructive" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div
          className={cn(
            'flex items-center overflow-hidden rounded-md bg-background transition-[color,box-shadow,border-color] duration-200 ease-out motion-reduce:transition-none',
            hasError ? errorStyles : containerVariantStyles[variant],
            isDisabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {leftAddon && (
            <span
              className={cn(
                'flex shrink-0 items-center pl-3 text-muted-foreground',
                addonSizeStyles[size],
              )}
            >
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              'w-full min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
              'disabled:cursor-not-allowed',
              sizeStyles[size],
              leftAddon ? 'pl-2' : undefined,
              rightAddon ? 'pr-2' : undefined,
            )}
            {...props}
          />

          {rightAddon && (
            <span
              className={cn(
                'flex shrink-0 items-center pr-3 text-muted-foreground',
                addonSizeStyles[size],
              )}
            >
              {rightAddon}
            </span>
          )}
        </div>

        {errorText && (
          <p id={errorId} className="text-destructive text-sm" role="alert">
            {errorText}
          </p>
        )}

        {!errorText && helperText && (
          <p id={helperId} className="text-muted-foreground text-sm">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
