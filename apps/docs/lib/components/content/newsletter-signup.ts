import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { NewsletterSignup } from '@/components/sections/newsletter-signup';

export function Footer() {
  return (
    <NewsletterSignup
      variant="card"
      eyebrow="Varient Insider"
      title="Join the builder list"
      description="Early access to new sections, animation notes, and release recaps."
      buttonLabel="Join the list"
      onSubscribe={async (email) => {
        // Your API call here
        console.log(email);
      }}
    />
  );
}`,
  props: [
    {
      title: 'NewsletterSignup',
      rows: [
        {
          name: 'eyebrow',
          type: 'string',
          description: 'Small label above the title, card variant only. Header pattern parity with other sections.',
        },
        {
          name: 'title',
          type: 'string',
          defaultValue: "'Stay in the loop'",
          description: 'Headline shown above the form (card) or beside it (inline).',
        },
        { name: 'description', type: 'string', description: 'Supporting copy below the title.' },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: "'you@company.com'",
          description: 'Email input placeholder.',
        },
        {
          name: 'buttonLabel',
          type: 'string',
          defaultValue: "'Subscribe'",
          description: 'Submit button label.',
        },
        {
          name: 'onSubscribe',
          type: '(email: string) => void | Promise<void>',
          description:
            'Called with the validated email on submit. If omitted, a ~800ms simulated delay runs before success.',
        },
        {
          name: 'variant',
          type: "'inline' | 'card'",
          defaultValue: "'inline'",
          description: 'Layout — single-row capture or centered card surface.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root section wrapper.',
        },
      ],
    },
  ],
  features: [
    'Inline and card layouts share one validated form with loading and success states.',
    'Card variant accepts an optional eyebrow label above the title for header parity with other sections.',
    'Invalid submissions play a small gated shake on the email field (skipped under prefers-reduced-motion).',
    'Success state offers a quiet "Subscribe another" link that resets the form back to entry.',
    'Status region uses aria-live="polite" so loading and success are announced without interrupting.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between the email field and subscribe button.' },
    { keys: 'Enter', description: 'Submits the form when focus is inside it.' },
  ],
  aria: [
    { attribute: 'aria-live="polite"', element: 'Status wrapper', purpose: 'Announces loading and success state changes without interrupting screen readers.' },
    { attribute: 'role="alert"', element: 'Input errorText', purpose: 'Surfaces the invalid-email validation message.' },
    { attribute: 'role="status"', element: 'Success confirmation row', purpose: 'Marks the post-submit confirmation as a status update.' },
    { attribute: 'aria-labelledby', element: 'section', purpose: 'Associates the section with its heading id.' },
  ],
  a11yNotes: [
    'All enter/exit and shake transitions are gated behind prefers-reduced-motion via useReducedMotion().',
    'The Input component keeps htmlFor/id label association even when the visible label is omitted on the inline variant (aria-label is supplied instead).',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/newsletter-signup/newsletter-signup.tsx',
    'packages/ui/src/components/sections/newsletter-signup/index.ts',
  ],
};
