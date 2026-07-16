'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type SVGAttributes,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION } from '../../../lib/animation';
import { useViewportActive } from '../../../lib/use-viewport-active';

/** Hard cap on concurrently animated dots — large canvases sample instead of
 * spawning a spring per grid cell (a hero-sized surface can hold thousands). */
const MAX_ANIMATED_DOTS = 140;

export interface DotPatternProps extends SVGAttributes<SVGSVGElement> {
  /** Spacing between dot centers in pixels. */
  size?: number;
  /** Dot radius in pixels. */
  radius?: number;
  /** Horizontal pattern offset. */
  offsetX?: number;
  /** Vertical pattern offset. */
  offsetY?: number;
  /** When true, dots pulse in a staggered wave. */
  isGlowing?: boolean;
  className?: string;
}

interface DotPosition {
  id: string;
  cx: number;
  cy: number;
  delay: number;
}

function buildDotPositions(
  width: number,
  height: number,
  spacing: number,
  offsetX: number,
  offsetY: number,
): DotPosition[] {
  if (width <= 0 || height <= 0) return [];

  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const dots: DotPosition[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      dots.push({
        id: `${col}-${row}`,
        cx: offsetX + col * spacing,
        cy: offsetY + row * spacing,
        delay: (col + row) * 0.04,
      });
    }
  }

  return dots;
}

/** Evenly samples at most `max` dots from the grid so animation cost stays
 * bounded regardless of canvas size. */
function sampleDots(dots: DotPosition[], max: number): DotPosition[] {
  if (dots.length <= max) return dots;
  const step = dots.length / max;
  const sampled: DotPosition[] = [];
  for (let i = 0; i < max; i += 1) {
    sampled.push(dots[Math.floor(i * step)]);
  }
  return sampled;
}

/**
 * Dot-grid background texture — the `.frame-box` aesthetic as a component.
 * Accepts `className` for radial masks (`[mask-image:radial-gradient(...)]`).
 * Optional staggered glow pulse; static under reduced motion.
 */
export const DotPattern = forwardRef<SVGSVGElement, DotPatternProps>(
  (
    {
      size = 16,
      radius = 1,
      offsetX = 0,
      offsetY = 0,
      isGlowing = false,
      className,
      ...props
    },
    ref,
  ) => {
    const patternId = useId();
    const containerRef = useRef<SVGSVGElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const glowEnabled = isGlowing && !shouldReduceMotion;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
      const node = containerRef.current;
      if (!node || !glowEnabled) return;

      const updateSize = () => {
        const rect = node.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      };

      updateSize();
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(node);
      return () => resizeObserver.disconnect();
    }, [glowEnabled]);

    const dotPositions = useMemo(
      () =>
        buildDotPositions(dimensions.width, dimensions.height, size, offsetX, offsetY),
      [dimensions.width, dimensions.height, size, offsetX, offsetY],
    );

    const animatedDots = useMemo(
      () => sampleDots(dotPositions, MAX_ANIMATED_DOTS),
      [dotPositions],
    );

    const isViewportActive = useViewportActive(containerRef);

    const setRefs = (node: SVGSVGElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    if (glowEnabled) {
      return (
        <svg
          ref={setRefs}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full',
            className,
          )}
          {...props}
        >
          <defs>
            <pattern
              id={patternId}
              width={size}
              height={size}
              patternUnits="userSpaceOnUse"
              x={offsetX}
              y={offsetY}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="fill-muted-foreground/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          {animatedDots.map((dot) => (
            <motion.circle
              key={dot.id}
              cx={dot.cx}
              cy={dot.cy}
              r={radius}
              className="fill-muted-foreground/20"
              initial={{ opacity: 0.25 }}
              animate={
                isViewportActive
                  ? { opacity: [0.25, 0.65, 0.25] }
                  : { opacity: 0.25 }
              }
              transition={{
                duration: DURATION.slow * 2.5,
                delay: dot.delay,
                repeat: isViewportActive ? Infinity : 0,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      );
    }

    return (
      <svg
        ref={setRefs}
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full',
          className,
        )}
        {...props}
      >
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            x={offsetX}
            y={offsetY}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              className="fill-muted-foreground/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );
  },
);

DotPattern.displayName = 'DotPattern';
