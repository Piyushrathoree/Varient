import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import { layerLabels } from '@/lib/components/registry';
import { ComponentPreview } from '@/components/preview/component-preview';
import { PropsTable, buttonProps, inputProps } from '@/components/docs/props-table';

const propsBySlug: Record<string, typeof buttonProps> = {
  button: buttonProps,
  input: inputProps,
};

interface ComponentDetailProps {
  entry: ComponentEntry;
}

export function ComponentDetail({ entry }: ComponentDetailProps) {
  const props = propsBySlug[entry.slug];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link
        href="/components"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="size-4" />
        All components
      </Link>

      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">{entry.name}</h1>
          <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-brand-500">
            {layerLabels[entry.layer]}
          </span>
        </div>
        <p className="max-w-2xl text-lg text-text-secondary">{entry.description}</p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-tertiary">
          Preview
        </h2>
        <ComponentPreview name={entry.slug} minHeight="lg" />
      </section>

      {props && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-tertiary">
            Props
          </h2>
          <PropsTable props={props} />
        </section>
      )}

      <section className="mb-12">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-text-tertiary">
          Usage
        </h2>
        <pre className="overflow-x-auto rounded-xl border border-border bg-bg-subtle p-4 text-sm text-text-primary">
          <code>{`import { ${entry.name} } from '@varient/ui';

<${entry.name} variant="primary">
  Click me
</${entry.name}>`}</code>
        </pre>
      </section>

      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href={`/docs/${entry.layer}/${entry.slug}`}>Full documentation</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/components">Browse more</Link>
        </Button>
      </div>
    </div>
  );
}
