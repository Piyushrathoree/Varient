'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutGrid, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import { ThemeToggle } from '@/components/site/theme-toggle';

const navLinks = [
  { href: '/components', label: 'Components', icon: LayoutGrid },
  { href: '/docs', label: 'Docs', icon: BookOpen },
] as const;

const GITHUB_URL = 'https://github.com/piyush/varient';

// Shared focus treatment, ported to SmoothUI's brand token.
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// SmoothUI's `.trigger`/`.link` nav-item treatment (navbar.css), inlined as
// Tailwind utilities since we don't ship a companion navbar.css file here.
const navItemClass =
  'inline-flex items-center gap-2 rounded-full border border-transparent px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:border-border hover:bg-primary hover:text-foreground';

const navItemActiveClass = 'bg-brand/10 text-brand hover:bg-brand/10 hover:text-brand';

// SmoothUI's `.float-trigger` icon-button treatment (smoothui.css).
const iconButtonClass =
  'inline-flex size-9 items-center justify-center rounded-full border border-transparent text-foreground transition-colors duration-150 active:scale-[0.97] hover:border-border hover:bg-primary motion-reduce:active:scale-100';

/**
 * Site chrome header — ported from SmoothUI's floating pill navbar
 * (`components/landing/navbar/navbar.tsx` + `navbar.css`). SmoothUI renders
 * its pill as `position: fixed`, which relies on its docs pages reserving top
 * padding to avoid overlap; since we don't own every page that renders under
 * this header, it's `sticky` instead (occupies normal flow, no dependency on
 * every other file's spacing) with the same rounded-pill/blur/border look.
 *
 * No mega-menu dropdowns — Varient only has Components/Docs, not SmoothUI's
 * Blocks/Resources sections, so plain links replace their Radix
 * NavigationMenu content panes. No theme-identity engine: two modes only.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Never leave the mobile menu open behind the desktop nav after a resize.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setMenuOpen(false);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-3 rounded-full border border-border bg-background/80 px-3 py-2 shadow-sm backdrop-blur-xl backdrop-saturate-150 sm:px-4">
          {/* Wordmark */}
          <Link href="/" className={cn('group flex items-center gap-2 rounded-full px-1', focusRing)}>
            <span className="font-semibold text-lg tracking-tight text-foreground">Varient</span>
            <span
              aria-hidden
              className="size-1.5 rounded-full bg-brand transition-transform duration-150 group-hover:scale-125 motion-reduce:group-hover:scale-100"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(navItemClass, focusRing, isActive && navItemActiveClass)}
                >
                  <link.icon className="size-4" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster — desktop */}
          <div className="hidden items-center gap-1.5 md:flex">
            <ThemeToggle />
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className={cn(iconButtonClass, focusRing)}
            >
              <Github className="size-4" />
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(iconButtonClass, focusRing, 'md:hidden')}
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* Mobile slide-down panel */}
        <div
          id="mobile-nav"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          className={cn(
            'absolute inset-x-0 top-full mt-2 origin-top rounded-2xl border border-border bg-background p-3 shadow-lg transition-[opacity,transform] duration-150 md:hidden',
            menuOpen
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-95 opacity-0',
            'motion-reduce:transition-none motion-reduce:scale-100',
          )}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:bg-primary hover:text-foreground',
                    focusRing,
                    isActive && navItemActiveClass,
                  )}
                >
                  <link.icon className="size-4" aria-hidden />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors duration-150 hover:bg-primary hover:text-foreground',
                focusRing,
              )}
            >
              <Github className="size-4" />
              GitHub
            </a>
            <ThemeToggle className="rounded-xl border-border" />
          </div>
        </div>
      </div>
    </header>
  );
}
