'use client';

import { forwardRef, useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * `default`  — clean pill, spring thumb only.
 * `icons`    — check/x glyphs live inside the track (fixed at each end) and
 *              cross-fade + nudge as the thumb reveals/covers them.
 * `labeled`  — same mechanism as `icons` but with "I"/"O" text glyphs.
 */
export type SwitchVariant = 'default' | 'icons' | 'labeled';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue'> {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  isDisabled?: boolean;
  size?: SwitchSize;
  /** Visual style. Additive — `default` matches the original look. */
  variant?: SwitchVariant;
  label?: string;
}

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

const slotIconSizeStyles: Record<SwitchSize, string> = {
  sm: 'size-2.5',
  md: 'size-3',
  lg: 'size-3.5',
};

const slotTextSizeStyles: Record<SwitchSize, string> = {
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-[11px]',
};

// Thumb press affordance — a soft squash/stretch, like a rubber pill being
// pinched. Reset the instant the pointer lifts, and skipped entirely under
// reduced motion.
const PRESS_SQUASH = { scaleX: 1.16, scaleY: 0.86 };
const PRESS_RESET = { scaleX: 1, scaleY: 1 };

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

// Fixed at the track's inner edges (not riding the thumb) — the "on" glyph
// sits under where the thumb parks when off, and vice versa, so toggling
// reveals one and covers the other while both cross-fade + nudge in sync
// with the thumb's spring.
function TrackSlots({
  variant,
  isChecked,
  size,
  shouldReduceMotion,
}: {
  variant: SwitchVariant;
  isChecked: boolean;
  size: SwitchSize;
  shouldReduceMotion: boolean;
}) {
  const transition = shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT;

  let onGlyph: ReactNode;
  let offGlyph: ReactNode;
  if (variant === 'icons') {
    onGlyph = <CheckGlyph className={slotIconSizeStyles[size]} />;
    offGlyph = <XGlyph className={slotIconSizeStyles[size]} />;
  } else {
    onGlyph = <span className={cn('font-bold leading-none', slotTextSizeStyles[size])}>I</span>;
    offGlyph = <span className={cn('font-bold leading-none', slotTextSizeStyles[size])}>O</span>;
  }

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between px-0.5"
    >
      <motion.span
        animate={{ opacity: isChecked ? 1 : 0, scale: isChecked ? 1 : 0.6, x: isChecked ? 0 : -3 }}
        className={cn('flex items-center justify-center text-white', thumbSizeStyles[size])}
        initial={false}
        transition={transition}
      >
        {onGlyph}
      </motion.span>
      <motion.span
        animate={{ opacity: isChecked ? 0 : 1, scale: isChecked ? 0.6 : 1, x: isChecked ? 3 : 0 }}
        className={cn(
          'flex items-center justify-center text-muted-foreground',
          thumbSizeStyles[size],
        )}
        initial={false}
        transition={transition}
      >
        {offGlyph}
      </motion.span>
    </span>
  );
}

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
      variant = 'default',
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
    const [isPressed, setIsPressed] = useState(false);

    const clearPress = () => setIsPressed(false);
    const pressStyle = !shouldReduceMotion && isPressed ? PRESS_SQUASH : PRESS_RESET;

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
          onPointerDown={() => !isDisabled && setIsPressed(true)}
          onPointerUp={clearPress}
          onPointerLeave={clearPress}
          onPointerCancel={clearPress}
          className={cn(
            'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isChecked ? 'bg-brand' : 'bg-muted-foreground/30',
            trackSizeStyles[size],
            className,
          )}
          {...props}
        >
          {variant !== 'default' && (
            <TrackSlots
              variant={variant}
              isChecked={isChecked}
              size={size}
              shouldReduceMotion={!!shouldReduceMotion}
            />
          )}

          <motion.span
            animate={{ x: isChecked ? thumbTranslateX[size] : 0, ...pressStyle }}
            aria-hidden
            className={cn(
              'pointer-events-none relative z-10 inline-block rounded-full border border-border bg-background shadow-sm',
              thumbSizeStyles[size],
            )}
            initial={false}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
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
