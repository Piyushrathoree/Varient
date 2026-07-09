'use client';

import { useState } from 'react';
import { PanelRight } from 'lucide-react';
import { Button, Drawer, Input, type DrawerSide } from '@varient/ui';

const sides: { side: DrawerSide; label: string }[] = [
  { side: 'right', label: 'Right' },
  { side: 'left', label: 'Left' },
  { side: 'bottom', label: 'Bottom' },
];

function DrawerPanel({ side, label }: { side: DrawerSide; label: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </Drawer.Trigger>
      <Drawer.Content side={side} size="md">
        <Drawer.Header>
          <Drawer.Title>{label} drawer</Drawer.Title>
          <Drawer.Description>
            Supplementary content slides in from the {label.toLowerCase()} edge.
          </Drawer.Description>
        </Drawer.Header>
        <div className="flex flex-1 flex-col gap-4">
          <Input label="Name" defaultValue="Ava Whitfield" size="sm" />
          <Input label="Email" defaultValue="ava@example.com" size="sm" />
        </div>
      </Drawer.Content>
    </Drawer>
  );
}

export function DrawerDemo() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Drawer isOpen={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <Drawer.Trigger asChild>
            <Button
              variant="outline"
              leftIcon={<PanelRight className="size-4" strokeWidth={1.75} />}
            >
              Open drawer
            </Button>
          </Drawer.Trigger>
          <Drawer.Content side="right" size="md">
            <Drawer.Header>
              <Drawer.Title>Filters</Drawer.Title>
              <Drawer.Description>
                Refine the list with the options below.
              </Drawer.Description>
            </Drawer.Header>
            <div className="flex flex-col gap-4">
              <Input label="Search" placeholder="Filter by name…" size="sm" />
              <Input label="Status" defaultValue="Active" size="sm" />
            </div>
          </Drawer.Content>
        </Drawer>
        <span className="text-xs font-medium text-muted-foreground">Right (default)</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {sides.map(({ side, label }) => (
            <DrawerPanel key={side} side={side} label={label} />
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground">Edge placement</span>
      </div>
    </div>
  );
}

export function DrawerPreviewCompact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </Drawer.Trigger>
        <Drawer.Content side="right" size="sm">
          <Drawer.Header>
            <Drawer.Title>Quick settings</Drawer.Title>
            <Drawer.Description>Adjust your preferences.</Drawer.Description>
          </Drawer.Header>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}
