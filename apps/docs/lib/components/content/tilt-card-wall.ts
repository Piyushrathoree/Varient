import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TiltCardWall } from '@/components/animated/tilt-card-wall';

const items = [
  {
    quote: 'A small tool with a big payoff for our design workflow.',
    name: 'Sarah Chen',
    role: 'Product Hunt review',
    rating: 5.0,
    source: 'Product Hunt',
  },
  {
    quote: 'Crisp overlay, fast, and never gets in the way.',
    name: 'Marcus Webb',
    role: 'Frontend Developer',
    rating: 5.0,
    source: 'Chrome Web Store',
  },
];

export function Example() {
  return <TiltCardWall items={items} maxRotation={12} />;
}`,
  props: [
    {
      title: 'TiltCardWall',
      rows: [
        { name: 'items', type: 'TiltCardItem[]', description: 'Testimonials to render in the fan. Each item supports quote, name, role, avatarSrc, rating, and source.' },
        { name: 'maxRotation', type: 'number', defaultValue: '12', description: 'Maximum rotation in degrees for the outermost cards in the fan.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn() on the container.' },
      ],
    },
    {
      title: 'TiltCardItem',
      rows: [
        { name: 'quote', type: 'string', description: 'The testimonial body text.' },
        { name: 'name', type: 'string', description: 'Reviewer name shown in the card footer.' },
        { name: 'role', type: 'string', description: 'Optional subtitle — job title, review source label, etc.' },
        { name: 'avatarSrc', type: 'string', description: 'Optional image URL for the reviewer avatar.' },
        { name: 'rating', type: 'number', description: 'Optional star rating (e.g. 5.0) shown beside a source badge.' },
        { name: 'source', type: 'string', description: 'Optional review source label (Product Hunt, Chrome Web Store, etc.) — renders a matching badge icon.' },
      ],
    },
  ],
  features: [
    'Cards fan out from the center with a computed rotation, vertical offset, and z-index (`computeFanPose`) so the stack reads as a hand of cards at rest.',
    'Hovering or focusing a card straightens it to 0°, lifts it, scales it up slightly, and brings it to the front via spring transitions (`SPRING_DEFAULT`); neighboring cards dim and desaturate slightly to keep focus on the active card.',
    'Responsively switches layout at the `640px` breakpoint via a `matchMedia` listener: fanned/overlapping row on wider viewports, stacked full-width column with no rotation on small screens.',
    'Each card shows a source badge (Product Hunt, Chrome Web Store, or a generic initial) and an optional star rating alongside the reviewer avatar and name.',
    'Under `prefers-reduced-motion`, the straighten/lift/scale animation is skipped entirely — hover and focus only adjust opacity, saturation, and shadow, and transitions resolve instantly (`DURATION_INSTANT`).',
    'Pointer leave and blur are debounced against the wall container (`closest(\'[role="group"]\')`) so moving between overlapping cards does not flicker the active state.',
  ],
  keyboard: [
    { keys: 'Tab / Shift+Tab', description: 'Move focus between cards; each `<article>` is a native tab stop.' },
    { keys: 'Focus', description: 'Focusing a card triggers the same straighten-and-lift interaction as hovering it.' },
  ],
  aria: [
    { attribute: 'role="group"', element: 'Wall container', purpose: 'Groups the fanned cards as a single testimonials region for assistive tech.' },
    { attribute: 'aria-label="Testimonials"', element: 'Wall container', purpose: 'Names the group so screen readers announce its purpose.' },
    { attribute: 'aria-label', element: 'Card `<article>`', purpose: 'Set to "Review from {name}" so each card announces its author when focused.' },
    { attribute: 'aria-hidden', element: 'Quote icon, star icon, source badge', purpose: 'Decorative glyphs are hidden from assistive tech; the visible text and aria-labels carry the meaning.' },
  ],
  a11yNotes: [
    'Each card is a focusable `<article>` (`tabIndex={0}`) with a visible `focus-visible` ring; keyboard focus reproduces the hover interaction exactly.',
    'Neighboring cards dim slightly when one card is active so the focused/hovered card reads clearly against the rest of the fan.',
    'Under `prefers-reduced-motion`, the fan layout stays static and hover/focus only adjusts opacity and shadow — no rotation, scale, or lift animation runs.',
    'On viewports below `640px`, cards stack vertically with no fan rotation or overlap so the wall stays readable at narrow widths.',
    'An empty `items` array renders an accessible "No testimonials to display." message instead of an empty group.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/tilt-card-wall/tilt-card-wall.tsx',
    'packages/ui/src/components/animated/tilt-card-wall/index.ts',
  ],
};
