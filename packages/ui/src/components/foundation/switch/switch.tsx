'use client';

import { forwardRef, useId, type ButtonHTMLAttributes } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  isDisabled?: boolean;
  size?: SwitchSize;
  label?: string;
}

// SmoothUI's animated-toggle spring — snappy, low-bounce.
const SPRING = { type: 'spring' as const, duration: 0.25, bounce: 0.1 };

const trackSizeStyles: Record<SwitchSize, string> = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-14',
};

const thumbSizeStyles: Record<SwitchSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

// Track has a 2px inset (p-0.5) on all sides; translate distance = track
// width − 2×inset − thumb width, precomputed per size so the thumb always
// lands flush against the far edge.
const thumbTranslateX: Record<SwitchSize, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

// Plain accessible toggle — role="switch" on a real <button> gets Enter/Space
// activation for free from the browser, so no custom key handling is needed.
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      isChecked,
      onChange,
      isDisabled = false,
      size = 'md',
      label,
      id: idProp,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const switchId = idProp ?? generatedId;
    const shouldReduceMotion = useReducedMotion();

    return (
      <span className="inline-flex items-center gap-2.5">
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-label={label ? undefined : (ariaLabelProp ?? 'Toggle')}
          disabled={isDisabled}
          onClick={() => onChange(!isChecked)}
          className={cn(
            'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isChecked ? 'bg-brand' : 'bg-muted-foreground/30',
            trackSizeStyles[size],
            className,
          )}
          {...props}
        >
          <motion.span
            animate={{ x: isChecked ? thumbTranslateX[size] : 0 }}
            aria-hidden
            className={cn(
              'pointer-events-none inline-block rounded-full border border-border bg-background shadow-sm',
              thumbSizeStyles[size],
            )}
            initial={false}
            transition={shouldReduceMotion ? { duration: 0 } : SPRING}
          />
        </button>

        {label && (
          <label
            htmlFor={switchId}
            className={cn(
              'select-none text-sm font-medium text-foreground',
              isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            )}
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);

Switch.displayName = 'Switch';
