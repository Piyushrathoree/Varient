import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { buttonVariants, MagneticButton } from '@varient/ui'

<MagneticButton className={buttonVariants({ variant: 'primary', size: 'lg' })}>
  Hover me
</MagneticButton>`,
  props: [
    {
      title: 'MagneticButton',
      rows: [
        {
          name: 'strength',
          type: 'number',
          defaultValue: '0.3',
          description: 'Pull intensity, roughly 0–1. Higher values track the cursor more closely.',
        },
        {
          name: 'distance',
          type: 'number',
          defaultValue: '100',
          description: "Radius in pixels, measured from the button's center, within which the pull is active.",
        },
        { name: 'children', type: 'ReactNode', description: 'Button content.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Drifts toward the pointer once it enters the `distance` radius from the button center, scaled by `strength`, and springs back on leave',
    'Uses a bouncy drag-language spring (`SPRING_BOUNCE`) for both the pull and the release',
    'Pointer tracking gated by the shared `useFinePointer` hook — only engages for `hover: hover` + `pointer: fine` devices, so touch renders a static button',
    'Fully disabled under `prefers-reduced-motion`: no `pointermove`/`pointerleave` listeners are attached and translate never applies',
    'Renders a real `<button>` via `motion.button`, forwarding a merged ref and spreading native button props',
  ],
  aria: [],
  a11yNotes: [
    'Tracking only engages for fine pointers (`hover: hover` and `pointer: fine`) — touch devices render a static, fully functional button with no pointer listeners attached.',
    'Fully disabled under `prefers-reduced-motion`: no `pointermove` listener is attached and the translate never applies, so the button is inert visually but identical functionally.',
    "Renders a real `<button>` element, so keyboard focus, `Enter`/`Space` activation, and the visible focus ring all work without any extra markup.",
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/magnetic-button/magnetic-button.tsx',
    'packages/ui/src/components/animated/magnetic-button/index.ts',
  ],
};
