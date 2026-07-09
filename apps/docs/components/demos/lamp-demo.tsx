'use client';

import { Lamp } from '@varient/ui';

export function LampDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-4">
      <p className="text-sm font-medium text-muted-foreground">
        A glowing horizontal light bar with conic cones — ideal for hero headlines.
      </p>

      <Lamp className="w-full max-w-2xl rounded-xl border border-border px-6 py-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="font-title text-3xl font-semibold tracking-tight text-foreground">
            Build faster with Varient
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            The lamp widens on entrance, then holds a steady ember glow behind your copy.
          </p>
        </div>
      </Lamp>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Lamp className="h-44 w-full rounded-lg border border-border py-8">
            <p className="text-center text-sm font-medium text-foreground">Default ember</p>
          </Lamp>
          <span className="text-xs font-medium text-muted-foreground">accentColor default</span>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Lamp
            accentColor="var(--color-brand-light)"
            className="h-44 w-full rounded-lg border border-border py-8"
          >
            <p className="text-center text-sm font-medium text-foreground">Lighter glow</p>
          </Lamp>
          <span className="text-xs font-medium text-muted-foreground">accentColor override</span>
        </div>
      </div>
    </div>
  );
}

export function LampPreviewCompact() {
  return (
    <Lamp className="h-28 w-full max-w-[12rem] rounded-lg border border-border py-6">
      <p className="text-center text-xs font-medium text-foreground">Lamp</p>
    </Lamp>
  );
}
