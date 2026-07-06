import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'frame';

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
            'flex items-center overflow-hidden rounded-md border bg-background shadow-xs transition-[color,box-shadow]',
            hasError
              ? 'border-destructive ring-[3px] ring-destructive/20 dark:ring-destructive/40'
              : variant === 'frame'
                ? // Gradient-frame glow — pairs with Button variant="frame".
                  'border-2 border-transparent [background:linear-gradient(var(--color-background),var(--color-background))_padding-box,linear-gradient(135deg,var(--color-brand),var(--color-brand-secondary))_border-box] focus-within:shadow-md'
                : 'border-input focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
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
