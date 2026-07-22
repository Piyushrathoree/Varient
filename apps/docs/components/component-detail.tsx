'use client';

import Link from 'next/link';
import { AnchorProvider, TOCItem } from 'fumadocs-core/toc';
import { Check, ChevronRight, Code2, Eye, Package, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Badge, Tabs, cn } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import {
  getAdjacentInCategory,
  getCategoryHref,
  getComponentHref,
  layerLabels,
} from '@/lib/components/registry';
import { getDemo } from '@/lib/components/demos';
import { PreviewStage } from '@/components/preview/preview-stage';
import { PropsTable } from '@/components/docs/props-table';
import { CopyButton } from '@/components/site/copy-button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { SITE_URL } from '@/lib/shared';
import type { ComponentDocContent } from '@/lib/components/content-types';
import type { HighlightedSource } from '@/lib/components/source';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface ComponentDetailProps {
  entry: ComponentEntry;
  content?: ComponentDocContent;
  sources: HighlightedSource[];
}

export function ComponentDetail({ entry, content, sources }: ComponentDetailProps) {
  const Demo = getDemo(entry.slug);
  const { prev, next } = getAdjacentInCategory(entry.slug);
  const categoryHref = getCategoryHref(entry.layer, entry.category);
  const isSection = entry.layer === 'sections';

  const fallbackComponentName = entry.name.replace(/[^a-zA-Z0-9]/g, '');
  const usage =
    content?.usage ?? `import { ${fallbackComponentName} } from '@varient/ui'\n\n<${fallbackComponentName} />\n`;

  const shadcnCommand = `npx shadcn@latest add ${SITE_URL}/r/${entry.slug}.json`;
  const hasDependencies = Boolean(content?.dependencies?.length);

  const hasKeyboard = Boolean(content?.keyboard?.length);
  const hasAria = Boolean(content?.aria?.length);
  const hasA11yNotes = Boolean(content?.a11yNotes?.length);
  const hasAccessibility = hasKeyboard || hasAria || hasA11yNotes;
  const hasFeatures = Boolean(content?.features?.length);
  const hasProps = Boolean(content?.props?.length);

  const tocItems = [
    { title: 'Preview', url: '#preview' },
    { title: 'Installation', url: '#installation' },
    hasFeatures && { title: 'Features', url: '#features' },
    hasAccessibility && { title: 'Accessibility', url: '#accessibility' },
    hasProps && { title: 'Props', url: '#props' },
  ].filter((item): item is { title: string; url: string } => Boolean(item));

  return (
    <div className="mx-auto flex w-full max-w-5xl gap-10 px-6 py-14 xl:px-8">
      <article className="min-w-0 flex-1">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <Link
            href="/components"
            className={cn('rounded-lg transition-colors duration-150 hover:text-foreground', focusRing)}
          >
            Components
          </Link>
          <ChevronRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          <Link
            href={categoryHref}
            className={cn('rounded-lg transition-colors duration-150 hover:text-foreground', focusRing)}
          >
            {entry.category}
          </Link>
          <ChevronRight className="size-3.5" strokeWidth={1.75} aria-hidden />
          <span className="text-brand">{entry.name}</span>
        </nav>

        {/* Header */}
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
          {`// ${entry.category}`}
        </p>
        <h1 className="font-title mb-5 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          {entry.name}
        </h1>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" size="sm" className="font-mono uppercase tracking-wide">
            {layerLabels[entry.layer]}
          </Badge>
          <Badge variant="outline" size="sm" className="font-mono uppercase tracking-wide">
            {entry.category}
          </Badge>
          <Badge variant="primary" size="sm" className="font-mono uppercase tracking-wide">
            Shipped
          </Badge>
          {entry.isNew && (
            <Badge
              size="sm"
              className="border border-brand/30 bg-brand/10 font-mono text-[9px] uppercase tracking-wider text-brand"
            >
              New
            </Badge>
          )}
        </div>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-smooth-900">
          {entry.description}
        </p>

        {/* Live preview stage — dotted canvas, Preview/Code pill tabs */}
        <section className="mb-14">
          <h2 id="preview" className="sr-only scroll-mt-24">
            Preview
          </h2>
          <div className="overflow-hidden rounded-xl border border-border bg-smooth-100">
            <Tabs defaultValue="preview" variant="underline">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-smooth-50 px-3 py-2">
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
                <CopyButton text={usage} className="hover:border-brand/40 hover:text-brand" />
              </div>

              <Tabs.Content value="preview">
                <PreviewStage
                  minHeight={isSection ? 'section' : 'lg'}
                  alignTop={isSection}
                  stageKey={entry.slug}
                  className="rounded-none border-0"
                >
                  {Demo ? (
                    <Demo />
                  ) : (
                    <p className="text-sm text-muted-foreground">Preview not available yet.</p>
                  )}
                </PreviewStage>
              </Tabs.Content>

              <Tabs.Content value="code">
                <SourceCodeTabs sources={sources} />
              </Tabs.Content>
            </Tabs>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-14">
          <h2
            id="installation"
            className="font-title mb-4 scroll-mt-24 text-xl font-semibold tracking-[-0.03em] text-foreground"
          >
            Installation
          </h2>

          <Tabs defaultValue="copy-source" variant="underline">
            <Tabs.List aria-label="Installation method" className="mb-4">
              <Tabs.Trigger value="copy-source" className="gap-1.5">
                <Terminal className="size-3.5" strokeWidth={1.75} aria-hidden />
                Copy source
              </Tabs.Trigger>
              <Tabs.Trigger value="shadcn" className="gap-1.5">
                <Package className="size-3.5" strokeWidth={1.75} aria-hidden />
                shadcn CLI
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="copy-source">
              <p className="mb-3 text-sm text-muted-foreground">
                Copy the source from the Code tab above and drop it into your project.
              </p>
              {hasDependencies ? (
                <CommandRow command={`bun add ${content!.dependencies!.join(' ')}`} />
              ) : (
                <p className="text-sm text-muted-foreground">No extra dependencies.</p>
              )}
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
              className="font-title mb-4 scroll-mt-24 text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
              Features
            </h2>
            <ul className="flex flex-col gap-2.5">
              {content?.features?.map((feature) => (
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
              className="font-title mb-4 scroll-mt-24 text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
              Accessibility
            </h2>

            {hasKeyboard && (
              <div className="mb-6">
                <h3 className="font-title mb-3 text-sm font-semibold text-foreground">Keyboard interactions</h3>
                <InfoTable
                  columns={['Key', 'Description']}
                  rows={(content?.keyboard ?? []).map((row) => [row.keys, row.description])}
                />
              </div>
            )}

            {hasAria && (
              <div className="mb-6">
                <h3 className="font-title mb-3 text-sm font-semibold text-foreground">ARIA attributes</h3>
                <InfoTable
                  columns={['Attribute', 'Element', 'Purpose']}
                  rows={(content?.aria ?? []).map((row) => [row.attribute, row.element, row.purpose])}
                />
              </div>
            )}

            {hasA11yNotes && (
              <ul className="flex flex-col gap-2">
                {content?.a11yNotes?.map((note) => (
                  <li key={note} className="text-sm leading-relaxed text-muted-foreground">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Props */}
        {hasProps && (
          <section className="mb-4">
            <h2
              id="props"
              className="font-title mb-4 scroll-mt-24 text-xl font-semibold tracking-[-0.03em] text-foreground"
            >
              Props
            </h2>
            {content?.props?.map((table, index) => (
              <div key={table.title ?? index}>
                {table.title && (
                  <h3 className="font-title mb-3 text-sm font-semibold text-foreground">{table.title}</h3>
                )}
                <PropsTable props={table.rows} />
              </div>
            ))}
          </section>
        )}

        {/* Footer nav — prev/next within category */}
        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          {prev && getComponentHref(prev) ? (
            <Link
              href={getComponentHref(prev)!}
              className={cn(
                'group inline-flex max-w-xs flex-col gap-0.5 rounded-xl border border-border bg-card px-4 py-3 transition-[border-color,transform] duration-200 hover:border-brand/40 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                focusRing,
              )}
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronRight className="size-3 rotate-180" strokeWidth={1.75} aria-hidden />
                Previous
              </span>
              <span className="truncate font-medium text-foreground group-hover:text-brand">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={categoryHref}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground',
              focusRing,
            )}
          >
            Back to {entry.category}
          </Link>

          {next && getComponentHref(next) ? (
            <Link
              href={getComponentHref(next)!}
              className={cn(
                'group inline-flex max-w-xs flex-col items-end gap-0.5 rounded-xl border border-border bg-card px-4 py-3 text-right transition-[border-color,transform] duration-200 hover:border-brand/40 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
                focusRing,
              )}
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="truncate font-medium text-foreground group-hover:text-brand">
                {next.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </article>

      <TableOfContents items={tocItems} />
    </div>
  );
}

/**
 * The Code tab body — a file-tab strip (only shown when there's more than one
 * source file) over the shiki-highlighted HTML, with line numbers via a
 * scoped CSS counter and a sticky copy button for the active file's raw code.
 */
function SourceCodeTabs({ sources }: { sources: HighlightedSource[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (sources.length === 0) {
    return <p className="p-6 text-sm text-muted-foreground">Source not available yet.</p>;
  }

  const active = sources[Math.min(activeIndex, sources.length - 1)];

  return (
    <div className="flex flex-col">
      <style>{`
        .varient-code-lines { counter-reset: line; }
        .varient-code-lines .line {
          position: relative;
          display: block;
          padding-left: 2.75rem;
        }
        .varient-code-lines .line::before {
          counter-increment: line;
          content: counter(line);
          position: absolute;
          left: 0;
          width: 2rem;
          text-align: right;
          color: var(--color-muted-foreground);
          opacity: 0.4;
          user-select: none;
        }
      `}</style>

      {sources.length > 1 && (
        <div className="flex flex-wrap gap-1 border-b border-border bg-smooth-50 px-3 py-2">
          {sources.map((source, index) => (
            <button
              key={source.fileName}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-xs transition-colors duration-150',
                index === activeIndex
                  ? 'bg-primary text-brand'
                  : 'text-muted-foreground hover:text-foreground',
                focusRing,
              )}
            >
              {source.fileName}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <CopyButton
          text={active.code}
          className="absolute right-3 top-3 z-10 hover:border-brand/40 hover:text-brand"
        />
        <div
          className="varient-code-lines max-h-[36rem] overflow-auto bg-smooth-50 p-6 font-mono text-sm leading-relaxed text-foreground/90"
          dangerouslySetInnerHTML={{ __html: active.html }}
        />
      </div>
    </div>
  );
}

function CommandRow({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-smooth-100 px-5 py-3.5">
      <span aria-hidden className="select-none font-mono text-brand">
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-sm whitespace-nowrap text-foreground">
        {command}
      </code>
      <CopyButton text={command} className="hover:border-brand/40 hover:text-brand" />
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
