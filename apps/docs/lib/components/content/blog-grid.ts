import type { ComponentDocContent } from '../content-types';

export const content: ComponentDocContent = {
  usage: `import { BlogGrid } from '@/components/sections/blog-grid';

export function BlogPage() {
  return (
    <BlogGrid
      eyebrow="Blog"
      title="Latest from the team"
      description="Guides and notes on copy-paste components and design tokens."
      posts={[
        {
          title: 'Why copy-paste beats npm installs',
          excerpt: 'Owning the source means you ship fixes the same day.',
          href: '/blog/copy-paste',
          category: 'Product',
          date: 'Jun 12, 2026',
          readingTime: '5 min read',
          author: { name: 'Maya Chen', avatarSrc: 'https://i.pravatar.cc/150?img=1' },
          imageSrc: '/blog/copy-paste-cover.jpg',
          imageAlt: 'Terminal window showing a component being copied into a project',
        },
      ]}
    />
  );
}`,
  props: [
    {
      title: 'BlogGrid',
      rows: [
        { name: 'eyebrow', type: 'string', defaultValue: "'Blog'", description: 'Small brand-colored label above the section title.' },
        { name: 'title', type: 'string', defaultValue: "'Latest from the team'", description: 'Section headline.' },
        { name: 'description', type: 'string', description: 'One-line supporting copy below the title.' },
        { name: 'posts', type: 'BlogPost[]', description: 'Preview cards — each needs title, excerpt, href, and date; category, readingTime, author, and cover image are optional.' },
        { name: 'className', type: 'string', description: 'Additional Tailwind classes merged via cn(), applied to the root section.' },
      ],
    },
    {
      title: 'BlogPost',
      rows: [
        { name: 'title', type: 'string', description: 'Post headline — brightens to brand color on card hover.' },
        { name: 'excerpt', type: 'string', description: 'Short summary, clamped to two lines.' },
        { name: 'href', type: 'string', description: 'Destination URL — the entire card is wrapped in a link.' },
        { name: 'category', type: 'string', description: 'Optional category label rendered as a brand Badge.' },
        { name: 'date', type: 'string', description: 'Publication date shown in the card footer.' },
        { name: 'readingTime', type: 'string', description: 'Optional reading duration (e.g. "5 min read").' },
        { name: 'author', type: '{ name: string; avatarSrc?: string }', description: 'Optional author name and avatar in the footer.' },
        { name: 'imageSrc', type: 'string', description: 'Cover image URL rendered in the card header, cropped to fill and scaling gently on hover.' },
        { name: 'imageAlt', type: 'string', description: 'Alt text for imageSrc — set this whenever the image conveys content, not just decoration.' },
        { name: 'image', type: 'ReactNode', description: 'Full override for the card header — takes precedence over imageSrc/imageAlt. Falls back to a flat placeholder when none are set.' },
      ],
    },
  ],
  features: [
    'Responsive 1/2/3-column card grid with equal-height cards (items-stretch).',
    'Optional cover image per post via imageSrc/imageAlt, a full ReactNode override via image, or an automatic flat-color placeholder when neither is set.',
    'Cover image scales gently on card hover, gated behind prefers-reduced-motion.',
    'Category badge, author avatar + name, date, and reading time in a wrapping footer row.',
    'Each post card is scroll-revealed with a staggered fade/slide-in, gated behind prefers-reduced-motion.',
    'Heading id generated with useId() so multiple instances never collide on one page.',
  ],
  keyboard: [
    { keys: 'Tab / Shift + Tab', description: 'Moves focus between post card links.' },
    { keys: 'Enter', description: 'Follows the focused post link.' },
  ],
  aria: [
    { attribute: 'aria-labelledby', element: '<section>', purpose: 'Associates the section with its unique (useId-generated) heading id.' },
    { attribute: 'aria-hidden', element: 'placeholder cover div', purpose: 'Hides the decorative flat-color fallback from assistive tech when no image is supplied.' },
  ],
  a11yNotes: [
    'Each post is a single focusable <a> wrapping the whole card — keyboard users tab to one target per post, not nested controls inside it.',
    'A supplied imageSrc renders as a real <img>; pass a meaningful imageAlt whenever the image conveys content beyond decoration.',
    'Reduced-motion users see all cards immediately without stagger, fade-in, or hover scale on the cover image.',
  ],
  sourceFiles: [
    'packages/ui/src/components/sections/blog-grid/blog-grid.tsx',
    'packages/ui/src/components/sections/blog-grid/index.ts',
  ],
};
