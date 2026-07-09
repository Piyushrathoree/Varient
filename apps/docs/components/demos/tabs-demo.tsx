'use client';

import { Tabs } from '@varient/ui';

export function TabsDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Tabs defaultValue="overview" className="w-full">
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
              v1.1 — added a sliding indicator and a segmented variant.
            </p>
          </Tabs.Content>
        </Tabs>
        <span className="text-xs font-medium text-muted-foreground">Underline</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Tabs defaultValue="day" variant="pills" className="w-full">
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
        <span className="text-xs font-medium text-muted-foreground">Pills</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6">
        <Tabs defaultValue="list" variant="segmented" className="w-full">
          <Tabs.List>
            <Tabs.Trigger value="list">List</Tabs.Trigger>
            <Tabs.Trigger value="board">Board</Tabs.Trigger>
            <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="list">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A dense, sortable rows view — best for scanning many items at once.
            </p>
          </Tabs.Content>
          <Tabs.Content value="board">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Kanban-style columns grouped by status, drag-to-reorder included.
            </p>
          </Tabs.Content>
          <Tabs.Content value="timeline">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A horizontal schedule view for tracking dates and overlaps.
            </p>
          </Tabs.Content>
        </Tabs>
        <span className="text-xs font-medium text-muted-foreground">Segmented</span>
      </div>
    </div>
  );
}

export function TabsPreviewCompact() {
  return (
    <div className="flex w-full items-center justify-center">
      <Tabs defaultValue="overview" variant="pills" className="w-full max-w-[220px]">
        <Tabs.List className="w-full">
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </div>
  );
}
