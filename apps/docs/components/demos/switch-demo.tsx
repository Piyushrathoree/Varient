'use client';

import { useState } from 'react';
import { Switch } from '@varient/ui';

// Disabled rows still need a stable onChange reference — Switch's prop is
// required even when the control can never actually fire it.
function noop() {}

export function SwitchDemo() {
  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center gap-6">
          <Switch size="sm" isChecked={small} onChange={setSmall} label="Small" />
          <Switch size="md" isChecked={medium} onChange={setMedium} label="Medium" />
          <Switch size="lg" isChecked={large} onChange={setLarge} label="Large" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">States</p>
        <div className="flex flex-col gap-3">
          <Switch
            isChecked={notifications}
            onChange={setNotifications}
            label="Push notifications"
          />
          <Switch isChecked={false} onChange={noop} label="Disabled, off" isDisabled />
          <Switch isChecked onChange={noop} label="Disabled, on" isDisabled />
        </div>
      </div>
    </div>
  );
}

export function SwitchPreviewCompact() {
  const [checked, setChecked] = useState(true);
  return <Switch isChecked={checked} onChange={setChecked} label="Auto-save" />;
}
