import { forwardRef, type HTMLAttributes, type ReactNode, type SVGProps } from 'react';
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
  platform: 'github' | 'x' | 'linkedin' | 'discord' | 'youtube';
  /** Custom icon overriding the built-in glyph for `platform`. */
  icon?: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** One-liner under the wordmark. */
  tagline?: string;
  /** Three link columns rendered beside the brand block. */
  columns?: FooterColumn[];
  /** Social profile links with inline SVG icons (github, x, linkedin, discord, youtube). */
  socialLinks?: FooterSocialLink[];
  /** Status pill label in the bottom bar. */
  statusText?: string;
  /** Name used in the copyright line. @default 'Varient' */
  copyrightName?: string;
  /** Optional privacy/terms row rendered under the copyright line. */
  legalLinks?: FooterLink[];
  /** Year shown in the copyright line. Defaults to the current year — pass this to avoid stale SSG copyright. */
  year?: number;
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

function LinkedinIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}

function DiscordIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.45.87-.61 1.26a18.3 18.3 0 0 0-5.48 0 12.6 12.6 0 0 0-.62-1.26.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.89 1.52.07.07 0 0 0-.03.03C.63 9.05-.38 13.58.12 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1-.01-.13c.13-.09.25-.19.37-.29a.08.08 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.08.08 0 0 1 .08.01c.12.1.24.2.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.65-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 2a.08.08 0 0 0 .09.03 19.83 19.83 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.6-5.19-.99-9.68-4.2-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z" />
    </svg>
  );
}

function YoutubeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<FooterSocialLink['platform'], (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  github: GithubIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
  discord: DiscordIcon,
  youtube: YoutubeIcon,
};

function SocialIcon({ social, className }: { social: FooterSocialLink; className?: string }) {
  if (social.icon) return <>{social.icon}</>;
  const Icon = SOCIAL_ICON_MAP[social.platform];
  return <Icon className={className} />;
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
      legalLinks,
      year,
      ...props
    },
    ref,
  ) => {
    const displayYear = year ?? new Date().getFullYear();

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
                      <SocialIcon className="size-[18px]" social={social} />
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {displayYear} {copyrightName}. All rights reserved.
              </p>
              {legalLinks && legalLinks.length > 0 && (
                <ul className="flex items-center gap-4">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-transparent bg-background py-1 pr-3 pl-2 shadow-sm ring-1 ring-border/60">
              <span aria-hidden className="relative flex size-2.5">
                <span className="absolute inset-0 inline-flex size-full animate-ping rounded-full bg-brand/60 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
              </span>
              <span className="text-xs text-foreground">{statusText}</span>
            </div>
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
