import type { ComponentType } from 'react';
import { ButtonDemo, ButtonPreviewCompact } from '@/components/demos/button-demo';

export const componentDemos: Record<string, ComponentType> = {
  button: ButtonDemo,
};

export const componentCompactDemos: Record<string, ComponentType> = {
  button: ButtonPreviewCompact,
};

export function getDemo(slug: string, compact = false): ComponentType | null {
  const map = compact ? componentCompactDemos : componentDemos;
  return map[slug] ?? null;
}
