import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { ExpandableCard } from '@varient/ui'\n\n<ExpandableCard\n  title="Designing for orientation"\n  description="How wayfinding cues keep users grounded in deep navigation."\n  media={<img src="/cover.jpg" alt="" />}\n  footer={<span className="text-xs text-muted-foreground">5 min read</span>}\n>\n  The full article body, revealed once the card has expanded.\n</ExpandableCard>`,
  props: [
    {
      title: 'ExpandableCard',
      rows: [
        {
          name: 'title',
          type: 'ReactNode',
          description: 'Card and dialog heading. Shares a layoutId between both states.',
        },
        {
          name: 'description',
          type: 'ReactNode',
          description: 'Short blurb under the title, shown collapsed and expanded.',
        },
        {
          name: 'media',
          type: 'ReactNode',
          description:
            'Optional media block (image, gradient, icon) shown above the title. Shares a layoutId between both states.',
        },
        {
          name: 'footer',
          type: 'ReactNode',
          description: 'Rendered as a footer strip inside the expanded panel only.',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description:
            'Expanded-only body content, revealed once the panel has settled (fades in ~50ms after the morph starts).',
        },
        {
          name: 'isDisabled',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Prevents the card from expanding.',
        },
        {
          name: 'onExpandedChange',
          type: '(isExpanded: boolean) => void',
          description: 'Fires whenever the expanded state changes.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn() on the collapsed card.',
        },
      ],
    },
  ],
  features: [
    'Shared-layout morph between a grid card and a centered modal, using per-instance useId-scoped layoutIds on the container, media block, and title so multiple cards never collide.',
    'Collapsed card stays mounted but invisible while expanded, keeping the grid stable and giving motion a fixed FLIP origin to animate back to on close.',
    'Full keyboard support: Enter/Space opens the collapsed card, Escape closes the panel, and focus moves to the close button on open and back to the trigger on close.',
    'Body scroll is locked while the panel is open.',
    'Expanded-only body content (children) fades in ~50ms after the morph starts so it never stretches mid-transition.',
    'Reduced motion drops the shared layoutIds entirely and cross-fades the panel open/closed in place instead of morphing.',
  ],
  keyboard: [
    { keys: 'Enter / Space', description: 'Opens the collapsed card (when it has focus).' },
    { keys: 'Escape', description: 'Closes the expanded panel.' },
    { keys: 'Tab', description: 'Moves focus through the close button and any focusable content inside the panel.' },
  ],
  aria: [
    { attribute: 'role="button"', element: 'Collapsed card', purpose: 'Marks the card as an activatable trigger.' },
    { attribute: 'aria-haspopup="dialog" / aria-expanded', element: 'Collapsed card', purpose: 'Announces that activating the card opens a dialog and its current state.' },
    { attribute: 'role="dialog" aria-modal="true"', element: 'Expanded panel', purpose: 'Marks the panel as a modal dialog.' },
    { attribute: 'aria-labelledby', element: 'Expanded panel', purpose: 'Points to the panel title so assistive tech announces it as the dialog name.' },
    { attribute: 'aria-hidden / tabIndex={-1}', element: 'Collapsed card (while expanded)', purpose: 'Removes the now-invisible source card from the accessibility tree and tab order while its clone is shown.' },
  ],
  a11yNotes: [
    'Opening focuses the visible close button; closing via Escape, the overlay click, or the close button restores focus to the collapsed card.',
    'Body scroll is locked while the panel is open, restored to its prior value on close.',
    'Under prefers-reduced-motion, the layoutId morph is skipped entirely — the panel plain-fades instead, per house reduced-motion rules.',
  ],
  sourceFiles: [
    'packages/ui/src/components/animated/expandable-card/expandable-card.tsx',
    'packages/ui/src/components/animated/expandable-card/index.ts',
  ],
};
