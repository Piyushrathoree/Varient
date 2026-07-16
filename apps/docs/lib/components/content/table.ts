import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { Table } from '@/components/foundation/table';

export function Example() {
  return (
    <Table variant="striped" size="compact" isStickyHeader className="max-h-72">
      <Table.Caption>A list of your recent invoices.</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Invoice</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head className="text-right">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell className="font-medium">INV-001</Table.Cell>
          <Table.Cell>Paid</Table.Cell>
          <Table.Cell className="text-right">$250.00</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}`,
  props: [
    {
      title: 'Table',
      rows: [
        {
          name: 'variant',
          type: "'default' | 'striped'",
          defaultValue: "'default'",
          description: '`striped` tints odd Table.Body rows with bg-muted/30.',
        },
        {
          name: 'size',
          type: "'default' | 'compact'",
          defaultValue: "'default'",
          description: '`compact` tightens Table.Head height (h-8 px-3) and Table.Cell padding (px-3 py-1.5).',
        },
        {
          name: 'isStickyHeader',
          type: 'boolean',
          defaultValue: 'false',
          description: 'Pins Table.Header to the top of the root\'s own scroll container (sticky top-0, bg-background/95, backdrop-blur-sm).',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional Tailwind classes merged via cn(), applied to the root scroll wrapper (e.g. max-h-* to make isStickyHeader scroll).',
        },
      ],
    },
    {
      title: 'Table.Header / Table.Body / Table.Footer / Table.Row / Table.Head / Table.Cell / Table.Caption',
      rows: [
        {
          name: 'Table.Header',
          type: 'HTMLAttributes<HTMLTableSectionElement>',
          description: '`<thead>` — header cells use bg-muted/50; reads isStickyHeader from the nearest Table root via context.',
        },
        {
          name: 'Table.Body',
          type: 'HTMLAttributes<HTMLTableSectionElement>',
          description: '`<tbody>` — hover:bg-muted/30 and hairline row dividers; reads variant from context for striping.',
        },
        {
          name: 'Table.Footer',
          type: 'HTMLAttributes<HTMLTableSectionElement>',
          description: '`<tfoot>` — muted background for totals or summary rows.',
        },
        {
          name: 'Table.Row',
          type: 'HTMLAttributes<HTMLTableRowElement>',
          description: 'Table row — border-b border-border divider between rows.',
        },
        {
          name: 'Table.Head',
          type: 'ThHTMLAttributes<HTMLTableCellElement>',
          description: 'Header cell — scope="col" default; height/padding follow the root\'s size via context.',
        },
        {
          name: 'Table.Cell',
          type: 'TdHTMLAttributes<HTMLTableCellElement>',
          description: 'Data cell — padding follows the root\'s size via context (px-4 py-3 default, px-3 py-1.5 compact).',
        },
        {
          name: 'Table.Caption',
          type: 'HTMLAttributes<HTMLTableCaptionElement>',
          description: 'Table caption — renders below the table for assistive tech.',
        },
      ],
    },
  ],
  features: [
    'Fully semantic compound API — `Table`, `Table.Header`, `Table.Body`, `Table.Footer`, `Table.Row`, `Table.Head`, `Table.Cell`, `Table.Caption` compose from real `<table>`/`<thead>`/`<tbody>` elements.',
    '`variant="striped"` and `size="compact"` are set once on the root and flow to every `Table.Head`/`Table.Cell`/`Table.Body` through React context — no prop drilling to each cell.',
    '`isStickyHeader` pins `Table.Header` to the top of the root\'s own scroll container (the same div that already provides `overflow-x-auto`); pair with a `max-h-*` className on the root to make it scroll vertically.',
    'Root wrapper is `rounded-xl border border-border` with `overflow-x-auto`, so wide tables scroll horizontally instead of breaking the page layout.',
    'Body rows get `hover:bg-muted/30` and hairline dividers by default; the last body row drops its bottom border.',
    'Every sub-component is a `forwardRef` around its native element and accepts the matching native attributes (`ThHTMLAttributes`, `TdHTMLAttributes`, etc.), so `onClick`, `colSpan`, `id`, `headers`, and other native props pass straight through.',
  ],
  aria: [
    {
      attribute: 'scope="col"',
      element: 'Table.Head',
      purpose: 'Default scope — associates the header cell with its column for assistive tech.',
    },
    {
      attribute: 'scope="row"',
      element: 'Table.Head (opt-in)',
      purpose: 'Pass scope="row" to a Table.Head rendered inside Table.Body to label a row instead of a column.',
    },
  ],
  a11yNotes: [
    'Use `Table.Caption` to give the table a concise, screen-reader-visible description.',
    'Pair header cells with data cells using `id` on headers and `headers` on cells when relationships are non-trivial (e.g. multi-level headers).',
    '`isStickyHeader` only changes CSS `position`; it does not reorder the DOM or affect how assistive tech reads the table.',
  ],
  sourceFiles: [
    'packages/ui/src/components/foundation/table/table.tsx',
    'packages/ui/src/components/foundation/table/index.ts',
  ],
};
