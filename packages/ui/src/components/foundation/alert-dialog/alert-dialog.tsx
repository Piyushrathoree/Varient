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
  type ReactNode,
} from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { SPRING_DEFAULT } from '../../../lib/animation';
import { buttonVariants } from '../button/button';

export interface AlertDialogProps {
  /** Controlled open state — pair with onOpenChange. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  children?: ReactNode;
}

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shouldReduceMotion: boolean | null;
  onExitComplete: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext(component: string): AlertDialogContextValue {
  const ctx = useContext(AlertDialogContext);
  if (!ctx) {
    throw new Error(`AlertDialog.${component} must be rendered inside <AlertDialog>.`);
  }
  return ctx;
}

const AlertDialogRoot = ({
  isOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: AlertDialogProps) => {
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

  const contextValue = useMemo<AlertDialogContextValue>(
    () => ({ open, onOpenChange: handleOpenChange, shouldReduceMotion, onExitComplete }),
    [open, handleOpenChange, shouldReduceMotion, onExitComplete],
  );

  return (
    <AlertDialogContext.Provider value={contextValue}>
      <AlertDialogPrimitive.Root
        open={open || showContent}
        onOpenChange={handleOpenChange}
      >
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  );
};
AlertDialogRoot.displayName = 'AlertDialog';

export type AlertDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Trigger
>;

export const AlertDialogTrigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  (props, ref) => <AlertDialogPrimitive.Trigger ref={ref} {...props} />,
);
AlertDialogTrigger.displayName = 'AlertDialog.Trigger';

export type AlertDialogContentProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>;

export const AlertDialogContent = forwardRef<HTMLDivElement, AlertDialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, shouldReduceMotion, onExitComplete } = useAlertDialogContext('Content');

    return (
      <AnimatePresence onExitComplete={onExitComplete}>
        {open && (
          <AlertDialogPrimitive.Portal forceMount>
            <AlertDialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px]"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              />
            </AlertDialogPrimitive.Overlay>

            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
              <AlertDialogPrimitive.Content ref={ref} asChild forceMount {...props}>
                <motion.div
                  className={cn(
                    'relative w-full max-w-lg rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl',
                    className,
                  )}
                  initial={
                    shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.96 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
                >
                  {children}
                </motion.div>
              </AlertDialogPrimitive.Content>
            </div>
          </AlertDialogPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
AlertDialogContent.displayName = 'AlertDialog.Content';

export const AlertDialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-lg font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = 'AlertDialog.Title';

export const AlertDialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDialogDescription.displayName = 'AlertDialog.Description';

export type AlertDialogActionVariant = 'default' | 'destructive';

export interface AlertDialogActionProps
  extends ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
  /** Visual style — use `destructive` for irreversible confirmations. @default 'default' */
  variant?: AlertDialogActionVariant;
}

export const AlertDialogAction = forwardRef<HTMLButtonElement, AlertDialogActionProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={buttonVariants({
        variant: variant === 'destructive' ? 'destructive' : 'primary',
        size: 'md',
        className,
      })}
      {...props}
    />
  ),
);
AlertDialogAction.displayName = 'AlertDialog.Action';

export type AlertDialogCancelProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>;

export const AlertDialogCancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={buttonVariants({ variant: 'outline', size: 'md', className })}
      {...props}
    />
  ),
);
AlertDialogCancel.displayName = 'AlertDialog.Cancel';

export const AlertDialog = Object.assign(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
