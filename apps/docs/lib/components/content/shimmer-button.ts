import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ShimmerButton } from '@varient/ui'\n\n<ShimmerButton size="lg">Get started</ShimmerButton>`,
  props: [
    {
      title: 'ShimmerButton',
      rows: [
        {
          name: 'shimmerColor',
          type: 'string',
          defaultValue: 'color-mix(in oklab, white 55%, transparent)',
          description: 'CSS color for the moving highlight overlay.',
        },
        {
          name: 'shimmerDuration',
          type: 'number',
          defaultValue: '3',
          description: 'Duration of one shimmer sweep, in seconds.',
        },
        {
          name: 'shimmerWidth',
          type: 'string',
          defaultValue: "'40%'",
          description: 'Width of the shimmer sweep band, as a CSS size (e.g. "40%", "3rem").',
        },
        {
          name: 'background',
          type: 'string',
          defaultValue: 'brand candy gradient',
          description: 'Button fill — any CSS background value. Defaults to the brand gradient from DESIGN-DNA.',
        },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description: 'Button height and padding scale.',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Disables interaction and dims the button.',
        },
        { name: 'children', type: 'ReactNode', description: 'Button label or content.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Brand-gradient fill by default, overridable via the `background` prop for any CSS background value.',
    'Continuous shimmer highlight sweeps across the surface, clipped to the button bounds.',
    'Sweep thickness is tunable via `shimmerWidth`, independent of color and duration.',
    'Shimmer loop pauses automatically while the button is scrolled offscreen (`useViewportActive`).',
    'Under `prefers-reduced-motion`, the shimmer overlay is not mounted at all — a static candy CTA remains.',
  ],
  a11yNotes: [
    'Renders a real `<button>` — keyboard focus, Enter/Space activation, and the visible focus ring work without extra markup.',
    'Press feedback uses a transform-only `active:scale-[0.97]` transition, gated off under reduced motion.',
    'The shimmer overlay is `aria-hidden` and `pointer-events-none`; it never carries content.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/shimmer-button/shimmer-button.tsx',
    'packages/ui/src/components/animated/shimmer-button/index.ts',
  ],
};
