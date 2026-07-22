import { cn } from '@varient/ui';

interface DotGridMaskProps {
  className?: string;
}

/**
 * Subtle dot texture with a radial fade — used behind the CTA panel and
 * section accents. Composes the global `bg-dot-grid` texture with
 * `mask-fade-radial`; pure CSS, no raw hex, semantic tokens only.
 */
export function DotGridMask({ className }: DotGridMaskProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden mask-fade-radial',
        className,
      )}
    >
      <div className="absolute inset-0 bg-dot-grid opacity-70" />
    </div>
  );
}
