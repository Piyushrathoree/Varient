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
import { AccordionDemo, AccordionPreviewCompact } from '@/components/demos/accordion-demo';
import { DialogDemo, DialogPreviewCompact } from '@/components/demos/dialog-demo';
import {
  DropdownMenuDemo,
  DropdownMenuPreviewCompact,
} from '@/components/demos/dropdown-menu-demo';
import { TooltipDemo, TooltipPreviewCompact } from '@/components/demos/tooltip-demo';
import { SelectDemo, SelectPreviewCompact } from '@/components/demos/select-demo';
import { CheckboxDemo, CheckboxPreviewCompact } from '@/components/demos/checkbox-demo';
import { RadioGroupDemo, RadioGroupPreviewCompact } from '@/components/demos/radio-group-demo';
import { ToastDemo, ToastPreviewCompact } from '@/components/demos/toast-demo';
import { ButtonCopyDemo, ButtonCopyPreviewCompact } from '@/components/demos/button-copy-demo';
import {
  MagneticButtonDemo,
  MagneticButtonPreviewCompact,
} from '@/components/demos/magnetic-button-demo';

export const componentDemos: Record<string, ComponentType> = {
  button: ButtonDemo,
  input: InputDemo,
  'number-ticker': NumberTickerDemo,
  badge: BadgeDemo,
  card: CardDemo,
  switch: SwitchDemo,
  tabs: TabsDemo,
  accordion: AccordionDemo,
  dialog: DialogDemo,
  'dropdown-menu': DropdownMenuDemo,
  tooltip: TooltipDemo,
  select: SelectDemo,
  checkbox: CheckboxDemo,
  'radio-group': RadioGroupDemo,
  toast: ToastDemo,
  'button-copy': ButtonCopyDemo,
  'magnetic-button': MagneticButtonDemo,
};

export const componentCompactDemos: Record<string, ComponentType> = {
  button: ButtonPreviewCompact,
  input: InputPreviewCompact,
  'number-ticker': NumberTickerPreviewCompact,
  badge: BadgePreviewCompact,
  card: CardPreviewCompact,
  switch: SwitchPreviewCompact,
  tabs: TabsPreviewCompact,
  accordion: AccordionPreviewCompact,
  dialog: DialogPreviewCompact,
  'dropdown-menu': DropdownMenuPreviewCompact,
  tooltip: TooltipPreviewCompact,
  select: SelectPreviewCompact,
  checkbox: CheckboxPreviewCompact,
  'radio-group': RadioGroupPreviewCompact,
  toast: ToastPreviewCompact,
  'button-copy': ButtonCopyPreviewCompact,
  'magnetic-button': MagneticButtonPreviewCompact,
};

export function getDemo(slug: string, compact = false): ComponentType | null {
  const map = compact ? componentCompactDemos : componentDemos;
  return map[slug] ?? null;
}
