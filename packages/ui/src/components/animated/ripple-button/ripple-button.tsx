'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from '../../foundation/button/button';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: number;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
}

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

const DEFAULT_RIPPLE_COLOR = 'color-mix(in oklab, var(--color-foreground) 18%, transparent)';
const DEFAULT_DURATION = 0.6;
const RIPPLE_SIZE = 48;

/**
 * Button with an expanding ripple emanating from the click point. Under
 * `prefers-reduced-motion` a brief background flash replaces the ripple.
 */
export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      rippleColor = DEFAULT_RIPPLE_COLOR,
      duration = DEFAULT_DURATION,
      variant = 'default',
      size = 'md',
      isDisabled = false,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const [isFlashing, setIsFlashing] = useState(false);
    const flashTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (flashTimeoutRef.current !== null) {
          window.clearTimeout(flashTimeoutRef.current);
        }
      };
    }, []);

    const removeRipple = useCallback((id: number) => {
      setRipples((current) => current.filter((ripple) => ripple.id !== id));
    }, []);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isDisabled) return;

      if (shouldReduceMotion) {
        setIsFlashing(true);
        if (flashTimeoutRef.current !== null) {
          window.clearTimeout(flashTimeoutRef.current);
        }
        flashTimeoutRef.current = window.setTimeout(() => {
          setIsFlashing(false);
          flashTimeoutRef.current = null;
        }, 150);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = Date.now() + Math.random();

      setRipples((current) => [...current, { id, x, y }]);
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        className={cn(
          buttonVariants({ variant, size }),
          'relative overflow-hidden',
          isFlashing && 'bg-foreground/8 motion-reduce:transition-none',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {!shouldReduceMotion
          ? ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                aria-hidden
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: RIPPLE_SIZE,
                  height: RIPPLE_SIZE,
                  marginLeft: -RIPPLE_SIZE / 2,
                  marginTop: -RIPPLE_SIZE / 2,
                  backgroundColor: rippleColor,
                }}
                initial={{ scale: 0, opacity: 0.45 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration, ease: EASE_OUT }}
                onAnimationComplete={() => removeRipple(ripple.id)}
              />
            ))
          : null}
        <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
          {children}
        </span>
      </button>
    );
  },
);

RippleButton.displayName = 'RippleButton';
