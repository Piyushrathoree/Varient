'use client';

import { useState } from 'react';
import { Checkbox } from '@varient/ui';

// Disabled rows still need a stable onChange reference — Checkbox's prop is
// required even when the control can never actually fire it.
function noop() {}

const TEAMS = ['Design', 'Engineering', 'Marketing'];

export function CheckboxDemo() {
  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(false);
  const [unchecked, setUnchecked] = useState(false);

  const [selected, setSelected] = useState<string[]>(['Design']);
  const allSelected = selected.length === TEAMS.length;
  const someSelected = selected.length > 0 && !allSelected;

  function toggleTeam(team: string, checked: boolean) {
    setSelected((prev) => (checked ? [...prev, team] : prev.filter((t) => t !== team)));
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes &amp; states</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox size="sm" isChecked={small} onChange={setSmall} label="Small" />
            <span className="text-xs font-medium text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox size="md" isChecked={medium} onChange={setMedium} label="Medium" />
            <span className="text-xs font-medium text-muted-foreground">Medium (default)</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox size="lg" isChecked={large} onChange={setLarge} label="Large" />
            <span className="text-xs font-medium text-muted-foreground">Large</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox isChecked={unchecked} onChange={setUnchecked} label="Toggle me" />
            <span className="text-xs font-medium text-muted-foreground">Unchecked</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox isChecked={false} isIndeterminate onChange={noop} label="Some selected" />
            <span className="text-xs font-medium text-muted-foreground">Indeterminate</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox isChecked={false} onChange={noop} label="Disabled" isDisabled />
            <span className="text-xs font-medium text-muted-foreground">Disabled, off</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
            <Checkbox isChecked onChange={noop} label="Disabled" isDisabled />
            <span className="text-xs font-medium text-muted-foreground">Disabled, on</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Select-all pattern</p>
        <div className="rounded-xl border border-border bg-card p-6 sm:max-w-sm">
          <div className="flex flex-col gap-3">
            <Checkbox
              isChecked={allSelected}
              isIndeterminate={someSelected}
              onChange={(checked) => setSelected(checked ? TEAMS : [])}
              label="Select all teams"
            />
            <div className="ml-6 flex flex-col gap-3 border-l border-border pl-4">
              {TEAMS.map((team) => (
                <Checkbox
                  key={team}
                  isChecked={selected.includes(team)}
                  onChange={(checked) => toggleTeam(team, checked)}
                  label={team}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckboxPreviewCompact() {
  const [checked, setChecked] = useState(true);
  return <Checkbox isChecked={checked} onChange={setChecked} label="Remember me" />;
}
