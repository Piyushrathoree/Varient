'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION_INSTANT, SPRING_DEFAULT } from '../../../lib/animation';

export interface ExpandableCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onClick'> {
  /** Card + dialog heading. Shared-layout morphs between both states. */
  title: ReactNode;
  /** Short blurb shown under the title in the collapsed card and at the top of the panel. */
  description?: ReactNode;
  /** Optional media (image, gradient, icon block) shown above the title. Shares layout too. */
  media?: ReactNode;
  /** Rendered as a footer strip inside the expanded panel only (actions, meta, links). */
  footer?: ReactNode;
  /** Expanded-only body content, revealed once the panel has settled. */
  children?: ReactNode;
  /** Prevents the card from expanding. */
  isDisabled?: boolean;
  /** Fires whenever the expanded state changes, in addition to internal state. */
  onExpandedChange?: (isExpanded: boolean) => void;
}

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

/**
 * A card that morphs into a centered modal via a shared-layout transition.
 * The collapsed card and the expanded panel share `layoutId`s (scoped per
 * instance via `useId`) on the container, media block, and title, so motion
 * animates a single continuous shape between the two rather than
 * cross-fading two unrelated elements.
 *
 * The collapsed card stays mounted (made `invisible`, not unmounted) while
 * expanded so the grid never reflows and motion has a stable FLIP origin to
 * animate from/back to.
 */
export const ExpandableCard = forwardRef<HTMLDivElement, ExpandableCardProps>(
  (
    {
      className,
      title,
      description,
      media,
      footer,
      children,
      isDisabled = false,
      onExpandedChange,
      ...props
    },
    forwardedRef,
  ) => {
    const reactId = useId();
    const containerLayoutId = `expandable-card-container-${reactId}`;
    const mediaLayoutId = `expandable-card-media-${reactId}`;
    const titleLayoutId = `expandable-card-title-${reactId}`;
    const titleId = `expandable-card-title-text-${reactId}`;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const cardRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setIsMounted(true), []);

    const setCardRef = useCallback(
      (node: HTMLDivElement | null) => {
        cardRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    const open = useCallback(() => {
      if (isDisabled) return;
      setIsExpanded(true);
      onExpandedChange?.(true);
    }, [isDisabled, onExpandedChange]);

    const close = useCallback(() => {
      setIsExpanded(false);
      onExpandedChange?.(false);
      // Trigger stays mounted (just made invisible while expanded), so focus
      // can be restored immediately rather than waiting on an exit animation.
      cardRef.current?.focus();
    }, [onExpandedChange]);

    // Escape closes, and body scroll is locked while the panel is open —
    // restored to whatever it was, not hard-coded to 'auto'.
    useEffect(() => {
      if (!isExpanded) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
        }
      };
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isExpanded, close]);

    // Focus the close button as soon as the panel opens.
    useEffect(() => {
      if (isExpanded) closeButtonRef.current?.focus();
    }, [isExpanded]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        props.onKeyDown?.(event);
        if (event.defaultPrevented || isDisabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open();
        }
      },
      [isDisabled, open, props],
    );

    const motionTransition = shouldReduceMotion ? DURATION_INSTANT : SPRING_DEFAULT;
    // Shared layout only makes sense with motion — under reduced motion the
    // collapsed card and the panel are treated as independent elements and
    // the panel just fades in/out in place instead of morphing.
    const sharedContainerId = shouldReduceMotion ? undefined : containerLayoutId;
    const sharedMediaId = shouldReduceMotion ? undefined : mediaLayoutId;
    const sharedTitleId = shouldReduceMotion ? undefined : titleLayoutId;

    return (
      <>
        <motion.div
          {...props}
          ref={setCardRef}
          layoutId={sharedContainerId}
          role="button"
          tabIndex={isDisabled || isExpanded ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={isExpanded}
          aria-disabled={isDisabled || undefined}
          aria-hidden={isExpanded || undefined}
          onClick={open}
          onKeyDown={handleKeyDown}
          transition={motionTransition}
          className={cn(
            'flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-shadow duration-300 ease-out',
            'hover:border-foreground/20 hover:shadow-xl',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'motion-reduce:transition-none',
            isDisabled
              ? 'cursor-not-allowed opacity-60'
              : 'cursor-pointer active:scale-[0.99] motion-reduce:active:scale-100',
            isExpanded && 'invisible pointer-events-none',
            className,
          )}
        >
          {media && (
            <motion.div
              layoutId={sharedMediaId}
              className="relative h-40 w-full shrink-0 overflow-hidden bg-muted [&>img]:size-full [&>img]:object-cover"
            >
              {media}
            </motion.div>
          )}
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            <motion.h3
              layoutId={sharedTitleId}
              className="font-display text-base font-semibold tracking-tight text-foreground"
            >
              {title}
            </motion.h3>
            {description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </motion.div>

        {isMounted &&
          createPortal(
            <AnimatePresence>
              {isExpanded && (
                <>
                  <motion.div
                    aria-hidden
                    className="fixed inset-0 z-50 bg-black/40"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={shouldReduceMotion ? DURATION_INSTANT : { duration: 0.2 }}
                    onClick={close}
                  />

                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
                    onClick={close}
                  >
                    <motion.div
                      layoutId={sharedContainerId}
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby={titleId}
                      onClick={(event) => event.stopPropagation()}
                      // Shape/position morph comes from the layoutId projection —
                      // only opacity is animated explicitly, so it doesn't
                      // double up with the layout FLIP's own scale interpolation.
                      initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={motionTransition}
                      className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
                    >
                      {media && (
                        <motion.div
                          layoutId={sharedMediaId}
                          className="relative h-56 w-full shrink-0 overflow-hidden bg-muted [&>img]:size-full [&>img]:object-cover"
                        >
                          {media}
                        </motion.div>
                      )}

                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">
                        <motion.h2
                          layoutId={sharedTitleId}
                          id={titleId}
                          className="font-display text-xl font-semibold tracking-tight text-foreground"
                        >
                          {title}
                        </motion.h2>
                        {description && (
                          <p className="text-sm text-muted-foreground">{description}</p>
                        )}

                        {children && (
                          <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={
                              shouldReduceMotion
                                ? DURATION_INSTANT
                                : { ...SPRING_DEFAULT, delay: 0.05 }
                            }
                            className="pt-2 text-sm leading-relaxed text-foreground"
                          >
                            {children}
                          </motion.div>
                        )}
                      </div>

                      {footer && (
                        <div className="flex items-center gap-2 border-t border-border px-6 py-4">
                          {footer}
                        </div>
                      )}

                      <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={close}
                        aria-label="Close"
                        className="absolute right-4 top-4 rounded-md bg-card/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <CloseIcon />
                      </button>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </>
    );
  },
);

ExpandableCard.displayName = 'ExpandableCard';
