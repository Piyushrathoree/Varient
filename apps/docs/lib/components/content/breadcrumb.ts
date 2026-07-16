import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Breadcrumb } from '@varient/ui'

<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`,
  props: [
    {
      title: 'Breadcrumb',
      rows: [
        {
          name: 'Breadcrumb',
          type: 'HTMLAttributes<HTMLElement>',
          description: 'Root `<nav aria-label="breadcrumb">` wrapper.',
        },
        {
          name: 'Breadcrumb.List',
          type: 'HTMLAttributes<HTMLOListElement>',
          description: 'Ordered list container — flex row with wrapping.',
        },
        {
          name: 'Breadcrumb.Item',
          type: 'LiHTMLAttributes<HTMLLIElement>',
          description: 'List item wrapping a link, page, or ellipsis.',
        },
        {
          name: 'Breadcrumb.Link',
          type: 'AnchorHTMLAttributes<HTMLAnchorElement>',
          description: 'Navigable ancestor link — muted at rest, foreground on hover.',
        },
        {
          name: 'Breadcrumb.Page',
          type: 'HTMLAttributes<HTMLSpanElement>',
          description: 'Current page label — renders with aria-current="page".',
        },
        {
          name: 'Breadcrumb.Separator',
          type: 'LiHTMLAttributes<HTMLLIElement>',
          description: 'Visual divider between items — defaults to a chevron; pass children to override.',
        },
        {
          name: 'Breadcrumb.Ellipsis',
          type: 'HTMLAttributes<HTMLSpanElement>',
          description: 'Collapsed-trail indicator with sr-only "More" text.',
        },
      ],
    },
    {
      title: 'Breadcrumb.Auto',
      rows: [
        {
          name: 'items',
          type: 'BreadcrumbAutoItem[]',
          description: 'Trail data — each item is `{ label, href?, isCurrent?, key? }`.',
        },
        {
          name: 'maxItems',
          type: 'number',
          defaultValue: '5',
          description: 'Full item count under which the trail renders uncollapsed.',
        },
        {
          name: 'itemsBeforeCollapse',
          type: 'number',
          defaultValue: '1',
          description: 'Items always kept visible at the start of the trail when collapsed.',
        },
        {
          name: 'itemsAfterCollapse',
          type: 'number',
          defaultValue: '2',
          description: 'Items always kept visible at the end of the trail when collapsed.',
        },
        {
          name: 'separator',
          type: 'ReactNode',
          description: 'Custom divider node passed to every `Breadcrumb.Separator`.',
        },
      ],
    },
  ],
  features: [
    'Compound API — Breadcrumb.List/Item/Link/Page/Separator/Ellipsis compose like Radix primitives.',
    'Breadcrumb.Auto auto-collapses long, data-driven trails past `maxItems`, folding the middle behind a clickable ellipsis.',
    'Clicking the ellipsis expands the full trail in place with a gated fade/reflow transition.',
    'Custom separators via children on `Breadcrumb.Separator` or the `separator` prop on `Breadcrumb.Auto`.',
    'Reduced-motion aware — collapse/expand transitions become instant under `prefers-reduced-motion`.',
  ],
  keyboard: [
    { keys: 'Tab', description: 'Move focus between links and the expand-ellipsis button.' },
    { keys: 'Enter / Space', description: 'Activate a focused link, or expand the trail from the ellipsis button.' },
  ],
  aria: [
    { attribute: 'aria-label="breadcrumb"', element: 'nav (Breadcrumb root)', purpose: 'Announces the trail as a navigation landmark.' },
    { attribute: 'aria-current="page"', element: 'Breadcrumb.Page / current Breadcrumb.Auto item', purpose: 'Identifies the current page in the trail.' },
    { attribute: 'role="presentation" aria-hidden="true"', element: 'Breadcrumb.Separator', purpose: 'Hides purely visual dividers from assistive tech.' },
    { attribute: 'aria-label="Show all breadcrumb items"', element: 'Breadcrumb.Auto ellipsis button', purpose: 'Names the collapse-expand control for screen readers.' },
  ],
  a11yNotes: [
    'Breadcrumb.Ellipsis includes visually hidden "More" text; in Breadcrumb.Auto the ellipsis is wrapped in a real, focusable, labeled button.',
    'All links carry a visible focus-visible ring.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/breadcrumb/breadcrumb.tsx',
    'packages/ui/src/components/foundation/breadcrumb/index.ts',
  ],
};
