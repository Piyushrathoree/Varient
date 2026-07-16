import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { AvatarCircles } from '@/components/animated/avatar-circles';

const avatars = [
  { alt: 'Alex Chen', fallback: 'AC' },
  { alt: 'Jordan Lee', fallback: 'JL' },
  { alt: 'Sam Rivera', fallback: 'SR' },
  { alt: 'Taylor Kim', fallback: 'TK' },
  { alt: 'Morgan Patel', fallback: 'MP' },
  { alt: 'Casey Wu', fallback: 'CW' },
];

export function Example() {
  return <AvatarCircles avatars={avatars} maxVisible={4} />;
}`,
  props: [
    {
      title: 'AvatarCircles',
      rows: [
        { name: 'avatars', type: 'AvatarCircleItem[]', description: 'Required — avatar entries with optional `src`, `alt`, and `fallback` initials.' },
        { name: 'maxVisible', type: 'number', defaultValue: '5', description: 'Maximum avatars shown before a `+N` overflow chip.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Avatar diameter preset.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn().' },
      ],
    },
  ],
  features: [
    'Overlapping avatar row with `ring-2 ring-background` borders for stacked contrast on any surface.',
    'Staggered pop-in (opacity + scale, 0.08s stagger) triggered once when the row scrolls into view via `useInView`.',
    'Automatic `+N` overflow chip when `avatars.length` exceeds `maxVisible`.',
    'Falls back to initials derived from `alt` (first letters of each word, max 2 chars, uppercased) when `src` is missing.',
    'Under `prefers-reduced-motion`, all avatars and the overflow chip render immediately with no scale animation.',
  ],
  aria: [
    { attribute: 'role="group"', element: 'Root container', purpose: 'Groups the avatar row as a single unit for assistive tech.' },
    { attribute: 'aria-label', element: 'Root container', purpose: 'Describes total people count and, when overflowing, how many are shown (e.g. "7 people, showing 5").' },
    { attribute: 'aria-hidden', element: 'Initials span', purpose: 'Hidden when `alt` is set, since the group aria-label already carries the accessible summary.' },
    { attribute: 'aria-hidden="true"', element: 'Overflow chip', purpose: 'The `+N` chip is decorative — its count is already reflected in the group aria-label.' },
  ],
  a11yNotes: [
    'Individual avatar images use `alt` (or derived initials) for their own accessible name when `src` is set.',
    'When `prefers-reduced-motion` is set, all avatars and the overflow chip render immediately with no scale animation.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/avatar-circles/avatar-circles.tsx',
    'packages/ui/src/components/animated/avatar-circles/index.ts',
  ],
};
