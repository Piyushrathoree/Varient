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
  category: string;
  description: string;
  status: ComponentStatus;
  /** Recently shipped — surfaces a quiet NEW chip in the gallery for a couple of weeks. */
  isNew?: boolean;
}

export const layerLabels: Record<ComponentLayer, string> = {
  foundation: 'Foundation',
  animated: 'Animated',
  sections: 'Sections',
};

/** Ordered category lists per layer — drives sidebar and gallery section order. */
export const layerCategories: Record<ComponentLayer, readonly string[]> = {
  foundation: ['Forms & Inputs', 'Overlays', 'Data Display', 'Navigation', 'Feedback'],
  animated: [
    'Text Effects',
    'Buttons',
    'Backgrounds',
    'Cards & Surfaces',
    'Visualizations',
    'Layout & Navigation',
  ],
  sections: ['Marketing', 'Content', 'Commerce', 'Utility'],
};

/** Short blurbs shown under each category heading in the gallery. */
export const categoryDescriptions: Record<ComponentLayer, Record<string, string>> = {
  foundation: {
    'Forms & Inputs': 'Accessible inputs and controls for collecting user data.',
    Overlays: 'Modal surfaces, anchored panels, and contextual overlays.',
    'Data Display': 'Containers and structured content for presenting information.',
    Navigation: 'Wayfinding primitives for moving between views and pages.',
    Feedback: 'Transient messages and status communication.',
  },
  animated: {
    'Text Effects': 'Motion-driven typography and counting animations.',
    Buttons: 'Interactive buttons with shimmer, ripple, and magnetic effects.',
    Backgrounds: 'Ambient backdrops, patterns, and particle fields.',
    'Cards & Surfaces': 'Depth, borders, and spotlight effects on surfaces.',
    Visualizations: 'Globes, beams, orbits, and progress indicators.',
    'Layout & Navigation': 'Marquees, scroll progress, and animated nav chrome.',
  },
  sections: {
    Marketing: 'Heroes, CTAs, and social proof for landing pages.',
    Content: 'Feature grids, FAQs, blogs, and editorial blocks.',
    Commerce: 'Pricing tables and plan comparison sections.',
    Utility: 'Navbars, footers, forms, and utility page layouts.',
  },
};

function entry(
  name: string,
  layer: ComponentLayer,
  category: string,
  description: string,
  status: ComponentStatus = 'planned',
  isNew?: boolean,
): ComponentEntry {
  return {
    name,
    slug: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    layer,
    category,
    description,
    status,
    ...(isNew ? { isNew } : {}),
  };
}

