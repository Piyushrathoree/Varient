import type { ComponentType } from 'react';
import { ButtonDemo, ButtonPreviewCompact } from '@/components/demos/button-demo';
import { InputDemo, InputPreviewCompact } from '@/components/demos/input-demo';

export const componentDemos: Record<string, ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
};

export const componentCompactDemos: Record<string, ComponentType> = {
  button: ButtonPreviewCompact,
  input: InputPreviewCompact,
};

export function getDemo(slug: string, compact = false): ComponentType | null {
  const map = compact ? componentCompactDemos : componentDemos;
  return map[slug] ?? null;
}
