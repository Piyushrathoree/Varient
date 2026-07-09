import { forwardRef, type HTMLAttributes, type SVGProps } from 'react';
import { cn } from '../../../lib/utils';

export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  platform: 'github' | 'x';
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** One-liner under the wordmark. */
  tagline?: string;
  /** Three link columns rendered beside the brand block. */
  columns?: FooterColumn[];
  /** GitHub and X profile links with inline SVG icons. */
  socialLinks?: FooterSocialLink[];
  /** Status pill label in the bottom bar. */
  statusText?: string;
  /** Name used in the copyright line. @default 'Varient' */
  copyrightName?: string;
  /** SmoothUI credit link destination. @default 'https://smoothui.dev' */
  creditHref?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Library',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Foundation', href: '/components?layer=foundation' },
      { label: 'Animated', href: '/components?layer=animated' },
      { label: 'Sections', href: '/components?layer=sections' },
    ],
  },
  {
    title: 'Guide',
    links: [
      { label: 'Introduction', href: '/docs/getting-started/introduction' },
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Theming', href: '/docs/getting-started/theming' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: 'https://github.com/piyush/varient', isExternal: true },
      { label: 'Changelog', href: '/docs' },
    ],
  },
];

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
  { label: 'Varient on GitHub', href: 'https://github.com/piyush/varient', platform: 'github' },
  { label: 'Varient on X', href: 'https://x.com/varient', platform: 'x' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function GithubIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.72-4.04-1.59-4.04-1.59-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.77.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.29-1.21 3.29-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialIcon({ platform, className }: { platform: FooterSocialLink['platform']; className?: string }) {
  if (platform === 'github') return <GithubIcon className={className} />;
  return <XIcon className={className} />;
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  const linkClass =
    'inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground';

  if (link.isExternal) {
    return (
      <a
        className={cn(linkClass, focusRing)}
        href={link.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {link.label}
      </a>
    );
  }

  return (
    <a className={cn(linkClass, focusRing)} href={link.href}>
      {link.label}
    </a>
  );
}

function FooterLinkColumn({ column }: { column: FooterColumn }) {
  return (
    <nav aria-label={column.title}>
      <span className="mb-4 block text-sm font-medium text-foreground">{column.title}</span>
      <ul className="flex flex-col gap-3">
        {column.links.map((link) => (
          <li key={`${column.title}-${link.href}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      tagline = 'Copy-paste React components for utilities, animations, and full-page sections. You own the code — no lock-in, no per-component installs.',
      columns = DEFAULT_COLUMNS,
      socialLinks = DEFAULT_SOCIAL_LINKS,
      statusText = 'All systems operational',
      copyrightName = 'Varient',
      creditHref = 'https://smoothui.dev',
      ...props
    },
    ref,
  ) => {
    const year = new Date().getFullYear();

    return (
      <footer
        ref={ref}
        className={cn('w-full border-t border-border bg-muted/40', className)}
        {...props}
      >
        <div className="mx-auto max-w-6xl space-y-10 px-6 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="space-y-4 md:col-span-2 md:space-y-6">
              <a
                aria-label={`${copyrightName} home`}
                className={cn('inline-flex rounded-sm', focusRing)}
                href="/"
              >
                <span className="font-title text-xl font-semibold tracking-tight text-foreground">
                  Vari<span className="text-brand">ent</span>
                </span>
              </a>
              <p className="max-w-xs text-balance text-sm leading-relaxed text-muted-foreground">
                {tagline}
              </p>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.href}
                      aria-label={social.label}
                      className={cn(
                        'rounded-sm text-muted-foreground transition-colors duration-200 hover:text-foreground',
                        focusRing,
                      )}
                      href={social.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SocialIcon className="size-[18px]" platform={social.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-3 md:col-span-3">
              {columns.map((column) => (
                <FooterLinkColumn key={column.title} column={column} />
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="h-px bg-[length:6px_1px] bg-repeat-x opacity-30 [background-image:linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)]"
          />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {year} {copyrightName}. All rights reserved.
            </p>

            <div className="flex items-center gap-2 rounded-full border border-transparent bg-background py-1 pr-3 pl-2 shadow-sm ring-1 ring-border/60">
              <span aria-hidden className="relative flex size-2.5">
                <span className="absolute inset-0 inline-flex size-full animate-ping rounded-full bg-brand/60 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
              </span>
              <span className="text-xs text-foreground">{statusText}</span>
            </div>

            <p className="text-sm text-muted-foreground">
              UI design adapted from{' '}
              <a
                className={cn(
                  'text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline',
                  focusRing,
                  'rounded-sm',
                )}
                href={creditHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                SmoothUI
              </a>{' '}
              by Edu Calvo (MIT).
            </p>
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
