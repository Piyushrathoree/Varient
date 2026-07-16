'use client';

import {
  forwardRef,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion, type MotionStyle } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Content rendered above the aurora layer. */
  children?: ReactNode;
  /** When true, a radial mask fades the aurora toward the center and bottom. */
  showRadialGradient?: boolean;
  /** Blob fill colors — defaults to neutral foreground-alpha washes with a faint ember hint. */
  colors?: readonly string[];
  /**
   * Scales blob opacity and size, from 0 (barely there) to 1 (full presence).
   * Clamped to [0, 1]. Defaults to 1.
   */
  intensity?: number;
}

interface AuroraBlobConfig {
  id: string;
  className: string;
  style: MotionStyle;
  animate: { x: number[]; y: number[]; rotate: number[] };
  transition: { duration: number; repeat: number; ease: 'linear' };
}

const DEFAULT_COLORS = [
  'color-mix(in oklab, var(--color-foreground) 6%, transparent)',
  'color-mix(in oklab, var(--color-muted-foreground) 5%, transparent)',
  'color-mix(in oklab, var(--color-foreground) 4%, transparent)',
  'color-mix(in oklab, var(--color-brand) 3%, transparent)',
] as const;

const BLOB_LAYOUTS = [
  {
    id: 'aurora-a',
    className: 'left-[-15%] top-[-20%] h-[55%] w-[45%]',
    animate: { x: [0, 40, -20, 0], y: [0, 30, -15, 0], rotate: [0, 8, -4, 0] },
    transition: { duration: 32, repeat: Infinity, ease: 'linear' as const },
  },
  {
    id: 'aurora-b',
    className: 'right-[-10%] top-[-10%] h-[50%] w-[40%]',
    animate: { x: [0, -35, 25, 0], y: [0, 20, 35, 0], rotate: [0, -6, 10, 0] },
    transition: { duration: 28, repeat: Infinity, ease: 'linear' as const },
  },
  {
    id: 'aurora-c',
    className: 'bottom-[-25%] left-[10%] h-[60%] w-[50%]',
    animate: { x: [0, 30, -30, 0], y: [0, -25, 15, 0], rotate: [0, 5, -8, 0] },
    transition: { duration: 36, repeat: Infinity, ease: 'linear' as const },
  },
  {
    id: 'aurora-d',
    className: 'bottom-[-15%] right-[5%] h-[45%] w-[35%]',
    animate: { x: [0, -20, 35, 0], y: [0, -15, -25, 0], rotate: [0, -10, 6, 0] },
    transition: { duration: 24, repeat: Infinity, ease: 'linear' as const },
  },
] as const;

const STATIC_GRADIENT_ANCHORS = [
  { ellipse: 'ellipse 80% 60% at 50% 0%', stop: 70 },
  { ellipse: 'ellipse 60% 50% at 80% 100%', stop: 65 },
  { ellipse: 'ellipse 50% 40% at 10% 80%', stop: 60 },
] as const;

function buildStaticGradient(colors: readonly string[]): string {
  return STATIC_GRADIENT_ANCHORS.map((anchor, index) => {
    const color = colors[index % colors.length];
    return `radial-gradient(${anchor.ellipse}, ${color}, transparent ${anchor.stop}%)`;
  }).join(', ');
}

function buildAnimatedBlobs(colors: readonly string[], intensity: number): AuroraBlobConfig[] {
  const opacity = 0.25 + 0.75 * intensity;
  const scale = 0.75 + 0.25 * intensity;
  return BLOB_LAYOUTS.map((layout, index) => ({
    id: layout.id,
    className: layout.className,
    transition: layout.transition,
    animate: {
      x: [...layout.animate.x],
      y: [...layout.animate.y],
      rotate: [...layout.animate.rotate],
    },
    style: {
      background: colors[index % colors.length],
      opacity,
      scale,
    },
  }));
}

/**
 * Slow-drifting gradient mesh backdrop with optional radial fade. Children
 * render above the effect. Under `prefers-reduced-motion` the blobs become a
 * static gradient wash.
 */
export const AuroraBackground = forwardRef<HTMLDivElement, AuroraBackgroundProps>(
  (
    {
      className,
      children,
      showRadialGradient = true,
      colors = DEFAULT_COLORS,
      intensity = 1,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const isViewportActive = useViewportActive(containerRef);
    const resolvedColors = colors.length > 0 ? colors : DEFAULT_COLORS;
    const resolvedIntensity = Math.min(1, Math.max(0, intensity));
    const staticGradient = useMemo(
      () => buildStaticGradient(resolvedColors),
      [resolvedColors],
    );
    const animatedBlobs = useMemo(
      () => buildAnimatedBlobs(resolvedColors, resolvedIntensity),
      [resolvedColors, resolvedIntensity],
    );

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('relative overflow-hidden bg-background', className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0',
            showRadialGradient &&
              '[mask-image:radial-gradient(ellipse_at_50%_80%,transparent_20%,black_75%)]',
          )}
        >
          {shouldReduceMotion ? (
            <div
              className="absolute inset-0 opacity-80"
              style={{ background: staticGradient }}
            />
          ) : (
            <>
              {animatedBlobs.map((blob) => (
                <motion.div
                  key={blob.id}
                  aria-hidden="true"
                  className={cn(
                    'absolute rounded-full blur-3xl will-change-transform',
                    blob.className,
                  )}
                  style={blob.style}
                  animate={isViewportActive ? blob.animate : undefined}
                  transition={blob.transition}
                />
              ))}
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: staticGradient }}
              />
            </>
          )}
        </div>

        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    );
  },
);

AuroraBackground.displayName = 'AuroraBackground';
