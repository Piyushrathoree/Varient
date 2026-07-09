'use client';

import { forwardRef, useId, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';

export interface BackgroundBeamsProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of curved beam paths drawn in the SVG layer. */
  pathCount?: number;
  /** Content rendered above the beam layer. */
  children?: ReactNode;
  /** Stroke color for animated gradient highlights. */
  accentColor?: string;
}

interface BeamPathConfig {
  id: string;
  d: string;
  duration: number;
  delay: number;
  opacity: number;
}

function buildBeamPaths(count: number): BeamPathConfig[] {
  const templates = [
    'M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875',
    'M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867',
    'M-400 -170C-400 -170 -280 240 120 360C520 480 640 820 640 820',
    'M-350 -210C-350 -210 -290 190 170 310C630 430 700 850 700 850',
    'M-420 -160C-420 -160 -330 250 100 380C530 510 660 800 660 800',
    'M-360 -200C-360 -200 -270 220 140 350C550 480 720 860 720 860',
    'M-390 -180C-390 -180 -300 230 130 370C560 510 670 830 670 830',
    'M-340 -220C-340 -220 -260 200 180 320C620 440 710 870 710 870',
  ] as const;

  return Array.from({ length: count }, (_, index) => {
    const template = templates[index % templates.length];
    const mirror = index % 2 === 1;
    const d = mirror
      ? template.replace(/M(-?\d+)/, (_, x: string) => `M${-Number(x) + 40}`)
      : template;

    return {
      id: `beam-${index}`,
      d,
      duration: 14 + (index % 4) * 3,
      delay: index * 0.8,
      opacity: 0.35 + (index % 3) * 0.1,
    };
  });
}

const STATIC_STROKE = 'color-mix(in oklab, var(--color-muted-foreground) 18%, transparent)';
const DEFAULT_ACCENT = 'var(--color-brand)';

/**
 * Full-bleed backdrop of thin curved SVG paths with animated gradient strokes
 * traveling along them. Children render above the effect. Under
 * `prefers-reduced-motion` paths are static and faint with no travel.
 */
export const BackgroundBeams = forwardRef<HTMLDivElement, BackgroundBeamsProps>(
  (
    {
      className,
      children,
      pathCount = 6,
      accentColor = DEFAULT_ACCENT,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const baseId = useId().replace(/:/g, '');
    const paths = useMemo(
      () => buildBeamPaths(Math.max(1, Math.min(pathCount, 12))),
      [pathCount],
    );

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden bg-background', className)}
        {...props}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {paths.map((path) => {
            const gradientId = `${baseId}-grad-${path.id}`;

            return (
              <g key={path.id}>
                <path
                  d={path.d}
                  fill="none"
                  stroke={STATIC_STROKE}
                  strokeOpacity={path.opacity}
                  strokeWidth={0.5}
                />
                {!shouldReduceMotion ? (
                  <>
                    <defs>
                      <motion.linearGradient
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                        initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
                        animate={{
                          x1: ['0%', '100%'],
                          x2: ['10%', '110%'],
                          y1: ['0%', '0%'],
                          y2: ['0%', '0%'],
                        }}
                        transition={{
                          duration: path.duration,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: path.delay,
                        }}
                      >
                        <stop offset="0%" stopColor="transparent" />
                        <stop
                          offset="50%"
                          stopColor={accentColor}
                          stopOpacity={0.85}
                        />
                        <stop offset="100%" stopColor="transparent" />
                      </motion.linearGradient>
                    </defs>
                    <motion.path
                      d={path.d}
                      fill="none"
                      stroke={`url(#${gradientId})`}
                      strokeWidth={0.5}
                      strokeOpacity={path.opacity + 0.25}
                      initial={{ pathLength: 0.3, pathOffset: 0 }}
                      animate={{ pathLength: 0.3, pathOffset: [0, 1] }}
                      transition={{
                        duration: path.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: path.delay,
                      }}
                    />
                  </>
                ) : null}
              </g>
            );
          })}
        </svg>

        {children ? <div className="relative z-10">{children}</div> : null}
      </div>
    );
  },
);

BackgroundBeams.displayName = 'BackgroundBeams';
