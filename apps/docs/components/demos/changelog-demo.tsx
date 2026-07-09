'use client';

import { Changelog } from '@varient/ui';

export function ChangelogDemo() {
  return (
    <div className="w-full bg-background">
      <Changelog />
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
            title: 'Sections layer ships',
            changes: [
              { type: 'added', text: 'Integration grid and changelog sections.' },
              { type: 'improved', text: 'Card hover states with softer shadows.' },
            ],
          },
          {
            version: '1.1.0',
            date: 'Jun 12, 2026',
            changes: [{ type: 'fixed', text: 'Switch thumb no longer jumps in Safari.' }],
          },
        ]}
        eyebrow="Changelog"
        title="Recent updates"
      />
    </div>
  );
}
