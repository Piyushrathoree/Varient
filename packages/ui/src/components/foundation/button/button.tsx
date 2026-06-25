import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../lib/utils';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-neutral-0 hover:bg-brand-600 active:bg-brand-700',
  default:
    'bg-neutral-900 text-neutral-0 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
  ghost:
    'bg-transparent text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800',
  outline:
    'border border-neutral-300 bg-transparent text-text-primary hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900',
  destructive: 'bg-danger text-neutral-0 hover:opacity-90 active:opacity-80',
  link: 'bg-transparent text-brand-500 underline-offset-4 hover:underline',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 gap-1 px-2.5 text-xs',
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-5 text-base',
  xl: 'h-12 gap-2.5 px-6 text-base',
};

export function buttonVariants({
  variant = 'default',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
    'disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

function ButtonSpinner({ size }: { size: ButtonSize }) {
  const iconSize =
    size === 'xs' || size === 'sm' ? 'size-3.5' : size === 'md' ? 'size-4' : 'size-5';

  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        iconSize,
      )}
      aria-hidden
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isInteractionDisabled = isDisabled || isLoading;
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...(!asChild && {
          type,
          disabled: isInteractionDisabled,
          'aria-disabled': isDisabled || undefined,
          'aria-busy': isLoading || undefined,
        })}
        {...(asChild && isDisabled ? { 'aria-disabled': true, tabIndex: -1 } : {})}
        {...props}
      >
        {asChild ? (
          children
        ) : isLoading ? (
          <>
            <ButtonSpinner size={size} />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
