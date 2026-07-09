'use client';

import { buttonVariants, WavyBackground } from '@varient/ui';

export function WavyBackgroundDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="text-sm font-medium text-muted-foreground">
        Canvas sine waves blur into a calm neutral wash — speed and colors are tunable.
      </p>

      <WavyBackground className="w-full max-w-2xl rounded-xl border border-border shadow-sm">
        <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <h3 className="font-title text-2xl font-semibold tracking-tight text-foreground">
            Wavy backdrop
          </h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            Undulating lines drift behind hero copy without stealing focus.
          </p>
          <button type="button" className={buttonVariants({ variant: 'outline', size: 'md' })}>
            Learn more
          </button>
        </div>
      </WavyBackground>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4">
          <WavyBackground speed="slow" waveOpacity={0.45} className="h-40 w-full rounded-lg border border-border">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Slow drift</span>
            </div>
          </WavyBackground>
          <span className="text-xs font-medium text-muted-foreground">speed=&quot;slow&quot;</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4">
          <WavyBackground
            speed="fast"
            waveOpacity={0.55}
            colors={[
              'color-mix(in oklab, var(--color-brand-light) 40%, transparent)',
              'color-mix(in oklab, var(--color-brand-lighter) 35%, transparent)',
              'color-mix(in oklab, var(--color-brand) 30%, transparent)',
            ]}
            className="h-40 w-full rounded-lg border border-border"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Fast + ember palette</span>
            </div>
          </WavyBackground>
          <span className="text-xs font-medium text-muted-foreground">Custom colors</span>
        </div>
      </div>
    </div>
  );
}

export function WavyBackgroundPreviewCompact() {
  return (
    <WavyBackground className="h-28 w-full max-w-[12rem] rounded-lg border border-border">
      <div className="flex h-full items-center justify-center px-2">
        <span className="text-xs font-medium text-foreground">Waves</span>
      </div>
    </WavyBackground>
  );
}
