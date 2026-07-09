'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface ParticlesProps extends HTMLAttributes<HTMLCanvasElement> {
  /** Number of particles to render. */
  quantity?: number;
  /** Particle fill color — defaults to foreground at low alpha. */
  color?: string;
  /** Particle radius in CSS pixels. */
  size?: number;
  /** Mouse influence strength (higher = stronger repel/attract). */
  ease?: number;
  /** How quickly particles return after mouse influence (higher = more static). */
  staticity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

function seededUnit(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function resolveDefaultColor(element: HTMLElement): string {
  const foreground = getComputedStyle(element)
    .getPropertyValue('--color-foreground')
    .trim();
  const base = foreground || 'currentColor';
  return `color-mix(in oklab, ${base} 35%, transparent)`;
}

function createParticles(
  width: number,
  height: number,
  quantity: number,
  size: number,
): Particle[] {
  return Array.from({ length: quantity }, (_, index) => ({
    x: seededUnit(index + 1) * width,
    y: seededUnit(index + 51) * height,
    vx: (seededUnit(index + 151) - 0.5) * 0.35,
    vy: (seededUnit(index + 251) - 0.5) * 0.35,
    size: size * (0.6 + seededUnit(index + 101) * 0.8),
    alpha: 0.25 + seededUnit(index + 201) * 0.55,
  }));
}

/**
 * Interactive floating particle field rendered on a canvas layer.
 * Meant to sit inside a `relative overflow-hidden` container as an absolute
 * inset overlay. Under `prefers-reduced-motion`, draws static scattered dots
 * once with no animation loop.
 */
export const Particles = forwardRef<HTMLCanvasElement, ParticlesProps>(
  (
    {
      className,
      quantity = 60,
      color,
      size = 1.5,
      ease = 50,
      staticity = 50,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const particlesRef = useRef<Particle[]>([]);
    const pointerRef = useRef({ x: 0, y: 0, active: false });
    const colorRef = useRef<string | undefined>(color);
    const frameRef = useRef<number | null>(null);

    const mergeRef = useCallback(
      (node: HTMLCanvasElement | null) => {
        canvasRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      colorRef.current = color;
    }, [color]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      let resolvedColor = color ?? resolveDefaultColor(parent);

      const resizeCanvas = () => {
        const rect = parent.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        particlesRef.current = createParticles(rect.width, rect.height, quantity, size);
        if (!color) {
          resolvedColor = resolveDefaultColor(parent);
        }
      };

      const drawStatic = () => {
        const rect = parent.getBoundingClientRect();
        context.clearRect(0, 0, rect.width, rect.height);
        for (const particle of particlesRef.current) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = resolvedColor;
          context.globalAlpha = particle.alpha;
          context.fill();
        }
        context.globalAlpha = 1;
      };

      const drawFrame = () => {
        const rect = parent.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const damping = 1 - 1 / Math.max(1, staticity);

        context.clearRect(0, 0, width, height);

        for (const particle of particlesRef.current) {
          if (pointerRef.current.active) {
            const deltaX = particle.x - pointerRef.current.x;
            const deltaY = particle.y - pointerRef.current.y;
            const distance = Math.hypot(deltaX, deltaY);
            const force = ease / Math.max(distance, 32);

            particle.vx += (deltaX / (distance || 1)) * force * 0.6;
            particle.vy += (deltaY / (distance || 1)) * force * 0.6;
          }

          particle.vx *= damping;
          particle.vy *= damping;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -particle.size) particle.x = width + particle.size;
          if (particle.x > width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = height + particle.size;
          if (particle.y > height + particle.size) particle.y = -particle.size;

          const edgeProximity = [
            particle.x - particle.size,
            width - particle.x - particle.size,
            particle.y - particle.size,
            height - particle.y - particle.size,
          ];
          const closestEdge = Math.min(...edgeProximity);
          const edgeAlpha = Math.max(0, Math.min(1, closestEdge / 20));

          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fillStyle = resolvedColor;
          context.globalAlpha = particle.alpha * edgeAlpha;
          context.fill();
        }

        context.globalAlpha = 1;
        frameRef.current = window.requestAnimationFrame(drawFrame);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const rect = parent.getBoundingClientRect();
        pointerRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          active: true,
        };
      };

      const handlePointerLeave = () => {
        pointerRef.current.active = false;
      };

      resizeCanvas();
      drawStatic();

      const resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        if (shouldReduceMotion) {
          drawStatic();
        }
      });
      resizeObserver.observe(parent);

      if (!shouldReduceMotion) {
        parent.addEventListener('pointermove', handlePointerMove);
        parent.addEventListener('pointerleave', handlePointerLeave);
        frameRef.current = window.requestAnimationFrame(drawFrame);
      }

      return () => {
        resizeObserver.disconnect();
        parent.removeEventListener('pointermove', handlePointerMove);
        parent.removeEventListener('pointerleave', handlePointerLeave);
        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
        }
      };
    }, [shouldReduceMotion, quantity, color, size, ease, staticity]);

    return (
      <canvas
        ref={mergeRef}
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0', className)}
        {...props}
      />
    );
  },
);

Particles.displayName = 'Particles';
