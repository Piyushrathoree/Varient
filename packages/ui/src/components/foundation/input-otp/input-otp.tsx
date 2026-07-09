'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { OTPInput, OTPInputContext, type SlotProps } from 'input-otp';
import { cn } from '../../../lib/utils';

interface InputOTPContextValue {
  isInvalid: boolean;
}

const InputOTPFieldContext = createContext<InputOTPContextValue>({ isInvalid: false });

function useInputOTPFieldContext(): InputOTPContextValue {
  return useContext(InputOTPFieldContext);
}

export interface InputOTPProps
  extends Omit<ComponentPropsWithoutRef<typeof OTPInput>, 'maxLength' | 'render' | 'disabled'> {
  length: number;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

export const InputOTP = forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  (
    {
      className,
      containerClassName,
      length,
      isDisabled = false,
      isInvalid = false,
      children,
      ...props
    },
    ref,
  ) => (
    <InputOTPFieldContext.Provider value={{ isInvalid }}>
      <OTPInput
        ref={ref}
        maxLength={length}
        disabled={isDisabled}
        containerClassName={cn(
          'group/input-otp flex items-center has-disabled:cursor-not-allowed has-disabled:opacity-50',
          containerClassName,
          className,
        )}
        {...props}
      >
        {children}
      </OTPInput>
    </InputOTPFieldContext.Provider>
  ),
);

InputOTP.displayName = 'InputOTP';

export type InputOTPGroupProps = HTMLAttributes<HTMLDivElement>;

export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
  ),
);

InputOTPGroup.displayName = 'InputOTPGroup';

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
}

export const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { isInvalid } = useInputOTPFieldContext();

    if (!inputOTPContext) {
      throw new Error('InputOTPSlot must be rendered inside <InputOTP>.');
    }

    const rawSlot = inputOTPContext.slots[index];

    if (!rawSlot || typeof rawSlot === 'string') {
      throw new Error(`InputOTPSlot index ${index} is out of range for the current OTP length.`);
    }

    return (
      <InputOTPSlotInner
        ref={ref}
        otpSlot={rawSlot}
        isInvalid={isInvalid}
        className={className}
        {...props}
      />
    );
  },
);

InputOTPSlot.displayName = 'InputOTPSlot';

interface InputOTPSlotInnerProps extends HTMLAttributes<HTMLDivElement> {
  otpSlot: SlotProps;
  isInvalid: boolean;
}

const InputOTPSlotInner = forwardRef<HTMLDivElement, InputOTPSlotInnerProps>(
  ({ otpSlot, isInvalid, className, ...props }, ref) => (
    <div
      ref={ref}
      data-active={otpSlot.isActive}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'relative flex size-10 items-center justify-center border-y border-r border-input bg-background text-sm font-medium text-foreground transition-[color,box-shadow,border-color] first:rounded-l-md first:border-l last:rounded-r-md',
        'group-hover/input-otp:border-foreground/20 group-focus-within/input-otp:border-foreground/20',
        otpSlot.isActive &&
          'z-10 border-brand shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand)_16%,transparent)]',
        isInvalid && 'border-destructive',
        className,
      )}
      {...props}
    >
      <span className="group-has-[input[data-input-otp-placeholder-shown]]/input-otp:opacity-30">
        {otpSlot.char ?? otpSlot.placeholderChar}
      </span>
      {otpSlot.hasFakeCaret && <InputOTPCaret />}
    </div>
  ),
);

InputOTPSlotInner.displayName = 'InputOTPSlotInner';

function InputOTPCaret() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="h-5 w-px animate-pulse bg-foreground motion-reduce:animate-none" />
    </span>
  );
}

export type InputOTPSeparatorProps = HTMLAttributes<HTMLDivElement>;

export const InputOTPSeparator = forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-hidden
      className={cn('flex w-6 items-center justify-center', className)}
      {...props}
    >
      {children ?? <span className="size-1 rounded-full bg-border" />}
    </div>
  ),
);

InputOTPSeparator.displayName = 'InputOTPSeparator';

export interface InputOTPLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const InputOTPLabel = forwardRef<HTMLParagraphElement, InputOTPLabelProps>(
  ({ className, ...props }, ref) => {
    const id = useId();
    return (
      <p
        ref={ref}
        id={id}
        className={cn('text-sm font-medium text-foreground', className)}
        {...props}
      />
    );
  },
);

InputOTPLabel.displayName = 'InputOTPLabel';
