'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Button } from '../../foundation/button';
import { DURATION_INSTANT, EASE_OUT } from '../../../lib/animation';
import { cn } from '../../../lib/utils';

export interface NavbarItem {
  label: string;
  href: string;
}

export interface NavbarCta {
  label: string;
  href: string;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Two-tone wordmark text when `logo` is omitted. @default 'Varient' */
  brandName?: string;
  /** Custom logo node — replaces the default two-tone wordmark. */
  logo?: ReactNode;
  items?: NavbarItem[];
  githubHref?: string;
  cta?: NavbarCta;
  /** Pin the bar to the top of the viewport. @default true */
  isSticky?: boolean;
  /** Href matching the active route — that item renders the primary pill treatment. */
  activeHref?: string;
}

const DEFAULT_ITEMS: NavbarItem[] = [
  { label: 'Components', href: '/components' },
  { label: 'Docs', href: '/docs' },
  { label: 'Examples', href: '/docs/sections/hero' },
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

function MenuIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function BrandWordmark({ name }: { name: string }) {
  const splitIndex = Math.max(1, name.length - 3);
  const first = name.slice(0, splitIndex);
  const last = name.slice(splitIndex);

  return (
    <span className="font-title text-lg font-semibold tracking-tight">
      <span className="text-foreground">{first}</span>
      <span className="text-brand">{last}</span>
    </span>
  );
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      className,
      brandName = 'Varient',
      logo,
      items = DEFAULT_ITEMS,
      githubHref,
      cta,
      isSticky = true,
      activeHref,
      ...props
    },
    ref,
  ) => {
    const shouldReduceMotion = useReducedMotion();
    const menuId = useId();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const closeMobile = useCallback(() => setIsMobileOpen(false), []);

    useEffect(() => {
      if (!isMobileOpen) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') closeMobile();
      };

      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, [isMobileOpen, closeMobile]);

    const panelTransition = shouldReduceMotion
      ? DURATION_INSTANT
      : { duration: 0.3, ease: EASE_OUT };

    return (
      <header
        ref={ref}
        className={cn('w-full', isSticky && 'sticky top-0 z-50', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="rounded-full border border-border bg-background/80 px-3 py-2 backdrop-blur-xl sm:px-5 sm:py-2.5">
            <div className="flex items-center justify-between gap-4">
              <a
                aria-label={`${brandName} home`}
                className={cn('inline-flex shrink-0 rounded-sm', focusRing)}
                href="/"
              >
                {logo ?? <BrandWordmark name={brandName} />}
              </a>

              <nav
                aria-label="Main"
                className="hidden items-center gap-1 md:flex"
              >
                {items.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <a
                      key={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'rounded-full px-3 py-1.5 text-sm transition-colors duration-200 hover:bg-primary hover:text-foreground motion-reduce:transition-none',
                        isActive
                          ? 'bg-primary text-foreground'
                          : 'text-muted-foreground',
                        focusRing,
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="hidden items-center gap-2 md:flex">
                {githubHref && (
                  <a
                    aria-label="View source on GitHub"
                    className={cn(
                      'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-foreground motion-reduce:transition-none',
                      focusRing,
                    )}
                    href={githubHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubIcon className="size-[18px]" />
                  </a>
                )}
                {cta && (
                  <Button asChild size="sm" variant="primary">
                    <a href={cta.href}>{cta.label}</a>
                  </Button>
                )}
              </div>

              <button
                aria-controls={menuId}
                aria-expanded={isMobileOpen}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                className={cn(
                  'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-foreground md:hidden motion-reduce:transition-none',
                  focusRing,
                )}
                onClick={() => setIsMobileOpen((open) => !open)}
                type="button"
              >
                {isMobileOpen ? (
                  <CloseIcon className="size-5" />
                ) : (
                  <MenuIcon className="size-5" />
                )}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isMobileOpen && (
                <motion.nav
                  animate={{ height: 'auto', opacity: 1 }}
                  aria-label="Mobile"
                  className="overflow-hidden md:hidden"
                  exit={
                    shouldReduceMotion
                      ? { height: 0, opacity: 0 }
                      : { height: 0, opacity: 0 }
                  }
                  id={menuId}
                  initial={
                    shouldReduceMotion
                      ? { height: 'auto', opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={panelTransition}
                >
                  <div className="flex flex-col gap-1 border-t border-border pt-3 pb-1">
                    {items.map((item) => {
                      const isActive = activeHref === item.href;
                      return (
                        <a
                          key={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-primary hover:text-foreground motion-reduce:transition-none',
                            isActive
                              ? 'bg-primary text-foreground'
                              : 'text-muted-foreground',
                            focusRing,
                          )}
                          href={item.href}
                          onClick={closeMobile}
                        >
                          {item.label}
                        </a>
                      );
                    })}

                    {(githubHref || cta) && (
                      <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                        {githubHref && (
                          <a
                            aria-label="View source on GitHub"
                            className={cn(
                              'inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-primary hover:text-foreground motion-reduce:transition-none',
                              focusRing,
                            )}
                            href={githubHref}
                            onClick={closeMobile}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <GithubIcon className="size-[18px]" />
                          </a>
                        )}
                        {cta && (
                          <Button asChild className="flex-1" size="sm" variant="primary">
                            <a href={cta.href} onClick={closeMobile}>
                              {cta.label}
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = 'Navbar';
