'use client';

import { useRef } from 'react';
import { FloatingNavbar } from '@varient/ui';
import { BookOpen, Home, Layers } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', icon: <Home className="size-4" strokeWidth={1.5} aria-hidden="true" /> },
  { label: 'Docs', href: '#docs', icon: <BookOpen className="size-4" strokeWidth={1.5} aria-hidden="true" /> },
  { label: 'Components', href: '#components', icon: <Layers className="size-4" strokeWidth={1.5} aria-hidden="true" /> },
] as const;

export function FloatingNavbarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-6">
      <p className="max-w-md text-center text-sm font-medium text-muted-foreground">
        Scroll down inside the frame — the nav pill hides. Scroll up — it slides back in.
      </p>

      <div
        ref={scrollRef}
        className="relative h-80 w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-background"
      >
        <FloatingNavbar
          isFixed={false}
          scrollContainerRef={scrollRef}
          items={[...NAV_ITEMS]}
          cta={{ label: 'Get started', href: '#start' }}
        />

        <div className="flex flex-col gap-4 px-4 pt-20 pb-8">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-muted/50 p-4"
            >
              <p className="text-sm font-medium text-foreground">Section {index + 1}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep scrolling to see the navbar hide on the way down and return on the way up.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FloatingNavbarPreviewCompact() {
  return (
    <div className="flex h-14 w-full items-start justify-center overflow-hidden pt-1">
      <FloatingNavbar
        isFixed={false}
        className="!top-0 scale-[0.8] origin-top"
        items={[
          { label: 'Home', href: '#' },
          { label: 'Docs', href: '#' },
        ]}
        cta={{ label: 'Start', href: '#' }}
      />
    </div>
  );
}
