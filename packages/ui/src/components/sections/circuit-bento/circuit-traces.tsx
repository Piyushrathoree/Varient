'use client';

import { useEffect, useId, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export const CIRCUIT_VIEWBOX = { width: 891, height: 264 } as const;

/** CPU body in viewBox units — traces dock on these edges. */
export const CPU_BOUNDS = { x: 349, y: 96, width: 198, height: 88 } as const;

type PulseKind = 'info' | 'brand' | 'warning';

interface PulseTrace {
  d: string;
  kind: PulseKind;
  duration: number;
  delay: number;
}

interface StaticTrace {
  d: string;
  fade?: 'up' | 'none';
}

const PULSE_TRACES: readonly PulseTrace[] = [
  {
    d: 'M547 130L822 130C824.209 130 826 131.791 826 134L826 264',
    kind: 'warning',
    duration: 5.2,
    delay: 0.15,
  },
  {
    d: 'M349 130L5.00002 130C2.79088 130 1.00001 131.791 1.00001 134L1.00001 264',
    kind: 'info',
    duration: 6,
    delay: 0.9,
  },
  {
    d: 'M547 150L633 150C635.209 150 637 151.791 637 154L637 236C637 238.209 635.209 240 633 240L488 240C485.791 240 484 241.791 484 244L484 264',
    kind: 'brand',
    duration: 5.6,
    delay: 1.4,
  },
  {
    d: 'M388 184L388 194C388 196.209 386.209 198 384 198L77 198C74.7909 198 73 199.791 73 202L73 264',
    kind: 'info',
    duration: 4.8,
    delay: 0.45,
  },
  {
    d: 'M412 263.5L412 184',
    kind: 'brand',
    duration: 4.2,
    delay: 1.8,
  },
  {
    d: 'M508 96L508 88C508 85.7909 509.791 84 512 84L886 84C888.209 84 890 85.7909 890 88L890 264',
    kind: 'warning',
    duration: 6.4,
    delay: 0.7,
  },
];

const STATIC_TRACES: readonly StaticTrace[] = [
  { d: 'M388 96L388 68C388 65.7909 386.209 64 384 64L310 64' },
  { d: 'M349 150L73 150C70.7909 150 69 151.791 69 154L69 174' },
  { d: 'M412 96L412 0', fade: 'up' },
  { d: 'M436 96L436 0', fade: 'up' },
  { d: 'M436 214L436 184' },
  { d: 'M460 96L460 64' },
  { d: 'M460 239L460 184' },
  { d: 'M484 96L484 24C484 21.7909 485.791 20 488 20L554 20', fade: 'up' },
  { d: 'M484 184L484 210C484 212.209 485.791 214 488 214L560 214' },
  { d: 'M508 184L508 193C508 195.209 509.791 197 512 197L560 197' },
];

const NODES: readonly { cx: number; cy: number }[] = [
  { cx: 460, cy: 64 },
  { cx: 308, cy: 64 },
  { cx: 69, cy: 173 },
  { cx: 436, cy: 214 },
  { cx: 460, cy: 240 },
  { cx: 560, cy: 214 },
  { cx: 560, cy: 197 },
];

const PULSE_COLORS: Record<PulseKind, { from: string; mid: string; to: string }> = {
  info: {
    from: 'var(--color-info)',
    mid: 'var(--color-info)',
    to: 'var(--color-info)',
  },
  brand: {
    from: 'var(--color-brand)',
    mid: 'var(--color-brand-300)',
    to: 'var(--color-info)',
  },
  warning: {
    from: 'var(--color-warning)',
    mid: 'var(--color-warning)',
    to: 'var(--color-warning)',
  },
};

const HAIRLINE = 'color-mix(in oklab, var(--color-foreground) 12%, transparent)';

function CircuitNode({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill="var(--color-background)" />
      <circle cx={cx} cy={cy} r={3.5} fill="none" stroke={HAIRLINE} />
    </g>
  );
}

function PulsePath({
  d,
  kind,
  duration,
  delay,
  gradientId,
  isAnimating,
}: PulseTrace & { gradientId: string; isAnimating: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const colors = PULSE_COLORS[kind];

  useEffect(() => {
    const path = pathRef.current;
    if (!path || !isAnimating) return;

    const length = path.getTotalLength();
    if (length === 0) return;

    const pulseLength = Math.max(length * 0.18, 28);

    const apply = (progress: number) => {
      const head = length * (1 - progress);
      const tail = Math.max(0, head - pulseLength);
      const headPoint = path.getPointAtLength(head);
      const tailPoint = path.getPointAtLength(tail);
      x1.set(tailPoint.x);
      y1.set(tailPoint.y);
      x2.set(headPoint.x);
      y2.set(headPoint.y);
    };

    apply(0);

    const controls = animate(0, 1, {
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
      onUpdate: apply,
    });

    return () => controls.stop();
  }, [delay, duration, isAnimating, x1, x2, y1, y2]);

  return (
    <g>
      <path ref={pathRef} d={d} fill="none" stroke={HAIRLINE} strokeWidth={1} />
      {isAnimating ? (
        <>
          <defs>
            <motion.linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            >
              <stop offset="0" stopColor={colors.from} stopOpacity={0} />
              <stop offset="0.08" stopColor={colors.from} />
              <stop offset="0.45" stopColor={colors.mid} />
              <stop offset="1" stopColor={colors.to} stopOpacity={0} />
            </motion.linearGradient>
          </defs>
          <path
            d={d}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeLinecap="round"
            strokeWidth={2}
          />
        </>
      ) : null}
    </g>
  );
}

export interface CircuitTracesProps {
  className?: string;
}

/**
 * Orthogonal PCB traces with traveling gradient pulses that dissolve into
 * the CPU hub. Pulses pause while offscreen and are omitted under
 * `prefers-reduced-motion`.
 */
export function CircuitTraces({ className }: CircuitTracesProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<SVGSVGElement>(null);
  const isViewportActive = useViewportActive(containerRef);
  const isAnimating = !shouldReduceMotion && isViewportActive;
  const baseId = useId().replace(/:/g, '');

  return (
    <svg
      ref={containerRef}
      role="img"
      aria-label="Circuit traces feeding a central processor, with colored pulses traveling along the paths."
      className={cn('pointer-events-none h-auto w-full text-foreground', className)}
      viewBox={`0 0 ${CIRCUIT_VIEWBOX.width} ${CIRCUIT_VIEWBOX.height}`}
      fill="none"
    >
      <defs>
        <linearGradient id={`${baseId}-fade-up`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-foreground)" stopOpacity={0} />
          <stop offset="1" stopColor="var(--color-foreground)" stopOpacity={0.12} />
        </linearGradient>
      </defs>

      {STATIC_TRACES.map((trace) => (
        <path
          key={trace.d}
          d={trace.d}
          fill="none"
          stroke={trace.fade === 'up' ? `url(#${baseId}-fade-up)` : HAIRLINE}
          strokeWidth={1}
        />
      ))}

      {PULSE_TRACES.map((trace, index) => (
        <PulsePath
          key={trace.d}
          {...trace}
          gradientId={`${baseId}-pulse-${index}`}
          isAnimating={isAnimating}
        />
      ))}

      {NODES.map((node) => (
        <CircuitNode key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} />
      ))}
    </svg>
  );
}
