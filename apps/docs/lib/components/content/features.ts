import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Features } from '@/components/sections/features';

export function LandingPage() {
  return (
    <Features
      eyebrow="Why Varient"
      title={
        <>
          Everything you need to{' '}
          <span className="text-brand">ship polished UI</span>
        </>
      }
      description="Foundation components, animated flourishes, and ready-made sections."
      features={[
        {
          title: 'Animated by default',
          description: 'Motion with prefers-reduced-motion fallbacks built in.',
        },
        {
          title: 'Copy-paste, you own it',
          description: 'Copy source files directly into your project.',
        },
      ]}
      layout="split"
    />
  );
}`,
  props: [
    {
      title: 'Features',
      rows: [
        {
          name: 'eyebrow',
          type: 'string',
          defaultValue: "'Why Varient'",
          description: 'Small brand-colored label above the section title.',
        },
        {
          name: 'title',
          type: 'ReactNode',
          description: 'Section headline — defaults to a title with a brand-colored span.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'One-line supporting copy below the title.',
        },
        {
          name: 'features',
          type: 'FeatureItem[]',
          description:
            'Items — each needs title and description; icon is optional (built-in SVGs rotate when omitted).',
        },
        {
          name: 'layout',
          type: "'grid' | 'split'",
          defaultValue: "'grid'",
          description:
            "'grid' renders a responsive card grid; 'split' renders alternating icon/text rows so this section reads differently from BentoFeatures.",
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section.',
        },
      ],
    },
    {
      title: 'FeatureItem',
      rows: [
        {
          name: 'icon',
          type: 'ReactNode',
          description: 'Optional custom icon — omit to use a built-in inline SVG.',
        },
        {
          name: 'title',
          type: 'string',
          description: 'Feature headline.',
        },
        {
          name: 'description',
          type: 'string',
          description: 'Feature body copy.',
        },
      ],
    },
  ],
  features: [
    'Two layouts from one content API: `layout="grid"` (responsive card grid, up to 4 columns) and `layout="split"` (alternating icon/text rows) so this section never competes with BentoFeatures for the same slot.',
    'Six built-in inline SVG icons rotate automatically across items when `icon` is omitted from a FeatureItem.',
    'Heading id is generated with `useId()`, so multiple `Features` instances can be mounted on one page without colliding `aria-labelledby` targets.',
    'Scroll-reveal entrance animation (header + each card/row) is staggered and gated behind `prefers-reduced-motion` via `useReducedMotion()`.',
    'Shares the library-wide `EASE_OUT` easing curve from `lib/animation.ts` instead of a locally re-declared bezier.',
  ],
  aria: [
    {
      attribute: 'aria-labelledby',
      element: '<section>',
      purpose: 'Associates the section landmark with its heading via a useId()-generated id.',
    },
    {
      attribute: 'aria-hidden',
      element: 'icon wrapper',
      purpose: 'Decorative icon container is hidden from assistive tech; the adjacent heading carries the meaning.',
    },
  ],
  a11yNotes: [
    'Feature cards/rows render as `<article>` elements with correct heading hierarchy (`h2` section title, `h3` per item).',
    'Scroll-reveal animations are gated behind `prefers-reduced-motion` — reduced-motion users see content immediately without stagger or fade.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/features/features.tsx',
    'packages/ui/src/components/sections/features/index.ts',
  ],
};
