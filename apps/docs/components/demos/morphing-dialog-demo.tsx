'use client';

import { useState, type ReactNode } from 'react';
import { Button, MorphingDialog, Switch } from '@varient/ui';

function DemoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
      {children}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden
    >
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1 4.7 4.7" />
    </svg>
  );
}

// 1. Button → settings-panel morph — a real, wired settings surface.
function SettingsMorph() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <MorphingDialog>
      <MorphingDialog.Trigger>
        <Button variant="outline" leftIcon={<SettingsIcon />}>
          Settings
        </Button>
      </MorphingDialog.Trigger>
      <MorphingDialog.Content>
        <MorphingDialog.Title>Preferences</MorphingDialog.Title>
        <MorphingDialog.Description>
          Changes apply immediately to this workspace.
        </MorphingDialog.Description>
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-foreground">Notifications</span>
            <Switch isChecked={notifications} onChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-foreground">Auto-save</span>
            <Switch isChecked={autoSave} onChange={setAutoSave} />
          </div>
        </div>
      </MorphingDialog.Content>
    </MorphingDialog>
  );
}

// 2. Avatar → profile-card morph.
function ProfileMorph() {
  return (
    <MorphingDialog>
      <MorphingDialog.Trigger className="rounded-full">
        <span className="flex size-14 items-center justify-center rounded-full bg-brand/15 font-display text-lg font-semibold text-brand">
          AR
        </span>
      </MorphingDialog.Trigger>
      <MorphingDialog.Content className="max-w-sm">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-brand/15 font-display text-xl font-semibold text-brand">
            AR
          </span>
          <div>
            <MorphingDialog.Title>Ada Reyes</MorphingDialog.Title>
            <MorphingDialog.Description>Product design, Varient</MorphingDialog.Description>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Building the animated component layer. Usually found tuning spring curves.
          </p>
        </div>
      </MorphingDialog.Content>
    </MorphingDialog>
  );
}

// 3. Notes-card → editor morph — the Title shares layout across both states.
function NoteMorph() {
  return (
    <MorphingDialog>
      <MorphingDialog.Trigger className="block w-full max-w-xs rounded-lg border border-border bg-background p-4 text-left shadow-sm transition-shadow hover:shadow-md">
        <MorphingDialog.Title className="text-sm">Launch checklist</MorphingDialog.Title>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          Finalize pricing page, confirm docs links, smoke-test the checkout flow before
          Friday...
        </p>
      </MorphingDialog.Trigger>
      <MorphingDialog.Content>
        <MorphingDialog.Title>Launch checklist</MorphingDialog.Title>
        <textarea
          defaultValue="Finalize pricing page, confirm docs links, smoke-test the checkout flow before Friday. Ping design for the final banner crop."
          rows={6}
          className="mt-3 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </MorphingDialog.Content>
    </MorphingDialog>
  );
}

export function MorphingDialogDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      <DemoCard label="Button → settings panel">
        <SettingsMorph />
      </DemoCard>
      <DemoCard label="Avatar → profile card">
        <ProfileMorph />
      </DemoCard>
      <DemoCard label="Note → editor">
        <NoteMorph />
      </DemoCard>
    </div>
  );
}

export function MorphingDialogPreviewCompact() {
  return (
    <div className="flex items-center justify-center">
      <SettingsMorph />
    </div>
  );
}
