'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';

export interface DialogProps {
  /** Controlled open state — pair with onOpenChange. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Passed through to Radix — disables outside pointer events + focus trap when false. */
  modal?: boolean;
  children?: ReactNode;
}

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shouldReduceMotion: boolean | null;
  onExitComplete: () => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(component: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(`Dialog.${component} must be rendered inside <Dialog>.`);
  }
  return ctx;
}

// Root — controlled (isOpen/onOpenChange) or uncontrolled (defaultOpen), same
// pattern as Tabs. Keeps Radix logically "open" through the exit animation
// (open || showContent) so focus trap and Escape handling stay live until the
// panel has actually left the DOM — see DialogContent's AnimatePresence.
const DialogRoot = ({
  isOpen,
  onOpenChange,
  defaultOpen = false,
  modal = true,
  children,
}: DialogProps) => {
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

  const contextValue = useMemo<DialogContextValue>(
    () => ({ open, onOpenChange: handleOpenChange, shouldReduceMotion, onExitComplete }),
    [open, handleOpenChange, shouldReduceMotion, onExitComplete],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={open || showContent} onOpenChange={handleOpenChange} modal={modal}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};
DialogRoot.displayName = 'Dialog';

export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

// Radix's Trigger is a Primitive.button under the hood, so asChild works out
// of the box — pass a Button (or anything) via asChild to open the dialog.
export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => (
  <DialogPrimitive.Trigger ref={ref} {...props} />
));
DialogTrigger.displayName = 'Dialog.Trigger';

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Renders the built-in top-right X button. Set false to supply your own via Dialog.Close. */
  showCloseButton?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => {
    const { open, shouldReduceMotion, onExitComplete } = useDialogContext('Content');

    return (
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

            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
              <DialogPrimitive.Content ref={ref} asChild forceMount {...props}>
                <motion.div
                  className={cn(
                    'relative w-full max-w-lg rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl',
                    className,
                  )}
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.96 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                >
                  {children}

                  {showCloseButton && (
                    <DialogPrimitive.Close
                      className="absolute top-4 right-4 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </DialogPrimitive.Close>
                  )}
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
DialogContent.displayName = 'Dialog.Content';

// `pr-8` clears the top-right close button so a long title never sits under it.
export const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 flex flex-col gap-1.5 pr-8', className)} {...props} />
  ),
);
DialogHeader.displayName = 'Dialog.Header';

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-lg font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
));
DialogTitle.displayName = 'Dialog.Title';

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = 'Dialog.Description';

// Stacks full-width on mobile (confirm action on top), row-aligned from sm up.
export const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  ),
);
DialogFooter.displayName = 'Dialog.Footer';

export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

// Unstyled — pass asChild with your own Button (e.g. a footer "Cancel"), or
// use it bare for a text-only dismiss action.
export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>((props, ref) => (
  <DialogPrimitive.Close ref={ref} {...props} />
));
DialogClose.displayName = 'Dialog.Close';

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
});
