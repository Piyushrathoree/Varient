import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BlurFade } from '@varient/ui';

export function Example() {
  return (
    <div className="grid gap-4">
      <BlurFade delay={0}>
        <div className="rounded-xl border border-border bg-card p-6">First</div>
      </BlurFade>
      <BlurFade delay={0.1}>
        <div className="rounded-xl border border-border bg-card p-6">Second</div>
      </BlurFade>
    </div>
  );
}`,
  props: [
    {
      title: 'BlurFade',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Content to reveal.' },
        {
          name: 'delay',
          type: 'number',
          defaultValue: '0',
          description: 'Delay before the reveal starts, in seconds.',
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: '0.4',
          description: 'Reveal duration in seconds.',
        },
        {
          name: 'yOffset',
          type: 'number',
          defaultValue: '24',
          description: 'Slide distance in pixels along the chosen axis.',
        },
        {
          name: 'blur',
          type: 'string',
          defaultValue: "'6px'",
          description: 'Initial blur amount applied before the reveal.',
        },
        {
          name: 'inView',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When true, reveal triggers once the wrapper scrolls into view.',
        },
        {
          name: 'direction',
          type: "'up' | 'down' | 'left' | 'right'",
          defaultValue: "'up'",
          description: 'Slide direction for the entrance.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn().',
        },
      ],
    },
  ],
  features: [
    'Fades, de-blurs, and slides children into view using a single motion.div — animates opacity, filter, and x/y transform only.',
    'Triggers once via useInView (once: true, -80px margin) by default, or reveals immediately on mount when inView is false.',
    'Direction prop maps to signed x/y offsets (up/down/left/right) computed from a shared yOffset distance.',
    'Under prefers-reduced-motion, renders children immediately in a plain div with no blur, opacity, or transform animation.',
    'Content stays in the DOM at all times — only visual properties animate, so screen readers see children regardless of reveal state.',
  ],
  aria: [],
  a11yNotes: [
    'Content is always present in the DOM — only opacity, blur, and transform animate, so assistive tech can access children regardless of animation state.',
    'Under prefers-reduced-motion, children render immediately with no blur or slide transform.',
    'filter: blur() is compositor-expensive relative to transform/opacity — avoid stacking dozens of simultaneous BlurFade instances in one dense grid; reduce blur or pass blur="0px" for large grids.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/blur-fade/blur-fade.tsx',
    'packages/ui/src/components/animated/blur-fade/index.ts',
  ],
};
