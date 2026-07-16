import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { RetroGrid } from '@/components/animated/retro-grid';

export function Example() {
  return (
    <RetroGrid className="min-h-[400px] rounded-xl">
      <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold text-foreground">Your headline</h2>
      </div>
    </RetroGrid>
  );
}`,
  props: [
    {
      title: 'RetroGrid',
      rows: [
        {
          name: 'children',
          type: 'ReactNode',
          description: 'Content rendered above the grid in a relative overlay slot.',
        },
        {
          name: 'cellSize',
          type: 'number',
          defaultValue: '48',
          description: 'Grid cell size in pixels.',
        },
        {
          name: 'perspective',
          type: 'number',
          defaultValue: '220',
          description: 'CSS perspective depth in pixels.',
        },
        {
          name: 'angle',
          type: 'number',
          defaultValue: '62',
          description: 'Tilt angle of the grid plane in degrees.',
        },
        {
          name: 'speed',
          type: 'number',
          defaultValue: '18',
          description: 'Seconds for one scroll loop.',
        },
        {
          name: 'isBrandTinted',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When true, grid lines pick up a faint brand tint. Set to false for a neutral grid.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Size and layout on the outer relative container.',
        },
      ],
    },
  ],
  features: [
    'Scrolling perspective grid plane built from a CSS `perspective`/`rotateX` transform and an infinite `translateY` keyframe loop, faded via a radial mask.',
    'Grid lines pick up a faint ember tint by default (`isBrandTinted={true}`); set it to `false` for a neutral, token-driven border color instead.',
    'Children render in a relative `z-10` overlay slot above the grid, so heroes, CTAs, or dashboards stay fully interactive.',
    'The scroll loop pauses automatically via `useViewportActive` while the component is scrolled offscreen, and resumes on re-entry.',
    'Under `prefers-reduced-motion`, the grid renders as a static tilted plane with no keyframe animation.',
  ],
  a11yNotes: [
    'The grid layer is `aria-hidden` and `pointer-events-none` — it never intercepts interaction and is skipped by assistive tech.',
    'Overlay content is rendered outside the aria-hidden wrapper, so it stays in the accessibility tree.',
    'Ensure overlay text has sufficient contrast against the background — the radial mask fades grid lines toward the edges rather than the middle.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/retro-grid/retro-grid.tsx',
    'packages/ui/src/components/animated/retro-grid/index.ts',
  ],
};
