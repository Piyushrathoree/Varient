'use client';

import { type ReactNode } from 'react';
import { ButtonCopy, type ButtonCopyVariant } from '@varient/ui';

// Not importing ButtonCopyDisplay here — it's a brand-new type pending the
// barrel update, so this stays a plain literal union until that lands.
type Display = 'icon' | 'label';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const DISPLAYS: { display: Display; label: string }[] = [
  { display: 'icon', label: 'Icon-only' },
  { display: 'label', label: 'With label' },
];

const VARIANTS: { variant: ButtonCopyVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'ghost', label: 'Ghost' },
];

export function ButtonCopyDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Display</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DISPLAYS.map(({ display, label }) => (
            <DemoCard key={display} label={label}>
              <ButtonCopy display={display} content="bun add @varient/ui" />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <ButtonCopy variant={variant} content="bun add @varient/ui" />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          <DemoCard label="XS">
            <ButtonCopy size="xs" content="bun add @varient/ui" />
          </DemoCard>
          <DemoCard label="SM">
            <ButtonCopy size="sm" content="bun add @varient/ui" />
          </DemoCard>
          <DemoCard label="MD">
            <ButtonCopy size="md" content="bun add @varient/ui" />
          </DemoCard>
          <DemoCard label="LG">
            <ButtonCopy size="lg" content="bun add @varient/ui" />
          </DemoCard>
          <DemoCard label="XL">
            <ButtonCopy size="xl" content="bun add @varient/ui" />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Failed state</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="Icon-only">
            <ButtonCopy
              onCopy={() => {
                throw new Error('Clipboard denied');
              }}
            />
          </DemoCard>
          <DemoCard label="With label">
            <ButtonCopy
              display="label"
              onCopy={() => {
                throw new Error('Clipboard denied');
              }}
            />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">On a code block</p>
        <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
          <code className="truncate font-mono text-sm text-muted-foreground">
            npx varient add button-copy
          </code>
          <ButtonCopy variant="ghost" size="sm" content="npx varient add button-copy" />
        </div>
      </div>
    </div>
  );
}

export function ButtonCopyPreviewCompact() {
  return <ButtonCopy variant="outline" content="bun add @varient/ui" />;
}
