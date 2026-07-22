'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@varient/ui';
import { Monitor, RotateCcw, Sun, Moon } from 'lucide-react';
import { previewFrameSizeStyles, PreviewDotGrid } from './preview-frame';

type PreviewThemeMode = 'inherit' | 'light' | 'dark';

interface PreviewStageProps {
  children: ReactNode;
  className?: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'section';
  alignTop?: boolean;
  /** Include when the same stage instance renders different content (e.g. prev/next
   * nav on the detail page) so switching content also resets replay + demo state. */
  stageKey?: string;
}

const iconButtonClass =
  'inline-flex size-7 items-center justify-center rounded-md border border-border bg-smooth-50 text-smooth-800 transition-colors duration-150 hover:border-brand/40 hover:bg-smooth-100 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] motion-reduce:active:scale-100 motion-reduce:transition-none';

const themeIcons: Record<PreviewThemeMode, typeof Sun> = {
  inherit: Monitor,
  light: Sun,
  dark: Moon,
};

const nextThemeMode: Record<PreviewThemeMode, PreviewThemeMode> = {
  inherit: 'light',
  light: 'dark',
  dark: 'inherit',
};

/**
 * The live-preview canvas used by the component detail page and mdx previews.
 * Wraps `PreviewFrame`'s dotted-canvas styling with a slim bordered chip
 * cluster: Replay (remounts children) and a per-preview theme override
 * (inherit → light → dark) that flips tokens only inside this stage via the
 * `.light`/`.dark` class scoping already defined in global.css.
 */
export function PreviewStage({
  children,
  className,
  minHeight = 'lg',
  alignTop = false,
  stageKey,
}: PreviewStageProps) {
  const [replayKey, setReplayKey] = useState(0);
  const [previewTheme, setPreviewTheme] = useState<PreviewThemeMode>('inherit');

  const ThemeIcon = themeIcons[previewTheme];

  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-smooth-100', className)}>
      <div
        className={cn(
          'relative isolate flex overflow-hidden bg-smooth-100 text-foreground',
          previewTheme !== 'inherit' && previewTheme,
          alignTop ? 'items-start justify-center' : 'items-center justify-center',
          previewFrameSizeStyles[minHeight],
        )}
      >
        <PreviewDotGrid />

        <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5">
          <button
            type="button"
            className={iconButtonClass}
            aria-label="Replay animation"
            onClick={() => setReplayKey((key) => key + 1)}
          >
            <RotateCcw className="size-3.5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className={iconButtonClass}
            aria-label="Preview theme"
            onClick={() => setPreviewTheme((mode) => nextThemeMode[mode])}
          >
            <ThemeIcon className="size-3.5" strokeWidth={1.75} />
          </button>
        </div>

        <div key={`${stageKey ?? ''}-${replayKey}`} className="contents">
          <div className="relative z-10 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
