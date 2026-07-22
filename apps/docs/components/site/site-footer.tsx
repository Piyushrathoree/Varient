import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import { getReadyCount, layerLabels } from '@/lib/components/registry';
import { gitConfig } from '@/lib/shared';

const GITHUB_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

interface FooterLink {
  external?: boolean;
  href: string;
  label: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const libraryColumn: FooterColumn = {
  title: 'Library',
  links: [
    { label: 'All components', href: '/components' },
    { label: layerLabels.foundation, href: '/components?layer=foundation' },
    { label: layerLabels.animated, href: '/components?layer=animated' },
    { label: layerLabels.sections, href: '/components?layer=sections' },
  ],
};

const guideColumn: FooterColumn = {
  title: 'Guide',
  links: [
    { label: 'Introduction', href: '/docs/getting-started/introduction' },
    { label: 'Installation', href: '/docs/getting-started/installation' },
    { label: 'Theming', href: '/docs/getting-started/theming' },
  ],
};

const projectColumn: FooterColumn = {
  title: 'Project',
  links: [
    { label: 'GitHub', href: GITHUB_URL, external: true },
    { label: 'Documentation', href: '/docs' },
  ],
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const columnTitleClass = 'mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-smooth-800';
const linkClass =
  'inline-flex items-center gap-1 text-sm text-smooth-900 transition duration-200 hover:translate-x-[2px] hover:text-brand motion-reduce:transition-none motion-reduce:hover:translate-x-0';

const wordmarkClass =
  'font-title text-[clamp(4rem,14vw,12rem)] font-bold uppercase leading-none text-center select-none';

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        className={cn(linkClass, focusRing, 'rounded-sm')}
        href={link.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span>{link.label}</span>
        <ArrowUpRight aria-hidden className="size-3 shrink-0 opacity-60" />
      </a>
    );
  }
  return (
    <Link className={cn(linkClass, focusRing, 'rounded-sm')} href={link.href}>
      {link.label}
    </Link>
  );
}

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <p className={columnTitleClass}>{column.title}</p>
      <ul className="flex flex-col gap-2.5">
        {column.links.map((link) => (
          <li key={link.href}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const componentCount = getReadyCount();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:pt-20">
        {/* Top: brand column + link columns */}
        <div className="grid gap-12 md:grid-cols-5">
          <div className="space-y-5 md:col-span-2">
            <Link
              aria-label="Varient home"
              className={cn('inline-flex items-center gap-2.5 rounded-sm', focusRing)}
              href="/"
            >
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-lg bg-brand font-title text-lg font-bold leading-none text-background"
              >
                *
              </span>
              <span className="font-title text-xl font-semibold lowercase tracking-tight text-foreground">
                varient
              </span>
            </Link>
            <p className="max-w-sm text-balance text-sm leading-relaxed text-smooth-900">
              Copy-paste React components for utilities, animations, and full-page sections. You
              own the code — no lock-in, no per-component installs.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-3">
            <LinkColumn column={libraryColumn} />
            <LinkColumn column={guideColumn} />
            <div>
              <LinkColumn column={projectColumn} />
              <div className="mt-6">
                <a
                  aria-label="Varient on GitHub"
                  className={cn(
                    'inline-flex size-9 items-center justify-center rounded-full border border-border text-smooth-900 transition-colors hover:border-brand/40 hover:text-brand',
                    focusRing,
                  )}
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: monument wordmark — stroked outline, gradient fill sweeps in on hover */}
        <div aria-hidden className="group relative mt-16 sm:mt-20">
          <div
            className={cn(
              wordmarkClass,
              'text-transparent [-webkit-text-stroke:1px_var(--color-smooth-700)]',
            )}
          >
            Varient
          </div>
          <div
            className={cn(
              wordmarkClass,
              'text-gradient-brand pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none',
            )}
          >
            Varient
          </div>
        </div>
      </div>

      {/* Bottom bar between hairlines */}
      <div className="mt-12 border-t border-border sm:mt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-b border-border px-6 py-5 text-sm text-smooth-900 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs">&copy; {new Date().getFullYear()} Varient &middot; MIT</p>
          <p className="text-xs text-smooth-800">Built for the motion-obsessed</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-smooth-100 px-3 py-1.5 font-mono text-[11px] text-smooth-900">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            <span>All systems ship</span>
            <span aria-hidden className="text-smooth-800">
              &middot;
            </span>
            <span>{componentCount} components shipped</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
