import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Timeline, type TimelineItem } from '@/components/sections/timeline';
import { Flag, Sparkles, Rocket } from 'lucide-react';

const items: TimelineItem[] = [
  {
    date: 'Jan 2024',
    title: 'Project kickoff',
    description: 'Defined the component architecture.',
    badge: 'Milestone',
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
  {
    date: 'Dec 2024',
    title: 'Public 1.0',
    description: 'Publish the library under MIT.',
    icon: <Rocket size={14} strokeWidth={1.75} />,
    status: 'upcoming',
  },
];

<Timeline
  eyebrow="Timeline"
  title={<>How we got <span className="text-brand">here</span></>}
  description="Key milestones on the path from idea to shipped product."
  items={items}
/>`,
  props: [
    {
      title: 'Timeline',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Timeline'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'ReactNode', description: 'Section headline — defaults to a title with a brand-colored span.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'items', type: 'TimelineItem[]', description: 'Chronological milestones rendered along a vertical rail.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'TimelineItem',
      rows: [
        { name: 'date', type: 'string', description: 'Date label shown above the title — rendered in a <time> element.' },
        { name: 'title', type: 'string', description: 'Milestone headline.' },
        { name: 'description', type: 'string', description: 'Supporting copy for the milestone (renders in full, no truncation).' },
        { name: 'badge', type: 'string', description: 'Optional badge label rendered via Foundation Badge.' },
        { name: 'icon', type: 'ReactNode', description: 'Optional icon rendered inside a brand-tinted circle in place of the plain dot.' },
        { name: 'status', type: "'done' | 'current' | 'upcoming'", description: "Lifecycle state — 'current' renders an ember ring marker and a 'Current' label; 'upcoming' mutes the marker and title." },
      ],
    },
  ],
  features: [
    'Vertical milestone rail with a quiet border-l track and staggered scroll-reveal fade+rise per item.',
    "Optional per-item icon renders inside a brand-tinted circle marker instead of the plain dot.",
    "Optional per-item status ('done' | 'current' | 'upcoming') — 'current' gets an ember ring marker and a 'Current' label; 'upcoming' mutes the marker and title.",
    'Descriptions render in full — no line-clamp truncation.',
    'Optional badge per item rendered via the Foundation Badge component.',
    'Scroll-reveal entrance animation respects prefers-reduced-motion (renders in place, no motion).',
  ],
  aria: [
    { attribute: 'aria-labelledby', element: '<section>', purpose: 'Links the section landmark to the heading id for screen reader navigation.' },
    { attribute: '<ol>', element: 'milestone list', purpose: 'Preserves chronological reading order for assistive tech.' },
    { attribute: '<time dateTime>', element: 'date label', purpose: 'Semantic date per milestone.' },
    { attribute: 'aria-hidden', element: 'marker (dot or icon circle)', purpose: 'Decorative — title and date convey the milestone; icon is not announced.' },
  ],
  a11yNotes: [
    'Milestones are an ordered list (<ol>) with a left-rail border; the marker dot or icon circle is aria-hidden since title and date carry the meaning.',
    'Scroll-reveal fade+rise per item respects prefers-reduced-motion — items render fully in place with no animation.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/timeline/timeline.tsx',
    'packages/ui/src/components/sections/timeline/index.ts',
  ],
};
