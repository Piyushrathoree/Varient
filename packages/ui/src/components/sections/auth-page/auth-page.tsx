'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { Checkbox } from '../../foundation/checkbox';
import { Input } from '../../foundation/input';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export type AuthPageVariant = 'login' | 'signup';

export interface AuthPageLoginData {
  variant: 'login';
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthPageSignupData {
  variant: 'signup';
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export type AuthPageFormData = AuthPageLoginData | AuthPageSignupData;

export type AuthPageSocialProvider = 'github' | 'google';

/** A generic social provider entry rendered alongside the built-in GitHub/Google buttons. */
export interface AuthPageSocialProviderConfig {
  /** Stable id passed to `onSocialAuth`. */
  id: string;
  /** Button label. */
  label: string;
  /** Icon slot — any ReactNode (typically a 16x16 inline SVG). */
  icon: ReactNode;
}

type FieldKey = 'name' | 'email' | 'password' | 'terms';

type FieldErrors = Partial<Record<FieldKey, string>>;

type SubmitState = 'idle' | 'loading' | 'success';

export interface AuthPageProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
  variant?: AuthPageVariant;
  headline?: ReactNode;
  description?: ReactNode;
  onSubmit?: (data: AuthPageFormData) => void | Promise<void>;
  /** Called when a social auth button is clicked. Accepts built-in ids plus any custom `socialProviders` id. */
  onSocialAuth?: (provider: AuthPageSocialProvider | (string & {})) => void;
  /** Extra social providers rendered after the built-in GitHub/Google buttons — bring your own icon. */
  socialProviders?: AuthPageSocialProviderConfig[];
  forgotPasswordHref?: string;
  forgotPasswordLabel?: string;
  /** Right panel content on large screens. Defaults to a dot-grid panel with a testimonial quote. */
  aside?: ReactNode;
  /** Submit button label. Defaults to "Sign in" / "Create account" per variant. */
  submitLabel?: ReactNode;
  /** Submit button label while the async `onSubmit` is pending. */
  loadingLabel?: ReactNode;
  /** Submit button label shown briefly after `onSubmit` resolves successfully. */
  successLabel?: ReactNode;
}

const DEFAULT_LOGIN_HEADLINE = 'Welcome back';
const DEFAULT_LOGIN_DESCRIPTION = 'Sign in to your account to continue.';
const DEFAULT_SIGNUP_HEADLINE = 'Create your account';
const DEFAULT_SIGNUP_DESCRIPTION = 'Start building with copy-paste components today.';
const DEFAULT_FORGOT_PASSWORD_LABEL = 'Forgot password?';
const SUCCESS_LABEL_DURATION_MS = 1600;

const DEFAULT_TESTIMONIAL = {
  quote:
    'We shipped our auth flow in an afternoon — the split layout and social buttons dropped in without rework.',
  name: 'Maya Chen',
  role: 'Product lead, Northline',
};

function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

function validateLoginFields(values: {
  email: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Enter your password.';
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return errors;
}

function validateSignupFields(values: {
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}): FieldErrors {
  const errors = validateLoginFields(values);

  if (!values.name.trim()) {
    errors.name = 'Enter your full name.';
  }

  if (!values.agreedToTerms) {
    errors.terms = 'Agree to the terms before creating an account.';
  }

  return errors;
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.012-1.04-.012-1.885-3.338.735-4.035-1.605-4.035-1.605-.546-1.385-1.335-1.755-1.335-1.755-1.087-.735.084-.715.084-.715 1.205.075 1.84 1.17 1.84 1.17 1.07 1.835 2.809 1.305 3.495.997.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.305.105-3.27 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.515 3.285-1.23 3.285-1.23.645 1.65.24 2.97.12 3.66.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.52 8.52 0 0 0 24 12.003C24 5.367 18.627 0 12 0Z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.351Z"
        fill="currentColor"
        opacity={0.9}
      />
      <path
        d="M12 22c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H3.064v2.59A9.996 9.996 0 0 0 12 22Z"
        fill="currentColor"
        opacity={0.7}
      />
      <path
        d="M6.405 14.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V8.51H3.064A9.996 9.996 0 0 0 2 12c0 1.614.386 3.14 1.064 4.49l3.341-2.59Z"
        fill="currentColor"
        opacity={0.5}
      />
      <path
        d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.959 2.891 14.695 2 12 2 8.159 2 4.873 3.64 3.064 6.51l3.341 2.59C7.19 7.736 9.395 5.977 12 5.977Z"
        fill="currentColor"
        opacity={0.8}
      />
    </svg>
  );
}

function OrDivider() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" aria-hidden />
      <span className="text-xs font-medium text-muted-foreground">or</span>
      <div className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}

