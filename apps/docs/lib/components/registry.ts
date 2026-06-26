export type ComponentLayer = 'foundation' | 'animated' | 'sections';
export type ComponentStatus = 'ready' | 'coming-soon';

export interface ComponentEntry {
  name: string;
  slug: string;
  layer: ComponentLayer;
  description: string;
  status: ComponentStatus;
}

export const layerLabels: Record<ComponentLayer, string> = {
  foundation: 'Foundation',
  animated: 'Animated',
  sections: 'Sections',
};

export const components: ComponentEntry[] = [
  // Foundation
  { name: 'Button', slug: 'button', layer: 'foundation', description: 'Clickable actions with variants, sizes, and loading states.', status: 'ready' },
  { name: 'Input', slug: 'input', layer: 'foundation', description: 'Text input with label, helper text, and error states.', status: 'ready' },
  { name: 'Textarea', slug: 'textarea', layer: 'foundation', description: 'Multiline text input with resize control.', status: 'coming-soon' },
  { name: 'Select', slug: 'select', layer: 'foundation', description: 'Accessible dropdown select powered by Radix.', status: 'coming-soon' },
  { name: 'Checkbox', slug: 'checkbox', layer: 'foundation', description: 'Boolean input with indeterminate support.', status: 'coming-soon' },
  { name: 'Radio', slug: 'radio', layer: 'foundation', description: 'Single choice from a group of options.', status: 'coming-soon' },
  { name: 'Toggle', slug: 'toggle', layer: 'foundation', description: 'On/off switch for boolean settings.', status: 'coming-soon' },
  { name: 'Badge', slug: 'badge', layer: 'foundation', description: 'Compact status and label indicators.', status: 'coming-soon' },
  { name: 'Avatar', slug: 'avatar', layer: 'foundation', description: 'User profile image with fallback initials.', status: 'coming-soon' },
  { name: 'Card', slug: 'card', layer: 'foundation', description: 'Container for grouped content and actions.', status: 'coming-soon' },
  { name: 'Modal', slug: 'modal', layer: 'foundation', description: 'Dialog overlay for focused interactions.', status: 'coming-soon' },
  { name: 'Tooltip', slug: 'tooltip', layer: 'foundation', description: 'Contextual hint on hover or focus.', status: 'coming-soon' },
  { name: 'Tabs', slug: 'tabs', layer: 'foundation', description: 'Switch between related content panels.', status: 'coming-soon' },
  { name: 'Table', slug: 'table', layer: 'foundation', description: 'Structured data display with sorting support.', status: 'coming-soon' },
  // Animated
  { name: 'Marquee', slug: 'marquee', layer: 'animated', description: 'Infinitely scrolling content strip.', status: 'coming-soon' },
  { name: 'Border Beam', slug: 'border-beam', layer: 'animated', description: 'Animated light traveling around a border.', status: 'coming-soon' },
  { name: 'Shimmer Button', slug: 'shimmer-button', layer: 'animated', description: 'Button with a moving shimmer highlight.', status: 'coming-soon' },
  { name: 'Particles', slug: 'particles', layer: 'animated', description: 'Interactive floating particle field.', status: 'coming-soon' },
  { name: 'Globe', slug: 'globe', layer: 'animated', description: 'Rotating 3D globe with arc connections.', status: 'coming-soon' },
  { name: 'Spotlight', slug: 'spotlight', layer: 'animated', description: 'Cursor-following radial light effect.', status: 'coming-soon' },
  { name: 'Text Reveal', slug: 'text-reveal', layer: 'animated', description: 'Scroll-triggered text animation.', status: 'coming-soon' },
  { name: 'Blur Fade', slug: 'blur-fade', layer: 'animated', description: 'Elements fade in with blur on scroll.', status: 'coming-soon' },
  // Sections
  { name: 'Hero', slug: 'hero', layer: 'sections', description: 'Full-width hero with headline and CTAs.', status: 'coming-soon' },
  { name: 'Features', slug: 'features', layer: 'sections', description: 'Grid of product features with icons.', status: 'coming-soon' },
  { name: 'Pricing', slug: 'pricing', layer: 'sections', description: 'Tiered pricing comparison table.', status: 'coming-soon' },
  { name: 'Testimonials', slug: 'testimonials', layer: 'sections', description: 'Customer quotes and social proof.', status: 'coming-soon' },
  { name: 'FAQ', slug: 'faq', layer: 'sections', description: 'Accordion-style frequently asked questions.', status: 'coming-soon' },
  { name: 'CTA', slug: 'cta', layer: 'sections', description: 'Call-to-action banner section.', status: 'coming-soon' },
  { name: 'Footer', slug: 'footer', layer: 'sections', description: 'Site footer with links and branding.', status: 'coming-soon' },
];

export function getComponentHref(entry: ComponentEntry): string | null {
  if (entry.status !== 'ready') return null;
  return `/components/${entry.slug}`;
}

export function getComponentBySlug(slug: string): ComponentEntry | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByLayer(layer: ComponentLayer | 'all'): ComponentEntry[] {
  if (layer === 'all') return components;
  return components.filter((c) => c.layer === layer);
}

export function getReadyCount(): number {
  return components.filter((c) => c.status === 'ready').length;
}
