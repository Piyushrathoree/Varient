'use client';

import { type ReactNode } from 'react';
import { WordRotate } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const ADJECTIVES = ['beautiful', 'delightful', 'accessible', 'fast'] as const;

export function WordRotateDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="font-title text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Build something{' '}
          <WordRotate words={[...ADJECTIVES]} className="text-brand" />
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Words cycle in place with a rise-and-fade transition.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Speed</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Default (2.5s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Ship{' '}
              <WordRotate words={['faster', 'smoother', 'better']} />
            </span>
          </DemoCard>
          <DemoCard label="Fast (1.2s)">
            <span className="font-title text-xl font-semibold text-foreground">
              Ship{' '}
              <WordRotate words={['faster', 'smoother', 'better']} duration={1200} />
            </span>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function WordRotatePreviewCompact() {
  return (
    <span className="font-title text-lg font-semibold text-foreground">
      Build{' '}
      <WordRotate words={['better', 'faster', 'smoother']} duration={2000} />
    </span>
  );
}
