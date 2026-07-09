'use client';

import { ComparisonTable } from '@varient/ui';

export function ComparisonTableDemo() {
  return (
    <div className="w-full bg-background">
      <ComparisonTable />
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
