import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useRef } from 'react';
import { FloatingNavbar } from '@varient/ui';

const scrollRef = useRef<HTMLDivElement>(null);

<FloatingNavbar
  isFixed={false}
  scrollContainerRef={scrollRef}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
  ]}
  cta={{ label: 'Get started', href: '/start' }}
/>`,
  props: [
    {
      title: 'FloatingNavbar',
      rows: [
        {
          name: 'items',
          type: '{ label: string; href: string; icon?: ReactNode }[]',
          description: 'Navigation links rendered left-to-right inside the pill.',
        },
        {
          name: 'cta',
          type: '{ label: string; href: string }',
          description: 'Optional brand-gradient call-to-action link at the end of the pill.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
        {
          name: 'scrollContainerRef',
          type: 'RefObject<HTMLElement | null>',
          description: 'Scroll container to track. Defaults to window scroll when omitted.',
        },
        {
          name: 'isFixed',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When false, uses absolute positioning for in-frame demos or nested scroll areas.',
        },
      ],
    },
  ],
  features: [
    'Pill navbar that hides on scroll down past 80px and reveals on scroll up, tracked via a spring-animated y/opacity transform.',
    'Tracks either window scroll or a given scrollContainerRef, so it works fixed to the viewport or absolutely positioned inside a nested scroll area.',
    'Optional brand-gradient CTA link rendered at the end of the pill, separate from the regular nav items.',
    'Items wrap onto a second line inside the pill on narrow viewports rather than overflowing; see the Mobile pattern doc section for trimming the list instead.',
  ],
  aria: [
    { attribute: 'aria-label="Main navigation"', element: '<nav>', purpose: 'Identifies the pill as the primary site navigation for assistive tech.' },
  ],
  a11yNotes: [
    'Links are real <a> elements with visible focus-visible rings — keyboard focus works out of the box.',
    'Under prefers-reduced-motion the navbar stays visible at all times (y: 0, opacity: 1) with a zero-duration transition; the hide/show scroll animation is disabled entirely.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/floating-navbar/floating-navbar.tsx',
    'packages/ui/src/components/animated/floating-navbar/index.ts',
  ],
};