function DefaultAsidePanel() {
  return (
    <div
      className={cn(
        'relative flex h-full min-h-[32rem] flex-col items-center justify-center px-8 py-12',
        '[--dot-color:color-mix(in_oklch,var(--color-foreground)_6%,transparent)]',
        '[background-image:radial-gradient(circle,var(--dot-color)_1px,transparent_1px)]',
        '[background-size:20px_20px]',
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-muted/30" />
      <figure className="relative z-10 mx-auto max-w-md text-center">
        <blockquote className="text-balance font-display text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl">
          &ldquo;{DEFAULT_TESTIMONIAL.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{DEFAULT_TESTIMONIAL.name}</span>
          <span className="mx-2 text-border" aria-hidden>
            ·
          </span>
          {DEFAULT_TESTIMONIAL.role}
        </figcaption>
      </figure>
    </div>
  );
}

export const AuthPage = forwardRef<HTMLElement, AuthPageProps>(
  (
    {
      className,
      variant = 'login',
      headline,
      description,
      onSubmit,
      onSocialAuth,
      socialProviders,
      forgotPasswordHref = '#forgot-password',
      forgotPasswordLabel = DEFAULT_FORGOT_PASSWORD_LABEL,
      aside,
      submitLabel,
      loadingLabel,
      successLabel,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [submitState, setSubmitState] = useState<SubmitState>('idle');
    const successTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (successTimeoutRef.current !== null) {
          window.clearTimeout(successTimeoutRef.current);
        }
      };
    }, []);

    const isLoading = submitState === 'loading';
    const isSuccess = submitState === 'success';
    const isLogin = variant === 'login';
    const resolvedHeadline =
      headline ?? (isLogin ? DEFAULT_LOGIN_HEADLINE : DEFAULT_SIGNUP_HEADLINE);
    const resolvedDescription =
      description ?? (isLogin ? DEFAULT_LOGIN_DESCRIPTION : DEFAULT_SIGNUP_DESCRIPTION);

    const clearFieldError = useCallback((field: FieldKey) => {
      setFieldErrors((prev) => {
        if (!prev[field]) {
          return prev;
        }
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }, []);

    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoading) {
          return;
        }

        const errors = isLogin
          ? validateLoginFields({ email, password })
          : validateSignupFields({ name, email, password, agreedToTerms });

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }

        setFieldErrors({});
        setSubmitState('loading');

        try {
          if (onSubmit) {
            if (isLogin) {
              await onSubmit({
                variant: 'login',
                email: email.trim(),
                password,
                rememberMe,
              });
            } else {
              await onSubmit({
                variant: 'signup',
                name: name.trim(),
                email: email.trim(),
                password,
                agreedToTerms,
              });
            }
          }
          setSubmitState('success');
          successTimeoutRef.current = window.setTimeout(() => {
            setSubmitState('idle');
          }, SUCCESS_LABEL_DURATION_MS);
        } catch (error) {
          setSubmitState('idle');
          throw error;
        }
      },
      [
        agreedToTerms,
        email,
        isLoading,
        isLogin,
        name,
        onSubmit,
        password,
        rememberMe,
      ],
    );

    const resolvedSubmitLabel = isSuccess && successLabel
      ? successLabel
      : isLoading && loadingLabel
        ? loadingLabel
        : (submitLabel ?? (isLogin ? 'Sign in' : 'Create account'));

    const socialButtons = [
      { id: 'github' as const, label: 'GitHub', icon: <GitHubIcon className="size-4" /> },
      { id: 'google' as const, label: 'Google', icon: <GoogleIcon className="size-4" /> },
      ...(socialProviders ?? []).map((provider) => ({
        id: provider.id,
        label: provider.label,
        icon: provider.icon,
      })),
    ];

    const panelMotion = shouldReduceMotion
      ? {
          initial: { opacity: 1, x: 0 },
          animate: { opacity: 1, x: 0 },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35, ease: EASE_OUT },
        };

    const asideMotion = shouldReduceMotion
      ? {
          initial: { opacity: 1, x: 0 },
          animate: { opacity: 1, x: 0 },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35, ease: EASE_OUT, delay: 0.08 },
        };

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('flex min-h-screen w-full flex-col lg:flex-row', className)}
        {...props}
      >
        <motion.div
          className="flex w-full flex-1 items-center justify-center px-6 py-12 sm:px-8 lg:w-1/2 lg:py-16"
          {...panelMotion}
        >
          <div className="w-full max-w-md">
            <div className="mb-8 space-y-2">
              <h1
                id={headingId}
                className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {resolvedHeadline}
              </h1>
              {resolvedDescription && (
                <p className="text-balance text-sm text-muted-foreground sm:text-base">
                  {resolvedDescription}
                </p>
              )}
            </div>

            <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
              {!isLogin && (
                <Input
                  autoComplete="name"
                  errorText={fieldErrors.name}
                  isDisabled={isLoading}
                  isRequired
                  label="Full name"
                  name="name"
                  onChange={(event) => {
                    setName(event.target.value);
                    clearFieldError('name');
                  }}
                  value={name}
                />
              )}

              <Input
                autoComplete="email"
                errorText={fieldErrors.email}
                inputMode="email"
                isDisabled={isLoading}
                isRequired
                label="Email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearFieldError('email');
                }}
                type="email"
                value={email}
              />

              <div className="flex flex-col gap-2">
                <Input
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  errorText={fieldErrors.password}
                  isDisabled={isLoading}
                  isRequired
                  label="Password"
                  name="password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearFieldError('password');
                  }}
                  type="password"
                  value={password}
                />
                {isLogin && (
                  <div className="flex justify-end">
                    <a
                      className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      href={forgotPasswordHref}
                    >
                      {forgotPasswordLabel}
                    </a>
                  </div>
                )}
              </div>

              {isLogin ? (
                <Checkbox
                  isChecked={rememberMe}
                  isDisabled={isLoading}
                  label="Remember me"
                  onChange={(checked) => setRememberMe(checked)}
                />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <Checkbox
                    isChecked={agreedToTerms}
                    isDisabled={isLoading}
                    label="I agree to the terms of service"
                    onChange={(checked) => {
                      setAgreedToTerms(checked);
                      clearFieldError('terms');
                    }}
                  />
                  {fieldErrors.terms && (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldErrors.terms}
                    </p>
                  )}
                </div>
              )}

              <Button
                className="w-full"
                isDisabled={isLoading}
                isLoading={isLoading}
                size="lg"
                type="submit"
                variant="primary"
              >
                {resolvedSubmitLabel}
              </Button>

              <OrDivider />

              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(socialButtons.length, 3)}, minmax(0, 1fr))`,
                }}
              >
                {socialButtons.map((provider) => (
                  <Button
                    isDisabled={isLoading}
                    key={provider.id}
                    onClick={() => onSocialAuth?.(provider.id)}
                    size="md"
                    type="button"
                    variant="outline"
                  >
                    {provider.icon}
                    {provider.label}
                  </Button>
                ))}
              </div>
            </form>
          </div>
        </motion.div>

        <motion.aside
          aria-hidden={aside === undefined ? true : undefined}
          className="hidden border-l border-border bg-muted/20 lg:block lg:w-1/2"
          {...asideMotion}
        >
          {aside ?? <DefaultAsidePanel />}
        </motion.aside>
      </section>
    );
  },
);

AuthPage.displayName = 'AuthPage';
