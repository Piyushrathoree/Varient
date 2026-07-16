import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Dock, DockIcon } from '@/components/animated/dock';
import { Home, Settings } from 'lucide-react';

export function Example() {
  return (
    <Dock iconSize={44} magnification={72} distance={140}>
      <DockIcon label="Home">
        <Home className="size-5" />
      </DockIcon>
      <DockIcon label="Settings">
        <Settings className="size-5" />
      </DockIcon>
    </Dock>
  );
}`,
  props: [
    {
      title: 'Dock',
      rows: [
        { name: 'children', type: 'ReactNode', description: '`DockIcon` instances to render in the row.' },
        { name: 'iconSize', type: 'number', defaultValue: '44', description: 'Base icon size in pixels when the pointer is far away.' },
        { name: 'magnification', type: 'number', defaultValue: '72', description: 'Peak icon size in pixels at the cursor focal point.' },
        { name: 'distance', type: 'number', defaultValue: '140', description: 'Horizontal influence radius in pixels.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
    {
      title: 'DockIcon',
      rows: [
        { name: 'children', type: 'ReactNode', description: 'Icon content (typically an inline SVG or lucide icon).' },
        { name: 'label', type: 'string', description: 'Accessible name (`aria-label`) and `title` tooltip when not overridden.' },
        { name: 'iconSize', type: 'number', description: 'Overrides the `Dock` context base size for this icon only.' },
        { name: 'magnification', type: 'number', description: 'Overrides the `Dock` context peak size for this icon only.' },
        { name: 'distance', type: 'number', description: 'Overrides the `Dock` context influence radius for this icon only.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Cursor-proximity magnification: icons scale up smoothly as the pointer approaches, driven by `useMotionValue` + `useTransform` + `useSpring`.',
    'Magnification is a GPU-composited transform (`scale` + a small upward `y` arc lift, `transformOrigin: bottom`) on a fixed-size box — it never animates `width`/`height`, so neighboring icons never reflow while the spring settles.',
    'Per-icon overrides for `iconSize`, `magnification`, and `distance` on top of the shared `Dock` context defaults.',
    'Under `prefers-reduced-motion`, pointer tracking is disabled entirely and every `DockIcon` renders as a plain fixed-size button with no scale/lift transforms.',
    'Keyboard-reachable `DockIcon` buttons with a visible `focus-visible` ring; each exposes `aria-label` and a native `title` tooltip from `label`.',
  ],
  aria: [
    { attribute: 'role="toolbar"', element: 'Dock root', purpose: 'Identifies the row of icon buttons as a toolbar for assistive tech.' },
    { attribute: 'aria-label', element: 'DockIcon', purpose: 'Set from the `label` prop as the button’s accessible name.' },
    { attribute: 'title', element: 'DockIcon', purpose: 'Native tooltip, defaulting to `label` when no explicit `title` is passed.' },
  ],
  a11yNotes: [
    'Magnification and pointer tracking are fully disabled under `prefers-reduced-motion` — icons render at a fixed `iconSize` with no `mousemove` listener side effects beyond the disabled state.',
    'Each `DockIcon` is a real `<button type="button">`, so it is reachable via Tab and activates on Enter/Space without any extra keyboard wiring.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/dock/dock.tsx',
    'packages/ui/src/components/animated/dock/index.ts',
  ],
};
