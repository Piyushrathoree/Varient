'use client';

import { LogoCloud } from '@varient/ui';

const PARTNER_LOGOS = [
  { name: 'Meridian' },
  { name: 'Fjord Labs' },
  { name: 'Cascade' },
  { name: 'Solace' },
  { name: 'Lumenary' },
];

export function LogoCloudDemo() {
  return (
    <div className="flex w-full flex-col gap-10 bg-background">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <LogoCloud
          className="p-0"
          logos={PARTNER_LOGOS}
          title="Trusted by engineering teams at"
        />
        <span className="text-xs font-medium text-muted-foreground">
          Static row — content API
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <LogoCloud
          className="p-0"
          durationSeconds={16}
          isMarquee
          logos={PARTNER_LOGOS}
          title="Powering products worldwide"
        />
        <span className="text-xs font-medium text-muted-foreground">
          Marquee — durationSeconds=16
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <LogoCloud
          className="p-0"
          isIconOnly
          logos={PARTNER_LOGOS}
          title="Marks only"
        />
        <span className="text-xs font-medium text-muted-foreground">
          isIconOnly
        </span>
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
