'use client';

import confetti, { type Options as ConfettiOptions } from 'canvas-confetti';
import {
  forwardRef,
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { buttonVariants, type ButtonSize, type ButtonVariant } from '../../foundation/button/button';
import { cn } from '../../../lib/utils';

export interface FireConfettiOptions {
  /** Normalized horizontal origin (0–1). Defaults to viewport center. */
  originX?: number;
  /** Normalized vertical origin (0–1). Defaults to viewport center. */
  originY?: number;
  /** Number of particles per burst. */
  particleCount?: number;
  /** Spread angle in degrees. */
  spread?: number;
  /** Particle colors — defaults to brand CSS variables at fire-time. */
  colors?: string[];
  /** Optional DOM node to read CSS variables from. */
  element?: HTMLElement | null;
}

export interface ConfettiBurstProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  particleCount?: number;
  spread?: number;
  colors?: string[];
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  onFire?: () => void;
}

const DEFAULT_PARTICLE_COUNT = 80;
const DEFAULT_SPREAD = 70;

const FALLBACK_BRAND_COLORS = ['#ff5a1f', '#f03e0c', '#ff7e44', '#ffa377'];

/** Read brand hues from CSS custom properties at fire-time. */
export function getBrandConfettiColors(element?: HTMLElement | null): string[] {
  if (typeof window === 'undefined') return FALLBACK_BRAND_COLORS;

  const root = element ?? document.documentElement;
  const style = getComputedStyle(root);

  const colors = [
    style.getPropertyValue('--color-brand').trim(),
    style.getPropertyValue('--color-brand-secondary').trim(),
    style.getPropertyValue('--color-brand-light').trim(),
    style.getPropertyValue('--color-brand-lighter').trim(),
  ].filter((color) => color.length > 0);

  return colors.length > 0 ? colors : FALLBACK_BRAND_COLORS;
}

/** Imperatively fire a confetti burst from a normalized origin point. */
export function fireConfetti(options: FireConfettiOptions = {}): void {
  const {
    originX = 0.5,
    originY = 0.5,
    particleCount = DEFAULT_PARTICLE_COUNT,
    spread = DEFAULT_SPREAD,
    colors,
    element,
  } = options;

  void confetti({
    particleCount,
    spread,
    origin: { x: originX, y: originY },
    colors: colors ?? getBrandConfettiColors(element),
    disableForReducedMotion: true,
  } satisfies ConfettiOptions);
}

/** Hook for imperative confetti — respects `prefers-reduced-motion`. */
export function useConfetti(defaultOptions: FireConfettiOptions = {}) {
  const shouldReduceMotion = useReducedMotion();
  const optionsRef = useRef(defaultOptions);
  optionsRef.current = defaultOptions;

  const fire = useCallback(
    (overrideOptions: FireConfettiOptions = {}) => {
      if (shouldReduceMotion) return;
      fireConfetti({ ...optionsRef.current, ...overrideOptions });
    },
    [shouldReduceMotion],
  );

  return { fire, isReducedMotion: shouldReduceMotion };
}

/**
 * Button wrapper that fires a celebratory confetti burst from its position
 * on click. Under `prefers-reduced-motion` the click handler still runs but
 * no particles are emitted.
 */
export const ConfettiBurst = forwardRef<HTMLButtonElement, ConfettiBurstProps>(
  (
    {
      children,
      className,
      particleCount = DEFAULT_PARTICLE_COUNT,
      spread = DEFAULT_SPREAD,
      colors,
      variant = 'primary',
      size = 'md',
      isDisabled = false,
      onFire,
      onClick,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const nodeRef = useRef<HTMLButtonElement | null>(null);
    const shouldReduceMotion = useReducedMotion();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isDisabled) return;

      onFire?.();

      if (shouldReduceMotion) return;

      const node = nodeRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      fireConfetti({
        originX,
        originY,
        particleCount,
        spread,
        colors,
        element: node,
      });
    };

    return (
      <button
        ref={(node) => {
          nodeRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ConfettiBurst.displayName = 'ConfettiBurst';
