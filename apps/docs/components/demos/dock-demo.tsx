'use client';

import { Dock, DockIcon } from '@varient/ui';
import { Folder, Home, Layers, Settings, Sparkles, Users } from 'lucide-react';

export function DockDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-xl border border-border bg-background p-8">
      <p className="text-sm text-muted-foreground">
        Move the cursor along the dock — icons magnify based on proximity.
      </p>
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
