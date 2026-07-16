import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { TextReveal } from '@/components/animated/text-reveal';

export function Example() {
  return (
    <TextReveal
      text="Words reveal as you scroll into view."
      className="text-2xl font-semibold text-foreground"
    />
  );
}`,
  props: [
    {
      title: 'TextReveal',
      rows: [
        {
          name: 'text',
          type: 'string',
          description: 'Plain-text content to reveal. Use `text` or pass a string as `children`.',
        },
        {
          name: 'children',
          type: 'string',
          description: 'Alternative to `text` — must be a plain string, not React nodes.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(). Applied to the outer inline wrapper.',
        },
        {
          name: 'delay',
          type: 'number',
          defaultValue: '0',
          description: 'Seconds to wait before the first word animates in.',
        },
        {
          name: 'stagger',
          type: 'number',
          defaultValue: '0.05',
          description: 'Seconds between each word in the stagger sequence.',
        },
      ],
    },
  ],
  features: [
    'Scroll-triggered per-word reveal with a configurable stagger and start delay.',
    'Fires once when the block enters the viewport (`useInView` with `once: true`, `-80px` margin) — never replays on later scrolls.',
    'The full string is always present via a visually-hidden `sr-only` span, so screen readers read it once, correctly.',
    'Under `prefers-reduced-motion`, every word renders immediately at full opacity with no translate or delay.',
    'Accepts `text` or a plain-string `children` for flexible authoring.',
  ],
  a11yNotes: [
    'Individual animating words are `aria-hidden="true"` — a partially-revealed string should not be narrated word-by-word.',
    'The complete string is exposed once through a visually-hidden (`sr-only`) span regardless of animation or motion-preference state.',
    'Respects `prefers-reduced-motion`: no opacity/translate animation and no stagger delay when set.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/text-reveal/text-reveal.tsx',
    'packages/ui/src/components/animated/text-reveal/index.ts',
  ],
};
