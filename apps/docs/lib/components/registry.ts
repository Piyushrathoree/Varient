export type ComponentLayer = 'foundation' | 'animated' | 'sections';

/**
 * Shipped — live preview + copy-ready source.
 * In progress — static preview exists, not copy-ready yet.
 * Planned — named and slotted into a layer, not built yet (shimmer skeleton in the gallery).
 */
export type ComponentStatus = 'shipped' | 'in-progress' | 'planned';

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

function entry(
  name: string,
  layer: ComponentLayer,
  description: string,
  status: ComponentStatus = 'planned',
): ComponentEntry {
  return {
    name,
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    layer,
    description,
    status,
  };
}

export const components: ComponentEntry[] = [
  // ── Foundation (26) — Radix-powered, accessible, dark-first primitives ──
  entry('Button', 'foundation', 'Clickable actions with variants, sizes, and loading states.', 'shipped'),
  entry('Input', 'foundation', 'Text input with label, helper text, and error states.', 'shipped'),
  entry('Textarea', 'foundation', 'Multiline text input with resize control.', 'in-progress'),
  entry('Select', 'foundation', 'Accessible dropdown select powered by Radix.', 'shipped'),
  entry('Checkbox', 'foundation', 'Boolean input with indeterminate support.', 'shipped'),
  entry('Radio Group', 'foundation', 'Single choice from a group of options.', 'shipped'),
  entry('Switch', 'foundation', 'On/off toggle for boolean settings.', 'shipped'),
  entry('Slider', 'foundation', 'Drag to select a value within a range.'),
  entry('Toggle', 'foundation', 'Two-state button for a single boolean setting.'),
  entry('Toggle Group', 'foundation', 'Grouped toggles with single or multi selection.'),
  entry('Badge', 'foundation', 'Compact status and label indicators.', 'shipped'),
  entry('Avatar', 'foundation', 'User profile image with fallback initials.'),
  entry('Card', 'foundation', 'Container for grouped content and actions.', 'shipped'),
  entry('Dialog', 'foundation', 'Modal overlay for focused interactions.', 'shipped'),
  entry('Alert Dialog', 'foundation', 'Interruptive confirmation for destructive actions.'),
  entry('Drawer', 'foundation', 'Edge-anchored panel for supplementary content.'),
  entry('Tabs', 'foundation', 'Switch between related content panels.', 'shipped'),
  entry('Accordion', 'foundation', 'Expand and collapse grouped sections of content.', 'shipped'),
  entry('Tooltip', 'foundation', 'Contextual hint on hover or focus.', 'shipped'),
  entry('Popover', 'foundation', 'Anchored panel for supplementary controls.'),
  entry('Dropdown Menu', 'foundation', 'Anchored list of actions triggered from a button.', 'shipped'),
  entry('Toast', 'foundation', 'Transient notifications with an animated stack.', 'shipped'),
  entry('Table', 'foundation', 'Structured data display with sorting support.'),
  entry('Pagination', 'foundation', 'Navigate between pages of paginated content.'),
  entry('Breadcrumb', 'foundation', 'Hierarchical trail back to a page\u2019s ancestors.'),
  entry('Skeleton Loader', 'foundation', 'Placeholder shimmer for loading content.'),

  // ── Animated (31) — Motion wow-factor, live prop playground ──
  entry('Marquee', 'animated', 'Infinitely scrolling content strip.', 'in-progress'),
  entry('Shimmer Button', 'animated', 'Button with a moving shimmer highlight.'),
  entry('Globe', 'animated', 'Rotating 3D globe with arc connections.'),
  entry('Text Reveal', 'animated', 'Scroll-triggered text animation.'),
  entry('Border Beam', 'animated', 'Animated light traveling around a border.', 'in-progress'),
  entry('Particles', 'animated', 'Interactive floating particle field.'),
  entry('Spotlight', 'animated', 'Cursor-following radial light effect.'),
  entry('Blur Fade', 'animated', 'Elements fade in with blur on scroll.'),
  entry('Typewriter Text', 'animated', 'Characters type on, one at a time.'),
  entry('Number Ticker', 'animated', 'Counts up to a target value on scroll into view.', 'shipped'),
  entry('Button Copy', 'animated', 'Copy button with an animated idle → copied state morph.', 'shipped'),
  entry('Confetti Burst', 'animated', 'Celebratory particle burst on trigger.'),
  entry('Ripple Button', 'animated', 'Button with an expanding ripple on click.'),
  entry('Meteor Shower', 'animated', 'Streaking diagonal light trails across a surface.'),
  entry('Animated Beam', 'animated', 'A traveling light beam connecting two points.'),
  entry('Orbit', 'animated', 'Icons circling a central anchor point.'),
  entry('Magnetic Button', 'animated', 'Button that snaps toward the cursor on approach.', 'shipped'),
  entry('Tilt Card', 'animated', '3D-tilts on pointer move for depth.'),
  entry('Gradient Text', 'animated', 'Animated gradient fill on headline text.'),
  entry('Word Rotate', 'animated', 'Cycles through a list of words in place.'),
  entry('Scroll Progress Bar', 'animated', 'Fixed bar tracking scroll position.'),
  entry('Cursor Spotlight', 'animated', 'Radial glow that follows the pointer.'),
  entry('Flip Words', 'animated', '3D flip transition between rotating words.'),
  entry('Sparkles', 'animated', 'Ambient sparkle particles over content.'),
  entry('Aurora Background', 'animated', 'Slow-drifting gradient mesh backdrop.'),
  entry('Grid Pattern', 'animated', 'Animated grid-line background texture.'),
  entry('Dot Pattern', 'animated', 'Animated dot-grid background texture.'),
  entry('Wavy Background', 'animated', 'Undulating gradient wave backdrop.'),
  entry('Floating Navbar', 'animated', 'Nav bar that hides on scroll down, reveals on scroll up.'),
  entry('Bento Grid', 'animated', 'Animated staggered entrance for a bento layout.'),
  entry('Animated Progress Ring', 'animated', 'Circular progress indicator with animated sweep.'),

  // ── Sections (20) — full-page blocks, compose from Layer 1 + 2 ──
  entry('Hero', 'sections', 'Full-width hero with headline and CTAs.'),
  entry('Pricing', 'sections', 'Tiered pricing comparison table.'),
  entry('FAQ', 'sections', 'Accordion-style frequently asked questions.'),
  entry('Footer', 'sections', 'Site footer with links and branding.'),
  entry('Features', 'sections', 'Grid of product features with icons.'),
  entry('Testimonials', 'sections', 'Customer quotes and social proof.'),
  entry('CTA', 'sections', 'Call-to-action banner section.'),
  entry('Navbar', 'sections', 'Site navigation with responsive menu.'),
  entry('Logo Cloud', 'sections', 'Row of partner or customer logos.'),
  entry('Stats Band', 'sections', 'Row of animated key metrics.'),
  entry('Team Grid', 'sections', 'Grid of team member profiles.'),
  entry('Blog Grid', 'sections', 'Card grid of blog post previews.'),
  entry('Newsletter Signup', 'sections', 'Email capture with inline validation.'),
  entry('Contact Form', 'sections', 'Multi-field contact form with validation.'),
  entry('Comparison Table', 'sections', 'Feature-by-feature plan comparison.'),
  entry('Bento Features', 'sections', 'Asymmetric bento-style feature showcase.'),
  entry('Timeline', 'sections', 'Chronological milestone timeline.'),
  entry('Integration Grid', 'sections', 'Grid of supported integrations.'),
  entry('Changelog', 'sections', 'Versioned list of product updates.'),
  entry('404 Page', 'sections', 'Not-found page with a way back home.'),
];

export const LAYER_COUNT = Object.keys(layerLabels).length;

export function getComponentHref(entry: ComponentEntry): string | null {
  if (entry.status !== 'shipped') return null;
  return `/components/${entry.slug}`;
}

export function getComponentBySlug(slug: string): ComponentEntry | undefined {
  return components.find((c) => c.slug === slug);
}

export function getComponentsByLayer(layer: ComponentLayer | 'all'): ComponentEntry[] {
  if (layer === 'all') return components;
  return components.filter((c) => c.layer === layer);
}

export function getComponentsByStatus(status: ComponentStatus): ComponentEntry[] {
  return components.filter((c) => c.status === status);
}

export function getReadyCount(): number {
  return components.filter((c) => c.status === 'shipped').length;
}
