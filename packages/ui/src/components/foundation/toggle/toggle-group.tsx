'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';
import { type ToggleSize, toggleVariants } from './toggle';

export type ToggleGroupVariant = 'segmented' | 'outline';
export type ToggleGroupSize = ToggleSize;

export interface ToggleGroupProps
  extends Omit<
    ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    'type' | 'value' | 'defaultValue' | 'onValueChange' | 'disabled'
  > {
  isMultiple?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  isDisabled?: boolean;
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
}

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
  idBase: string;
  isMultiple: boolean;
  selectedValues: string[];
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext(component: string): ToggleGroupContextValue {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <ToggleGroup>.`);
  }
  return ctx;
}

const rootVariantStyles: Record<ToggleGroupVariant, string> = {
  segmented: 'inline-flex items-stretch gap-0 rounded-lg bg-muted p-1',
  outline: 'inline-flex items-center gap-1',
};

const itemSizeStyles: Record<ToggleGroupSize, string> = {
  sm: 'h-8 gap-1 px-2.5 text-xs',
  md: 'h-9 gap-1.5 px-3 text-sm',
  lg: 'h-10 gap-2 px-4 text-base',
};

const ToggleGroupRoot = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className,
      isMultiple = false,
      value: valueProp,
      defaultValue,
      onValueChange,
      isDisabled = false,
      variant = 'segmented',
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const idBase = useId();
    const [internalValue, setInternalValue] = useState<string | string[]>(
      () => defaultValue ?? (isMultiple ? [] : ''),
    );
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const handleValueChange = useCallback(
      (next: string | string[]) => {
        if (!isControlled) setInternalValue(next);
        onValueChange?.(next);
      },
      [isControlled, onValueChange],
    );

    const selectedValues = useMemo<string[]>(
      () => (Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []),
      [currentValue],
    );

    const contextValue = useMemo<ToggleGroupContextValue>(
      () => ({ variant, size, idBase, isMultiple, selectedValues }),
      [variant, size, idBase, isMultiple, selectedValues],
    );

    const rootClassName = cn(rootVariantStyles[variant], className);

    return (
      <ToggleGroupContext.Provider value={contextValue}>
        {isMultiple ? (
          <ToggleGroupPrimitive.Root
            ref={ref}
            type="multiple"
            value={currentValue as string[]}
            onValueChange={handleValueChange as (value: string[]) => void}
            disabled={isDisabled}
            className={rootClassName}
            {...props}
          >
            {children}
          </ToggleGroupPrimitive.Root>
        ) : (
          <ToggleGroupPrimitive.Root
            ref={ref}
            type="single"
            value={currentValue as string}
            onValueChange={handleValueChange as (value: string) => void}
            disabled={isDisabled}
            className={rootClassName}
            {...props}
          >
            {children}
          </ToggleGroupPrimitive.Root>
        )}
      </ToggleGroupContext.Provider>
    );
  },
);
ToggleGroupRoot.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    'disabled'
  > {
  value: string;
  isDisabled?: boolean;
}

function segmentedIndicatorClassName(): string {
  return 'absolute inset-0 rounded-md border border-border bg-background shadow-sm';
}

export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ className, value, isDisabled, children, ...props }, ref) => {
    const { variant, size, idBase, isMultiple, selectedValues } =
      useToggleGroupContext('ToggleGroupItem');
    const shouldReduceMotion = useReducedMotion();
    const isSelected = selectedValues.includes(value);
    const useSlidingIndicator = variant === 'segmented' && !isMultiple && isSelected;

    if (variant === 'outline') {
      return (
        <ToggleGroupPrimitive.Item
          ref={ref}
          value={value}
          disabled={isDisabled}
          className={toggleVariants({ variant: 'outline', size, className })}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Item>
      );
    }

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={isDisabled}
        className={cn(
          'relative inline-flex flex-1 cursor-pointer items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-[transform,color,background-color,box-shadow] duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          itemSizeStyles[size],
          isSelected ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          // Multi-select has no shared layoutId — each active segment gets its own chip.
          isMultiple &&
            isSelected &&
            'bg-background shadow-sm ring-1 ring-border/50',
          className,
        )}
        {...props}
      >
        {useSlidingIndicator && (
          <motion.span
            aria-hidden
            className={segmentedIndicatorClassName()}
            layout
            layoutId={`${idBase}-indicator`}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
      </ToggleGroupPrimitive.Item>
    );
  },
);
ToggleGroupItem.displayName = 'ToggleGroupItem';

export const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});
