'use client';

import { BlogGrid, type BlogPost } from '@varient/ui';

const compactPosts: BlogPost[] = [
  {
    title: 'Why copy-paste beats npm installs',
    excerpt: 'Owning the source means you ship fixes the same day.',
    href: '#',
    category: 'Product',
    date: 'Jun 12, 2026',
    readingTime: '5 min',
    author: { name: 'Maya Chen', avatarSrc: 'https://i.pravatar.cc/150?img=1' },
  },
  {
    title: 'Design tokens in light and dark',
    excerpt: 'Semantic slots flip automatically with the .dark class.',
    href: '#',
    category: 'Design',
    date: 'Jun 8, 2026',
    readingTime: '4 min',
    author: { name: 'Elena Vasquez', avatarSrc: 'https://i.pravatar.cc/150?img=5' },
  },
];

export function BlogGridDemo() {
  return (
    <div className="w-full bg-background">
      <BlogGrid />
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
