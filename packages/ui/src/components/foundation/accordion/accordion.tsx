'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, DURATION_INSTANT, SPRING_DEFAULT, SPRING_SNAPPY } from '../../../lib/animation';

export type AccordionVariant = 'default' | 'separated' | 'ghost';

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'dir'> {
  /** Allows more than one item open at once. @default false (single-open) */
  isMultiple?: boolean;
  /** Single mode only — lets the open item collapse back to none. @default true */
  isCollapsible?: boolean;
  /** Uncontrolled initial value — a string in single mode, a string[] in multiple mode. */
  defaultValue?: string | string[];
  /** Controlled value — pass with onValueChange. */
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  /**
   * Visual style. `default` is a single bordered card, `separated` breaks
   * each item into its own card with breathing room, `ghost` drops the
   * frame for a bare, low-chrome list. @default 'default'
   */
  variant?: AccordionVariant;
}

// Root container per variant. `default` keeps the original single-card look
// (divider lines between rows); `separated` hands framing to each Item
// instead, just adding a gap; `ghost` gets a light inset padding with
// hairline dividers and no border/shadow.
const rootVariantStyles: Record<AccordionVariant, string> = {
  default: 'divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-sm',
  separated: 'gap-3',
  ghost: 'gap-0 divide-y divide-border/50 rounded-xl p-1',
};

// Which item(s) are open, derived once at the root and read by Item/Trigger/
// Content below — Radix tracks this internally too, but doesn't expose it
// publicly, and Content needs a plain boolean to drive AnimatePresence.
// `variant` rides along on the same context so every sub-part can style
// itself without prop drilling through Item.
interface AccordionRootContextValue {
  values: string[];
  variant: AccordionVariant;
}
const AccordionRootContext = createContext<AccordionRootContextValue | null>(null);
function useAccordionRootContext(component: string): AccordionRootContextValue {
  const ctx = useContext(AccordionRootContext);
  if (!ctx) {
    throw new Error(`Accordion.${component} must be rendered inside <Accordion>.`);
  }
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
}
const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);
function useAccordionItemContext(component: string): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error(`Accordion.${component} must be rendered inside <Accordion.Item>.`);
  }
  return ctx;
}

// Bridges our boolean isMultiple API to Radix's discriminated `type` union and
// keeps our own copy of the open value(s) — always passed to Radix as a
// defined `value`, so it never flips between controlled/uncontrolled.
const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      isMultiple = false,
      isCollapsible = true,
      defaultValue,
      value: valueProp,
      onValueChange,
      variant = 'default',
      children,
      ...props
    },
    ref,
  ) => {
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

    const openValues = useMemo<string[]>(
      () => (Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []),
      [currentValue],
    );
    const rootContextValue = useMemo(
      () => ({ values: openValues, variant }),
      [openValues, variant],
    );

    const rootClassName = cn('flex w-full flex-col', rootVariantStyles[variant], className);

    return (
      <AccordionRootContext.Provider value={rootContextValue}>
        {isMultiple ? (
          <AccordionPrimitive.Root
            ref={ref}
            type="multiple"
            value={currentValue as string[]}
            onValueChange={handleValueChange as (value: string[]) => void}
            className={rootClassName}
            {...props}
          >
            {children}
          </AccordionPrimitive.Root>
        ) : (
          <AccordionPrimitive.Root
            ref={ref}
            type="single"
            collapsible={isCollapsible}
            value={currentValue as string}
            onValueChange={handleValueChange as (value: string) => void}
            className={rootClassName}
            {...props}
          >
            {children}
          </AccordionPrimitive.Root>
        )}
      </AccordionRootContext.Provider>
    );
  },
);
AccordionRoot.displayName = 'Accordion';

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'value'> {
  /** Required — unique id for this item, matched against Accordion's value(s). */
  value: string;
  isDisabled?: boolean;
}

const AccordionItemComp = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, isDisabled = false, children, ...props }, ref) => {
    const itemContextValue = useMemo(() => ({ value }), [value]);
    const { values, variant } = useAccordionRootContext('Item');
    const isOpen = values.includes(value);

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <AccordionPrimitive.Item
          ref={ref}
          value={value}
          disabled={isDisabled}
          className={cn(
            'overflow-hidden',
            // 'separated' gives every item its own card, lifting a touch
            // when open so the active row reads as slightly raised.
            variant === 'separated' &&
              cn(
                'rounded-xl border border-border bg-card transition-shadow duration-200',
                isOpen ? 'shadow-md' : 'shadow-sm',
              ),
            className,
          )}
          {...props}
        >
          {children}
        </AccordionPrimitive.Item>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItemComp.displayName = 'Accordion.Item';

export type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AccordionTriggerComp = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItemContext('Trigger');
    const { values, variant } = useAccordionRootContext('Trigger');
    const isOpen = values.includes(value);
    const shouldReduceMotion = useReducedMotion();

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex min-h-11 flex-1 items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-muted-foreground outline-none transition-[color,background-color,transform] duration-150 ease-out hover:text-foreground active:scale-[0.99]',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            // 'ghost' is the one variant whose header itself carries a
            // subtle fill — a soft pill on hover, a slightly stronger one
            // while open, so the active row is legible without a border.
            variant === 'ghost' ? 'rounded-lg hover:bg-muted/50' : 'hover:bg-muted/40',
            isOpen && (variant === 'ghost' ? 'bg-muted/70 text-foreground' : 'text-foreground'),
            className,
          )}
          {...props}
        >
          {children}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="shrink-0 text-muted-foreground"
            transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
          >
            <ChevronDownIcon className="size-4" />
          </motion.span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTriggerComp.displayName = 'Accordion.Trigger';

export type AccordionContentProps = HTMLAttributes<HTMLDivElement>;

const AccordionContentComp = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { value } = useAccordionItemContext('Content');
    const { values } = useAccordionRootContext('Content');
    const isOpen = values.includes(value);
    const shouldReduceMotion = useReducedMotion();

    return (
      // forceMount keeps Radix's own show/hide out of the way — our own
      // isOpen (above) drives AnimatePresence's mount/unmount instead, which
      // is what actually plays the height/opacity exit animation. Without
      // forceMount, Radix unmounts the panel itself before motion gets a
      // chance to animate it out.
      <AccordionPrimitive.Content ref={ref} forceMount className="overflow-hidden" {...props}>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              // Opening leans on the shared spring for a physical settle;
              // closing switches to a snappier, no-overshoot spring with a
              // faster opacity fade so the row collapses crisply instead of
              // lingering — asymmetric timing reads as more intentional than
              // mirroring the same curve both ways.
              animate={{
                height: 'auto',
                opacity: 1,
                transition: shouldReduceMotion
                  ? DURATION_INSTANT
                  : { height: SPRING_DEFAULT, opacity: { duration: DURATION.default } },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: shouldReduceMotion
                  ? DURATION_INSTANT
                  : { height: SPRING_SNAPPY, opacity: { duration: DURATION.fast } },
              }}
              className="overflow-hidden"
            >
              <div className={cn('px-4 pb-4 text-sm text-muted-foreground', className)}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AccordionPrimitive.Content>
    );
  },
);
AccordionContentComp.displayName = 'Accordion.Content';

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

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItemComp,
  Trigger: AccordionTriggerComp,
  Content: AccordionContentComp,
});

export const AccordionItem = AccordionItemComp;
export const AccordionTrigger = AccordionTriggerComp;
export const AccordionContent = AccordionContentComp;
