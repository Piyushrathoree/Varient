'use client';

import { forwardRef, useMemo, useState, type ComponentPropsWithoutRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps
  extends Omit<
    ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    'value' | 'defaultValue' | 'onValueChange' | 'disabled' | 'orientation'
  > {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  isDisabled?: boolean;
  onValueChange?: (value: number[]) => void;
  size?: SliderSize;
  orientation?: 'horizontal' | 'vertical';
}

const trackSizeStyles: Record<SliderSize, { horizontal: string; vertical: string }> = {
  sm: { horizontal: 'h-1.5', vertical: 'w-1.5' },
  md: { horizontal: 'h-2', vertical: 'w-2' },
  lg: { horizontal: 'h-2', vertical: 'w-2' },
};

const thumbSizeStyles: Record<SliderSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
};

function SliderThumbItem({
  index,
  thumbCount,
  size,
  isDisabled,
  shouldReduceMotion,
}: {
  index: number;
  thumbCount: number;
  size: SliderSize;
  isDisabled: boolean;
  shouldReduceMotion: boolean;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const scale =
    isDisabled || shouldReduceMotion ? 1 : isPressed ? 0.94 : isHovered ? 1.12 : 1;

  const clearPress = () => setIsPressed(false);

  return (
    <SliderPrimitive.Thumb
      asChild
      aria-label={thumbCount > 1 ? `Thumb ${index + 1}` : 'Slider thumb'}
    >
      <motion.span
        animate={{ scale }}
        transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
        onPointerEnter={() => !isDisabled && setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onPointerDown={() => !isDisabled && setIsPressed(true)}
        onPointerUp={clearPress}
        onPointerCancel={clearPress}
        className={cn(
          'block cursor-grab rounded-full border border-border bg-background shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none',
          'active:cursor-grabbing',
          thumbSizeStyles[size],
        )}
      />
    </SliderPrimitive.Thumb>
  );
}

// Radix-powered slider — keyboard navigation, ARIA roles, and pointer
// dragging come from the primitive; we own track/range/thumb visuals and
// the springy thumb press/hover affordance gated behind reduced motion.
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      isDisabled = false,
      onValueChange,
      size = 'md',
      orientation = 'horizontal',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = !!useReducedMotion();
    const isHorizontal = orientation === 'horizontal';

    const thumbCount = useMemo(
      () => value?.length ?? defaultValue?.length ?? 1,
      [value, defaultValue],
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          'relative flex touch-none select-none items-center',
          isDisabled && 'opacity-50',
          isHorizontal ? 'w-full' : 'h-full min-h-[160px] flex-col',
          className,
        )}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        orientation={orientation}
        onValueChange={onValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative grow overflow-hidden rounded-full bg-muted',
            isHorizontal ? trackSizeStyles[size].horizontal : trackSizeStyles[size].vertical,
            isHorizontal ? 'w-full' : 'h-full',
          )}
        >
          <SliderPrimitive.Range
            className={cn(
              'absolute rounded-full bg-brand',
              isHorizontal ? 'h-full' : 'w-full',
            )}
          />
        </SliderPrimitive.Track>

        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderThumbItem
            key={index}
            index={index}
            thumbCount={thumbCount}
            size={size}
            isDisabled={isDisabled}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = 'Slider';
