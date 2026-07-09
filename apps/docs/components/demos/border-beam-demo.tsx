'use client';

import { type ReactNode } from 'react';
import { BorderBeam, Card, NumberTicker } from '@varient/ui';
import { Check } from 'lucide-react';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const FEATURES = ['Unlimited projects', 'Priority support', 'Custom domains', 'Analytics dashboard'] as const;

function PricingCard({
  title,
  price,
  description,
}: {
  title: string;
  price: number;
  description: string;
}) {
  return (
    <Card className="w-full max-w-xs">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
      <Card.Body className="flex flex-col gap-4">
        <p className="font-title text-3xl font-semibold tracking-tight text-foreground">
          $<NumberTicker value={price} />
          <span className="text-sm font-normal text-muted-foreground">/mo</span>
        </p>
        <ul className="flex flex-col gap-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 shrink-0 text-brand" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer>
        <button
          type="button"
          className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-brand text-sm font-medium text-white transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Get started
        </button>
      </Card.Footer>
    </Card>
  );
}

export function BorderBeamDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        The beam travels along the wrapper border — put any card or panel inside.
      </p>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Default</p>
        <div className="grid grid-cols-1 gap-4">
          <DemoCard label="Feature card">
            <BorderBeam className="rounded-xl">
              <PricingCard title="Pro" price={29} description="For growing teams shipping fast." />
            </BorderBeam>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Speed</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Slow (20s)">
            <BorderBeam duration={20} className="rounded-xl">
              <Card className="w-full max-w-xs p-6">
                <Card.Title>Enterprise</Card.Title>
                <Card.Description className="mt-2">Custom SLAs and dedicated support.</Card.Description>
              </Card>
            </BorderBeam>
          </DemoCard>

          <DemoCard label="Fast (6s)">
            <BorderBeam duration={6} size={120} className="rounded-xl">
              <Card className="w-full max-w-xs p-6">
                <Card.Title>Starter</Card.Title>
                <Card.Description className="mt-2">Everything you need to launch.</Card.Description>
              </Card>
            </BorderBeam>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Colors &amp; beam size</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Brand gradient (default)">
            <BorderBeam className="rounded-xl">
              <Card className="w-full max-w-xs p-6">
                <p className="text-sm font-medium text-foreground">Brand → brand-secondary</p>
                <p className="mt-1 text-sm text-muted-foreground">Uses design tokens by default.</p>
              </Card>
            </BorderBeam>
          </DemoCard>

          <DemoCard label="Success accent">
            <BorderBeam
              size={180}
              colorFrom="var(--color-success)"
              colorTo="var(--color-brand-light)"
              borderWidth={2}
              className="rounded-xl"
            >
              <Card className="w-full max-w-xs p-6">
                <p className="text-sm font-medium text-foreground">Custom colors</p>
                <p className="mt-1 text-sm text-muted-foreground">Pass any CSS color value.</p>
              </Card>
            </BorderBeam>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function BorderBeamPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <BorderBeam duration={10} size={100} className="w-full max-w-[11rem] rounded-xl">
        <Card className="w-full p-3">
          <p className="text-sm font-medium text-foreground">Border beam</p>
          <p className="text-xs text-muted-foreground">Edge highlight</p>
        </Card>
      </BorderBeam>
    </div>
  );
}
