'use client';

import { BentoFeatures } from '@varient/ui';

export function BentoFeaturesDemo() {
  return (
    <div className="w-full bg-background">
      <BentoFeatures />
    </div>
  );
}

export function BentoFeaturesPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <BentoFeatures
        className="px-4 py-6 md:py-6"
        description="Highlight what makes your product different."
        eyebrow="Features"
        items={[
          {
            title: 'Token-driven theming',
            description: 'One CSS file restyles every component.',
            className: 'md:col-span-2',
          },
          {
            title: 'Copy-paste DX',
            description: 'Copy the source and own the code.',
          },
        ]}
        title="Built to ship fast"
      />
    </div>
  );
}
