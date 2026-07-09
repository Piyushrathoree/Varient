'use client';

import { useState, type ReactNode } from 'react';
import { AnimatedProgressRing, Slider } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function AnimatedProgressRingDemo() {
  const [interactiveValue, setInteractiveValue] = useState([65]);

  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Rings animate into view and sweep to their target value.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="25%">
          <AnimatedProgressRing value={25} />
        </DemoCard>

        <DemoCard label="50%">
          <AnimatedProgressRing value={50} />
        </DemoCard>

        <DemoCard label="75%">
          <AnimatedProgressRing value={75} />
        </DemoCard>

        <DemoCard label="Compact (80px)">
          <AnimatedProgressRing value={42} size={80} strokeWidth={6} />
        </DemoCard>

        <DemoCard label="Large (160px)">
          <AnimatedProgressRing value={88} size={160} strokeWidth={10} />
        </DemoCard>

        <DemoCard label="Success color">
          <AnimatedProgressRing value={92} color="var(--color-success)" />
        </DemoCard>

        <DemoCard label="No center label">
          <AnimatedProgressRing value={60} showValue={false} />
        </DemoCard>

        <DemoCard label="Custom track">
          <AnimatedProgressRing
            value={35}
            trackColor="color-mix(in oklab, var(--color-brand) 15%, var(--color-muted))"
          />
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Interactive</p>
        <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-8">
          <AnimatedProgressRing value={interactiveValue[0]} size={140} />
          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {interactiveValue[0]}%
            </span>
            <Slider
              className="w-full"
              value={interactiveValue}
              onValueChange={setInteractiveValue}
              aria-label="Progress value"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnimatedProgressRingPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <AnimatedProgressRing value={72} size={88} strokeWidth={6} />
    </div>
  );
}
