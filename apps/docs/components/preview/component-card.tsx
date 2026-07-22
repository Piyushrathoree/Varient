import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge, cn, type BadgeVariant } from '@varient/ui';
import type { ComponentEntry } from '@/lib/components/registry';
import { getComponentHref, layerLabels } from '@/lib/components/registry';
import { getDemo } from '@/lib/components/demos';
import { PreviewFrame } from './preview-frame';
import { SectionPreviewScale } from './section-preview-scale';
import { LazyMount } from './lazy-mount';

interface ComponentCardProps {
  entry: ComponentEntry;
  /** Compact for foundation/animated; wide for full-page sections. */
  size?: 'compact' | 'wide';
}

const statusMeta: Record<ComponentEntry['status'], { label: string; variant: BadgeVariant }> = {
  shipped: { label: 'Shipped', variant: 'primary' },
  'in-progress': { label: 'In progress', variant: 'warning' },
  planned: { label: 'Planned', variant: 'outline' },
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function ComponentCard({ entry, size = 'compact' }: ComponentCardProps) {
  const href = getComponentHref(entry);
  const isShipped = entry.status === 'shipped';
  const isInProgress = entry.status === 'in-progress';
  const isWide = size === 'wide' || entry.layer === 'sections';
  const CompactDemo = isShipped ? getDemo(entry.slug, true) : null;
  const status = statusMeta[entry.status];

  const previewContent =
    isShipped && CompactDemo ? (
      <LazyMount minHeight={isWide ? 280 : 160} className="flex h-full w-full items-center justify-center">
        {isWide ? (
          <SectionPreviewScale>
            <CompactDemo />
          </SectionPreviewScale>
        ) : (
          <CompactDemo />
        )}
      </LazyMount>
    ) : isInProgress ? (
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-9 items-center justify-center rounded-full border border-warning/30 bg-warning/10 text-warning">
          <Clock className="size-4" strokeWidth={1.75} />
        </div>
        <span className="font-title block text-sm font-semibold text-foreground/80">
          {entry.name}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-smooth-800">
          Preview coming soon
        </span>
      </div>
    ) : (
      <div
        className="skeleton-shimmer flex w-full max-w-[220px] flex-col gap-2.5 rounded-xl border border-dashed border-border bg-smooth-100 px-5 py-4"
        aria-hidden
      >
        <div className="h-3 w-2/3 rounded-full bg-border" />
        <div className="h-2.5 w-full rounded-full bg-border/70" />
        <div className="h-2.5 w-4/5 rounded-full bg-border/70" />
      </div>
    );

  const card = (
    <div
      className={cn(
        'group spotlight-surface flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color] duration-200 motion-reduce:transition-none',
        href && 'hover:-translate-y-0.5 hover:border-brand/40',
        !isShipped && 'opacity-90',
      )}
    >
      <div className="relative">
        {entry.isNew && (
          <span className="absolute right-2.5 top-2.5 z-20 rounded-full border border-brand/30 bg-brand/10 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-brand">
            New
          </span>
        )}
        <PreviewFrame
          minHeight={isWide ? 'section' : 'sm'}
          alignTop={isWide}
          className="rounded-none border-0"
        >
          {previewContent}
        </PreviewFrame>
      </div>

      <div className={cn('flex flex-1 flex-col gap-3 border-t border-border p-5', isWide && 'sm:p-6')}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn('font-title font-semibold text-foreground', isWide && 'text-lg')}>
            {entry.name}
          </h3>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-smooth-800">
            {entry.category}
          </span>
        </div>
        <p
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            isWide ? 'line-clamp-3' : 'line-clamp-2',
          )}
        >
          {entry.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <Badge variant={status.variant} size="sm">
              {status.label}
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-wider text-smooth-800/70">
              {layerLabels[entry.layer]}
            </span>
          </div>
          {isShipped && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              Open
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cn('block h-full rounded-2xl', focusRing)}>
        {card}
      </Link>
    );
  }

  return (
    <div
      role="group"
      aria-label={
        isInProgress ? `${entry.name} — in progress` : `${entry.name} — planned, not yet built`
      }
      className="h-full"
    >
      {card}
    </div>
  );
}
