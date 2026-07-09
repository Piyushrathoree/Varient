'use client';

import { Button, Input, Popover, type PopoverSide } from '@varient/ui';

const placements: { side: PopoverSide; label: string }[] = [
  { side: 'top', label: 'Top' },
  { side: 'right', label: 'Right' },
  { side: 'bottom', label: 'Bottom' },
  { side: 'left', label: 'Left' },
];

export function PopoverDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Popover>
          <Popover.Trigger asChild>
            <Button variant="outline">Open popover</Button>
          </Popover.Trigger>
          <Popover.Content className="w-64">
            <div className="space-y-2">
              <h4 className="text-sm font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the width and height for the layer. Values update in real time.
              </p>
            </div>
          </Popover.Content>
        </Popover>
        <span className="text-xs font-medium text-muted-foreground">Basic text</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Popover>
          <Popover.Trigger asChild>
            <Button variant="outline">Edit dimensions</Button>
          </Popover.Trigger>
          <Popover.Content className="w-72">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the width and height for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <Input label="Width" defaultValue="100%" size="sm" />
                <Input label="Height" defaultValue="25px" size="sm" />
              </div>
              <Button size="sm" variant="primary" className="w-full">
                Save
              </Button>
            </div>
          </Popover.Content>
        </Popover>
        <span className="text-xs font-medium text-muted-foreground">Form</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 sm:col-span-2 lg:col-span-1">
        <div className="grid grid-cols-2 gap-3">
          {placements.map(({ side, label }) => (
            <Popover key={side}>
              <Popover.Trigger asChild>
                <Button variant="outline" size="sm">
                  {label}
                </Button>
              </Popover.Trigger>
              <Popover.Content side={side} className="w-48">
                <p className="text-sm text-muted-foreground">
                  Popover anchored to the <span className="font-medium text-foreground">{label.toLowerCase()}</span> of the trigger.
                </p>
              </Popover.Content>
            </Popover>
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground">Placement</span>
      </div>
    </div>
  );
}

export function PopoverPreviewCompact() {
  return (
    <div className="flex items-center justify-center">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-56">
          <p className="text-sm text-muted-foreground">
            A lightweight floating panel for contextual content.
          </p>
        </Popover.Content>
      </Popover>
    </div>
  );
}
