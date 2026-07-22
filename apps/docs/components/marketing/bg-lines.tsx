import { cn } from '@varient/ui';

/**
 * Near-invisible structural grid texture behind a section. Renders the global
 * `.bg-grid-fine` lattice with a soft radial fade at the edges — PNG line
 * assets are gone; this is pure CSS, no raw hex.
 */
export function BgLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-grid-fine mask-fade-radial',
        className,
      )}
    />
  );
}
