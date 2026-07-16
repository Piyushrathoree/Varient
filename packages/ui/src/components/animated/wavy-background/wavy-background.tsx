'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export type WavyBackgroundSpeed = 'slow' | 'fast';

export interface WavyBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /** Stroke colors for each wave layer — defaults to neutral foreground-alpha washes. */
  colors?: string[];
  /** Approximate vertical spacing between wave crests in pixels. */
  waveWidth?: number;
  /** Canvas blur applied to wave strokes. */
  blur?: number;
  /** Phase drift speed — slow is calmer, fast is more lively. */
  speed?: WavyBackgroundSpeed;
  /** Global opacity multiplier for wave strokes (0–1). */
  waveOpacity?: number;
  /** Classes applied to the outer container. */
  containerClassName?: string;
}

const DEFAULT_COLORS = [
  'color-mix(in oklab, var(--color-foreground) 16%, transparent)',
  'color-mix(in oklab, var(--color-muted-foreground) 12%, transparent)',
  'color-mix(in oklab, var(--color-foreground) 10%, transparent)',
  'color-mix(in oklab, var(--color-muted-foreground) 8%, transparent)',
  'color-mix(in oklab, var(--color-brand) 5%, transparent)',
] as const;

const SPEED_FACTOR: Record<WavyBackgroundSpeed, number> = {
  slow: 0.012,
  fast: 0.028,
};

interface WaveLayer {
  amplitude: number;
  frequency: number;
  phaseOffset: number;
  yOffset: number;
}

const WAVE_LAYERS: WaveLayer[] = [
  { amplitude: 18, frequency: 0.008, phaseOffset: 0, yOffset: 0.35 },
  { amplitude: 14, frequency: 0.012, phaseOffset: 1.2, yOffset: 0.5 },
  { amplitude: 22, frequency: 0.006, phaseOffset: 2.4, yOffset: 0.65 },
  { amplitude: 12, frequency: 0.015, phaseOffset: 0.8, yOffset: 0.45 },
  { amplitude: 16, frequency: 0.01, phaseOffset: 3.1, yOffset: 0.58 },
];

function drawWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  colors: string[],
  waveWidth: number,
  blur: number,
  waveOpacity: number,
  speed: WavyBackgroundSpeed,
): void {
  ctx.clearRect(0, 0, width, height);

  const phase = time * SPEED_FACTOR[speed];

  colors.forEach((color, index) => {
    const layer = WAVE_LAYERS[index % WAVE_LAYERS.length];
    const baseY = height * layer.yOffset;
    const strokeWidth = Math.max(1, waveWidth * 0.06);

    ctx.beginPath();

    for (let x = 0; x <= width; x += 2) {
      const y =
        baseY +
        Math.sin(x * layer.frequency + phase + layer.phaseOffset) * layer.amplitude +
        Math.sin(x * layer.frequency * 1.7 + phase * 0.6 + layer.phaseOffset) *
          (layer.amplitude * 0.35);

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.strokeStyle = color;

    // Soft-thick-stroke blur approximation: stroke the same path a couple of
    // extra times with a wider, fainter line before the crisp core stroke.
    // A real `ctx.filter = 'blur()'` re-rasterizes the whole layer every
    // frame (expensive); layered strokes reuse the already-built path and
    // cost only a couple of extra `stroke()` calls.
    if (blur > 0) {
      const softPasses = 2;
      for (let pass = softPasses; pass >= 1; pass -= 1) {
        ctx.lineWidth = strokeWidth + blur * (pass / softPasses) * 1.2;
        ctx.globalAlpha = (waveOpacity * 0.22) / pass;
        ctx.stroke();
      }
    }

    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = waveOpacity;
    ctx.stroke();
  });

  ctx.globalAlpha = 1;
}

/**
 * Undulating sine-wave canvas backdrop. Layers several softly blurred strokes
 * that drift via requestAnimationFrame. The loop pauses while the component
 * is scrolled offscreen and under `prefers-reduced-motion` only a single
 * static frame is drawn.
 */
export const WavyBackground = forwardRef<HTMLDivElement, WavyBackgroundProps>(
  (
    {
      children,
      className,
      containerClassName,
      colors = [...DEFAULT_COLORS],
      waveWidth = 50,
      blur = 10,
      speed = 'slow',
      waveOpacity = 0.5,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const frameRef = useRef<number | null>(null);
    const elapsedRef = useRef<number>(0);
    const isViewportActive = useViewportActive(containerRef);

    const paint = useCallback(
      (time: number) => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawWaves(ctx, width, height, time, colors, waveWidth, blur, waveOpacity, speed);
      },
      [blur, colors, speed, waveOpacity, waveWidth],
    );

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Reduced motion: paint one static frame, keep it in sync with
      // container resizes, never start the loop.
      if (shouldReduceMotion) {
        paint(elapsedRef.current);
        const handleResize = () => paint(elapsedRef.current);
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
      }

      // Offscreen: leave the last painted frame on the canvas and don't
      // burn CPU animating something nobody can see.
      if (!isViewportActive) return;

      let frameStart = performance.now();

      const renderFrame = (now: number) => {
        elapsedRef.current += (now - frameStart) / 1000;
        frameStart = now;
        paint(elapsedRef.current);
        frameRef.current = requestAnimationFrame(renderFrame);
      };

      frameRef.current = requestAnimationFrame(renderFrame);

      const handleResize = () => paint(elapsedRef.current);
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      return () => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        resizeObserver.disconnect();
      };
    }, [paint, shouldReduceMotion, isViewportActive]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn('relative overflow-hidden bg-background', containerClassName, className)}
        {...props}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    );
  },
);

WavyBackground.displayName = 'WavyBackground';
