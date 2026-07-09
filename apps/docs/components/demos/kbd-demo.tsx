'use client';

import type { ReactNode } from 'react';
import { Kbd, KbdGroup } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function KbdDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCard label="Single key">
          <Kbd>Esc</Kbd>
        </DemoCard>

        <DemoCard label="Modifier combo">
          <KbdGroup keys={['⌘', 'K']} />
        </DemoCard>

        <DemoCard label="Sequence">
          <KbdGroup keys={['G', 'H']} />
        </DemoCard>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Small">
            <KbdGroup keys={['⌘', 'Shift', 'P']} size="sm" />
          </DemoCard>
          <DemoCard label="Medium">
            <KbdGroup keys={['⌘', 'Shift', 'P']} size="md" />
          </DemoCard>
        </div>
      </div>

      <DemoCard label="In context">
        <p className="text-center text-sm text-muted-foreground">
          Press <KbdGroup keys={['⌘', 'K']} size="sm" /> to open the command palette, then{' '}
          <Kbd size="sm">↵</Kbd> to run the selected action.
        </p>
      </DemoCard>
    </div>
  );
}

export function KbdPreviewCompact() {
  return <KbdGroup keys={['⌘', 'K']} />;
}
