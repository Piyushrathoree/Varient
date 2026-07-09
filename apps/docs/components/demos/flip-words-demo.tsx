'use client';

import { type ReactNode } from 'react';
import { FlipWords } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const STACK_WORDS = ['React', 'Motion', 'Tailwind', 'Radix'] as const;

export function FlipWordsDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Ship with{' '}
          <FlipWords words={[...STACK_WORDS]} />
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Words flip in 3D with perspective — one at a time.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Speed</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Default (2.5s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Make it{' '}
              <FlipWords words={['bold', 'smooth', 'fast']} />
            </span>
          </DemoCard>
          <DemoCard label="Fast (1.2s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Make it{' '}
              <FlipWords words={['bold', 'smooth', 'fast']} duration={1200} />
            </span>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Word lists</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Adjectives">
            <span className="font-title text-xl font-semibold text-foreground">
              Feel{' '}
              <FlipWords words={['delightful', 'accessible', 'polished']} />
            </span>
          </DemoCard>
          <DemoCard label="Short labels">
            <span className="font-title text-xl font-semibold text-foreground">
              v
              <FlipWords words={['1', '2', '3']} duration={1800} />
            </span>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function FlipWordsPreviewCompact() {
  return (
    <span className="font-title text-lg font-semibold text-foreground">
      Ship with{' '}
      <FlipWords words={['Motion', 'React', 'Tailwind']} duration={2000} />
    </span>
  );
}
