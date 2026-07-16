'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

function CloseIcon(props: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={props.className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 16 16"
    >
      <path d="M12 4 4 12M4 4l8 8" />
    </svg>
  );
}

export type AnnouncementBannerVariant = 'neutral' | 'brand';

export interface AnnouncementBannerLink {
  label: string;
  href: string;
}

type NativeDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

export interface AnnouncementBannerProps extends NativeDivProps {
  message: ReactNode;
  link?: AnnouncementBannerLink;
  variant?: AnnouncementBannerVariant;
  /** Optional leading icon rendered before the message. */
  icon?: ReactNode;
  /** Controlled dismiss state. Omit for uncontrolled behavior. */
  isDismissed?: boolean;
  onDismiss?: () => void;
  /** Slide-down entrance on mount. Defaults to true. */
  isAnimated?: boolean;
  /** Accessible label for the dismiss button. Defaults to 'Dismiss announcement'. */
  dismissLabel?: string;
}

const variantStyles: Record<AnnouncementBannerVariant, string> = {
  neutral: 'border-border bg-muted/50 text-foreground',
  brand: 'border-brand/25 bg-brand/5 text-foreground',
};

export const AnnouncementBanner = forwardRef<HTMLDivElement, AnnouncementBannerProps>(
  (
    {
      className,
      message,
      link,
      variant = 'neutral',
      icon,
      isDismissed: isDismissedProp,
      onDismiss,
      isAnimated = true,
      dismissLabel = 'Dismiss announcement',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const messageId = useId();
    const [internalDismissed, setInternalDismissed] = useState(false);

    const isControlled = isDismissedProp !== undefined;
    const isDismissed = isControlled ? isDismissedProp : internalDismissed;

    const handleDismiss = useCallback(() => {
      if (!isControlled) {
        setInternalDismissed(true);
      }
      onDismiss?.();
    }, [isControlled, onDismiss]);

    const entrance = shouldReduceMotion || !isAnimated
      ? {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, transition: DURATION_INSTANT },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } },
          transition: { duration: 0.3, ease: EASE_OUT },
        };

    return (
      <AnimatePresence initial={false}>
        {!isDismissed && (
          <motion.div
            ref={ref}
            aria-labelledby={messageId}
            className={cn(
              'relative w-full border-b px-4 py-2.5 sm:px-6',
              variantStyles[variant],
              className,
            )}
            role="region"
            {...entrance}
            {...props}
          >
            <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-4">
              {icon ? (
                <span
                  aria-hidden
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center [&>svg]:size-4',
                    variant === 'brand' ? 'text-brand' : 'text-foreground',
                  )}
                >
                  {icon}
                </span>
              ) : (
                variant === 'brand' && (
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-brand"
                  />
                )
              )}

              <p
                id={messageId}
                className="min-w-0 flex-1 text-pretty text-center text-sm leading-snug sm:text-left"
              >
                {message}
                {link && (
                  <>
                    {' '}
                    <a
                      className={cn(
                        'font-medium underline-offset-4 transition-colors hover:underline',
                        variant === 'brand'
                          ? 'text-brand hover:text-brand-secondary'
                          : 'text-foreground hover:text-foreground/80',
                      )}
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </>
                )}
              </p>

              <button
                aria-label={dismissLabel}
                className={cn(
                  'inline-flex size-8 shrink-0 items-center justify-center rounded-md',
                  'text-muted-foreground transition-colors hover:bg-background hover:text-foreground',
                  'motion-reduce:transition-none motion-reduce:active:scale-100 active:scale-90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                )}
                onClick={handleDismiss}
                type="button"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

AnnouncementBanner.displayName = 'AnnouncementBanner';
