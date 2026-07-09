'use client';

import { StatsBand } from '@varient/ui';

export function StatsBandDemo() {
  return (
    <div className="w-full bg-background">
      <StatsBand
        description="Real usage across the component library and docs site."
        title="By the numbers"
      />
    </div>
  );
}

export function StatsBandPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <StatsBand
        className="px-4 py-6 sm:py-6"
        stats={[
          { value: 75, suffix: '+', label: 'Components' },
          { value: 12, suffix: 'k', label: 'Copies' },
        ]}
      />
    </div>
  );
}
