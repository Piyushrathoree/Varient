'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION, EASE_OUT, SPRING_SNAPPY } from '../../../lib/animation';

export interface HeroHighlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Dot grid spacing in pixels. */
  dotSpacing?: number;
  /** Dot radius in pixels. */
  dotRadius?: number;
  /** Cursor reveal spotlight radius in pixels. */
  spotlightSize?: number;
}

export interface HighlightProps {
  children: ReactNode;
  className?: string;
  /** Highlight bar color — defaults to brand at low alpha. */
  color?: string;
}

const DEFAULT_HIGHLIGHT_COLOR =
  'color-mix(in oklab, var(--color-brand) 22%, transparent)';

/**
 * Interactive dot-grid hero container that brightens around the cursor via a
 * radial mask. Pair with `Highlight` for brand-colored text sweeps. Under
 * `prefers-reduced-motion` the grid is static with no pointer tracking.
 */
export const HeroHighlight = forwardRef<HTMLDivElement, HeroHighlightProps>(
  (
    {
      children,
      className,
      dotSpacing = 20,
      dotRadius = 1,
      spotlightSize = 180,
      ...props
    },
    ref,
  ) => {
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const patternId = useId();
    const shouldReduceMotion = useReducedMotion();

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const spotlightOpacity = useMotionValue(0);

    const x = useSpring(pointerX, SPRING_SNAPPY);
    const y = useSpring(pointerY, SPRING_SNAPPY);
    const revealOpacity = useSpring(spotlightOpacity, SPRING_SNAPPY);

    const maskImage = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, black 0%, transparent 100%)`;

    useEffect(() => {
      const node = nodeRef.current;
      if (!node || shouldReduceMotion) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        pointerX.set(event.clientX - rect.left);
        pointerY.set(event.clientY - rect.top);
        spotlightOpacity.set(1);
      };

      const handlePointerLeave = () => {
        spotlightOpacity.set(0);
      };

      node.addEventListener('pointermove', handlePointerMove);
      node.addEventListener('pointerleave', handlePointerLeave);

      return () => {
        node.removeEventListener('pointermove', handlePointerMove);
        node.removeEventListener('pointerleave', handlePointerLeave);
      };
    }, [shouldReduceMotion, pointerX, pointerY, spotlightOpacity]);

    const setRefs = (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const dotGrid = (
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern
            id={patternId}
            width={dotSpacing}
            height={dotSpacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={dotSpacing / 2}
              cy={dotSpacing / 2}
              r={dotRadius}
              className="fill-muted-foreground/25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );

    if (shouldReduceMotion) {
      return (
        <div
          ref={setRefs}
          className={cn('relative overflow-hidden bg-background', className)}
          {...props}
        >
          {dotGrid}
          <div className="relative z-10">{children}</div>
        </div>
      );
    }

    return (
      <div
        ref={setRefs}
        className={cn('relative overflow-hidden bg-background', className)}
        {...props}
      >
        <div aria-hidden="true" className="absolute inset-0 opacity-40">
          {dotGrid}
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: revealOpacity,
            maskImage,
            WebkitMaskImage: maskImage,
          }}
        >
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <pattern
                id={`${patternId}-bright`}
                width={dotSpacing}
                height={dotSpacing}
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx={dotSpacing / 2}
                  cy={dotSpacing / 2}
                  r={dotRadius + 0.25}
                  className="fill-brand/50"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId}-bright)`} />
          </svg>
        </motion.div>

        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);

HeroHighlight.displayName = 'HeroHighlight';

/**
 * Inline text highlight with a brand-colored bar that sweeps in from the left
 * when scrolled into view. Under `prefers-reduced-motion` the bar renders
 * fully visible with no scale animation.
 */
export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  ({ children, className, color = DEFAULT_HIGHLIGHT_COLOR }, ref) => {
    const localRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(localRef, { once: true, margin: '-60px' });
    const shouldReduceMotion = useReducedMotion();

    const setRefs = (node: HTMLSpanElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <span ref={setRefs} className={cn('relative inline-block px-1', className)}>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-sm"
          style={{ background: color, transformOrigin: 'left center' }}
          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
          animate={{ scaleX: isInView || shouldReduceMotion ? 1 : 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : DURATION.complex,
            ease: EASE_OUT,
          }}
        />
        <span className="relative text-foreground">{children}</span>
      </span>
    );
  },
);

Highlight.displayName = 'Highlight';
