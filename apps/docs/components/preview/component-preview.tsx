'use client';

import { getDemo } from '@/lib/components/demos';
import { PreviewFrame } from './preview-frame';

interface ComponentPreviewProps {
  name: string;
  minHeight?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Renders a component's live/looping demo inside the sandboxed PreviewFrame.
 * Shared by the component detail page and inline MDX docs content
 * (`<ComponentPreview name="button" />` — see components/mdx.tsx).
 */
export function ComponentPreview({ name, minHeight = 'lg' }: ComponentPreviewProps) {
  const Demo = getDemo(name);

  if (!Demo) {
    return (
      <PreviewFrame minHeight={minHeight}>
        <p className="text-sm text-muted-foreground">Preview not available yet.</p>
      </PreviewFrame>
    );
  }

  return (
    <PreviewFrame minHeight={minHeight}>
      <Demo />
    </PreviewFrame>
  );
}
