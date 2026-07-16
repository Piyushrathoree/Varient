import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Card } from '@varient/ui';

export function Example() {
  return (
    <Card isHoverable>
      <Card.Header>
        <Card.Title>Pro plan</Card.Title>
        <Card.Description>
          Everything in Free, plus the full animated layer and priority support.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-muted-foreground">$19/month, billed annually.</p>
      </Card.Body>
    </Card>
  );
}`,
  props: [
    {
      title: 'Card',
      rows: [
        {
          name: 'variant',
          type: "'default' | 'outline' | 'ghost'",
          defaultValue: "'default'",
          description:
            'default is the hairline surface with a soft shadow; outline drops the fill; ghost drops both border and fill.',
        },
        {
          name: 'isHoverable',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Lifts and brightens the hairline on hover — for cards in a browsable grid.',
        },
        {
          name: 'isClickable',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Marks the card as an interactive target: pointer cursor, press feedback, and keyboard activation (Enter/Space).',
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
    'Three variants — default (filled + shadow), outline (hairline only), ghost (borderless) — compared side-by-side in the demo.',
    'Compound API: Card.Header, Card.Title, Card.Description, Card.Body, Card.Footer.',
    'isHoverable lifts and brightens the border on hover for browsable grids.',
    'isClickable turns the surface into a keyboard-activatable target (role="button", tabIndex, Enter/Space simulate a real click).',
    'Card.Body and Card.Footer auto-restore top padding via first:pt-6 when used without a preceding Header.',
  ],
  keyboard: [{ keys: 'Enter / Space', description: 'Activates the card when isClickable is set (only if a keyboard user has focused it).' }],
  aria: [
    { attribute: 'role="button"', element: 'Card', purpose: 'Applied only when isClickable is true.' },
    { attribute: 'tabIndex={0}', element: 'Card', purpose: 'Makes the card keyboard-focusable when isClickable is true.' },
  ],
  a11yNotes: [
    'Card is a plain div by default — no role, not focusable.',
    'isClickable only wires up semantics and key handling; the onClick behavior is still supplied by the consumer.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/card/card.tsx',
    'packages/ui/src/components/foundation/card/index.ts',
  ],
};
