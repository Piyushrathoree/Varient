'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export interface CommandPaletteProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CommandPrimitive>,
    'label' | 'open' | 'onOpenChange'
  > {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  /** Accessible name — wired to cmdk and an sr-only dialog title. */
  label?: string;
}

function CommandPaletteRoot({
  isOpen,
  onOpenChange,
  defaultOpen = false,
  label = 'Command palette',
  children,
  className,
  ...commandProps
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  const shouldReduceMotion = useReducedMotion();

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const [showContent, setShowContent] = useState(open);
  const wasOpenRef = useRef(open);
  useEffect(() => {
    if (open && !wasOpenRef.current) setShowContent(true);
    wasOpenRef.current = open;
  }, [open]);

  const onExitComplete = useCallback(() => setShowContent(false), []);

  return (
    <DialogPrimitive.Root open={open || showContent} onOpenChange={handleOpenChange}>
      <AnimatePresence onExitComplete={onExitComplete}>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-[15vh]">
              <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                <motion.div
                  className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl"
                  initial={
                    shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.96 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                >
                  <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
                  <CommandPrimitive
                    label={label}
                    className={cn(
                      'flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground',
                      className,
                    )}
                    {...commandProps}
                  >
                    {children}
                  </CommandPrimitive>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

CommandPaletteRoot.displayName = 'CommandPalette';

export type CommandPaletteInputProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

export const CommandPaletteInput = forwardRef<HTMLInputElement, CommandPaletteInputProps>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b border-border px-3" cmdk-input-wrapper="">
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          'flex h-11 w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </div>
  ),
);

CommandPaletteInput.displayName = 'CommandPalette.Input';

export type CommandPaletteListProps = ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

export const CommandPaletteList = forwardRef<HTMLDivElement, CommandPaletteListProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      className={cn('max-h-72 overflow-y-auto overflow-x-hidden p-1.5', className)}
      {...props}
    />
  ),
);

CommandPaletteList.displayName = 'CommandPalette.List';

export type CommandPaletteEmptyProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

export const CommandPaletteEmpty = forwardRef<HTMLDivElement, CommandPaletteEmptyProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);

CommandPaletteEmpty.displayName = 'CommandPalette.Empty';

export type CommandPaletteGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export const CommandPaletteGroup = forwardRef<HTMLDivElement, CommandPaletteGroupProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);

CommandPaletteGroup.displayName = 'CommandPalette.Group';

export interface CommandPaletteItemProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
}

export const CommandPaletteItem = forwardRef<HTMLDivElement, CommandPaletteItemProps>(
  ({ className, children, icon, shortcut, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground outline-none select-none',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        'data-[selected=true]:bg-muted',
        '[&_[data-command-icon]]:text-muted-foreground data-[selected=true]:[&_[data-command-icon]]:text-brand',
        className,
      )}
      {...props}
    >
      {icon && (
        <span data-command-icon className="flex shrink-0 items-center [&>svg]:size-4">
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && (
        <span className="ml-auto flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
          {shortcut}
        </span>
      )}
    </CommandPrimitive.Item>
  ),
);

CommandPaletteItem.displayName = 'CommandPalette.Item';

export type CommandPaletteSeparatorProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;

export const CommandPaletteSeparator = forwardRef<HTMLDivElement, CommandPaletteSeparatorProps>(
  ({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  ),
);

CommandPaletteSeparator.displayName = 'CommandPalette.Separator';

export interface CommandPaletteFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CommandPaletteFooter = forwardRef<HTMLDivElement, CommandPaletteFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);

CommandPaletteFooter.displayName = 'CommandPalette.Footer';

export const CommandPalette = Object.assign(CommandPaletteRoot, {
  Input: CommandPaletteInput,
  List: CommandPaletteList,
  Empty: CommandPaletteEmpty,
  Group: CommandPaletteGroup,
  Item: CommandPaletteItem,
  Separator: CommandPaletteSeparator,
  Footer: CommandPaletteFooter,
});
