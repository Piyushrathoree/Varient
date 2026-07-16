'use client';

import { buttonVariants, Sparkles } from '@varient/ui';

export function SparklesDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <p className="text-sm font-medium text-muted-foreground">
        Tiny stars twinkle over headlines and CTAs — ambient, not distracting.
      </p>

      <Sparkles className="w-full max-w-xl rounded-xl border border-border bg-card px-8 py-14 shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="font-title text-2xl font-semibold tracking-tight text-foreground">
            Make it <span className="text-brand">Sparkling</span>
          </h3>
          <button type="button" className={buttonVariants({ variant: 'primary', size: 'md' })}>
            Shine on
          </button>
        </div>
      </Sparkles>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <Sparkles density={24} sparkleDuration={1600} className="h-32 w-full rounded-lg border border-border bg-background">
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Dense field</span>
            </div>
          </Sparkles>
          <span className="text-xs font-medium text-muted-foreground">density 24</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <Sparkles
            density={6}
            size={{ min: 10, max: 16 }}
            color="color-mix(in oklab, var(--color-brand-light) 85%, transparent)"
            className="h-32 w-full rounded-lg border border-border bg-background"
          >
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-medium text-foreground">Large + light brand</span>
            </div>
          </Sparkles>
          <span className="text-xs font-medium text-muted-foreground">Custom size &amp; color</span>
        </div>
      </div>
    </div>
  );
}

export function SparklesPreviewCompact() {
  return (
    <Sparkles density={10} className="h-24 w-full max-w-[12rem] rounded-lg border border-border bg-card">
      <div className="flex h-full items-center justify-center">
        <span className="text-xs font-medium text-foreground">
          <span className="text-brand">Sparkle</span>
        </span>
      </div>
    </Sparkles>
  );
}
