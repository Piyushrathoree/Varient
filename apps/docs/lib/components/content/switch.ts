import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { useState } from 'react';
import { Switch } from '@/components/foundation/switch';

export function Example() {
  const [checked, setChecked] = useState(true);

  return <Switch isChecked={checked} onChange={setChecked} label="Push notifications" />;
}`,
  props: [
    {
      title: 'Switch',
      rows: [
        { name: 'isChecked', type: 'boolean', description: 'Required — the current on/off state.' },
        {
          name: 'onChange',
          type: '(checked: boolean) => void',
          description: 'Required — called with the next state when toggled.',
        },
        { name: 'isDisabled', type: 'boolean', defaultValue: 'false', description: 'Disables the switch.' },
        {
          name: 'size',
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description: 'Track/thumb size.',
        },
        {
          name: 'variant',
          type: "'default' | 'icons' | 'labeled'",
          defaultValue: "'default'",
          description:
            "Visual style — 'default' (plain pill), 'icons' (check/x glyphs fixed at the track edges), or 'labeled' (I/O text glyphs, same reveal mechanism as icons).",
        },
        {
          name: 'label',
          type: 'string',
          description: 'Inline label rendered next to the track and linked via htmlFor.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the track.',
        },
      ],
    },
  ],
  features: [
    'Three variants: `default` plain pill, `icons` (check/x glyphs), and `labeled` (I/O text glyphs) — icons/labeled glyphs are fixed at the track\'s inner edges and cross-fade + nudge in sync with the thumb\'s spring as it reveals/covers them.',
    'Spring-animated thumb (`SPRING_DEFAULT`) with a squash/stretch press affordance that resets the instant the pointer lifts.',
    'Three sizes (`sm`/`md`/`lg`) with precomputed thumb translate distances so the thumb always lands flush against the track edge.',
    'Fully controlled — `isChecked` and `onChange` are both required, even when `isDisabled` is set.',
    'Every animation (thumb spring, press squash, glyph cross-fade) collapses to `DURATION_INSTANT` under `prefers-reduced-motion`.',
    'Real `<button type="button" role="switch">` — Enter/Space activation is native, no custom key handling needed.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Moves focus to the switch.' },
    { keys: 'Enter / Space', description: 'Toggles the switch (native button activation).' },
  ],
  aria: [
    { attribute: 'role="switch"', element: 'button', purpose: 'Identifies the control as a two-state toggle.' },
    {
      attribute: 'aria-checked',
      element: 'button',
      purpose: 'Reflects the current isChecked state to assistive tech.',
    },
    {
      attribute: 'aria-label="Toggle"',
      element: 'button',
      purpose: 'Fallback label when no `label` prop or custom aria-label is provided.',
    },
    {
      attribute: 'aria-hidden',
      element: 'track glyphs (check/x, I/O)',
      purpose: 'Purely decorative — state is communicated via aria-checked, not the glyphs.',
    },
  ],
  a11yNotes: [
    'When `label` is passed, it renders as a `<label>` tied to the button via a `useId()`-generated (or caller-supplied) id/htmlFor pair.',
    'Without a `label`, the button falls back to `aria-label="Toggle"` unless a custom `aria-label` is passed.',
    'The icons/labeled track glyphs are decorative only; screen readers rely on aria-checked for state.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/switch/switch.tsx',
    'packages/ui/src/components/foundation/switch/index.ts',
  ],
};
