'use client';

import {
  forwardRef,
  useId,
  useMemo,
  useRef,
  type MutableRefObject,
  type SVGAttributes,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { DURATION } from '../../../lib/animation';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface GridPatternProps extends SVGAttributes<SVGSVGElement> {
  /** Cell width in pixels. */
  width?: number;
  /** Cell height in pixels. */
  height?: number;
  /** Horizontal pattern offset. */
  x?: number;
  /** Vertical pattern offset. */
  y?: number;
  /** Optional dash array for grid strokes. */
  strokeDasharray?: string;
  /** Grid cells to highlight as `[col, row]` tuples. */
  squares?: [number, number][];
  /** When true (default), highlighted squares pulse in sequence or the grid pans slowly. */
  isAnimated?: boolean;
  /** When true, highlighted cells use a faint brand tint instead of neutral foreground-alpha. */
  isBrandTinted?: boolean;
  className?: string;
}

interface HighlightSquareProps {
  col: number;
  row: number;
  cellWidth: number;
  cellHeight: number;
  patternX: number;
  patternY: number;
  index: number;
  isAnimated: boolean;
  isBrandTinted: boolean;
}

function HighlightSquare({
  col,
  row,
  cellWidth,
  cellHeight,
  patternX,
  patternY,
  index,
  isAnimated,
  isBrandTinted,
}: HighlightSquareProps) {
  const x = patternX + col * cellWidth;
  const y = patternY + row * cellHeight;
  const highlightClassName = isBrandTinted
    ? 'fill-brand/10 stroke-brand/20'
    : 'fill-foreground/5 stroke-foreground/10';

  if (!isAnimated) {
    return (
      <rect
        x={x}
        y={y}
        width={cellWidth}
        height={cellHeight}
        className={highlightClassName}
        strokeWidth={1}
      />
    );
  }

  return (
    <motion.rect
      x={x}
      y={y}
      width={cellWidth}
      height={cellHeight}
      className={highlightClassName}
      strokeWidth={1}
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.15, 0.55, 0.15] }}
      transition={{
        duration: DURATION.slow * 2,
        delay: index * 0.35,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * SVG grid-line background texture. Sits `absolute inset-0` inside a
 * `relative overflow-hidden` parent. Highlighted cells can pulse in sequence;
 * without highlights the whole pattern pans slowly. Static under reduced motion.
 */
export const GridPattern = forwardRef<SVGSVGElement, GridPatternProps>(
  (
    {
      width: cellWidth = 40,
      height: cellHeight = 40,
      x: patternX = -1,
      y: patternY = -1,
      strokeDasharray,
      squares = [],
      isAnimated = true,
      isBrandTinted = false,
      className,
      ...props
    },
    ref,
  ) => {
    const patternId = useId();
    const shouldReduceMotion = useReducedMotion();
    const svgRef = useRef<SVGSVGElement | null>(null);
    const isViewportActive = useViewportActive(svgRef);
    const motionEnabled = isAnimated && !shouldReduceMotion && isViewportActive;
    const isPanMode = squares.length === 0;
    const panDuration = 28;

    const gridPath = useMemo(
      () => `M ${cellWidth} 0 L 0 0 0 ${cellHeight}`,
      [cellWidth, cellHeight],
    );

    return (
      <svg
        ref={(node) => {
          svgRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as MutableRefObject<SVGSVGElement | null>).current = node;
        }}
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full text-border',
          className,
        )}
        {...props}
      >
        <defs>
          <pattern
            id={patternId}
            width={cellWidth}
            height={cellHeight}
            patternUnits="userSpaceOnUse"
            x={patternX}
            y={patternY}
          >
            <path
              d={gridPath}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.35}
              strokeWidth={1}
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>

        {isPanMode && motionEnabled ? (
          // Panning translates a wrapping <g> (GPU-composited transform) instead of
          // rewriting the pattern's x/y attributes every frame, which would force a
          // layout recalculation of the whole tiled fill on each tick. The filled
          // rect bleeds 50% past the viewport on every side so the pan never reveals
          // a seam.
          <motion.g
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, -cellWidth, 0],
              y: [0, -cellHeight, 0],
            }}
            transition={{
              duration: panDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <rect x="-50%" y="-50%" width="200%" height="200%" fill={`url(#${patternId})`} />
          </motion.g>
        ) : (
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        )}

        {squares.map(([col, row], index) => (
          <HighlightSquare
            key={`${col}-${row}`}
            col={col}
            row={row}
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            patternX={patternX}
            patternY={patternY}
            index={index}
            isAnimated={motionEnabled}
            isBrandTinted={isBrandTinted}
          />
        ))}
      </svg>
    );
  },
);

GridPattern.displayName = 'GridPattern';
