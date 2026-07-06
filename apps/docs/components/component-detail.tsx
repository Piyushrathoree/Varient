'use client';

import Link from 'next/link';
import { AnchorProvider, TOCItem } from 'fumadocs-core/toc';
import { Check, ChevronRight, Code2, Eye, Package, Terminal } from 'lucide-react';
import { Badge, Tabs, cn } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import { layerLabels } from '@/lib/components/registry';
import { getDemo } from '@/lib/components/demos';
import { PreviewFrame } from '@/components/preview/preview-frame';
import {
  PropsTable,
  badgeProps,
  buttonProps,
  cardProps,
  inputProps,
  numberTickerProps,
  switchProps,
  tabsProps,
  type PropRow,
} from '@/components/docs/props-table';
import { CopyButton } from '@/components/site/copy-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const propsBySlug: Record<string, PropRow[]> = {
  button: buttonProps,
  input: inputProps,
  switch: switchProps,
  tabs: tabsProps,
  badge: badgeProps,
  card: cardProps,
  'number-ticker': numberTickerProps,
};

const usageBySlug: Record<string, string> = {
  button: `import { Button } from '@varient/ui'

export default function Demo() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  )
}`,
  input: `import { Input } from '@varient/ui'

export default function Demo() {
  return (
    <Input
      label="Email"
      placeholder="you@example.com"
      helperText="We'll never share your email."
    />
  )
}`,
  switch: `import { useState } from 'react'
import { Switch } from '@varient/ui'

export default function Demo() {
  const [checked, setChecked] = useState(true)

  return <Switch isChecked={checked} onChange={setChecked} label="Auto-save" />
}`,
  tabs: `import { Tabs } from '@varient/ui'

export default function Demo() {
  return (
    <Tabs defaultValue="overview" variant="pills">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">Overview panel.</Tabs.Content>
      <Tabs.Content value="usage">Usage panel.</Tabs.Content>
    </Tabs>
  )
}`,
  badge: `import { Badge } from '@varient/ui'

export default function Demo() {
  return (
    <div className="flex gap-2">
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
    </div>
  )
}`,
  card: `import { Button, Card } from '@varient/ui'

export default function Demo() {
  return (
    <Card isHoverable>
      <Card.Header>
        <Card.Title>Pro plan</Card.Title>
        <Card.Description>
          Everything in Free, plus priority support.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button variant="primary" size="sm">
          Upgrade
        </Button>
      </Card.Footer>
    </Card>
  )
}`,
  'number-ticker': `import { NumberTicker } from '@varient/ui'

export default function Demo() {
  return <NumberTicker value={75} suffix="+" />
}`,
};

interface KeyboardRow {
  key: string;
  description: string;
}

interface AriaRow {
  attribute: string;
  element: string;
  purpose: string;
}

interface ComponentDocContent {
  features: string[];
  accessibility: {
    keyboard?: KeyboardRow[];
    aria?: AriaRow[];
    notes?: string[];
  };
}

