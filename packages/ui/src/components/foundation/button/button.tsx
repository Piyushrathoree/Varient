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
  | 'link'
  | 'sweep'
  | 'frame';

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
  // Hero CTA — SmoothUI's "candy" treatment: a brand gradient fill with a
  // hairline highlight border and a soft ring, our ember hue in their brand
  // slot. This is the one high-voltage signal, reserved for the primary action.
  primary:
    'border-[0.5px] border-white/25 bg-gradient-to-b from-brand to-brand-secondary text-white shadow-black/20 shadow-md ring-1 ring-(--ring-color) [--ring-color:color-mix(in_oklab,var(--color-foreground)_15%,var(--color-brand))] hover:from-brand-secondary hover:to-brand-secondary [&_svg]:drop-shadow-sm',
  // Neutral high-contrast — SmoothUI's default button surface.
  default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
  ghost: 'hover:bg-background hover:text-foreground hover:shadow-sm',
  outline:
    'border border-input bg-background shadow-xs hover:bg-accent hover:text-white dark:bg-input/30 dark:hover:bg-input/50',
  destructive:
    'bg-gradient-to-b from-[#FD4B4E] to-destructive text-white shadow-[0px_1px_2px_rgba(0,0,0,0.4),0px_0px_0px_1px_#F61418,inset_0px_0.75px_0px_rgba(255,255,255,0.2)] hover:from-destructive hover:to-destructive',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline',
  // Fill-on-hover — a brand-outlined pill. On hover a solid layer glides in
  // from the left edge on a GPU-composited `scaleX` transform (clipped to
  // the button's own rounded corners via overflow-hidden), and the label
  // inverts. Previously this animated an inset box-shadow's spread, which is
  // paint-driven (not compositor-only) and reads as a hard-edged, boxy step
  // rather than a glide — the transform swap fixes that. Themed off
  // --color-brand so it tracks the token, not a hex.
  sweep:
    'relative isolate overflow-hidden border border-brand bg-transparent text-brand hover:text-white active:text-white ' +
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-brand before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)] before:content-[''] motion-reduce:before:transition-none " +
    'hover:before:scale-x-100 active:before:bg-brand-secondary',
  // Gradient-frame glow — a surface pill rimmed by a brand gradient
  // (padding-box/border-box trick, no wrapper so asChild still works),
  // lifting + shadow-growing on hover.
  frame:
    'border-2 border-transparent bg-background text-foreground shadow-xs hover:-translate-y-px hover:shadow-md active:translate-y-0 ' +
    '[background:linear-gradient(var(--color-background),var(--color-background))_padding-box,linear-gradient(135deg,var(--color-brand),var(--color-brand-secondary))_border-box]',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 gap-1 px-2.5 text-xs',
  sm: 'h-9 gap-1.5 px-4 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-8 text-base',
  xl: 'h-12 gap-2.5 px-8 text-base',
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
    // Transition property list is intentionally broad — beyond the press
    // scale, several variants swap background/border/text color or shadow
    // on hover (frame's lift, outline's fill, etc.); without those in here
    // those swaps snap instantly while the scale eases, which reads as
    // linear/Base-UI-ish rather than springy. Duration + curve match
    // EASE_OUT from lib/animation.ts (0.2s, premium decelerate).
    'inline-flex cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap ring-offset-background transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
