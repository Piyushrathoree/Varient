import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Faq } from '@/components/sections/faq';

export function Example() {
  return (
    <Faq
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="Quick answers about copying components and theming."
      items={[
        {
          question: 'Is Varient free?',
          answer: 'Yes — MIT licensed with no paid tier.',
        },
        {
          question: 'Do I install a package?',
          answer: 'No. Copy the source from the docs and it lives in your project.',
        },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'Faq',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'FAQ'", description: 'Small label rendered above the section title in brand color.' },
        { name: 'title', type: 'string', defaultValue: "'Frequently asked questions'", description: 'Section headline.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy under the title.' },
        { name: 'items', type: '{ question: string; answer: string }[]', description: 'Question and answer pairs rendered in the accordion. Defaults to six Varient-themed FAQs.' },
        { name: 'defaultOpenIndex', type: 'number', defaultValue: '0', description: 'Zero-based index of the item open on first render.' },
        { name: 'allowMultiple', type: 'boolean', defaultValue: 'false', description: 'Allow more than one item open at a time; passed through to the underlying Accordion as isMultiple.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
  ],
  features: [
    'Single-open accordion by default; set allowMultiple to keep several answers expanded at once (maps to Accordion isMultiple).',
    'Scroll-triggered fade/rise-in for eyebrow, heading, description, and the accordion block, staggered with spring transitions.',
    'Heading id generated via useId() and wired to the section via aria-labelledby, so multiple Faq instances on one page never collide.',
    'Fully data-driven — pass custom items to replace the six Varient-themed defaults with any question/answer set.',
    'Respects prefers-reduced-motion: entrance animations collapse to an instant opacity swap with zero-duration transitions.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Toggles the focused item open or closed.' },
    { keys: 'Tab / Shift + Tab', description: 'Moves focus to the next / previous focusable element.' },
    { keys: 'Arrow Down', description: 'Moves focus to the next trigger.' },
    { keys: 'Arrow Up', description: 'Moves focus to the previous trigger.' },
    { keys: 'Home', description: 'Moves focus to the first trigger.' },
    { keys: 'End', description: 'Moves focus to the last trigger.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: 'section', purpose: 'Points to the generated heading id so the section has an accessible name.' },
    { attribute: 'id (useId)', element: 'h2', purpose: 'Unique per-instance heading id, safe for multiple Faq sections on one page.' },
  ],
  a11yNotes: [
    'Composes the Foundation Accordion, which is built on @radix-ui/react-accordion for correct roles, focus management, and keyboard behavior.',
    'Entrance motion uses useReducedMotion() and falls back to an instant, zero-duration reveal.',
  ],
  dependencies: ['@radix-ui/react-accordion'],
  sourceFiles: [
    'packages/ui/src/components/sections/faq/faq.tsx',
    'packages/ui/src/components/sections/faq/index.ts',
  ],
};
