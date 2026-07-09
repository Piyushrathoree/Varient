'use client';

import { type ReactNode } from 'react';
import { Card, MovingBorder, MovingBorderButton } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function MovingBorderDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <p className="text-sm font-medium text-muted-foreground">
        A highlight travels around the border track — wrap any card or use the button shortcut.
      </p>

      <div className="flex flex-col items-center gap-4">
        <MovingBorder duration={6} borderRadius={12} className="w-full max-w-xs">
          <Card className="w-full p-6">
            <Card.Title>Moving border</Card.Title>
            <Card.Description className="mt-2">
              Ember highlight loops around the perimeter.
            </Card.Description>
          </Card>
        </MovingBorder>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DemoCard label="Default button">
          <MovingBorderButton className="max-w-xs">Launch project</MovingBorderButton>
        </DemoCard>

        <DemoCard label="Fast lap (4s)">
          <MovingBorderButton duration={4} className="max-w-xs">
            Ship faster
          </MovingBorderButton>
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Border radius</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="rounded-md (8px)">
            <MovingBorder borderRadius={8} className="w-full max-w-[14rem]">
              <div className="rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground">
                Subtle corners
              </div>
            </MovingBorder>
          </DemoCard>

          <DemoCard label="rounded-2xl (16px)">
            <MovingBorder borderRadius={16} duration={10} className="w-full max-w-[14rem]">
              <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                Pillowy corners
              </div>
            </MovingBorder>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function MovingBorderPreviewCompact() {
  return (
    <MovingBorder duration={6} borderRadius={10} className="w-full max-w-[12rem]">
      <div className="rounded-[inherit] border border-border bg-card px-4 py-3 text-center">
        <p className="text-xs font-medium text-foreground">Moving border</p>
      </div>
    </MovingBorder>
  );
}