export const components: ComponentEntry[] = [
  // ── Foundation (26) — Radix-powered, accessible, dark-first primitives ──
  entry('Button', 'foundation', 'Forms & Inputs', 'Clickable actions with variants, sizes, and loading states.', 'shipped'),
  entry('Input', 'foundation', 'Forms & Inputs', 'Text input with label, helper text, and error states.', 'shipped'),
  entry('Textarea', 'foundation', 'Forms & Inputs', 'Multiline text input with resize control.', 'shipped'),
  entry('Select', 'foundation', 'Forms & Inputs', 'Accessible dropdown select powered by Radix.', 'shipped'),
  entry('Checkbox', 'foundation', 'Forms & Inputs', 'Boolean input with indeterminate support.', 'shipped'),
  entry('Radio Group', 'foundation', 'Forms & Inputs', 'Single choice from a group of options.', 'shipped'),
  entry('Switch', 'foundation', 'Forms & Inputs', 'On/off toggle for boolean settings.', 'shipped'),
  entry('Slider', 'foundation', 'Forms & Inputs', 'Drag to select a value within a range.', 'shipped'),
  entry('Toggle', 'foundation', 'Forms & Inputs', 'Two-state button for a single boolean setting.', 'shipped'),
  entry('Toggle Group', 'foundation', 'Forms & Inputs', 'Grouped toggles with single or multi selection.', 'shipped'),
  entry('Input OTP', 'foundation', 'Forms & Inputs', 'Segmented one-time-code input with group and separator composition.', 'shipped'),
  entry('Prompt Input', 'foundation', 'Forms & Inputs', 'AI-chat composer with auto-growing textarea, attachments, and submit state.', 'shipped', true),
  entry('Dialog', 'foundation', 'Overlays', 'Modal overlay for focused interactions.', 'shipped'),
  entry('Alert Dialog', 'foundation', 'Overlays', 'Interruptive confirmation for destructive actions.', 'shipped'),
  entry('Drawer', 'foundation', 'Overlays', 'Edge-anchored panel for supplementary content.', 'shipped'),
  entry('Tooltip', 'foundation', 'Overlays', 'Contextual hint on hover or focus.', 'shipped'),
  entry('Popover', 'foundation', 'Overlays', 'Anchored panel for supplementary controls.', 'shipped'),
  entry('Dropdown Menu', 'foundation', 'Overlays', 'Anchored list of actions triggered from a button.', 'shipped'),
  entry('Command Palette', 'foundation', 'Overlays', 'Searchable command menu in a dialog overlay with grouped actions and keyboard hints.', 'shipped'),
  entry('Badge', 'foundation', 'Data Display', 'Compact status and label indicators.', 'shipped'),
  entry('Avatar', 'foundation', 'Data Display', 'User profile image with fallback initials.', 'shipped'),
  entry('Card', 'foundation', 'Data Display', 'Container for grouped content and actions.', 'shipped'),
  entry('Accordion', 'foundation', 'Data Display', 'Expand and collapse grouped sections of content.', 'shipped'),
  entry('Table', 'foundation', 'Data Display', 'Structured data display with sorting support.', 'shipped'),
  entry('Skeleton Loader', 'foundation', 'Data Display', 'Placeholder shimmer for loading content.', 'shipped'),
  entry('Kbd', 'foundation', 'Data Display', 'Keyboard key chip with KbdGroup combo helper.', 'shipped'),
  entry('Separator', 'foundation', 'Data Display', 'Horizontal or vertical divider with optional centered label.', 'shipped'),
  entry('Tabs', 'foundation', 'Navigation', 'Switch between related content panels.', 'shipped'),
  entry('Pagination', 'foundation', 'Navigation', 'Navigate between pages of paginated content.', 'shipped'),
  entry('Breadcrumb', 'foundation', 'Navigation', 'Hierarchical trail back to a page\u2019s ancestors.', 'shipped'),
  entry('Sidebar', 'foundation', 'Navigation', 'Collapsible composable app sidebar with animated width and icon rail.', 'shipped'),
  entry('Stepper', 'foundation', 'Navigation', 'Multi-step progress indicator with animated connectors and step states.', 'shipped', true),
  entry('Toast', 'foundation', 'Feedback', 'Transient notifications with an animated stack.', 'shipped'),
  entry('Progress', 'foundation', 'Feedback', 'Linear progress bar with sizes, value label, and indeterminate sweep.', 'shipped'),

  // ── Animated (31) — Motion wow-factor, live prop playground ──
  entry('Text Reveal', 'animated', 'Text Effects', 'Scroll-triggered text animation.', 'shipped'),
  entry('Typewriter Text', 'animated', 'Text Effects', 'Characters type on, one at a time.', 'shipped'),
  entry('Gradient Text', 'animated', 'Text Effects', 'Animated gradient fill on headline text.', 'shipped'),
  entry('Word Rotate', 'animated', 'Text Effects', 'Cycles through a list of words in place.', 'shipped'),
  entry('Flip Words', 'animated', 'Text Effects', '3D flip transition between rotating words.', 'shipped'),
  entry('Blur Fade', 'animated', 'Text Effects', 'Elements fade in with blur on scroll.', 'shipped'),
  entry('Number Ticker', 'animated', 'Text Effects', 'Counts up to a target value on scroll into view.', 'shipped'),
  entry('Hero Highlight', 'animated', 'Text Effects', 'Interactive dot-grid hero with cursor reveal and scroll-triggered text highlights.', 'shipped'),
  entry('Morphing Text', 'animated', 'Text Effects', 'Cycles words with a blur-crossfade morph — distinct from Word Rotate.', 'shipped'),
  entry('Text Scramble', 'animated', 'Text Effects', 'Characters shuffle, then resolve left to right — a decrypt-style reveal.', 'shipped', true),
  entry('Sliding Number', 'animated', 'Text Effects', 'Odometer-style digit roll for live numbers and counters.', 'shipped', true),
  entry('Shimmer Button', 'animated', 'Buttons', 'Button with a moving shimmer highlight.', 'shipped'),
  entry('Button Copy', 'animated', 'Buttons', 'Copy button with an animated idle → copied state morph.', 'shipped'),
  entry('Ripple Button', 'animated', 'Buttons', 'Button with an expanding ripple on click.', 'shipped'),
  entry('Magnetic Button', 'animated', 'Buttons', 'Button that snaps toward the cursor on approach.', 'shipped'),
  entry('Moving Border', 'animated', 'Buttons', 'Traveling highlight that loops around a container or button border.', 'shipped'),
  entry('Aurora Background', 'animated', 'Backgrounds', 'Slow-drifting gradient mesh backdrop.', 'shipped'),
  entry('Grid Pattern', 'animated', 'Backgrounds', 'Animated grid-line background texture.', 'shipped'),
  entry('Dot Pattern', 'animated', 'Backgrounds', 'Animated dot-grid background texture.', 'shipped'),
  entry('Wavy Background', 'animated', 'Backgrounds', 'Undulating gradient wave backdrop.', 'shipped'),
  entry('Particles', 'animated', 'Backgrounds', 'Interactive floating particle field.', 'shipped'),
  entry('Meteor Shower', 'animated', 'Backgrounds', 'Streaking diagonal light trails across a surface.', 'shipped'),
  entry('Sparkles', 'animated', 'Backgrounds', 'Ambient sparkle particles over content.', 'shipped'),
  entry('Retro Grid', 'animated', 'Backgrounds', 'Scrolling perspective grid background with overlay slot and optional brand tint.', 'shipped'),
  entry('Background Beams', 'animated', 'Backgrounds', 'Full-bleed curved SVG paths with animated ember gradient strokes.', 'shipped'),
  entry('Lamp', 'animated', 'Backgrounds', 'Glowing horizontal light bar with conic gradient cones for hero headlines.', 'shipped'),
  entry('Border Beam', 'animated', 'Cards & Surfaces', 'Animated light traveling around a border.', 'shipped'),
  entry('Tilt Card', 'animated', 'Cards & Surfaces', '3D-tilts on pointer move for depth.', 'shipped'),
  entry('Tilt Card Wall', 'animated', 'Cards & Surfaces', 'Fanned testimonial cards that straighten, lift, and come forward on hover or focus.', 'shipped'),
  entry('Bento Grid', 'animated', 'Cards & Surfaces', 'Animated staggered entrance for a bento layout.', 'shipped'),
  entry('Bento Showcase', 'animated', 'Cards & Surfaces', 'Rich animated bento grid with hover-reveal footers, background slots, and group dimming.', 'shipped'),
  entry('Spotlight', 'animated', 'Cards & Surfaces', 'Cursor-following radial light effect.', 'shipped'),
  entry('Cursor Spotlight', 'animated', 'Cards & Surfaces', 'Mask-reveal spotlight that follows the cursor.', 'shipped'),
  entry('Terminal', 'animated', 'Cards & Surfaces', 'Dark terminal window mockup with composable typing lines.', 'shipped'),
  entry('Browser Frame', 'animated', 'Cards & Surfaces', 'Browser window mockup with URL bar and composable content slot.', 'shipped'),
  entry('Expandable Card', 'animated', 'Cards & Surfaces', 'Card that morphs into a centered modal via shared-layout animation.', 'shipped', true),
  entry('Morphing Dialog', 'animated', 'Cards & Surfaces', 'Composable trigger-to-dialog morph built on shared layout IDs.', 'shipped', true),
  entry('Image Comparison', 'animated', 'Cards & Surfaces', 'Before/after image slider with draggable spring-loaded divider.', 'shipped', true),
  entry('Globe', 'animated', 'Visualizations', 'Rotating 3D globe with arc connections.', 'shipped'),
  entry('Animated Beam', 'animated', 'Visualizations', 'A traveling light beam connecting two points.', 'shipped'),
  entry('Orbit', 'animated', 'Visualizations', 'Icons circling a central anchor point.', 'shipped'),
  entry('Confetti Burst', 'animated', 'Visualizations', 'Celebratory particle burst on trigger.', 'shipped'),
  entry('Animated Progress Ring', 'animated', 'Visualizations', 'Circular progress indicator with animated sweep.', 'shipped'),
  entry('Line Draw', 'animated', 'Visualizations', 'SVG stroke-drawing animation with scroll-triggered pathLength and decorative presets.', 'shipped'),
  entry('Marquee', 'animated', 'Layout & Navigation', 'Infinitely scrolling content strip.', 'shipped'),
  entry('Scroll Progress Bar', 'animated', 'Layout & Navigation', 'Fixed bar tracking scroll position.', 'shipped'),
  entry('Floating Navbar', 'animated', 'Layout & Navigation', 'Nav bar that hides on scroll down, reveals on scroll up.', 'shipped'),
  entry('Animated List', 'animated', 'Layout & Navigation', 'Vertical list where items spring in one-by-one at the top with fading older entries.', 'shipped'),
  entry('Dock', 'animated', 'Layout & Navigation', 'macOS-style dock with cursor-proximity icon magnification.', 'shipped'),
  entry('Avatar Circles', 'animated', 'Layout & Navigation', 'Overlapping avatar row with staggered pop-in and +N overflow chip.', 'shipped'),
  entry('Dynamic Island', 'animated', 'Layout & Navigation', 'Pill that fluidly morphs between compact and expanded states, iOS-style.', 'shipped', true),
  entry('Carousel', 'animated', 'Layout & Navigation', 'Swipeable spring-physics carousel with drag, snap, and dot navigation.', 'shipped', true),
  entry('Sortable List', 'animated', 'Layout & Navigation', 'Drag-to-reorder list with spring-animated layout shifts.', 'shipped', true),

  // ── Sections (20) — full-page blocks, compose from Layer 1 + 2 ──
  entry('Hero', 'sections', 'Marketing', 'Full-width hero with headline and CTAs.', 'shipped'),
  entry('Hero Spotlight', 'sections', 'Marketing', 'Dark-canvas hero with sweeping spotlight beam and brand-accent headline.', 'shipped'),
  entry('Hero Grid', 'sections', 'Marketing', 'Line-grid hero with radial fade, glow orbs, staggered entrance, and stats row.', 'shipped'),
  entry('Hero Showcase', 'sections', 'Marketing', 'Split hero with tilted floating product frame and media slot.', 'shipped'),
  entry('CTA', 'sections', 'Marketing', 'Call-to-action banner section.', 'shipped'),
  entry('Announcement Banner', 'sections', 'Marketing', 'Dismissible top-of-page announcement strip with neutral and brand accents.', 'shipped'),
  entry('Testimonials', 'sections', 'Marketing', 'Customer quotes and social proof.', 'shipped'),
  entry('Logo Cloud', 'sections', 'Marketing', 'Row of partner or customer logos.', 'shipped'),
  entry('Stats Band', 'sections', 'Marketing', 'Row of animated key metrics.', 'shipped'),
  entry('Features', 'sections', 'Content', 'Grid of product features with icons.', 'shipped'),
  entry('FAQ', 'sections', 'Content', 'Accordion-style frequently asked questions.', 'shipped'),
  entry('Blog Grid', 'sections', 'Content', 'Card grid of blog post previews.', 'shipped'),
  entry('Timeline', 'sections', 'Content', 'Chronological milestone timeline.', 'shipped'),
  entry('Changelog', 'sections', 'Content', 'Versioned list of product updates.', 'shipped'),
  entry('Team Grid', 'sections', 'Content', 'Grid of team member profiles.', 'shipped'),
  entry('Bento Features', 'sections', 'Content', 'Asymmetric bento-style feature showcase.', 'shipped'),
  entry('Pricing', 'sections', 'Commerce', 'Tiered pricing comparison table.', 'shipped'),
  entry('Comparison Table', 'sections', 'Commerce', 'Feature-by-feature plan comparison.', 'shipped'),
  entry('Footer', 'sections', 'Utility', 'Site footer with links and branding.', 'shipped'),
  entry('Navbar', 'sections', 'Utility', 'Site navigation with responsive menu.', 'shipped'),
  entry('Newsletter Signup', 'sections', 'Utility', 'Email capture with inline validation.', 'shipped'),
  entry('Contact Form', 'sections', 'Utility', 'Multi-field contact form with validation.', 'shipped'),
  entry('Integration Grid', 'sections', 'Utility', 'Grid of supported integrations.', 'shipped'),
  entry('404 Page', 'sections', 'Utility', 'Not-found page with a way back home.', 'shipped'),
  entry('Auth Page', 'sections', 'Utility', 'Split login/signup page with social auth and testimonial aside.', 'shipped'),
];

