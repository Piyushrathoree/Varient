'use client';

import { Dock, DockIcon } from '@varient/ui';
import { Folder, Home, Layers, Settings, Sparkles, Users } from 'lucide-react';

export function DockDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="text-center text-sm text-muted-foreground">
        Move the cursor along a dock — icons magnify based on proximity.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <Dock>
            <DockIcon label="Home">
              <Home className="size-5" />
            </DockIcon>
            <DockIcon label="Components">
              <Layers className="size-5" />
            </DockIcon>
            <DockIcon label="Animated">
              <Sparkles className="size-5" />
            </DockIcon>
            <DockIcon label="Projects">
              <Folder className="size-5" />
            </DockIcon>
            <DockIcon label="Team">
              <Users className="size-5" />
            </DockIcon>
            <DockIcon label="Settings">
              <Settings className="size-5" />
            </DockIcon>
          </Dock>
          <span className="text-xs font-medium text-muted-foreground">Default</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <Dock magnification={104}>
            <DockIcon label="Home">
              <Home className="size-5" />
            </DockIcon>
            <DockIcon label="Components">
              <Layers className="size-5" />
            </DockIcon>
            <DockIcon label="Animated">
              <Sparkles className="size-5" />
            </DockIcon>
            <DockIcon label="Projects">
              <Folder className="size-5" />
            </DockIcon>
            <DockIcon label="Team">
              <Users className="size-5" />
            </DockIcon>
            <DockIcon label="Settings">
              <Settings className="size-5" />
            </DockIcon>
          </Dock>
          <span className="text-xs font-medium text-muted-foreground">Stronger magnification</span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
          <Dock distance={60}>
            <DockIcon label="Home">
              <Home className="size-5" />
            </DockIcon>
            <DockIcon label="Components">
              <Layers className="size-5" />
            </DockIcon>
            <DockIcon label="Animated">
              <Sparkles className="size-5" />
            </DockIcon>
            <DockIcon label="Projects">
              <Folder className="size-5" />
            </DockIcon>
            <DockIcon label="Team">
              <Users className="size-5" />
            </DockIcon>
            <DockIcon label="Settings">
              <Settings className="size-5" />
            </DockIcon>
          </Dock>
          <span className="text-xs font-medium text-muted-foreground">Tighter distance</span>
        </div>
      </div>
    </div>
  );
}

export function DockPreviewCompact() {
  return (
    <Dock className="h-14 px-2" iconSize={36} magnification={52}>
      <DockIcon label="Home">
        <Home className="size-4" />
      </DockIcon>
      <DockIcon label="Layers">
        <Layers className="size-4" />
      </DockIcon>
      <DockIcon label="Sparkles">
        <Sparkles className="size-4" />
      </DockIcon>
      <DockIcon label="Settings">
        <Settings className="size-4" />
      </DockIcon>
    </Dock>
  );
}
