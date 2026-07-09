'use client';

import { LogoCloud } from '@varient/ui';

export function LogoCloudDemo() {
  return (
    <div className="flex w-full flex-col gap-12 bg-background">
      <LogoCloud title="Trusted by teams at" />

      <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Marquee variant
        </p>
        <LogoCloud isMarquee title="Powering products worldwide" />
      </div>
    </div>
  );
}

export function LogoCloudPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <LogoCloud
        className="px-4 py-4 sm:py-4"
        logos={[
          { name: 'Acme' },
          { name: 'Northwind' },
          { name: 'Vertex' },
          { name: 'Prism' },
        ]}
        title="Trusted by teams at"
      />
    </div>
  );
}
