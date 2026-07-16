'use client';

import { type ReactNode } from 'react';
import { Pricing } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-card">
      {children}
      <span className="px-4 pb-4 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function PricingDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">
          Content API — custom copy, popular label &amp; not-included features
        </p>
        <div className="grid grid-cols-1">
          <DemoCard label="Studio plans with mixed string/object feature rows, a custom popular badge, and a bigger annual discount">
            <div className="w-full overflow-hidden rounded-t-xl border-b border-border bg-background">
              <Pricing
                annualSavingsLabel="2 months free"
                description="Cancel anytime. Every tier ships the full component set."
                eyebrow="Studio pricing"
                popularLabel="Best value"
                title="Pick a plan, keep shipping"
                plans={[
                  {
                    id: 'freelance',
                    name: 'Freelance',
                    description: 'For solo builders and small client work.',
                    monthlyPrice: 19,
                    annualPrice: 15,
                    ctaLabel: 'Start free',
                    features: [
                      'Foundation + section components',
                      'Light and dark themes',
                      { label: 'Team seats', isIncluded: false },
                      { label: 'Private component registry', isIncluded: false },
                    ],
                  },
                  {
                    id: 'studio',
                    name: 'Studio',
                    description: 'For agencies shipping client sites weekly.',
                    monthlyPrice: 49,
                    annualPrice: 39,
                    isPopular: true,
                    ctaLabel: 'Start trial',
                    features: [
                      'Everything in Freelance',
                      'Animated + section layers',
                      { label: 'Up to 5 team seats', isIncluded: true },
                      { label: 'Private component registry', isIncluded: false },
                    ],
                  },
                  {
                    id: 'agency',
                    name: 'Agency',
                    description: 'For teams with multiple concurrent builds.',
                    monthlyPrice: 129,
                    annualPrice: 99,
                    ctaLabel: 'Talk to sales',
                    features: [
                      'Everything in Studio',
                      { label: 'Unlimited team seats', isIncluded: true },
                      { label: 'Private component registry', isIncluded: true },
                      'Dedicated Slack channel',
                    ],
                  },
                ]}
              />
            </div>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Defaults</p>
        <div className="grid grid-cols-1">
          <DemoCard label="Three-tier default plans">
            <div className="w-full overflow-hidden rounded-t-xl border-b border-border bg-background">
              <Pricing />
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function PricingPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Pricing
        className="px-4 py-6 md:py-6"
        description="Two tiers with a monthly or annual toggle."
        eyebrow="Pricing"
        plans={[
          {
            id: 'starter',
            name: 'Starter',
            description: 'For side projects.',
            monthlyPrice: 0,
            annualPrice: 0,
            features: ['Foundation components', 'Dark mode'],
            ctaLabel: 'Get started',
          },
          {
            id: 'pro',
            name: 'Pro',
            description: 'For production teams.',
            monthlyPrice: 29,
            annualPrice: 24,
            isPopular: true,
            features: ['Animated layer', 'Section blocks', 'Priority support'],
            ctaLabel: 'Start trial',
          },
        ]}
        title="Plans that scale with you"
      />
    </div>
  );
}
