'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn, SPRING_DEFAULT } from '@varient/ui';

/**
 * Light/dark toggle. Two modes only, switched via the `.dark` class (next-themes,
 * wired through fumadocs' `RootProvider`).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn('size-8 rounded-md border border-transparent bg-smooth-100', className)}
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-smooth-100 text-foreground transition-colors duration-150 active:scale-[0.97]',
        'hover:border-border-strong',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'motion-reduce:transition-none motion-reduce:active:scale-100',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          className="flex items-center justify-center motion-reduce:transition-none"
          initial={shouldReduceMotion ? false : { opacity: 0, rotate: -90, scale: 0.4 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.4 }}
          transition={shouldReduceMotion ? { duration: 0 } : SPRING_DEFAULT}
        >
          <Icon className="size-4" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
