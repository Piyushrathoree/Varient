'use client';

import { Spotlight } from '@varient/ui';

export function SpotlightDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="text-sm font-medium text-muted-foreground">
        Move your cursor over the card — the spotlight follows and fades in on hover.
      </p>

      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-foreground p-8 shadow-sm">
        <Spotlight />
        <div className="relative z-10 flex flex-col gap-2">
          <h3 className="font-title text-lg font-semibold tracking-tight text-background">
            Built for interaction
          </h3>
          <p className="text-sm text-background/70">
            A soft radial light tracks your pointer across the surface.
          </p>
        </div>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border bg-foreground">
            <Spotlight size={280} />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="text-sm font-medium text-background">Default</span>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">Neutral tint, size 350</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border bg-foreground">
            <Spotlight
              size={200}
              fill="color-mix(in oklab, var(--color-brand-light) 28%, transparent)"
            />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="text-sm font-medium text-background">Custom fill</span>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">Smaller radius, lighter brand</span>
        </div>
      </div>
    </div>
  );
}

export function SpotlightPreviewCompact() {
  return (
    <div className="relative h-24 w-full max-w-[12rem] overflow-hidden rounded-lg border border-border bg-foreground">
      <Spotlight size={180} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <span className="text-xs font-medium text-background">Hover</span>
      </div>
    </div>
  );
}
