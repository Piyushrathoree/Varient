'use client';

import Link from 'next/link';
import { ChevronRight, Code2, Eye, List, Terminal } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import { layerLabels } from '@/lib/components/registry';
import { ComponentPreview } from '@/components/preview/component-preview';
import { PropsTable, buttonProps, inputProps } from '@/components/docs/props-table';
import { CopyButton } from '@/components/site/copy-button';

const propsBySlug: Record<string, typeof buttonProps> = {
  button: buttonProps,
  input: inputProps,
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
};

const installBySlug: Record<string, { cli: string }> = {
  button: { cli: 'npx varient add button' },
  input: { cli: 'npx varient add input' },
};

type Tab = 'preview' | 'code' | 'props';
type InstallTab = 'cli' | 'manual';

const layerAccents: Record<string, string> = {
  foundation: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
  animated: 'text-neutral-300 bg-neutral-700/40 border-neutral-700/40',
  sections: 'text-neutral-400 bg-neutral-800/40 border-neutral-700/30',
};

const tabIcons: Record<Tab, React.ElementType> = {
  preview: Eye,
  code: Code2,
  props: List,
};

interface ComponentDetailProps {
  entry: ComponentEntry;
}

export function ComponentDetail({ entry }: ComponentDetailProps) {
  const [tab, setTab] = useState<Tab>('preview');
  const [installTab, setInstallTab] = useState<InstallTab>('cli');

  const props = propsBySlug[entry.slug];
  const usage =
    usageBySlug[entry.slug] ??
    `import { ${entry.name} } from '@varient/ui'\n\n<${entry.name} />\n`;
  const install = installBySlug[entry.slug];

  const tabs: { id: Tab; label: string }[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
    ...(props ? [{ id: 'props' as Tab, label: 'Props' }] : []),
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-text-tertiary">
        <Link href="/components" className="transition-colors hover:text-text-secondary">
          Components
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-text-primary">{entry.name}</span>
      </nav>

      {/* Header */}
      <h1 className="font-display mb-2 text-4xl font-bold tracking-tight text-text-primary">
        {entry.name}
      </h1>
      <p className="mb-6 max-w-2xl text-base leading-relaxed text-text-secondary">
        {entry.description}
      </p>

      {/* Action bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border/50 pb-6">
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-1.5">
          <CopyButton text={usage} />
          <span className="text-xs font-medium text-text-secondary">Copy code</span>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider',
              layerAccents[entry.layer],
            )}
          >
            {layerLabels[entry.layer]}
          </span>
          <span className="rounded-full border border-border/50 bg-bg-subtle px-2.5 py-0.5 text-[11px] text-text-tertiary">
            Jun 2026
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mb-5 flex w-fit items-center gap-0.5 rounded-xl border border-border/60 bg-bg-subtle/40 p-1">
        {tabs.map((t) => {
          const Icon = tabIcons[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
                tab === t.id
                  ? 'bg-bg-base text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary',
              )}
            >
              <Icon className="size-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Preview tab */}
      {tab === 'preview' && (
        <section className="mb-10">
          <ComponentPreview name={entry.slug} minHeight="lg" />
        </section>
      )}

      {/* Code tab */}
      {tab === 'code' && (
        <section className="mb-10">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-bg-subtle/30 dark:bg-neutral-950">
            <div className="flex items-center justify-between border-b border-border/50 bg-bg-subtle/60 dark:bg-neutral-900/60 px-5 py-3">
              <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                Usage
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-bg-muted px-2 py-0.5 text-xs text-text-tertiary">
                  {entry.slug}.tsx
                </span>
                <CopyButton text={usage} />
              </div>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              <code>{usage}</code>
            </pre>
          </div>
        </section>
      )}

      {/* Props tab */}
      {tab === 'props' && props && (
        <section className="mb-10">
          <PropsTable props={props} />
        </section>
      )}

      {/* Installation */}
      {install && (
        <section className="mb-10">
          <h2 className="font-display mb-4 text-xl font-semibold tracking-tight text-text-primary">
            Installation
          </h2>

          {/* Install tab switcher */}
          <div className="mb-4 flex w-fit items-center gap-0.5 rounded-xl border border-border/60 bg-bg-subtle/40 p-1">
            {(['cli', 'manual'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setInstallTab(t)}
                className={cn(
                  'rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150',
                  installTab === t
                    ? 'bg-bg-base text-text-primary shadow-sm'
                    : 'text-text-tertiary hover:text-text-secondary',
                )}
              >
                {t === 'cli' ? 'CLI (npx)' : 'Manual'}
              </button>
            ))}
          </div>

          {installTab === 'cli' ? (
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-bg-subtle/40 dark:bg-neutral-950 px-5 py-4">
              <Terminal className="size-4 shrink-0 text-text-tertiary" />
              <code className="flex-1 font-mono text-sm text-text-primary">
                {install.cli}
              </code>
              <CopyButton text={install.cli} />
            </div>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-bg-subtle/30 p-5 text-sm leading-relaxed text-text-secondary">
              Copy the component source from the{' '}
              <button
                type="button"
                onClick={() => setTab('code')}
                className="font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Code tab
              </button>{' '}
              above and paste it into your project. No npm install needed — you own the code.
            </div>
          )}
        </section>
      )}

      {/* Footer nav */}
      <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-6">
        <Link
          href="/components"
          className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-primary"
        >
          <ChevronRight className="size-3.5 rotate-180" />
          All components
        </Link>
        <Link
          href={`/docs/${entry.layer}/${entry.slug}`}
          className="ml-auto inline-flex items-center gap-1.5 text-sm text-brand-400 transition-colors hover:text-brand-300"
        >
          Full documentation
          <ChevronRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
