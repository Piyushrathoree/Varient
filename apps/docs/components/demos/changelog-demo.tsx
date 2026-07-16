'use client';

import { Changelog } from '@varient/ui';

const productChangelog = [
  {
    version: '2.4.0',
    date: 'Jul 8, 2026',
    isoDate: '2026-07-08',
    title: 'Workspace exports & faster search',
    changes: [
      { type: 'added' as const, text: 'Export any workspace to CSV or JSON from the command palette.' },
      { type: 'improved' as const, text: 'Full-text search now indexes archived threads.' },
      { type: 'fixed' as const, text: 'Keyboard shortcuts no longer conflict with browser find-in-page.' },
    ],
  },
  {
    version: '2.3.0',
    date: 'Jun 22, 2026',
    isoDate: '2026-06-22',
    title: 'Team roles and audit log',
    changes: [
      { type: 'added' as const, text: 'Granular team roles: owner, editor, and viewer.' },
      { type: 'added' as const, text: 'Audit log for workspace-level changes, exportable as CSV.' },
      { type: 'improved' as const, text: 'Invite emails now render correctly in dark-mode clients.' },
    ],
  },
  {
    version: '2.2.1',
    date: 'Jun 3, 2026',
    isoDate: '2026-06-03',
    changes: [
      { type: 'fixed' as const, text: 'Fixed a race condition that duplicated webhook deliveries.' },
      { type: 'fixed' as const, text: 'Resolved a memory leak in the real-time presence indicator.' },
    ],
  },
];

export function ChangelogDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card">
        <Changelog
          description="Every release for the Orbit workspace platform, newest first."
          entries={productChangelog}
          eyebrow="Release notes"
          title="Orbit changelog"
        />
      </div>
      <span className="text-center text-xs font-medium text-muted-foreground">
        Custom entries with isoDate for machine-readable &lt;time&gt; elements
      </span>
    </div>
  );
}

export function ChangelogPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Changelog
        className="px-4 py-6 md:py-6"
        description="Two recent releases."
        entries={[
          {
            version: '1.2.0',
            date: 'Jul 1, 2026',
            isoDate: '2026-07-01',
            title: 'Sections layer ships',
            changes: [
              { type: 'added', text: 'Integration grid and changelog sections.' },
              { type: 'improved', text: 'Card hover states with softer shadows.' },
            ],
          },
          {
            version: '1.1.0',
            date: 'Jun 12, 2026',
            isoDate: '2026-06-12',
            changes: [{ type: 'fixed', text: 'Switch thumb no longer jumps in Safari.' }],
          },
        ]}
        eyebrow="Changelog"
        title="Recent updates"
      />
    </div>
  );
}
