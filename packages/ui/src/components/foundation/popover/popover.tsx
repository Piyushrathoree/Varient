'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverContextValue {
  open: boolean;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`Popover.${component} must be rendered inside <Popover>.`);
  }
  return ctx;
}

export interface PopoverProps {
  /** Controlled open state — pair with onOpenChange. */
  isOpen?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

// Root mirrors Dialog/DropdownMenu — keeps our own open copy so Content can
// gate AnimatePresence while Radix still owns focus and dismiss behavior.
const PopoverRoot = ({
  isOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = useMemo<PopoverContextValue>(() => ({ open }), [open]);

  return (
    <PopoverContext.Provider value={contextValue}>
      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {children}
      </PopoverPrimitive.Root>
    </PopoverContext.Provider>
  );
};
PopoverRoot.displayName = 'Popover';

export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

export const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} {...props} />);
PopoverTrigger.displayName = 'Popover.Trigger';

export interface PopoverContentProps
  extends Omit<ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>, 'side' | 'align'> {
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  /** Renders a small pointer connecting the panel to its trigger. */
  showArrow?: boolean;
}

// Small directional pull per side — pairs with scale/fade from the Radix
// transform-origin so the panel reads as emerging from the trigger edge.
const slideBySide: Record<PopoverSide, { x: number; y: number }> = {
  top: { x: 0, y: 4 },
  bottom: { x: 0, y: -4 },
  left: { x: 4, y: 0 },
  right: { x: -4, y: 0 },
};

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      children,
      side = 'bottom',
      align = 'center',
      sideOffset = 8,
      showArrow = false,
      ...props
    },
    ref,
  ) => {
    const { open } = usePopoverContext('Content');
    const shouldReduceMotion = useReducedMotion();
    const offset = slideBySide[side];

    return (
      <AnimatePresence>
        {open && (
          <PopoverPrimitive.Portal forceMount>
            <PopoverPrimitive.Content
              asChild
              forceMount
              side={side}
              align={align}
              sideOffset={sideOffset}
              {...props}
            >
              <motion.div
                ref={ref}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96, ...offset }
                }
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, transition: DURATION_INSTANT }
                    : { opacity: 0, scale: 0.96, ...offset, transition: { duration: 0.15 } }
                }
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
                className={cn(
                  'z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-[var(--shadow-custom)] outline-none',
                  className,
                )}
              >
                {children}
                {showArrow && (
                  <PopoverPrimitive.Arrow
                    width={12}
                    height={6}
                    className="fill-popover stroke-border"
                    strokeWidth={1}
                    aria-hidden
                  />
                )}
              </motion.div>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
PopoverContent.displayName = 'Popover.Content';

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
