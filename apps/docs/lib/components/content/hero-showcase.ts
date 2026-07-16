import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { HeroShowcase } from '@/components/sections/hero-showcase';

export function LandingPage() {
  return (
    <HeroShowcase
      title="Showcase your product with depth"
      subtitle="Split hero with a tilted product frame on the right."
      primaryCta={{ label: 'Get started', href: '#start' }}
      secondaryCta={{ label: 'Live preview', href: '#preview' }}
      media={<img src="/dashboard.png" alt="Product screenshot" className="w-full" />}
    />
  );
}`,
  props: [
    {
      title: 'HeroShowcase',
      rows: [
        {
          name: 'title',
          type: 'string',
          defaultValue: "'Showcase your product with depth'",
          description: 'Display headline — rendered as the page h1.',
        },
        {
          name: 'subtitle',
          type: 'string',
          defaultValue: '(see source)',
          description: 'One-paragraph subhead below the title.',
        },
        {
          name: 'primaryCta',
          type: '{ label: string; href: string }',
          defaultValue: "{ label: 'Get started', href: '#start' }",
          description: 'Primary brand button.',
        },
        {
          name: 'secondaryCta',
          type: '{ label: string; href: string }',
          defaultValue: "{ label: 'Live preview', href: '#preview' }",
          description: 'Secondary outline button.',
        },
        {
          name: 'media',
          type: 'ReactNode',
          description:
            'Slot for a screenshot, mock UI, or any media inside the framed panel. Omit it to fall back to the built-in dotted-surface dashboard mock.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
  ],
  features: [
    'Split layout — staggered copy and CTAs on the left, a tilted product frame on the right, stacking to one column below lg.',
    'The product frame composes TiltCard for pointer-driven 3D tilt and glare on fine-pointer devices, wrapped in a fixed perspective transform for the base tilt look.',
    'On mount the frame settles once from a slight vertical offset using SPRING_DEFAULT — a quiet one-time entrance, not a perpetual float, so nothing keeps moving while people read the copy.',
    'media accepts any ReactNode; when omitted, a built-in dashboard mock renders on a token-based dotted surface (the same radial-gradient-dot pattern used elsewhere in the library) instead of a plain fill.',
    'Copy and visual columns animate in independently (opacity/y for copy, opacity/x for the frame) with a slight stagger.',
    'Every animation — copy entrance, frame entrance, tilt, glare — collapses to an instant, static state under prefers-reduced-motion.',
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: 'section (root)',
      purpose: 'Points at the generated id on the h1 so the section has an accessible name.',
    },
  ],
  a11yNotes: [
    'The root is a <section> labelled by its h1 via a useId()-generated id — no redundant aria-label.',
    'Under prefers-reduced-motion, TiltCard tilt/glare and the frame entrance spring are both disabled, replaced by a static perspective frame with a hover shadow only.',
    'Primary and secondary CTAs are plain anchors with a visible focus-visible ring (ring-2 ring-ring with offset).',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/hero-showcase/hero-showcase.tsx',
    'packages/ui/src/components/sections/hero-showcase/index.ts',
  ],
};
