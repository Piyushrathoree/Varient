import { forwardRef, useId, type HTMLAttributes } from 'react';
import { NumberTicker } from '../../animated/number-ticker';
import { cn } from '../../../lib/utils';

export interface StatsBandStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimalPlaces?: number;
}

export interface StatsBandProps extends HTMLAttributes<HTMLElement> {
  stats?: StatsBandStat[];
  title?: string;
  description?: string;
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
      ...props
    },
    ref,
  ) => {
    const headingId = useId();

    return (
      <section
        ref={ref}
        aria-labelledby={title ? headingId : undefined}
        className={cn('w-full px-6 py-12 sm:px-8 sm:py-16', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl space-y-10">
          {(title || description) && (
            <div className="mx-auto max-w-2xl space-y-2 text-center">
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
            </div>
          )}

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4" role="list">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  'flex flex-col items-center text-center',
                  index > 0 && 'lg:border-l lg:border-border lg:pl-8',
                )}
                role="listitem"
              >
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
