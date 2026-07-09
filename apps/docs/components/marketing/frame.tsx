import type { ComponentType } from 'react';
import { cn } from '@varient/ui';

interface FrameProps {
  /** Zero-prop preview component to mount inside the frame (a compact demo). */
  component: ComponentType;
  /** Shown under the frame in a small mono label — the component's display name. */
  label?: string;
  className?: string;
}

/** Hairline-bordered preview cell for marketing showcases. */
export default function Frame({ component: Component, label, className }: FrameProps) {
  return (
    <div className={cn('w-full', className)}>
      <article className="grid gap-2">
        <div
          className="relative flex min-h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-foreground/12 hover:bg-card"
          id={label ? `component-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:14px_14px]"
          />
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <Component />
          </div>
        </div>
        {label && (
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        )}
      </article>
    </div>
  );
}
