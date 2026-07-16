'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface MorphingDialogProps {
  /** Controlled open state — pair with onOpenChange. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  children?: ReactNode;
}

interface MorphingDialogContextValue {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  shouldReduceMotion: boolean | null;
  containerLayoutId: string;
  titleLayoutId: string;
  descriptionLayoutId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: MutableRefObject<HTMLElement | null>;
  hasTitle: boolean;
  registerTitle: (present: boolean) => void;
  hasDescription: boolean;
  registerDescription: (present: boolean) => void;
}

const MorphingDialogContext = createContext<MorphingDialogContextValue | null>(null);

function useMorphingDialogContext(component: string): MorphingDialogContextValue {
  const ctx = useContext(MorphingDialogContext);
  if (!ctx) {
    throw new Error(`MorphingDialog.${component} must be rendered inside <MorphingDialog>.`);
  }
  return ctx;
}

// Title/Description can legitimately appear twice — once inside Trigger's
// arbitrary content (for a text morph, e.g. a note title that becomes the
// editor heading) and once inside Content. Only the Content instance may
// own the `id` that the panel's aria-labelledby/aria-describedby point at,
// so document-unique ids never collide; both instances still share the
// layoutId so the shared-layout morph works either way.
const ContentBoundaryContext = createContext(false);

/**
 * Generic trigger→dialog shared-layout morph — the primitive under
 * ExpandableCard, exposed as a compound API mirroring Dialog. The trigger
 * element and the dialog panel share `layoutId`s (scoped per instance via
 * `useId`), so motion animates one continuous shape between the two instead
 * of cross-fading unrelated elements.
 *
 * Controlled (isOpen/onOpenChange) or uncontrolled (defaultOpen), same
 * pattern as Dialog/Tabs.
 */
const MorphingDialogRoot = ({
  isOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: MorphingDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  const shouldReduceMotion = useReducedMotion();

  const reactId = useId();
  const containerLayoutId = `morphing-dialog-container-${reactId}`;
  const titleLayoutId = `morphing-dialog-title-${reactId}`;
  const descriptionLayoutId = `morphing-dialog-description-${reactId}`;
  const titleId = `morphing-dialog-title-text-${reactId}`;
  const descriptionId = `morphing-dialog-description-text-${reactId}`;

  const triggerRef = useRef<HTMLElement | null>(null);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const openDialog = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const closeDialog = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
    // Trigger stays mounted (just made invisible while open), so focus can
    // be restored immediately rather than waiting on an exit animation.
    triggerRef.current?.focus();
  }, [isControlled, onOpenChange]);

  // Escape closes, and body scroll is locked while the panel is open —
  // restored to whatever it was, not hard-coded to 'auto'.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeDialog]);

  const registerTitle = useCallback((present: boolean) => setHasTitle(present), []);
  const registerDescription = useCallback((present: boolean) => setHasDescription(present), []);

  const contextValue = useMemo<MorphingDialogContextValue>(
    () => ({
      open,
      openDialog,
      closeDialog,
      shouldReduceMotion,
      containerLayoutId,
      titleLayoutId,
      descriptionLayoutId,
      titleId,
      descriptionId,
      triggerRef,
      hasTitle,
      registerTitle,
      hasDescription,
      registerDescription,
    }),
    [
      open,
      openDialog,
      closeDialog,
      shouldReduceMotion,
      containerLayoutId,
      titleLayoutId,
      descriptionLayoutId,
      titleId,
      descriptionId,
      hasTitle,
      registerTitle,
      hasDescription,
      registerDescription,
    ],
  );

  return (
    <MorphingDialogContext.Provider value={contextValue}>{children}</MorphingDialogContext.Provider>
  );
};
MorphingDialogRoot.displayName = 'MorphingDialog';

export interface MorphingDialogTriggerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  isDisabled?: boolean;
}

/**
 * Wraps arbitrary trigger content (button, avatar, card — "any element").
 * Shares `containerLayoutId` with Content so the wrapped shape morphs
 * directly into the dialog panel. Stays mounted (made `invisible`, not
 * unmounted) while open so the grid never reflows and motion has a stable
 * FLIP origin to animate from/back to.
 */
export const MorphingDialogTrigger = forwardRef<HTMLDivElement, MorphingDialogTriggerProps>(
  ({ className, children, isDisabled = false, onKeyDown, ...props }, forwardedRef) => {
    const { open, openDialog, shouldReduceMotion, containerLayoutId, triggerRef } =
      useMorphingDialogContext('Trigger');

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        triggerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef, triggerRef],
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || isDisabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDialog();
        }
      },
      [isDisabled, openDialog, onKeyDown],
    );

    return (
      <motion.div
        ref={setRefs}
        layoutId={shouldReduceMotion ? undefined : containerLayoutId}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-disabled={isDisabled || undefined}
        aria-hidden={open || undefined}
        onClick={isDisabled ? undefined : openDialog}
        onKeyDown={handleKeyDown}
        transition={shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT}
        className={cn(
          'cursor-pointer text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'motion-reduce:transition-none',
          isDisabled && 'pointer-events-none cursor-not-allowed opacity-60',
          open && 'invisible pointer-events-none',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
MorphingDialogTrigger.displayName = 'MorphingDialog.Trigger';

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <path d="M15 5 5 15" />
      <path d="m5 5 10 10" />
    </svg>
  );
}

export interface MorphingDialogContentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Renders the built-in top-right X button. Set false to supply your own via MorphingDialog.Close. */
  showCloseButton?: boolean;
}

