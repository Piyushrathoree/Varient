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

const columnTitleClass = 'mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground';
const linkClass =
  'inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground';

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
      <div className="mx-auto max-w-7xl space-y-12 px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="space-y-5 md:col-span-2">
            <Link
              aria-label="Varient home"
              className={cn('inline-flex items-center gap-2 rounded-sm', focusRing)}
              href="/"
            >
              <span className="font-title text-xl font-semibold tracking-tight text-foreground">
                Vari<span className="text-brand">ent</span>
              </span>
            </Link>
            <p className="max-w-sm text-balance text-sm leading-relaxed text-muted-foreground">
              Copy-paste React components for utilities, animations, and full-page sections. You
              own the code — no lock-in, no per-component installs.
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {componentCount} components shipped
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
                    'inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/15 hover:text-foreground',
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

        <div
          aria-hidden
          className="h-px bg-[length:6px_1px] bg-repeat-x opacity-20 [background-image:linear-gradient(90deg,var(--color-border)_1px,transparent_1px)]"
        />

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Varient. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
