'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_BOUNCE, SPRING_DEFAULT } from '../../../lib/animation';

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
  /** Renders a small floating value label above the actively pressed/focused thumb. */
  showValue?: boolean;
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
  showValue,
  value,
  isHorizontal,
}: {
  index: number;
  thumbCount: number;
  size: SliderSize;
  isDisabled: boolean;
  shouldReduceMotion: boolean;
  showValue: boolean;
  value: number | undefined;
  isHorizontal: boolean;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const scale =
    isDisabled || shouldReduceMotion ? 1 : isPressed ? 0.94 : isHovered ? 1.12 : 1;

  const isActive = isPressed || isFocused;

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
        onFocus={() => !isDisabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          'relative block cursor-grab rounded-full border border-border bg-background shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none',
          'active:cursor-grabbing',
          thumbSizeStyles[size],
        )}
      >
        {showValue && value !== undefined ? (
          <AnimatePresence>
            {isActive ? (
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 4 }}
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_BOUNCE}
                aria-hidden
                className={cn(
                  'pointer-events-none absolute z-10 rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-foreground shadow-sm',
                  isHorizontal
                    ? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
                    : 'left-full top-1/2 ml-2 -translate-y-1/2',
                )}
              >
                {value}
              </motion.span>
            ) : null}
          </AnimatePresence>
        ) : null}
      </motion.span>
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
      showValue = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = !!useReducedMotion();
    const isHorizontal = orientation === 'horizontal';
    const easeScopeId = useId().replace(/:/g, '');

    // Only ease programmatic value changes (external setValue), never live
    // pointer/keyboard interaction — a transition during an active drag or
    // key-repeat would make the thumb visibly lag behind the input.
    const [isInteracting, setIsInteracting] = useState(false);
    const startInteracting = () => setIsInteracting(true);
    const stopInteracting = () => setIsInteracting(false);
    const shouldEase = !shouldReduceMotion && !isInteracting;

    // Mirror the live value internally so eased-transition and showValue
    // rendering work for both controlled and uncontrolled usage — external
    // setValue() calls (controlled) sync in via the effect below.
    const [internalValue, setInternalValue] = useState<number[]>(
      () => value ?? defaultValue ?? [min],
    );

    useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    const handleValueChange = (next: number[]) => {
      setInternalValue(next);
      onValueChange?.(next);
    };

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
        data-varient-slider-eased={shouldEase ? easeScopeId : undefined}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={isDisabled}
        orientation={orientation}
        onValueChange={handleValueChange}
        onPointerDown={startInteracting}
        onPointerUp={stopInteracting}
        onPointerCancel={stopInteracting}
        onKeyDown={startInteracting}
        onKeyUp={stopInteracting}
        onBlurCapture={stopInteracting}
        {...props}
      >
        {shouldEase ? (
          // Radix positions the Range via inline left/right (or top/bottom)
          // percentages and the Thumb via an internal wrapper span we can't
          // reach with className. Scope a CSS transition to this instance so
          // programmatic value changes (external setValue) ease in ~150ms
          // instead of snapping, without touching global.css. Only mounted
          // while not reduced-motion and not mid-interaction, so live
          // dragging/keying never lags behind the pointer.
          <style>{`
            [data-varient-slider-eased="${easeScopeId}"] span[style*="position: absolute"],
            [data-varient-slider-eased="${easeScopeId}"] span[style*="position:absolute"] {
              transition: left 150ms ease-out, right 150ms ease-out, top 150ms ease-out, bottom 150ms ease-out;
            }
          `}</style>
        ) : null}

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
              shouldEase && 'transition-[left,right,top,bottom] duration-150 ease-out',
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
            showValue={showValue}
            value={internalValue[index]}
            isHorizontal={isHorizontal}
          />
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = 'Slider';
