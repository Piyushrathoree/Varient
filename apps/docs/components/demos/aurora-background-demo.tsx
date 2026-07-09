'use client';

import { AuroraBackground, buttonVariants } from '@varient/ui';

export function AuroraBackgroundDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="text-sm font-medium text-muted-foreground">
        Neutral gradient mesh blobs drift behind your content — subtle, never neon.
      </p>

      <AuroraBackground className="w-full max-w-2xl rounded-xl border border-border shadow-sm">
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h3 className="font-title text-2xl font-semibold tracking-tight text-foreground">
            Aurora backdrop
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Layer headlines and CTAs above a slow gradient mesh.
          </p>
          <button type="button" className={buttonVariants({ variant: 'primary', size: 'md' })}>
            Get started
          </button>
        </div>
      </AuroraBackground>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4">
          <AuroraBackground className="h-40 w-full rounded-lg border border-border">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Radial fade (default)</span>
            </div>
          </AuroraBackground>
          <span className="text-xs font-medium text-muted-foreground">showRadialGradient</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4">
          <AuroraBackground
            showRadialGradient={false}
            colors={[
              'color-mix(in oklab, var(--color-brand) 10%, transparent)',
              'color-mix(in oklab, var(--color-brand-secondary) 8%, transparent)',
              'color-mix(in oklab, var(--color-brand-light) 6%, transparent)',
            ]}
            className="h-40 w-full rounded-lg border border-border"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Custom ember palette</span>
            </div>
          </AuroraBackground>
          <span className="text-xs font-medium text-muted-foreground">colors prop</span>
        </div>
      </div>
    </div>
  );
}

export function AuroraBackgroundPreviewCompact() {
  return (
    <AuroraBackground className="h-28 w-full max-w-[12rem] rounded-lg border border-border">
      <div className="flex h-full items-center justify-center px-2">
        <span className="text-xs font-medium text-foreground">Aurora</span>
      </div>
    </AuroraBackground>
  );
}
