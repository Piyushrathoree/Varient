'use client';

import { useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';
import { ToggleGroup, type ToggleGroupSize, type ToggleGroupVariant } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const VARIANTS: { variant: ToggleGroupVariant; label: string }[] = [
  { variant: 'segmented', label: 'Segmented' },
  { variant: 'outline', label: 'Outline' },
];

const SIZES: ToggleGroupSize[] = ['sm', 'md', 'lg'];

export function ToggleGroupDemo() {
  const [align, setAlign] = useState('left');
  const [format, setFormat] = useState<string[]>(['bold']);
  const [segmentedView, setSegmentedView] = useState('list');
  const [outlineView, setOutlineView] = useState('grid');
  const [sizeAlign, setSizeAlign] = useState<Record<ToggleGroupSize, string>>({
    sm: 'left',
    md: 'center',
    lg: 'right',
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Selection modes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Single select">
            <ToggleGroup value={align} onValueChange={(v) => setAlign(v as string)} variant="segmented">
              <ToggleGroup.Item value="left" aria-label="Align left">
                <AlignLeft className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="center" aria-label="Align center">
                <AlignCenter className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="right" aria-label="Align right">
                <AlignRight className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
            </ToggleGroup>
          </DemoCard>

          <DemoCard label="Multiple select">
            <ToggleGroup
              isMultiple
              value={format}
              onValueChange={(v) => setFormat(v as string[])}
              variant="outline"
            >
              <ToggleGroup.Item value="bold" aria-label="Bold">
                <Bold className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="italic" aria-label="Italic">
                <Italic className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="underline" aria-label="Underline">
                <Underline className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
            </ToggleGroup>
          </DemoCard>

          <DemoCard label="Disabled">
            <ToggleGroup defaultValue="left" isDisabled variant="segmented">
              <ToggleGroup.Item value="left" aria-label="Align left">
                <AlignLeft className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="center" aria-label="Align center">
                <AlignCenter className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="right" aria-label="Align right">
                <AlignRight className="size-4" strokeWidth={1.75} aria-hidden />
              </ToggleGroup.Item>
            </ToggleGroup>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {VARIANTS.map(({ variant, label }) => {
            const value = variant === 'segmented' ? segmentedView : outlineView;
            const setValue = variant === 'segmented' ? setSegmentedView : setOutlineView;

            return (
              <DemoCard key={variant} label={label}>
                <ToggleGroup
                  variant={variant}
                  value={value}
                  onValueChange={(v) => setValue(v as string)}
                  className="w-full max-w-xs"
                >
                  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
                  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
                  <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
                </ToggleGroup>
              </DemoCard>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SIZES.map((size) => (
            <DemoCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <ToggleGroup
                size={size}
                variant="segmented"
                value={sizeAlign[size]}
                onValueChange={(next) =>
                  setSizeAlign((prev) => ({ ...prev, [size]: next as string }))
                }
              >
                <ToggleGroup.Item value="left" aria-label="Align left">
                  <AlignLeft className={size === 'lg' ? 'size-5' : 'size-4'} aria-hidden />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="center" aria-label="Align center">
                  <AlignCenter className={size === 'lg' ? 'size-5' : 'size-4'} aria-hidden />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="right" aria-label="Align right">
                  <AlignRight className={size === 'lg' ? 'size-5' : 'size-4'} aria-hidden />
                </ToggleGroup.Item>
              </ToggleGroup>
            </DemoCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToggleGroupPreviewCompact() {
  const [align, setAlign] = useState('left');
  return (
    <div className="flex w-full items-center justify-center">
      <ToggleGroup value={align} onValueChange={(v) => setAlign(v as string)} variant="segmented" size="sm">
        <ToggleGroup.Item value="left" aria-label="Align left">
          <AlignLeft className="size-4" strokeWidth={1.75} aria-hidden />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Align center">
          <AlignCenter className="size-4" strokeWidth={1.75} aria-hidden />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Align right">
          <AlignRight className="size-4" strokeWidth={1.75} aria-hidden />
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
}
