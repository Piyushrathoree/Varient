'use client';

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaVariant = 'default' | 'filled';
export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  size?: TextareaSize;
  variant?: TextareaVariant;
  resize?: TextareaResize;
}

const sizeStyles: Record<TextareaSize, string> = {
  sm: 'min-h-20 px-3 py-2 text-sm',
  md: 'min-h-24 px-3 py-2.5 text-sm',
  lg: 'min-h-28 px-4 py-3 text-base',
};

const resizeStyles: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  both: 'resize',
};

const containerVariantStyles: Record<TextareaVariant, string> = {
  default:
    'border border-input hover:border-input/70 focus-within:border-ring focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-ring)_16%,transparent)]',
  filled:
    'border border-transparent bg-muted hover:bg-muted/70 focus-within:border-ring focus-within:bg-background focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-ring)_16%,transparent)]',
};

const errorStyles =
  'border border-destructive shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-destructive)_16%,transparent)]';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      errorText,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      size = 'md',
      variant = 'default',
      resize = 'vertical',
      id: idProp,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = errorText ? `${textareaId}-error` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(errorText);

    return (
      <div className={cn('flex w-full flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={textareaId} className="font-medium text-foreground text-sm leading-none">
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
            'overflow-hidden rounded-md bg-background shadow-xs transition-[color,box-shadow,border-color] duration-200 ease-out motion-reduce:transition-none',
            hasError ? errorStyles : containerVariantStyles[variant],
            isDisabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            className={cn(
              'block w-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
              'focus-visible:outline-none',
              'disabled:cursor-not-allowed',
              sizeStyles[size],
              resizeStyles[resize],
            )}
            {...props}
          />
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

Textarea.displayName = 'Textarea';
