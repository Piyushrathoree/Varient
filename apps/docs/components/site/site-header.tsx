'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutGrid, Menu, Search, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useEffect, useState } from 'react';
import { cn, Kbd } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { useCommandMenu } from '@/components/site/command-menu';
import { gitConfig } from '@/lib/shared';

const navLinks = [
  { href: '/components', label: 'Components', icon: LayoutGrid },
  { href: '/docs', label: 'Docs', icon: BookOpen },
] as const;

const GITHUB_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const navItemClass =
  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground';

const navItemActiveClass = 'text-foreground';

const iconButtonClass =
  'inline-flex size-8 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all duration-200 hover:border-border hover:bg-card hover:text-foreground active:scale-[0.97] motion-reduce:active:scale-100';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { openCommandMenu } = useCommandMenu();

  const pillScale = useTransform(scrollY, [0, 100], [1, 0.985]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = () => setMenuOpen(false);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className={cn(
            'flex items-center justify-between gap-3 rounded-full border px-3 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color,box-shadow,padding] duration-300 sm:px-4',
            isScrolled
              ? 'border-border bg-background/90 py-1.5 shadow-[0_4px_24px_-4px_color-mix(in_oklab,var(--color-foreground)_6%,transparent)]'
              : 'border-border/50 bg-background/70 py-2',
          )}
          style={shouldReduceMotion ? undefined : { scale: pillScale }}
        >
          <Link
            className={cn('flex items-center gap-2 rounded-full py-0.5 pl-1 pr-2', focusRing)}
            href="/"
          >
            <span className="font-title text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Vari<span className="text-brand">ent</span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    navItemClass,
                    focusRing,
                    isActive && navItemActiveClass,
                    isActive &&
                      'relative after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-brand',
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <button
              aria-label="Search components"
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-card hover:text-foreground active:scale-[0.97] motion-reduce:active:scale-100',
                focusRing,
              )}
              onClick={openCommandMenu}
              type="button"
            >
              <Search aria-hidden className="size-4" />
              <Kbd className="hidden lg:inline-flex" size="sm">
                ⌘K
              </Kbd>
            </button>
            <ThemeToggle />
            <a
              aria-label="View source on GitHub"
              className={cn(iconButtonClass, focusRing)}
              href={GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Github className="size-4" />
            </a>
          </div>

          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={cn(iconButtonClass, focusRing, 'md:hidden')}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </motion.div>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.button
                aria-label="Close menu overlay"
                className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                type="button"
              />
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-background shadow-xl md:hidden"
                exit={{ opacity: 0, y: -8 }}
                id="mobile-nav"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="p-2">
                  <button
                    aria-label="Search components"
                    className={cn(
                      'flex w-full items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:text-foreground',
                      focusRing,
                    )}
                    onClick={() => {
                      setMenuOpen(false);
                      openCommandMenu();
                    }}
                    type="button"
                  >
                    <Search aria-hidden className="size-4 shrink-0" />
                    <span className="flex-1">Search…</span>
                    <Kbd size="sm">⌘K</Kbd>
                  </button>
                </div>
                <nav aria-label="Mobile" className="flex flex-col p-2 pt-0">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);
                    return (
                      <Link
                        key={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground',
                          focusRing,
                          isActive && 'bg-card text-foreground',
                        )}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        <link.icon aria-hidden className="size-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="flex items-center gap-2 border-t border-border p-3">
                  <a
                    className={cn(
                      'inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card',
                      focusRing,
                    )}
                    href={GITHUB_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Github className="size-4" />
                    GitHub
                  </a>
                  <ThemeToggle className="rounded-xl border-border" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