// Authored from the real source in packages/ui/src/components — not
// auto-generated, so every claim here is checked against the implementation.
const contentBySlug: Record<string, ComponentDocContent> = {
  button: {
    features: [
      '9 variants — default, primary, secondary, ghost, outline, destructive, link, sweep, and frame.',
      '5 sizes, from xs to xl.',
      "Loading state swaps the label for a spinner and sets aria-busy, without changing the button's footprint.",
      'Optional leftIcon / rightIcon slots.',
      'asChild merges button styles and behavior onto a custom element (e.g. a Next.js Link) via Radix Slot.',
    ],
    accessibility: {
      keyboard: [
        { key: 'Tab', description: 'Moves focus to the button.' },
        { key: 'Enter / Space', description: 'Activates the button — native <button> behavior.' },
      ],
      aria: [
        { attribute: 'aria-disabled', element: 'Button', purpose: 'Set when isDisabled is true.' },
        { attribute: 'aria-busy', element: 'Button', purpose: 'Set while isLoading is true.' },
        { attribute: 'disabled', element: 'Button', purpose: 'Native attribute — removes the button from the tab order while disabled or loading.' },
      ],
      notes: [
        'A visually-hidden "Loading" label replaces the children while isLoading, so screen readers announce the state change instead of silence.',
      ],
    },
  },
  input: {
    features: [
      'Optional label with a required-field asterisk.',
      'Helper text and error text — an error takes over and switches the field into its error styling.',
      'leftAddon / rightAddon slots for icons or inline content.',
      '3 sizes (sm, md, lg) and a frame variant with a gradient-rimmed focus glow.',
      'Disabled, read-only, and required states map straight to native attributes.',
      'Generates an id via useId() when none is passed, so label/helper/error wiring always works.',
    ],
    accessibility: {
      keyboard: [
        { key: 'Tab', description: 'Moves focus into and out of the field.' },
        { key: 'Standard text-editing keys', description: 'Native <input> behavior — no custom key handling.' },
      ],
      aria: [
        { attribute: 'aria-invalid', element: 'Input', purpose: 'Set when errorText is present.' },
        { attribute: 'aria-describedby', element: 'Input', purpose: 'Points to the helper and/or error text ids.' },
        { attribute: 'role="alert"', element: 'Error text', purpose: 'Announces the error message as soon as it appears.' },
        { attribute: 'htmlFor / id', element: 'Label ↔ Input', purpose: 'Programmatic label association, generated automatically if no id is passed.' },
      ],
      notes: ['Only a border/ring color transition runs on focus — there is no motion to guard.'],
    },
  },
  switch: {
    features: [
      'A real <button role="switch"> — Enter/Space activation and focus handling come from the browser for free.',
      'Controlled API: isChecked + onChange(checked).',
      '3 sizes (sm, md, lg) with a matched thumb travel distance per size.',
      'Optional inline label, linked to the control via htmlFor/id.',
      'Disabled state.',
    ],
    accessibility: {
      keyboard: [
        { key: 'Tab', description: 'Moves focus to the switch.' },
        { key: 'Space / Enter', description: 'Toggles the switch — native button semantics.' },
      ],
      aria: [
        { attribute: 'role="switch"', element: 'Button', purpose: 'Identifies the control as a two-state toggle.' },
        { attribute: 'aria-checked', element: 'Button', purpose: 'Reflects the current on/off state.' },
        { attribute: 'aria-label', element: 'Button', purpose: 'Falls back to "Toggle" when no visible label is passed.' },
      ],
      notes: ['Thumb slide and track color transition are skipped under prefers-reduced-motion.'],
    },
  },
  tabs: {
    features: [
      'Compound API — Tabs, Tabs.List, Tabs.Trigger, Tabs.Content.',
      'Controlled (value / onValueChange) or uncontrolled (defaultValue).',
      '2 visual variants: underline and pills.',
      'Roving-tabindex arrow-key navigation — the WAI-ARIA APG "automatic activation" tabs pattern.',
      'Full ARIA wiring generated from one shared useId() base per Tabs instance.',
    ],
    accessibility: {
      keyboard: [
        { key: 'Tab', description: 'Moves focus into the tablist (landing on the selected tab), and out to the panel.' },
        { key: 'Arrow Right / Left', description: 'Moves focus to and selects the next/previous tab, wrapping at the ends.' },
        { key: 'Home / End', description: 'Jumps to and selects the first/last tab.' },
      ],
      aria: [
        { attribute: 'role="tablist"', element: 'Tabs.List', purpose: 'Groups the tab buttons.' },
        { attribute: 'role="tab" / aria-selected', element: 'Tabs.Trigger', purpose: 'Identifies each tab and its selected state.' },
        { attribute: 'aria-controls', element: 'Tabs.Trigger', purpose: "Points to the tab's panel id." },
        { attribute: 'role="tabpanel" / aria-labelledby', element: 'Tabs.Content', purpose: 'Associates each panel back to its triggering tab.' },
      ],
      notes: ['Trigger and content color transitions respect motion-reduce:transition-none.'],
    },
  },
  badge: {
    features: [
      '7 variants — default, primary, secondary, success, warning, danger, outline — each a tinted wash with matching ink, never a solid fill.',
      '3 sizes (sm, md, lg).',
      'Renders as an inline <span>, so it composes with icons and sits inline with text or inside buttons/card headers.',
      'Purely presentational — no internal state or event handlers.',
    ],
    accessibility: {
      notes: [
        'Badge is not interactive and carries no keyboard or ARIA role by default.',
        'When a badge is the only signal of status, pair it with visible text (as in the demo — "Verified", "New") rather than an icon alone, so meaning is not conveyed by color alone.',
      ],
    },
  },
  card: {
    features: [
      'Compound API — Card, Card.Header, Card.Title, Card.Description, Card.Body, Card.Footer.',
      '3 variants — default (hairline surface + shadow), outline, ghost.',
      'isHoverable lifts and brightens the border on hover, for cards sitting in a browsable grid.',
      'isClickable turns the card into a keyboard-activatable target without changing it to a <button> element.',
    ],
    accessibility: {
      keyboard: [
        { key: 'Tab', description: 'Moves focus to the card — only when isClickable is set.' },
        { key: 'Enter / Space', description: "Triggers the card's onClick by dispatching a real click event — only when isClickable is set." },
      ],
      aria: [
        { attribute: 'role="button"', element: 'Card', purpose: 'Added only when isClickable is true.' },
        { attribute: 'tabIndex="0"', element: 'Card', purpose: 'Added only when isClickable is true — otherwise the card is not in the tab order.' },
      ],
      notes: [
        'Hover lift and press scale are skipped via motion-reduce:transition-none.',
        'A non-clickable Card has no interactive semantics — it is a plain, static container.',
      ],
    },
  },
  'number-ticker': {
    features: [
      'Counts up from 0 to value once it scrolls into view — fires once, via useInView.',
      'Optional prefix / suffix and a fixed decimalPlaces.',
      'Configurable duration (seconds) with an eased count-up curve.',
      'tabular-nums keeps digit width stable so surrounding layout never jitters mid-count.',
    ],
    accessibility: {
      aria: [
        { attribute: 'aria-hidden="true"', element: 'Animating digits', purpose: 'Hides the mid-count ticking from assistive tech.' },
        { attribute: 'sr-only span', element: 'Final value', purpose: 'Announces the finished prefix + value + suffix exactly once.' },
      ],
      notes: [
        'Under prefers-reduced-motion, the count jumps straight to the final value instead of animating (via Motion’s useReducedMotion).',
      ],
    },
  },
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface ComponentDetailProps {
  entry: ComponentEntry;
}

export function ComponentDetail({ entry }: ComponentDetailProps) {
  const Demo = getDemo(entry.slug);
  const props = propsBySlug[entry.slug];
  const content = contentBySlug[entry.slug];
  const usage =
    usageBySlug[entry.slug] ?? `import { ${entry.name} } from '@varient/ui'\n\n<${entry.name} />\n`;

  const varientCommand = `npx varient add ${entry.slug}`;
  const shadcnCommand = `npx shadcn@latest add @varient/${entry.slug}`;

  const hasKeyboard = Boolean(content?.accessibility.keyboard?.length);
  const hasAria = Boolean(content?.accessibility.aria?.length);
  const hasA11yNotes = Boolean(content?.accessibility.notes?.length);
  const hasAccessibility = hasKeyboard || hasAria || hasA11yNotes;
  const hasFeatures = Boolean(content?.features.length);

  const tocItems = [
    { title: 'Preview', url: '#preview' },
    { title: 'Installation', url: '#installation' },
    hasFeatures && { title: 'Features', url: '#features' },
    hasAccessibility && { title: 'Accessibility', url: '#accessibility' },
    props && { title: 'Props', url: '#props' },
  ].filter((item): item is { title: string; url: string } => Boolean(item));

  return (
    <div className="mx-auto flex w-full max-w-5xl gap-10 px-6 py-14 xl:px-8">
      <article className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link
            href="/components"
            className={cn('rounded-lg transition-colors duration-150 hover:text-foreground', focusRing)}
          >
            Components
          </Link>
          <ChevronRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          <span className="text-foreground">{entry.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" size="sm">
            {layerLabels[entry.layer]}
          </Badge>
          <Badge variant="primary" size="sm">
            Shipped
          </Badge>
        </div>
        <h1 className="font-display mb-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {entry.name}
        </h1>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {entry.description}
        </p>

        {/* Live preview stage — dotted canvas, Preview/Code tabs */}
        <section className="mb-14">
          <h2 id="preview" className="sr-only scroll-mt-24">
            Preview
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-background">
            <Tabs defaultValue="preview" variant="pills">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-3 py-2">
                <Tabs.List aria-label="Preview and code">
                  <Tabs.Trigger value="preview" className="gap-1.5">
                    <Eye className="size-3.5" strokeWidth={1.75} aria-hidden />
                    Preview
                  </Tabs.Trigger>
                  <Tabs.Trigger value="code" className="gap-1.5">
                    <Code2 className="size-3.5" strokeWidth={1.75} aria-hidden />
                    Code
                  </Tabs.Trigger>
                </Tabs.List>
                <CopyButton text={usage} />
              </div>

              <Tabs.Content value="preview">
                <PreviewFrame minHeight="lg" className="rounded-none border-0">
                  {Demo ? (
                    <Demo />
                  ) : (
                    <p className="text-sm text-muted-foreground">Preview not available yet.</p>
                  )}
                </PreviewFrame>
              </Tabs.Content>

              <Tabs.Content value="code">
                <pre className="max-h-[32rem] overflow-auto bg-muted/20 p-6 font-mono text-sm leading-relaxed text-foreground/90">
                  <code>{usage}</code>
                </pre>
              </Tabs.Content>
            </Tabs>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-14">
          <h2
            id="installation"
            className="font-display mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
          >
            Installation
          </h2>

          <Tabs defaultValue="varient" variant="pills">
            <Tabs.List aria-label="Installation method" className="mb-4">
              <Tabs.Trigger value="varient" className="gap-1.5">
                <Terminal className="size-3.5" strokeWidth={1.75} aria-hidden />
                Varient CLI
              </Tabs.Trigger>
              <Tabs.Trigger value="shadcn" className="gap-1.5">
                <Package className="size-3.5" strokeWidth={1.75} aria-hidden />
                shadcn CLI
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="varient">
              <CommandRow command={varientCommand} />
            </Tabs.Content>

            <Tabs.Content value="shadcn">
              <CommandRow command={shadcnCommand} />
            </Tabs.Content>
          </Tabs>
        </section>

        {/* Features */}
        {hasFeatures && (
          <section className="mb-14">
            <h2
              id="features"
              className="font-display mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
            >
              Features
            </h2>
            <ul className="flex flex-col gap-2.5">
              {content?.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Accessibility */}
        {hasAccessibility && (
          <section className="mb-14">
            <h2
              id="accessibility"
              className="font-display mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
            >
              Accessibility
            </h2>

            {hasKeyboard && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Keyboard interactions</h3>
                <InfoTable
                  columns={['Key', 'Description']}
                  rows={(content?.accessibility.keyboard ?? []).map((row) => [row.key, row.description])}
                />
              </div>
            )}

            {hasAria && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-foreground">ARIA attributes</h3>
                <InfoTable
                  columns={['Attribute', 'Element', 'Purpose']}
                  rows={(content?.accessibility.aria ?? []).map((row) => [row.attribute, row.element, row.purpose])}
                />
              </div>
            )}

            {hasA11yNotes && (
              <ul className="flex flex-col gap-2">
                {content?.accessibility.notes?.map((note) => (
                  <li key={note} className="text-sm leading-relaxed text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Props */}
        {props && (
          <section className="mb-4">
            <h2
              id="props"
              className="font-display mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground"
            >
              Props
            </h2>
            <PropsTable props={props} />
          </section>
        )}

        {/* Footer nav */}
        <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
          <Link
            href="/components"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground',
              focusRing,
            )}
          >
            <ChevronRight className="size-3.5 rotate-180" strokeWidth={1.75} aria-hidden />
            All components
          </Link>
        </div>
      </article>

      <TableOfContents items={tocItems} />
    </div>
  );
}

function CommandRow({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-5 py-3.5">
      <span aria-hidden className="select-none text-muted-foreground">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap text-foreground">
        {command}
      </code>
      <CopyButton text={command} />
    </div>
  );
}

function InfoTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto overflow-hidden rounded-xl border border-border">
      <table className="w-full min-w-[28rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 text-left">
            {columns.map((column) => (
              <th key={column} className="px-4 py-2.5 font-medium text-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-border last:border-0">
              {row.map((cell, cellIndex) => (
                <td
                  // biome-ignore lint/suspicious/noArrayIndexKey: cells within a row are stable and never reordered
                  key={cellIndex}
                  className={cn(
                    'px-4 py-2.5 align-top',
                    cellIndex === 0
                      ? 'font-mono text-xs whitespace-nowrap text-brand'
                      : 'text-muted-foreground',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface TocEntry {
  title: string;
  url: string;
}

/**
 * Right-rail "On this page" — sticky nav with an accent trail (a hairline
 * track per row, painted brand-color on the active section) and scroll-spy
 * driven by fumadocs-core's IntersectionObserver-based AnchorProvider/
 * TOCItem (already a project dependency via fumadocs).
 */
function TableOfContents({ items }: { items: TocEntry[] }) {
  const prefersReducedMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <aside className="sticky top-24 hidden h-fit w-48 shrink-0 xl:block">
      <AnchorProvider single toc={items.map((item) => ({ title: item.title, url: item.url, depth: 2 }))}>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.url} className="relative">
              <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-border" />
              <TOCItem
                className={cn(
                  'group relative block py-1.5 pl-4 text-sm text-muted-foreground transition-colors duration-150',
                  'hover:text-foreground',
                  'data-[active=true]:font-medium data-[active=true]:text-foreground',
                  focusRing,
                )}
                href={item.url}
                onClick={(event) => {
                  const id = item.url.slice(1);
                  const target = document.getElementById(id);
                  if (!target) return;
                  event.preventDefault();
                  target.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start',
                  });
                  window.history.replaceState(null, '', item.url);
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0.5 left-0 w-px bg-transparent transition-colors duration-150 group-data-[active=true]:bg-brand"
                />
                {item.title}
              </TOCItem>
            </li>
          ))}
        </ul>
      </AnchorProvider>
    </aside>
  );
}
