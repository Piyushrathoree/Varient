import type { ComponentType } from 'react';
import { cn } from '@varient/ui';

interface FrameProps {
  /** Zero-prop preview component to mount inside the frame (a compact demo). */
  component: ComponentType;
  /** Shown under the frame in a small mono label — the component's display name. */
  label?: string;
  className?: string;
}

/**
 * Ported from SmoothUI's `components/landing/frame.tsx` — the machined
 * "component sits inside the instrument" box (`.frame-box`: hairline border +
 * inset ring + faint dot-grid) used by `ComponentsSlideshow`. Renders a real,
 * live component instance, not a screenshot.
 */
export default function Frame({ component: Component, label, className }: FrameProps) {
  return (
    <div className={cn('w-full py-3 md:w-full', className)}>
      <div className="mx-auto w-full">
        <article className="grid gap-3">
          <div
            className="frame-box relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-lg p-6 transition md:flex-1"
            id={label ? `component-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined}
          >
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <Component />
            </div>
          </div>
          {label && (
            <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {label}
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
