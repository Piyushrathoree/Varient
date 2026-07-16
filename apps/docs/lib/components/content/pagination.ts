import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `'use client';

import { useState } from 'react';
import { Pagination } from '@varient/ui';

export function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      pageCount={12}
      onPageChange={setPage}
      siblingCount={1}
      showEdges
    />
  );
}`,
  props: [
    {
      title: 'Pagination',
      rows: [
        { name: 'page', type: 'number', description: 'Current page — 1-based.' },
        { name: 'pageCount', type: 'number', description: 'Total number of pages.' },
        {
          name: 'onPageChange',
          type: '(page: number) => void',
          description: 'Called when the user selects a page or clicks Previous/Next.',
        },
        {
          name: 'siblingCount',
          type: 'number',
          defaultValue: '1',
          description: 'How many page numbers to show on each side of the current page.',
        },
        {
          name: 'showEdges',
          type: 'boolean',
          defaultValue: 'true',
          description: 'When truncating, always include the first and last page with ellipsis gaps.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root nav.',
        },
      ],
    },
    {
      title: 'Pagination.Button',
      rows: [
        {
          name: 'isActive',
          type: 'boolean',
          defaultValue: 'false',
          description:
            'Marks the button as the current page — renders the sliding brand-color indicator and sets aria-current="page".',
        },
      ],
    },
  ],
  features: [
    'Fully controlled — page/pageCount/onPageChange, no internal page state',
    'Ellipsis truncation with siblingCount and showEdges to tune how many numbers show around the active page',
    'Previous/Next buttons disable automatically at the first and last page',
    "The active page's fill is a single motion.span sliding between buttons via a shared layoutId (mirrors Tabs' indicator) — SPRING_DEFAULT normally, an instant snap under prefers-reduced-motion",
    'Pagination.Button and Pagination.Ellipsis are exported standalone for building custom layouts',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between pagination controls' },
    { keys: 'Enter / Space', description: 'Activates the focused page or navigation button' },
  ],
  aria: [
    { attribute: 'aria-label="pagination"', element: 'nav (root)', purpose: 'Announces the control as a navigation landmark.' },
    { attribute: 'aria-current="page"', element: 'Pagination.Button (active)', purpose: 'Identifies the current page to assistive tech.' },
    { attribute: 'aria-label', element: 'Pagination.Button (prev/next/numbered)', purpose: 'Gives every control an unambiguous accessible name ("Go to page N", etc).' },
    { attribute: 'aria-hidden', element: 'Pagination.Ellipsis', purpose: 'Hides the decorative "…" glyph while an sr-only "More pages" label stands in for it.' },
  ],
  a11yNotes: [
    'Disabled Previous/Next at boundaries use the native disabled attribute, removing them from the tab order.',
    'All controls receive a visible focus ring via focus-visible:ring-ring.',
    'The sliding active-page indicator is aria-hidden and purely decorative — page state is communicated via aria-current.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/pagination/pagination.tsx',
    'packages/ui/src/components/foundation/pagination/index.ts',
  ],
};
