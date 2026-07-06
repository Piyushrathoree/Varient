'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@varient/ui';

/**
 * Light/dark toggle — ported from SmoothUI's `ThemeSwitch` (float-nav.tsx).
 * Two modes only, switched via the `.dark` class (next-themes, wired through
 * fumadocs' `RootProvider`). No system option, no theme-identity engine.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn('size-9 rounded-full border border-transparent bg-muted/50', className)}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-full border border-transparent text-foreground transition-colors duration-150 active:scale-[0.97]',
        'hover:border-border hover:bg-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'motion-reduce:transition-none motion-reduce:active:scale-100',
        className,
      )}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
