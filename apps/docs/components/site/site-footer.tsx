import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '@/components/site/brand-icons';
import { getReadyCount } from '@/lib/components/registry';
import { cn } from '@varient/ui';

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
    { label: 'Components', href: '/components' },
    { label: 'Foundation', href: '/components?layer=foundation' },
    { label: 'Animated', href: '/components?layer=animated' },
    { label: 'Sections', href: '/components?layer=sections' },
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
    { label: 'GitHub', href: 'https://github.com/piyush/varient', external: true },
    { label: 'Changelog', href: '/docs' },
  ],
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const columnTitleClass = 'mb-4 block font-medium text-foreground text-sm';
const linkClass =
  'inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-brand';

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
        <ArrowUpRight
          aria-hidden
          className="size-3 shrink-0 opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
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
      <span className={columnTitleClass}>{column.title}</span>
      <ul className="flex flex-col gap-3">
        {column.links.map((link) => (
          <li className="group block" key={link.href}>
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
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl space-y-14 px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-5">
          {/* Brand column (spans 2) */}
          <div className="space-y-6 md:col-span-2 md:space-y-8">
            <Link
              aria-label="Varient home"
              className={cn('inline-flex items-center gap-2 rounded-sm', focusRing)}
              href="/"
            >
              <span className="font-semibold text-foreground text-xl tracking-tight">
                Varient
              </span>
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            </Link>
            <p className="max-w-xs text-balance text-muted-foreground text-sm leading-relaxed">
              Copy-paste React components for utilities, animations, and full-page sections. You
              own the code — no lock-in, no per-component installs.
            </p>
          </div>

          {/* 3 link columns */}
          <div className="grid gap-8 sm:grid-cols-3 md:col-span-3">
            <LinkColumn column={libraryColumn} />
            <LinkColumn column={guideColumn} />
            <div>
              <LinkColumn column={projectColumn} />
              <div className="mt-5 flex items-center gap-3">
                <a
                  aria-label="Varient on GitHub"
                  className={cn(
                    'text-muted-foreground transition-colors duration-200 hover:text-brand',
                    focusRing,
                    'rounded-sm',
                  )}
                  href="https://github.com/piyush/varient"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="size-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dotted divider */}
        <div
          aria-hidden
          className="h-px bg-[length:6px_1px] bg-repeat-x opacity-30 [background-image:linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)]"
        />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Varient. All rights reserved.
          </p>
          {/* Status pill */}
          <div className="flex items-center gap-2 rounded-full border border-transparent bg-background py-1 pr-3 pl-2 shadow-sm ring-1 ring-border/60">
            <span aria-hidden className="relative flex size-2.5">
              <span className="absolute inset-0 inline-flex size-full animate-ping rounded-full bg-brand/60 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
            </span>
            <span className="text-foreground text-xs">{componentCount} components shipped</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
