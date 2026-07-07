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
} from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT, SPRING_SNAPPY } from '../../../lib/animation';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectTriggerVariant = 'default' | 'ghost' | 'filled';

// Same height/padding scale as Input, so a Trigger sitting next to an Input
// in a form lines up exactly.
const sizeStyles: Record<SelectSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-3 text-sm',
  lg: 'h-11 gap-2 px-4 text-base',
};

// Three surface treatments — default keeps today's bordered look, ghost/filled
// give lighter-weight alternatives for toolbars and dense forms. All three
// share the same focus/open emphasis (see focusRingStyles below).
const triggerVariantStyles: Record<SelectTriggerVariant, string> = {
  default: 'border-input bg-background shadow-xs',
  ghost: 'border-transparent bg-transparent hover:bg-muted',
  filled: 'border-transparent bg-muted hover:bg-muted/70',
};

// Single clean border+ring emphasis on focus or open — no double-ring. Mirrors
// Input's focus treatment so the two controls read as the same design language.
const focusRingStyles =
  'focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 data-[state=open]:border-ring data-[state=open]:ring-2 data-[state=open]:ring-ring/25';

// Content pops open with a springy scale+fade from the trigger edge (Radix's
// own --radix-select-content-transform-origin handles top-vs-bottom), then
// staggers its items in; closing is quicker and skips the stagger entirely.
const CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...SPRING_DEFAULT, staggerChildren: 0.025, delayChildren: 0.04 },
  },
  exit: { opacity: 0, scale: 0.96, transition: SPRING_SNAPPY },
};

const CONTENT_VARIANTS_REDUCED: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: DURATION_INSTANT },
  exit: { opacity: 0, transition: DURATION_INSTANT },
};

// Each item's label fades/slides in, offset by the parent's staggerChildren —
// no explicit initial/animate here, it inherits "hidden"/"visible" from Content.
const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: SPRING_SNAPPY },
};

const ITEM_VARIANTS_REDUCED: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0, transition: DURATION_INSTANT },
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Radix tracks open/closed internally but doesn't expose it, and Content
// needs a plain boolean to drive AnimatePresence — so the root keeps its own
// copy (always controlled from Radix's point of view) and shares it here.
interface SelectContextValue {
  open: boolean;
}
const SelectContext = createContext<SelectContextValue | null>(null);
function useSelectContext(component: string): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error(`Select.${component} must be rendered inside <Select>.`);
  }
  return ctx;
}

export interface SelectProps
  extends Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'disabled'> {
  isDisabled?: boolean;
}

const SelectRoot = ({
  isDisabled = false,
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: SelectProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = useMemo<SelectContextValue>(() => ({ open }), [open]);

  return (
    <SelectPrimitive.Root
      open={open}
      onOpenChange={handleOpenChange}
      disabled={isDisabled}
      {...props}
    >
      <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
    </SelectPrimitive.Root>
  );
};
SelectRoot.displayName = 'Select';

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: SelectSize;
  variant?: SelectTriggerVariant;
}

// Visually matches Input: same height scale, rounded-md, single-emphasis focus.
export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
  const { open } = useSelectContext('Trigger');
  const shouldReduceMotion = useReducedMotion();

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between rounded-md border outline-none transition-[color,box-shadow,border-color,background-color]',
        focusRingStyles,
        'data-[placeholder]:text-muted-foreground',
        'disabled:cursor-not-allowed disabled:opacity-50',
        triggerVariantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      <span className="line-clamp-1 flex flex-1 items-center gap-2 text-left">{children}</span>
      <SelectPrimitive.Icon asChild>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="flex shrink-0 items-center text-muted-foreground"
          transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
        >
          <ChevronDownIcon className="size-4" />
        </motion.span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = 'Select.Trigger';

export type SelectValueProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

export const SelectValue = forwardRef<ElementRef<typeof SelectPrimitive.Value>, SelectValueProps>(
  (props, ref) => <SelectPrimitive.Value ref={ref} {...props} />,
);
SelectValue.displayName = 'Select.Value';

export type SelectContentProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) => {
  const { open } = useSelectContext('Content');
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <SelectPrimitive.Portal forceMount>
          <SelectPrimitive.Content
            asChild
            forceMount
            position={position}
            sideOffset={sideOffset}
            {...props}
          >
            <motion.div
              ref={ref}
              variants={shouldReduceMotion ? CONTENT_VARIANTS_REDUCED : CONTENT_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl',
                className,
              )}
            >
              <SelectPrimitive.Viewport
                className={cn(
                  position === 'popper' &&
                    'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                )}
              >
                {children}
              </SelectPrimitive.Viewport>
            </motion.div>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});
SelectContent.displayName = 'Select.Content';

export type SelectItemProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Item>;

export const SelectItem = forwardRef<ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          'relative flex w-full cursor-default items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm text-foreground outline-none select-none',
          'data-[highlighted]:bg-muted',
          'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        {...props}
      >
        {/* @radix-ui/react-select's Item doesn't support asChild, so the
            stagger-in motion lives on this inner wrapper instead of the Item
            itself — it still inherits "hidden"/"visible" from Select.Content
            via variant propagation, no manual index bookkeeping needed. */}
        <motion.span
          variants={shouldReduceMotion ? ITEM_VARIANTS_REDUCED : ITEM_VARIANTS}
          className="flex flex-1 items-center"
        >
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </motion.span>
        <SelectPrimitive.ItemIndicator className="flex shrink-0 items-center justify-center">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
            className="flex items-center justify-center"
          >
            <CheckIcon className="size-3.5" />
          </motion.span>
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  },
);
SelectItem.displayName = 'Select.Item';

export type SelectGroupProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

export const SelectGroup = forwardRef<ElementRef<typeof SelectPrimitive.Group>, SelectGroupProps>(
  (props, ref) => <SelectPrimitive.Group ref={ref} {...props} />,
);
SelectGroup.displayName = 'Select.Group';

export type SelectLabelProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

export const SelectLabel = forwardRef<ElementRef<typeof SelectPrimitive.Label>, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('px-2.5 py-1.5 text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  ),
);
SelectLabel.displayName = 'Select.Label';

export type SelectSeparatorProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'Select.Separator';

export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
  Group: SelectGroup,
  Label: SelectLabel,
  Separator: SelectSeparator,
});
