'use client';

import { NumberTicker } from '@varient/ui';

export function NumberTickerDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Decimals</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={4} decimalPlaces={0} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">0 decimal places</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={4.5} decimalPlaces={1} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">1 decimal place</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={4.98} decimalPlaces={2} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">2 decimal places</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Prefix &amp; suffix</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={75} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Components</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={100} suffix="%" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Open source</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-brand">
              <NumberTicker value={12} prefix="$" suffix="k" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">Revenue</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Duration comparison</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={500} duration={0.6} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">0.6s — fast</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={500} duration={1.2} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">1.2s — default</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <span className="font-title text-3xl font-bold text-foreground">
              <NumberTicker value={500} duration={2.4} />
            </span>
            <span className="text-xs font-medium text-muted-foreground">2.4s — slow</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NumberTickerPreviewCompact() {
  return (
    <span className="font-title text-3xl font-bold text-foreground">
      <NumberTicker value={75} duration={1} />
    </span>
  );
}
