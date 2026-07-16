import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Lamp } from '@varient/ui'

<Lamp className="px-6 py-12">
  <div className="text-center">
    <h1 className="text-3xl font-semibold">Build faster</h1>
    <p className="mt-2 text-sm text-muted-foreground">Ember conic cones frame your hero copy.</p>
  </div>
</Lamp>`,
  props: [
    {
      title: 'Lamp',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Headline or hero content below the lamp glow.' },
        {
          name: 'accentColor',
          type: 'string',
          defaultValue: 'var(--color-brand)',
          description: 'Horizontal bar and cone glow color.',
        },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Glowing horizontal light bar with dual conic-gradient cones, built for hero headlines.',
    'Bar widens and cones fade in on entrance, gated by an in-view check so the animation replays correctly when the component first scrolls into the viewport.',
    'Accent color is fully customizable via the `accentColor` prop, driving both the bar and cone gradients through a CSS custom property.',
    'Under `prefers-reduced-motion`, renders directly in the fully lit static end-state with no entrance animation.',
  ],
  a11yNotes: [
    'All glow layers (bar, radial glow, conic cones) live inside an `aria-hidden` wrapper with `pointer-events-none` — they never intercept focus or be announced.',
    'Content passed via the `children` slot renders outside the decorative layer and remains fully readable and interactive.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/lamp/lamp.tsx',
    'packages/ui/src/components/animated/lamp/index.ts',
  ],
};
