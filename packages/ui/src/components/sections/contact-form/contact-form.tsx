'use client';

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { Checkbox } from '../../foundation/checkbox';
import { Input } from '../../foundation/input';
import { Textarea } from '../../foundation/textarea';
import { DURATION_INSTANT, EASE_OUT, SPRING_DEFAULT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUBMIT_DELAY_MS = 800;
const MIN_MESSAGE_LENGTH = 10;

const DEFAULT_SUCCESS_MESSAGE = "Thanks — we'll get back to you within two business days.";
const DEFAULT_SUBMIT_LABEL = 'Send message';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  agreedToPrivacy: boolean;
}

type FieldKey = 'name' | 'email' | 'company' | 'subject' | 'message' | 'privacy';

type FieldErrors = Partial<Record<FieldKey, string>>;

export interface ContactFormProps extends Omit<HTMLAttributes<HTMLElement>, 'onSubmit'> {
  title?: string;
  description?: string;
  onSubmit?: (data: ContactFormData) => void | Promise<void>;
  showCompanyField?: boolean;
  /** Renders an optional subject input between the company field and message. */
  showSubjectField?: boolean;
  /** Label rendered on the submit button. */
  submitLabel?: string;
  /** Heading shown above the success message once the form has been submitted. */
  successTitle?: string;
  /** Body copy shown in the success panel once the form has been submitted. */
  successMessage?: string;
  /**
   * Extra form fields rendered after the privacy checkbox and before the
   * submit button — an escape hatch for consumers who need fields this
   * component doesn't model natively (file upload, phone number, etc.).
   */
  children?: ReactNode;
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

function validateFields(
  values: {
    name: string;
    email: string;
    message: string;
    agreedToPrivacy: boolean;
  },
): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Enter your name to continue.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.message.trim()) {
    errors.message = 'Enter a message so we know how to help.';
  } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters — add a bit more detail.`;
  }

  if (!values.agreedToPrivacy) {
    errors.privacy = 'Check the box to agree to the privacy policy before submitting.';
  }

  return errors;
}

export const ContactForm = forwardRef<HTMLElement, ContactFormProps>(
  (
    {
      className,
      title,
      description,
      onSubmit,
      showCompanyField = false,
      showSubjectField = false,
      submitLabel = DEFAULT_SUBMIT_LABEL,
      successTitle,
      successMessage = DEFAULT_SUCCESS_MESSAGE,
      children,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();
    const statusId = useId();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

        if (isLoading || isSuccess) {
          return;
        }

        const errors = validateFields({ name, email, message, agreedToPrivacy });

        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }

        setFieldErrors({});
        setIsLoading(true);

        const payload: ContactFormData = {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          agreedToPrivacy,
          ...(showCompanyField && company.trim() ? { company: company.trim() } : {}),
          ...(showSubjectField && subject.trim() ? { subject: subject.trim() } : {}),
        };

        try {
          if (onSubmit) {
            await onSubmit(payload);
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
      [
        agreedToPrivacy,
        company,
        email,
        isLoading,
        isSuccess,
        message,
        name,
        onSubmit,
        showCompanyField,
        showSubjectField,
        subject,
      ],
    );

    const panelTransition = shouldReduceMotion
      ? {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 0, transition: DURATION_INSTANT },
          transition: DURATION_INSTANT,
        }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -12 },
          transition: { duration: 0.3, ease: EASE_OUT },
        };

    const successTransition = shouldReduceMotion
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

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn('w-full px-6 sm:px-8', className)}
        {...props}
      >
        <div className="mx-auto w-full max-w-xl">
          {(title || description) && (
            <div className="mb-6 text-center sm:mb-8">
              {title && (
                <h2
                  id={headingId}
                  className="text-balance font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-2 text-balance text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {!title && !description && (
            <h2 id={headingId} className="sr-only">
              Contact form
            </h2>
          )}

          <div id={statusId} aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              {isSuccess ? (
                <motion.div
                  key="success"
                  role="status"
                  className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10 sm:py-14"
                  {...successTransition}
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-success/10 text-success">
                    <CheckIcon className="size-6" />
                  </span>
                  {successTitle && (
                    <p className="text-balance font-display text-base font-semibold text-foreground sm:text-lg">
                      {successTitle}
                    </p>
                  )}
                  <p className="max-w-sm text-balance text-sm font-medium text-foreground sm:text-base">
                    {successMessage}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                  {...panelTransition}
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        clearFieldError('name');
                      }}
                      errorText={fieldErrors.name}
                      isDisabled={isLoading}
                      isRequired
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        clearFieldError('email');
                      }}
                      errorText={fieldErrors.email}
                      isDisabled={isLoading}
                      isRequired
                    />
                  </div>

                  {showCompanyField && (
                    <Input
                      label="Company"
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={(event) => {
                        setCompany(event.target.value);
                        clearFieldError('company');
                      }}
                      errorText={fieldErrors.company}
                      isDisabled={isLoading}
                      helperText="Optional"
                    />
                  )}

                  {showSubjectField && (
                    <Input
                      label="Subject"
                      name="subject"
                      value={subject}
                      onChange={(event) => {
                        setSubject(event.target.value);
                        clearFieldError('subject');
                      }}
                      errorText={fieldErrors.subject}
                      isDisabled={isLoading}
                      helperText="Optional"
                    />
                  )}

                  <Textarea
                    label="Message"
                    name="message"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      clearFieldError('message');
                    }}
                    errorText={fieldErrors.message}
                    isDisabled={isLoading}
                    isRequired
                    resize="vertical"
                    rows={5}
                    placeholder="Tell us what you need help with…"
                  />

                  <div className="flex flex-col gap-1.5">
                    <Checkbox
                      isChecked={agreedToPrivacy}
                      onChange={(checked) => {
                        setAgreedToPrivacy(checked);
                        clearFieldError('privacy');
                      }}
                      isDisabled={isLoading}
                      label="I agree to the privacy policy"
                    />
                    {fieldErrors.privacy && (
                      <p className="text-destructive text-sm" role="alert">
                        {fieldErrors.privacy}
                      </p>
                    )}
                  </div>

                  {children}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    className="w-full"
                  >
                    {submitLabel}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  },
);

ContactForm.displayName = 'ContactForm';
