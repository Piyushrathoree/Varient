'use client';

import { Pricing } from '@varient/ui';

export function PricingDemo() {
  return (
    <div className="w-full bg-background">
      <Pricing />
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
