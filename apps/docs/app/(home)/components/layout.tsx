'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PanelLeftOpen, X } from 'lucide-react';
import { cn } from '@varient/ui';
import { ComponentsSidebar } from '@/components/site/components-sidebar';
import { GalleryNavProvider } from '@/components/site/gallery-nav-context';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/**
 * Shell for the `/components` section — sidebar left, content right. Below `lg`
 * we add a hamburger + slide-over drawer for small viewports, reusing the same
 * `ComponentsSidebar` nav content.
 */
export default function ComponentsSectionLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <GalleryNavProvider>
      <div className="mx-auto flex w-full max-w-[90rem]">
        <ComponentsSidebar />

      {/* Mobile trigger — hamburger fallback for the sidebar below `lg`. */}
      <button
        aria-controls="components-mobile-nav"
        aria-expanded={open}
        aria-label="Browse components"
        className={cn(
          'glass fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground lg:hidden',
          focusRing,
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        <PanelLeftOpen aria-hidden className="size-4" />
        Browse components
      </button>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        inert={!open}
        className={cn('fixed inset-0 z-50 lg:hidden', open ? 'pointer-events-auto' : 'pointer-events-none')}
      >
        <div
          className={cn(
            'absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-200',
            open ? 'opacity-100' : 'opacity-0',
            'motion-reduce:transition-none',
          )}
          onClick={() => setOpen(false)}
        />
        <div
          aria-label="Browse components"
          aria-modal="true"
          className={cn(
            'absolute inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col border-r border-border bg-background p-4 transition-transform duration-200',
            open ? 'translate-x-0' : '-translate-x-full',
            'motion-reduce:transition-none',
          )}
          id="components-mobile-nav"
          role="dialog"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-smooth-800">
              Components
            </span>
            <button
              aria-label="Close"
              className={cn(
                'inline-flex size-8 items-center justify-center rounded-full text-smooth-800 transition-colors duration-150 hover:bg-smooth-200 hover:text-foreground',
                focusRing,
              )}
              onClick={() => setOpen(false)}
              type="button"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
          <ComponentsSidebar className="flex-1" variant="drawer" />
        </div>
      </div>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </GalleryNavProvider>
  );
}
