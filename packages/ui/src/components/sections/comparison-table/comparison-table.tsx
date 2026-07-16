'use client';

import { Fragment, forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';
import { Button } from '../../foundation/button';

export interface ComparisonPlan {
  name: string;
  price?: string;
  isHighlighted?: boolean;
  cta?: {
    label: string;
    href?: string;
  };
}

export interface ComparisonRow {
  feature: string;
  category?: string;
  values: (boolean | string)[];
}

export interface ComparisonTableProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  plans?: ComparisonPlan[];
  rows?: ComparisonRow[];
  /** Optional footnote or legend rendered below the table (e.g. asterisk explanations). */
  footnote?: ReactNode;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="inline-flex items-center justify-center">
        <CheckIcon className="size-4 text-success" />
        <span className="sr-only">Included</span>
      </span>
    ) : (
      <span className="inline-flex items-center justify-center">
        <CrossIcon className="size-4 text-muted-foreground/50" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  return <span className="text-sm text-foreground">{value}</span>;
}

export const defaultComparisonPlans: ComparisonPlan[] = [
  {
    name: 'Starter',
    price: 'Free',
    cta: { label: 'Get started' },
  },
  {
    name: 'Pro',
    price: '$29/mo',
    isHighlighted: true,
    cta: { label: 'Start trial' },
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cta: { label: 'Contact sales' },
  },
];

export const defaultComparisonRows: ComparisonRow[] = [
  {
    category: 'Core',
    feature: 'Foundation components',
    values: [true, true, true],
  },
  {
    feature: 'Animated layer',
    values: [false, true, true],
  },
  {
    feature: 'Section blocks',
    values: [false, true, true],
  },
  {
    category: 'Support',
    feature: 'Community support',
    values: [true, true, true],
  },
  {
    feature: 'Priority support',
    values: [false, true, true],
  },
  {
    feature: 'Dedicated account manager',
    values: [false, false, true],
  },
  {
    category: 'Limits',
    feature: 'Team members',
    values: ['1', '10', 'Unlimited'],
  },
  {
    feature: 'Projects',
    values: ['3', 'Unlimited', 'Unlimited'],
  },
];

export const ComparisonTable = forwardRef<HTMLElement, ComparisonTableProps>(
  (
    {
      className,
      eyebrow = 'Compare plans',
      title = (
        <>
          Pick the plan that{' '}
          <span className="text-brand">fits your team</span>
        </>
      ),
      description = 'See exactly what each tier includes before you commit.',
      plans = defaultComparisonPlans,
      rows = defaultComparisonRows,
      footnote,
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

    let lastCategory: string | undefined;

    return (
      <section
        ref={ref}
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        aria-labelledby={headingId}
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id={headingId}
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-10 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th
                  scope="col"
                  className="px-4 py-4 text-left text-sm font-medium text-muted-foreground"
                >
                  Features
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className={cn(
                      'px-4 py-4 text-center',
                      plan.isHighlighted && 'border-t-2 border-t-brand bg-brand/5',
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-semibold text-foreground">{plan.name}</span>
                      {plan.price && (
                        <span className="text-xs text-muted-foreground">{plan.price}</span>
                      )}
                      {plan.cta && (
                        <Button
                          variant={plan.isHighlighted ? 'primary' : 'outline'}
                          size="sm"
                          className="mt-2"
                          {...(plan.cta.href
                            ? { asChild: true }
                            : { type: 'button' as const })}
                        >
                          {plan.cta.href ? (
                            <a href={plan.cta.href}>{plan.cta.label}</a>
                          ) : (
                            plan.cta.label
                          )}
                        </Button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => {
                const showCategory = row.category && row.category !== lastCategory;
                if (showCategory) {
                  lastCategory = row.category;
                }

                return (
                  <Fragment key={`${row.feature}-${rowIndex}`}>
                    {showCategory && (
                      <tr className="bg-muted/30">
                        <td
                          colSpan={plans.length + 1}
                          className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                        >
                          {row.category}
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-border last:border-b-0">
                      <th
                        scope="row"
                        className="px-4 py-3 text-left text-sm font-medium text-foreground"
                      >
                        {row.feature}
                      </th>
                      {row.values.map((value, colIndex) => {
                        const plan = plans[colIndex];
                        return (
                          <td
                            key={`${row.feature}-${colIndex}`}
                            className={cn(
                              'px-4 py-3 text-center',
                              plan?.isHighlighted && 'bg-brand/5',
                            )}
                          >
                            <FeatureValue value={value} />
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {footnote && (
          <p className="mt-4 text-xs text-muted-foreground">{footnote}</p>
        )}
      </section>
    );
  },
);

ComparisonTable.displayName = 'ComparisonTable';
