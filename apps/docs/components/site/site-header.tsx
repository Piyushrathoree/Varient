'use client';

import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';
import { cn } from '@varient/ui';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';

const navLinks = [
  { href: '/components', label: 'Components' },
  { href: '/docs', label: 'Docs' },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-bg-base/80 backdrop-blur-xl shadow-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 shadow-[0_0_12px_rgb(99_102_241/0.4)]">
            <Sparkles className="size-3.5 text-white" />
          </div>
          <span className="font-display text-base font-semibold tracking-tight text-text-primary">
            Varient
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3.5 py-2 text-sm font-medium text-text-secondary transition-all duration-150',
                'hover:bg-bg-subtle hover:text-text-primary',
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <a
            href="https://github.com/piyush/varient"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'ml-1 inline-flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3.5 py-2 text-sm font-medium text-text-secondary transition-all duration-150',
              'hover:border-border-strong hover:text-text-primary',
            )}
          >
            <ExternalLink className="size-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
