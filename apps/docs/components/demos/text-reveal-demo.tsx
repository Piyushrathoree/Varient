'use client';

import { type ReactNode } from 'react';
import { TextReveal } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function TextRevealDemo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Scroll the page — words reveal as each block enters the viewport.
      </p>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Stagger &amp; delay</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Default stagger (0.05s)">
            <TextReveal
              text="Motion that feels intentional."
              className="text-center font-title text-xl font-semibold tracking-tight text-foreground"
            />
          </DemoCard>
          <DemoCard label="Slower stagger (0.12s)">
            <TextReveal
              text="One word at a time."
              stagger={0.12}
              className="text-center font-title text-xl font-semibold tracking-tight text-foreground"
            />
          </DemoCard>
          <DemoCard label="With delay (0.3s)">
            <TextReveal
              text="A pause before the reveal."
              delay={0.3}
              className="text-center font-title text-xl font-semibold tracking-tight text-foreground"
            />
          </DemoCard>
          <DemoCard label="Brand accent">
            <TextReveal
              text="Copy-paste components you own."
              className="text-center font-title text-xl font-semibold tracking-tight text-brand"
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-24">
        <TextReveal
          text="Varient brings scroll-triggered typography to your hero sections, feature blocks, and landing pages — each word fading and rising into place as visitors scroll down the page."
          className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground"
        />
      </div>
    </div>
  );
}

export function TextRevealPreviewCompact() {
  return (
    <TextReveal
      text="Words reveal on scroll."
      className="font-title text-lg font-semibold tracking-tight text-foreground"
    />
  );
}
