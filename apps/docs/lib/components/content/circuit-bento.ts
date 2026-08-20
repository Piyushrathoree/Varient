import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { CircuitBento, type CircuitBentoItem } from '@varient/ui';

const items: CircuitBentoItem[] = [
  {
    title: 'React',
    description: 'The library for web and native user interfaces.',
    href: 'https://react.dev',
  },
  {
    title: 'Motion',
    description: 'Production-grade animation for React.',
    href: 'https://motion.dev',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first styling mapped onto design tokens.',
    href: 'https://tailwindcss.com',
  },
];

export function LandingSection() {
  return (
    <CircuitBento
      hubLabel="Powered By"
      title={
        <>
          Built on a foundation of fast,{' '}
          <span className="text-brand">production-grade</span> tooling
        </>
      }
      items={items}
    />
  );
}`,
  props: [
    {
      title: 'CircuitBento',
      rows: [
        {
          name: 'title',
          type: 'ReactNode',
          description: 'Section headline. Defaults to a title with a single brand-colored span.',
        },
        {
          name: 'hubLabel',
          type: 'string',
          defaultValue: "'Powered By'",
          description: 'Silkscreen label rendered on the central CPU hub.',
        },
        {
          name: 'items',
          type: 'CircuitBentoItem[]',
          defaultValue: 'defaultCircuitItems',
          description:
            'Tooling cards under the traces. Each can set title, description, href, and icon.',
        },
        {
          name: 'isCompact',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Tighter type, padding, and line-clamps for gallery frames.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
    {
      title: 'CircuitBentoItem',
      rows: [
        { name: 'title', type: 'string', description: 'Card headline.' },
        { name: 'description', type: 'string', description: 'Supporting copy below the title.' },
        {
          name: 'href',
          type: 'string',
          description:
            'Optional external link. When set, the card is an anchor with a trailing arrow.',
        },
        {
          name: 'icon',
          type: 'ReactNode',
          description:
            'Optional mark above the title. Defaults to a built-in geometric icon cycled by card index.',
        },
      ],
    },
  ],
  features: [
    'Orthogonal PCB traces with traveling info / brand / warning gradient pulses that dissolve into a central CPU hub.',
    'Three-up tooling cards under the traces — equal height, optional external links, Foundation Card hover treatment.',
    'The heading id is generated with useId(), so multiple CircuitBento instances on one page never collide on aria-labelledby.',
    'Pulses pause while the SVG is scrolled offscreen via useViewportActive, and are omitted entirely under prefers-reduced-motion.',
    'Mobile drops the traces and keeps a standalone CPU plus a stacked card column so the layout never overflows at 375px.',
  ],
  keyboard: [
    {
      keys: 'Tab / Shift + Tab',
      description: 'Moves focus through linked tooling cards.',
    },
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: 'section',
      purpose: 'Points at a useId()-generated heading so multiple instances never collide.',
    },
    {
      attribute: 'aria-label',
      element: 'svg traces',
      purpose: 'Describes the decorative circuit illustration as a single image.',
    },
    {
      attribute: 'aria-hidden="true"',
      element: 'CPU hub',
      purpose: 'Pins and silkscreen are decorative; the heading carries the section name.',
    },
  ],
  a11yNotes: [
    'Linked cards expose a concatenated accessible name (title — description) and open in a new tab with rel="noopener noreferrer".',
    'Traveling pulses are disabled under prefers-reduced-motion — only static hairline traces remain.',
    'The gradient loop pauses while the traces are offscreen and resumes on re-entry, so stacked demos do not burn CPU off-canvas.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/circuit-bento/circuit-bento.tsx',
    'packages/ui/src/components/sections/circuit-bento/circuit-traces.tsx',
    'packages/ui/src/components/sections/circuit-bento/index.ts',
  ],
};
