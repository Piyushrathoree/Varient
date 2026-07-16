'use client';

import { useState, type ReactNode } from 'react';
import { Bold, Italic } from 'lucide-react';
import { Toggle, type ToggleSize, type ToggleVariant } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const VARIANTS: { variant: ToggleVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'outline', label: 'Outline' },
];

const SIZES: ToggleSize[] = ['sm', 'md', 'lg'];

export function ToggleDemo() {
  const [defaultPressed, setDefaultPressed] = useState(false);
  const [outlinePressed, setOutlinePressed] = useState(true);
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [sizeState, setSizeState] = useState<Record<ToggleSize, boolean>>({
    sm: false,
    md: true,
    lg: false,
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => {
            const isOutline = variant === 'outline';
            const pressed = isOutline ? outlinePressed : defaultPressed;
            const setPressed = isOutline ? setOutlinePressed : setDefaultPressed;

            return (
              <DemoCard key={variant} label={label}>
                <Toggle
                  variant={variant}
                  isPressed={pressed}
                  onPressedChange={setPressed}
                  aria-label={`${label} toggle`}
                >
                  {pressed ? 'On' : 'Off'}
                </Toggle>
              </DemoCard>
            );
          })}

          <DemoCard label="Pressed">
            <Toggle defaultPressed aria-label="Pressed toggle">
              Bold
            </Toggle>
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SIZES.map((size) => (
            <DemoCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <Toggle
                size={size}
                isPressed={sizeState[size]}
                onPressedChange={(next) => setSizeState((prev) => ({ ...prev, [size]: next }))}
                aria-label={`${size} toggle`}
              >
                Toggle
              </Toggle>
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DemoCard label="Icon toggle">
            <div className="inline-flex items-center gap-1">
              <Toggle
                variant="outline"
                isPressed={bold}
                onPressedChange={setBold}
                size="sm"
                aria-label="Bold"
              >
                <Bold className="size-4" strokeWidth={1.75} aria-hidden />
              </Toggle>
              <Toggle
                variant="outline"
                isPressed={italic}
                onPressedChange={setItalic}
                size="sm"
                aria-label="Italic"
              >
                <Italic className="size-4" strokeWidth={1.75} aria-hidden />
              </Toggle>
            </div>
          </DemoCard>

          <DemoCard label="Disabled, off">
            <Toggle isDisabled aria-label="Disabled, off">
              Off
            </Toggle>
          </DemoCard>

          <DemoCard label="Disabled, on">
            <Toggle defaultPressed isDisabled aria-label="Disabled, on">
              On
            </Toggle>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function TogglePreviewCompact() {
  const [pressed, setPressed] = useState(true);
  return (
    <div className="flex items-center justify-center">
      <Toggle variant="outline" isPressed={pressed} onPressedChange={setPressed} aria-label="Bold">
        <Bold className="size-4" strokeWidth={1.75} aria-hidden />
      </Toggle>
    </div>
  );
}
