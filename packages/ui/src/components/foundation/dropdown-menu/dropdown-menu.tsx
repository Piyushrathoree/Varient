'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT, SPRING_SNAPPY } from '../../../lib/animation';

export type DropdownMenuProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

interface DropdownMenuContextValue {
  open: boolean;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({ open: false });

// Radix's own `Root` renders no DOM node — it's only a context provider — so
// closing it tears the Content subtree down immediately, before an exit
// animation can run. We mirror its open state into our own context so Content
// can gate an AnimatePresence around itself instead of trusting Radix's mount.
function DropdownMenuRoot({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <DropdownMenuContext.Provider value={{ open }}>
      <DropdownMenuPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props} />
    </DropdownMenuContext.Provider>
  );
}
DropdownMenuRoot.displayName = 'DropdownMenu';

export type DropdownMenuTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

// Radix's Trigger already supports asChild and forwards its own ref — no
// wrapping needed.
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>;

export const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, align = 'start', children, ...props }, ref) => {
  const { open } = useContext(DropdownMenuContext);
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuPrimitive.Portal forceMount>
          <DropdownMenuPrimitive.Content
            ref={ref}
            forceMount
            sideOffset={sideOffset}
            align={align}
            className="z-50 origin-(--radix-dropdown-menu-content-transform-origin)"
            {...props}
          >
            {/* Scale/fade lives on this inner element, not Content itself —
                Content already owns the Popper `transform` for positioning,
                so animating scale there would fight that translate. */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
              className={cn(
                'min-w-[10rem] rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-xl',
                className,
              )}
            >
              {children}
            </motion.div>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  );
});
DropdownMenuContent.displayName = 'DropdownMenu.Content';

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  /** Icon rendered before the label. */
  icon?: ReactNode;
  /** 'destructive' tints the label and highlight for dangerous actions (Log out, Delete). */
  variant?: 'default' | 'destructive';
}

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, icon, variant = 'default', children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors',
      'data-[highlighted]:bg-muted',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      variant === 'destructive' && 'text-destructive data-[highlighted]:bg-destructive/10',
      className,
    )}
    {...props}
  >
    {icon}
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = 'DropdownMenu.Item';

export type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>;

export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2.5 py-1.5 text-xs font-medium text-muted-foreground', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenu.Label';

export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';

export type DropdownMenuShortcutProps = HTMLAttributes<HTMLSpanElement>;

export const DropdownMenuShortcut = forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('ml-auto pl-4 text-xs text-muted-foreground', className)}
      {...props}
    />
  ),
);
DropdownMenuShortcut.displayName = 'DropdownMenu.Shortcut';

export type DropdownMenuGroupProps = ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>;

// No default styling — a plain a11y grouping wrapper (role="group") around
// related items.
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// Shared chassis for CheckboxItem/RadioItem — same look as DropdownMenu.Item
// but with the left gutter reserved for the check/dot indicator instead of
// an `icon` prop, since the indicator itself is the leading glyph.
const indicatorItemClassName =
  'relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2.5 text-sm outline-none transition-colors data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownMenuCheckboxItemProps
>(({ className, children, checked, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const isChecked = checked === true;

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      className={cn(indicatorItemClassName, className)}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center text-brand">
        <DropdownMenuPrimitive.ItemIndicator forceMount className="flex items-center justify-center">
          <AnimatePresence>
            {isChecked && (
              <motion.svg
                key="check"
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, transition: DURATION_INSTANT }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
              >
                <path d="M4 12L9 17L20 6" />
              </motion.svg>
            )}
          </AnimatePresence>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem';

interface DropdownMenuRadioGroupContextValue {
  value?: string;
}

// Radix keeps the checked-vs-unchecked comparison for each RadioItem
// internal, so — same reasoning as DropdownMenuContext above — we mirror
// the selected value into our own context. RadioItem reads it to know
// whether *it* is the checked item, which is what gates its AnimatePresence.
const DropdownMenuRadioGroupContext = createContext<DropdownMenuRadioGroupContextValue>({});

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;

export const DropdownMenuRadioGroup = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  DropdownMenuRadioGroupProps
>(({ value, ...props }, ref) => (
  <DropdownMenuRadioGroupContext.Provider value={{ value }}>
    <DropdownMenuPrimitive.RadioGroup ref={ref} value={value} {...props} />
  </DropdownMenuRadioGroupContext.Provider>
));
DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup';

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>;

export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, value, ...props }, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const { value: selectedValue } = useContext(DropdownMenuRadioGroupContext);
  const isChecked = selectedValue === value;

  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      value={value}
      className={cn(indicatorItemClassName, className)}
      {...props}
    >
      <span className="absolute left-2.5 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator forceMount className="flex items-center justify-center">
          <AnimatePresence>
            {isChecked && (
              <motion.span
                key="dot"
                aria-hidden
                className="block size-1.5 rounded-full bg-brand"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, transition: DURATION_INSTANT }
                    : { opacity: 0, scale: 0 }
                }
                transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_SNAPPY}
              />
            )}
          </AnimatePresence>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem';

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
});
