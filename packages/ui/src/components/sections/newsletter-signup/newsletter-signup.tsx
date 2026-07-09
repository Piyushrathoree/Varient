'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type FormEvent,
  type HTMLAttributes,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { Input } from '../../foundation/input';
import { DURATION_INSTANT, EASE_OUT, SPRING_DEFAULT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_DELAY_MS = 800;

const DEFAULT_TITLE = 'Stay in the loop';
const DEFAULT_BUTTON_LABEL = 'Subscribe';
const INVALID_EMAIL_MESSAGE = 'Enter a valid email address.';
const SUCCESS_MESSAGE = "You're subscribed — check your inbox.";

export type NewsletterSignupVariant = 'inline' | 'card';

export interface NewsletterSignupProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubscribe?: (email: string) => void | Promise<void>;
  variant?: NewsletterSignupVariant;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12L9 17L20 6" />
    </svg>
  );
}

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export const NewsletterSignup = forwardRef<HTMLElement, NewsletterSignupProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      description,
      placeholder = 'you@company.com',
      buttonLabel = DEFAULT_BUTTON_LABEL,
      onSubscribe,
      variant = 'inline',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();
    const statusId = useId();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEmailChange = useCallback((value: string) => {
      setEmail(value);
      setEmailError(undefined);
    }, []);

    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoading || isSuccess) {
          return;
        }

        const trimmed = email.trim();

        if (!trimmed || !isValidEmail(trimmed)) {
          setEmailError(INVALID_EMAIL_MESSAGE);
          return;
        }

        setEmailError(undefined);
        setIsLoading(true);

        try {
          if (onSubscribe) {
            await onSubscribe(trimmed);
          } else {
            await new Promise<void>((resolve) => {
              window.setTimeout(resolve, SUBMIT_DELAY_MS);
            });
          }
          setIsSuccess(true);
        } finally {
          setIsLoading(false);
        }
      },
      [email, isLoading, isSuccess, onSubscribe],
    );

    const enterExit = shouldReduceMotion
      ? {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: DURATION_INSTANT },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.25, ease: EASE_OUT },
        };

    const successEnter = shouldReduceMotion
      ? {
          initial: { opacity: 1, scale: 1 },
          animate: { opacity: 1, scale: 1 },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: SPRING_DEFAULT,
        };

    const formContent = (
      <div
        id={statusId}
        aria-live="polite"
        aria-atomic="true"
        className={cn(variant === 'inline' ? 'w-full' : 'mx-auto w-full max-w-md')}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSuccess ? (
            <motion.div
              key="success"
              role="status"
              className="flex items-center justify-center gap-3 rounded-lg bg-success/10 px-4 py-3 text-success"
              {...successEnter}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-success/15">
                <CheckIcon className="size-4" />
              </span>
              <p className="text-sm font-medium">{SUCCESS_MESSAGE}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className={cn(
                variant === 'inline'
                  ? 'flex w-full flex-col gap-2 sm:flex-row sm:items-start'
                  : 'flex w-full flex-col gap-3',
              )}
              {...enterExit}
            >
              <Input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder={placeholder}
                value={email}
                onChange={(event) => handleEmailChange(event.target.value)}
                errorText={emailError}
                isDisabled={isLoading}
                isRequired
                aria-label={variant === 'inline' ? 'Email address' : undefined}
                className={cn(variant === 'inline' && 'min-w-0 flex-1')}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                isDisabled={isLoading}
                className={cn(variant === 'inline' && 'w-full shrink-0 sm:w-auto')}
              >
                {buttonLabel}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );

    if (variant === 'card') {
      return (
        <section
          ref={ref}
          aria-labelledby={headingId}
          className={cn('w-full px-6 sm:px-8', className)}
          {...props}
        >
          <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm sm:px-8 sm:py-10">
            <h2
              id={headingId}
              className="text-balance font-display text-lg font-semibold tracking-tight text-foreground"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-balance text-sm text-muted-foreground">{description}</p>
            )}
            <div className={cn(description ? 'mt-6' : 'mt-4')}>{formContent}</div>
          </div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('w-full', className)}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2
                id={headingId}
                className="text-balance font-display text-lg font-semibold tracking-tight text-foreground"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {!title && !description && (
          <h2 id={headingId} className="sr-only">
            Newsletter signup
          </h2>
        )}
        {formContent}
      </section>
    );
  },
);

NewsletterSignup.displayName = 'NewsletterSignup';
