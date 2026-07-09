'use client';

import { Timeline } from '@varient/ui';

export function TimelineDemo() {
  return (
    <div className="w-full bg-background">
      <Timeline />
    </div>
  );
}

export function TimelinePreviewCompact() {
  return (
    <div className="w-full bg-background">
      <Timeline
        className="px-4 py-6 md:py-6"
        description="Key milestones on the path to launch."
        eyebrow="Timeline"
        items={[
          {
            date: 'Jan 2024',
            title: 'Project kickoff',
            description: 'Defined the component architecture.',
          },
          {
            date: 'Jun 2024',
            title: 'Animated layer launched',
            description: 'Added motion components with a11y fallbacks.',
            badge: 'Launch',
          },
        ]}
        title="How we got here"
      />
    </div>
  );
}
