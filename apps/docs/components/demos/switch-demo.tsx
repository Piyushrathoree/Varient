'use client';

import { useState, type ReactNode } from 'react';
import { Switch, type SwitchVariant } from '@varient/ui';

// Disabled rows still need a stable onChange reference — Switch's prop is
// required even when the control can never actually fire it.
function noop() {}

const VARIANTS: { variant: SwitchVariant; label: string }[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'icons', label: 'Icons' },
  { variant: 'labeled', label: 'Labeled' },
];

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function SwitchDemo() {
  const [variantState, setVariantState] = useState<Record<SwitchVariant, boolean>>({
    default: true,
    icons: true,
    labeled: false,
  });

  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VARIANTS.map(({ variant, label }) => (
            <DemoCard key={variant} label={label}>
              <Switch
                variant={variant}
                isChecked={variantState[variant]}
                onChange={(next) => setVariantState((prev) => ({ ...prev, [variant]: next }))}
                aria-label={`${label} switch`}
              />
            </DemoCard>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="Small">
            <Switch variant="icons" size="sm" isChecked={small} onChange={setSmall} />
          </DemoCard>
          <DemoCard label="Medium">
            <Switch variant="icons" size="md" isChecked={medium} onChange={setMedium} />
          </DemoCard>
          <DemoCard label="Large">
            <Switch variant="icons" size="lg" isChecked={large} onChange={setLarge} />
          </DemoCard>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <DemoCard label="With label">
            <Switch
              variant="labeled"
              isChecked={notifications}
              onChange={setNotifications}
              label="Push notifications"
            />
          </DemoCard>
          <DemoCard label="Disabled, off">
            <Switch variant="icons" isChecked={false} onChange={noop} isDisabled aria-label="Disabled, off" />
          </DemoCard>
          <DemoCard label="Disabled, on">
            <Switch variant="icons" isChecked onChange={noop} isDisabled aria-label="Disabled, on" />
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

export function SwitchPreviewCompact() {
  const [checked, setChecked] = useState(true);
  return <Switch variant="icons" isChecked={checked} onChange={setChecked} label="Auto-save" />;
}
