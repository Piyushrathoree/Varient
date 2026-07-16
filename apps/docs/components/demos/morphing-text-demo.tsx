'use client';

import { type ReactNode, useState } from 'react';
import { MorphingText } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const PRODUCT_WORDS = ['beautiful', 'accessible', 'delightful', 'performant'] as const;

function PausableCard() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      <span className="font-title text-xl font-semibold text-foreground">
        Ship{' '}
        <MorphingText
          words={['faster', 'smoother', 'better']}
          isPaused={isPaused}
        />
      </span>
      <button
        type="button"
        onClick={() => setIsPaused((prev) => !prev)}
        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted motion-reduce:transition-none"
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <span className="text-xs font-medium text-muted-foreground">
        isPaused: {String(isPaused)}
      </span>
    </div>
  );
}

export function MorphingTextDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Build something{' '}
          <MorphingText words={[...PRODUCT_WORDS]} />
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Words morph with a blur-crossfade — distinct from the slide-based Word Rotate.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Timing</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Default (2.5s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Ship{' '}
              <MorphingText words={['faster', 'smoother', 'better']} />
            </span>
          </DemoCard>
          <DemoCard label="Fast (1.4s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Ship{' '}
              <MorphingText
                words={['faster', 'smoother', 'better']}
                interval={1400}
              />
            </span>
          </DemoCard>
          <PausableCard />
        </div>
      </div>
    </div>
  );
}

export function MorphingTextPreviewCompact() {
  return (
    <span className="font-title text-lg font-semibold text-foreground">
      Build{' '}
      <MorphingText
        words={['better', 'faster', 'smoother']}
        interval={2000}
      />
    </span>
  );
}
