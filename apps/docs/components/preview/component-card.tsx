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

const layerAccents: Record<string, string> = {
  foundation: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
  animated: 'text-neutral-300 bg-neutral-700/40 border-neutral-700/40',
  sections: 'text-neutral-400 bg-neutral-800/40 border-neutral-700/30',
};

export function ComponentCard({ entry }: ComponentCardProps) {
  const href = getComponentHref(entry);
  const isReady = entry.status === 'ready';
  const CompactDemo = isReady ? getDemo(entry.slug, true) : null;

  const card = (
    <article
      className={cn(
        'card-glow group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-base',
        !isReady && 'opacity-60',
      )}
    >
      <PreviewFrame minHeight="sm" className="rounded-none border-0 shadow-none">
        {CompactDemo ? (
          <CompactDemo />
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="rounded-2xl border border-dashed border-border/60 bg-neutral-900/40 px-6 py-4">
              <span className="block font-display text-sm font-semibold text-text-tertiary">
                {entry.name}
              </span>
              <span className="mt-1.5 block text-xs text-text-tertiary/60">
                Shipping soon
              </span>
            </div>
          </div>
        )}
      </PreviewFrame>

      <div className="flex flex-1 flex-col gap-3 border-t border-border/60 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-text-primary">{entry.name}</h3>
          <span
            className={cn(
              'shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
              layerAccents[entry.layer],
            )}
          >
            {layerLabels[entry.layer]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {entry.description}
        </p>
        {isReady && (
          <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-brand-400 opacity-0 transition-opacity group-hover:opacity-100">
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