/**
 * Portal-rendered overlay + morphing panel. Shares `containerLayoutId` with
 * Trigger for the shape morph; content inside fades in ~0.05s after the
 * container settles. Escape, overlay click, and the close button all
 * dismiss. Body scroll is locked (in the Root) while open.
 */
export const MorphingDialogContent = forwardRef<HTMLDivElement, MorphingDialogContentProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => {
    const {
      open,
      closeDialog,
      shouldReduceMotion,
      containerLayoutId,
      titleId,
      descriptionId,
      hasTitle,
      hasDescription,
    } = useMorphingDialogContext('Content');

    const [isMounted, setIsMounted] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => setIsMounted(true), []);

    // Focus the close button (or the panel itself) as soon as it opens.
    useEffect(() => {
      if (!open) return;
      if (showCloseButton) closeButtonRef.current?.focus();
      else panelRef.current?.focus();
    }, [open, showCloseButton]);

    const motionTransition = shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT;
    const sharedContainerId = shouldReduceMotion ? undefined : containerLayoutId;

    if (!isMounted) return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-50 bg-black/40"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={shouldReduceMotion ? DURATION_INSTANT : { duration: 0.2 }}
              onClick={closeDialog}
            />

            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
              onClick={closeDialog}
            >
              <motion.div
                ref={setRefs}
                layoutId={sharedContainerId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={hasTitle ? titleId : undefined}
                aria-describedby={hasDescription ? descriptionId : undefined}
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={motionTransition}
                className={cn(
                  'relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-y-auto rounded-xl border border-border bg-card p-6 text-card-foreground shadow-2xl',
                  className,
                )}
                {...props}
              >
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    shouldReduceMotion ? DURATION_INSTANT : { ...SPRING_DEFAULT, delay: 0.05 }
                  }
                  className={showCloseButton ? 'pr-8' : undefined}
                >
                  <ContentBoundaryContext.Provider value={true}>
                    {children}
                  </ContentBoundaryContext.Provider>
                </motion.div>

                {showCloseButton && (
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeDialog}
                    aria-label="Close"
                    className="absolute top-4 right-4 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <CloseIcon />
                  </button>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );
  },
);
MorphingDialogContent.displayName = 'MorphingDialog.Content';

export interface MorphingDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

/**
 * Registers itself as the panel's `aria-labelledby` target. Shares
 * `titleLayoutId` (reduced-motion-gated) so a matching title placed inside
 * the Trigger's content morphs its position/size into this one.
 */
export const MorphingDialogTitle = forwardRef<HTMLHeadingElement, MorphingDialogTitleProps>(
  ({ className, ...props }, ref) => {
    const { titleId, titleLayoutId, shouldReduceMotion, registerTitle } =
      useMorphingDialogContext('Title');
    const ownsId = useContext(ContentBoundaryContext);

    useEffect(() => {
      if (!ownsId) return;
      registerTitle(true);
      return () => registerTitle(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ownsId]);

    return (
      <motion.h2
        ref={ref}
        id={ownsId ? titleId : undefined}
        layoutId={shouldReduceMotion ? undefined : titleLayoutId}
        className={cn(
          'font-display text-lg font-semibold tracking-tight text-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
MorphingDialogTitle.displayName = 'MorphingDialog.Title';

export interface MorphingDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

/** Registers itself as the panel's `aria-describedby` target. */
export const MorphingDialogDescription = forwardRef<
  HTMLParagraphElement,
  MorphingDialogDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId, descriptionLayoutId, shouldReduceMotion, registerDescription } =
    useMorphingDialogContext('Description');
  const ownsId = useContext(ContentBoundaryContext);

  useEffect(() => {
    if (!ownsId) return;
    registerDescription(true);
    return () => registerDescription(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownsId]);

  return (
    <motion.p
      ref={ref}
      id={ownsId ? descriptionId : undefined}
      layoutId={shouldReduceMotion ? undefined : descriptionLayoutId}
      className={cn('mt-1.5 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
MorphingDialogDescription.displayName = 'MorphingDialog.Description';

export interface MorphingDialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Unstyled dismiss action — place anywhere (a footer "Done" button, a
 * bare X). Falls back to an inline X icon when no children are passed.
 * Independent from Content's built-in `showCloseButton` X.
 */
export const MorphingDialogClose = forwardRef<HTMLButtonElement, MorphingDialogCloseProps>(
  ({ className, children, onClick, 'aria-label': ariaLabel, ...props }, ref) => {
    const { closeDialog } = useMorphingDialogContext('Close');

    return (
      <button
        ref={ref}
        type="button"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) closeDialog();
        }}
        aria-label={children ? ariaLabel : (ariaLabel ?? 'Close')}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          !children && 'p-1',
          className,
        )}
        {...props}
      >
        {children ?? <CloseIcon />}
      </button>
    );
  },
);
MorphingDialogClose.displayName = 'MorphingDialog.Close';

export const MorphingDialog = Object.assign(MorphingDialogRoot, {
  Trigger: MorphingDialogTrigger,
  Content: MorphingDialogContent,
  Title: MorphingDialogTitle,
  Description: MorphingDialogDescription,
  Close: MorphingDialogClose,
});
