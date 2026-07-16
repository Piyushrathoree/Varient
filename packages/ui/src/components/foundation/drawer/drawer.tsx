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
import { EASE_OUT } from '../../../lib/animation';

export interface DrawerProps {
  /** Controlled open state — pair with onOpenChange. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Passed through to Radix — disables outside pointer events + focus trap when false. */
  modal?: boolean;
  children?: ReactNode;
}

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shouldReduceMotion: boolean | null;
  onExitComplete: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext(component: string): DrawerContextValue {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error(`Drawer.${component} must be rendered inside <Drawer>.`);
  }
  return ctx;
}

const DrawerRoot = ({
  isOpen,
  onOpenChange,
  defaultOpen = false,
  modal = true,
  children,
}: DrawerProps) => {
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

  const contextValue = useMemo<DrawerContextValue>(
    () => ({ open, onOpenChange: handleOpenChange, shouldReduceMotion, onExitComplete }),
    [open, handleOpenChange, shouldReduceMotion, onExitComplete],
  );

  return (
    <DrawerContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={open || showContent} onOpenChange={handleOpenChange} modal={modal}>
        {children}
      </DialogPrimitive.Root>
    </DrawerContext.Provider>
  );
};
DrawerRoot.displayName = 'Drawer';

export type DrawerTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>((props, ref) => (
  <DialogPrimitive.Trigger ref={ref} {...props} />
));
DrawerTrigger.displayName = 'Drawer.Trigger';

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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

export type DrawerSide = 'right' | 'left' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

const drawerSizeStyles: Record<DrawerSize, { horizontal: string; vertical: string }> = {
  sm: { horizontal: 'w-72 max-w-[85vw]', vertical: 'h-48 max-h-[85vh]' },
  md: { horizontal: 'w-96 max-w-[90vw]', vertical: 'h-64 max-h-[90vh]' },
  lg: { horizontal: 'w-[28rem] max-w-[92vw]', vertical: 'h-80 max-h-[92vh]' },
  full: { horizontal: 'w-full', vertical: 'h-full' },
};

const drawerSideStyles: Record<DrawerSide, string> = {
  right: 'inset-y-0 right-0 h-full border-l',
  left: 'inset-y-0 left-0 h-full border-r',
  top: 'inset-x-0 top-0 w-full border-b',
  bottom: 'inset-x-0 bottom-0 w-full border-t',
};

function getSlideVariants(side: DrawerSide, shouldReduceMotion: boolean | null) {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, x: 0, y: 0 },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 0, y: 0 },
    };
  }

  switch (side) {
    case 'left':
      return {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 },
      };
    case 'top':
      return {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 },
      };
    case 'bottom':
      return {
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 },
      };
    case 'right':
    default:
      return {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 },
      };
  }
}

export interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Edge the panel slides in from. @default 'right' */
  side?: DrawerSide;
  /** Panel width (left/right) or height (top/bottom). @default 'md' */
  size?: DrawerSize;
  /** Renders the built-in close button. Set false to supply your own via Drawer.Close. */
  showCloseButton?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (
    { className, children, side = 'right', size = 'md', showCloseButton = true, ...props },
    ref,
  ) => {
    const { open, shouldReduceMotion, onExitComplete } = useDrawerContext('Content');
    const isHorizontal = side === 'left' || side === 'right';
    const sizeClass = isHorizontal
      ? drawerSizeStyles[size].horizontal
      : drawerSizeStyles[size].vertical;
    const slideVariants = getSlideVariants(side, shouldReduceMotion);

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

            <DialogPrimitive.Content ref={ref} asChild forceMount {...props}>
              <motion.div
                className={cn(
                  'fixed z-50 flex flex-col border-border bg-card p-6 text-card-foreground shadow-xl',
                  isHorizontal ? 'rounded-l-xl' : 'rounded-t-xl',
                  side === 'left' && 'rounded-l-none rounded-r-xl',
                  side === 'top' && 'rounded-t-none rounded-b-xl',
                  drawerSideStyles[side],
                  sizeClass,
                  className,
                )}
                initial={slideVariants.initial}
                animate={slideVariants.animate}
                exit={slideVariants.exit}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: EASE_OUT }
                }
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
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    );
  },
);
DrawerContent.displayName = 'Drawer.Content';

export const DrawerHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 flex flex-col gap-1.5 pr-8', className)} {...props} />
  ),
);
DrawerHeader.displayName = 'Drawer.Header';

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-lg font-semibold tracking-tight text-foreground', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'Drawer.Title';

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'Drawer.Description';

export type DrawerCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>((props, ref) => (
  <DialogPrimitive.Close ref={ref} {...props} />
));
DrawerClose.displayName = 'Drawer.Close';

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
});
