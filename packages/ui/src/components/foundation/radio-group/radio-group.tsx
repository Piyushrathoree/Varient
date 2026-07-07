'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT, SPRING_SNAPPY } from '../../../lib/animation';

export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps
  extends Omit<
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    'value' | 'defaultValue' | 'onValueChange' | 'orientation' | 'disabled' | 'onChange'
  > {
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  orientation?: RadioGroupOrientation;
}

interface RadioGroupContextValue {
  value: string;
  isDisabled: boolean;
}

// Items read the selected value + group-level disabled state from context —
// Radix's own context is internal, so we mirror only what Item needs.
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(component: string) {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside a <RadioGroup>.`);
  }
  return context;
}

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    { className, value, onChange, isDisabled = false, orientation = 'vertical', ...props },
    ref,
  ) => {
    return (
      <RadioGroupContext.Provider value={{ value, isDisabled }}>
        <RadioGroupPrimitive.Root
          ref={ref}
          value={value}
          onValueChange={onChange}
          disabled={isDisabled}
          orientation={orientation}
          className={cn(
            orientation === 'vertical' ? 'flex flex-col gap-4' : 'flex flex-wrap items-center gap-5',
            className,
          )}
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroupRoot.displayName = 'RadioGroup';

export type RadioGroupItemVariant = 'default' | 'card';

export interface RadioGroupItemProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'disabled'> {
  isDisabled?: boolean;
  label?: string;
  /** Secondary line of copy under the label — only rendered by the 'card' variant. */
  description?: string;
  /** 'card' wraps the dot + label in a soft-cornered, fully clickable tile. */
  variant?: RadioGroupItemVariant;
}

const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  (
    {
      className,
      value,
      isDisabled,
      label,
      description,
      variant = 'default',
      id: idProp,
      'aria-label': ariaLabelProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const itemId = idProp ?? generatedId;
    const shouldReduceMotion = useReducedMotion();
    const group = useRadioGroupContext('RadioGroup.Item');
    const disabled = isDisabled ?? group.isDisabled;
    const isItemChecked = group.value === value;

    const dot = (
      <motion.div
        className="relative shrink-0"
        whileHover={shouldReduceMotion || disabled ? undefined : { scale: 1.08 }}
        whileTap={shouldReduceMotion || disabled ? undefined : { scale: 0.94 }}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          value={value}
          disabled={disabled}
          aria-label={label ? undefined : (ariaLabelProp ?? 'Radio option')}
          className={cn(
            'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isItemChecked
              ? 'border-brand ring-4 ring-brand/15'
              : 'border-input hover:border-foreground/20',
            className,
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator forceMount className="flex items-center justify-center">
            <AnimatePresence>
              {isItemChecked && (
                <motion.span
                  key="dot"
                  aria-hidden
                  className="block size-3 rounded-full bg-brand"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                />
              )}
            </AnimatePresence>
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      </motion.div>
    );

    // 'card' turns the whole row into a selectable tile — soft rounded-xl
    // chrome (never the perfectly-circular dot itself) with a two-line label
    // slot, matching the plan-picker pattern callers used to hand-roll.
    if (variant === 'card') {
      const cardLabel: ReactNode = (label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {description && <span className="text-sm text-muted-foreground">{description}</span>}
        </span>
      );

      return (
        <label
          htmlFor={itemId}
          className={cn(
            'flex items-start gap-3 rounded-xl border p-4 transition-colors',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            isItemChecked ? 'border-brand bg-brand/5' : 'border-border hover:border-foreground/20',
          )}
        >
          {dot}
          {cardLabel}
        </label>
      );
    }

    return (
      <span className="inline-flex items-center gap-3">
        {dot}

        {label && (
          <label
            htmlFor={itemId}
            className={cn(
              'select-none text-sm font-medium text-foreground',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            )}
          >
            {label}
          </label>
        )}
      </span>
    );
  },
);
RadioGroupItem.displayName = 'RadioGroup.Item';

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
