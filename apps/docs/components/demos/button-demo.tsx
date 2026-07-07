'use client';

import { useState, type ReactNode } from 'react';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { Button, type ButtonVariant } from '@varient/ui';

const VARIANTS: { variant: ButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Primary' },
  { variant: 'default', label: 'Default' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'link', label: 'Link' },
  { variant: 'sweep', label: 'Sweep' },
  { variant: 'frame', label: 'Frame' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function ButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  function handleLoadingDemo() {
    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 1500);
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <Button variant={variant}>{label}</Button>
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Loading (click to trigger)">
            <Button
              variant="primary"
              isLoading={isLoading}
              onClick={handleLoadingDemo}
              leftIcon={<Sparkles className="size-4" strokeWidth={1.75} />}
            >
              Click to load
            </Button>
          </DemoCard>

          <DemoCard label="Disabled">
            <Button variant="outline" isDisabled>
              Disabled
            </Button>
          </DemoCard>

          <DemoCard label="Left icon">
            <Button variant="sweep" leftIcon={<Send className="size-4" strokeWidth={1.75} />}>
              Sweep
            </Button>
          </DemoCard>

          <DemoCard label="Right icon">
            <Button
              variant="frame"
              rightIcon={<ArrowRight className="size-4" strokeWidth={1.75} />}
            >
              Frame
            </Button>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ButtonPreviewCompact() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="primary" size="sm">
        Primary
      </Button>
      <Button variant="outline" size="sm">
        Outline
      </Button>
      <Button variant="ghost" size="sm">
        Ghost
      </Button>
    </div>
  );
}
