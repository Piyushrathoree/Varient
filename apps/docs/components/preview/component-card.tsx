import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import { getComponentHref, layerLabels } from '@/lib/components/registry';
import { getDemo } from '@/lib/components/demos';
import { PreviewFrame } from './preview-frame';

interface ComponentCardProps {
  entry: ComponentEntry;
}

export function ComponentCard({ entry }: ComponentCardProps) {
  const href = getComponentHref(entry);
  const isReady = entry.status === 'ready';
  const CompactDemo = isReady ? getDemo(entry.slug, true) : null;

  const card = (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-border bg-bg-base transition-colors',
        isReady && 'hover:border-brand-500/40 hover:shadow-md',
        !isReady && 'opacity-70',
      )}
    >
      <PreviewFrame minHeight="sm" className="rounded-none border-0 shadow-none">
        {CompactDemo ? (
          <CompactDemo />
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-sm font-medium text-text-tertiary">{entry.name}</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-tertiary">
              Coming soon
            </span>
          </div>
        )}
      </PreviewFrame>

      <div className="flex flex-1 flex-col gap-2 border-t border-border p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-text-primary">{entry.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-500">
            {layerLabels[entry.layer]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-text-secondary">{entry.description}</p>
        {isReady && (
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-brand-500 opacity-0 transition-opacity group-hover:opacity-100">
            Open component
            <ArrowRight className="size-3.5" />
          </span>
        )}
      </div>
    </article>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}
