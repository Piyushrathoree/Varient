'use client';

import { type ReactNode } from 'react';
import { Globe, type GlobeMarker } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const US_MARKERS: GlobeMarker[] = [
  { location: [40.7128, -74.006], size: 0.06 },
  { location: [34.0522, -118.2437], size: 0.05 },
  { location: [41.8781, -87.6298], size: 0.04 },
  { location: [29.7604, -95.3698], size: 0.04 },
  { location: [47.6062, -122.3321], size: 0.04 },
];

export function GlobeDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <DemoCard label="Default">
        <Globe className="w-full max-w-[220px]" />
      </DemoCard>

      <DemoCard label="Faster spin (speed=0.012)">
        <Globe speed={0.012} className="w-full max-w-[220px]" />
      </DemoCard>

      <DemoCard label="isInteractive=false">
        <Globe isInteractive={false} className="w-full max-w-[220px]" />
      </DemoCard>

      <DemoCard label="Custom markers (US cities)">
        <Globe markers={US_MARKERS} className="w-full max-w-[220px]" />
      </DemoCard>
    </div>
  );
}

export function GlobePreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <Globe className="w-[140px]" />
    </div>
  );
}
