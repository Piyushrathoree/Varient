'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import {
  AlertTriangle,
  Anchor,
  Award,
  Baseline,
  BookOpen,
  Boxes,
  Brush,
  CalendarClock,
  Captions,
  Table2,
  Check,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  CircleDot,
  CircleUser,
  Columns3,
  Compass,
  CreditCard,
  Feather,
  FileText,
  Filter,
  Fingerprint,
  FlipVertical2,
  Frame,
  Gauge,
  Gift,
  GitCompare,
  Globe,
  Grid3x3,
  Hand,
  HeartHandshake,
  Layers,
  Layers3,
  LayoutGrid,
  LayoutPanelTop,
  ListChecks,
  ListFilter,
  Loader2,
  Magnet,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  MousePointerClick,
  Orbit,
  PanelRightOpen,
  Pause,
  Percent,
  Rows3,
  Search,
  Send,
  Shapes,
  Shuffle,
  Sparkle,
  Sparkles,
  Spline,
  Square,
  SquareCheck,
  SquareStack,
  Star,
  Sun,
  Tag,
  Target,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
  Type,
  Users,
  Wand2,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@varient/ui';
import { components, layerLabels, type ComponentEntry, type ComponentLayer } from '@/lib/components/registry';

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

// Shared focus treatment, ported to SmoothUI's brand token.
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const groupLabelClass =
  'mb-2 flex items-center gap-1.5 px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground';

const itemBaseClass =
  'flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors duration-150';
const itemActiveClass = 'bg-brand/10 font-medium text-brand';
const itemInactiveClass = 'text-muted-foreground hover:bg-muted hover:text-foreground';
const itemInertClass = 'cursor-default text-muted-foreground/50';

/** Explicit icon per shipped/well-known Foundation primitive. */
const foundationIcons: Record<string, LucideIcon> = {
  button: MousePointerClick,
  input: TextCursorInput,
  textarea: Captions,
  select: ChevronsUpDown,
  checkbox: SquareCheck,
  'radio-group': CircleDot,
  switch: ToggleLeft,
  slider: Waves,
  toggle: ToggleRight,
  'toggle-group': Rows3,
  badge: Tag,
  avatar: CircleUser,
  card: CreditCard,
  modal: Square,
  'alert-dialog': AlertTriangle,
  drawer: PanelRightOpen,
  tabs: LayoutPanelTop,
  accordion: ChevronsDownUp,
  tooltip: MessageCircle,
  popover: SquareStack,
  'dropdown-menu': ListFilter,
  table: Table2,
  pagination: Rows3,
  breadcrumb: ChevronRight,
  'skeleton-loader': Loader2,
};

/** Keyword → icon fallback for Animated/Sections (75 entries is too many to
 * hand-map one-by-one; this covers the common nouns in their names and falls
 * back to a per-layer default icon otherwise). First match wins. */
const keywordIcons: [RegExp, LucideIcon][] = [
  [/flip/, FlipVertical2],
  [/text|typewriter|caption/, Type],
  [/marquee|infinite/, Shuffle],
  [/shimmer|glow|pulse/, Sparkle],
  [/globe/, Globe],
  [/reveal|blur|fade/, Feather],
  [/beam|border-beam|animated-beam/, Spline],
  [/particle/, Wand2],
  [/spotlight|cursor/, Target],
  [/number|ticker|progress-ring|gauge/, Gauge],
  [/confetti|gift/, Gift],
  [/ripple|magnetic|magnet/, Magnet],
  [/meteor/, Star],
  [/orbit/, Orbit],
  [/tilt|3d/, Boxes],
  [/gradient/, Brush],
  [/scroll-progress/, Gauge],
  [/sparkle/, Sparkles],
  [/aurora|wavy|background/, Waves],
  [/grid-pattern|dot-pattern|pattern/, Grid3x3],
  [/floating-navbar|navbar/, Compass],
  [/bento/, LayoutGrid],
  [/hero/, Sun],
  [/pricing|comparison|percent/, Percent],
  [/faq/, MessageSquareQuote],
  [/footer/, Anchor],
  [/features?\b/, Shapes],
  [/testimonial/, Award],
  [/cta|call-to-action/, Send],
  [/logo-cloud/, Frame],
  [/stats/, Filter],
  [/team/, Users],
  [/blog/, FileText],
  [/newsletter/, Mail],
  [/contact/, HeartHandshake],
  [/timeline/, CalendarClock],
  [/integration/, Layers],
  [/changelog/, ListChecks],
  [/404|not-found/, Fingerprint],
  [/baseline|typography/, Baseline],
  [/column/, Columns3],
  [/pause/, Pause],
  [/hand|drag/, Hand],
  [/check/, Check],
  [/compare/, GitCompare],
];

