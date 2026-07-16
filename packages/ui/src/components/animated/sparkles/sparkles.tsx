'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { seededUnit } from '../../../lib/random';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface SparklesSizeRange {
  min?: number;
  max?: number;
}

export interface SparklesProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to decorate — sparkles render in an overlay above the background. */
  children?: ReactNode;
  /** Maximum concurrent sparkle particles. */
  density?: number;
  /** Pixel size range for each sparkle star. */
  size?: SparklesSizeRange;
  /** Sparkle fill color — defaults to neutral foreground-alpha. */
  color?: string;
  /** Lifecycle duration for each sparkle in milliseconds. */
  sparkleDuration?: number;
}

interface SparkleParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const DEFAULT_COLOR = 'color-mix(in oklab, var(--color-foreground) 55%, transparent)';

const STATIC_SPARKLES: Omit<SparkleParticle, 'id'>[] = [
  { x: 18, y: 22, size: 8, rotation: 12 },
  { x: 72, y: 35, size: 6, rotation: -8 },
  { x: 45, y: 68, size: 7, rotation: 20 },
  { x: 88, y: 78, size: 5, rotation: -15 },
];

function seededBetween(seed: number, min: number, max: number): number {
  return min + seededUnit(seed) * (max - min);
}

interface SparkleStarProps {
  color: string;
  size: number;
  duration: number;
  rotation: number;
  onComplete: () => void;
}

function SparkleStar({ color, size, duration, rotation, onComplete }: SparkleStarProps) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        width: size,
        height: size,
        color,
      }}
      initial={{ scale: 0, opacity: 0, rotate: rotation - 20 }}
      animate={{
        scale: [0, 1, 0.85, 0],
        opacity: [0, 0.9, 0.7, 0],
        rotate: [rotation - 20, rotation + 15, rotation],
      }}
      transition={{
        duration: duration / 1000,
        ease: 'easeInOut',
      }}
      onAnimationComplete={onComplete}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    </motion.span>
  );
}

function StaticSparkleStar({
  color,
  size,
  x,
  y,
  rotation,
}: SparkleParticle & { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute opacity-30"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        color,
        rotate: `${rotation}deg`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
      </svg>
    </span>
  );
}

/**
 * Ambient twinkling sparkle particles over content. Maintains a pool of
 * short-lived stars at random positions. Under `prefers-reduced-motion` only
 * children render, plus a few static faint stars when no children are passed.
 */
export const Sparkles = forwardRef<HTMLDivElement, SparklesProps>(
  (
    {
      children,
      className,
      density = 16,
      size,
      color = DEFAULT_COLOR,
      sparkleDuration = 1900,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const reactId = useId();
    const idCounter = useRef(0);
    const [particles, setParticles] = useState<SparkleParticle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isViewportActive = useViewportActive(containerRef);

    const minSize = size?.min ?? 6;
    const maxSize = size?.max ?? 12;

    const removeParticle = useCallback((id: string) => {
      setParticles((current) => current.filter((particle) => particle.id !== id));
    }, []);

    useEffect(() => {
      if (shouldReduceMotion || !isViewportActive) return;

      const intervalMs = Math.max(140, sparkleDuration / density);
      const intervalId = window.setInterval(() => {
        setParticles((current) => {
          if (current.length >= density) return current;

          const seed = idCounter.current;
          idCounter.current += 1;
          const id = `${reactId}-${seed}`;

          const particle: SparkleParticle = {
            id,
            x: seededBetween(seed + 1, 4, 96),
            y: seededBetween(seed + 501, 4, 96),
            size: seededBetween(seed + 1001, minSize, maxSize),
            rotation: seededBetween(seed + 1501, -25, 25),
          };

          return [...current, particle];
        });
      }, intervalMs);

      return () => window.clearInterval(intervalId);
    }, [density, isViewportActive, maxSize, minSize, reactId, shouldReduceMotion, sparkleDuration]);

    const showStaticLayer = shouldReduceMotion && !children;

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('relative', className)}
        {...props}
      >
        {!shouldReduceMotion ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {particles.map((particle) => (
              <span
                key={particle.id}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  translate: '-50% -50%',
                }}
              >
                <SparkleStar
                  color={color}
                  size={particle.size}
                  duration={sparkleDuration}
                  rotation={particle.rotation}
                  onComplete={() => removeParticle(particle.id)}
                />
              </span>
            ))}
          </div>
        ) : showStaticLayer ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {STATIC_SPARKLES.map((sparkle, index) => (
              <StaticSparkleStar
                key={`static-${index}`}
                id={`static-${index}`}
                color={color}
                {...sparkle}
              />
            ))}
          </div>
        ) : null}

        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    );
  },
);

Sparkles.displayName = 'Sparkles';
