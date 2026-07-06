import type { ComponentType } from 'react';
import { ButtonDemo, ButtonPreviewCompact } from '@/components/demos/button-demo';
import { InputDemo, InputPreviewCompact } from '@/components/demos/input-demo';
import {
  NumberTickerDemo,
  NumberTickerPreviewCompact,
} from '@/components/demos/number-ticker-demo';
import { BadgeDemo, BadgePreviewCompact } from '@/components/demos/badge-demo';
import { CardDemo, CardPreviewCompact } from '@/components/demos/card-demo';
import { SwitchDemo, SwitchPreviewCompact } from '@/components/demos/switch-demo';
import { TabsDemo, TabsPreviewCompact } from '@/components/demos/tabs-demo';

export const componentDemos: Record<string, ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
  'number-ticker': NumberTickerDemo,
  badge: BadgeDemo,
  card: CardDemo,
  switch: SwitchDemo,
  tabs: TabsDemo,
};

export const componentCompactDemos: Record<string, ComponentType> = {
  button: ButtonPreviewCompact,
  input: InputPreviewCompact,
  'number-ticker': NumberTickerPreviewCompact,
  badge: BadgePreviewCompact,
  card: CardPreviewCompact,
  switch: SwitchPreviewCompact,
  tabs: TabsPreviewCompact,
};

export function getDemo(slug: string, compact = false): ComponentType | null {
  const map = compact ? componentCompactDemos : componentDemos;
  return map[slug] ?? null;
}
