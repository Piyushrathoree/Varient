'use client';

import { getDemo } from '@/lib/components/demos';
import { PreviewFrame } from './preview-frame';

interface ComponentPreviewProps {
  name: string;
  minHeight?: 'sm' | 'md' | 'lg';
}

export function ComponentPreview({ name, minHeight = 'lg' }: ComponentPreviewProps) {
  const Demo = getDemo(name);

  if (!Demo) {
    return (
      <PreviewFrame minHeight={minHeight}>
        <p className="text-sm text-text-tertiary">Preview not available.</p>
      </PreviewFrame>
    );
  }

  return (
    <PreviewFrame minHeight={minHeight}>
      <Demo />
    </PreviewFrame>
  );
}
