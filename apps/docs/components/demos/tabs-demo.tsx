'use client';

import { Tabs } from '@varient/ui';

export function TabsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Underline</p>
        <Tabs defaultValue="overview">
          <Tabs.List>
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
            <Tabs.Trigger value="changelog">Changelog</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="overview">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Accessible tabs with roving-tabindex arrow-key navigation, built on real
              buttons and ARIA tab/tabpanel roles.
            </p>
          </Tabs.Content>
          <Tabs.Content value="usage">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Controlled or uncontrolled — pass{' '}
              <code className="font-mono text-foreground">value</code> or{' '}
              <code className="font-mono text-foreground">defaultValue</code>.
            </p>
          </Tabs.Content>
          <Tabs.Content value="changelog">
            <p className="text-sm leading-relaxed text-muted-foreground">
              v1.0 — initial release with underline and pills variants.
            </p>
          </Tabs.Content>
        </Tabs>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-muted-foreground">Pills</p>
        <Tabs defaultValue="day" variant="pills">
          <Tabs.List>
            <Tabs.Trigger value="day">Day</Tabs.Trigger>
            <Tabs.Trigger value="week">Week</Tabs.Trigger>
            <Tabs.Trigger value="month">Month</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="day">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Showing the last 24 hours of activity.
            </p>
          </Tabs.Content>
          <Tabs.Content value="week">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Showing the last 7 days of activity.
            </p>
          </Tabs.Content>
          <Tabs.Content value="month">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Showing the last 30 days of activity.
            </p>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}

export function TabsPreviewCompact() {
  return (
    <Tabs defaultValue="overview" variant="pills">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <p className="text-sm text-muted-foreground">Overview panel.</p>
      </Tabs.Content>
      <Tabs.Content value="usage">
        <p className="text-sm text-muted-foreground">Usage panel.</p>
      </Tabs.Content>
    </Tabs>
  );
}
