'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export type ButtonCopyVariant = 'default' | 'secondary' | 'outline' | 'ghost';

// Same size scale as Button, minus the text-padding concerns — this is
// always a circular icon button, so the map is a square dimension per key.
export type ButtonCopySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** `icon` is the classic circular icon-only button; `label` widens into a
 * pill with a "Copy" → "Copying" → "Copied" text label next to the icon. */
export type ButtonCopyDisplay = 'icon' | 'label';

type CopyState = 'idle' | 'copying' | 'copied';

// The root element is a motion.button, which redefines these DOM event
// handlers with its own gesture/animation signatures, so the native React
// ones must be omitted to spread ButtonHTMLAttributes onto it without a
// type conflict (same pattern as MagneticButton).
type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | 'onCopy'
  | 'disabled'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
>;

export interface ButtonCopyProps extends NativeButtonProps {
  /** Text written via `navigator.clipboard.writeText`. Ignored when `onCopy` is set. */
  content?: string;
  /** Custom copy handler, takes priority over `content`. Awaited before "copied" shows. */
  onCopy?: () => Promise<void> | void;
  variant?: ButtonCopyVariant;
  size?: ButtonCopySize;
  /** `icon` (default) is a circular icon-only button; `label` shows a
   * "Copy" / "Copying" / "Copied" text label beside the icon and widens to fit. */
  display?: ButtonCopyDisplay;
  /** Milliseconds the "copied" state holds before resetting to idle. */
  resetDelay?: number;
  isDisabled?: boolean;
}

const variantStyles: Record<ButtonCopyVariant, string> = {
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
  outline: 'border border-input bg-background text-foreground shadow-xs hover:bg-muted',
  ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
};

// Icon-only: a fixed circular footprint.
const iconContainerSizeStyles: Record<ButtonCopySize, string> = {
  xs: 'size-7',
  sm: 'size-9',
  md: 'size-10',
  lg: 'size-11',
  xl: 'size-12',
};

// Label mode: fixed height, auto width, room for the text to breathe.
const labelContainerSizeStyles: Record<ButtonCopySize, string> = {
  xs: 'h-7 gap-1.5 px-2.5 text-xs',
  sm: 'h-9 gap-1.5 px-3 text-xs',
  md: 'h-10 gap-2 px-3.5 text-sm',
  lg: 'h-11 gap-2 px-4 text-sm',
  xl: 'h-12 gap-2.5 px-5 text-base',
};

const iconSizeStyles: Record<ButtonCopySize, string> = {
  xs: 'size-3.5',
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-4',
  xl: 'size-5',
};

const stateLabel: Record<CopyState, string> = {
  idle: 'Copy',
  copying: 'Copying',
  copied: 'Copied',
};

// Minimum time the spinner stays up, so an instant clipboard write still
// reads as a deliberate three-step morph instead of a flash.
const MIN_COPYING_MS = 350;

// Geometry for the spinner's partial ring — computed once so the arc/gap
// stay in sync with the circle's radius instead of being hand-tuned magic
// numbers baked into the dasharray string.
const SPINNER_RADIUS = 9;
const SPINNER_CIRCUMFERENCE = 2 * Math.PI * SPINNER_RADIUS;
// ~72% of the ring is drawn, leaving a visible gap so rotation actually
// reads as spinning motion rather than a static circle.
const SPINNER_ARC = SPINNER_CIRCUMFERENCE * 0.72;
const SPINNER_GAP = SPINNER_CIRCUMFERENCE - SPINNER_ARC;

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A genuine round spinner: an SVG circle with a partial, round-capped arc
// that spins continuously, instead of a CSS border-trick that can read as
// a chunky rounded square at small sizes.
function SpinnerIcon({ className, spin }: { className?: string; spin: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      animate={spin ? { rotate: 360 } : undefined}
      transition={
        spin ? { duration: 0.85, ease: 'linear', repeat: Infinity } : { duration: 0 }
      }
    >
      <circle
        cx="12"
        cy="12"
        r={SPINNER_RADIUS}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${SPINNER_ARC} ${SPINNER_GAP}`}
        opacity="0.85"
      />
    </motion.svg>
  );
}

/**
 * Copy button: idle → copying → copied, morphing via AnimatePresence.
 * Pass `content` for a plain clipboard write, or `onCopy` for custom logic
 * (e.g. copying rendered code) — `onCopy` wins if both are set.
 *
 * `display="icon"` (default) is a circular icon-only button. `display="label"`
 * widens into a pill showing the icon plus a "Copy" / "Copying" / "Copied"
 * text label, the button width animating smoothly via `layout`.
 *
 * Accessibility: in icon mode the accessible name lives in a visually-hidden
 * `aria-live` span so state changes are announced without depending on
 * assistive tech re-reading a changing `aria-label`. In label mode the
 * visible text itself is the accessible name, and the button is the live
 * region so its changes are still announced.
 */
export const ButtonCopy = forwardRef<HTMLButtonElement, ButtonCopyProps>(
  (
    {
      className,
      content,
      onCopy,
      variant = 'outline',
      size = 'md',
      display = 'icon',
      resetDelay = 1500,
      isDisabled = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = useState<CopyState>('idle');
    const shouldReduceMotion = useReducedMotion();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const handleClick = useCallback<NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['onClick']>>(
      (event) => {
        onClick?.(event);
        if (state !== 'idle') return;

        setState('copying');
        const startedAt = Date.now();

        void (async () => {
          try {
            if (onCopy) {
              await onCopy();
            } else if (content !== undefined) {
              await navigator.clipboard.writeText(content);
            }
          } catch {
            setState('idle');
            return;
          }

          const remaining = Math.max(0, MIN_COPYING_MS - (Date.now() - startedAt));
          timeoutRef.current = setTimeout(() => {
            setState('copied');
            timeoutRef.current = setTimeout(() => setState('idle'), resetDelay);
          }, remaining);
        })();
      },
      [state, onCopy, content, resetDelay, onClick],
    );

    const iconClassName = iconSizeStyles[size];
    const isCopied = state === 'copied';
    const icon =
      state === 'idle' ? (
        <CopyIcon className={iconClassName} />
      ) : state === 'copying' ? (
        <SpinnerIcon className={iconClassName} spin={!shouldReduceMotion} />
      ) : (
        // Sanctioned exception to the semantic-token palette — matches the
        // app's own copy-button confirmation color.
        <CheckIcon className={cn(iconClassName, 'text-emerald-500')} />
      );

    const isLabel = display === 'label';

    return (
      <motion.button
        ref={ref}
        type="button"
        layout
        disabled={isDisabled || state !== 'idle'}
        onClick={handleClick}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
        aria-live={isLabel ? 'polite' : undefined}
        aria-atomic={isLabel ? true : undefined}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden transition-colors',
          isLabel ? 'rounded-lg font-medium' : 'rounded-full',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-70',
          variantStyles[variant],
          isLabel ? labelContainerSizeStyles[size] : iconContainerSizeStyles[size],
          className,
        )}
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={state}
            className={cn('flex items-center justify-center', isLabel && 'gap-1.5')}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.5, rotate: -90 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, scale: 0.5, rotate: 90 }
            }
            transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
          >
            {icon}
            {isLabel && (
              <span className={cn(isCopied && 'text-emerald-500')}>{stateLabel[state]}</span>
            )}
          </motion.span>
        </AnimatePresence>

        {!isLabel && (
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {stateLabel[state]}
          </span>
        )}
      </motion.button>
    );
  },
);

ButtonCopy.displayName = 'ButtonCopy';
