'use client';

import createGlobe, { type Globe as CobeGlobe, type Marker } from 'cobe';
import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { useViewportActive } from '../../../lib/use-viewport-active';

export interface GlobeMarker {
  location: [number, number];
  size: number;
}

export interface GlobeProps extends HTMLAttributes<HTMLDivElement> {
  /** Marker pins rendered on the globe surface. */
  markers?: GlobeMarker[];
  /** Allow drag-to-spin interaction. */
  isInteractive?: boolean;
  /** Auto-rotation speed in radians per frame (~0.003 is slow). */
  speed?: number;
}

/** Default city markers — SF, NYC, London, Tokyo, Sydney. */
export const DEFAULT_GLOBE_MARKERS: GlobeMarker[] = [
  { location: [37.7595, -122.4367], size: 0.04 },
  { location: [40.7128, -74.006], size: 0.05 },
  { location: [51.5074, -0.1278], size: 0.04 },
  { location: [35.6762, 139.6503], size: 0.05 },
  { location: [-33.8688, 151.2093], size: 0.04 },
];

// Canvas cannot read CSS variables — RGB triplets mirror semantic tokens:
// brand #ff5a1f (--color-brand), brand-light #ff7e44 (--color-brand-light),
// smooth-300 light base, smooth-400 dark base, smooth-50 / smooth-700 glows.
const GLOBE_COLORS = {
  light: {
    dark: 0,
    baseColor: [0.92, 0.92, 0.92] as [number, number, number],
    markerColor: [1, 0.353, 0.122] as [number, number, number],
    glowColor: [0.98, 0.98, 0.98] as [number, number, number],
  },
  dark: {
    dark: 1,
    baseColor: [0.28, 0.28, 0.28] as [number, number, number],
    markerColor: [1, 0.494, 0.267] as [number, number, number],
    glowColor: [0.38, 0.38, 0.38] as [number, number, number],
  },
} as const;

function getThemeColors() {
  if (typeof document === 'undefined') return GLOBE_COLORS.light;
  return document.documentElement.classList.contains('dark')
    ? GLOBE_COLORS.dark
    : GLOBE_COLORS.light;
}

/**
 * Rotating WebGL globe powered by cobe. Theme-aware colors, drag-to-spin when
 * interactive, and auto-rotation that pauses under reduced motion (drag still
 * works when interactive). Canvas is decorative (`aria-hidden`).
 */
export const Globe = forwardRef<HTMLDivElement, GlobeProps>(
  (
    {
      className,
      markers = DEFAULT_GLOBE_MARKERS,
      isInteractive = true,
      speed = 0.003,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const phiRef = useRef(0);
    const pointerRef = useRef<number | null>(null);
    const markersRef = useRef(markers);
    const speedRef = useRef(speed);
    const shouldReduceMotionRef = useRef(false);
    const shouldReduceMotion = useReducedMotion();
    const themeRef = useRef(getThemeColors());
    const frameIdRef = useRef(0);
    const isActiveRef = useRef(true);
    const resumeLoopRef = useRef<(() => void) | null>(null);
    const isViewportActive = useViewportActive(containerRef);

    markersRef.current = markers;
    speedRef.current = speed;
    shouldReduceMotionRef.current = shouldReduceMotion ?? false;
    isActiveRef.current = isViewportActive;

    const setRefs = (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const handlePointerDown = useCallback(
      (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (!isInteractive) return;
        pointerRef.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = 'grabbing';
      },
      [isInteractive],
    );

    const handlePointerUp = useCallback(
      (event: ReactPointerEvent<HTMLCanvasElement>) => {
        pointerRef.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        event.currentTarget.style.cursor = isInteractive ? 'grab' : 'default';
      },
      [isInteractive],
    );

    const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
      if (pointerRef.current === null) return;
      const delta = event.clientX - pointerRef.current;
      pointerRef.current = event.clientX;
      phiRef.current += delta * 0.005;
    }, []);

    // Theme reads happen once + on class changes, not on every rAF tick.
    useEffect(() => {
      if (typeof document === 'undefined') return;

      const syncTheme = () => {
        themeRef.current = getThemeColors();
      };

      syncTheme();

      const observer = new MutationObserver(syncTheme);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      let width = 0;
      let dimension = 0;
      let globe: CobeGlobe | null = null;

      const stopLoop = () => {
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current);
          frameIdRef.current = 0;
        }
      };

      const destroyGlobe = () => {
        stopLoop();
        globe?.destroy();
        globe = null;
      };

      const tick = () => {
        frameIdRef.current = 0;
        if (!globe) return;
        // Offscreen: stop scheduling frames until useViewportActive resumes us.
        if (!isActiveRef.current) return;

        if (pointerRef.current === null && !shouldReduceMotionRef.current) {
          phiRef.current += speedRef.current;
        }

        const theme = themeRef.current;
        globe.update({
          phi: phiRef.current,
          width: dimension,
          height: dimension,
          dark: theme.dark,
          baseColor: theme.baseColor,
          markerColor: theme.markerColor,
          glowColor: theme.glowColor,
          markers: markersRef.current as Marker[],
        });

        frameIdRef.current = requestAnimationFrame(tick);
      };

      const startLoop = () => {
        if (globe && !frameIdRef.current) {
          frameIdRef.current = requestAnimationFrame(tick);
        }
      };

      resumeLoopRef.current = startLoop;

      const initGlobe = (size: number) => {
        destroyGlobe();
        width = size;
        const theme = themeRef.current;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        dimension = Math.max(Math.floor(size * dpr), 1);

        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: dimension,
          height: dimension,
          phi: phiRef.current,
          theta: 0.25,
          dark: theme.dark,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: theme.baseColor,
          markerColor: theme.markerColor,
          glowColor: theme.glowColor,
          markers: markersRef.current as Marker[],
        });

        startLoop();
      };

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const nextWidth = Math.floor(entry.contentRect.width);
        if (nextWidth > 0 && nextWidth !== width) {
          initGlobe(nextWidth);
        }
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
        destroyGlobe();
        resumeLoopRef.current = null;
      };
    }, [shouldReduceMotion]);

    // Pause the rAF tick while offscreen; resume (without recreating the
    // globe or losing drag state) once back in — or near — the viewport.
    useEffect(() => {
      if (isViewportActive) {
        resumeLoopRef.current?.();
      } else if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = 0;
      }
    }, [isViewportActive]);

    return (
      <div
        ref={setRefs}
        className={cn('relative aspect-square w-full', className)}
        {...props}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className={cn(
            'h-full w-full contain-layout contain-paint contain-style',
            isInteractive && 'cursor-grab touch-none',
          )}
          onPointerDown={isInteractive ? handlePointerDown : undefined}
          onPointerUp={isInteractive ? handlePointerUp : undefined}
          onPointerLeave={isInteractive ? handlePointerUp : undefined}
          onPointerMove={isInteractive ? handlePointerMove : undefined}
        />
      </div>
    );
  },
);

Globe.displayName = 'Globe';
