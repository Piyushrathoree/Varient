'use client';

import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NumberTicker } from '../../animated/number-ticker';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';

export interface StatsBandStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimalPlaces?: number;
  /** Optional icon rendered above the value — inline SVG or any node, 20×20 recommended. */
  icon?: ReactNode;
}

export interface StatsBandProps extends HTMLAttributes<HTMLElement> {
  stats?: StatsBandStat[];
  title?: string;
  description?: string;
  /** Renders each stat inside a raised card surface instead of plain text on the section background. */
  isRaised?: boolean;
}

const DEFAULT_STATS: StatsBandStat[] = [
  { value: 75, suffix: '+', label: 'Components shipped' },
  { value: 12, suffix: 'k', label: 'Weekly copies' },
  { value: 100, suffix: '%', label: 'Open source' },
  { value: 25, label: 'Foundation primitives' },
];

export const StatsBand = forwardRef<HTMLElement, StatsBandProps>(
  (
    {
      className,
      stats = DEFAULT_STATS,
      title,
      description,
      isRaised = false,
      ...props
    },
    ref,
  ) => {
    const headingId = useId();
    const shouldReduceMotion = useReducedMotion();

    const headerMotion = shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.3, ease: EASE_OUT },
          viewport: { once: true, amount: 0.4 } as const,
        };

    return (
      <section
        ref={ref}
        aria-labelledby={title ? headingId : undefined}
        className={cn('w-full px-6 py-12 sm:px-8 sm:py-16', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl space-y-10">
          {(title || description) && (
            <motion.div
              className="mx-auto max-w-2xl space-y-2 text-center"
              {...headerMotion}
            >
              {title && (
                <h2
                  id={headingId}
                  className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground sm:text-base">
                  {description}
                </p>
              )}
            </motion.div>
          )}

          <div
            className={cn(
              'grid grid-cols-2 gap-8 lg:grid-cols-4',
              isRaised && 'gap-4',
            )}
            role="list"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-col items-center text-center',
                  isRaised
                    ? 'rounded-xl border border-border bg-card px-4 py-6 shadow-sm'
                    : index > 0 && 'lg:border-l lg:border-border lg:pl-8',
                )}
                role="listitem"
              >
                {stat.icon && (
                  <div
                    aria-hidden
                    className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand"
                  >
                    {stat.icon}
                  </div>
                )}
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  <NumberTicker
                    decimalPlaces={stat.decimalPlaces}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    value={stat.value}
                  />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

StatsBand.displayName = 'StatsBand';