function iconForEntry(entry: ComponentEntry): LucideIcon {
  if (entry.layer === 'foundation' && foundationIcons[entry.slug]) {
    return foundationIcons[entry.slug];
  }
  const match = keywordIcons.find(([pattern]) => pattern.test(entry.slug));
  if (match) return match[1];
  return layerIcons[entry.layer];
}

function StatusDot({ status }: { status: ComponentEntry['status'] }) {
  return (
    <span
      aria-hidden
      className={cn(
        'size-1.5 shrink-0 rounded-full',
        status === 'shipped' && 'bg-emerald-500',
        status === 'in-progress' && 'bg-amber-500',
        status === 'planned' && 'bg-muted-foreground/40',
      )}
    />
  );
}

interface ComponentsSidebarProps {
  className?: string;
  /**
   * `desktop` (default) — the sticky in-flow aside, hidden below `lg` (the
   * gallery grid is the mobile fallback, same as SmoothUI collapses its own
   * sidebar off small viewports). `drawer` — same nav content laid out for
   * the mobile hamburger drawer rendered by the section layout.
   */
  variant?: 'desktop' | 'drawer';
}

/**
 * Persistent left nav for the `/components` section — ported from SmoothUI's
 * docs sidebar look: a Ctrl+K search affordance, grouped labels (Guide /
 * Foundation / Animated / Sections), per-item icons, an accent-soft pill for
 * the active item, and a status dot for in-progress/planned entries.
 *
 * SmoothUI's own sidebar is generated by fumadocs from its page tree; ours is
 * grouped by our `registry.ts` layers instead (guide pages are hardcoded —
 * they live outside the component registry). Search wires into fumadocs'
 * existing `SearchProvider` (already mounted by `RootProvider`), so Ctrl+K /
 * ⌘K opens the real search dialog — no new dependency needed.
 */
export function ComponentsSidebar({ className, variant = 'desktop' }: ComponentsSidebarProps) {
  const pathname = usePathname();
  const { setOpenSearch, hotKey, enabled: searchEnabled } = useSearchContext();

  return (
    <aside
      className={cn(
        variant === 'desktop'
          ? 'sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto border-r border-border py-6 pr-4 lg:block'
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
        <LayoutGrid aria-hidden className="size-4 shrink-0" />
        All components
      </Link>

      <nav className="flex flex-col gap-6">
        {/* Guide — hardcoded, lives outside the component registry */}
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
                    <FileText aria-hidden className="size-4 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {layers.map((layer) => {
          const entries = components.filter((c) => c.layer === layer);
          const LayerIcon = layerIcons[layer];
          return (
            <div key={layer}>
              <p className={groupLabelClass}>
                <LayerIcon aria-hidden className="size-3.5" />
                {layerLabels[layer]}
                <span className="ml-0.5 text-muted-foreground/60">{entries.length}</span>
              </p>
              <ul className="flex flex-col gap-0.5">
                {entries.map((entry) => {
                  const isShipped = entry.status === 'shipped';
                  const href = `/components/${entry.slug}`;
                  const isActive = pathname === href;
                  const ItemIcon = iconForEntry(entry);

                  if (!isShipped) {
                    return (
                      <li key={entry.slug}>
                        <span
                          className={cn(itemBaseClass, itemInertClass)}
                          title={entry.status === 'in-progress' ? 'In progress' : 'Planned'}
                        >
                          <ItemIcon aria-hidden className="size-4 shrink-0" />
                          <span className="flex-1 truncate">{entry.name}</span>
                          <StatusDot status={entry.status} />
                        </span>
                      </li>
                    );
                  }

                  return (
                    <li key={entry.slug}>
                      <Link
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          itemBaseClass,
                          focusRing,
                          isActive ? itemActiveClass : itemInactiveClass,
                        )}
                      >
                        <ItemIcon aria-hidden className="size-4 shrink-0" />
                        <span className="flex-1 truncate">{entry.name}</span>
                        <StatusDot status={entry.status} />
                      </Link>
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
