'use client';

import { type ReactNode } from 'react';
import { Orbit } from '@varient/ui';
import { Cloud, Code2, Cpu, Layers, Sparkles } from 'lucide-react';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function OrbitChip({ children }: { children: ReactNode }) {
  return (
    <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
      {children}
    </div>
  );
}

function OrbitShowcase() {
  return (
    <div className="relative flex h-72 w-full max-w-md items-center justify-center">
      <div className="absolute z-10 flex size-14 items-center justify-center rounded-full border border-border bg-card shadow-sm">
        <Sparkles className="size-7 text-brand" strokeWidth={1.5} aria-hidden="true" />
      </div>

      <div className="absolute">
        <Orbit radius={110} duration={22}>
          <OrbitChip>
            <Cloud className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
          </OrbitChip>
          <OrbitChip>
            <Code2 className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
          </OrbitChip>
          <OrbitChip>
            <Cpu className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
          </OrbitChip>
          <OrbitChip>
            <Layers className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
          </OrbitChip>
        </Orbit>
      </div>

      <div className="absolute">
        <Orbit radius={58} duration={14} isReverse>
          <OrbitChip>
            <ZapIcon />
          </OrbitChip>
          <OrbitChip>
            <GlobeIcon />
          </OrbitChip>
          <OrbitChip>
            <BoxIcon />
          </OrbitChip>
        </Orbit>
      </div>
    </div>
  );
}

function ZapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-foreground" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-foreground" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M3 12h18M12 3c2.5 2.8 2.5 14.2 0 18M12 3c-2.5 2.8-2.5 14.2 0 18"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 text-foreground" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M12 3v18M4 7.5 12 12l8-4.5" />
    </svg>
  );
}

export function OrbitDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        Icons orbit a central anchor — stack multiple rings with different radius,
        duration, and direction.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <DemoCard label="Dual orbit rings">
          <OrbitShowcase />
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Single ring variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Default path (20s)">
            <div className="relative flex h-48 items-center justify-center">
              <div className="absolute z-10 size-10 rounded-full border border-border bg-card" />
              <Orbit radius={72} duration={20}>
                <OrbitChip>
                  <Cloud className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
                <OrbitChip>
                  <Cpu className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
                <OrbitChip>
                  <Code2 className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
              </Orbit>
            </div>
          </DemoCard>

          <DemoCard label="Reverse, no path (10s)">
            <div className="relative flex h-48 items-center justify-center">
              <div className="absolute z-10 size-10 rounded-full border border-border bg-card" />
              <Orbit radius={72} duration={10} isReverse showPath={false}>
                <OrbitChip>
                  <Layers className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
                <OrbitChip>
                  <Sparkles className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
                <OrbitChip>
                  <Cloud className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
                </OrbitChip>
              </Orbit>
            </div>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function OrbitPreviewCompact() {
  return (
    <div className="relative flex h-32 w-full items-center justify-center">
      <div className="absolute z-10 flex size-7 items-center justify-center rounded-full border border-border bg-card">
        <Sparkles className="size-3.5 text-brand" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <Orbit radius={42} duration={16}>
        <OrbitChip>
          <Cloud className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </OrbitChip>
        <OrbitChip>
          <Cpu className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </OrbitChip>
        <OrbitChip>
          <Code2 className="size-4 text-foreground" strokeWidth={1.5} aria-hidden="true" />
        </OrbitChip>
      </Orbit>
    </div>
  );
}
