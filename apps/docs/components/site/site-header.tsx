'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import type { Variants } from 'motion/react';
import { useEffect, useState } from 'react';
import { cn, Kbd } from '@varient/ui';
import { Github } from '@/components/site/brand-icons';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { useCommandMenu } from '@/components/site/command-menu';
import { gitConfig } from '@/lib/shared';

const navLinks = [
  { href: '/components', label: 'Components' },
  { href: '/docs', label: 'Docs' },
] as const;

const GITHUB_URL = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const iconButtonClass =
  'inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-200 hover:border-border hover:bg-smooth-100 hover:text-foreground active:scale-[0.97] motion-reduce:active:scale-100';

const underlineSpring = { type: 'spring', stiffness: 380, damping: 32 } as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const { openCommandMenu } = useCommandMenu();

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = navLinks.find((link) => isActiveLink(link.href))?.href ?? null;
  const underlineHref = hoveredHref ?? activeHref;

  const overlayVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { duration: 0.2, delayChildren: 0.05, staggerChildren: 0.06 },
        },
        exit: { opacity: 0, transition: { duration: 0.18 } },
      };

  const overlayItemVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 260, damping: 30 },
        },
      };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors duration-300',
        isScrolled ? 'border-border' : 'border-transparent',
      )}
    >
      {/* Glass layer lives on a sibling, not the header itself: backdrop-filter on an
          ancestor would become the containing block for the fixed mobile overlay. */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 transition-opacity duration-300',
          isScrolled ? 'glass opacity-100' : 'opacity-0',
        )}
      />
      <div className="relative z-50 mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left — brand mark */}
        <Link
          className={cn('flex items-center gap-2.5 rounded-md py-1', focusRing)}
          href="/"
        >
          <span
            aria-hidden
            className="flex size-[22px] items-center justify-center rounded-md bg-[image:var(--accent-gradient)] text-[12px] leading-none text-white"
          >
            ✦
          </span>
          <span className="font-title text-base font-semibold lowercase tracking-tight text-foreground">
            varient
          </span>
        </Link>

        {/* Center — absolute-centered nav (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-full items-center justify-center md:flex">
          <nav
            aria-label="Main"
            className="pointer-events-auto flex items-center gap-1"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                    focusRing,
                  )}
                  href={link.href}
                  onBlur={() => setHoveredHref(null)}
                  onFocus={() => setHoveredHref(link.href)}
                  onMouseEnter={() => setHoveredHref(link.href)}
                >
                  {link.label}
                  {underlineHref === link.href && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-brand"
                      layoutId="site-header-underline"
                      transition={
                        shouldReduceMotion ? { duration: 0 } : underlineSpring
                      }
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right — actions (desktop) */}
        <div className="hidden items-center gap-1.5 md:flex">
          <button
            aria-label="Search components"
            className={cn(
              'inline-flex h-8 items-center gap-2 rounded-md border border-border bg-smooth-100 pl-2.5 pr-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-brand/40 hover:text-foreground',
              focusRing,
            )}
            onClick={openCommandMenu}
            type="button"
          >
            <Search aria-hidden className="size-3.5" />
            <span>Search</span>
            <Kbd className="font-mono" size="sm">
              ⌘K
            </Kbd>
          </button>
          <a
            aria-label="View source on GitHub"
            className={cn(iconButtonClass, focusRing)}
            href={GITHUB_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="size-4" />
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile — hamburger */}
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
      </div>

      {/* Mobile — full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate="show"
            className="fixed inset-0 z-40 flex flex-col bg-background pt-[60px] md:hidden"
            exit="exit"
            id="mobile-nav"
            initial="hidden"
            variants={overlayVariants}
          >
            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
            >
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <motion.div key={link.href} variants={overlayItemVariants}>
                    <Link
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'block rounded-md py-2 font-title text-4xl font-semibold tracking-[-0.03em] transition-colors duration-200',
                        isActive
                          ? 'text-brand'
                          : 'text-muted-foreground hover:text-foreground',
                        focusRing,
                      )}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              className="flex flex-col gap-3 border-t border-border p-6"
              variants={overlayItemVariants}
            >
              <button
                aria-label="Search components"
                className={cn(
                  'flex w-full items-center gap-2 rounded-md border border-border bg-smooth-100 px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground',
                  focusRing,
                )}
                onClick={() => {
                  setMenuOpen(false);
                  openCommandMenu();
                }}
                type="button"
              >
                <Search aria-hidden className="size-4 shrink-0" />
                <span className="flex-1">Search</span>
                <Kbd className="font-mono" size="sm">
                  ⌘K
                </Kbd>
              </button>
              <div className="flex items-center gap-2">
                <a
                  aria-label="View source on GitHub"
                  className={cn(
                    'inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-smooth-100',
                    focusRing,
                  )}
                  href={GITHUB_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
                <ThemeToggle className="rounded-md border-border" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
