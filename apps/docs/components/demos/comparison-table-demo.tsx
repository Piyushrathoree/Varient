'use client';

import { ComparisonTable } from '@varient/ui';

export function ComparisonTableDemo() {
  return (
    <div className="flex w-full flex-col gap-16 bg-background">
      <ComparisonTable
        eyebrow="Compare plans"
        title={
          <>
            Pick the plan that <span className="text-brand">fits your team</span>
          </>
        }
        description="See exactly what each tier includes before you commit."
        plans={[
          { name: 'Starter', price: 'Free', cta: { label: 'Get started' } },
          {
            name: 'Pro',
            price: '$29/mo',
            isHighlighted: true,
            cta: { label: 'Start trial' },
          },
          { name: 'Enterprise', price: 'Custom', cta: { label: 'Contact sales' } },
        ]}
        rows={[
          { feature: 'Foundation components', values: [true, true, true] },
          { feature: 'Animated layer', values: [false, true, true] },
          { feature: 'Team members', values: ['1', '10', 'Unlimited'] },
        ]}
        footnote="Prices shown in USD, billed monthly."
      />

      <ComparisonTable
        eyebrow="By category"
        title="Every feature, grouped by workflow"
        description="Grouped rows make it easier to scan dense feature sets across tiers."
        plans={[
          { name: 'Solo', price: '$9/mo', cta: { label: 'Choose Solo' } },
          {
            name: 'Studio',
            price: '$49/mo',
            isHighlighted: true,
            cta: { label: 'Choose Studio', href: '#' },
          },
        ]}
        rows={[
          { category: 'Design', feature: 'Unlimited canvases', values: [true, true] },
          { category: 'Design', feature: 'Version history', values: [false, true] },
          { category: 'Collaboration', feature: 'Shared workspaces', values: [false, true] },
          { category: 'Collaboration', feature: 'Comment threads', values: [true, true] },
          { category: 'Export', feature: 'Export formats', values: ['PNG', 'PNG, SVG, PDF'] },
        ]}
        footnote="Studio includes a 14-day free trial, no card required."
      />
    </div>
  );
}

export function ComparisonTablePreviewCompact() {
  return (
    <div className="w-full bg-background">
      <ComparisonTable
        className="px-4 py-6 md:py-6"
        description="See what each tier includes."
        eyebrow="Compare"
        plans={[
          { name: 'Starter', price: 'Free', cta: { label: 'Start' } },
          { name: 'Pro', price: '$29/mo', isHighlighted: true, cta: { label: 'Trial' } },
        ]}
        rows={[
          { feature: 'Foundation components', values: [true, true] },
          { feature: 'Animated layer', values: [false, true] },
        ]}
        title="Compare plans"
      />
    </div>
  );
}
