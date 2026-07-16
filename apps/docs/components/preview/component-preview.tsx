'use client';

import { getDemo } from '@/lib/components/demos';
import { PreviewStage } from './preview-stage';
import { LazyMount } from './lazy-mount';

interface ComponentPreviewProps {
  name: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl' | 'section';
  alignTop?: boolean;
  /**
   * 'section' renders full-bleed (minHeight 'section', alignTop, no padding) —
   * fixes the double-framing that occurs when a sections-layer component
   * (which already frames itself edge-to-edge) sits inside the preview canvas.
   */
  variant?: 'default' | 'section';
}

const placeholderMinHeightPx = {
  sm: 160,
  md: 240,
  lg: 360,
  xl: 480,
  section: 280,
} satisfies Record<NonNullable<ComponentPreviewProps['minHeight']>, number>;

/**
 * Renders a component's live/looping demo inside the sandboxed PreviewStage
 * (replay + per-preview theme controls). Shared by the component detail page
 * and inline MDX docs content (`<ComponentPreview name="button" />` — see
 * components/mdx.tsx). Lazy-mounted so a docs page with many previews doesn't
 * pay for all of them at once.
 */
export function ComponentPreview({
  name,
  minHeight,
  alignTop,
  variant = 'default',
}: ComponentPreviewProps) {
  const Demo = getDemo(name);
  const isSection = variant === 'section';
  const resolvedMinHeight = minHeight ?? (isSection ? 'section' : 'lg');
  const resolvedAlignTop = alignTop ?? isSection;

  return (
    <LazyMount minHeight={placeholderMinHeightPx[resolvedMinHeight]}>
      <PreviewStage minHeight={resolvedMinHeight} alignTop={resolvedAlignTop} stageKey={name}>
        {Demo ? (
          <Demo />
        ) : (
          <p className="text-sm text-muted-foreground">Preview not available yet.</p>
        )}
      </PreviewStage>
    </LazyMount>
  );
}
