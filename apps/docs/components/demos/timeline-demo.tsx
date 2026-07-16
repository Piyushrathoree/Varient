'use client';

import { Timeline, type TimelineItem } from '@varient/ui';
import { Flag, Layers, Rocket, Sparkles, Wrench } from 'lucide-react';

const launchItems: TimelineItem[] = [
  {
    date: 'Jan 2024',
    title: 'Project kickoff',
    description: 'Assembled the core team and defined the component architecture end to end.',
    badge: 'Milestone',
    icon: <Flag size={14} strokeWidth={1.75} />,
    status: 'done',
  },
  {
    date: 'Mar 2024',
    title: 'Foundation layer shipped',
    description: 'Released 25 Radix-powered primitives with token-driven styling across themes.',
    icon: <Layers size={14} strokeWidth={1.75} />,
    status: 'done',
  },
  {
    date: 'Jun 2024',
    title: 'Animated layer launched',
    description: 'Added 30 motion components with reduced-motion fallbacks and viewport pausing.',
    badge: 'Launch',
    icon: <Sparkles size={14} strokeWidth={1.75} />,
    status: 'current',
  },
  {
    date: 'Sep 2024',
    title: 'Section blocks release',
    description: 'Full-page sections that compose from the layers below, in review with design.',
    icon: <Wrench size={14} strokeWidth={1.75} />,
    status: 'upcoming',
  },
  {
    date: 'Dec 2024',
    title: 'Public 1.0',
    description: 'Publish the library under MIT and open the door for community contributions.',
    icon: <Rocket size={14} strokeWidth={1.75} />,
    status: 'upcoming',
  },
];

export function TimelineDemo() {
  return (
    <div className="w-full bg-background">
      <Timeline
        description="Every milestone on the way from prototype to public release — icons and status track where each phase stands today."
        eyebrow="Roadmap"
        items={launchItems}
        title={
          <>
            How we got{' '}
            <span className="text-brand">here</span>
          </>
        }
      />
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
            icon: <Flag size={14} strokeWidth={1.75} />,
            status: 'done',
          },
          {
            date: 'Jun 2024',
            title: 'Animated layer launched',
            description: 'Added motion components with a11y fallbacks.',
            badge: 'Launch',
            icon: <Sparkles size={14} strokeWidth={1.75} />,
            status: 'current',
          },
        ]}
        title="How we got here"
      />
    </div>
  );
}
