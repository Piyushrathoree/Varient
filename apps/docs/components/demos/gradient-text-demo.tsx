'use client';

import { type ReactNode } from 'react';
import { GradientText } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const MUTED_GRADIENT = [
  'var(--color-foreground)',
  'var(--color-muted-foreground)',
  'var(--color-foreground)',
] as const;

export function GradientTextDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <GradientText className="font-title text-3xl font-semibold tracking-tight md:text-4xl">
          Animated headlines
        </GradientText>
        <p className="max-w-sm text-sm text-muted-foreground">
          A sweeping gradient fills headline text — neutral by default, brand via `colors`.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variations</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Default neutral sweep">
            <GradientText className="font-title text-2xl font-semibold tracking-tight">
              Ship faster
            </GradientText>
          </DemoCard>
          <DemoCard label="Fast sweep (3s)">
            <GradientText
              className="font-title text-2xl font-semibold tracking-tight"
              duration={3}
            >
              Move quickly
            </GradientText>
          </DemoCard>
          <DemoCard label="Neutral gradient">
            <GradientText
              className="font-title text-2xl font-semibold tracking-tight"
              colors={[...MUTED_GRADIENT]}
              duration={5}
            >
              Quiet motion
            </GradientText>
          </DemoCard>
          <DemoCard label="Custom stops">
            <GradientText
              className="font-title text-2xl font-semibold tracking-tight"
              colors={[
                'var(--color-brand-secondary)',
                'var(--color-brand)',
                'var(--color-brand-light)',
                'var(--color-brand-secondary)',
              ]}
              duration={4}
            >
              Ember glow
            </GradientText>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function GradientTextPreviewCompact() {
  return (
    <GradientText className="font-title text-xl font-semibold tracking-tight" duration={5}>
      Varient
    </GradientText>
  );
}
