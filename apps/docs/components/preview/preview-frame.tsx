import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface PreviewFrameProps {
  children: ReactNode;
  className?: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl';
  /** Optional chrome label — e.g. a filename — shown in a hairline header bar. */
  label?: string;
}

// Padding scales with height so a compact card preview doesn't drown in
// whitespace while the full detail-page sandbox gets room to breathe.
const sizeStyles = {
  sm: 'min-h-[160px] p-6',
  md: 'min-h-[240px] p-8',
  lg: 'min-h-[360px] p-10 sm:p-14',
  xl: 'min-h-[480px] p-12 sm:p-16',
} satisfies Record<NonNullable<PreviewFrameProps['minHeight']>, string>;

/**
 * The sandboxed surface every live/looping demo renders inside — SmoothUI's
 * "frame-box" dotted canvas (app/global.css `.frame-box`), ported as a
 * self-contained utility stack rather than a global class: a rounded card on
 * `bg-background`/`border-border`, with a `currentColor`-driven dot-grid so
 * it repaints correctly in light and dark without a `dark:` override.
 */
export function PreviewFrame({ children, className, minHeight = 'md', label }: PreviewFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-background', className)}>
      {label && (
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        </div>
      )}
      <div
        className={cn(
          'relative isolate flex items-center justify-center overflow-hidden bg-background',
          sizeStyles[minHeight],
        )}
      >
        {/* Dotted canvas — currentColor keeps it theme-correct without dark: */}
        <div
          aria-hidden
          className="absolute inset-0 text-foreground/[0.07] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
