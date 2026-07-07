'use client';

import type { ReactNode } from 'react';
import {
  AlertTriangle,
  AlignLeft,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bold,
  CheckCircle2,
  Info,
  Italic,
  Layers,
  type LucideIcon,
  Sparkles,
  Trash2,
  Underline,
} from 'lucide-react';
import { Button, Tooltip, type TooltipColor, type TooltipSide, type TooltipVariant } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function IconTrigger({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button variant="outline" size="sm" className="size-9 p-0" aria-label={label}>
      <Icon className="size-4" strokeWidth={1.75} />
    </Button>
  );
}

const COLORS: { color: TooltipColor; label: string; icon: LucideIcon }[] = [
  { color: 'default', label: 'Default', icon: Info },
  { color: 'brand', label: 'Brand', icon: Sparkles },
  { color: 'success', label: 'Success', icon: CheckCircle2 },
  { color: 'warning', label: 'Warning', icon: AlertTriangle },
  { color: 'destructive', label: 'Destructive', icon: Trash2 },
  { color: 'surface', label: 'Surface', icon: Layers },
];

const VARIANTS: { variant: TooltipVariant; label: string; description: string }[] = [
  { variant: 'scale', label: 'Scale', description: 'Scales up from 95% with a soft spring pop' },
  { variant: 'slide', label: 'Slide', description: "Slides in from the trigger's side, snappy" },
  { variant: 'fade', label: 'Fade', description: 'A soft opacity-only cross-fade, no movement' },
];

const SIDES: { side: TooltipSide; label: string; icon: LucideIcon }[] = [
  { side: 'top', label: 'Top', icon: ArrowUp },
  { side: 'right', label: 'Right', icon: ArrowRight },
  { side: 'bottom', label: 'Bottom', icon: ArrowDown },
  { side: 'left', label: 'Left', icon: ArrowLeft },
];

export function TooltipDemo() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Colors</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {COLORS.map(({ color, label, icon }) => (
            <DemoCard key={color} label={label}>
              <Tooltip content={`${label} tooltip`} color={color}>
                <IconTrigger icon={icon} label={label} />
              </Tooltip>
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Animation</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VARIANTS.map(({ variant, label, description }) => (
            <DemoCard key={variant} label={label}>
              <Tooltip content={description} variant={variant} color="brand">
                <Button variant="outline" size="sm">
                  Hover me
                </Button>
              </Tooltip>
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sides</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SIDES.map(({ side, label, icon }) => (
            <DemoCard key={side} label={label}>
              <Tooltip content={`${label} side`} side={side}>
                <IconTrigger icon={icon} label={label} />
              </Tooltip>
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Toolbar example</p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            <Tooltip content="Bold" side="top">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" aria-label="Bold">
                <Bold className="size-4" strokeWidth={1.75} />
              </Button>
            </Tooltip>
            <Tooltip content="Italic" side="top">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" aria-label="Italic">
                <Italic className="size-4" strokeWidth={1.75} />
              </Button>
            </Tooltip>
            <Tooltip content="Underline" side="top">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" aria-label="Underline">
                <Underline className="size-4" strokeWidth={1.75} />
              </Button>
            </Tooltip>
            <Tooltip content="Align left" side="top">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" aria-label="Align left">
                <AlignLeft className="size-4" strokeWidth={1.75} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DemoCard label="600ms delay">
            <Tooltip content="Appears after a 600ms delay" delayDuration={600}>
              <Button variant="outline" size="sm">
                Slow delay
              </Button>
            </Tooltip>
          </DemoCard>
          <DemoCard label="Disabled">
            <Tooltip content="This never shows" isDisabled>
              <Button variant="outline" size="sm" isDisabled>
                Disabled
              </Button>
            </Tooltip>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function TooltipPreviewCompact() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  );
}
