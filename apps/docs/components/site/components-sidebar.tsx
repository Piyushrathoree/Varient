'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  FileText,
  Layers3,
  LayoutGrid,
  Search,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@varient/ui';
import {
  getCategoryAnchorId,
  getComponentBySlug,
  getComponentsGroupedByCategory,
  getReadyCount,
  layerCategories,
  layerLabels,
  type ComponentLayer,
} from '@/lib/components/registry';
import { useOptionalGalleryNav } from '@/components/site/gallery-nav-context';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

const layers: ComponentLayer[] = ['foundation', 'animated', 'sections'];

const layerIcons: Record<ComponentLayer, LucideIcon> = {
  foundation: Layers3,
  animated: Sparkles,
  sections: LayoutGrid,
};

const guideLinks = [
  { label: 'Introduction', href: '/docs/getting-started/introduction' },
  { label: 'Installation', href: '/docs/getting-started/installation' },
  { label: 'Theming', href: '/docs/getting-started/theming' },
] as const;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const groupLabelClass =
  'mb-2 flex items-center gap-1.5 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground';

const itemBaseClass =
  'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-left text-sm transition-colors duration-150';
const itemActiveClass = 'bg-brand/10 font-medium text-brand';
const itemInactiveClass = 'text-muted-foreground hover:bg-muted hover:text-foreground';

interface ComponentsSidebarProps {
  className?: string;
  variant?: 'desktop' | 'drawer';
}

export function ComponentsSidebar({ className, variant = 'desktop' }: ComponentsSidebarProps) {
  const pathname = usePathname();
  const galleryNav = useOptionalGalleryNav();
  const { setOpenSearch, hotKey, enabled: searchEnabled } = useSearchContext();
  const isGalleryPage = pathname === '/components';

  const slugMatch = pathname.match(/^\/components\/([^/]+)$/);
  const currentEntry = slugMatch ? getComponentBySlug(slugMatch[1]) : undefined;
  const grouped = getComponentsGroupedByCategory();

  const categoryCounts = grouped.reduce<Record<string, number>>((acc, group) => {
    const key = getCategoryAnchorId(group.layer, group.category);
    acc[key] = group.entries.length;
    return acc;
  }, {});

  function handleCategoryClick(layer: ComponentLayer, category: string) {
    const anchorId = getCategoryAnchorId(layer, category);

    if (isGalleryPage && galleryNav) {
      galleryNav.scrollToCategory(layer, category);
      return;
    }

    window.location.href = `/components#${anchorId}`;
  }

  function isCategoryActive(layer: ComponentLayer, category: string): boolean {
    const anchorId = getCategoryAnchorId(layer, category);

    if (isGalleryPage) {
      return galleryNav?.activeAnchor === anchorId;
    }

    if (currentEntry) {
      return currentEntry.layer === layer && currentEntry.category === category;
    }

    return false;
  }

  return (
    <aside
      className={cn(
        variant === 'desktop'
          ? 'sticky top-20 hidden h-[calc(100vh-5rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-6 pr-3 lg:block xl:w-64 xl:pr-4'
          : 'block h-full w-full overflow-y-auto',
        className,
      )}
    >
      <button
        aria-label="Search components"
        className={cn(
          'mb-6 flex w-full items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-left text-sm text-muted-foreground transition-colors duration-150',
          'hover:border-brand/40 hover:text-foreground',
          focusRing,
        )}
        onClick={() => setOpenSearch(true)}
        type="button"
      >
        <Search aria-hidden className="size-4 shrink-0" />
        <span className="flex-1 truncate">Search…</span>
        {searchEnabled && hotKey.length > 0 && (
          <span className="hidden items-center gap-0.5 sm:flex">
            {hotKey.map((k, i) => (
              <kbd
                // biome-ignore lint: hotkey entries have no stable id
                key={i}
                className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {k.display}
              </kbd>
            ))}
          </span>
        )}
      </button>

      <Link
        href="/components"
        className={cn(
          itemBaseClass,
          focusRing,
          'mb-4 font-semibold',
          pathname === '/components' ? itemActiveClass : itemInactiveClass,
        )}
      >
        <span className="flex items-center gap-2">
          <LayoutGrid aria-hidden className="size-4 shrink-0" />
          All components
        </span>
        <span className="font-mono text-[10px] text-brand">{getReadyCount()}</span>
      </Link>

      <nav className="flex flex-col gap-6">
        <div>
          <p className={groupLabelClass}>
            <BookOpen aria-hidden className="size-3.5" />
            Guide
          </p>
          <ul className="flex flex-col gap-0.5">
            {guideLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      itemBaseClass,
                      focusRing,
                      isActive ? itemActiveClass : itemInactiveClass,
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <FileText aria-hidden className="size-4 shrink-0" />
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {layers.map((layer) => {
          const LayerIcon = layerIcons[layer];
          const layerGroupCount = grouped.filter((group) => group.layer === layer).length;

          return (
            <div key={layer}>
              <p className={groupLabelClass}>
                <LayerIcon aria-hidden className="size-3.5" />
                {layerLabels[layer]}
                <span className="ml-0.5 text-muted-foreground/60">{layerGroupCount}</span>
              </p>
              <ul className="flex flex-col gap-0.5">
                {layerCategories[layer].map((category) => {
                  const anchorId = getCategoryAnchorId(layer, category);
                  const count = categoryCounts[anchorId];
                  if (!count) return null;

                  const isActive = isCategoryActive(layer, category);

                  return (
                    <li key={anchorId}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(layer, category)}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          itemBaseClass,
                          focusRing,
                          isActive ? itemActiveClass : itemInactiveClass,
                        )}
                      >
                        <span className="truncate">{category}</span>
                        <span
                          className={cn(
                            'shrink-0 font-mono text-[10px]',
                            isActive ? 'text-brand' : 'text-muted-foreground/60',
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
