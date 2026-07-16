import { cn } from '@varient/ui';

/**
 * Near-invisible (4% opacity) repeating line texture behind a section. Relies on
 * the `.bg-lines-page` utility + `--lines-page` (light/dark PNG swap) defined in
 * global.css, and the `/lines-b.png` + `/lines-w.png` assets in `public/`.
 */
export function BgLines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 z-0 mx-auto h-full w-full overflow-hidden bg-lines-page object-none opacity-[0.04]',
        className,
      )}
    />
  );
}