export const LAYER_COUNT = Object.keys(layerLabels).length;

export type LayerCategoryGroup = {
  layer: ComponentLayer;
  category: string;
  entries: ComponentEntry[];
};

/** Stable DOM id for gallery anchor links — e.g. `foundation-forms-inputs`. */
export function getCategoryAnchorId(layer: ComponentLayer, category: string): string {
  const slug = category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${layer}-${slug}`;
}

export function getCategoryHref(layer: ComponentLayer, category: string): string {
  return `/components#${getCategoryAnchorId(layer, category)}`;
}

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

export function getComponentsByCategory(category: string): ComponentEntry[] {
  return components.filter((c) => c.category === category);
}

export function getComponentsByLayerAndCategory(
  layer: ComponentLayer,
  category: string,
): ComponentEntry[] {
  return components.filter((c) => c.layer === layer && c.category === category);
}

/** All non-empty layer × category groups in registry order. */
export function getComponentsGroupedByCategory(): LayerCategoryGroup[] {
  const groups: LayerCategoryGroup[] = [];

  for (const layer of Object.keys(layerLabels) as ComponentLayer[]) {
    for (const category of layerCategories[layer]) {
      const entries = getComponentsByLayerAndCategory(layer, category);
      if (entries.length > 0) {
        groups.push({ layer, category, entries });
      }
    }
  }

  return groups;
}

export function getAdjacentInCategory(slug: string): {
  prev?: ComponentEntry;
  next?: ComponentEntry;
} {
  const current = getComponentBySlug(slug);
  if (!current) return {};

  const siblings = getComponentsByLayerAndCategory(current.layer, current.category);
  const index = siblings.findIndex((c) => c.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? siblings[index - 1] : undefined,
    next: index < siblings.length - 1 ? siblings[index + 1] : undefined,
  };
}

export function getComponentsByStatus(status: ComponentStatus): ComponentEntry[] {
  return components.filter((c) => c.status === status);
}

export function getReadyCount(): number {
  return components.filter((c) => c.status === 'shipped').length;
}
