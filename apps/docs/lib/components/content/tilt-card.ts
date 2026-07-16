import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TiltCard } from '@varient/ui'
import { Card } from '@varient/ui'

<TiltCard className="max-w-sm">
  <Card>
    <Card.Header>
      <Card.Title>Studio Pro</Card.Title>
      <Card.Description>Pointer-tracking 3D depth.</Card.Description>
    </Card.Header>
  </Card>
</TiltCard>`,
  props: [
    {
      title: 'TiltCard',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Card content rendered inside the tilt container.' },
        { name: 'maxTilt', type: 'number', defaultValue: '12', description: 'Maximum tilt angle in degrees on each axis.' },
        { name: 'scale', type: 'number', defaultValue: '1.02', description: 'Scale applied while the pointer is over the card.' },
        { name: 'isGlareEnabled', type: 'boolean', defaultValue: 'true', description: 'Show a moving specular glare overlay that follows the pointer.' },
        { name: 'perspective', type: 'number', defaultValue: '800', description: 'CSS perspective distance in pixels.' },
        { name: 'glareColor', type: 'string', defaultValue: "'oklch(100% 0 0 / 0.28)'", description: 'Specular glare color, applied via the --tilt-glare-color CSS custom property.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Pointer-driven 3D tilt via spring-smoothed rotateX/rotateY motion values.',
    'Optional moving specular glare overlay that tracks the pointer position, colorable via the glareColor prop / --tilt-glare-color CSS variable.',
    'Only attaches pointer listeners on fine-pointer devices (useFinePointer) — touch devices render a static card with a hover shadow.',
    'Fully disabled under prefers-reduced-motion: no tilt, scale, or glare, just a plain hover shadow.',
  ],
  a11yNotes: [
    'Tilt and glare only engage for fine pointers (`hover: hover` and `pointer: fine`) — touch devices render a static card with no pointer listeners attached.',
    'Under `prefers-reduced-motion`, tilt, scale, and glare are disabled; the card keeps a plain hover shadow instead.',
    'TiltCard is a non-interactive wrapper — ensure nested content exposes its own focus and activation semantics when clickable.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/tilt-card/tilt-card.tsx',
    'packages/ui/src/components/animated/tilt-card/index.ts',
  ],
};
