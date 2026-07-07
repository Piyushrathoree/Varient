'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, SPRING_DEFAULT, SPRING_SNAPPY } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

/** Bubble color — maps to semantic tokens; the arrow always matches. */
export type TooltipColor =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'surface';

/** Entrance animation style. */
export type TooltipVariant = 'scale' | 'slide' | 'fade';

const DEFAULT_DELAY_DURATION = 200;

const colorStyles: Record<TooltipColor, string> = {
  default: 'bg-primary text-primary-foreground',
  brand: 'bg-brand text-white',
  success: 'bg-success text-white',
  warning: 'bg-warning text-white',
  destructive: 'bg-destructive text-white',
  surface: 'border border-border bg-popover text-popover-foreground',
};

const arrowColorStyles: Record<TooltipColor, string> = {
  default: 'fill-primary',
  brand: 'fill-brand',
  success: 'fill-success',
  warning: 'fill-warning',
  destructive: 'fill-destructive',
  surface: 'fill-popover',
};

// Marks a subtree as already sitting inside a `Tooltip.Provider`, so
// individual `Tooltip`s below it skip creating their own — this is what
// lets `Tooltip` be self-contained by default while still allowing a page
// to opt into one shared Radix provider (and its skip-delay behavior).
const TooltipProviderPresenceContext = createContext(false);

export type TooltipProviderProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;

// Optional page-level wrapper — share `delayDuration` / `skipDelayDuration`
// across every `Tooltip` beneath it instead of each one carrying its own.
export const TooltipProvider = ({
  delayDuration = DEFAULT_DELAY_DURATION,
  children,
  ...props
}: TooltipProviderProps) => (
  <TooltipProviderPresenceContext.Provider value={true}>
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props}>
      {children}
    </TooltipPrimitive.Provider>
  </TooltipProviderPresenceContext.Provider>
);
TooltipProvider.displayName = 'Tooltip.Provider';

export interface TooltipProps {
  /** Trigger element — cloned via `asChild`, so it must accept a ref. */
  children: ReactElement;
  /** Tooltip bubble content. */
  content: ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  /** Hover/focus delay in ms before the tooltip opens. */
  delayDuration?: number;
  isDisabled?: boolean;
  /** Bubble color, mapped to semantic tokens. @default 'default' */
  color?: TooltipColor;
  /** Entrance animation style. @default 'scale' */
  variant?: TooltipVariant;
  className?: string;
}

// SmoothUI's animated-tooltip pull — a 2–4px slide in from the side the
// tooltip appears on, resolved to an x/y offset per `side`.
const slideBySide: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: 0, y: 4 },
  bottom: { x: 0, y: -4 },
  left: { x: 4, y: 0 },
  right: { x: -4, y: 0 },
};

// `slide` is a more pronounced version of the same directional pull, with a
// snappier no-overshoot spring instead of the default's gentle bounce.
const slideVariantBySide: Record<TooltipSide, { x: number; y: number }> = {
  top: { x: 0, y: 10 },
  bottom: { x: 0, y: -10 },
  left: { x: 10, y: 0 },
  right: { x: -10, y: 0 },
};

// Resolves the three animation variants to concrete motion props. Reduced
// motion always wins, collapsing every variant to a plain instant cross-fade.
// (Return type is left to inference — each branch is a plain motion target
// literal, same shape the component used to inline directly.)
function getEntrance(variant: TooltipVariant, side: TooltipSide, shouldReduceMotion: boolean | null) {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 0 } },
      transition: { duration: 0 },
    };
  }

  if (variant === 'slide') {
    const offset = slideVariantBySide[side];
    return {
      initial: { opacity: 0, ...offset },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...offset, transition: { duration: 0.15 } },
      transition: SPRING_SNAPPY,
    };
  }

  if (variant === 'fade') {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 0.12 } },
      transition: { duration: 0.15, ease: EASE_OUT },
    };
  }

  // 'scale' (default) — the original scale + fade + subtle directional pull.
  const offset = slideBySide[side];
  return {
    initial: { opacity: 0, scale: 0.95, ...offset },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: { opacity: 0, scale: 0.95, ...offset, transition: { duration: 0.15 } },
    transition: SPRING_DEFAULT,
  };
}

const TooltipBase = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      side = 'top',
      align = 'center',
      sideOffset = 8,
      delayDuration = DEFAULT_DELAY_DURATION,
      isDisabled = false,
      color = 'default',
      variant = 'scale',
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const hasAmbientProvider = useContext(TooltipProviderPresenceContext);
    const entrance = getEntrance(variant, side, shouldReduceMotion ?? false);

    const root = (
      <TooltipPrimitive.Root
        open={!isDisabled && isOpen}
        onOpenChange={(next) => !isDisabled && setIsOpen(next)}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

        <AnimatePresence>
          {isOpen && !isDisabled && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content asChild forceMount side={side} align={align} sideOffset={sideOffset}>
                <motion.div
                  ref={ref}
                  initial={entrance.initial}
                  animate={entrance.animate}
                  exit={entrance.exit}
                  transition={entrance.transition}
                  className={cn(
                    'z-50 rounded-md px-2.5 py-1 text-xs shadow-md',
                    colorStyles[color],
                    className,
                  )}
                >
                  {content}
                  <TooltipPrimitive.Arrow className={arrowColorStyles[color]} />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    );

    // Standalone usage (no ambient `Tooltip.Provider` above) still needs a
    // Radix provider ancestor — Root throws without one — so supply our own.
    return hasAmbientProvider ? (
      root
    ) : (
      <TooltipPrimitive.Provider delayDuration={delayDuration}>{root}</TooltipPrimitive.Provider>
    );
  },
);
TooltipBase.displayName = 'Tooltip';

export const Tooltip = Object.assign(TooltipBase, { Provider: TooltipProvider });
