'use client';

import { forwardRef, useId, type ComponentPropsWithoutRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * default — rounded-square box, brand fill + border when checked.
 * round — fully circular box, same fill treatment.
 * filled — square box that is always tinted (muted when unchecked, brand
 *   when checked/indeterminate) instead of a bordered outline.
 */
export type CheckboxVariant = 'default' | 'round' | 'filled';

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    'checked' | 'defaultChecked' | 'onCheckedChange' | 'onChange'
  > {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  /** Dash glyph instead of a check — wins over isChecked when both are set. */
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  size?: CheckboxSize;
  /** Visual style of the box. Defaults to 'default'. */
  variant?: CheckboxVariant;
  label?: string;
}

const boxSizeStyles: Record<CheckboxSize, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

const iconSizeStyles: Record<CheckboxSize, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
};

const shapeStyles: Record<CheckboxVariant, string> = {
  default: 'rounded-md',
  round: 'rounded-full',
  filled: 'rounded-md',
};

// Plain accessible checkbox — Radix wires role="checkbox", keyboard
// activation, and (via aria-checked) the mixed/indeterminate state for us.
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      isChecked,
      onChange,
      isIndeterminate = false,
      isDisabled = false,
      size = 'md',
      variant = 'default',
      label,
      id: idProp,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = idProp ?? generatedId;
    const shouldReduceMotion = useReducedMotion();

    const checkedState = isIndeterminate ? 'indeterminate' : isChecked;
    const isFilled = checkedState !== false;

    return (
      <span className="inline-flex items-center gap-2.5">
        <CheckboxPrimitive.Root
          ref={ref}
          id={checkboxId}
          checked={checkedState}
          onCheckedChange={(state) => onChange(state === true)}
          disabled={isDisabled}
          aria-label={label ? undefined : (ariaLabelProp ?? 'Checkbox')}
          className={cn(
            'peer inline-flex shrink-0 cursor-pointer items-center justify-center border transition-[color,background-color,border-color,transform] duration-200 ease-out active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            shapeStyles[variant],
            variant === 'filled'
              ? isFilled
                ? 'border-transparent bg-brand'
                : 'border-transparent bg-muted hover:bg-muted/70'
              : isFilled
                ? 'border-brand bg-brand'
                : 'border-input bg-transparent hover:border-foreground/20',
            boxSizeStyles[size],
            className,
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator forceMount className="grid place-content-center text-white">
            <AnimatePresence mode="wait" initial={false}>
              {checkedState === 'indeterminate' && (
                <motion.svg
                  key="indeterminate"
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={iconSizeStyles[size]}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                >
                  <motion.path
                    d="M5 12h14"
                    initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
                    animate={shouldReduceMotion ? undefined : { pathLength: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                  />
                </motion.svg>
              )}
              {checkedState === true && (
                <motion.svg
                  key="check"
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={iconSizeStyles[size]}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                >
                  <motion.path
                    // Left tip -> corner -> right tip, so pathLength draws the
                    // tick in natural left-to-right writing order (not the
                    // mirrored right-to-left order of the raw Feather path).
                    d="M4 12L9 17L20 6"
                    initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
                    animate={shouldReduceMotion ? undefined : { pathLength: 1 }}
                    transition={
                      shouldReduceMotion ? { duration: 0 } : { ...SPRING_DEFAULT, delay: 0.05 }
                    }
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {label && (
          <label
            htmlFor={checkboxId}
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

Checkbox.displayName = 'Checkbox';
