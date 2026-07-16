'use client';

import { BlogGrid, type BlogPost } from '@varient/ui';

// Local gradient/token placeholder blocks — no external image URLs. Each uses
// semantic tokens (brand/brand-secondary/muted) so the swatch flips correctly
// in light and dark without any raw hex.
function CoverGradient({ variant }: { variant: 'brand' | 'secondary' | 'muted' }) {
  const gradients: Record<typeof variant, string> = {
    brand: 'bg-gradient-to-br from-brand/70 via-brand/30 to-background',
    secondary: 'bg-gradient-to-br from-brand-secondary/60 via-brand-light/40 to-background',
    muted: 'bg-gradient-to-br from-muted via-muted/50 to-background',
  };
  return <div aria-hidden className={`h-full w-full ${gradients[variant]}`} />;
}

const posts: BlogPost[] = [
  {
    title: 'Why copy-paste beats npm installs for UI kits',
    excerpt: 'Owning the source means you ship fixes the same day, not after a maintainer merges your PR.',
    href: '#',
    category: 'Product',
    date: 'Jun 12, 2026',
    readingTime: '5 min read',
    author: { name: 'Maya Chen', avatarSrc: 'https://i.pravatar.cc/150?img=1' },
    image: <CoverGradient variant="brand" />,
  },
  {
    title: 'Design tokens that work in light and dark',
    excerpt: 'Semantic slots like background and muted-foreground flip automatically — no per-component overrides.',
    href: '#',
    category: 'Design',
    date: 'Jun 8, 2026',
    readingTime: '4 min read',
    author: { name: 'Elena Vasquez', avatarSrc: 'https://i.pravatar.cc/150?img=5' },
    image: <CoverGradient variant="secondary" />,
  },
  {
    title: 'Building accessible motion with prefers-reduced-motion',
    excerpt: 'Every animated component should have a static fallback. Here is the pattern we use across Varient.',
    href: '#',
    category: 'Accessibility',
    date: 'May 29, 2026',
    readingTime: '6 min read',
    author: { name: 'James Okonkwo', avatarSrc: 'https://i.pravatar.cc/150?img=3' },
    image: <CoverGradient variant="muted" />,
  },
  {
    title: 'Composing landing pages from section blocks',
    excerpt: 'Hero, features, pricing, and FAQ sections stack together without duplicating foundation logic.',
    href: '#',
    category: 'Guides',
    date: 'May 21, 2026',
    readingTime: '7 min read',
    author: { name: 'Priya Nair', avatarSrc: 'https://i.pravatar.cc/150?img=9' },
    image: <CoverGradient variant="brand" />,
  },
  {
    title: 'Radix primitives under the hood',
    excerpt: 'Focus traps, keyboard nav, and ARIA roles ship with foundation components so you do not rebuild them.',
    href: '#',
    category: 'Engineering',
    date: 'May 14, 2026',
    readingTime: '5 min read',
    author: { name: 'Tom Bradley', avatarSrc: 'https://i.pravatar.cc/150?img=8' },
    image: <CoverGradient variant="secondary" />,
  },
  {
    title: 'Shipping without a design system team',
    excerpt: 'A flat placeholder still beats nothing — every card degrades gracefully when a post has no cover.',
    href: '#',
    category: 'Product',
    date: 'May 2, 2026',
    readingTime: '3 min read',
    author: { name: 'Noah Kim', avatarSrc: 'https://i.pravatar.cc/150?img=12' },
    // Intentionally no image — demonstrates the flat placeholder fallback.
  },
];

const compactPosts: BlogPost[] = [
  {
    title: 'Why copy-paste beats npm installs',
    excerpt: 'Owning the source means you ship fixes the same day.',
    href: '#',
    category: 'Product',
    date: 'Jun 12, 2026',
    readingTime: '5 min',
    author: { name: 'Maya Chen', avatarSrc: 'https://i.pravatar.cc/150?img=1' },
    image: <CoverGradient variant="brand" />,
  },
  {
    title: 'Design tokens in light and dark',
    excerpt: 'Semantic slots flip automatically with the .dark class.',
    href: '#',
    category: 'Design',
    date: 'Jun 8, 2026',
    readingTime: '4 min',
    author: { name: 'Elena Vasquez', avatarSrc: 'https://i.pravatar.cc/150?img=5' },
    image: <CoverGradient variant="secondary" />,
  },
];

export function BlogGridDemo() {
  return (
    <div className="w-full bg-background">
      <BlogGrid
        eyebrow="Journal"
        title="Notes from the studio"
        description="Custom cover art, category badges, and author credit — all wired through the content API."
        posts={posts}
      />
    </div>
  );
}

export function BlogGridPreviewCompact() {
  return (
    <div className="w-full bg-background">
      <BlogGrid
        className="px-4 py-6 md:py-6"
        description="Recent guides and notes."
        eyebrow="Blog"
        posts={compactPosts}
        title="Latest posts"
      />
    </div>
  );
}
