import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { DotPattern } from '@varient/ui'

<div className="relative h-56 overflow-hidden rounded-xl border border-border bg-primary">
  <DotPattern
    isGlowing
    className="[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
  />
</div>`,
  props: [
    {
      title: 'DotPattern',
      rows: [
        { name: 'size', type: 'number', defaultValue: '16', description: 'Spacing between dot centers in pixels.' },
        { name: 'radius', type: 'number', defaultValue: '1', description: 'Dot radius in pixels.' },
        { name: 'offsetX', type: 'number', defaultValue: '0', description: 'Horizontal pattern offset.' },
        { name: 'offsetY', type: 'number', defaultValue: '0', description: 'Vertical pattern offset.' },
        { name: 'isGlowing', type: 'boolean', defaultValue: 'false', description: 'When true, dots pulse opacity in a staggered wave.' },
        { name: 'className', type: 'string', description: 'Additional classes — use for radial masks or positioning.' },
      ],
    },
  ],
  features: [
    'SVG `<pattern>` tile renders a full static dot grid with a single `<rect>` fill — cheap regardless of canvas size.',
    'Optional `isGlowing` staggered opacity wave, capped to ~140 evenly sampled animated dots on top of the static base so hero-sized surfaces never spawn thousands of spring instances.',
    'Glow loop pauses automatically while the pattern is scrolled offscreen and resumes on re-entry.',
    'Static under `prefers-reduced-motion` — dots render as the plain pattern with no animation.',
    'Accepts `className` for radial-gradient masks to fade dots at the edges.',
    'Decorative and inert: `aria-hidden` + `pointer-events-none`, never intercepts input.',
  ],
  a11yNotes: [
    'Purely decorative SVG layer — `aria-hidden="true"` and `pointer-events-none` on the root `<svg>`.',
    'Reduced-motion users get the static pattern; the glow wave is skipped entirely.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/dot-pattern/dot-pattern.tsx',
    'packages/ui/src/components/animated/dot-pattern/index.ts',
  ],
};
