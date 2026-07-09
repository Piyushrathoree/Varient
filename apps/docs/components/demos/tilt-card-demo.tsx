'use client';

import { Card, TiltCard } from '@varient/ui';
import type { ReactNode } from 'react';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function ProductCard() {
  return (
    <Card className="w-full max-w-[260px] overflow-hidden">
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-muted via-card to-muted/70" />
      <Card.Header className="pb-2">
        <Card.Title>Studio Pro</Card.Title>
        <Card.Description>Wireless headphones with active noise cancellation.</Card.Description>
      </Card.Header>
      <Card.Footer className="pt-0">
        <span className="text-sm font-semibold text-foreground">$249</span>
        <span className="text-xs text-muted-foreground">Free shipping</span>
      </Card.Footer>
    </Card>
  );
}

export function TiltCardDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-sm font-medium text-muted-foreground">
        Move your cursor over each card — the surface tilts toward the pointer with a specular glare.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Default tilt">
          <TiltCard className="w-full max-w-[260px]">
            <ProductCard />
          </TiltCard>
        </DemoCard>

        <DemoCard label="Stronger tilt">
          <TiltCard className="w-full max-w-[260px]" maxTilt={20} scale={1.05}>
            <ProductCard />
          </TiltCard>
        </DemoCard>

        <DemoCard label="Glare off">
          <TiltCard className="w-full max-w-[260px]" isGlareEnabled={false}>
            <ProductCard />
          </TiltCard>
        </DemoCard>
      </div>
    </div>
  );
}

export function TiltCardPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <TiltCard className="w-full max-w-[168px]">
        <Card className="overflow-hidden">
          <div className="aspect-[4/3] w-full bg-gradient-to-br from-muted to-card" />
          <Card.Header className="p-3">
            <Card.Title className="text-sm">Tilt me</Card.Title>
          </Card.Header>
        </Card>
      </TiltCard>
    </div>
  );
}
