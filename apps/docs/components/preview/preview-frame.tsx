import { cn } from '@varient/ui';
import type { ReactNode } from 'react';

interface PreviewFrameProps {
  children: ReactNode;
  className?: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'section';
  /** Optional chrome label — e.g. a filename — shown in a hairline header bar. */
  label?: string;
  /** When true, content aligns to the top instead of center — better for scaled section previews. */
  alignTop?: boolean;
}

// Padding scales with height so a compact card preview doesn't drown in
// whitespace while the full detail-page sandbox gets room to breathe.
export const previewFrameSizeStyles = {
  sm: 'min-h-[160px] p-6',
  md: 'min-h-[240px] p-8',
  lg: 'min-h-[360px] p-10 sm:p-14',
  xl: 'min-h-[480px] p-12 sm:p-16',
  section: 'min-h-[280px] p-0 sm:min-h-[320px]',
} satisfies Record<NonNullable<PreviewFrameProps['minHeight']>, string>;

/**
 * The quiet dot-grid canvas painted behind every live preview — built on the
 * shared `bg-dot-grid` utility (keyed off `--color-foreground`), so it
 * repaints correctly in light and dark without a `dark:` override. Shared by
 * `PreviewFrame` and `PreviewStage` so both canvases stay pixel-identical.
 */
export function PreviewDotGrid() {
  return <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-70" />;
}

/**
 * The sandboxed surface every live/looping demo renders inside — a hairline
 * `bg-smooth-100` drafting-table canvas with a quiet dot-grid texture.
 */
export function PreviewFrame({
  children,
  className,
  minHeight = 'md',
  label,
  alignTop = false,
}: PreviewFrameProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-smooth-100', className)}>
      {label && (
        <div className="flex items-center justify-between border-b border-border bg-smooth-50 px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-smooth-800">
            {label}
          </span>
        </div>
      )}
      <div
        className={cn(
          'relative isolate flex overflow-hidden bg-smooth-100',
          alignTop ? 'items-start justify-center' : 'items-center justify-center',
          previewFrameSizeStyles[minHeight],
        )}
      >
        <PreviewDotGrid />
        <div className="relative z-10 w-full">{children}</div>
      </div>
    </div>
  );
}
