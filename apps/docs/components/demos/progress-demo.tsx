'use client';

import { useState, type ReactNode } from 'react';
import { Progress } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ProgressDemo() {
  const [value, setValue] = useState(42);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default">
          <Progress className="w-full max-w-[240px]" value={65} aria-label="Upload progress" />
        </DemoCard>

        <DemoCard label="With value label">
          <Progress
            className="w-full max-w-[240px]"
            value={value}
            showValueLabel
            aria-label="Storage used"
          />
        </DemoCard>

        <DemoCard label="Indeterminate">
          <Progress
            className="w-full max-w-[240px]"
            isIndeterminate
            aria-label="Loading"
          />
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <Progress className="w-full max-w-[240px]" value={55} size="sm" aria-label="Small" />
          </DemoCard>
          <DemoCard label="Medium">
            <Progress className="w-full max-w-[240px]" value={55} size="md" aria-label="Medium" />
          </DemoCard>
          <DemoCard label="Large">
            <Progress className="w-full max-w-[240px]" value={55} size="lg" aria-label="Large" />
          </DemoCard>
        </div>
      </div>

      <DemoCard label="Interactive">
        <div className="flex w-full max-w-[280px] flex-col items-center gap-3">
          <Progress value={value} showValueLabel aria-label="Adjustable progress" />
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="w-full accent-brand"
            aria-label="Progress slider"
          />
        </div>
      </DemoCard>
    </div>
  );
}

export function ProgressPreviewCompact() {
  return (
    <Progress className="w-[220px]" value={68} aria-label="Progress" />
  );
}
