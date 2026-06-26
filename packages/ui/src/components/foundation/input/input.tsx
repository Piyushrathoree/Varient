import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type InputSize = 'sm' | 'md' | 'lg';

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
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {isRequired && (
              <span className="ml-0.5 text-danger" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div
          className={cn(
            'flex items-center overflow-hidden rounded-md border bg-bg-base transition-colors',
            hasError
              ? 'border-danger ring-2 ring-danger/20'
              : 'border-border focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20',
            isDisabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {leftAddon && (
            <span
              className={cn(
                'flex shrink-0 items-center pl-3 text-text-tertiary',
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
              'w-full min-w-0 flex-1 bg-transparent text-text-primary outline-none placeholder:text-text-tertiary',
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
                'flex shrink-0 items-center pr-3 text-text-tertiary',
                addonSizeStyles[size],
              )}
            >
              {rightAddon}
            </span>
          )}
        </div>

        {errorText && (
          <p id={errorId} className="text-sm text-danger" role="alert">
            {errorText}
          </p>
        )}

        {!errorText && helperText && (
          <p id={helperId} className="text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
