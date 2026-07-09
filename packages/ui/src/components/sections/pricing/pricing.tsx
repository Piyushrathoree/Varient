'use client';

import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '../../../lib/utils';
import { EASE_OUT } from '../../../lib/animation';
import { Badge } from '../../foundation/badge';
import { Button } from '../../foundation/button';
import { Card } from '../../foundation/card';
import { Switch } from '../../foundation/switch';

export type BillingPeriod = 'monthly' | 'annual';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | string;
  annualPrice: number | string;
  /** Suffix shown after the price, e.g. "/mo". */
  priceSuffix?: string;
  features: string[];
  ctaLabel?: string;
  /** Highlights the plan with a brand ring, badge, and primary CTA. */
  isPopular?: boolean;
}

export interface PricingProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  plans?: PricingPlan[];
  defaultBillingPeriod?: BillingPeriod;
  /** Shown beside the annual label when billing is toggled to annual. */
  annualSavingsLabel?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export const defaultPricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For side projects and early prototypes.',
    monthlyPrice: 0,
    annualPrice: 0,
    priceSuffix: '/mo',
    ctaLabel: 'Get started',
    features: [
      'Foundation components',
      'Light and dark mode',
      'Community support',
      'MIT license',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For teams shipping production apps.',
    monthlyPrice: 29,
    annualPrice: 24,
    priceSuffix: '/mo',
    ctaLabel: 'Start free trial',
    isPopular: true,
    features: [
      'Everything in Starter',
      'Full animated layer',
      'Section blocks',
      'Priority support',
      'Commercial license',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with advanced needs.',
    monthlyPrice: 99,
    annualPrice: 79,
    priceSuffix: '/mo',
    ctaLabel: 'Contact sales',
    features: [
      'Everything in Pro',
      'Custom components',
      'Dedicated support',
      'SLA and onboarding',
      'Private registry access',
    ],
  },
];

function formatPrice(value: number | string): string {
  if (typeof value === 'string') return value;
  if (value === 0) return 'Free';
  return `$${value}`;
}

function PlanPrice({
  plan,
  billingPeriod,
  shouldReduceMotion,
}: {
  plan: PricingPlan;
  billingPeriod: BillingPeriod;
  shouldReduceMotion: boolean;
}) {
  const price = billingPeriod === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const suffix = plan.priceSuffix ?? '';

  if (shouldReduceMotion) {
    return (
      <p className="mt-4 flex items-baseline gap-1">
        <span className="font-title text-3xl font-semibold tracking-tight text-foreground">
          {formatPrice(price)}
        </span>
        {typeof price === 'number' && price > 0 && (
          <span className="text-sm text-muted-foreground">{suffix}</span>
        )}
      </p>
    );
  }

  return (
    <p className="mt-4 flex items-baseline gap-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${plan.id}-${billingPeriod}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          className="font-title text-3xl font-semibold tracking-tight text-foreground"
        >
          {formatPrice(price)}
        </motion.span>
      </AnimatePresence>
      {typeof price === 'number' && price > 0 && (
        <span className="text-sm text-muted-foreground">{suffix}</span>
      )}
    </p>
  );
}

export const Pricing = forwardRef<HTMLElement, PricingProps>(
  (
    {
      className,
      eyebrow = 'Pricing',
      title = (
        <>
          Simple plans for{' '}
          <span className="text-brand">every stage</span>
        </>
      ),
      description = 'Start free, upgrade when you need the animated layer and section blocks.',
      plans = defaultPricingPlans,
      defaultBillingPeriod = 'monthly',
      annualSavingsLabel = 'Save 20%',
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const billingToggleId = useId();
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(defaultBillingPeriod);
    const isAnnual = billingPeriod === 'annual';

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
        className={cn('w-full px-6 py-16 md:px-8 md:py-24', className)}
        aria-labelledby="pricing-heading"
        {...props}
      >
        <motion.header className="max-w-2xl" {...headerMotion}>
          {eyebrow && (
            <p className="text-sm font-medium text-brand">{eyebrow}</p>
          )}
          <h2
            id="pricing-heading"
            className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground md:text-base">{description}</p>
          )}
        </motion.header>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              !isAnnual ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Monthly
          </span>
          <Switch
            id={billingToggleId}
            isChecked={isAnnual}
            onChange={(checked) => setBillingPeriod(checked ? 'annual' : 'monthly')}
            aria-label="Toggle annual billing"
          />
          <span
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium transition-colors',
              isAnnual ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            Annual
            {annualSavingsLabel && (
              <Badge variant="primary" size="sm">
                {annualSavingsLabel}
              </Badge>
            )}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular ?? false;

            const cardMotion = shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.3,
                    ease: EASE_OUT,
                    delay: index * 0.06,
                  },
                  viewport: { once: true, amount: 0.2 } as const,
                };

            return (
              <motion.div key={plan.id} className="h-full" {...cardMotion}>
                <Card
                  className={cn(
                    'relative flex h-full flex-col',
                    isPopular && 'border-brand shadow-md',
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="primary">Most popular</Badge>
                    </div>
                  )}

                  <Card.Header className={cn(isPopular && 'pt-8')}>
                    <Card.Title>{plan.name}</Card.Title>
                    <Card.Description>{plan.description}</Card.Description>
                    <PlanPrice
                      plan={plan}
                      billingPeriod={billingPeriod}
                      shouldReduceMotion={!!shouldReduceMotion}
                    />
                  </Card.Header>

                  <Card.Body className="flex-1">
                    <ul className="flex flex-col gap-3" aria-label={`${plan.name} features`}>
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>

                  <Card.Footer className="mt-auto">
                    <Button
                      variant={isPopular ? 'primary' : 'outline'}
                      className="w-full"
                      size="md"
                    >
                      {plan.ctaLabel ?? 'Get started'}
                    </Button>
                  </Card.Footer>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  },
);

Pricing.displayName = 'Pricing';
