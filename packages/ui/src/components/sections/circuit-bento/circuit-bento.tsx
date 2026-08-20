'use client';

import {
  forwardRef,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type SVGAttributes,
} from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../../foundation/card';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';
import { CircuitTraces, CPU_BOUNDS, CIRCUIT_VIEWBOX } from './circuit-traces';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export interface CircuitBentoItem {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
}

export interface CircuitBentoProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  hubLabel?: string;
  items?: CircuitBentoItem[];
  /** Tighter type and padding for gallery / compact frames. */
  isCompact?: boolean;
}

function ReactMark(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth={1.5} />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth={1.5}
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth={1.5}
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function PackMark(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5v-9Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M12 4v16M4 7.5l8 3.5 8-3.5" stroke="currentColor" strokeWidth={1.5} />
    </svg>
  );
}

function CompilerMark(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalArrow(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <path
        d="M5.75 2H5v1.5h6.44L2.22 12.72l-.53.53 1.06 1.06.53-.53 9.22-9.22V11H14V3a1 1 0 0 0-1-1z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

const DEFAULT_ICONS = [ReactMark, PackMark, CompilerMark] as const;

export const defaultCircuitItems: CircuitBentoItem[] = [
  {
    title: 'React',
    description:
      'The library for web and native user interfaces — Server Components, Actions, and a single component model.',
    href: 'https://react.dev',
  },
  {
    title: 'Motion',
    description:
      'Production-grade animation for React: springs, layout transitions, and reduced-motion fallbacks built in.',
    href: 'https://motion.dev',
  },
  {
    title: 'Tailwind CSS',
    description:
      'Utility-first styling that maps onto design tokens — the same language every Varient component is written in.',
    href: 'https://tailwindcss.com',
  },
];

const DEFAULT_TITLE = (
  <>
    Built on a foundation of fast,{' '}
    <span className="text-brand">production-grade</span> tooling
  </>
);

function CpuPins({
  side,
  count,
}: {
  side: 'top' | 'bottom' | 'left' | 'right';
  count: number;
}) {
  const isVertical = side === 'left' || side === 'right';

  return (
    <div
      aria-hidden
      className={cn(
        'absolute flex',
        isVertical ? 'flex-col gap-3' : 'flex-row gap-1.5',
        side === 'top' && 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
        side === 'bottom' && 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
        side === 'left' && 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
        side === 'right' && 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={`${side}-${index}`}
          className={cn('rounded-sm bg-border', isVertical ? 'h-1.5 w-3' : 'h-3 w-1.5')}
        />
      ))}
    </div>
  );
}

function CpuHub({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center rounded-lg border border-border bg-card"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 rounded-t-lg bg-gradient-to-b from-foreground/10 to-transparent" />
      <CpuPins side="top" count={6} />
      <CpuPins side="bottom" count={6} />
      <CpuPins side="left" count={2} />
      <CpuPins side="right" count={2} />
      <span className="relative px-2 text-center text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}

function ToolCard({
  item,
  index,
  isCompact,
  shouldReduceMotion,
}: {
  item: CircuitBentoItem;
  index: number;
  isCompact: boolean;
  shouldReduceMotion: boolean;
}) {
  const Icon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
  const icon = item.icon ?? <Icon className="size-8 text-foreground" />;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: EASE_OUT, delay: index * 0.06 },
        viewport: { once: true, amount: 0.2 } as const,
      };

  const card = (
    <Card isHoverable className={cn('h-full', isCompact ? 'gap-2 p-3' : 'gap-3 p-4 sm:p-6')}>
      <div className="text-foreground">{icon}</div>
      <div className={cn('flex min-w-0 flex-col', isCompact ? 'gap-1' : 'gap-1.5')}>
        <span className="flex items-center gap-1 text-sm font-semibold tracking-tight text-foreground">
          <span className="line-clamp-1">{item.title}</span>
          {item.href ? (
            <ExternalArrow className="size-4 shrink-0 text-muted-foreground" />
          ) : null}
        </span>
        <p
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            isCompact ? 'line-clamp-2' : 'line-clamp-3',
          )}
        >
          {item.description}
        </p>
      </div>
    </Card>
  );

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title} — ${item.description}`}
        className={cn('block h-full rounded-xl', FOCUS_RING)}
        {...motionProps}
      >
        {card}
      </motion.a>
    );
  }

  return (
    <motion.article className="h-full" {...motionProps}>
      {card}
    </motion.article>
  );
}

/**
 * Marketing section: a CPU hub fed by animated orthogonal traces, with a
 * three-up row of tooling cards. Pulses respect reduced motion and pause
 * while the traces are offscreen.
 */
export const CircuitBento = forwardRef<HTMLElement, CircuitBentoProps>(
  (
    {
      className,
      title = DEFAULT_TITLE,
      hubLabel = 'Powered By',
      items = defaultCircuitItems,
      isCompact = false,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const headingId = useId();

    const headerMotion = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE_OUT },
          viewport: { once: true, amount: 0.4 } as const,
        };

    const cpuLeft = `${(CPU_BOUNDS.x / CIRCUIT_VIEWBOX.width) * 100}%`;
    const cpuTop = `${(CPU_BOUNDS.y / CIRCUIT_VIEWBOX.height) * 100}%`;
    const cpuWidth = `${(CPU_BOUNDS.width / CIRCUIT_VIEWBOX.width) * 100}%`;
    const cpuHeight = `${(CPU_BOUNDS.height / CIRCUIT_VIEWBOX.height) * 100}%`;

    return (
      <section
        ref={ref}
        className={cn(
          'w-full bg-background',
          isCompact ? 'px-4 py-6' : 'px-6 py-16 md:px-8 md:py-24',
          className,
        )}
        aria-labelledby={headingId}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          <motion.h2
            id={headingId}
            className={cn(
              'max-w-3xl text-center font-display font-semibold tracking-tight text-balance text-foreground',
              isCompact ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl lg:text-4xl',
            )}
            {...headerMotion}
          >
            {title}
          </motion.h2>

          <div
            className={cn(
              'relative hidden w-full md:block',
              isCompact ? 'mx-auto mt-6 max-w-3xl' : 'mt-8 md:mt-12',
            )}
          >
            <CircuitTraces />
            <div
              className="absolute z-10"
              style={{
                left: cpuLeft,
                top: cpuTop,
                width: cpuWidth,
                height: cpuHeight,
              }}
            >
              <CpuHub label={hubLabel} />
            </div>
          </div>

          <div className="mt-8 flex w-40 flex-col items-center md:hidden">
            <div className="h-24 w-full">
              <CpuHub label={hubLabel} />
            </div>
          </div>

          {items.length > 0 ? (
            <div
              className={cn(
                'relative z-10 grid w-full grid-cols-1 items-stretch md:grid-cols-3',
                isCompact ? 'mt-6 gap-3' : 'mt-4 gap-4 md:-mt-4 md:gap-6 lg:gap-8',
              )}
            >
              {items.map((item, index) => (
                <ToolCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  isCompact={isCompact}
                  shouldReduceMotion={!!shouldReduceMotion}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    );
  },
);

CircuitBento.displayName = 'CircuitBento';
