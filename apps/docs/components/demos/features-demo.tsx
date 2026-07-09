'use client';

import { Features } from '@varient/ui';

export function FeaturesDemo() {
  return (
    <div className="w-full bg-background">
      <Features />
    </div>
  );
}

export function FeaturesPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Features
        className="px-4 py-6 md:py-6"
        features={[
          {
            title: 'Animated by default',
            description: 'Motion with reduced-motion fallbacks built in.',
          },
          {
            title: 'Copy-paste, you own it',
            description: 'Copy source files directly into your project.',
          },
        ]}
        description="Foundation, animated, and section layers in one library."
        eyebrow="Features"
        title="Ship polished UI faster"
      />
    </div>
  );
}
